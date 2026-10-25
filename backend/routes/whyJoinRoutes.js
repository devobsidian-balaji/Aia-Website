
import express from "express";
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

// Public endpoint
router.get("/:pageKey/:sectionKey", getPublicWhyJoin);

// Admin endpoints: attach existing admin authentication middleware here.
router.get("/admin/:pageKey/:sectionKey", getAdminWhyJoin);

router.put("/admin/:pageKey/:sectionKey", saveWhyJoinSettings);

router.post(
  "/admin/:pageKey/:sectionKey/items",
  sliderImageUpload.single("image"),
  createWhyJoinItem
);

router.put(
  "/admin/:pageKey/:sectionKey/items/:itemId",
  sliderImageUpload.single("image"),
  updateWhyJoinItem
);

router.delete(
  "/admin/:pageKey/:sectionKey/items/:itemId",
  deleteWhyJoinItem
);

export default router;
