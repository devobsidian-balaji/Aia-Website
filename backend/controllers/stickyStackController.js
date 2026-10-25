
import mongoose from "mongoose";
import StickyStackSection from "../models/StickyStackSection.js";

const normalizeKey = (value) =>
  String(value || "").trim().toLowerCase();

const validKeys = (pageKey, sectionKey) =>
  Boolean(normalizeKey(pageKey) && normalizeKey(sectionKey));

const getSection = async (pageKey, sectionKey) => {
  return StickyStackSection.findOne({
    pageKey: normalizeKey(pageKey),
    sectionKey: normalizeKey(sectionKey),
  });
};

// GET: Public section data
export const getPublicSection = async (req, res) => {
  try {
    const { pageKey, sectionKey } = req.params;

    if (!validKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "pageKey and sectionKey are required",
      });
    }

    const section = await getSection(pageKey, sectionKey);

    if (!section || !section.isActive) {
      return res.status(404).json({
        success: false,
        message: "Sticky Stack section not found or inactive",
      });
    }

    const data = section.toObject();

    // Only active cards are visible publicly.
    data.items = data.items.filter(
      (item) => item.isActive !== false
    );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("getPublicSection:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Sticky Stack section",
    });
  }
};

// GET: Admin section data; creates an empty section if missing.
export const getAdminSection = async (req, res) => {
  try {
    const { pageKey, sectionKey } = req.params;

    if (!validKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "pageKey and sectionKey are required",
      });
    }

    let section = await getSection(pageKey, sectionKey);

    if (!section) {
      try {
        section = await StickyStackSection.create({
          pageKey: normalizeKey(pageKey),
          sectionKey: normalizeKey(sectionKey),
        });
      } catch (error) {
        // Handle simultaneous requests creating the same section.
        if (error.code !== 11000) throw error;
        section = await getSection(pageKey, sectionKey);
      }
    }

    return res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("getAdminSection:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin section",
    });
  }
};

// PUT: Update heading, subtitle and section visibility.
export const updateSection = async (req, res) => {
  try {
    const { pageKey, sectionKey } = req.params;
    const { heading, subtitle, isActive } = req.body;

    if (!validKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "pageKey and sectionKey are required",
      });
    }

    if (
      heading !== undefined &&
      typeof heading !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "heading must be a string",
      });
    }

    if (
      subtitle !== undefined &&
      typeof subtitle !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "subtitle must be a string",
      });
    }

    if (
      isActive !== undefined &&
      typeof isActive !== "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message: "isActive must be a boolean",
      });
    }

    const update = {};

    if (heading !== undefined) update.heading = heading;
    if (subtitle !== undefined) update.subtitle = subtitle;
    if (isActive !== undefined) update.isActive = isActive;

    const section = await StickyStackSection.findOneAndUpdate(
      {
        pageKey: normalizeKey(pageKey),
        sectionKey: normalizeKey(sectionKey),
      },
      {
        $set: update,
        $setOnInsert: {
          pageKey: normalizeKey(pageKey),
          sectionKey: normalizeKey(sectionKey),
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Sticky Stack section updated",
      data: section,
    });
  } catch (error) {
    console.error("updateSection:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update Sticky Stack section",
    });
  }
};

// POST: Add a card.
export const addItem = async (req, res) => {
  try {
    const { pageKey, sectionKey } = req.params;
    const {
      title,
      description,
      number,
      background,
      textColor,
      numberColor,
      titleClassName,
      descriptionClassName,
      isActive,
    } = req.body;

    if (!validKeys(pageKey, sectionKey)) {
      return res.status(400).json({
        success: false,
        message: "pageKey and sectionKey are required",
      });
    }

    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Card title is required",
      });
    }

    if (
      isActive !== undefined &&
      typeof isActive !== "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message: "isActive must be a boolean",
      });
    }

    if (
      number !== undefined &&
      (!Number.isFinite(Number(number)) || Number(number) < 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "number must be a valid non-negative number",
      });
    }

    let section;

    try {
      section = await StickyStackSection.findOneAndUpdate(
        {
          pageKey: normalizeKey(pageKey),
          sectionKey: normalizeKey(sectionKey),
        },
        {
          $setOnInsert: {
            pageKey: normalizeKey(pageKey),
            sectionKey: normalizeKey(sectionKey),
          },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
    } catch (error) {
      if (error.code !== 11000) throw error;
      section = await getSection(pageKey, sectionKey);
    }

    section.items.push({
      title: title.trim(),
      description: description ?? "",
      number: number ?? section.items.length + 1,
      background: background ?? "bg-[#202B3B]",
      textColor: textColor ?? "text-white",
      numberColor: numberColor ?? "text-white",
      titleClassName: titleClassName ?? "",
      descriptionClassName: descriptionClassName ?? "",
      isActive: isActive ?? true,
    });

    await section.save();

    const item = section.items[section.items.length - 1];

    return res.status(201).json({
      success: true,
      message: "Sticky Stack card added",
      data: item,
    });
  } catch (error) {
    console.error("addItem:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add Sticky Stack card",
    });
  }
};

// PUT: Update a card.
export const updateItem = async (req, res) => {
  try {
    const { pageKey, sectionKey, itemId } = req.params;

    if (
      !validKeys(pageKey, sectionKey) ||
      !mongoose.isValidObjectId(itemId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid page, section or item ID",
      });
    }

    const section = await getSection(pageKey, sectionKey);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Sticky Stack section not found",
      });
    }

    const item = section.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Sticky Stack card not found",
      });
    }

    const allowedFields = [
      "title",
      "description",
      "number",
      "background",
      "textColor",
      "numberColor",
      "titleClassName",
      "descriptionClassName",
      "isActive",
    ];

    for (const field of allowedFields) {
      if (req.body[field] === undefined) continue;

      if (
        ["title", "description", "background", "textColor",
          "numberColor", "titleClassName", "descriptionClassName"]
          .includes(field) &&
        typeof req.body[field] !== "string"
      ) {
        return res.status(400).json({
          success: false,
          message: `${field} must be a string`,
        });
      }

      if (
        field === "number" &&
        (!Number.isFinite(Number(req.body.number)) ||
          Number(req.body.number) < 0)
      ) {
        return res.status(400).json({
          success: false,
          message: "number must be a valid non-negative number",
        });
      }

      if (
        field === "isActive" &&
        typeof req.body.isActive !== "boolean"
      ) {
        return res.status(400).json({
          success: false,
          message: "isActive must be a boolean",
        });
      }

      item.set(field, req.body[field]);
    }

    await section.save();

    return res.status(200).json({
      success: true,
      message: "Sticky Stack card updated",
      data: item,
    });
  } catch (error) {
    console.error("updateItem:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update Sticky Stack card",
    });
  }
};

// DELETE: Delete a card.
export const deleteItem = async (req, res) => {
  try {
    const { pageKey, sectionKey, itemId } = req.params;

    if (
      !validKeys(pageKey, sectionKey) ||
      !mongoose.isValidObjectId(itemId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid page, section or item ID",
      });
    }

    const section = await getSection(pageKey, sectionKey);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Sticky Stack section not found",
      });
    }

    const item = section.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Sticky Stack card not found",
      });
    }

    item.deleteOne();
    await section.save();

    return res.status(200).json({
      success: true,
      message: "Sticky Stack card deleted",
    });
  } catch (error) {
    console.error("deleteItem:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete Sticky Stack card",
    });
  }
};
