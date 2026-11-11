
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

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

// Public route
router.get("/:pageKey", getHomeFeatures);

// Admin only routes
router.get("/admin/:pageKey", adminAuth, getAdminHomeFeatures);

router.put("/admin/:pageKey", adminAuth, saveHomeFeatureSettings);

router.post(
  "/admin/:pageKey/items",
  adminAuth,
  upload.single("image"),
  createHomeFeature
);

router.put(
  "/admin/:pageKey/items/:itemId",
  adminAuth,
  upload.single("image"),
  updateHomeFeature
);

router.delete(
  "/admin/:pageKey/items/:itemId",
  adminAuth,
  deleteHomeFeature
);

export default router;
