
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import crypto from "crypto";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);

const uploadDir = path.resolve(
  currentDir,
  "../uploads/home-features"
);

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDir);
  },

  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = `${crypto.randomUUID()}${extension}`;

    callback(null, safeName);
  },
});

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedTypes.has(file.mimetype)) {
      return callback(
        new Error("Only JPG, PNG, WEBP and GIF images are allowed.")
      );
    }

    callback(null, true);
  },
});

export default upload;
