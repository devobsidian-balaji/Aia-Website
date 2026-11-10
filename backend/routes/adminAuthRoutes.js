import { Router } from "express";
import {
  adminLogin,
  getCurrentAdmin,
  adminLogout,
} from "../controllers/adminAuthController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const adminAuthRouter = Router();

adminAuthRouter.post("/login", adminLogin);
adminAuthRouter.get("/me", adminAuth, getCurrentAdmin);
adminAuthRouter.post("/logout", adminAuth, adminLogout);

export { adminAuthRouter };