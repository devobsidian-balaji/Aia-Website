// import { PastPresident } from '../models/PastPresident.js';

// export const getPastPresidents = async (req, res) => {
//   try {
//     const presidents = await PastPresident.find().sort({ order: 1, createdAt: 1 });
//     res.json({ success: true, data: presidents });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const createPastPresident = async (req, res) => {
//   try {
//     const { name, term, role, description, imageUrl, order } = req.body;
    
//     let finalImageUrl = imageUrl;
//     if (req.file) {
//       finalImageUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
//     }

//     if (!finalImageUrl) {
//       return res.status(400).json({ success: false, message: 'President photograph is required' });
//     }

//     if (!name || !term || !description) {
//       return res.status(400).json({ success: false, message: 'Name, Tenure/Term, and Description are required' });
//     }

//     const created = await PastPresident.create({
//       name: name.trim(),
//       term: term.trim(),
//       role: role ? role.trim() : 'Past President',
//       description: description.trim(),
//       imageUrl: finalImageUrl,
//       order: order !== undefined ? order : await PastPresident.countDocuments(),
//       isActive: true,
//     });

//     res.json({ success: true, data: created, message: 'Past President added successfully!' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const updatePastPresident = async (req, res) => {
//   try {
//     const updated = await PastPresident.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ success: false, message: 'Past President not found' });
//     res.json({ success: true, data: updated, message: 'Past President updated successfully!' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const deletePastPresident = async (req, res) => {
//   try {
//     const deleted = await PastPresident.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ success: false, message: 'Past President not found' });
//     res.json({ success: true, message: 'Past President deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

import mongoose from "mongoose";
import fs from "node:fs/promises";

import { PastPresident } from "../models/PastPresident.js";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

const PAST_PRESIDENT_FOLDER =
  "AIA-Project-Assets/Past-Presidents";

// ==========================================
// HELPERS
// ==========================================

const deleteTemporaryFile = async (file) => {
  if (!file?.path) return;

  try {
    await fs.unlink(file.path);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Temporary file cleanup error:", error.message);
    }
  }
};

const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    if (result.result !== "ok" && result.result !== "not found") {
      console.warn("Cloudinary deletion response:", result);
    }
  } catch (error) {
    console.error(
      "Past President Cloudinary deletion failed:",
      error.message
    );
  }
};

const parseOrder = (value, fallback = 0) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
};

const normalizeText = (value) =>
  typeof value === "string" ? value.trim() : "";

// ==========================================
// ORDER MANAGEMENT
// ==========================================

// Insert a new record at the requested position.
// Existing records at that position and after it move down.
const insertOrder = async (order) => {
  await PastPresident.updateMany(
    { order: { $gte: order } },
    { $inc: { order: 1 } }
  );
};

// Move an existing record and close the previous position.
const moveOrder = async (oldOrder, newOrder, id) => {
  if (oldOrder === newOrder) return;

  if (newOrder < oldOrder) {
    await PastPresident.updateMany(
      {
        _id: { $ne: id },
        order: {
          $gte: newOrder,
          $lt: oldOrder,
        },
      },
      { $inc: { order: 1 } }
    );
  } else {
    await PastPresident.updateMany(
      {
        _id: { $ne: id },
        order: {
          $gt: oldOrder,
          $lte: newOrder,
        },
      },
      { $inc: { order: -1 } }
    );
  }
};

// Close the gap after deleting a record.
const closeOrderGap = async (deletedOrder) => {
  await PastPresident.updateMany(
    { order: { $gt: deletedOrder } },
    { $inc: { order: -1 } }
  );
};

// ==========================================
// GET ALL PAST PRESIDENTS
// ==========================================

export const getPastPresidents = async (req, res) => {
  try {
    const filter =
      req.query.admin === "true"
        ? {}
        : { isActive: { $ne: false } };

    const presidents = await PastPresident.find(filter)
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return res.json({
      success: true,
      data: presidents,
    });
  } catch (error) {
    console.error("Get Past Presidents error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// CREATE PAST PRESIDENT
// ==========================================

export const createPastPresident = async (req, res) => {
  let uploadedImage = null;

  try {
    const name = normalizeText(req.body.name);
    const term = normalizeText(req.body.term);
    const role =
      normalizeText(req.body.role) || "Past President";
    const description = normalizeText(req.body.description);

    if (!name || !term || !description) {
      return res.status(400).json({
        success: false,
        message: "Name, Tenure/Term, and Description are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "President photograph is required.",
      });
    }

    const total = await PastPresident.countDocuments();
    const order = parseOrder(req.body.order, total);

    if (order === null) {
      return res.status(400).json({
        success: false,
        message: "Order must be a valid non-negative integer.",
      });
    }

    // Upload image to Cloudinary.
    uploadedImage = await uploadToCloudinary(
      req.file.path,
      PAST_PRESIDENT_FOLDER
    );

    // Shift existing records to prevent duplicate order.
    await insertOrder(order);

    const created = await PastPresident.create({
      name,
      term,
      role,
      description,
      imageUrl: uploadedImage.url,
      imagePublicId: uploadedImage.publicId,
      order,
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      data: created,
      message: "Past President added successfully!",
    });
  } catch (error) {
    // If database creation fails, remove the newly uploaded image.
    if (uploadedImage?.publicId) {
      await deleteCloudinaryImage(uploadedImage.publicId);
    }

    console.error("Create Past President error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    // uploadToCloudinary already removes the temporary file.
    // This is an additional safe cleanup.
    await deleteTemporaryFile(req.file);
  }
};

// ==========================================
// UPDATE PAST PRESIDENT
// ==========================================

export const updatePastPresident = async (req, res) => {
  let uploadedImage = null;

  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Past President ID.",
      });
    }

    const president = await PastPresident.findById(id);

    if (!president) {
      return res.status(404).json({
        success: false,
        message: "Past President not found.",
      });
    }

    const oldPublicId = president.imagePublicId;
    const oldOrder = president.order;

    const name =
      req.body.name !== undefined
        ? normalizeText(req.body.name)
        : president.name;

    const term =
      req.body.term !== undefined
        ? normalizeText(req.body.term)
        : president.term;

    const role =
      req.body.role !== undefined
        ? normalizeText(req.body.role)
        : president.role;

    const description =
      req.body.description !== undefined
        ? normalizeText(req.body.description)
        : president.description;

    if (!name || !term || !description) {
      return res.status(400).json({
        success: false,
        message: "Name, Tenure/Term, and Description are required.",
      });
    }

    const newOrder = parseOrder(req.body.order, oldOrder);

    if (newOrder === null) {
      return res.status(400).json({
        success: false,
        message: "Order must be a valid non-negative integer.",
      });
    }

    // Upload a new image only if the user selected one.
    if (req.file) {
      uploadedImage = await uploadToCloudinary(
        req.file.path,
        PAST_PRESIDENT_FOLDER
      );
    }

    // Update ordering.
    await moveOrder(oldOrder, newOrder, president._id);

    president.name = name;
    president.term = term;
    president.role = role || "Past President";
    president.description = description;
    president.order = newOrder;

    // Replace image only when a new file is uploaded.
    if (uploadedImage) {
      president.imageUrl = uploadedImage.url;
      president.imagePublicId = uploadedImage.publicId;
    }

    if (req.body.isActive !== undefined) {
      president.isActive =
        req.body.isActive === true ||
        req.body.isActive === "true";
    }

    await president.save();

    // Delete the previous image only after the DB update succeeds.
    if (
      uploadedImage &&
      oldPublicId &&
      oldPublicId !== uploadedImage.publicId
    ) {
      await deleteCloudinaryImage(oldPublicId);
    }

    return res.json({
      success: true,
      data: president,
      message: "Past President updated successfully!",
    });
  } catch (error) {
    // Roll back newly uploaded image if the update fails.
    if (uploadedImage?.publicId) {
      await deleteCloudinaryImage(uploadedImage.publicId);
    }

    console.error("Update Past President error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    await deleteTemporaryFile(req.file);
  }
};

// ==========================================
// DELETE PAST PRESIDENT
// ==========================================

export const deletePastPresident = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Past President ID.",
      });
    }

    const president = await PastPresident.findById(id);

    if (!president) {
      return res.status(404).json({
        success: false,
        message: "Past President not found.",
      });
    }

    const oldOrder = president.order;
    const oldPublicId = president.imagePublicId;

    await president.deleteOne();

    // Close the order gap.
    await closeOrderGap(oldOrder);

    // Delete the Cloudinary image.
    await deleteCloudinaryImage(oldPublicId);

    return res.json({
      success: true,
      message:
        "Past President and its Cloudinary image deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Past President error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
