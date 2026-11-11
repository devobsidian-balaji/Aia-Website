// import express from "express";

// import {
//   getArticles,
//   getArticleBySlug,
//   createArticle,
//   updateArticle,
//   deleteArticle,
// } from "../controllers/articleController.js";

// import { publicationImageUpload } from "../config/upload.js";

// const router = express.Router();

// router.get("/", getArticles);
// router.get("/slug/:slug", getArticleBySlug);

// router.post("/", publicationImageUpload.any(), createArticle);
// router.put("/:id", publicationImageUpload.any(), updateArticle);

// router.delete("/:id", deleteArticle);

// export default router;



import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";

import { publicationImageUpload } from "../config/upload.js";

const router = express.Router();

// Public website APIs
router.get("/", getArticles);
router.get("/slug/:slug", getArticleBySlug);

// Admin only: CMS management
router.post(
  "/",
  adminAuth,
  publicationImageUpload.any(),
  createArticle
);

router.put(
  "/:id",
  adminAuth,
  publicationImageUpload.any(),
  updateArticle
);

router.delete("/:id", adminAuth, deleteArticle);

export default router;
