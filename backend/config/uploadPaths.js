
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Common upload directory: backend/uploads
export const uploadsDir = path.resolve(__dirname, "../uploads");

// Automatically create directory if it does not exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

console.log("[Uploads Directory]:", uploadsDir);
