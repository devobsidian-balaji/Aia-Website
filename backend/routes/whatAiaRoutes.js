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

whatAiaRouter.get("/", getWhatAia);

whatAiaRouter.get("/admin", getAdminWhatAia);

whatAiaRouter.put("/", updateWhatAiaSection);

whatAiaRouter.post("/cards", createWhatAiaCard);

whatAiaRouter.put("/cards/:cardId", updateWhatAiaCard);

whatAiaRouter.delete("/cards/:cardId", deleteWhatAiaCard);