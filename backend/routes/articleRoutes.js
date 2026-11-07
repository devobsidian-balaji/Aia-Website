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

import {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";

import { publicationImageUpload } from "../config/upload.js";

const router = express.Router();

router.get("/", getArticles);
router.get("/slug/:slug", getArticleBySlug);

router.post("/", publicationImageUpload.any(), createArticle);
router.put("/:id", publicationImageUpload.any(), updateArticle);

router.delete("/:id", deleteArticle);

export default router;