import { WhyJoinSection } from "../models/WhyJoinSection.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

// ==========================================
// VALIDATION HELPERS
// ==========================================

const validKey = /^[a-z0-9_-]+$/;

const validKeys = (pageKey, sectionKey) =>
  validKey.test(pageKey || "") &&
  validKey.test(sectionKey || "");

const normalizeBoolean = (value, fallback = true) => {
  if (value === undefined) return fallback;
  return value === true || value === "true";
};

const normalizeKeys = (pageKey, sectionKey) => ({
  pageKey: pageKey.toLowerCase().trim(),
  sectionKey: sectionKey.toLowerCase().trim(),
});

// ==========================================
// CLOUDINARY HELPERS
// ==========================================

const getWhyJoinFolder = (pageKey, sectionKey) =>
  `AIA-Project-Assets/Why-Join/${pageKey}/${sectionKey}`;

const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    if (!["ok", "not found"].includes(result.result)) {
      console.warn("Cloudinary deletion result:", result);
    }

    return result;
  } catch (error) {
    console.error("Why Join Cloudinary deletion error:", error);
  }
};

// ==========================================
// FIND OR CREATE SECTION
// ==========================================

const findOrCreate = async (pageKey, sectionKey) => {
  const keys = normalizeKeys(pageKey, sectionKey);

  return WhyJoinSection.findOneAndUpdate(
    keys,
    {
      $setOnInsert: {
        ...keys,
        items: [],
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  );
};

// ==========================================
// PUBLIC: GET WHY JOIN
// ==========================================

export const getPublicWhyJoin = async (req, res) => {
  try {
    const { pageKey, sectionKey } = req.params;

    if (!validKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or section key",
      });
    }

    const keys = normalizeKeys(pageKey, sectionKey);

    const section = await WhyJoinSection.findOne({
      ...keys,
      isActive: true,
    }).lean();

    if (!section) {
      return res.json({
        success: true,
        data: null,
      });
    }

    section.items = (section.items || [])
      .filter((item) => item.isActive !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return res.json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Get public Why Join error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: GET WHY JOIN
// ==========================================

export const getAdminWhyJoin = async (req, res) => {
  try {
    const { pageKey, sectionKey } = req.params;

    if (!validKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or section key",
      });
    }

    const section = await findOrCreate(pageKey, sectionKey);

    return res.json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Get admin Why Join error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: SAVE SECTION SETTINGS
// ==========================================

export const saveWhyJoinSettings = async (req, res) => {
  try {
    const { pageKey, sectionKey } = req.params;

    if (!validKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or section key",
      });
    }

    const keys = normalizeKeys(pageKey, sectionKey);
    const update = {};

    for (const key of ["heading", "subtitle", "lineColor"]) {
      if (req.body[key] !== undefined) {
        update[key] = req.body[key];
      }
    }

    if (req.body.isActive !== undefined) {
      update.isActive = normalizeBoolean(req.body.isActive);
    }

    const section = await WhyJoinSection.findOneAndUpdate(
      keys,
      {
        $set: update,
        $setOnInsert: keys,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.json({
      success: true,
      data: section,
      message: "Why Join settings saved successfully",
    });
  } catch (error) {
    console.error("Save Why Join settings error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: CREATE WHY JOIN ITEM
// ==========================================

export const createWhyJoinItem = async (req, res) => {
  let uploadedImage = null;

  try {
    const { pageKey, sectionKey } = req.params;

    const {
      title,
      description,
      imageAlt,
      link,
      linkText,
      order,
      isActive,
    } = req.body;

    if (!validKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or section key",
      });
    }

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Card title is required",
      });
    }

    // Upload new image to Cloudinary.
    if (req.file) {
      uploadedImage = await uploadToCloudinary(
        req.file.path,
        getWhyJoinFolder(pageKey, sectionKey)
      );
    }

    // Keep legacy imageUrl compatibility.
    const imageUrl = uploadedImage?.url || req.body.imageUrl;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Card image is required",
      });
    }

    const section = await findOrCreate(pageKey, sectionKey);

    section.items.push({
      title: title.trim(),
      description: description || "",
      imageUrl,
      imagePublicId: uploadedImage?.publicId || "",
      imageAlt: imageAlt || title,
      link: link || "",
      linkText: linkText || "Learn More",
      order: Number.isFinite(Number(order))
        ? Number(order)
        : section.items.length,
      isActive: normalizeBoolean(isActive),
    });

    try {
      await section.save();
    } catch (saveError) {
      if (uploadedImage?.publicId) {
        await deleteCloudinaryImage(uploadedImage.publicId);
        uploadedImage = null;
      }

      throw saveError;
    }

    return res.status(201).json({
      success: true,
      data: section.items[section.items.length - 1],
      message: "Why Join card created successfully",
    });
  } catch (error) {
    console.error("Create Why Join item error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: UPDATE WHY JOIN ITEM
// ==========================================

export const updateWhyJoinItem = async (req, res) => {
  let uploadedImage = null;

  try {
    const { pageKey, sectionKey, itemId } = req.params;

    if (!validKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or section key",
      });
    }

    const keys = normalizeKeys(pageKey, sectionKey);

    const section = await WhyJoinSection.findOne(keys);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Why Join section not found",
      });
    }

    const item = section.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Why Join item not found",
      });
    }

    const {
      title,
      description,
      imageAlt,
      link,
      linkText,
      order,
      isActive,
    } = req.body;

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Card title is required",
        });
      }

      item.title = title.trim();
    }

    if (description !== undefined) item.description = description;
    if (imageAlt !== undefined) item.imageAlt = imageAlt;
    if (link !== undefined) item.link = link;
    if (linkText !== undefined) item.linkText = linkText;

    if (order !== undefined && Number.isFinite(Number(order))) {
      item.order = Number(order);
    }

    if (isActive !== undefined) {
      item.isActive = normalizeBoolean(isActive);
    }

    const oldPublicId = item.imagePublicId;

    // Replace image only if a new file is provided.
    if (req.file) {
      uploadedImage = await uploadToCloudinary(
        req.file.path,
        getWhyJoinFolder(pageKey, sectionKey)
      );

      item.imageUrl = uploadedImage.url;
      item.imagePublicId = uploadedImage.publicId;
    } else if (req.body.imageUrl) {
      item.imageUrl = req.body.imageUrl;
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

    // Delete old Cloudinary image only after successful DB save.
    if (uploadedImage && oldPublicId) {
      await deleteCloudinaryImage(oldPublicId);
    }

    return res.json({
      success: true,
      data: item,
      message: "Why Join card updated successfully",
    });
  } catch (error) {
    console.error("Update Why Join item error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: DELETE WHY JOIN ITEM
// ==========================================

export const deleteWhyJoinItem = async (req, res) => {
  try {
    const { pageKey, sectionKey, itemId } = req.params;

    if (!validKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or section key",
      });
    }

    const keys = normalizeKeys(pageKey, sectionKey);

    const section = await WhyJoinSection.findOne(keys);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Why Join section not found",
      });
    }

    const item = section.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Why Join item not found",
      });
    }

    const oldPublicId = item.imagePublicId;

    item.deleteOne();

    await section.save();

    if (oldPublicId) {
      await deleteCloudinaryImage(oldPublicId);
    }

    return res.json({
      success: true,
      message: "Why Join card and its Cloudinary image deleted successfully",
    });
  } catch (error) {
    console.error("Delete Why Join item error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};