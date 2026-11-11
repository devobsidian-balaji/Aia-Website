
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getCampusEvents,
  createCampusEvent,
  updateCampusEvent,
  deleteCampusEvent,
} from "../controllers/campusEventController.js";

export const campusEventRouter = express.Router();

// Public
campusEventRouter.get("/", getCampusEvents);

// Admin only
campusEventRouter.post("/", adminAuth, createCampusEvent);
campusEventRouter.put("/:id", adminAuth, updateCampusEvent);
campusEventRouter.delete("/:id", adminAuth, deleteCampusEvent);
