import PageHero from "../models/PageHero.js";
import fs from "node:fs";
import path from "node:path";

import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

const ALLOWED_PAGES = {
  "about-aia": "About AIA",
  membership: "Membership",
  "industry-insight": "Industry Insights",
  "talent-connect": "Talent Connect",
  events: "Events",
  "contact-us": "Contact Us",
  iafsm: "IAFSM",
};

// Get Cloudinary public ID from existing Cloudinary URL
const getCloudinaryPublicId = (imageUrl = "") => {
  try {
    const parsedUrl = new URL(imageUrl);

    if (!parsedUrl.hostname.endsWith("cloudinary.com")) {
      return "";
    }

    const uploadIndex = parsedUrl.pathname.indexOf("/upload/");

    if (uploadIndex === -1) return "";

    let assetPath = parsedUrl.pathname.slice(uploadIndex + 8);

    // Remove transformations if present
    const segments = assetPath.split("/");
    if (segments[0]?.includes(",")) {
      segments.shift();
    }

    // Remove version number
    assetPath = segments.join("/").replace(/^v\d+\//, "");

    // Remove extension
    assetPath = assetPath.replace(/\.[^/.]+$/, "");

    return decodeURIComponent(assetPath);
  } catch (error) {
    console.error("Public ID extraction error:", error.message);
    return "";
  }
};

// Delete Cloudinary image
const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;

  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
    invalidate: true,
  });

  if (!["ok", "not found"].includes(result.result)) {
    throw new Error(`Cloudinary deletion failed: ${result.result}`);
  }
};

// Delete old local uploads, if any
const deleteLocalImage = (imageUrl) => {
  if (!imageUrl) return;

  try {
    const parsedUrl = new URL(imageUrl);

    if (!parsedUrl.pathname.startsWith("/uploads/")) return;

    const filename = path.basename(parsedUrl.pathname);
    if (!filename) return;

    const uploadDirectory = path.resolve("uploads");
    const filePath = path.join(uploadDirectory, filename);

    if (!filePath.startsWith(uploadDirectory + path.sep)) return;

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Local image cleanup error:", error.message);
  }
};

// Delete either Cloudinary or legacy local image
const deleteStoredImage = async (imageUrl, publicId = "") => {
  const cloudinaryId = publicId || getCloudinaryPublicId(imageUrl);

  if (cloudinaryId) {
    await deleteCloudinaryImage(cloudinaryId);
    return;
  }

  deleteLocalImage(imageUrl);
};

// GET ALL PAGE HEROES
export const getAllPageHeroes = async (req, res) => {
  try {
    const heroes = await PageHero.find().sort({ pageName: 1 });

    return res.status(200).json({
      success: true,
      data: heroes,
    });
  } catch (error) {
    console.error("Get all page heroes:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch page heroes.",
      error: error.message,
    });
  }
};

// GET SINGLE PAGE HERO
export const getPageHero = async (req, res) => {
  try {
    const { pageKey } = req.params;

    if (!ALLOWED_PAGES[pageKey]) {
      return res.status(400).json({
        success: false,
        message: "Invalid page key.",
      });
    }

    const hero = await PageHero.findOne({
      pageKey,
      isActive: true,
    });

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Page hero not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: hero,
    });
  } catch (error) {
    console.error("Get page hero:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch page hero.",
      error: error.message,
    });
  }
};

// CREATE / UPDATE PAGE HERO
export const savePageHero = async (req, res) => {
  let newPublicId = "";

  try {
    const {
      pageKey,
      heading,
      overlayOpacity,
      isActive,
    } = req.body;

    if (!ALLOWED_PAGES[pageKey]) {
      return res.status(400).json({
        success: false,
        message: "Invalid page key.",
      });
    }

    const existingHero = await PageHero.findOne({ pageKey });

    const parsedOpacity =
      overlayOpacity !== undefined
        ? Number(overlayOpacity)
        : existingHero?.overlayOpacity ?? 85;

    if (
      !Number.isFinite(parsedOpacity) ||
      parsedOpacity < 0 ||
      parsedOpacity > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Overlay opacity must be between 0 and 100.",
      });
    }

    let bannerImage = existingHero?.bannerImage || "";

    let bannerImagePublicId =
      existingHero?.bannerImagePublicId ||
      getCloudinaryPublicId(existingHero?.bannerImage);

    // Upload new image to Cloudinary
    if (req.file) {
      const uploaded = await uploadToCloudinary(
        req.file.path,
        `AIA-Project-Assets/Page-Heroes/${pageKey}`
      );

      bannerImage = uploaded.url;
      bannerImagePublicId = uploaded.publicId;
      newPublicId = uploaded.publicId;
    }

    if (!bannerImage) {
      return res.status(400).json({
        success: false,
        message: "Please upload a hero image.",
      });
    }

    const updateData = {
      pageKey,
      pageName: ALLOWED_PAGES[pageKey],
      heading:
        heading !== undefined
          ? heading.trim()
          : existingHero?.heading || "",
      bannerImage,
      bannerImagePublicId,
      overlayOpacity: parsedOpacity,
      isActive:
        isActive !== undefined
          ? isActive === true || isActive === "true"
          : existingHero?.isActive ?? true,
    };

    const hero = await PageHero.findOneAndUpdate(
      { pageKey },
      { $set: updateData },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    // Delete old image only after successful database update
    const oldPublicId =
      existingHero?.bannerImagePublicId ||
      getCloudinaryPublicId(existingHero?.bannerImage);

    if (
      req.file &&
      oldPublicId &&
      oldPublicId !== newPublicId
    ) {
      try {
        await deleteStoredImage(
          existingHero.bannerImage,
          oldPublicId
        );
      } catch (cleanupError) {
        console.error("Old image cleanup failed:", cleanupError);
      }
    } else if (req.file && existingHero?.bannerImage) {
      deleteLocalImage(existingHero.bannerImage);
    }

    return res.status(200).json({
      success: true,
      message: "Page hero saved successfully.",
      data: hero,
    });
  } catch (error) {
    // Remove newly uploaded Cloudinary image if DB save fails
    if (newPublicId) {
      try {
        await deleteCloudinaryImage(newPublicId);
      } catch (cleanupError) {
        console.error("New image cleanup failed:", cleanupError);
      }
    }

    console.error("Save page hero error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save page hero.",
      error: error.message,
    });
  }
};

// REMOVE ONLY HERO IMAGE
export const removePageHeroImage = async (req, res) => {
  try {
    const { pageKey } = req.params;

    if (!ALLOWED_PAGES[pageKey]) {
      return res.status(400).json({
        success: false,
        message: "Invalid page key.",
      });
    }

    const hero = await PageHero.findOne({ pageKey });

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Page hero not found.",
      });
    }

    if (!hero.bannerImage) {
      return res.status(400).json({
        success: false,
        message: "No hero image available to remove.",
      });
    }

    const oldImageUrl = hero.bannerImage;

    const oldPublicId =
      hero.bannerImagePublicId ||
      getCloudinaryPublicId(oldImageUrl);

    // First clear DB image fields
    hero.bannerImage = "";
    hero.bannerImagePublicId = "";

    await hero.save();

    // Then remove stored image
    try {
      await deleteStoredImage(oldImageUrl, oldPublicId);
    } catch (cleanupError) {
      console.error("Cloudinary image removal failed:", cleanupError);

      return res.status(200).json({
        success: true,
        message:
          "Image removed from CMS, but Cloudinary cleanup needs attention.",
        warning: cleanupError.message,
        data: hero,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hero image removed successfully.",
      data: hero,
    });
  } catch (error) {
    console.error("Remove page hero image error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to remove hero image.",
      error: error.message,
    });
  }
};

// DELETE COMPLETE PAGE HERO
export const deletePageHero = async (req, res) => {
  try {
    const { pageKey } = req.params;

    if (!ALLOWED_PAGES[pageKey]) {
      return res.status(400).json({
        success: false,
        message: "Invalid page key.",
      });
    }

    const hero = await PageHero.findOne({ pageKey });

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Page hero not found.",
      });
    }

    // Delete DB document
    await PageHero.deleteOne({ _id: hero._id });

    // Cleanup image
    try {
      await deleteStoredImage(
        hero.bannerImage,
        hero.bannerImagePublicId
      );
    } catch (cleanupError) {
      console.error("Hero image cleanup failed:", cleanupError);
    }

    return res.status(200).json({
      success: true,
      message: "Page hero deleted successfully.",
    });
  } catch (error) {
    console.error("Delete page hero error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete page hero.",
      error: error.message,
    });
  }
};