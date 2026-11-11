
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getNews,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";

import {
  publicationImageUpload,
} from "../config/upload.js";

const router = express.Router();

// Public website APIs
router.get("/", getNews);
router.get("/slug/:slug", getNewsBySlug);

// Admin only: CMS management
router.post(
  "/",
  adminAuth,
  publicationImageUpload.any(),
  createNews
);

router.put(
  "/:id",
  adminAuth,
  publicationImageUpload.any(),
  updateNews
);

router.delete("/:id", adminAuth, deleteNews);

export default router;
