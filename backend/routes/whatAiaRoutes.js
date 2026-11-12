
// import express from "express";
// import { adminAuth } from "../middleware/adminAuth.js";

// import {
//   getWhatAia,
//   getAdminWhatAia,
//   updateWhatAiaSection,
//   createWhatAiaCard,
//   updateWhatAiaCard,
//   deleteWhatAiaCard,
// } from "../controllers/whatAiaController.js";

// export const whatAiaRouter = express.Router();

// // Public
// whatAiaRouter.get("/", getWhatAia);

// // Admin only
// whatAiaRouter.get("/admin", adminAuth, getAdminWhatAia);

// whatAiaRouter.put("/", adminAuth, updateWhatAiaSection);

// whatAiaRouter.post("/cards", adminAuth, createWhatAiaCard);

// whatAiaRouter.put("/cards/:cardId", adminAuth, updateWhatAiaCard);

// whatAiaRouter.delete("/cards/:cardId", adminAuth, deleteWhatAiaCard);



import express from "express";

import {
  getWhatAia,
  getAdminWhatAia,
  updateWhatAiaSection,
  createWhatAiaCard,
  updateWhatAiaCard,
  deleteWhatAiaCard,
} from "../controllers/whatAiaController.js";

import { adminAuth } from "../middleware/adminAuth.js";
import { whatAiaImageUpload } from "../config/upload.js";

export const whatAiaRouter = express.Router();

// Public section
whatAiaRouter.get("/", getWhatAia);

// Admin section
whatAiaRouter.get("/admin", adminAuth, getAdminWhatAia);

whatAiaRouter.put("/", adminAuth, updateWhatAiaSection);

// Create card with Cloudinary image upload
whatAiaRouter.post(
  "/cards",
  adminAuth,
  whatAiaImageUpload.single("image"),
  createWhatAiaCard
);

// Update card
whatAiaRouter.put(
  "/cards/:cardId",
  adminAuth,
  whatAiaImageUpload.single("image"),
  updateWhatAiaCard
);

// Delete card
whatAiaRouter.delete(
  "/cards/:cardId",
  adminAuth,
  deleteWhatAiaCard
);

export default whatAiaRouter;
