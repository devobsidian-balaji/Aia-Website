import HomeFeatureSection from "../models/HomeFeatureSection.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

const validPageKeys = ["home", "iafsm"];

const getPageKey = (req, res) => {
  const pageKey = req.params.pageKey;

  if (!validPageKeys.includes(pageKey)) {
    res.status(400).json({
      success: false,
      message: "Invalid page key. Allowed: home, iafsm",
    });

    return null;
  }

  return pageKey;
};

async function getOrCreateSection(pageKey) {
  return HomeFeatureSection.findOneAndUpdate(
    { pageKey },
    {
      $setOnInsert: {
        pageKey,
        items: [],
      },
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );
}

const normalizeBoolean = (value, fallback = true) => {
  if (value === undefined) return fallback;

  return value === true || value === "true";
};

const normalizeItem = (body, existing = {}) => ({
  title: String(body.title ?? existing.title ?? "").trim(),
  description: body.description ?? existing.description ?? "",
  imageAlt: body.imageAlt ?? existing.imageAlt ?? "",
  link: body.link ?? existing.link ?? "",
  linkText: body.linkText ?? existing.linkText ?? "Learn More",
  order: Number.isFinite(Number(body.order))
    ? Number(body.order)
    : existing.order ?? 0,
  isActive: normalizeBoolean(
    body.isActive,
    existing.isActive !== false
  ),
});

// ==========================================
// CLOUDINARY HELPERS
// ==========================================

const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    if (!["ok", "not found"].includes(result.result)) {
      console.warn("Cloudinary image deletion result:", result);
    }

    return result;
  } catch (error) {
    console.error("Cloudinary image deletion failed:", error);
  }
};

// ==========================================
// PUBLIC: GET HOME FEATURES
// ==========================================

export const getHomeFeatures = async (req, res) => {
  try {
    const pageKey = getPageKey(req, res);

    if (!pageKey) return;

    const section = await HomeFeatureSection.findOne({
      pageKey,
      isActive: true,
    }).lean();

    if (!section) {
      return res.status(200).json({
        success: true,
        data: {
          pageKey,
          heading: "",
          subtitle: "",
          isActive: false,
          items: [],
        },
      });
    }

    const items = (section.items || [])
      .filter((item) => item.isActive !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return res.status(200).json({
      success: true,
      data: {
        ...section,
        items,
      },
    });
  } catch (error) {
    console.error("Get home features error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch home features",
    });
  }
};

// ==========================================
// ADMIN: GET HOME FEATURES
// ==========================================

export const getAdminHomeFeatures = async (req, res) => {
  try {
    const pageKey = getPageKey(req, res);

    if (!pageKey) return;

    const section = await getOrCreateSection(pageKey);

    return res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Get admin home features error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch home features",
    });
  }
};

// ==========================================
// ADMIN: SAVE SECTION SETTINGS
// ==========================================

export const saveHomeFeatureSettings = async (req, res) => {
  try {
    const pageKey = getPageKey(req, res);

    if (!pageKey) return;

    const section = await getOrCreateSection(pageKey);

    section.heading = req.body.heading ?? section.heading;
    section.subtitle = req.body.subtitle ?? section.subtitle;

    if (req.body.isActive !== undefined) {
      section.isActive = normalizeBoolean(
        req.body.isActive,
        section.isActive
      );
    }

    await section.save();

    return res.status(200).json({
      success: true,
      message: "Section settings saved successfully",
      data: section,
    });
  } catch (error) {
    console.error("Save home feature settings error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save section settings",
    });
  }
};

// ==========================================
// ADMIN: CREATE FEATURE CARD
// ==========================================

export const createHomeFeature = async (req, res) => {
  let uploadedImage = null;

  try {
    const pageKey = getPageKey(req, res);

    if (!pageKey) return;

    const fields = normalizeItem(req.body);

    if (!fields.title) {
      return res.status(400).json({
        success: false,
        message: "Card title is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Feature image is required",
      });
    }

    const section = await getOrCreateSection(pageKey);

    uploadedImage = await uploadToCloudinary(
      req.file.path,
      `AIA-Project-Assets/Home-Features/${pageKey}`
    );

    const newItem = {
      ...fields,
      imageUrl: uploadedImage.url,
      imagePublicId: uploadedImage.publicId,
    };

    section.items.push(newItem);

    try {
      await section.save();
    } catch (saveError) {
      await deleteCloudinaryImage(uploadedImage.publicId);
      uploadedImage = null;
      throw saveError;
    }

    const createdItem = section.items[section.items.length - 1];

    return res.status(201).json({
      success: true,
      message: "Feature card created successfully",
      data: createdItem,
    });
  } catch (error) {
    console.error("Create home feature error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create feature card",
    });
  }
};

// ==========================================
// ADMIN: UPDATE FEATURE CARD
// ==========================================

export const updateHomeFeature = async (req, res) => {
  let uploadedImage = null;

  try {
    const pageKey = getPageKey(req, res);

    if (!pageKey) return;

    const section = await HomeFeatureSection.findOne({ pageKey });

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Feature section not found",
      });
    }

    const card = section.items.id(req.params.itemId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Feature card not found",
      });
    }

    const fields = normalizeItem(req.body, card.toObject());

    if (!fields.title) {
      return res.status(400).json({
        success: false,
        message: "Card title is required",
      });
    }

    const oldPublicId = card.imagePublicId;

    // Upload replacement image first.
    if (req.file) {
      uploadedImage = await uploadToCloudinary(
        req.file.path,
        `AIA-Project-Assets/Home-Features/${pageKey}`
      );
    }

    Object.assign(card, fields);

    if (uploadedImage) {
      card.imageUrl = uploadedImage.url;
      card.imagePublicId = uploadedImage.publicId;
    }

    try {
      await section.save();
    } catch (saveError) {
      if (uploadedImage?.publicId) {
        await deleteCloudinaryImage(uploadedImage.publicId);
        uploadedImage = null;
      }

      throw saveError;
    }

    // Delete previous image only after successful database update.
    if (uploadedImage && oldPublicId) {
      await deleteCloudinaryImage(oldPublicId);
    }

    return res.status(200).json({
      success: true,
      message: "Feature card updated successfully",
      data: card,
    });
  } catch (error) {
    console.error("Update home feature error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update feature card",
    });
  }
};

// ==========================================
// ADMIN: DELETE FEATURE CARD
// ==========================================

export const deleteHomeFeature = async (req, res) => {
  try {
    const pageKey = getPageKey(req, res);

    if (!pageKey) return;

    const section = await HomeFeatureSection.findOne({ pageKey });

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Feature section not found",
      });
    }

    const card = section.items.id(req.params.itemId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Feature card not found",
      });
    }

    const oldPublicId = card.imagePublicId;

    card.deleteOne();

    await section.save();

    // Delete Cloudinary image after successful database save.
    if (oldPublicId) {
      await deleteCloudinaryImage(oldPublicId);
    }

    return res.status(200).json({
      success: true,
      message: "Feature card deleted successfully",
    });
  } catch (error) {
    console.error("Delete home feature error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete feature card",
    });
  }
};