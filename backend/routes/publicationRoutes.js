
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getPublications,
  getPublicationById,
  createPublication,
  updatePublication,
  deletePublication,
} from "../controllers/publicationController.js";

export const publicationRouter = express.Router();

// Public
publicationRouter.get("/", getPublications);
publicationRouter.get("/:id", getPublicationById);

// Admin only
publicationRouter.post("/", adminAuth, createPublication);
publicationRouter.put("/:id", adminAuth, updatePublication);
publicationRouter.delete("/:id", adminAuth, deletePublication);
