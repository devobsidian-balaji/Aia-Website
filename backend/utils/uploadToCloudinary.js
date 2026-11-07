import fs from "node:fs/promises";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (
  filePath,
  folder = "aia-website"
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "image",
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } finally {
    await fs.unlink(filePath).catch((error) => {
      if (error.code !== "ENOENT") {
        console.error("Temporary upload cleanup error:", error);
      }
    });
  }
};

export default uploadToCloudinary;