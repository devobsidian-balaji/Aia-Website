
import { Router } from "express";

import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../controllers/enquiryController.js";

const enquiryRouter = Router();

// Public form submission
enquiryRouter.post("/", createEnquiry);

// Enquiry management
enquiryRouter.get("/", getAllEnquiries);
enquiryRouter.get("/:id", getEnquiryById);
enquiryRouter.patch("/:id/status", updateEnquiryStatus);
enquiryRouter.delete("/:id", deleteEnquiry);

export { enquiryRouter };
