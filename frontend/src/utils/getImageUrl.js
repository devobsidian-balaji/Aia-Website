const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api"
).replace(/\/+$/, "");

const BACKEND_URL = API_URL.replace(/\/api\/?$/, "");

export const getImageUrl = (image) => {
  if (!image) return "";

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  return `${BACKEND_URL}/${image.replace(/^\/+/, "")}`;
};