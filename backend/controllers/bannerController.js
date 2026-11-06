// import { Banner } from '../models/Banner.js';

// export const getBanners = async (req, res) => {
//   try {
//     const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
//     res.json({ success: true, data: banners });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const createBanner = async (req, res) => {
//   try {
//     const { name, base64Images, imageUrl, isFullScreen } = req.body;
//     const createdBanners = [];

//     // 1. Multer files
//     if (req.files && req.files.length > 0) {
//       for (let i = 0; i < req.files.length; i++) {
//         const file = req.files[i];
//         const banner = await Banner.create({
//           name: req.files.length > 1 ? `${name || 'Banner'} ${i + 1}` : (name || 'Home Banner'),
//           imageUrl: `http://localhost:${process.env.PORT || 5000}/uploads/${file.filename}`,
//           isActive: true,
//           order: i,
//         });
//         createdBanners.push(banner);
//       }
//       return res.json({ success: true, data: createdBanners, message: 'Banners uploaded successfully!' });
//     }

//     // 2. Base64 images
//     if (base64Images && Array.isArray(base64Images) && base64Images.length > 0) {
//       for (let i = 0; i < base64Images.length; i++) {
//         const banner = await Banner.create({
//           name: base64Images.length > 1 ? `${name || 'Banner'} ${i + 1}` : (name || 'Home Banner'),
//           imageUrl: base64Images[i],
//           isActive: true,
//           order: i,
//         });
//         createdBanners.push(banner);
//       }
//       return res.json({ success: true, data: createdBanners, message: 'Banners created successfully!' });
//     }

//     // 3. Direct URL
//     if (imageUrl) {
//       const banner = await Banner.create({
//         name: name || 'Home Banner',
//         imageUrl: imageUrl,
//         isActive: true,
//       });
//       return res.json({ success: true, data: [banner], message: 'Banner added successfully!' });
//     }

//     return res.status(400).json({ success: false, message: 'No images provided' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const updateBanner = async (req, res) => {
//   try {
//     const { name, isActive, order } = req.body;
//     const updated = await Banner.findByIdAndUpdate(
//       req.params.id,
//       { ...(name && { name }), ...(isActive !== undefined && { isActive }), ...(order !== undefined && { order }) },
//       { new: true }
//     );
//     if (!updated) return res.status(404).json({ success: false, message: 'Banner not found' });
//     res.json({ success: true, data: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const deleteBanner = async (req, res) => {
//   try {
//     const deleted = await Banner.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ success: false, message: 'Banner not found' });
//     res.json({ success: true, message: 'Banner deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };




import { Banner } from "../models/Banner.js";
import fs from "fs";
import path from "path";
import { uploadsDir } from "../config/uploadPaths.js";

// ==========================================
// BACKEND URL
// ==========================================

const getBackendUrl = () => {
  const baseUrl =
    process.env.BACKEND_URL ||
    `http://localhost:${process.env.PORT || 5000}`;

  return baseUrl.replace(/\/+$/, "");
};

// ==========================================
// GENERATE VIDEO URL
// ==========================================

const getFileUrl = (filename) => {
  return `${getBackendUrl()}/uploads/${filename}`;
};

// ==========================================
// DELETE UPLOADED VIDEO
// ==========================================

const deleteUploadedFile = (url) => {
  if (!url) return;

  try {
    const parsedUrl = new URL(url);
    const filename = path.basename(parsedUrl.pathname);

    if (!filename) return;

    const filePath = path.resolve(uploadsDir, filename);

    // Security: prevent deleting files outside uploads
    if (!filePath.startsWith(uploadsDir + path.sep)) {
      return;
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Deleted uploaded video:", filename);
    }
  } catch (error) {
    console.error("Video deletion error:", error.message);
  }
};

// ==========================================
// GET ALL BANNERS
// ==========================================

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      data: banners,
    });
  } catch (error) {
    console.error("Get banners error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// CREATE HOME HERO BANNER
// ==========================================

export const createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a hero video.",
      });
    }

    const videoUrl = getFileUrl(req.file.filename);

    await Banner.updateMany(
      {},
      { $set: { isActive: false } }
    );

    const banner = await Banner.create({
      name: "Home Hero",
      title: req.body.title || "",
      description: req.body.description || "",
      videoUrl,

      ctaPrimaryText: req.body.ctaPrimaryText || "",
      ctaPrimaryUrl: req.body.ctaPrimaryUrl || "",

      ctaSecondaryText: req.body.ctaSecondaryText || "",
      ctaSecondaryUrl: req.body.ctaSecondaryUrl || "",

      isActive: true,
    });

    return res.status(201).json({
      success: true,
      data: banner,
      message: "Home hero video uploaded successfully.",
    });
  } catch (error) {
    console.error("Create banner error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE HOME HERO BANNER
// ==========================================

export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });
    }

    let oldVideoUrl = null;

    if (req.file) {
      oldVideoUrl = banner.videoUrl;
      banner.videoUrl = getFileUrl(req.file.filename);
    }

    const fields = [
      "title",
      "description",
      "ctaPrimaryText",
      "ctaPrimaryUrl",
      "ctaSecondaryText",
      "ctaSecondaryUrl",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        banner[field] = req.body[field];
      }
    });

    if (req.body.isActive !== undefined) {
      banner.isActive =
        req.body.isActive === "true" ||
        req.body.isActive === true;
    }

    await banner.save();

    // Delete old video only after successful save
    if (oldVideoUrl) {
      deleteUploadedFile(oldVideoUrl);
    }

    return res.json({
      success: true,
      data: banner,
      message: "Home hero updated successfully.",
    });
  } catch (error) {
    console.error("Update banner error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE HOME HERO BANNER
// ==========================================

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });
    }

    const videoUrl = banner.videoUrl;

    await banner.deleteOne();

    deleteUploadedFile(videoUrl);

    return res.json({
      success: true,
      message: "Home hero deleted successfully.",
    });
  } catch (error) {
    console.error("Delete banner error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
