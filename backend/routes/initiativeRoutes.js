
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getInitiatives,
  createInitiative,
  updateInitiative,
  deleteInitiative,
} from "../controllers/initiativeController.js";

export const initiativeRouter = express.Router();

// Public
initiativeRouter.get("/", getInitiatives);

// Admin only
initiativeRouter.post("/", adminAuth, createInitiative);
initiativeRouter.put("/:id", adminAuth, updateInitiative);
initiativeRouter.delete("/:id", adminAuth, deleteInitiative);
