
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getPillarFootprints,
  createPillarFootprint,
  updatePillarFootprint,
  deletePillarFootprint,
} from "../controllers/pillarFootprintController.js";

export const pillarFootprintRouter = express.Router();

// Public
pillarFootprintRouter.get("/", getPillarFootprints);

// Admin only
pillarFootprintRouter.post("/", adminAuth, createPillarFootprint);
pillarFootprintRouter.put("/:id", adminAuth, updatePillarFootprint);
pillarFootprintRouter.delete("/:id", adminAuth, deletePillarFootprint);
