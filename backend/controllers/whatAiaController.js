
import mongoose from "mongoose";
import { WhatAia } from "../models/WhatAia.js";

const SECTION_KEY = "home-what-aia";

const DEFAULT_HEADING = "What AIA does";

const getOrCreateSection = async () => {
  let section = await WhatAia.findOne({
    sectionKey: SECTION_KEY,
  });

  if (!section) {
    section = await WhatAia.create({
      sectionKey: SECTION_KEY,
      heading: "What AIA does",
      cards: [],
    });
  }

  if (!Array.isArray(section.cards)) {
    section.cards = [];
    await section.save();
  }

  return section;
};

const validateId = (id, res) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid card ID",
    });
    return false;
  }
  return true;
};

// Public: home page section
export const getWhatAia = async (req, res) => {
  try {
    const section = await WhatAia.findOne({
      sectionKey: SECTION_KEY,
      isActive: true,
    }).lean();

    if (!section) {
      return res.json({
        success: true,
        data: {
          heading: DEFAULT_HEADING,
          subtitle: "",
          cards: [],
        },
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

// Admin: get all cards, including inactive cards
export const getAdminWhatAia = async (req, res) => {
  try {
    const section = await getOrCreateSection();

    res.json({
      success: true,
      data: section,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update heading and subtitle
export const updateWhatAiaSection = async (req, res) => {
  try {
    const { heading, subtitle, isActive } = req.body;
    const update = {};

    if (heading !== undefined) {
      if (typeof heading !== "string" || !heading.trim()) {
        return res.status(400).json({
          success: false,
          message: "Heading is required",
        });
      }
      update.heading = heading.trim();
    }

    if (subtitle !== undefined) {
      if (typeof subtitle !== "string") {
        return res.status(400).json({
          success: false,
          message: "Subtitle must be text",
        });
      }
      update.subtitle = subtitle.trim();
    }

    if (isActive !== undefined) {
      if (typeof isActive !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "isActive must be a boolean",
        });
      }
      update.isActive = isActive;
    }

    const section = await WhatAia.findOneAndUpdate(
      { sectionKey: SECTION_KEY },
      {
        $set: update,
        $setOnInsert: { sectionKey: SECTION_KEY },
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, data: section });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create card
export const createWhatAiaCard = async (req, res) => {
  try {
    const { title, description, imageUrl, imageAlt, order } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof imageUrl !== "string" ||
      !imageUrl.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Title, description and imageUrl are required",
      });
    }

    const section = await getOrCreateSection();

    section.cards.push({
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      imageAlt: imageAlt || title.trim(),
      order: Number.isFinite(Number(order))
        ? Number(order)
        : section.cards.length,
      isActive: true,
    });

    await section.save();

    res.status(201).json({
      success: true,
      data: section.cards[section.cards.length - 1],
      message: "Card created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update card
export const updateWhatAiaCard = async (req, res) => {
  try {
    if (!validateId(req.params.cardId, res)) return;

    const section = await getOrCreateSection();
    const card = section.cards.id(req.params.cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "imageUrl",
      "imageAlt",
      "order",
      "isActive",
    ];

    for (const field of allowedFields) {
      if (req.body[field] === undefined) continue;

      if (["title", "description", "imageUrl"].includes(field)) {
        if (
          typeof req.body[field] !== "string" ||
          !req.body[field].trim()
        ) {
          return res.status(400).json({
            success: false,
            message: `${field} must be a non-empty string`,
          });
        }
        card[field] = req.body[field].trim();
      } else if (field === "order") {
        const order = Number(req.body.order);
        if (!Number.isFinite(order)) {
          return res.status(400).json({
            success: false,
            message: "Order must be a number",
          });
        }
        card.order = order;
      } else if (field === "isActive") {
        if (typeof req.body.isActive !== "boolean") {
          return res.status(400).json({
            success: false,
            message: "isActive must be a boolean",
          });
        }
        card.isActive = req.body.isActive;
      } else {
        card[field] = req.body[field];
      }
    }

    await section.save();

    res.json({
      success: true,
      data: card,
      message: "Card updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete card
export const deleteWhatAiaCard = async (req, res) => {
  try {
    if (!validateId(req.params.cardId, res)) return;

    const section = await getOrCreateSection();
    const card = section.cards.id(req.params.cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    card.deleteOne();
    await section.save();

    res.json({
      success: true,
      message: "Card deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
