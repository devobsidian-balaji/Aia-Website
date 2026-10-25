
import HomeFeatureSection from "../models/HomeFeatureSection.js";

async function getOrCreateHomeSection() {
  return HomeFeatureSection.findOneAndUpdate(
    { pageKey: "home" },
    { $setOnInsert: { pageKey: "home", items: [] } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
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
  isActive: normalizeBoolean(body.isActive, existing.isActive !== false),
});

export const getHomeFeatures = async (_req, res) => {
  try {
    const section = await HomeFeatureSection.findOne({
      pageKey: "home",
      isActive: true,
    }).lean();

    if (!section) {
      return res.json({
        success: true,
        data: {
          heading: "",
          subtitle: "",
          isActive: false,
          items: [],
        },
      });
    }

    section.items = (section.items || [])
      .filter((item) => item.isActive !== false)
      .sort((a, b) => a.order - b.order);

    return res.json({ success: true, data: section });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdminHomeFeatures = async (_req, res) => {
  try {
    const section = await getOrCreateHomeSection();

    return res.json({ success: true, data: section });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const saveHomeFeatureSettings = async (req, res) => {
  try {
    const section = await getOrCreateHomeSection();

    if (typeof req.body.heading === "string") {
      section.heading = req.body.heading;
    }

    if (typeof req.body.subtitle === "string") {
      section.subtitle = req.body.subtitle;
    }

    if (req.body.isActive !== undefined) {
      section.isActive = normalizeBoolean(req.body.isActive);
    }

    await section.save();

    return res.json({
      success: true,
      message: "Section settings saved.",
      data: section,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createHomeFeature = async (req, res) => {
  try {
    const fields = normalizeItem(req.body);

    if (!fields.title) {
      return res.status(400).json({
        success: false,
        message: "Card title is required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Card image is required.",
      });
    }

    const section = await getOrCreateHomeSection();

    const created = {
      ...fields,
      imageUrl: `/uploads/home-features/${req.file.filename}`,
    };

    section.items.push(created);
    await section.save();

    return res.status(201).json({
      success: true,
      message: "Card created successfully.",
      data: section.items[section.items.length - 1],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateHomeFeature = async (req, res) => {
  try {
    const section = await getOrCreateHomeSection();
    const card = section.items.id(req.params.itemId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found.",
      });
    }

    const fields = normalizeItem(req.body, card.toObject());

    if (!fields.title) {
      return res.status(400).json({
        success: false,
        message: "Card title is required.",
      });
    }

    Object.assign(card, fields);

    if (req.file) {
      card.imageUrl = `/uploads/home-features/${req.file.filename}`;
    }

    await section.save();

    return res.json({
      success: true,
      message: "Card updated successfully.",
      data: card,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteHomeFeature = async (req, res) => {
  try {
    const section = await getOrCreateHomeSection();
    const card = section.items.id(req.params.itemId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found.",
      });
    }

    card.deleteOne();
    await section.save();

    return res.json({
      success: true,
      message: "Card deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
