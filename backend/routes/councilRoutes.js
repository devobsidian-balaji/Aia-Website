
// import express from "express";
// import { adminAuth } from "../middleware/adminAuth.js";

// import {
//   getCouncilMembers,
//   createCouncilMember,
//   updateCouncilMember,
//   deleteCouncilMember,
// } from "../controllers/councilController.js";

// export const councilRouter = express.Router();

// // Public
// councilRouter.get("/", getCouncilMembers);

// // Admin only
// councilRouter.post("/", adminAuth, createCouncilMember);
// councilRouter.put("/:id", adminAuth, updateCouncilMember);
// councilRouter.delete("/:id", adminAuth, deleteCouncilMember);


import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import { councilMemberImageUpload } from "../config/upload.js";

import {
  getCouncilMembers,
  createCouncilMember,
  updateCouncilMember,
  deleteCouncilMember,
} from "../controllers/councilController.js";

export const councilRouter = express.Router();

// Public
councilRouter.get("/", getCouncilMembers);

// Admin only
councilRouter.post(
  "/",
  adminAuth,
  councilMemberImageUpload.single("image"),
  createCouncilMember
);

councilRouter.put(
  "/:id",
  adminAuth,
  councilMemberImageUpload.single("image"),
  updateCouncilMember
);

councilRouter.delete("/:id", adminAuth, deleteCouncilMember);