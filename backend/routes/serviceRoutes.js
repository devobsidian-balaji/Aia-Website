
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

export const serviceRouter = express.Router();

// Public
serviceRouter.get("/", getServices);

// Admin only
serviceRouter.post("/", adminAuth, createService);
serviceRouter.put("/:id", adminAuth, updateService);
serviceRouter.delete("/:id", adminAuth, deleteService);
