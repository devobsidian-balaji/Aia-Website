


// import React from "react";
// import {
//   createArticle,
//   updateArticle,
// } from "../services/api";

// import PublicationForm from "./PublicationForm.jsx";

// export default function AddArticle({
//   onNavigate,
//   initialData,
//   onArticleAdded,
// }) {
//   const handleSave = async (formData) => {
//     const response = initialData?._id
//       ? await updateArticle(initialData._id, formData)
//       : await createArticle(formData);

//     onArticleAdded?.(response);
//     onNavigate?.("all-articles");

//     return response;
//   };

//   return (
//     <PublicationForm
//       type="article"
//       initialData={initialData}
//       onSave={handleSave}
//       onNavigate={onNavigate}
//     />
//   );
// }


import React from "react";
import { createArticle, updateArticle } from "../services/api";
import PublicationForm from "./PublicationForm.jsx";

export default function AddArticle({
  onNavigate,
  initialData,
  onArticleAdded,
}) {
  const handleSave = async (formData) => {
    const response = initialData?._id
      ? await updateArticle(initialData._id, formData)
      : await createArticle(formData);

    onArticleAdded?.(response);
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
