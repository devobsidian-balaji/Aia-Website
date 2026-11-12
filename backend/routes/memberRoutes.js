
import express from "express";

import { adminAuth } from "../middleware/adminAuth.js";

import {
  createMember,
  getAllMembers,
  getAdminMembers,
   getMemberById,
  getMemberBySlug,
  updateMember,
  deleteMember,
  toggleMemberStatus,
} from "../controllers/memberController.js";

import { memberImageUpload } from "../config/upload.js";

const router = express.Router();

// ==========================================
// MEMBER IMAGE UPLOAD
// ==========================================

const uploadMemberFields = memberImageUpload.fields([
  { name: "cardLogo", maxCount: 1 },
  { name: "coverLogo", maxCount: 1 },
  { name: "serviceImages", maxCount: 10 },
]);

// ==========================================
// PUBLIC ROUTES
// No login required
// ==========================================

// Get active members
router.get("/", getAllMembers);

// Get member details by slug
router.get("/slug/:slug", getMemberBySlug);

// ==========================================
// ADMIN CMS ROUTES
// Login required
// ==========================================

// Get ALL members including inactive
router.get("/admin", adminAuth, getAdminMembers);
router.get("/:id", adminAuth, getMemberById);

// Create member
router.post(
  "/",
  adminAuth,
  uploadMemberFields,
  createMember
);

// Update member
router.put(
  "/:id",
  adminAuth,
  uploadMemberFields,
  updateMember
);

// Activate / Deactivate member
router.patch(
  "/:id/toggle-status",
  adminAuth,
  toggleMemberStatus
);

// Delete member
router.delete(
  "/:id",
  adminAuth,
  deleteMember
);

export default router;
