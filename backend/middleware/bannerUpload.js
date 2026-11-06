
import multer from "multer";
import path from "path";
import { uploadsDir } from "../config/uploadPaths.js";

// Video storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadsDir);
  },

  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const allowedExtensions = [
      ".mp4",
      ".webm",
      ".ogg",
      ".mov",
      ".m4v",
    ];

    if (!allowedExtensions.includes(extension)) {
      return callback(
        new Error(
          "Only MP4, WebM, OGG, MOV and M4V videos are allowed"
        )
      );
    }

    const filename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${extension}`;

    callback(null, filename);
  },
});

// Video file validation
const fileFilter = (_req, file, callback) => {
  const allowedTypes = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime",
    "video/x-m4v",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return callback(
      new Error("Invalid video format")
    );
  }

  callback(null, true);
};

// Export video upload middleware
const bannerUpload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 100 * 1024 * 1024,
    files: 1,
  },
});

export default bannerUpload;
