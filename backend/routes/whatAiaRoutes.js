
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getWhatAia,
  getAdminWhatAia,
  updateWhatAiaSection,
  createWhatAiaCard,
  updateWhatAiaCard,
  deleteWhatAiaCard,
} from "../controllers/whatAiaController.js";

export const whatAiaRouter = express.Router();

// Public
whatAiaRouter.get("/", getWhatAia);

// Admin only
whatAiaRouter.get("/admin", adminAuth, getAdminWhatAia);

whatAiaRouter.put("/", adminAuth, updateWhatAiaSection);

whatAiaRouter.post("/cards", adminAuth, createWhatAiaCard);

whatAiaRouter.put("/cards/:cardId", adminAuth, updateWhatAiaCard);

whatAiaRouter.delete("/cards/:cardId", adminAuth, deleteWhatAiaCard);
