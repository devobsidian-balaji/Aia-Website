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

const getFileUrl = (filename) => {
  const baseUrl = (
    process.env.BACKEND_URL ||
    `http://localhost:${process.env.PORT || 5000}`
  ).replace(/\/$/, "");

  return `${baseUrl}/uploads/${filename}`;
};

const deleteUploadedFile = (url) => {
  if (!url) return;

  try {
    const filename = path.basename(new URL(url).pathname);
    const filePath = path.resolve("uploads", filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Video deletion error:", error.message);
  }
};

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });

    res.json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a hero video.",
      });
    }

    await Banner.updateMany({}, { isActive: false });

    const banner = await Banner.create({
      name: "Home Hero",
      title: req.body.title,
      description: req.body.description,
      videoUrl: getFileUrl(req.file.filename),
      ctaPrimaryText: req.body.ctaPrimaryText,
      ctaPrimaryUrl: req.body.ctaPrimaryUrl,
      ctaSecondaryText: req.body.ctaSecondaryText,
      ctaSecondaryUrl: req.body.ctaSecondaryUrl,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      data: banner,
      message: "Home hero video uploaded successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });
    }

    if (req.file) {
      deleteUploadedFile(banner.videoUrl);
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
        req.body.isActive === "true" || req.body.isActive === true;
    }

    await banner.save();

    res.json({
      success: true,
      data: banner,
      message: "Home hero updated successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });
    }

    deleteUploadedFile(banner.videoUrl);
    await banner.deleteOne();

    res.json({
      success: true,
      message: "Home hero deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};