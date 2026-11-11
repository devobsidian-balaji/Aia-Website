
import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getPublicSection,
  getAdminSection,
  updateSection,
  addItem,
  updateItem,
  deleteItem,
} from "../controllers/stickyStackController.js";

const router = express.Router();

// Admin CMS
router.get("/admin/:pageKey/:sectionKey", adminAuth, getAdminSection);

router.put(
  "/admin/:pageKey/:sectionKey",
  adminAuth,
  updateSection
);

router.post(
  "/admin/:pageKey/:sectionKey/items",
  adminAuth,
  addItem
);

router.put(
  "/admin/:pageKey/:sectionKey/items/:itemId",
  adminAuth,
  updateItem
);

router.delete(
  "/admin/:pageKey/:sectionKey/items/:itemId",
  adminAuth,
  deleteItem
);

// Public
router.get("/:pageKey/:sectionKey", getPublicSection);

export default router;
