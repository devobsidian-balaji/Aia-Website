
import express from "express";
import upload from "../middleware/homeFeatureUpload.js";

import {
  getHomeFeatures,
  getAdminHomeFeatures,
  saveHomeFeatureSettings,
  createHomeFeature,
  updateHomeFeature,
  deleteHomeFeature,
} from "../controllers/homeFeatureController.js";

const router = express.Router();

// ==========================================
// PUBLIC PAGE API
// ==========================================

// Home:  /api/home-features/home
// IAFSM: /api/home-features/iafsm

router.get("/:pageKey", getHomeFeatures);

// ==========================================
// ADMIN CMS API
// ==========================================

// Get section settings and cards
router.get("/admin/:pageKey", getAdminHomeFeatures);

// Save section settings
router.put("/admin/:pageKey", saveHomeFeatureSettings);

// Add new card
router.post(
  "/admin/:pageKey/items",
  upload.single("image"),
  createHomeFeature
);

// Update existing card
router.put(
  "/admin/:pageKey/items/:itemId",
  upload.single("image"),
  updateHomeFeature
);

// Delete existing card
router.delete(
  "/admin/:pageKey/items/:itemId",
  deleteHomeFeature
);

export default router;
