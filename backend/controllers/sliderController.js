import { SliderSection } from "../models/SliderSection.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

const validKey = /^[a-z0-9_-]+$/;

function validateKeys(pageKey, sectionKey) {
  return (
    validKey.test(pageKey || "") &&
    validKey.test(sectionKey || "")
  );
}

function parseBoolean(value, fallback = true) {
  if (value === undefined) return fallback;
  return value === true || value === "true";
}

// ==========================================
// CLOUDINARY HELPERS
// ==========================================

async function deleteCloudinaryImage(publicId) {
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
    console.error("Cloudinary image deletion failed:", error);
  }
}

function getSliderFolder(pageKey, sectionKey) {
  return `AIA-Project-Assets/Sliders/${pageKey}/${sectionKey}`;
}

// ==========================================
// PUBLIC: GET SLIDER
// ==========================================

export const getPublicSlider = async (req, res) => {
  try {
    const { pageKey, sectionKey } = req.params;

    if (!validateKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or section key",
      });
    }

    const section = await SliderSection.findOne({
      pageKey,
      sectionKey,
      isActive: true,
    }).lean();

    if (!section) {
      return res.json({
        success: true,
        data: null,
      });
    }

    section.cards = (section.cards || [])
      .filter((card) => card.isActive)
      .sort((a, b) => a.order - b.order);

    return res.json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Get public slider error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: GET SLIDER
// ==========================================

export const getAdminSlider = async (req, res) => {
  try {
    const { pageKey, sectionKey } = req.params;

    if (!validateKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or section key",
      });
    }

    let section = await SliderSection.findOne({
      pageKey,
      sectionKey,
    });

    if (!section) {
      section = await SliderSection.create({
        pageKey,
        sectionKey,
        heading: "",
        subtitle: "",
        cards: [],
      });
    }

    return res.json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Get admin slider error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: SAVE SLIDER SETTINGS
// ==========================================

export const saveSliderSettings = async (req, res) => {
  try {
    const { pageKey, sectionKey } = req.params;

    if (!validateKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or section key",
      });
    }

    const allowed = [
      "heading",
      "subtitle",
      "intro",
      "visibleSlides",
      "accentColor",
      "isActive",
    ];

    const update = {};

    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        update[key] = req.body[key];
      }
    }

    if (update.visibleSlides !== undefined) {
      update.visibleSlides = Number(update.visibleSlides);

      if (
        !Number.isInteger(update.visibleSlides) ||
        update.visibleSlides < 1 ||
        update.visibleSlides > 6
      ) {
        return res.status(400).json({
          success: false,
          message: "visibleSlides must be between 1 and 6",
        });
      }
    }

    if (update.isActive !== undefined) {
      update.isActive = parseBoolean(update.isActive);
    }

    if (update.intro !== undefined) {
      if (
        !update.intro ||
        typeof update.intro !== "object" ||
        Array.isArray(update.intro)
      ) {
        return res.status(400).json({
          success: false,
          message: "intro must be an object",
        });
      }

      const { eyebrow, title, color, enabled } = update.intro;

      update.intro = {
        ...(eyebrow !== undefined && { eyebrow }),
        ...(title !== undefined && { title }),
        ...(color !== undefined && { color }),
        ...(enabled !== undefined && {
          enabled: parseBoolean(enabled),
        }),
      };
    }

    const section = await SliderSection.findOneAndUpdate(
      { pageKey, sectionKey },
      {
        $set: update,
        $setOnInsert: { pageKey, sectionKey },
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
      message: "Slider settings saved",
    });
  } catch (error) {
    console.error("Save slider settings error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: CREATE SLIDER CARD
// ==========================================

export const createSliderCard = async (req, res) => {
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

    if (!validateKeys(pageKey, sectionKey)) {
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

    // New uploads go to Cloudinary.
    if (req.file) {
      uploadedImage = await uploadToCloudinary(
        req.file.path,
        getSliderFolder(pageKey, sectionKey)
      );
    }

    // Legacy imageUrl support is retained for existing integrations.
    const imageUrl = uploadedImage?.url || req.body.imageUrl;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Card image is required",
      });
    }

    const section = await SliderSection.findOneAndUpdate(
      { pageKey, sectionKey },
      {
        $setOnInsert: { pageKey, sectionKey },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    section.cards.push({
      title: title.trim(),
      description: description || "",
      imageUrl,
      imagePublicId: uploadedImage?.publicId || "",
      imageAlt: imageAlt || title,
      link: link || "",
      linkText: linkText || "Read More",
      order: Number.isFinite(Number(order))
        ? Number(order)
        : section.cards.length,
      isActive: parseBoolean(isActive),
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
      data: section.cards[section.cards.length - 1],
      message: "Slider card created",
    });
  } catch (error) {
    console.error("Create slider card error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: UPDATE SLIDER CARD
// ==========================================

export const updateSliderCard = async (req, res) => {
  let uploadedImage = null;

  try {
    const { pageKey, sectionKey, cardId } = req.params;

    if (!validateKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or section key",
      });
    }

    const section = await SliderSection.findOne({
      pageKey,
      sectionKey,
    });

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Slider section not found",
      });
    }

    const card = section.cards.id(cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Slider card not found",
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

      card.title = title.trim();
    }

    if (description !== undefined) card.description = description;
    if (imageAlt !== undefined) card.imageAlt = imageAlt;
    if (link !== undefined) card.link = link;
    if (linkText !== undefined) card.linkText = linkText;

    if (order !== undefined && Number.isFinite(Number(order))) {
      card.order = Number(order);
    }

    if (isActive !== undefined) {
      card.isActive = parseBoolean(isActive);
    }

    const oldPublicId = card.imagePublicId;

    if (req.file) {
      uploadedImage = await uploadToCloudinary(
        req.file.path,
        getSliderFolder(pageKey, sectionKey)
      );

      card.imageUrl = uploadedImage.url;
      card.imagePublicId = uploadedImage.publicId;
    } else if (req.body.imageUrl) {
      card.imageUrl = req.body.imageUrl;
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

    // Delete old Cloudinary asset only after DB update succeeds.
    if (uploadedImage && oldPublicId) {
      await deleteCloudinaryImage(oldPublicId);
    }

    return res.json({
      success: true,
      data: card,
      message: "Slider card updated",
    });
  } catch (error) {
    console.error("Update slider card error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: DELETE SLIDER CARD
// ==========================================

export const deleteSliderCard = async (req, res) => {
  try {
    const { pageKey, sectionKey, cardId } = req.params;

    if (!validateKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or section key",
      });
    }

    const section = await SliderSection.findOne({
      pageKey,
      sectionKey,
    });

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Slider section not found",
      });
    }

    const card = section.cards.id(cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Slider card not found",
      });
    }

    const oldPublicId = card.imagePublicId;

    card.deleteOne();

    await section.save();

    if (oldPublicId) {
      await deleteCloudinaryImage(oldPublicId);
    }

    return res.json({
      success: true,
      message: "Slider card and its Cloudinary image deleted",
    });
  } catch (error) {
    console.error("Delete slider card error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};