
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

// Public Home Page section
router.get("/home", getHomeFeatures);

// Home Features CMS
router.get("/admin/home", getAdminHomeFeatures);
router.put("/admin/home", saveHomeFeatureSettings);

router.post(
  "/admin/home/items",
  upload.single("image"),
  createHomeFeature
);

router.put(
  "/admin/home/items/:itemId",
  upload.single("image"),
  updateHomeFeature
);

router.delete(
  "/admin/home/items/:itemId",
  deleteHomeFeature
);

export default router;
