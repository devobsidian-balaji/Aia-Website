// import React, { useEffect, useRef, useState } from "react";
// import {
//   Image as ImageIcon,
//   Upload,
//   Save,
//   Trash2,
//   Loader2,
//   Eye,
//   RefreshCw,
//   CheckCircle2,
//   AlertCircle,
//   Type,
//   Layers,
//   X,
//   Pencil,
// } from "lucide-react";

// const API_URL = (
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api"
// ).replace(/\/+$/, "");


// const PAGES = [
//   { key: "about-aia", name: "About AIA" },
//   { key: "membership", name: "Membership" },
//   { key: "industry-insight", name: "Industry Insights" },
//   { key: "talent-connect", name: "Talent Connect" },
//   { key: "events", name: "Events" },
//   { key: "contact-us", name: "Contact Us" },
//   { key: "iafsm", name: "IAFSM" },
// ];

// const INITIAL_HERO = {
//   heading: "",
//   bannerImage: "",
//   overlayOpacity: 85,
//   isActive: true,
// };

// export default function ManagePageHero() {
//   const fileInputRef = useRef(null);
//   const objectUrlRef = useRef("");

//   const [selectedPage, setSelectedPage] = useState(PAGES[0]);
//   const [hero, setHero] = useState(INITIAL_HERO);

//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const [removingImage, setRemovingImage] = useState(false);

//   const [message, setMessage] = useState(null);

//   // Clean temporary browser preview URL
//   const clearObjectPreview = () => {
//     if (objectUrlRef.current) {
//       URL.revokeObjectURL(objectUrlRef.current);
//       objectUrlRef.current = "";
//     }
//   };

//   // Reset selected image
//   const resetSelectedImage = () => {
//     clearObjectPreview();
//     setImageFile(null);

//     setPreview(hero.bannerImage || "");

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   // Fetch selected page hero
//   const fetchHero = async (pageKey) => {
//     setLoading(true);
//     setMessage(null);

//     clearObjectPreview();
//     setImageFile(null);
//     setPreview("");

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }

//     try {
//       const response = await fetch(
//         `${API_URL}/page-heroes/${pageKey}`
//       );

//       if (response.status === 404) {
//         setHero({ ...INITIAL_HERO });
//         setPreview("");
//         return;
//       }

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(
//           result.message || "Unable to fetch hero data."
//         );
//       }

//       const data = result?.data || result?.hero || result;

//       const updatedHero = {
//         heading: data?.heading || "",
//         bannerImage: data?.bannerImage || "",
//         overlayOpacity: data?.overlayOpacity ?? 85,
//         isActive: data?.isActive ?? true,
//       };

//       setHero(updatedHero);
//       setPreview(updatedHero.bannerImage);
//     } catch (error) {
//       console.error("Fetch hero error:", error);

//       setMessage({
//         type: "error",
//         text: error.message || "Unable to load hero data.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHero(selectedPage.key);

//     return () => {
//       clearObjectPreview();
//     };
//   }, [selectedPage.key]);

//   // Handle image selection
//   const handleImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setMessage({
//         type: "error",
//         text: "Please select a valid image file.",
//       });

//       event.target.value = "";
//       return;
//     }

//     if (file.size > 10 * 1024 * 1024) {
//       setMessage({
//         type: "error",
//         text: "Image size should be less than 10MB.",
//       });

//       event.target.value = "";
//       return;
//     }

//     clearObjectPreview();

//     const objectUrl = URL.createObjectURL(file);
//     objectUrlRef.current = objectUrl;

//     setImageFile(file);
//     setPreview(objectUrl);
//     setMessage(null);
//   };

//   // Save / Replace hero image
//   const handleSave = async () => {
//     if (!hero.heading.trim()) {
//       setMessage({
//         type: "error",
//         text: "Please enter hero heading.",
//       });
//       return;
//     }

//     if (!hero.bannerImage && !imageFile) {
//       setMessage({
//         type: "error",
//         text: "Please upload a hero image.",
//       });
//       return;
//     }

//     setSaving(true);
//     setMessage(null);

//     try {
//       const formData = new FormData();

//       formData.append("pageKey", selectedPage.key);
//       formData.append("heading", hero.heading);
//       formData.append(
//         "overlayOpacity",
//         String(hero.overlayOpacity)
//       );
//       formData.append("isActive", String(hero.isActive));

//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       const response = await fetch(`${API_URL}/page-heroes`, {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(
//           result.message || "Unable to save page hero."
//         );
//       }

//       const data = result.data;

//       clearObjectPreview();

//       const updatedHero = {
//         heading: data.heading || "",
//         bannerImage: data.bannerImage || "",
//         overlayOpacity: data.overlayOpacity ?? 85,
//         isActive: data.isActive ?? true,
//       };

//       setHero(updatedHero);
//       setImageFile(null);
//       setPreview(updatedHero.bannerImage);

//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }

//       setMessage({
//         type: "success",
//         text: result.message || "Page hero saved successfully!",
//       });
//     } catch (error) {
//       console.error("Save page hero error:", error);

//       setMessage({
//         type: "error",
//         text: error.message || "Unable to save page hero.",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Remove only image from Cloudinary and MongoDB
//   const handleRemoveImage = async () => {
//     if (!hero.bannerImage) return;

//     const confirmed = window.confirm(
//       `Are you sure you want to remove the ${selectedPage.name} hero image? This will also delete the image from Cloudinary.`
//     );

//     if (!confirmed) return;

//     setRemovingImage(true);
//     setMessage(null);

//     try {
//       const response = await fetch(
//         `${API_URL}/page-heroes/${selectedPage.key}/image`,
//         {
//           method: "DELETE",
//         }
//       );

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(
//           result.message || "Unable to remove hero image."
//         );
//       }

//       clearObjectPreview();

//       setHero((prev) => ({
//         ...prev,
//         bannerImage: "",
//       }));

//       setImageFile(null);
//       setPreview("");

//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }

//       setMessage({
//         type: result.warning ? "error" : "success",
//         text: result.warning
//           ? result.message
//           : "Hero image removed successfully.",
//       });
//     } catch (error) {
//       console.error("Remove hero image error:", error);

//       setMessage({
//         type: "error",
//         text: error.message || "Unable to remove hero image.",
//       });
//     } finally {
//       setRemovingImage(false);
//     }
//   };

//   // Delete complete hero document
//   const handleDelete = async () => {
//     const confirmed = window.confirm(
//       `Delete the complete ${selectedPage.name} hero? This will remove its image and hero settings.`
//     );

//     if (!confirmed) return;

//     setDeleting(true);
//     setMessage(null);

//     try {
//       const response = await fetch(
//         `${API_URL}/page-heroes/${selectedPage.key}`,
//         {
//           method: "DELETE",
//         }
//       );

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(
//           result.message || "Failed to delete hero."
//         );
//       }

//       clearObjectPreview();

//       setHero({ ...INITIAL_HERO });
//       setImageFile(null);
//       setPreview("");

//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }

//       setMessage({
//         type: "success",
//         text: "Complete hero deleted successfully.",
//       });
//     } catch (error) {
//       console.error("Delete hero error:", error);

//       setMessage({
//         type: "error",
//         text: error.message || "Delete failed.",
//       });
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const hasSavedImage = Boolean(hero.bannerImage);
//   const hasSelectedImage = Boolean(imageFile);

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

//       {/* Header */}
//       <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
//             <Layers size={16} />
//             Website Management
//           </div>

//           <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
//             Page Hero CMS
//           </h1>

//           <p className="mt-2 text-sm text-slate-500">
//             Manage hero banners and headings for all website pages.
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={() => fetchHero(selectedPage.key)}
//           disabled={loading || saving || deleting || removingImage}
//           className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-50"
//         >
//           <RefreshCw
//             size={16}
//             className={loading ? "animate-spin" : ""}
//           />
//           Refresh
//         </button>
//       </div>

//       {/* Page Selector */}
//       <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//         <label className="mb-3 block text-sm font-semibold text-slate-800">
//           Select Website Page
//         </label>

//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
//           {PAGES.map((page) => (
//             <button
//               type="button"
//               key={page.key}
//               onClick={() => {
//                 clearObjectPreview();
//                 setImageFile(null);
//                 setSelectedPage(page);
//               }}
//               className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
//                 selectedPage.key === page.key
//                   ? "border-blue-600 bg-blue-50 text-blue-700"
//                   : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-slate-50"
//               }`}
//             >
//               <div className="mb-2 flex items-center gap-2">
//                 <ImageIcon size={17} />

//                 {selectedPage.key === page.key && (
//                   <CheckCircle2 size={15} />
//                 )}
//               </div>

//               {page.name}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Status Message */}
//       {message && (
//         <div
//           className={`mb-6 flex items-center gap-3 rounded-xl border p-4 text-sm ${
//             message.type === "success"
//               ? "border-green-200 bg-green-50 text-green-700"
//               : "border-red-200 bg-red-50 text-red-700"
//           }`}
//         >
//           {message.type === "success" ? (
//             <CheckCircle2 size={19} />
//           ) : (
//             <AlertCircle size={19} />
//           )}

//           <span className="flex-1">{message.text}</span>

//           <button
//             type="button"
//             onClick={() => setMessage(null)}
//             aria-label="Dismiss message"
//           >
//             <X size={17} />
//           </button>
//         </div>
//       )}

//       {loading ? (
//         <div className="flex min-h-[350px] items-center justify-center">
//           <Loader2
//             className="animate-spin text-blue-600"
//             size={32}
//           />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

//           {/* Form */}
//           <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

//             <h2 className="mb-6 text-lg font-bold text-slate-900">
//               Edit {selectedPage.name} Hero
//             </h2>

//             {/* Heading */}
//             <div className="mb-6">
//               <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
//                 <Type size={16} />
//                 Hero Heading
//               </label>

//               <textarea
//                 rows={3}
//                 value={hero.heading}
//                 onChange={(e) =>
//                   setHero((prev) => ({
//                     ...prev,
//                     heading: e.target.value,
//                   }))
//                 }
//                 placeholder="Enter your hero heading..."
//                 className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//               />
//             </div>

//             {/* Image Upload */}
//             <div className="mb-6">
//               <label className="mb-2 block text-sm font-semibold text-slate-700">
//                 Hero Background Image
//               </label>

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/jpeg,image/png,image/webp,image/gif"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />

//               <button
//                 type="button"
//                 onClick={() => fileInputRef.current?.click()}
//                 disabled={saving || deleting || removingImage}
//                 className="w-full cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 {hasSavedImage ? (
//                   <Pencil
//                     className="mx-auto mb-3 text-blue-600"
//                     size={30}
//                   />
//                 ) : (
//                   <Upload
//                     className="mx-auto mb-3 text-blue-600"
//                     size={30}
//                   />
//                 )}

//                 <p className="text-sm font-semibold text-slate-700">
//                   {hasSavedImage
//                     ? "Change Hero Image"
//                     : "Click to Upload Hero Image"}
//                 </p>

//                 <p className="mt-1 text-xs text-slate-400">
//                   JPG, PNG, WEBP (Maximum 10MB)
//                 </p>
//               </button>

//               {/* Image Preview */}
//               {preview && (
//                 <div className="mt-4">
//                   <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
//                     <span className="text-sm font-semibold text-slate-700">
//                       {hasSelectedImage
//                         ? "New Image Preview"
//                         : "Current Hero Image"}
//                     </span>

//                     {hasSelectedImage && (
//                       <button
//                         type="button"
//                         onClick={resetSelectedImage}
//                         disabled={saving}
//                         className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700"
//                       >
//                         <X size={14} />
//                         Cancel New Image
//                       </button>
//                     )}
//                   </div>

//                   <div className="relative overflow-hidden rounded-xl border border-slate-200">
//                     <img
//                       src={preview}
//                       alt="Hero preview"
//                       className="h-52 w-full object-cover"
//                     />

//                     {hasSelectedImage && (
//                       <div className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
//                         Unsaved image
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Remove Saved Image */}
//               {hasSavedImage && !hasSelectedImage && (
//                 <button
//                   type="button"
//                   onClick={handleRemoveImage}
//                   disabled={removingImage || saving || deleting}
//                   className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   {removingImage ? (
//                     <Loader2
//                       size={17}
//                       className="animate-spin"
//                     />
//                   ) : (
//                     <Trash2 size={17} />
//                   )}

//                   {removingImage
//                     ? "Removing Image..."
//                     : "Remove Hero Image"}
//                 </button>
//               )}
//             </div>

//             {/* Overlay Opacity */}
//             <div className="mb-6">
//               <div className="mb-3 flex items-center justify-between">
//                 <label className="text-sm font-semibold text-slate-700">
//                   Overlay Opacity
//                 </label>

//                 <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
//                   {hero.overlayOpacity}%
//                 </span>
//               </div>

//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={hero.overlayOpacity}
//                 onChange={(e) =>
//                   setHero((prev) => ({
//                     ...prev,
//                     overlayOpacity: Number(e.target.value),
//                   }))
//                 }
//                 className="w-full accent-blue-600"
//               />
//             </div>

//             {/* Active Toggle */}
//             <label className="mb-6 flex cursor-pointer items-center justify-between rounded-xl bg-slate-50 p-4">
//               <div>
//                 <p className="text-sm font-semibold text-slate-800">
//                   Hero Status
//                 </p>

//                 <p className="mt-1 text-xs text-slate-500">
//                   Show this hero on the website
//                 </p>
//               </div>

//               <input
//                 type="checkbox"
//                 checked={hero.isActive}
//                 onChange={(e) =>
//                   setHero((prev) => ({
//                     ...prev,
//                     isActive: e.target.checked,
//                   }))
//                 }
//                 className="h-5 w-5 accent-blue-600"
//               />
//             </label>

//             {/* Actions */}
//             <div className="flex flex-col gap-3 sm:flex-row">
//               <button
//                 type="button"
//                 onClick={handleSave}
//                 disabled={
//                   saving ||
//                   deleting ||
//                   removingImage
//                 }
//                 className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {saving ? (
//                   <Loader2
//                     size={18}
//                     className="animate-spin"
//                   />
//                 ) : (
//                   <Save size={18} />
//                 )}

//                 {saving
//                   ? "Saving..."
//                   : hasSavedImage && hasSelectedImage
//                     ? "Replace Hero Image"
//                     : "Save Hero"}
//               </button>

//               <button
//                 type="button"
//                 onClick={handleDelete}
//                 disabled={
//                   deleting ||
//                   saving ||
//                   removingImage ||
//                   (!hero.bannerImage && !hero.heading)
//                 }
//                 className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3.5 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 {deleting ? (
//                   <Loader2
//                     size={18}
//                     className="animate-spin"
//                   />
//                 ) : (
//                   <Trash2 size={18} />
//                 )}

//                 {deleting ? "Deleting..." : "Delete Hero"}
//               </button>
//             </div>

//             <p className="mt-4 text-xs leading-relaxed text-slate-400">
//               Remove Hero Image only removes the image. Delete Hero removes
//               the complete page hero settings.
//             </p>
//           </div>

//           {/* Live Preview */}
//           <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
//             <div className="mb-5 flex items-center gap-2">
//               <Eye size={18} className="text-blue-600" />

//               <h2 className="text-lg font-bold text-slate-900">
//                 Hero Preview
//               </h2>
//             </div>

//             <div
//               className="relative flex min-h-[350px] items-center justify-center overflow-hidden rounded-xl bg-slate-800 bg-cover bg-center p-6 sm:min-h-[450px]"
//               style={{
//                 backgroundImage: preview
//                   ? `url("${preview}")`
//                   : "none",
//               }}
//             >
//               <div
//                 className="absolute inset-0 bg-[#0B131E]"
//                 style={{
//                   opacity: hero.overlayOpacity / 100,
//                 }}
//               />

//               <div className="relative z-10 w-full text-center">
//                 <h2 className="whitespace-pre-line text-3xl font-normal leading-tight text-white drop-shadow-lg sm:text-4xl">
//                   {hero.heading ||
//                     "Your hero heading will appear here"}
//                 </h2>
//               </div>

//               {!preview && (
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="text-center text-white/70">
//                     <ImageIcon
//                       className="mx-auto mb-2"
//                       size={35}
//                     />

//                     <p className="text-sm">
//                       No hero image selected
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
//               <span>{selectedPage.name}</span>
//               <span>Live preview</span>
//             </div>
//           </div>

//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import {
  Image as ImageIcon,
  Upload,
  Save,
  Trash2,
  Loader2,
  Eye,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Type,
  Layers,
  X,
  Pencil,
} from "lucide-react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

// ==========================================
// ADMIN AUTH HEADERS
// ==========================================

const getAdminHeaders = (isJson = false) => {
  const token = sessionStorage.getItem("aia_admin_token");

  if (!token) {
    throw new Error("Admin session expired. Please login again.");
  }

  return {
    Authorization: `Bearer ${token}`,
    ...(isJson ? { "Content-Type": "application/json" } : {}),
  };
};

// ==========================================
// API RESPONSE HANDLER
// ==========================================

const getResponseData = async (response) => {
  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error("Invalid server response. Please try again.");
  }

  if (!response.ok || !result.success) {
    if (response.status === 401) {
      throw new Error(
        result.message || "Admin session expired. Please login again."
      );
    }

    throw new Error(result.message || "Request failed.");
  }

  return result;
};

const PAGES = [
  { key: "about-aia", name: "About AIA" },
  { key: "membership", name: "Membership" },
  { key: "industry-insight", name: "Industry Insights" },
  { key: "talent-connect", name: "Talent Connect" },
  { key: "events", name: "Events" },
  { key: "contact-us", name: "Contact Us" },
  { key: "iafsm", name: "IAFSM" },
];

const INITIAL_HERO = {
  heading: "",
  bannerImage: "",
  overlayOpacity: 85,
  isActive: true,
};

export default function ManagePageHero() {
  const fileInputRef = useRef(null);
  const objectUrlRef = useRef("");

  const [selectedPage, setSelectedPage] = useState(PAGES[0]);
  const [hero, setHero] = useState(INITIAL_HERO);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [removingImage, setRemovingImage] = useState(false);

  const [message, setMessage] = useState(null);

  // ==========================================
  // IMAGE PREVIEW CLEANUP
  // ==========================================

  const clearObjectPreview = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = "";
    }
  };

  // ==========================================
  // RESET SELECTED IMAGE
  // ==========================================

  const resetSelectedImage = () => {
    clearObjectPreview();
    setImageFile(null);
    setPreview(hero.bannerImage || "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // FETCH SELECTED PAGE HERO
  // ==========================================

  const fetchHero = async (pageKey) => {
    setLoading(true);
    setMessage(null);

    clearObjectPreview();
    setImageFile(null);
    setPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    try {
      const response = await fetch(
        `${API_URL}/page-heroes/${pageKey}`,
        {
          method: "GET",
          headers: getAdminHeaders(),
        }
      );

      if (response.status === 404) {
        setHero({ ...INITIAL_HERO });
        setPreview("");
        return;
      }

      const result = await getResponseData(response);

      const data = result?.data || result?.hero || result;

      const updatedHero = {
        heading: data?.heading || "",
        bannerImage: data?.bannerImage || "",
        overlayOpacity: data?.overlayOpacity ?? 85,
        isActive: data?.isActive ?? true,
      };

      setHero(updatedHero);
      setPreview(updatedHero.bannerImage);
    } catch (error) {
      console.error("Fetch hero error:", error);

      setMessage({
        type: "error",
        text: error.message || "Unable to load hero data.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHero(selectedPage.key);

    return () => {
      clearObjectPreview();
    };
  }, [selectedPage.key]);

  // ==========================================
  // HANDLE IMAGE SELECTION
  // ==========================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({
        type: "error",
        text: "Please select a valid image file.",
      });

      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Image size should be less than 10MB.",
      });

      event.target.value = "";
      return;
    }

    clearObjectPreview();

    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;

    setImageFile(file);
    setPreview(objectUrl);
    setMessage(null);
  };

  // ==========================================
  // SAVE / REPLACE HERO IMAGE
  // ==========================================

  const handleSave = async () => {
    if (!hero.heading.trim()) {
      setMessage({
        type: "error",
        text: "Please enter hero heading.",
      });
      return;
    }

    if (!hero.bannerImage && !imageFile) {
      setMessage({
        type: "error",
        text: "Please upload a hero image.",
      });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const formData = new FormData();

      formData.append("pageKey", selectedPage.key);
      formData.append("heading", hero.heading);
      formData.append(
        "overlayOpacity",
        String(hero.overlayOpacity)
      );
      formData.append("isActive", String(hero.isActive));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(`${API_URL}/page-heroes`, {
        method: "POST",
        headers: getAdminHeaders(),
        body: formData,
      });

      const result = await getResponseData(response);

      const data = result.data || result.hero || {};

      clearObjectPreview();

      const updatedHero = {
        heading: data.heading || "",
        bannerImage: data.bannerImage || "",
        overlayOpacity: data.overlayOpacity ?? 85,
        isActive: data.isActive ?? true,
      };

      setHero(updatedHero);
      setImageFile(null);
      setPreview(updatedHero.bannerImage);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setMessage({
        type: "success",
        text: result.message || "Page hero saved successfully!",
      });
    } catch (error) {
      console.error("Save page hero error:", error);

      setMessage({
        type: "error",
        text: error.message || "Unable to save page hero.",
      });
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // REMOVE ONLY HERO IMAGE
  // ==========================================

  const handleRemoveImage = async () => {
    if (!hero.bannerImage) return;

    const confirmed = window.confirm(
      `Are you sure you want to remove the ${selectedPage.name} hero image? This will also delete the image from Cloudinary.`
    );

    if (!confirmed) return;

    setRemovingImage(true);
    setMessage(null);

    try {
      const response = await fetch(
        `${API_URL}/page-heroes/${selectedPage.key}/image`,
        {
          method: "DELETE",
          headers: getAdminHeaders(),
        }
      );

      const result = await getResponseData(response);

      clearObjectPreview();

      setHero((prev) => ({
        ...prev,
        bannerImage: "",
      }));

      setImageFile(null);
      setPreview("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setMessage({
        type: result.warning ? "error" : "success",
        text: result.warning
          ? result.message
          : "Hero image removed successfully.",
      });
    } catch (error) {
      console.error("Remove hero image error:", error);

      setMessage({
        type: "error",
        text: error.message || "Unable to remove hero image.",
      });
    } finally {
      setRemovingImage(false);
    }
  };

  // ==========================================
  // DELETE COMPLETE HERO DOCUMENT
  // ==========================================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete the complete ${selectedPage.name} hero? This will remove its image and hero settings.`
    );

    if (!confirmed) return;

    setDeleting(true);
    setMessage(null);

    try {
      const response = await fetch(
        `${API_URL}/page-heroes/${selectedPage.key}`,
        {
          method: "DELETE",
          headers: getAdminHeaders(),
        }
      );

      const result = await getResponseData(response);

      clearObjectPreview();

      setHero({ ...INITIAL_HERO });
      setImageFile(null);
      setPreview("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setMessage({
        type: "success",
        text: result.message || "Complete hero deleted successfully.",
      });
    } catch (error) {
      console.error("Delete hero error:", error);

      setMessage({
        type: "error",
        text: error.message || "Delete failed.",
      });
    } finally {
      setDeleting(false);
    }
  };

  // ==========================================
  // DERIVED VALUES
  // ==========================================

  const hasSavedImage = Boolean(hero.bannerImage);
  const hasSelectedImage = Boolean(imageFile);

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
            <Layers size={16} />
            Website Management
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Page Hero CMS
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage hero banners and headings for all website pages.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchHero(selectedPage.key)}
          disabled={loading || saving || deleting || removingImage}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Page Selector */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="mb-3 block text-sm font-semibold text-slate-800">
          Select Website Page
        </label>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PAGES.map((page) => (
            <button
              type="button"
              key={page.key}
              onClick={() => {
                clearObjectPreview();
                setImageFile(null);
                setSelectedPage(page);
              }}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                selectedPage.key === page.key
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-slate-50"
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <ImageIcon size={17} />

                {selectedPage.key === page.key && (
                  <CheckCircle2 size={15} />
                )}
              </div>

              {page.name}
            </button>
          ))}
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div
          className={`mb-6 flex items-center gap-3 rounded-xl border p-4 text-sm ${
            message.type === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={19} />
          ) : (
            <AlertCircle size={19} />
          )}

          <span className="flex-1">{message.text}</span>

          <button
            type="button"
            onClick={() => setMessage(null)}
            aria-label="Dismiss message"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex min-h-[350px] items-center justify-center">
          <Loader2
            className="animate-spin text-blue-600"
            size={32}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="mb-6 text-lg font-bold text-slate-900">
              Edit {selectedPage.name} Hero
            </h2>

            {/* Heading */}
            <div className="mb-6">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Type size={16} />
                Hero Heading
              </label>

              <textarea
                rows={3}
                value={hero.heading}
                onChange={(e) =>
                  setHero((prev) => ({
                    ...prev,
                    heading: e.target.value,
                  }))
                }
                placeholder="Enter your hero heading..."
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Hero Background Image
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={saving || deleting || removingImage}
                className="w-full cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {hasSavedImage ? (
                  <Pencil
                    className="mx-auto mb-3 text-blue-600"
                    size={30}
                  />
                ) : (
                  <Upload
                    className="mx-auto mb-3 text-blue-600"
                    size={30}
                  />
                )}

                <p className="text-sm font-semibold text-slate-700">
                  {hasSavedImage
                    ? "Change Hero Image"
                    : "Click to Upload Hero Image"}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  JPG, PNG, WEBP (Maximum 10MB)
                </p>
              </button>

              {/* Image Preview */}
              {preview && (
                <div className="mt-4">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-700">
                      {hasSelectedImage
                        ? "New Image Preview"
                        : "Current Hero Image"}
                    </span>

                    {hasSelectedImage && (
                      <button
                        type="button"
                        onClick={resetSelectedImage}
                        disabled={saving}
                        className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700"
                      >
                        <X size={14} />
                        Cancel New Image
                      </button>
                    )}
                  </div>

                  <div className="relative overflow-hidden rounded-xl border border-slate-200">
                    <img
                      src={preview}
                      alt="Hero preview"
                      className="h-52 w-full object-cover"
                    />

                    {hasSelectedImage && (
                      <div className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                        Unsaved image
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Remove Saved Image */}
              {hasSavedImage && !hasSelectedImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={removingImage || saving || deleting}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {removingImage ? (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2 size={17} />
                  )}

                  {removingImage
                    ? "Removing Image..."
                    : "Remove Hero Image"}
                </button>
              )}
            </div>

            {/* Overlay Opacity */}
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">
                  Overlay Opacity
                </label>

                <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                  {hero.overlayOpacity}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={hero.overlayOpacity}
                onChange={(e) =>
                  setHero((prev) => ({
                    ...prev,
                    overlayOpacity: Number(e.target.value),
                  }))
                }
                className="w-full accent-blue-600"
              />
            </div>

            {/* Active Toggle */}
            <label className="mb-6 flex cursor-pointer items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Hero Status
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Show this hero on the website
                </p>
              </div>

              <input
                type="checkbox"
                checked={hero.isActive}
                onChange={(e) =>
                  setHero((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                className="h-5 w-5 accent-blue-600"
              />
            </label>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleSave}
                disabled={
                  saving ||
                  deleting ||
                  removingImage
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Save size={18} />
                )}

                {saving
                  ? "Saving..."
                  : hasSavedImage && hasSelectedImage
                    ? "Replace Hero Image"
                    : "Save Hero"}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={
                  deleting ||
                  saving ||
                  removingImage ||
                  (!hero.bannerImage && !hero.heading)
                }
                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3.5 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {deleting ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Trash2 size={18} />
                )}

                {deleting ? "Deleting..." : "Delete Hero"}
              </button>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              Remove Hero Image only removes the image. Delete Hero removes
              the complete page hero settings.
            </p>
          </div>

          {/* Live Preview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center gap-2">
              <Eye size={18} className="text-blue-600" />

              <h2 className="text-lg font-bold text-slate-900">
                Hero Preview
              </h2>
            </div>

            <div
              className="relative flex min-h-[350px] items-center justify-center overflow-hidden rounded-xl bg-slate-800 bg-cover bg-center p-6 sm:min-h-[450px]"
              style={{
                backgroundImage: preview
                  ? `url("${preview}")`
                  : "none",
              }}
            >
              <div
                className="absolute inset-0 bg-[#0B131E]"
                style={{
                  opacity: hero.overlayOpacity / 100,
                }}
              />

              <div className="relative z-10 w-full text-center">
                <h2 className="whitespace-pre-line text-3xl font-normal leading-tight text-white drop-shadow-lg sm:text-4xl">
                  {hero.heading ||
                    "Your hero heading will appear here"}
                </h2>
              </div>

              {!preview && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/70">
                    <ImageIcon
                      className="mx-auto mb-2"
                      size={35}
                    />

                    <p className="text-sm">
                      No hero image selected
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>{selectedPage.name}</span>
              <span>Live preview</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
