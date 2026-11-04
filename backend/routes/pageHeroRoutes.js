
import { Router } from "express";

import {
  getAllPageHeroes,
  getPageHero,
  savePageHero,
  deletePageHero,
} from "../controllers/pageHeroController.js";

import { sliderImageUpload } from "../config/upload.js";

const pageHeroRouter = Router();

pageHeroRouter.get("/", getAllPageHeroes);

pageHeroRouter.get("/:pageKey", getPageHero);

pageHeroRouter.post(
  "/",
  sliderImageUpload.single("image"),
  savePageHero
);

pageHeroRouter.delete("/:pageKey", deletePageHero);

export { pageHeroRouter };
