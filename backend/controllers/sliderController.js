
import { SliderSection } from "../models/SliderSection.js";

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

function uploadedImageUrl(req) {
  if (!req.file) return undefined;
  return `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
}

// Public API: only published sections/cards
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

    res.json({ success: true, data: section });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin API: includes hidden cards
export const getAdminSlider = async (req, res) => {
  try {
    const { pageKey, sectionKey } = req.params;

    if (!validateKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or section key",
      });
    }

    let section = await SliderSection.findOne({ pageKey, sectionKey });

    if (!section) {
      section = await SliderSection.create({
        pageKey,
        sectionKey,
        heading: "",
        subtitle: "",
        cards: [],
      });
    }

    res.json({ success: true, data: section });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create or update section settings
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

    res.json({
      success: true,
      data: section,
      message: "Slider settings saved",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add card
export const createSliderCard = async (req, res) => {
  try {
    const { pageKey, sectionKey } = req.params;
    const { title, description, imageAlt, link, linkText, order } = req.body;

    if (!validateKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or section key",
      });
    }

    const imageUrl = uploadedImageUrl(req) || req.body.imageUrl;

    if (!title?.trim() || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Card title and image are required",
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
      imageAlt: imageAlt || title,
      link: link || "",
      linkText: linkText || "Read More",
      order: Number.isFinite(Number(order))
        ? Number(order)
        : section.cards.length,
      isActive: true,
    });

    await section.save();

    res.status(201).json({
      success: true,
      data: section.cards[section.cards.length - 1],
      message: "Slider card created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update card
export const updateSliderCard = async (req, res) => {
  try {
    const { pageKey, sectionKey, cardId } = req.params;

    if (!validateKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or section key",
      });
    }

    const section = await SliderSection.findOne({ pageKey, sectionKey });

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

    const { title, description, imageAlt, link, linkText, order, isActive } =
      req.body;

    if (title !== undefined) card.title = title.trim();
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

    const imageUrl = uploadedImageUrl(req) || req.body.imageUrl;

    if (imageUrl) card.imageUrl = imageUrl;

    await section.save();

    res.json({
      success: true,
      data: card,
      message: "Slider card updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete card
export const deleteSliderCard = async (req, res) => {
  try {
    const { pageKey, sectionKey, cardId } = req.params;

    const section = await SliderSection.findOne({ pageKey, sectionKey });

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

    card.deleteOne();
    await section.save();

    res.json({
      success: true,
      message: "Slider card deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
