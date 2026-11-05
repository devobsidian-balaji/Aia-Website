// import React, { useRef, useState, useEffect } from "react";
// import {
//   UploadCloud,
//   Trash2,
//   Loader2,
//   CheckCircle2,
//   AlertCircle,
//   Plus,
//   X,
// } from "lucide-react";

// const toSlug = (value) =>
//   value
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-|-$/g, "");

// const readImage = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });

// export default function PublicationForm({
//   type = "article",
//   onSave,
//   onNavigate,
//   initialData = null,
// }) {
//   const isArticle = type === "article";
//   const fileRef = useRef(null);
//   const coverRef = useRef(null);

//   const [form, setForm] = useState({
//     title: "",
//     slug: "",
//     image: "",
//     imageAlt: "",
//     category: "",
//     categoryLink: "",
//     introduction: "",
//     detailCoverImage: "",
//     author: "",
//     content: "",
//     publishedAt: "",
//     sections: [],
//   });

//   useEffect(() => {
//     if (!initialData) return;

//     setForm({
//       title: initialData.title || "",
//       slug: initialData.slug || "",
//       image: initialData.image || "",
//       imageAlt: initialData.imageAlt || "",
//       category: initialData.category || "",
//       categoryLink: initialData.categoryLink || "",
//       introduction: initialData.introduction || "",
//       detailCoverImage: initialData.detailCoverImage || "",
//       author: initialData.author || "",
//       content: initialData.content || "",
//       publishedAt: initialData.publishedAt || "",
//       sections: initialData.sections || [],
//     });

//     setCardFile(null);
//     setCoverFile(null);
//   }, [initialData]);

//   const [cardFile, setCardFile] = useState(null);
//   const [coverFile, setCoverFile] = useState(null);
//   const [sectionHeading, setSectionHeading] = useState("");
//   const [sectionParagraph, setSectionParagraph] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const updateField = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleTitle = (value) => {
//     setForm((prev) => ({
//       ...prev,
//       title: value,
//       slug: toSlug(value),
//     }));
//   };

//   const handleImage = (file, isCover = false) => {
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image.");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError("Image size must be less than 5 MB.");
//       return;
//     }

//     setError("");

//     if (isCover) {
//       setCoverFile(file);
//     } else {
//       setCardFile(file);
//     }
//   };

//   const addSection = () => {
//     if (!sectionHeading.trim() && !sectionParagraph.trim()) return;

//     setForm((prev) => ({
//       ...prev,
//       sections: [
//         ...prev.sections,
//         {
//           heading: sectionHeading.trim(),
//           paragraphs: sectionParagraph
//             .split("\n")
//             .map((p) => p.trim())
//             .filter(Boolean),
//         },
//       ],
//     }));

//     setSectionHeading("");
//     setSectionParagraph("");
//   };

//   const removeSection = (index) => {
//     setForm((prev) => ({
//       ...prev,
//       sections: prev.sections.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!form.title.trim() || !form.slug.trim()) {
//       setError("Title and slug are required.");
//       return;
//     }

//     if (!cardFile && !form.image) {
//       setError("Please upload a card image.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const cardImage = cardFile ? await readImage(cardFile) : form.image;

//       const coverImage = coverFile
//         ? await readImage(coverFile)
//         : form.detailCoverImage;

//       const payload = {
//         ...form,
//         image: cardImage,
//         detailCoverImage: coverImage,
//         slug: toSlug(form.slug),
//         isActive: initialData?.isActive ?? true,
//       };

//       await onSave(payload);

//       setSuccess(`${isArticle ? "Article" : "News"} published successfully!`);

//       setForm({
//         title: "",
//         slug: "",
//         image: "",
//         imageAlt: "",
//         category: "",
//         categoryLink: "",
//         introduction: "",
//         detailCoverImage: "",
//         author: "",
//         content: "",
//         publishedAt: "",
//         sections: [],
//       });

//       setCardFile(null);
//       setCoverFile(null);
//       if (fileRef.current) fileRef.current.value = "";
//       if (coverRef.current) coverRef.current.value = "";
//     } catch (err) {
//       console.error("Publication save error:", err);
//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Unable to publish. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#E87565] focus:ring-2 focus:ring-[#E87565]/20";

//   return (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h2 className="text-2xl font-extrabold text-[#1E293B] sm:text-3xl">
//           Add New {isArticle ? "Article" : "News"}
//         </h2>
//         <p className="mt-2 text-sm text-gray-500">
//           Create and publish content on your website.
//         </p>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 gap-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-2"
//       >
//         {/* Card Image */}
//         <div className="space-y-3">
//           <label className="block text-sm font-bold text-gray-800">
//             Card Thumbnail *
//           </label>

//           <div
//             onClick={() => fileRef.current?.click()}
//             className="flex min-h-48 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-slate-50 transition hover:border-[#E87565]"
//           >
//             {cardFile || form.image ? (
//               <img
//                 src={cardFile ? URL.createObjectURL(cardFile) : form.image}
//                 alt="Card preview"
//                 className="h-48 w-full object-cover"
//               />
//             ) : (
//               <div className="text-center text-gray-500">
//                 <UploadCloud className="mx-auto mb-2" size={30} />
//                 <p className="text-sm font-semibold">Upload card image</p>
//                 <p className="mt-1 text-xs">JPG, PNG, WEBP · Max 5 MB</p>
//               </div>
//             )}
//           </div>

//           <input
//             ref={fileRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => handleImage(e.target.files?.[0])}
//           />

//           {cardFile && (
//             <button
//               type="button"
//               onClick={() => {
//                 setCardFile(null);
//                 if (fileRef.current) fileRef.current.value = "";
//               }}
//               className="flex items-center gap-2 text-xs font-semibold text-red-600"
//             >
//               <Trash2 size={14} /> Remove card image
//             </button>
//           )}
//         </div>

//         {/* Detail Cover */}
//         <div className="space-y-3">
//           <label className="block text-sm font-bold text-gray-800">
//             Detail Page Cover Image (Optional)
//           </label>

//           <div
//             onClick={() => coverRef.current?.click()}
//             className="flex min-h-48 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-slate-50 transition hover:border-[#E87565]"
//           >
//             {coverFile || form.detailCoverImage ? (
//               <img
//                 src={
//                   coverFile
//                     ? URL.createObjectURL(coverFile)
//                     : form.detailCoverImage
//                 }
//                 alt="Cover preview"
//                 className="h-48 w-full object-cover"
//               />
//             ) : (
//               <div className="text-center text-gray-500">
//                 <UploadCloud className="mx-auto mb-2" size={30} />
//                 <p className="text-sm font-semibold">Upload cover image</p>
//                 <p className="mt-1 text-xs">Optional · Max 5 MB</p>
//               </div>
//             )}
//           </div>

//           <input
//             ref={coverRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => handleImage(e.target.files?.[0], true)}
//           />

//           {coverFile && (
//             <button
//               type="button"
//               onClick={() => {
//                 setCoverFile(null);
//                 if (coverRef.current) coverRef.current.value = "";
//               }}
//               className="flex items-center gap-2 text-xs font-semibold text-red-600"
//             >
//               <Trash2 size={14} /> Remove cover image
//             </button>
//           )}
//         </div>

//         {/* Basic Details */}
//         <div className="space-y-4 lg:col-span-2">
//           <div>
//             <label className="mb-1.5 block text-xs font-bold">
//               {initialData
//                 ? "Edit Article"
//                 : `Add New ${isArticle ? "Article" : "News"}`}{" "}
//               Title *
//             </label>
//             <input
//               value={form.title}
//               onChange={(e) => handleTitle(e.target.value)}
//               placeholder="Enter title"
//               className={inputClass}
//               required
//             />
//           </div>

//           <div>
//             <label className="mb-1.5 block text-xs font-bold">URL Slug *</label>
//             <input
//               value={form.slug}
//               onChange={(e) => updateField("slug", toSlug(e.target.value))}
//               placeholder="article-url-slug"
//               className={inputClass}
//               required
//             />
//             <p className="mt-1 text-xs text-gray-400">
//               Detail URL: /publication/{isArticle ? "articles" : "news"}/
//               {form.slug || "your-slug"}
//             </p>
//           </div>

//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div>
//               <label className="mb-1.5 block text-xs font-bold">Category</label>
//               <input
//                 value={form.category}
//                 onChange={(e) => updateField("category", e.target.value)}
//                 placeholder="e.g. Pharmaceuticals"
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className="mb-1.5 block text-xs font-bold">
//                 Category Link
//               </label>
//               <input
//                 value={form.categoryLink}
//                 onChange={(e) => updateField("categoryLink", e.target.value)}
//                 placeholder="/publication/category"
//                 className={inputClass}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="mb-1.5 block text-xs font-bold">
//               Card Image Alt Text
//             </label>
//             <input
//               value={form.imageAlt}
//               onChange={(e) => updateField("imageAlt", e.target.value)}
//               placeholder="Describe the image"
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="mb-1.5 block text-xs font-bold">
//               Introduction
//             </label>
//             <textarea
//               rows={3}
//               value={form.introduction}
//               onChange={(e) => updateField("introduction", e.target.value)}
//               placeholder="Write a short introduction..."
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="mb-1.5 block text-xs font-bold">Author</label>
//             <input
//               value={form.author}
//               onChange={(e) => updateField("author", e.target.value)}
//               placeholder="Author name"
//               className={inputClass}
//             />
//           </div>

//           {!isArticle && (
//             <>
//               <div>
//                 <label className="mb-1.5 block text-xs font-bold">
//                   Published Date
//                 </label>
//                 <input
//                   value={form.publishedAt}
//                   onChange={(e) => updateField("publishedAt", e.target.value)}
//                   placeholder="e.g. 03 Nov 2026"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className="mb-1.5 block text-xs font-bold">
//                   News Content
//                 </label>
//                 <textarea
//                   rows={8}
//                   value={form.content}
//                   onChange={(e) => updateField("content", e.target.value)}
//                   placeholder="Write the full news content..."
//                   className={inputClass}
//                 />
//               </div>
//             </>
//           )}

//           {isArticle && (
//             <div className="space-y-4 rounded-xl border border-gray-200 p-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="font-bold text-gray-800">
//                   Article Content Sections
//                 </h3>
//                 <span className="text-xs text-gray-400">
//                   {form.sections.length} sections
//                 </span>
//               </div>

//               {form.sections.map((section, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start justify-between gap-3 rounded-lg bg-slate-50 p-3"
//                 >
//                   <div className="min-w-0">
//                     <p className="text-sm font-bold text-gray-800">
//                       {section.heading || `Section ${index + 1}`}
//                     </p>
//                     <p className="mt-1 line-clamp-2 text-xs text-gray-500">
//                       {section.paragraphs.join(" ")}
//                     </p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeSection(index)}
//                     className="text-red-500"
//                     aria-label="Remove section"
//                   >
//                     <X size={17} />
//                   </button>
//                 </div>
//               ))}

//               <input
//                 value={sectionHeading}
//                 onChange={(e) => setSectionHeading(e.target.value)}
//                 placeholder="Section heading"
//                 className={inputClass}
//               />

//               <textarea
//                 rows={4}
//                 value={sectionParagraph}
//                 onChange={(e) => setSectionParagraph(e.target.value)}
//                 placeholder={
//                   "Write paragraph(s). Put each paragraph on a new line."
//                 }
//                 className={inputClass}
//               />

//               <button
//                 type="button"
//                 onClick={addSection}
//                 className="inline-flex items-center gap-2 rounded-lg border border-[#E87565] px-4 py-2 text-xs font-bold text-[#E87565] hover:bg-[#FFF3F1]"
//               >
//                 <Plus size={15} /> Add Content Section
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Feedback */}
//         {(error || success) && (
//           <div
//             className={`flex items-center gap-2 rounded-xl border p-3 text-sm lg:col-span-2 ${
//               error
//                 ? "border-red-200 bg-red-50 text-red-700"
//                 : "border-green-200 bg-green-50 text-green-700"
//             }`}
//           >
//             {error ? <AlertCircle size={17} /> : <CheckCircle2 size={17} />}
//             {error || success}
//           </div>
//         )}

//         {/* Actions */}
//         <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
//           <button
//             type="submit"
//             disabled={loading}
//             className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E25238] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#C9412B] disabled:opacity-60"
//           >
//             {loading ? (
//               <>
//                 <Loader2 size={17} className="animate-spin" />
//                 {initialData ? "Updating..." : "Publishing..."}
//               </>
//             ) : initialData ? (
//               `Update ${isArticle ? "Article" : "News"}`
//             ) : (
//               `Publish ${isArticle ? "Article" : "News"}`
//             )}
//           </button>

//           <button
//             type="button"
//             onClick={() =>
//               onNavigate?.(isArticle ? "all-articles" : "all-news")
//             }
//             className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
//           >
//             View All
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


// import React, { useEffect, useRef, useState } from "react";
// import {
//   UploadCloud,
//   Trash2,
//   Loader2,
//   Plus,
//   X,
//   AlertCircle,
//   CheckCircle2,
// } from "lucide-react";

// const toSlug = (value = "") =>
//   value
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-|-$/g, "");

// const readImage = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });

// const emptyForm = {
//   title: "",
//   slug: "",
//   image: "",
//   imageAlt: "",
//   category: "",
//   categoryLink: "",

//   detailHeroTitle: "",
//   detailHeroDescription: "",
//   detailHeroImage: "",
//   detailHeroImageAlt: "",

//   detailTitle: "",
//   detailSubtitle: "",

//   introductionTitle: "Introduction",
//   introduction: "",

//   sections: [],

//   closingTitle: "",
//   closingContent: "",

//   author: "",
//   publishedAt: "",
// };

// export default function PublicationForm({
//   type = "article",
//   onSave,
//   onNavigate,
//   initialData = null,
// }) {
//   const isArticle = type === "article";

//   const thumbnailRef = useRef(null);
//   const heroRef = useRef(null);

//   const [form, setForm] = useState(emptyForm);

//   const [thumbnailFile, setThumbnailFile] = useState(null);
//   const [heroFile, setHeroFile] = useState(null);

//   const [sectionHeading, setSectionHeading] = useState("");
//   const [sectionParagraphs, setSectionParagraphs] = useState("");
//   const [sectionBullets, setSectionBullets] = useState("");
//   const [sectionImage, setSectionImage] = useState("");
//   const [sectionImageAlt, setSectionImageAlt] = useState("");
//   const [sectionCaption, setSectionCaption] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const inputClass =
//     "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#E87565] focus:ring-2 focus:ring-[#E87565]/20";

//   const labelClass =
//     "mb-1.5 block text-xs font-bold text-[#263247]";

//   useEffect(() => {
//     if (!initialData) {
//       setForm({ ...emptyForm });
//       setThumbnailFile(null);
//       setHeroFile(null);
//       return;
//     }

//     setForm({
//       ...emptyForm,
//       ...initialData,
//       sections: Array.isArray(initialData.sections)
//         ? initialData.sections
//         : [],
//     });

//     setThumbnailFile(null);
//     setHeroFile(null);
//   }, [initialData]);

//   const updateField = (key, value) => {
//     setForm((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handleTitleChange = (value) => {
//     setForm((prev) => ({
//       ...prev,
//       title: value,
//       slug: toSlug(value),
//       detailTitle: prev.detailTitle || value,
//     }));
//   };

//   const handleFileChange = (file, field) => {
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image.");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError("Image size must be less than 5 MB.");
//       return;
//     }

//     setError("");

//     if (field === "thumbnail") {
//       setThumbnailFile(file);
//     } else {
//       setHeroFile(file);
//     }
//   };

//   const addSection = () => {
//     if (
//       !sectionHeading.trim() &&
//       !sectionParagraphs.trim() &&
//       !sectionBullets.trim() &&
//       !sectionImage.trim()
//     ) {
//       setError("Please add some content to the section.");
//       return;
//     }

//     const newSection = {
//       heading: sectionHeading.trim(),

//       paragraphs: sectionParagraphs
//         .split("\n")
//         .map((item) => item.trim())
//         .filter(Boolean),

//       bullets: sectionBullets
//         .split("\n")
//         .map((item) => item.trim())
//         .filter(Boolean),

//       image: sectionImage.trim(),
//       imageAlt: sectionImageAlt.trim(),
//       caption: sectionCaption.trim(),
//     };

//     setForm((prev) => ({
//       ...prev,
//       sections: [...prev.sections, newSection],
//     }));

//     setSectionHeading("");
//     setSectionParagraphs("");
//     setSectionBullets("");
//     setSectionImage("");
//     setSectionImageAlt("");
//     setSectionCaption("");
//     setError("");
//   };

//   const removeSection = (index) => {
//     setForm((prev) => ({
//       ...prev,
//       sections: prev.sections.filter((_, i) => i !== index),
//     }));
//   };

//   const renderUpload = ({
//     title,
//     file,
//     existingImage,
//     inputRef,
//     onChange,
//     onRemove,
//   }) => (
//     <div className="space-y-3">
//       <label className={labelClass}>{title}</label>

//       <div
//         onClick={() => inputRef.current?.click()}
//         className="flex min-h-48 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-slate-50 transition hover:border-[#E87565]"
//       >
//         {file || existingImage ? (
//           <img
//             src={file ? URL.createObjectURL(file) : existingImage}
//             alt={`${title} preview`}
//             className="h-48 w-full object-cover"
//           />
//         ) : (
//           <div className="text-center text-gray-500">
//             <UploadCloud size={30} className="mx-auto mb-2" />
//             <p className="text-sm font-semibold">Upload {title}</p>
//             <p className="mt-1 text-xs">JPG, PNG, WEBP · Max 5 MB</p>
//           </div>
//         )}
//       </div>

//       <input
//         ref={inputRef}
//         type="file"
//         accept="image/*"
//         className="hidden"
//         onChange={(e) => onChange(e.target.files?.[0])}
//       />

//       {file && (
//         <button
//           type="button"
//           onClick={onRemove}
//           className="flex items-center gap-2 text-xs font-semibold text-red-600"
//         >
//           <Trash2 size={14} />
//           Remove image
//         </button>
//       )}
//     </div>
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!form.title.trim() || !form.slug.trim()) {
//       setError("Publication title and slug are required.");
//       return;
//     }

//     if (!thumbnailFile && !form.image) {
//       setError("Please upload a listing thumbnail.");
//       return;
//     }

//     if (!form.detailHeroTitle.trim()) {
//       setError("Please enter the detail hero title.");
//       return;
//     }

//     if (!heroFile && !form.detailHeroImage) {
//       setError("Please upload the detail hero image.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const thumbnailImage = thumbnailFile
//         ? await readImage(thumbnailFile)
//         : form.image;

//       const heroImage = heroFile
//         ? await readImage(heroFile)
//         : form.detailHeroImage;

//       const payload = {
//         ...form,
//         image: thumbnailImage,
//         detailHeroImage: heroImage,
//         slug: toSlug(form.slug),

//         sections: form.sections.map((section) => ({
//           heading: section.heading || "",
//           paragraphs: section.paragraphs || [],
//           bullets: section.bullets || [],
//           image: section.image || "",
//           imageAlt: section.imageAlt || "",
//           caption: section.caption || "",
//         })),

//         isActive: initialData?.isActive ?? true,
//       };

//       await onSave(payload);

//       setSuccess(
//         `${isArticle ? "Article" : "News"} saved successfully.`
//       );
//     } catch (err) {
//       console.error("Publication save error:", err);

//       setError(
//         err.response?.data?.message ||
//           err.message ||
//           "Unable to save publication."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h2 className="text-2xl font-extrabold text-[#1E293B] sm:text-3xl">
//           {initialData ? "Edit" : "Add New"}{" "}
//           {isArticle ? "Article" : "News"}
//         </h2>
//         <p className="mt-2 text-sm text-gray-500">
//           Manage publication listing and detail page content.
//         </p>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
//       >
//         {/* 01 - BASIC INFORMATION */}
//         <section className="space-y-5">
//           <div>
//             <h3 className="text-base font-bold text-[#263247]">
//               01. Basic Information
//             </h3>
//             <p className="mt-1 text-xs text-gray-500">
//               Information displayed on the publication listing page.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
//             {renderUpload({
//               title: "Card Thumbnail",
//               file: thumbnailFile,
//               existingImage: form.image,
//               inputRef: thumbnailRef,
//               onChange: (file) =>
//                 handleFileChange(file, "thumbnail"),
//               onRemove: () => {
//                 setThumbnailFile(null);
//                 if (thumbnailRef.current) {
//                   thumbnailRef.current.value = "";
//                 }
//               },
//             })}

//             <div className="space-y-4">
//               <div>
//                 <label className={labelClass}>Title *</label>
//                 <input
//                   value={form.title}
//                   onChange={(e) => handleTitleChange(e.target.value)}
//                   placeholder="Enter publication title"
//                   className={inputClass}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>URL Slug *</label>
//                 <input
//                   value={form.slug}
//                   onChange={(e) =>
//                     updateField("slug", toSlug(e.target.value))
//                   }
//                   placeholder="publication-url-slug"
//                   className={inputClass}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Category</label>
//                 <input
//                   value={form.category}
//                   onChange={(e) =>
//                     updateField("category", e.target.value)
//                   }
//                   placeholder="Industry Insights"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Category Link</label>
//                 <input
//                   value={form.categoryLink}
//                   onChange={(e) =>
//                     updateField("categoryLink", e.target.value)
//                   }
//                   placeholder="/publication/category"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Thumbnail Alt Text</label>
//                 <input
//                   value={form.imageAlt}
//                   onChange={(e) =>
//                     updateField("imageAlt", e.target.value)
//                   }
//                   placeholder="Describe the thumbnail"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Author</label>
//                 <input
//                   value={form.author}
//                   onChange={(e) =>
//                     updateField("author", e.target.value)
//                   }
//                   placeholder="Author name"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Published Date</label>
//                 <input
//                   type="date"
//                   value={form.publishedAt || ""}
//                   onChange={(e) =>
//                     updateField("publishedAt", e.target.value)
//                   }
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         <hr className="border-gray-100" />

//         {/* 02 - HERO */}
//         <section className="space-y-5">
//           <div>
//             <h3 className="text-base font-bold text-[#263247]">
//               02. Detail Page Hero
//             </h3>
//             <p className="mt-1 text-xs text-gray-500">
//               Animated SplitWord heading with the hero image on the right.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
//             <div className="space-y-4">
//               <div>
//                 <label className={labelClass}>Hero Title *</label>
//                 <textarea
//                   rows={3}
//                   value={form.detailHeroTitle}
//                   onChange={(e) =>
//                     updateField("detailHeroTitle", e.target.value)
//                   }
//                   placeholder="A look at fifty years of change in pharmaceutical automation"
//                   className={inputClass}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Hero Description</label>
//                 <textarea
//                   rows={4}
//                   value={form.detailHeroDescription}
//                   onChange={(e) =>
//                     updateField(
//                       "detailHeroDescription",
//                       e.target.value
//                     )
//                   }
//                   placeholder="Write a short hero description..."
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className={labelClass}>Hero Image Alt Text</label>
//                 <input
//                   value={form.detailHeroImageAlt}
//                   onChange={(e) =>
//                     updateField("detailHeroImageAlt", e.target.value)
//                   }
//                   placeholder="Describe the hero image"
//                   className={inputClass}
//                 />
//               </div>
//             </div>

//             {renderUpload({
//               title: "Hero Image",
//               file: heroFile,
//               existingImage: form.detailHeroImage,
//               inputRef: heroRef,
//               onChange: (file) => handleFileChange(file, "hero"),
//               onRemove: () => {
//                 setHeroFile(null);
//                 if (heroRef.current) {
//                   heroRef.current.value = "";
//                 }
//               },
//             })}
//           </div>
//         </section>

//         <hr className="border-gray-100" />

//         {/* 03 - MAIN TITLE */}
//         <section className="space-y-4">
//           <h3 className="text-base font-bold text-[#263247]">
//             03. Main Detail Heading
//           </h3>

//           <div>
//             <label className={labelClass}>Detail Page Title</label>
//             <input
//               value={form.detailTitle}
//               onChange={(e) =>
//                 updateField("detailTitle", e.target.value)
//               }
//               placeholder="A look at fifty years of change in pharmaceutical automation"
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className={labelClass}>Subtitle</label>
//             <textarea
//               rows={2}
//               value={form.detailSubtitle}
//               onChange={(e) =>
//                 updateField("detailSubtitle", e.target.value)
//               }
//               placeholder="Enter a short subtitle..."
//               className={inputClass}
//             />
//           </div>
//         </section>

//         <hr className="border-gray-100" />

//         {/* 04 - INTRODUCTION */}
//         <section className="space-y-4">
//           <h3 className="text-base font-bold text-[#263247]">
//             04. Introduction
//           </h3>

//           <div>
//             <label className={labelClass}>Introduction Heading</label>
//             <input
//               value={form.introductionTitle}
//               onChange={(e) =>
//                 updateField("introductionTitle", e.target.value)
//               }
//               placeholder="Introduction"
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className={labelClass}>Introduction Content</label>
//             <textarea
//               rows={7}
//               value={form.introduction}
//               onChange={(e) =>
//                 updateField("introduction", e.target.value)
//               }
//               placeholder="Write introduction paragraphs. Each new line creates a separate paragraph."
//               className={inputClass}
//             />
//           </div>
//         </section>

//         <hr className="border-gray-100" />

//         {/* 05 - CONTENT SECTIONS */}
//         <section className="space-y-5">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div>
//               <h3 className="text-base font-bold text-[#263247]">
//                 05. Main Content Sections
//               </h3>
//               <p className="mt-1 text-xs text-gray-500">
//                 Add multiple content blocks in the same order as the detail page.
//               </p>
//             </div>

//             <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
//               {form.sections.length} sections
//             </span>
//           </div>

//           {form.sections.map((section, index) => (
//             <div
//               key={section._id || index}
//               className="rounded-xl border border-gray-200 p-4"
//             >
//               <div className="flex items-center justify-between gap-3">
//                 <h4 className="font-bold text-[#263247]">
//                   {section.heading || `Section ${index + 1}`}
//                 </h4>

//                 <button
//                   type="button"
//                   onClick={() => removeSection(index)}
//                   className="rounded-lg p-2 text-red-500 hover:bg-red-50"
//                   aria-label="Remove section"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>

//               {section.paragraphs?.length > 0 && (
//                 <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-500">
//                   {section.paragraphs.join(" ")}
//                 </p>
//               )}

//               {section.bullets?.length > 0 && (
//                 <p className="mt-2 text-xs text-gray-500">
//                   {section.bullets.length} bullet points
//                 </p>
//               )}

//               {section.image && (
//                 <img
//                   src={section.image}
//                   alt={section.imageAlt || section.heading}
//                   className="mt-3 h-32 w-full rounded-lg object-cover"
//                 />
//               )}
//             </div>
//           ))}

//           <div className="space-y-4 rounded-xl bg-slate-50 p-4 sm:p-5">
//             <h4 className="text-sm font-bold text-[#263247]">
//               Add New Content Section
//             </h4>

//             <div>
//               <label className={labelClass}>Section Heading</label>
//               <input
//                 value={sectionHeading}
//                 onChange={(e) => setSectionHeading(e.target.value)}
//                 placeholder="Enter section heading"
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Paragraphs</label>
//               <textarea
//                 rows={5}
//                 value={sectionParagraphs}
//                 onChange={(e) =>
//                   setSectionParagraphs(e.target.value)
//                 }
//                 placeholder="Each new line creates a separate paragraph."
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Bullet Points</label>
//               <textarea
//                 rows={4}
//                 value={sectionBullets}
//                 onChange={(e) =>
//                   setSectionBullets(e.target.value)
//                 }
//                 placeholder="Each new line creates a bullet point."
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Section Image URL</label>
//               <input
//                 value={sectionImage}
//                 onChange={(e) => setSectionImage(e.target.value)}
//                 placeholder="Optional image URL"
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Image Alt Text</label>
//               <input
//                 value={sectionImageAlt}
//                 onChange={(e) =>
//                   setSectionImageAlt(e.target.value)
//                 }
//                 placeholder="Describe the image"
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label className={labelClass}>Image Caption</label>
//               <input
//                 value={sectionCaption}
//                 onChange={(e) => setSectionCaption(e.target.value)}
//                 placeholder="Optional image caption"
//                 className={inputClass}
//               />
//             </div>

//             {sectionImage && (
//               <img
//                 src={sectionImage}
//                 alt={sectionImageAlt || "Section preview"}
//                 className="max-h-48 w-full rounded-lg object-cover"
//               />
//             )}

//             <button
//               type="button"
//               onClick={addSection}
//               className="inline-flex items-center gap-2 rounded-lg bg-[#E87565] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#d65d4d]"
//             >
//               <Plus size={16} />
//               Add Content Section
//             </button>
//           </div>
//         </section>

//         <hr className="border-gray-100" />

//         {/* 06 - CLOSING */}
//         <section className="space-y-4">
//           <h3 className="text-base font-bold text-[#263247]">
//             06. Closing Content (Optional)
//           </h3>

//           <div>
//             <label className={labelClass}>Closing Heading</label>
//             <input
//               value={form.closingTitle}
//               onChange={(e) =>
//                 updateField("closingTitle", e.target.value)
//               }
//               placeholder="Looking Ahead"
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className={labelClass}>Closing Description</label>
//             <textarea
//               rows={4}
//               value={form.closingContent}
//               onChange={(e) =>
//                 updateField("closingContent", e.target.value)
//               }
//               placeholder="Write closing content..."
//               className={inputClass}
//             />
//           </div>
//         </section>

//         {/* FEEDBACK */}
//         {(error || success) && (
//           <div
//             className={`flex items-center gap-2 rounded-xl border p-3 text-sm ${
//               error
//                 ? "border-red-200 bg-red-50 text-red-700"
//                 : "border-green-200 bg-green-50 text-green-700"
//             }`}
//           >
//             {error ? (
//               <AlertCircle size={17} />
//             ) : (
//               <CheckCircle2 size={17} />
//             )}
//             {error || success}
//           </div>
//         )}

//         {/* ACTIONS */}
//         <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-5">
//           <button
//             type="submit"
//             disabled={loading}
//             className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E25238] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#C9412B] disabled:opacity-60"
//           >
//             {loading ? (
//               <>
//                 <Loader2 size={17} className="animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               `${initialData ? "Update" : "Publish"} ${
//                 isArticle ? "Article" : "News"
//               }`
//             )}
//           </button>

//           <button
//             type="button"
//             onClick={() =>
//               onNavigate?.(
//                 isArticle ? "all-articles" : "all-news"
//               )
//             }
//             className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
//           >
//             View All
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }



import React, { useEffect, useRef, useState } from "react";
import {
  UploadCloud,
  ImagePlus,
  Trash2,
  Plus,
  X,
  ChevronUp,
  ChevronDown,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const EMPTY_FORM = {
  title: "",
  slug: "",
  image: "",
  imageAlt: "",
  category: "",
  categoryLink: "",

  detailHeroTitle: "",
  detailHeroDescription: "",
  detailHeroImage: "",
  detailHeroImageAlt: "",

  detailTitle: "",
  detailSubtitle: "",

  introductionTitle: "Introduction",
  introductionParagraphs: [""],

  contentBlocks: [],

  closingTitle: "",
  closingParagraphs: [""],
  closingBullets: [],

  author: "",
  publishedAt: "",
  order: 0,
  isActive: true,
};

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const readFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Unable to read image."));

    reader.readAsDataURL(file);
  });

const createBlock = (type) => {
  const defaults = {
    heading: {
      type: "heading",
      text: "",
    },
    paragraph: {
      type: "paragraph",
      text: "",
    },
    bulletList: {
      type: "bulletList",
      items: [""],
    },
    image: {
      type: "image",
      image: "",
      imageAlt: "",
      caption: "",
    },
  };

  return { ...defaults[type] };
};

function ImageUpload({
  label,
  value,
  onChange,
  onRemove,
  aspect = "wide",
}) {
  const inputRef = useRef(null);
  const [reading, setReading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file) => {
    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // 5 MB limit for each image
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5 MB.");
      return;
    }

    try {
      setReading(true);

      const dataUrl = await readFile(file);

      onChange(dataUrl);
    } catch (err) {
      setError(err.message || "Image upload failed.");
    } finally {
      setReading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-[#263247]">
        {label}
      </label>

      <div
        className={`relative overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-slate-50 transition hover:border-[#E87565] ${
          aspect === "square" ? "aspect-square" : "min-h-[190px]"
        }`}
      >
        {value ? (
          <div className="relative h-full min-h-[190px] w-full">
            <img
              src={value}
              alt={`${label} preview`}
              className="absolute inset-0 h-full w-full object-contain"
            />

            <div className="absolute right-2 top-2 flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-lg bg-white p-2 text-gray-700 shadow hover:text-[#E87565]"
                title="Change image"
              >
                <ImagePlus size={16} />
              </button>

              <button
                type="button"
                onClick={onRemove}
                className="rounded-lg bg-white p-2 text-red-500 shadow hover:bg-red-50"
                title="Remove image"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={reading}
            className="flex min-h-[190px] w-full flex-col items-center justify-center p-5 text-center"
          >
            {reading ? (
              <Loader2
                size={30}
                className="mb-3 animate-spin text-[#E87565]"
              />
            ) : (
              <UploadCloud
                size={32}
                className="mb-3 text-gray-400"
              />
            )}

            <span className="text-sm font-semibold text-gray-700">
              {reading ? "Reading image..." : "Click to upload image"}
            </span>

            <span className="mt-1 text-xs text-gray-400">
              JPG, PNG, WEBP · Maximum 5 MB
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}

export default function PublicationForm({
  type = "article",
  initialData = null,
  onSave,
  onNavigate,
}) {
  const isArticle = type === "article";

  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#E87565] focus:ring-2 focus:ring-[#E87565]/20";

  const labelClass =
    "mb-1.5 block text-xs font-bold text-[#263247]";

  useEffect(() => {
    if (!initialData) {
      setForm({ ...EMPTY_FORM });
      return;
    }

    setForm({
      ...EMPTY_FORM,
      ...initialData,

      introductionParagraphs:
        Array.isArray(initialData.introductionParagraphs)
          ? initialData.introductionParagraphs
          : initialData.introduction
            ? [initialData.introduction]
            : [""],

      contentBlocks: Array.isArray(initialData.contentBlocks)
        ? initialData.contentBlocks
        : [],

      closingParagraphs:
        Array.isArray(initialData.closingParagraphs)
          ? initialData.closingParagraphs
          : initialData.closingContent
            ? [initialData.closingContent]
            : [""],

      closingBullets: Array.isArray(initialData.closingBullets)
        ? initialData.closingBullets
        : [],
    });
  }, [initialData]);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // --------------------------------
  // PARAGRAPH MANAGEMENT
  // --------------------------------

  const updateParagraph = (field, index, value) => {
    setForm((prev) => {
      const updated = [...(prev[field] || [])];

      updated[index] = value;

      return {
        ...prev,
        [field]: updated,
      };
    });
  };

  const addParagraph = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ""],
    }));
  };

  const removeParagraph = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // --------------------------------
  // CONTENT BLOCK MANAGEMENT
  // --------------------------------

  const addBlock = (type) => {
    setForm((prev) => ({
      ...prev,
      contentBlocks: [
        ...prev.contentBlocks,
        createBlock(type),
      ],
    }));
  };

  const updateBlock = (index, key, value) => {
    setForm((prev) => {
      const blocks = [...prev.contentBlocks];

      blocks[index] = {
        ...blocks[index],
        [key]: value,
      };

      return {
        ...prev,
        contentBlocks: blocks,
      };
    });
  };

  const removeBlock = (index) => {
    setForm((prev) => ({
      ...prev,
      contentBlocks: prev.contentBlocks.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const moveBlock = (index, direction) => {
    setForm((prev) => {
      const blocks = [...prev.contentBlocks];
      const target = index + direction;

      if (target < 0 || target >= blocks.length) {
        return prev;
      }

      [blocks[index], blocks[target]] = [
        blocks[target],
        blocks[index],
      ];

      return {
        ...prev,
        contentBlocks: blocks,
      };
    });
  };

  // --------------------------------
  // BULLET MANAGEMENT
  // --------------------------------

  const updateBullet = (blockIndex, bulletIndex, value) => {
    const block = form.contentBlocks[blockIndex];
    const items = [...(block.items || [])];

    items[bulletIndex] = value;

    updateBlock(blockIndex, "items", items);
  };

  const addBullet = (blockIndex) => {
    const block = form.contentBlocks[blockIndex];

    updateBlock(blockIndex, "items", [
      ...(block.items || []),
      "",
    ]);
  };

  const removeBullet = (blockIndex, bulletIndex) => {
    const block = form.contentBlocks[blockIndex];

    updateBlock(
      blockIndex,
      "items",
      block.items.filter((_, i) => i !== bulletIndex)
    );
  };

  const updateClosingBullet = (index, value) => {
    const bullets = [...form.closingBullets];

    bullets[index] = value;

    updateField("closingBullets", bullets);
  };

  const addClosingBullet = () => {
    updateField("closingBullets", [
      ...form.closingBullets,
      "",
    ]);
  };

  const removeClosingBullet = (index) => {
    updateField(
      "closingBullets",
      form.closingBullets.filter((_, i) => i !== index)
    );
  };

  // --------------------------------
  // TITLE / SLUG
  // --------------------------------

  const handleTitleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugify(value),
      detailTitle: prev.detailTitle || value,
      detailHeroTitle: prev.detailHeroTitle || value,
    }));
  };

  // --------------------------------
  // PARAGRAPH EDITOR
  // --------------------------------

  const renderParagraphEditor = (field, title) => (
    <div className="space-y-3">
      <label className={labelClass}>{title}</label>

      {(form[field] || []).map((paragraph, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-200 p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-500">
              Paragraph {index + 1}
            </span>

            {form[field].length > 1 && (
              <button
                type="button"
                onClick={() => removeParagraph(field, index)}
                className="text-xs font-semibold text-red-500"
              >
                Remove
              </button>
            )}
          </div>

          <textarea
            rows={4}
            className={inputClass}
            value={paragraph}
            onChange={(e) =>
              updateParagraph(field, index, e.target.value)
            }
            placeholder="Write paragraph content..."
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => addParagraph(field)}
        className="inline-flex items-center gap-1 text-xs font-bold text-[#E87565]"
      >
        <Plus size={14} />
        Add Paragraph
      </button>
    </div>
  );

  // --------------------------------
  // CONTENT BLOCK RENDERER
  // --------------------------------

  const renderBlock = (block, index) => (
    <div
      key={block._id || index}
      className="space-y-4 rounded-xl border border-gray-200 bg-white p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-xs font-bold uppercase text-[#E87565]">
            {block.type === "bulletList"
              ? "Bullet List"
              : block.type}
          </span>

          <span className="ml-2 text-xs text-gray-400">
            Block {index + 1}
          </span>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => moveBlock(index, -1)}
            className="rounded-md border p-2 disabled:opacity-30"
            aria-label="Move block up"
          >
            <ChevronUp size={15} />
          </button>

          <button
            type="button"
            disabled={index === form.contentBlocks.length - 1}
            onClick={() => moveBlock(index, 1)}
            className="rounded-md border p-2 disabled:opacity-30"
            aria-label="Move block down"
          >
            <ChevronDown size={15} />
          </button>

          <button
            type="button"
            onClick={() => removeBlock(index)}
            className="rounded-md border border-red-200 p-2 text-red-500"
            aria-label="Remove block"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {block.type === "heading" && (
        <div>
          <label className={labelClass}>Content Heading</label>

          <input
            className={inputClass}
            value={block.text}
            onChange={(e) =>
              updateBlock(index, "text", e.target.value)
            }
            placeholder="e.g. Growth of Automation"
          />
        </div>
      )}

      {block.type === "paragraph" && (
        <div>
          <label className={labelClass}>Paragraph Content</label>

          <textarea
            rows={6}
            className={inputClass}
            value={block.text}
            onChange={(e) =>
              updateBlock(index, "text", e.target.value)
            }
            placeholder="Write paragraph content..."
          />
        </div>
      )}

      {block.type === "bulletList" && (
        <div className="space-y-3">
          <label className={labelClass}>Bullet Points</label>

          {(block.items || []).map((item, bulletIndex) => (
            <div key={bulletIndex} className="flex gap-2">
              <input
                className={inputClass}
                value={item}
                onChange={(e) =>
                  updateBullet(index, bulletIndex, e.target.value)
                }
                placeholder={`Bullet ${bulletIndex + 1}`}
              />

              <button
                type="button"
                onClick={() =>
                  removeBullet(index, bulletIndex)
                }
                className="shrink-0 rounded-lg border p-3 text-red-500"
                aria-label="Remove bullet"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addBullet(index)}
            className="text-xs font-bold text-[#E87565]"
          >
            + Add Bullet Point
          </button>
        </div>
      )}

      {block.type === "image" && (
        <div className="space-y-4">
          <ImageUpload
            label="Content Image"
            value={block.image}
            onChange={(value) =>
              updateBlock(index, "image", value)
            }
            onRemove={() => updateBlock(index, "image", "")}
          />

          <div>
            <label className={labelClass}>Image Alt Text</label>

            <input
              className={inputClass}
              value={block.imageAlt}
              onChange={(e) =>
                updateBlock(index, "imageAlt", e.target.value)
              }
              placeholder="Describe the image"
            />
          </div>

          <div>
            <label className={labelClass}>Image Caption</label>

            <textarea
              rows={2}
              className={inputClass}
              value={block.caption}
              onChange={(e) =>
                updateBlock(index, "caption", e.target.value)
              }
              placeholder="Write image caption..."
            />
          </div>
        </div>
      )}
    </div>
  );

  // --------------------------------
  // FORM SUBMIT
  // --------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Publication title is required.");
      return;
    }

    if (!form.slug.trim()) {
      setError("Publication slug is required.");
      return;
    }

    if (!form.image) {
      setError("Please upload a listing thumbnail.");
      return;
    }

    if (!form.detailHeroTitle.trim()) {
      setError("Hero title is required.");
      return;
    }

    if (!form.detailHeroImage) {
      setError("Please upload a hero image.");
      return;
    }

    if (!form.detailTitle.trim()) {
      setError("Detail page title is required.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...form,

        slug: slugify(form.slug),

        introductionParagraphs:
          form.introductionParagraphs.filter((item) =>
            item.trim()
          ),

        closingParagraphs:
          form.closingParagraphs.filter((item) =>
            item.trim()
          ),

        closingBullets:
          form.closingBullets.filter((item) =>
            item.trim()
          ),

        contentBlocks: form.contentBlocks.map((block) => {
          if (block.type === "bulletList") {
            return {
              ...block,
              items: (block.items || []).filter((item) =>
                item.trim()
              ),
            };
          }

          return block;
        }),

        order: Number(form.order) || 0,
        isActive: Boolean(form.isActive),
      };

      await onSave(payload);

      setSuccess(
        `${isArticle ? "Article" : "News"} saved successfully.`
      );
    } catch (err) {
      console.error("Publication save error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to save publication."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#263247]">
          {initialData ? "Edit" : "Add New"}{" "}
          {isArticle ? "Article" : "News"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Create and manage the complete publication detail page.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
      >
        {/* 01 BASIC INFORMATION */}
        <section className="space-y-5">
          <div>
            <h3 className="border-b pb-3 font-bold text-[#263247]">
              01. Basic Information
            </h3>

            <p className="mt-2 text-xs text-gray-500">
              Information used on the All Articles / All News listing page.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <ImageUpload
              label="Listing Thumbnail *"
              value={form.image}
              onChange={(value) => updateField("image", value)}
              onRemove={() => updateField("image", "")}
            />

            <div className="space-y-4">
              <div>
                <label className={labelClass}>
                  Publication Title *
                </label>

                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter article or news title"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>URL Slug *</label>

                <input
                  className={inputClass}
                  value={form.slug}
                  onChange={(e) =>
                    updateField("slug", slugify(e.target.value))
                  }
                  placeholder="publication-url-slug"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Category</label>

                <input
                  className={inputClass}
                  value={form.category}
                  onChange={(e) =>
                    updateField("category", e.target.value)
                  }
                  placeholder="Industry Insights"
                />
              </div>

              <div>
                <label className={labelClass}>Category Link</label>

                <input
                  className={inputClass}
                  value={form.categoryLink}
                  onChange={(e) =>
                    updateField("categoryLink", e.target.value)
                  }
                  placeholder="/publication/category"
                />
              </div>

              <div>
                <label className={labelClass}>Thumbnail Alt Text</label>

                <input
                  className={inputClass}
                  value={form.imageAlt}
                  onChange={(e) =>
                    updateField("imageAlt", e.target.value)
                  }
                  placeholder="Describe thumbnail"
                />
              </div>

              <div>
                <label className={labelClass}>Author</label>

                <input
                  className={inputClass}
                  value={form.author}
                  onChange={(e) =>
                    updateField("author", e.target.value)
                  }
                  placeholder="Author name"
                />
              </div>

              <div>
                <label className={labelClass}>Published Date</label>

                <input
                  type="date"
                  className={inputClass}
                  value={form.publishedAt || ""}
                  onChange={(e) =>
                    updateField("publishedAt", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* 02 HERO */}
        <section className="space-y-5">
          <div>
            <h3 className="border-b pb-3 font-bold text-[#263247]">
              02. SplitFeatureCard Hero Section
            </h3>

            <p className="mt-2 text-xs text-gray-500">
              This section uses your existing SplitFeatureCard component.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Hero Title *</label>

                <textarea
                  rows={3}
                  className={inputClass}
                  value={form.detailHeroTitle}
                  onChange={(e) =>
                    updateField("detailHeroTitle", e.target.value)
                  }
                  placeholder="Enter hero heading"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  Hero Description
                </label>

                <textarea
                  rows={4}
                  className={inputClass}
                  value={form.detailHeroDescription}
                  onChange={(e) =>
                    updateField(
                      "detailHeroDescription",
                      e.target.value
                    )
                  }
                  placeholder="Enter short hero description"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Hero Image Alt Text
                </label>

                <input
                  className={inputClass}
                  value={form.detailHeroImageAlt}
                  onChange={(e) =>
                    updateField(
                      "detailHeroImageAlt",
                      e.target.value
                    )
                  }
                  placeholder="Describe hero image"
                />
              </div>
            </div>

            <ImageUpload
              label="Hero Image *"
              value={form.detailHeroImage}
              onChange={(value) =>
                updateField("detailHeroImage", value)
              }
              onRemove={() =>
                updateField("detailHeroImage", "")
              }
            />
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* 03 MAIN DETAIL HEADING */}
        <section className="space-y-4">
          <h3 className="border-b pb-3 font-bold text-[#263247]">
            03. Main Detail Page Heading
          </h3>

          <div>
            <label className={labelClass}>
              Detail Page Title *
            </label>

            <textarea
              rows={2}
              className={inputClass}
              value={form.detailTitle}
              onChange={(e) =>
                updateField("detailTitle", e.target.value)
              }
              placeholder="Main centered article title"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Subtitle / Summary</label>

            <textarea
              rows={4}
              className={inputClass}
              value={form.detailSubtitle}
              onChange={(e) =>
                updateField("detailSubtitle", e.target.value)
              }
              placeholder="Write the summary below the title"
            />
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* 04 INTRODUCTION */}
        <section className="space-y-5">
          <h3 className="border-b pb-3 font-bold text-[#263247]">
            04. Introduction
          </h3>

          <div>
            <label className={labelClass}>
              Introduction Heading
            </label>

            <input
              className={inputClass}
              value={form.introductionTitle}
              onChange={(e) =>
                updateField("introductionTitle", e.target.value)
              }
              placeholder="Introduction"
            />
          </div>

          {renderParagraphEditor(
            "introductionParagraphs",
            "Introduction Paragraphs"
          )}
        </section>

        <hr className="border-gray-100" />

        {/* 05 CONTENT BUILDER */}
        <section className="space-y-5">
          <div>
            <h3 className="border-b pb-3 font-bold text-[#263247]">
              05. Main Article / News Content
            </h3>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Add content in the exact order in which it should appear
              on the detail page.
            </p>
          </div>

          {form.contentBlocks.map(renderBlock)}

          <div className="rounded-xl bg-slate-50 p-4">
            <h4 className="mb-3 text-sm font-bold text-[#263247]">
              Add Content Block
            </h4>

            <div className="flex flex-wrap gap-2">
              {[
                ["heading", "Heading"],
                ["paragraph", "Paragraph"],
                ["bulletList", "Bullet List"],
                ["image", "Image Upload"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => addBlock(value)}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-[#E87565] hover:text-[#E87565]"
                >
                  <Plus size={14} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* 06 FINAL SECTION */}
        <section className="space-y-5">
          <h3 className="border-b pb-3 font-bold text-[#263247]">
            06. Final Section / Conclusion
          </h3>

          <div>
            <label className={labelClass}>Final Heading</label>

            <input
              className={inputClass}
              value={form.closingTitle}
              onChange={(e) =>
                updateField("closingTitle", e.target.value)
              }
              placeholder="e.g. Eye on the Prize"
            />
          </div>

          {renderParagraphEditor(
            "closingParagraphs",
            "Final Paragraphs"
          )}

          <div className="space-y-3">
            <label className={labelClass}>
              Final Bullet Points (Optional)
            </label>

            {form.closingBullets.map((bullet, index) => (
              <div key={index} className="flex gap-2">
                <input
                  className={inputClass}
                  value={bullet}
                  onChange={(e) =>
                    updateClosingBullet(index, e.target.value)
                  }
                  placeholder="Enter bullet point"
                />

                <button
                  type="button"
                  onClick={() => removeClosingBullet(index)}
                  className="shrink-0 rounded-lg border p-3 text-red-500"
                  aria-label="Remove bullet"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addClosingBullet}
              className="text-xs font-bold text-[#E87565]"
            >
              + Add Final Bullet
            </button>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* 07 PUBLISH SETTINGS */}
        <section className="space-y-4">
          <h3 className="border-b pb-3 font-bold text-[#263247]">
            07. Publishing Settings
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Display Order</label>

              <input
                type="number"
                min="0"
                className={inputClass}
                value={form.order}
                onChange={(e) =>
                  updateField("order", Number(e.target.value))
                }
              />
            </div>

            <label className="flex items-center gap-3 self-end pb-3 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  updateField("isActive", e.target.checked)
                }
                className="h-4 w-4 accent-[#E87565]"
              />
              Published / Active
            </label>
          </div>
        </section>

        {/* FEEDBACK */}
        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle size={17} />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            <CheckCircle2 size={17} />
            {success}
          </div>
        )}

        {/* FORM ACTIONS */}
        <div className="flex flex-wrap gap-3 border-t pt-5">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#E25238] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#C9412B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              `${initialData ? "Update" : "Publish"} ${
                isArticle ? "Article" : "News"
              }`
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              onNavigate?.(
                isArticle ? "all-articles" : "all-news"
              )
            }
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
