import multer from "multer";
import path from "path";

// Allowed video extensions
const allowedExtensions = [
  ".mp4",
  ".webm",
  ".ogg",
  ".mov",
  ".m4v",
];

// Allowed video MIME types
const allowedTypes = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "video/x-m4v",
];

// Video file validation
const fileFilter = (_req, file, callback) => {
  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const validExtension = allowedExtensions.includes(extension);
  const validMimeType = allowedTypes.includes(file.mimetype);

  if (!validExtension || !validMimeType) {
    return callback(
      new Error(
        "Only MP4, WebM, OGG, MOV and M4V videos are allowed."
      )
    );
  }

  callback(null, true);
};

// Memory storage: file will be uploaded directly to Cloudinary
const bannerUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter,

  limits: {
    fileSize: 100 * 1024 * 1024,
    files: 1,
  },
});

export default bannerUpload;