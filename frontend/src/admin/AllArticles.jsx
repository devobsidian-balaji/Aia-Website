
import React from "react";
import {
  getArticles,
  updateArticle,
  deleteArticle,
} from "../services/api";
import PublicationList from "./PublicationList";

export default function AllArticles({ onNavigate }) {
  return (
    <PublicationList
      type="article"
      getItems={getArticles}
      updateItem={updateArticle}
      deleteItem={deleteArticle}
      onNavigate={onNavigate}
    />
  );
}
