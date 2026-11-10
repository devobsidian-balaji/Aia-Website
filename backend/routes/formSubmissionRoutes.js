
import { Router } from "express";
import {
  createFormSubmission,
  getFormSubmissions,
  getFormSubmissionById,
  updateFormSubmissionStatus,
  deleteFormSubmission,
  getFormSubmissionStats,
} from "../controllers/formSubmissionController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const formSubmissionRouter = Router();

// Public form submission
formSubmissionRouter.post("/", createFormSubmission);

// Admin only: CMS management
formSubmissionRouter.get("/stats", adminAuth, getFormSubmissionStats);
formSubmissionRouter.get("/", adminAuth, getFormSubmissions);
formSubmissionRouter.get("/:id", adminAuth, getFormSubmissionById);
formSubmissionRouter.patch("/:id/status", adminAuth, updateFormSubmissionStatus);
formSubmissionRouter.delete("/:id", adminAuth, deleteFormSubmission);


export { formSubmissionRouter };
