
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getPublicWhyJoin,
  getAdminWhyJoin,
  saveWhyJoinSettings,
  createWhyJoinItem,
  updateWhyJoinItem,
  deleteWhyJoinItem,
} from "../controllers/whyJoinController.js";

import { sliderImageUpload } from "../config/upload.js";

const router = express.Router();

// Public
router.get("/:pageKey/:sectionKey", getPublicWhyJoin);

// Admin only
router.get("/admin/:pageKey/:sectionKey", adminAuth, getAdminWhyJoin);

router.put(
  "/admin/:pageKey/:sectionKey",
  adminAuth,
  saveWhyJoinSettings
);

router.post(
  "/admin/:pageKey/:sectionKey/items",
  adminAuth,
  sliderImageUpload.single("image"),
  createWhyJoinItem
);

router.put(
  "/admin/:pageKey/:sectionKey/items/:itemId",
  adminAuth,
  sliderImageUpload.single("image"),
  updateWhyJoinItem
);

router.delete(
  "/admin/:pageKey/:sectionKey/items/:itemId",
  adminAuth,
  deleteWhyJoinItem
);

export default router;
