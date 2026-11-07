
// // // import multer from "multer";
// // // import path from "path";
// // // import fs from "fs";

// // // const uploadDirectory = path.resolve("uploads");

// // // if (!fs.existsSync(uploadDirectory)) {
// // //   fs.mkdirSync(uploadDirectory, { recursive: true });
// // // }

// // // const storage = multer.diskStorage({
// // //   destination: (_req, _file, callback) => {
// // //     callback(null, uploadDirectory);
// // //   },

// // //   filename: (_req, file, callback) => {
// // //     const extension = path.extname(file.originalname).toLowerCase();

// // //     const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

// // //     if (!allowedExtensions.includes(extension)) {
// // //       return callback(new Error("Unsupported image extension"));
// // //     }

// // //     callback(
// // //       null,
// // //       `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`
// // //     );
// // //   },
// // // });

// // // const fileFilter = (_req, file, callback) => {
// // //   const allowedTypes = [
// // //     "image/jpeg",
// // //     "image/png",
// // //     "image/webp",
// // //     "image/gif",
// // //   ];

// // //   if (!allowedTypes.includes(file.mimetype)) {
// // //     return callback(new Error("Only JPG, PNG, WebP and GIF are allowed"));
// // //   }

// // //   callback(null, true);
// // // };

// // // export const sliderImageUpload = multer({
// // //   storage,
// // //   fileFilter,
// // //   limits: {
// // //     fileSize: 5 * 1024 * 1024,
// // //     files: 1,
// // //   },
// // // });



// // import multer from "multer";
// // import path from "path";
// // import { uploadsDir } from "./uploadPaths.js";

// // // Image storage configuration
// // const storage = multer.diskStorage({
// //   destination: (_req, _file, callback) => {
// //     callback(null, uploadsDir);
// //   },

// //   filename: (_req, file, callback) => {
// //     const extension = path.extname(file.originalname).toLowerCase();

// //     const allowedExtensions = [
// //       ".jpg",
// //       ".jpeg",
// //       ".png",
// //       ".webp",
// //       ".gif",
// //     ];

// //     if (!allowedExtensions.includes(extension)) {
// //       return callback(
// //         new Error("Unsupported image extension")
// //       );
// //     }

// //     const filename = `${Date.now()}-${Math.round(
// //       Math.random() * 1e9
// //     )}${extension}`;

// //     callback(null, filename);
// //   },
// // });

// // // Image file validation
// // const fileFilter = (_req, file, callback) => {
// //   const allowedTypes = [
// //     "image/jpeg",
// //     "image/png",
// //     "image/webp",
// //     "image/gif",
// //   ];

// //   if (!allowedTypes.includes(file.mimetype)) {
// //     return callback(
// //       new Error("Only JPG, PNG, WebP and GIF are allowed")
// //     );
// //   }

// //   callback(null, true);
// // };

// // // Export image upload middleware
// // export const sliderImageUpload = multer({
// //   storage,
// //   fileFilter,

// //   limits: {
// //     fileSize: 5 * 1024 * 1024,
// //     files: 1,
// //   },
// // });



// import multer from "multer";
// import path from "path";
// import { uploadsDir } from "./uploadPaths.js";

// const storage = multer.diskStorage({
//   destination: (_req, _file, callback) => {
//     callback(null, uploadsDir);
//   },

//   filename: (_req, file, callback) => {
//     const extension = path.extname(file.originalname).toLowerCase();

//     const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

//     if (!allowedExtensions.includes(extension)) {
//       return callback(new Error("Unsupported image extension"));
//     }

//     callback(
//       null,
//       `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`
//     );
//   },
// });

// const fileFilter = (_req, file, callback) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/webp",
//     "image/gif",
//   ];

//   if (!allowedTypes.includes(file.mimetype)) {
//     return callback(
//       new Error("Only JPG, PNG, WebP and GIF images are allowed")
//     );
//   }

//   callback(null, true);
// };

// export const sliderImageUpload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//     files: 30,
//   },
// });



import multer from "multer";
import path from "path";
import { uploadsDir } from "./uploadPaths.js";

const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
];

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },

  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      return cb(new Error("Unsupported image extension."));
    }

    const safeName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${extension}`;

    cb(null, safeName);
  },
});

const fileFilter = (_req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error("Only JPG, PNG, WebP and GIF images are allowed.")
    );
  }

  cb(null, true);
};

const createImageUpload = ({
  maxFiles = 1,
  maxFileSize = 5 * 1024 * 1024,
  maxFieldSize = 1 * 1024 * 1024,
} = {}) => {
  return multer({
    storage,
    fileFilter,

    limits: {
      fileSize: maxFileSize,
      files: maxFiles,

      // Maximum text/JSON field size
      fieldSize: maxFieldSize,
    },
  });
};

// Existing slider upload — unchanged
export const sliderImageUpload = createImageUpload({
  maxFiles: 1,
});

// Existing event upload — unchanged
export const eventImageUpload = createImageUpload({
  maxFiles: 30,
  maxFileSize: 5 * 1024 * 1024,
});

// Articles and News — multiple images + large JSON content
export const publicationImageUpload = createImageUpload({
  maxFiles: 32,
  maxFileSize: 5 * 1024 * 1024,
  maxFieldSize: 20 * 1024 * 1024,
});