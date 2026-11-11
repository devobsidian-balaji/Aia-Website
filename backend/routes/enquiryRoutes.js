
// import { Router } from "express";

// import {
//   createEnquiry,
//   getAllEnquiries,
//   getEnquiryById,
//   updateEnquiryStatus,
//   deleteEnquiry,
// } from "../controllers/enquiryController.js";

// const enquiryRouter = Router();

// // Public form submission
// enquiryRouter.post("/", createEnquiry);

// // Enquiry management
// enquiryRouter.get("/", getAllEnquiries);
// enquiryRouter.get("/:id", getEnquiryById);
// enquiryRouter.patch("/:id/status", updateEnquiryStatus);
// enquiryRouter.delete("/:id", deleteEnquiry);

// export { enquiryRouter };



import { Router } from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../controllers/enquiryController.js";

const enquiryRouter = Router();

// Public: Website enquiry form submission
enquiryRouter.post("/", createEnquiry);

// Admin only: Enquiry management
enquiryRouter.get("/", adminAuth, getAllEnquiries);

enquiryRouter.get("/:id", adminAuth, getEnquiryById);

enquiryRouter.patch(
  "/:id/status",
  adminAuth,
  updateEnquiryStatus
);

enquiryRouter.delete(
  "/:id",
  adminAuth,
  deleteEnquiry
);

export { enquiryRouter };
