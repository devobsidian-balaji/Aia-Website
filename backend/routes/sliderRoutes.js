
import express from "express";
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

// Public: published content only
sliderRouter.get("/:pageKey/:sectionKey", getPublicSlider);

// Admin: all content, including hidden cards
// IMPORTANT: Add your existing admin-auth middleware to these routes.
sliderRouter.get("/admin/:pageKey/:sectionKey", getAdminSlider);

sliderRouter.put(
  "/admin/:pageKey/:sectionKey",
  saveSliderSettings
);

sliderRouter.post(
  "/admin/:pageKey/:sectionKey/cards",
  sliderImageUpload.single("image"),
  createSliderCard
);

sliderRouter.put(
  "/admin/:pageKey/:sectionKey/cards/:cardId",
  sliderImageUpload.single("image"),
  updateSliderCard
);

sliderRouter.delete(
  "/admin/:pageKey/:sectionKey/cards/:cardId",
  deleteSliderCard
);

export default sliderRouter;
