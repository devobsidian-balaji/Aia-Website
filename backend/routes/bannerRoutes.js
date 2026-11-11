// import express from 'express';
// import { getBanners, createBanner, updateBanner, deleteBanner } from '../controllers/bannerController.js';

// export const bannerRouter = express.Router();

// bannerRouter.get('/', getBanners);
// bannerRouter.post('/', createBanner);
// bannerRouter.put('/:id', updateBanner);
// bannerRouter.delete('/:id', deleteBanner);


// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// import {
//   getBanners,
//   createBanner,
//   updateBanner,
//   deleteBanner,
// } from "../controllers/bannerController.js";

// export const bannerRouter = express.Router();

// const uploadDir = path.resolve("uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase();
//     cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowed = [
//       "video/mp4",
//       "video/webm",
//       "video/ogg",
//       "video/quicktime",
//     ];

//     if (file.fieldname !== "video" || !allowed.includes(file.mimetype)) {
//       return cb(new Error("Please upload a valid MP4, WebM, MOV or OGG video."));
//     }

//     cb(null, true);
//   },
//   limits: {
//     fileSize: 100 * 1024 * 1024,
//   },
// });

// bannerRouter.get("/", getBanners);
// bannerRouter.post("/", upload.single("video"), createBanner);
// bannerRouter.put("/:id", upload.single("video"), updateBanner);
// bannerRouter.delete("/:id", deleteBanner);




import express from "express";
import bannerUpload from "../middleware/bannerUpload.js";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";

export const bannerRouter = express.Router();

// Public: Website can fetch banners without login
bannerRouter.get("/", getBanners);

// Admin only: Create Home Hero
bannerRouter.post(
  "/",
  adminAuth,
  bannerUpload.single("video"),
  createBanner
);

// Admin only: Update Home Hero
bannerRouter.put(
  "/:id",
  adminAuth,
  bannerUpload.single("video"),
  updateBanner
);

// Admin only: Delete Home Hero
bannerRouter.delete(
  "/:id",
  adminAuth,
  deleteBanner
);
