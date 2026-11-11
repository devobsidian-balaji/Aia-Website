
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getPastPresidents,
  createPastPresident,
  updatePastPresident,
  deletePastPresident,
} from "../controllers/pastPresidentController.js";

export const pastPresidentRouter = express.Router();

// Public
pastPresidentRouter.get("/", getPastPresidents);

// Admin only
pastPresidentRouter.post("/", adminAuth, createPastPresident);
pastPresidentRouter.put("/:id", adminAuth, updatePastPresident);
pastPresidentRouter.delete("/:id", adminAuth, deletePastPresident);
