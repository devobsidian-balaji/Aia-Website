
import PageHero from "../models/PageHero.js";
import fs from "fs";
import path from "path";

const ALLOWED_PAGES = {
  "about-aia": "About AIA",
  membership: "Membership",
  "industry-insight": "Industry Insights",
  "talent-connect": "Talent Connect",
  events: "Events",
  "contact-us": "Contact Us",
  iafsm: "IAFSM",
};

// Generate image URL
const getImageUrl = (req, filename) => {
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
};

// Safely delete an image uploaded by this CMS
const deleteUploadedImage = (imageUrl) => {
  if (!imageUrl) return;

  try {
    const parsedUrl = new URL(imageUrl);

    // Only clean images from our local uploads endpoint
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
    console.error("Image cleanup error:", error.message);
  }
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
  const uploadedFile = req.file;

  try {
    const {
      pageKey,
      heading,
      overlayOpacity,
      isActive,
    } = req.body;

    // Validate page
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

    // New image or existing image
    let bannerImage = existingHero?.bannerImage || "";

    if (uploadedFile) {
      bannerImage = getImageUrl(req, uploadedFile.filename);
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

    // Delete previous image only after successful DB save
    if (
      uploadedFile &&
      existingHero?.bannerImage &&
      existingHero.bannerImage !== bannerImage
    ) {
      deleteUploadedImage(existingHero.bannerImage);
    }

    return res.status(200).json({
      success: true,
      message: "Page hero saved successfully.",
      data: hero,
    });
  } catch (error) {
    // Remove newly uploaded file if DB save fails
    if (uploadedFile?.path && fs.existsSync(uploadedFile.path)) {
      fs.unlinkSync(uploadedFile.path);
    }

    console.error("Save page hero error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save page hero.",
      error: error.message,
    });
  }
};

// DELETE PAGE HERO
export const deletePageHero = async (req, res) => {
  try {
    const { pageKey } = req.params;

    if (!ALLOWED_PAGES[pageKey]) {
      return res.status(400).json({
        success: false,
        message: "Invalid page key.",
      });
    }

    const hero = await PageHero.findOneAndDelete({ pageKey });

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: "Page hero not found.",
      });
    }

    deleteUploadedImage(hero.bannerImage);

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
