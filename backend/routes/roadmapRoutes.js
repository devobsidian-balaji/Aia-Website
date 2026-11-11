
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getRoadmapItems,
  createRoadmapItem,
  updateRoadmapItem,
  deleteRoadmapItem,
} from "../controllers/roadmapController.js";

export const roadmapRouter = express.Router();

// Public
roadmapRouter.get("/", getRoadmapItems);

// Admin only
roadmapRouter.post("/", adminAuth, createRoadmapItem);
roadmapRouter.put("/:id", adminAuth, updateRoadmapItem);
roadmapRouter.delete("/:id", adminAuth, deleteRoadmapItem);
