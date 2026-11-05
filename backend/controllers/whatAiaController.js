
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
      heading: DEFAULT_HEADING,
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

// PUBLIC SECTION
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

    return res.json({
      success: true,
      data: section,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN GET
export const getAdminWhatAia = async (req, res) => {
  try {
    const section = await getOrCreateSection();

    return res.json({
      success: true,
      data: section,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE SECTION
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
          message: "isActive must be boolean",
        });
      }

      update.isActive = isActive;
    }

    const section = await WhatAia.findOneAndUpdate(
      { sectionKey: SECTION_KEY },
      {
        $set: update,
        $setOnInsert: {
          sectionKey: SECTION_KEY,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.json({
      success: true,
      data: section,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE CARD
export const createWhatAiaCard = async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      imageAlt,
      order,
    } = req.body;

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

    return res.status(201).json({
      success: true,
      data: section.cards[section.cards.length - 1],
      message: "Card created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE CARD
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

    const {
      title,
      description,
      imageUrl,
      imageAlt,
      order,
      isActive,
    } = req.body;

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title is required",
        });
      }

      card.title = title.trim();
    }

    if (description !== undefined) {
      if (
        typeof description !== "string" ||
        !description.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Description is required",
        });
      }

      card.description = description.trim();
    }

    if (imageUrl !== undefined) {
      if (
        typeof imageUrl !== "string" ||
        !imageUrl.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Image is required",
        });
      }

      card.imageUrl = imageUrl.trim();
    }

    if (imageAlt !== undefined) {
      card.imageAlt = imageAlt;
    }

    if (order !== undefined) {
      const parsedOrder = Number(order);

      if (!Number.isFinite(parsedOrder)) {
        return res.status(400).json({
          success: false,
          message: "Order must be a number",
        });
      }

      card.order = parsedOrder;
    }

    if (isActive !== undefined) {
      if (typeof isActive !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "isActive must be boolean",
        });
      }

      card.isActive = isActive;
    }

    await section.save();

    return res.json({
      success: true,
      data: card,
      message: "Card updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE CARD
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

    return res.json({
      success: true,
      message: "Card deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
