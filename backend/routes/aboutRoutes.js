
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getAboutContents,
  createAboutContent,
  updateAboutContent,
  deleteAboutContent,
} from "../controllers/aboutController.js";

export const aboutRouter = express.Router();

// Public
aboutRouter.get("/", getAboutContents);

// Admin only
aboutRouter.post("/", adminAuth, createAboutContent);
aboutRouter.put("/:id", adminAuth, updateAboutContent);
aboutRouter.delete("/:id", adminAuth, deleteAboutContent);
