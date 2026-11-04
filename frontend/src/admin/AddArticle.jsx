import React from "react";
import {
  createArticle,
  updateArticle,
} from "../services/api";
import PublicationForm from "./PublicationForm.jsx";

export default function AddArticle({
  onNavigate,
  initialData,
  onArticleAdded,
}) {
  const handleSave = async (formData) => {
    let response;

    if (initialData?._id) {
      response = await updateArticle(initialData._id, formData);
    } else {
      response = await createArticle(formData);
    }

    onArticleAdded?.(response);

    // After successful save/update, go to All Articles
    onNavigate?.("all-articles");

    return response;
  };

  return (
    <PublicationForm
      type="article"
      initialData={initialData}
      onSave={handleSave}
      onNavigate={onNavigate}
    />
  );
}