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

// Public routes
router.get("/:pageKey", getHomeFeatures);

// Admin routes
router.get("/admin/:pageKey", getAdminHomeFeatures);

router.put("/admin/:pageKey", saveHomeFeatureSettings);

router.post(
  "/admin/:pageKey/items",
  upload.single("image"),
  createHomeFeature
);

router.put(
  "/admin/:pageKey/items/:itemId",
  upload.single("image"),
  updateHomeFeature
);

router.delete(
  "/admin/:pageKey/items/:itemId",
  deleteHomeFeature
);

export default router;