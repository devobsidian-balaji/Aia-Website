// import { CouncilMember } from '../models/CouncilMember.js';

// export const getCouncilMembers = async (req, res) => {
//   try {
//     const members = await CouncilMember.find().sort({ order: 1, createdAt: 1 });
//     res.json({ success: true, data: members });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const createCouncilMember = async (req, res) => {
//   try {
//     const { name, role, fullRole, companyName, imageUrl, order } = req.body;
    
//     let finalImageUrl = imageUrl;
//     if (req.file) {
//       finalImageUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
//     }

//     if (!finalImageUrl) {
//       return res.status(400).json({ success: false, message: 'Member photograph is required' });
//     }

//     if (!name || !role || !companyName) {
//       return res.status(400).json({ success: false, message: 'Name, Role, and Company Name are required' });
//     }

//     const created = await CouncilMember.create({
//       name: name.trim(),
//       role: role.trim(),
//       fullRole: fullRole ? fullRole.trim() : '',
//       companyName: companyName.trim(),
//       imageUrl: finalImageUrl,
//       order: order !== undefined ? order : await CouncilMember.countDocuments(),
//       isActive: true,
//     });

//     res.json({ success: true, data: created, message: 'Council Executive Member added successfully!' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const updateCouncilMember = async (req, res) => {
//   try {
//     const updated = await CouncilMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ success: false, message: 'Council member not found' });
//     res.json({ success: true, data: updated, message: 'Council member updated successfully!' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const deleteCouncilMember = async (req, res) => {
//   try {
//     const deleted = await CouncilMember.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ success: false, message: 'Council member not found' });
//     res.json({ success: true, message: 'Council member deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


import fs from "node:fs/promises";
import { CouncilMember } from "../models/CouncilMember.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

const CLOUDINARY_FOLDER = "AIA-Project-Assets/Council-Members";

const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
  } catch (error) {
    console.error("Cloudinary image deletion failed:", error);
  }
};

const deleteTempFile = async (filePath) => {
  if (!filePath) return;

  await fs.unlink(filePath).catch((error) => {
    if (error.code !== "ENOENT") {
      console.error("Temporary file cleanup error:", error);
    }
  });
};

const getValidOrder = (value, fallback = 0) => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0) {
    return fallback;
  }

  return parsed;
};

// Public: Get all council members
export const getCouncilMembers = async (req, res) => {
  try {
    const members = await CouncilMember.find().sort({
      order: 1,
      createdAt: 1,
    });

    return res.json({
      success: true,
      data: members,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Create council member
export const createCouncilMember = async (req, res) => {
  let uploadedImage = null;

  try {
    const { name, role, fullRole, companyName } = req.body;

    if (!name?.trim() || !role?.trim() || !companyName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name, Role, and Company Name are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Member photograph is required.",
      });
    }

    uploadedImage = await uploadToCloudinary(
      req.file.path,
      CLOUDINARY_FOLDER
    );

    const totalMembers = await CouncilMember.countDocuments();
    const order = getValidOrder(req.body.order, totalMembers);

    // Shift existing members to make space at the requested position.
    await CouncilMember.updateMany(
      { order: { $gte: order } },
      { $inc: { order: 1 } }
    );

    const created = await CouncilMember.create({
      name: name.trim(),
      role: role.trim(),
      fullRole: fullRole?.trim() || "",
      companyName: companyName.trim(),
      imageUrl: uploadedImage.url,
      imagePublicId: uploadedImage.publicId,
      order,
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      data: created,
      message: "Council Executive Member added successfully!",
    });
  } catch (error) {
    if (uploadedImage?.publicId) {
      await deleteCloudinaryImage(uploadedImage.publicId);
    }

    if (req.file?.path) {
      await deleteTempFile(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Update council member
export const updateCouncilMember = async (req, res) => {
  let uploadedImage = null;

  try {
    const member = await CouncilMember.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Council member not found.",
      });
    }

    const oldImagePublicId = member.imagePublicId;

    if (req.body.name !== undefined) {
      if (!req.body.name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name is required.",
        });
      }
      member.name = req.body.name.trim();
    }

    if (req.body.role !== undefined) {
      if (!req.body.role.trim()) {
        return res.status(400).json({
          success: false,
          message: "Role is required.",
        });
      }
      member.role = req.body.role.trim();
    }

    if (req.body.fullRole !== undefined) {
      member.fullRole = req.body.fullRole.trim();
    }

    if (req.body.companyName !== undefined) {
      if (!req.body.companyName.trim()) {
        return res.status(400).json({
          success: false,
          message: "Company Name is required.",
        });
      }
      member.companyName = req.body.companyName.trim();
    }

    if (req.body.isActive !== undefined) {
      member.isActive = req.body.isActive === "true" ||
        req.body.isActive === true;
    }

    const oldOrder = member.order;
    const newOrder =
      req.body.order !== undefined
        ? getValidOrder(req.body.order, oldOrder)
        : oldOrder;

    // Upload replacement image only if a new file is selected.
    if (req.file) {
      uploadedImage = await uploadToCloudinary(
        req.file.path,
        CLOUDINARY_FOLDER
      );

      member.imageUrl = uploadedImage.url;
      member.imagePublicId = uploadedImage.publicId;
    }

    member.order = newOrder;

    await member.save();

    // Reposition other members after the updated member has been saved.
    if (newOrder < oldOrder) {
      await CouncilMember.updateMany(
        {
          _id: { $ne: member._id },
          order: { $gte: newOrder, $lt: oldOrder },
        },
        { $inc: { order: 1 } }
      );
    } else if (newOrder > oldOrder) {
      await CouncilMember.updateMany(
        {
          _id: { $ne: member._id },
          order: { $gt: oldOrder, $lte: newOrder },
        },
        { $inc: { order: -1 } }
      );
    }

    // Delete old Cloudinary image only after successful database save.
    if (uploadedImage && oldImagePublicId) {
      await deleteCloudinaryImage(oldImagePublicId);
    }

    return res.json({
      success: true,
      data: member,
      message: "Council member updated successfully!",
    });
  } catch (error) {
    if (uploadedImage?.publicId) {
      await deleteCloudinaryImage(uploadedImage.publicId);
    }

    if (req.file?.path) {
      await deleteTempFile(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin: Delete council member
export const deleteCouncilMember = async (req, res) => {
  try {
    const deleted = await CouncilMember.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Council member not found.",
      });
    }

    if (deleted.imagePublicId) {
      await deleteCloudinaryImage(deleted.imagePublicId);
    }

    // Close the gap left by the deleted member.
    await CouncilMember.updateMany(
      { order: { $gt: deleted.order } },
      { $inc: { order: -1 } }
    );

    return res.json({
      success: true,
      message: "Council member deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};