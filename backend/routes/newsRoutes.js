import express from "express";

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

router.get("/", getNews);
router.get("/slug/:slug", getNewsBySlug);

router.post(
  "/",
  publicationImageUpload.any(),
  createNews
);

router.put(
  "/:id",
  publicationImageUpload.any(),
  updateNews
);

router.delete("/:id", deleteNews);

export default router;