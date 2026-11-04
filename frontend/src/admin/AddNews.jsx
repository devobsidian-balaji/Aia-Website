import React from "react";
import {
  createNews,
  updateNews,
} from "../services/api";

import PublicationForm from "./PublicationForm.jsx";

export default function AddNews({
  onNavigate,
  initialData = null,
  onNewsAdded,
}) {
  const handleSave = async (formData) => {
    try {
      let response;

      if (initialData?._id) {
        response = await updateNews(initialData._id, formData);
      } else {
        response = await createNews(formData);
      }

      onNewsAdded?.(response);

      onNavigate?.("all-news");

      return response;
    } catch (error) {
      console.error("News save error:", error);
      throw error;
    }
  };

  return (
    <PublicationForm
      type="news"
      initialData={initialData}
      onSave={handleSave}
      onNavigate={onNavigate}
    />
  );
}