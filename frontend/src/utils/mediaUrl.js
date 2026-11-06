const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api"
).replace(/\/+$/, "");

const BACKEND_URL = API_URL.replace(/\/api$/i, "");

export const getMediaUrl = (mediaPath) => {
  if (!mediaPath) return "";

  // Absolute URL handling
  if (/^https?:\/\//i.test(mediaPath)) {
    try {
      const url = new URL(mediaPath);

      // Replace old localhost URLs with deployed backend URL
      if (
        url.hostname === "localhost" ||
        url.hostname === "127.0.0.1"
      ) {
        return `${BACKEND_URL}${url.pathname}${url.search}`;
      }

      return mediaPath;
    } catch {
      return mediaPath;
    }
  }

  // Relative upload paths
  return `${BACKEND_URL}/${mediaPath.replace(/^\/+/, "")}`;
};