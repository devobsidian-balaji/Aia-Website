import React from "react";

import {
  getNews,
  updateNews,
  deleteNews,
} from "../services/api";

import PublicationList from "./PublicationList";

export default function AllNews({ onNavigate }) {
  return (
    <PublicationList
      type="news"
      getItems={getNews}
      updateItem={updateNews}
      deleteItem={deleteNews}
      onNavigate={onNavigate}
    />
  );
}