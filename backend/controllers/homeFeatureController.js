
import HomeFeatureSection from "../models/HomeFeatureSection.js";

// ==========================================
// VALID PAGE KEYS
// ==========================================

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

// ==========================================
// GET OR CREATE PAGE SECTION
// ==========================================

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

// ==========================================
// NORMALIZE DATA
// ==========================================

const normalizeBoolean = (value, fallback = true) => {
  if (value === undefined) return fallback;

  return value === true || value === "true";
};

const normalizeItem = (body, existing = {}) => ({
  title: String(body.title ?? existing.title ?? "").trim(),

  description:
    body.description ?? existing.description ?? "",

  imageAlt:
    body.imageAlt ?? existing.imageAlt ?? "",

  link:
    body.link ?? existing.link ?? "",

  linkText:
    body.linkText ?? existing.linkText ?? "Learn More",

  order: Number.isFinite(Number(body.order))
    ? Number(body.order)
    : existing.order ?? 0,

  isActive: normalizeBoolean(
    body.isActive,
    existing.isActive !== false
  ),
});

// ==========================================
// PUBLIC: GET PAGE FEATURES
// GET /api/home-features/:pageKey
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
      return res.json({
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

    section.items = (section.items || [])
      .filter((item) => item.isActive !== false)
      .sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      );

    return res.json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Get Home Features:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: GET PAGE FEATURES
// GET /api/home-features/admin/:pageKey
// ==========================================

export const getAdminHomeFeatures = async (req, res) => {
  try {
    const pageKey = getPageKey(req, res);

    if (!pageKey) return;

    const section = await getOrCreateSection(pageKey);

    return res.json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Get Admin Home Features:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: SAVE SECTION SETTINGS
// PUT /api/home-features/admin/:pageKey
// ==========================================

export const saveHomeFeatureSettings = async (req, res) => {
  try {
    const pageKey = getPageKey(req, res);

    if (!pageKey) return;

    const section = await getOrCreateSection(pageKey);

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
      message: "Section settings saved successfully.",
      data: section,
    });
  } catch (error) {
    console.error("Save Home Feature Settings:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: CREATE CARD
// POST /api/home-features/admin/:pageKey/items
// ==========================================

export const createHomeFeature = async (req, res) => {
  try {
    const pageKey = getPageKey(req, res);

    if (!pageKey) return;

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

    const section = await getOrCreateSection(pageKey);

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
    console.error("Create Home Feature:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: UPDATE CARD
// PUT /api/home-features/admin/:pageKey/items/:itemId
// ==========================================

export const updateHomeFeature = async (req, res) => {
  try {
    const pageKey = getPageKey(req, res);

    if (!pageKey) return;

    const section = await getOrCreateSection(pageKey);

    const card = section.items.id(req.params.itemId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found.",
      });
    }

    const fields = normalizeItem(
      req.body,
      card.toObject()
    );

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
    console.error("Update Home Feature:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: DELETE CARD
// DELETE /api/home-features/admin/:pageKey/items/:itemId
// ==========================================

export const deleteHomeFeature = async (req, res) => {
  try {
    const pageKey = getPageKey(req, res);

    if (!pageKey) return;

    const section = await getOrCreateSection(pageKey);

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
    console.error("Delete Home Feature:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
