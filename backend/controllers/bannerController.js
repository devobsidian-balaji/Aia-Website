
import { Banner } from "../models/Banner.js";
import cloudinary from "../config/cloudinary.js";

import fs from "fs";
import path from "path";
import { uploadsDir } from "../config/uploadPaths.js";

// ==========================================
// UPLOAD VIDEO TO CLOUDINARY
// ==========================================

const uploadVideoToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    if (!file?.buffer) {
      return reject(new Error("Video file is missing."));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",

        // Cloudinary folder structure
        folder: "AIA-Project-Assets/Home-Banner",

        public_id: `home-hero-${Date.now()}`,
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        if (!result?.secure_url || !result?.public_id) {
          return reject(
            new Error("Cloudinary video upload failed.")
          );
        }

        resolve({
          videoUrl: result.secure_url,
          videoPublicId: result.public_id,
        });
      }
    );

    uploadStream.end(file.buffer);
  });
};

// ==========================================
// DELETE CLOUDINARY VIDEO
// ==========================================

const deleteCloudinaryVideo = async (publicId) => {
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(
      publicId,
      {
        resource_type: "video",
        invalidate: true,
      }
    );

    if (
      result.result !== "ok" &&
      result.result !== "not found"
    ) {
      console.error(
        "Cloudinary video deletion response:",
        result
      );
    } else {
      console.log("Cloudinary video deleted:", publicId);
    }
  } catch (error) {
    console.error(
      "Cloudinary video deletion error:",
      error.message
    );
  }
};

// ==========================================
// DELETE OLD LOCAL VIDEO
// Backward compatibility for existing videos
// ==========================================

const deleteLegacyLocalVideo = (url) => {
  if (!url) return;

  try {
    const parsedUrl = new URL(url);

    if (!parsedUrl.pathname.startsWith("/uploads/")) {
      return;
    }

    const filename = path.basename(parsedUrl.pathname);

    if (!filename) return;

    const safeUploadsDir = path.resolve(uploadsDir);
    const filePath = path.resolve(safeUploadsDir, filename);

    // Security: prevent deleting files outside uploads
    if (!filePath.startsWith(safeUploadsDir + path.sep)) {
      return;
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);

      console.log(
        "Deleted legacy local video:",
        filename
      );
    }
  } catch (error) {
    console.error(
      "Legacy video deletion error:",
      error.message
    );
  }
};

// ==========================================
// DELETE BANNER VIDEO
// Supports Cloudinary and old local videos
// ==========================================

const deleteBannerVideo = async (banner) => {
  if (!banner) return;

  if (banner.videoPublicId) {
    await deleteCloudinaryVideo(banner.videoPublicId);
    return;
  }

  // Old banners may not have a Cloudinary public ID
  deleteLegacyLocalVideo(banner.videoUrl);
};

// ==========================================
// CLEANUP NEW CLOUDINARY VIDEO ON FAILURE
// ==========================================

const cleanupNewVideo = async (uploadedVideo) => {
  if (uploadedVideo?.videoPublicId) {
    await deleteCloudinaryVideo(
      uploadedVideo.videoPublicId
    );
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
  let uploadedVideo = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a hero video.",
      });
    }

    // Upload video to Cloudinary
    uploadedVideo = await uploadVideoToCloudinary(req.file);

    const banner = await Banner.create({
      name: "Home Hero",

      title: req.body.title || "",
      description: req.body.description || "",

      videoUrl: uploadedVideo.videoUrl,
      videoPublicId: uploadedVideo.videoPublicId,

      ctaPrimaryText: req.body.ctaPrimaryText || "",
      ctaPrimaryUrl: req.body.ctaPrimaryUrl || "",

      ctaSecondaryText: req.body.ctaSecondaryText || "",
      ctaSecondaryUrl: req.body.ctaSecondaryUrl || "",

      isActive: true,
    });

    // Deactivate other banners after successful creation
    await Banner.updateMany(
      { _id: { $ne: banner._id } },
      { $set: { isActive: false } }
    );

    return res.status(201).json({
      success: true,
      data: banner,
      message: "Home hero video uploaded to Cloudinary successfully.",
    });
  } catch (error) {
    console.error("Create banner error:", error);

    // Remove newly uploaded Cloudinary asset if DB operation fails
    await cleanupNewVideo(uploadedVideo);

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
  let uploadedVideo = null;

  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });
    }

    let oldVideoUrl = null;
    let oldVideoPublicId = null;

    // Upload only when a new video is selected
    if (req.file) {
      uploadedVideo = await uploadVideoToCloudinary(req.file);

      oldVideoUrl = banner.videoUrl;
      oldVideoPublicId = banner.videoPublicId;

      banner.videoUrl = uploadedVideo.videoUrl;
      banner.videoPublicId = uploadedVideo.videoPublicId;
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

    // Save database first
    await banner.save();

    // Delete old video only after successful DB save
    if (uploadedVideo) {
      if (oldVideoPublicId) {
        await deleteCloudinaryVideo(oldVideoPublicId);
      } else if (oldVideoUrl) {
        // Backward compatibility with old local videos
        deleteLegacyLocalVideo(oldVideoUrl);
      }
    }

    return res.json({
      success: true,
      data: banner,
      message: uploadedVideo
        ? "Home hero video replaced successfully."
        : "Home hero content updated successfully.",
    });
  } catch (error) {
    console.error("Update banner error:", error);

    // If DB update fails, remove newly uploaded video
    await cleanupNewVideo(uploadedVideo);

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

    // Delete database record first
    await banner.deleteOne();

    // Then delete video from Cloudinary or old local storage
    await deleteBannerVideo(banner);

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
