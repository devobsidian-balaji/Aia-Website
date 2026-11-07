

// import React from "react";
// import {
//   createNews,
//   updateNews,
// } from "../services/api";

// import PublicationForm from "./PublicationForm.jsx";

// export default function AddNews({
//   onNavigate,
//   initialData,
//   onNewsAdded,
// }) {
//   const handleSave = async (formData) => {
//     const response = initialData?._id
//       ? await updateNews(initialData._id, formData)
//       : await createNews(formData);

//     onNewsAdded?.(response);
//     onNavigate?.("all-news");

//     return response;
//   };

//   return (
//     <PublicationForm
//       type="news"
//       initialData={initialData}
//       onSave={handleSave}
//       onNavigate={onNavigate}
//     />
//   );
// }


import React from "react";
import { createNews, updateNews } from "../services/api";
import PublicationForm from "./PublicationForm.jsx";

export default function AddNews({
  onNavigate,
  initialData,
  onNewsAdded,
}) {
  const handleSave = async (formData) => {
    const response = initialData?._id
      ? await updateNews(initialData._id, formData)
      : await createNews(formData);

    onNewsAdded?.(response);
    onNavigate?.("all-news");

    return response;
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
