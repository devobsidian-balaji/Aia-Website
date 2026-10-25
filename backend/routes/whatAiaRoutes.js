
import express from "express";

import {
  getWhatAia,
  getAdminWhatAia,
  updateWhatAiaSection,
  createWhatAiaCard,
  updateWhatAiaCard,
  deleteWhatAiaCard,
} from "../controllers/whatAiaController.js";

export const whatAiaRouter = express.Router();

// Public home page
whatAiaRouter.get("/", getWhatAia);

// Existing admin panel
whatAiaRouter.get("/admin", getAdminWhatAia);
whatAiaRouter.put("/", updateWhatAiaSection);

// Card management
whatAiaRouter.post("/cards", createWhatAiaCard);
whatAiaRouter.put("/cards/:cardId", updateWhatAiaCard);
whatAiaRouter.delete("/cards/:cardId", deleteWhatAiaCard);
