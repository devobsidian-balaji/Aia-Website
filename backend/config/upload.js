
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDirectory = path.resolve("uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

    if (!allowedExtensions.includes(extension)) {
      return callback(new Error("Unsupported image extension"));
    }

    callback(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`
    );
  },
});

const fileFilter = (_req, file, callback) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return callback(new Error("Only JPG, PNG, WebP and GIF are allowed"));
  }

  callback(null, true);
};

export const sliderImageUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});
