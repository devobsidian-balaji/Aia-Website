import express from "express";

import {
  getAllPageHeroes,
  getPageHero,
  savePageHero,
  removePageHeroImage,
  deletePageHero,
} from "../controllers/pageHeroController.js";

import { sliderImageUpload } from "../config/upload.js";

const pageHeroRouter = express.Router();

/* =========================================
   GET ALL PAGE HEROES
   GET /api/page-heroes
========================================= */

pageHeroRouter.get("/", getAllPageHeroes);


/* =========================================
   GET SINGLE PAGE HERO
   GET /api/page-heroes/:pageKey
========================================= */

pageHeroRouter.get("/:pageKey", getPageHero);


/* =========================================
   CREATE / UPDATE PAGE HERO
   POST /api/page-heroes
   FormData field: image
========================================= */

pageHeroRouter.post(
  "/",
  sliderImageUpload.single("image"),
  savePageHero
);


/* =========================================
   REMOVE ONLY HERO IMAGE
   DELETE /api/page-heroes/:pageKey/image

   - Removes image from MongoDB
   - Removes image from Cloudinary
   - Preserves heading and other settings
========================================= */

pageHeroRouter.delete(
  "/:pageKey/image",
  removePageHeroImage
);


/* =========================================
   DELETE COMPLETE PAGE HERO
   DELETE /api/page-heroes/:pageKey

   - Deletes complete hero document
========================================= */

pageHeroRouter.delete(
  "/:pageKey",
  deletePageHero
);


/* =========================================
   DEFAULT EXPORT
========================================= */

export default pageHeroRouter;