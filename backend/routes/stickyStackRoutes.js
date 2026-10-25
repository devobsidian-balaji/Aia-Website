
import express from "express";

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
router.get("/admin/:pageKey/:sectionKey", getAdminSection);
router.put("/admin/:pageKey/:sectionKey", updateSection);

router.post(
  "/admin/:pageKey/:sectionKey/items",
  addItem
);

router.put(
  "/admin/:pageKey/:sectionKey/items/:itemId",
  updateItem
);

router.delete(
  "/admin/:pageKey/:sectionKey/items/:itemId",
  deleteItem
);

// Public section data
router.get("/:pageKey/:sectionKey", getPublicSection);

export default router;
