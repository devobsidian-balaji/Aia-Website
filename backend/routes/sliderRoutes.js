
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getPublicSlider,
  getAdminSlider,
  saveSliderSettings,
  createSliderCard,
  updateSliderCard,
  deleteSliderCard,
} from "../controllers/sliderController.js";

import { sliderImageUpload } from "../config/upload.js";

export const sliderRouter = express.Router();

// Public
sliderRouter.get("/:pageKey/:sectionKey", getPublicSlider);

// Admin only
sliderRouter.get("/admin/:pageKey/:sectionKey", adminAuth, getAdminSlider);

sliderRouter.put(
  "/admin/:pageKey/:sectionKey",
  adminAuth,
  saveSliderSettings
);

sliderRouter.post(
  "/admin/:pageKey/:sectionKey/cards",
  adminAuth,
  sliderImageUpload.single("image"),
  createSliderCard
);

sliderRouter.put(
  "/admin/:pageKey/:sectionKey/cards/:cardId",
  adminAuth,
  sliderImageUpload.single("image"),
  updateSliderCard
);

sliderRouter.delete(
  "/admin/:pageKey/:sectionKey/cards/:cardId",
  adminAuth,
  deleteSliderCard
);

export default sliderRouter;
