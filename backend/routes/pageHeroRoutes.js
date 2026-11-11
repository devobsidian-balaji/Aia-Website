
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getAllPageHeroes,
  getPageHero,
  savePageHero,
  removePageHeroImage,
  deletePageHero,
} from "../controllers/pageHeroController.js";

import { sliderImageUpload } from "../config/upload.js";

const pageHeroRouter = express.Router();

// Public routes
pageHeroRouter.get("/", getAllPageHeroes);
pageHeroRouter.get("/:pageKey", getPageHero);

// Admin only: Create / Update Page Hero
pageHeroRouter.post(
  "/",
  adminAuth,
  sliderImageUpload.single("image"),
  savePageHero
);

// Admin only: Remove Hero Image
pageHeroRouter.delete(
  "/:pageKey/image",
  adminAuth,
  removePageHeroImage
);

// Admin only: Delete Complete Page Hero
pageHeroRouter.delete(
  "/:pageKey",
  adminAuth,
  deletePageHero
);

export default pageHeroRouter;
