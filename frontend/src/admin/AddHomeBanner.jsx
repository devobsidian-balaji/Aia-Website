// import React, { useState, useRef } from 'react'
// import { Image as ImageIcon, UploadCloud, CheckCircle2, AlertCircle, Trash2, Loader2, ArrowRight } from 'lucide-react'
// import { createBanner } from '../services/api'

// export default function AddHomeBanner({ onBannerAdded, onNavigate }) {
//   const [bannerName, setBannerName] = useState('')
//   const [selectedFiles, setSelectedFiles] = useState([])
//   const [previewUrls, setPreviewUrls] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [successMsg, setSuccessMsg] = useState('')
//   const [errorMsg, setErrorMsg] = useState('')
//   const fileInputRef = useRef(null)

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files)
//     processFiles(files)
//   }

//   const handleDrop = (e) => {
//     e.preventDefault()
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       processFiles(Array.from(e.dataTransfer.files))
//     }
//   }

//   const processFiles = (files) => {
//     setErrorMsg('')
//     setSuccessMsg('')
    
//     // Max 3 images validation
//     const totalFiles = [...selectedFiles, ...files].slice(0, 3)
//     if (totalFiles.length > 3) {
//       setErrorMsg('You can upload a maximum of 3 banner images at a time.')
//     }
    
//     setSelectedFiles(totalFiles)

//     // Generate previews
//     const previews = totalFiles.map(file => URL.createObjectURL(file))
//     setPreviewUrls(previews)
//   }

//   const removeFile = (index) => {
//     const newFiles = selectedFiles.filter((_, i) => i !== index)
//     const newPreviews = previewUrls.filter((_, i) => i !== index)
//     setSelectedFiles(newFiles)
//     setPreviewUrls(newPreviews)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (selectedFiles.length === 0) {
//       setErrorMsg('Please select at least 1 image to upload.')
//       return
//     }

//     setLoading(true)
//     setErrorMsg('')
//     setSuccessMsg('')

//     try {
//       // Convert to Base64 for instant storage & fast retrieval
//       const base64Promises = selectedFiles.map(file => {
//         return new Promise((resolve, reject) => {
//           const reader = new FileReader()
//           reader.readAsDataURL(file)
//           reader.onload = () => resolve(reader.result)
//           reader.onerror = error => reject(error)
//         })
//       })

//       const base64Images = await Promise.all(base64Promises)

//       const payload = {
//         name: bannerName.trim() || 'Home Hero Banner',
//         base64Images: base64Images
//       }

//       await createBanner(payload)
//       setSuccessMsg(`Successfully uploaded ${selectedFiles.length} banner(s)!`)
//       setBannerName('')
//       setSelectedFiles([])
//       setPreviewUrls([])

//       if (onBannerAdded) onBannerAdded()
//     } catch (err) {
//       console.error(err)
//       setErrorMsg(err.response?.data?.message || 'Failed to upload images. Please check your connection.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      
//       {/* Upload Card matching Image 2 design */}
//       <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden text-left">
        
//         {/* Card Header matching Image 2 */}
//         <div className="bg-[#F4F8FF] px-6 py-4 border-b border-gray-100 flex items-center gap-3">
//           <div className="w-8 h-8 rounded-lg bg-[#E0EDFF] text-[#2563EB] flex items-center justify-center shadow-xs">
//             <ImageIcon className="w-4 h-4" />
//           </div>
//           <h2 className="text-base sm:text-lg font-bold text-[#1E293B]">
//             Upload Home Banner Images (Max 3)
//           </h2>
//         </div>

//         {/* Card Body */}
//         <div className="p-6 sm:p-8 space-y-6">
          
//           {/* Banner Name / Title Input */}
//           <div>
//             <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
//               Banner Title / Identifier
//             </label>
//             <input 
//               type="text"
//               value={bannerName}
//               onChange={(e) => setBannerName(e.target.value)}
//               placeholder="e.g., Smart Manufacturing Automation 2026"
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-800 transition"
//             />
//           </div>

//           {/* Drag & Drop Zone matching Image 2 */}
//           <div 
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={handleDrop}
//             onClick={() => fileInputRef.current?.click()}
//             className="border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/40 rounded-2xl p-10 text-center cursor-pointer transition duration-200"
//           >
//             <input 
//               type="file"
//               ref={fileInputRef}
//               onChange={handleFileChange}
//               multiple
//               accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
//               className="hidden"
//             />

//             <div className="w-14 h-14 rounded-full bg-[#EBF3FF] text-[#2563EB] flex items-center justify-center mx-auto mb-4 shadow-sm">
//               <UploadCloud className="w-7 h-7" />
//             </div>

//             <p className="text-base text-gray-700 font-semibold mb-1">
//               Drop your images here, or <span className="text-[#2563EB] underline font-bold">browse</span>
//             </p>
//             <p className="text-xs text-gray-400">
//               Supports JPG, PNG, GIF — Max 3 images
//             </p>
//           </div>

//           {/* Selected Previews */}
//           {previewUrls.length > 0 && (
//             <div className="space-y-3">
//               <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
//                 Selected Images ({previewUrls.length}/3)
//               </label>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 {previewUrls.map((url, idx) => (
//                   <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-xs h-36 bg-slate-50">
//                     <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
//                     <button
//                       type="button"
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         removeFile(idx)
//                       }}
//                       className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 transition shadow"
//                     >
//                       <Trash2 className="w-3.5 h-3.5" />
//                     </button>
//                     <span className="absolute bottom-1 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded">
//                       Image {idx + 1}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Alerts */}
//           {successMsg && (
//             <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-3">
//               <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
//               <span>{successMsg}</span>
//             </div>
//           )}

//           {errorMsg && (
//             <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-3">
//               <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
//               <span>{errorMsg}</span>
//             </div>
//           )}

//           {/* Upload Button matching Image 2 */}
//           <div className="flex justify-end pt-2">
//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={loading || selectedFiles.length === 0}
//               className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#2563EB] hover:text-white font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs active:scale-95"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
//                   <span>Uploading to Database...</span>
//                 </>
//               ) : (
//                 <>
//                   <UploadCloud className="w-4 h-4" />
//                   <span>Upload Images</span>
//                 </>
//               )}
//             </button>
//           </div>

//         </div>

//       </div>

//     </div>
//   )
// }



// import React, { useEffect, useState } from "react";
// import {
//   Video,
//   UploadCloud,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
//   Play,
//   RefreshCw,
//   Trash2,
// } from "lucide-react";

// const API_URL = (
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api"
// ).replace(/\/$/, "");

// export default function AddHomeBanner({ onBannerAdded }) {
//   const [form, setForm] = useState({
//     title: "Building the automation backbone of India's factories.",
//     description:
//       "Empowering manufacturers to build and sustain solutions based on Industrial Automation, Robotics, Industry 4.0, AI and Collaborative Innovation.",
//     ctaPrimaryText: "Become a Member",
//     ctaPrimaryUrl: "#membership",
//     ctaSecondaryText: "Explore Smart Factory",
//     ctaSecondaryUrl: "#build-factory",
//   });

//   const [video, setVideo] = useState(null);
//   const [videoPreview, setVideoPreview] = useState("");
//   const [savedBanner, setSavedBanner] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   const inputClass =
//     "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#E25238] focus:ring-2 focus:ring-[#E25238]/10";

//   // Fetch already uploaded hero video
//   const fetchSavedBanner = async () => {
//     setFetching(true);

//     try {
//       const response = await fetch(`${API_URL}/banners`);
//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Failed to fetch hero video.");
//       }

//       const activeBanner = result.data?.find(
//         (item) => item.isActive && item.videoUrl
//       );

//       setSavedBanner(activeBanner || null);

//       if (activeBanner) {
//         setForm({
//           title: activeBanner.title || "",
//           description: activeBanner.description || "",
//           ctaPrimaryText: activeBanner.ctaPrimaryText || "",
//           ctaPrimaryUrl: activeBanner.ctaPrimaryUrl || "",
//           ctaSecondaryText: activeBanner.ctaSecondaryText || "",
//           ctaSecondaryUrl: activeBanner.ctaSecondaryUrl || "",
//         });
//       }
//     } catch (error) {
//       console.error("Hero fetch error:", error);
//       setErrorMsg(error.message || "Unable to load saved hero video.");
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => {
//     fetchSavedBanner();
//   }, []);

//   // Release temporary local preview URL
//   useEffect(() => {
//     return () => {
//       if (videoPreview) {
//         URL.revokeObjectURL(videoPreview);
//       }
//     };
//   }, [videoPreview]);

//   const updateField = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Select video
//   const handleVideoChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     setErrorMsg("");
//     setSuccessMsg("");

//     const allowedTypes = [
//       "video/mp4",
//       "video/webm",
//       "video/ogg",
//       "video/quicktime",
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       setErrorMsg("Please upload MP4, WebM, MOV or OGG video.");
//       e.target.value = "";
//       return;
//     }

//     if (file.size > 100 * 1024 * 1024) {
//       setErrorMsg("Video size must be below 100 MB.");
//       e.target.value = "";
//       return;
//     }

//     setVideo(file);
//     setVideoPreview(URL.createObjectURL(file));
//   };

//   const removeSelectedVideo = () => {
//     setVideo(null);
//     setVideoPreview("");
//   };

//   // Upload video
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!video) {
//       setErrorMsg("Please select a video before uploading.");
//       return;
//     }

//     setLoading(true);
//     setErrorMsg("");
//     setSuccessMsg("");

//     try {
//       const payload = new FormData();

//       payload.append("video", video);

//       Object.entries(form).forEach(([key, value]) => {
//         payload.append(key, value);
//       });

//       const response = await fetch(`${API_URL}/banners`, {
//         method: "POST",
//         body: payload,
//       });

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Video upload failed.");
//       }

//       setSuccessMsg("Home hero video uploaded successfully!");

//       setVideo(null);
//       setVideoPreview("");

//       // Fetch saved video again from database
//       await fetchSavedBanner();

//       if (onBannerAdded) {
//         onBannerAdded();
//       }
//     } catch (error) {
//       console.error("Hero upload error:", error);
//       setErrorMsg(error.message || "Failed to upload hero video.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputFields = [
//     ["ctaPrimaryText", "Primary Button Text"],
//     ["ctaPrimaryUrl", "Primary Button URL"],
//     ["ctaSecondaryText", "Secondary Button Text"],
//     ["ctaSecondaryUrl", "Secondary Button URL"],
//   ];

//   return (
//     <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
//       <form
//         onSubmit={handleSubmit}
//         className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
//       >
//         {/* Header */}
//         <div className="flex items-center gap-3 border-b bg-[#F4F8FF] px-6 py-5">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
//             <Video size={20} />
//           </div>

//           <div>
//             <h2 className="font-bold text-slate-800">
//               Home Hero Video CMS
//             </h2>
//             <p className="text-xs text-slate-500">
//               Manage your homepage background video and content.
//             </p>
//           </div>
//         </div>

//         <div className="space-y-6 p-6">
//           {/* Existing saved video */}
//           <div className="rounded-2xl border border-slate-200 p-4">
//             <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//               <div>
//                 <h3 className="font-semibold text-slate-800">
//                   Currently Uploaded Video
//                 </h3>
//                 <p className="mt-1 text-xs text-slate-500">
//                   This video is currently used on the homepage.
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={fetchSavedBanner}
//                 disabled={fetching}
//                 className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
//               >
//                 <RefreshCw
//                   size={14}
//                   className={fetching ? "animate-spin" : ""}
//                 />
//                 Refresh
//               </button>
//             </div>

//             {fetching ? (
//               <div className="flex h-48 items-center justify-center rounded-xl bg-slate-100">
//                 <Loader2 className="animate-spin text-slate-500" />
//               </div>
//             ) : savedBanner?.videoUrl ? (
//               <div className="overflow-hidden rounded-xl bg-black">
//                 <video
//                   key={savedBanner.videoUrl}
//                   src={savedBanner.videoUrl}
//                   controls
//                   playsInline
//                   preload="metadata"
//                   className="max-h-72 w-full object-contain"
//                   onError={() =>
//                     setErrorMsg(
//                       "Saved video URL is unavailable. Check your backend uploads storage."
//                     )
//                   }
//                 />

//                 <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 px-4 py-3">
//                   <div className="flex items-center gap-2 text-sm font-medium text-green-700">
//                     <CheckCircle2 size={16} />
//                     Active hero video
//                   </div>

//                   <span className="text-xs text-slate-500">
//                     {savedBanner.name || "Home Hero"}
//                   </span>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex min-h-44 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-center">
//                 <Video size={34} className="mb-3 text-slate-400" />

//                 <p className="text-sm font-semibold text-slate-700">
//                   No active hero video found
//                 </p>

//                 <p className="mt-1 text-xs text-slate-400">
//                   Upload a video below to display it on your homepage.
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* New video upload */}
//           <div>
//             <label className="mb-2 block text-sm font-semibold text-slate-700">
//               Upload New Hero Video
//             </label>

//             <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center transition hover:border-[#E25238] hover:bg-red-50/30">
//               <Video size={36} className="mb-3 text-[#E25238]" />

//               <span className="text-sm font-semibold text-slate-700">
//                 Click to upload background video
//               </span>

//               <span className="mt-1 text-xs text-slate-400">
//                 MP4, WebM, MOV or OGG — Maximum 100 MB
//               </span>

//               <input
//                 type="file"
//                 accept="video/mp4,video/webm,video/ogg,video/quicktime"
//                 onChange={handleVideoChange}
//                 className="hidden"
//               />
//             </label>

//             {videoPreview && (
//               <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-black">
//                 <video
//                   src={videoPreview}
//                   controls
//                   playsInline
//                   className="max-h-64 w-full object-contain"
//                 />

//                 <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
//                   <span className="min-w-0 truncate text-xs text-slate-600">
//                     {video?.name}
//                   </span>

//                   <button
//                     type="button"
//                     onClick={removeSelectedVideo}
//                     className="flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
//                   >
//                     <Trash2 size={14} />
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Hero content */}
//           <div className="space-y-5 border-t pt-5">
//             <h3 className="font-bold text-slate-800">
//               Hero Content Settings
//             </h3>

//             <div>
//               <label className="mb-2 block text-sm font-semibold text-slate-700">
//                 Hero Heading
//               </label>

//               <textarea
//                 name="title"
//                 value={form.title}
//                 onChange={updateField}
//                 rows={2}
//                 className={inputClass}
//                 required
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-semibold text-slate-700">
//                 Hero Description
//               </label>

//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={updateField}
//                 rows={3}
//                 className={inputClass}
//               />
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2">
//               {inputFields.map(([name, label]) => (
//                 <div key={name}>
//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     {label}
//                   </label>

//                   <input
//                     type="text"
//                     name={name}
//                     value={form[name]}
//                     onChange={updateField}
//                     className={inputClass}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Messages */}
//           {successMsg && (
//             <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
//               <CheckCircle2 size={18} />
//               {successMsg}
//             </div>
//           )}

//           {errorMsg && (
//             <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
//               <AlertCircle size={18} />
//               <span className="break-words">{errorMsg}</span>
//             </div>
//           )}

//           {/* Save */}
//           <div className="flex justify-end border-t pt-5">
//             <button
//               type="submit"
//               disabled={loading || !video}
//               className="inline-flex items-center gap-2 rounded-xl bg-[#E25238] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c9442d] disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 size={17} className="animate-spin" />
//                   Uploading Video...
//                 </>
//               ) : (
//                 <>
//                   <UploadCloud size={17} />
//                   Save Home Hero
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import {
  UploadCloud,
  Video,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Play,
  RefreshCw,
} from "lucide-react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const BACKEND_URL = API_URL.replace(/\/api\/?$/, "");

const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "video/x-m4v",
];

const initialForm = {
  title: "",
  description: "",
  ctaPrimaryText: "",
  ctaPrimaryUrl: "",
  ctaSecondaryText: "",
  ctaSecondaryUrl: "",
};

function getVideoUrl(url) {
  if (!url) return "";

  // Handle previously saved localhost URLs
  if (/^https?:\/\/localhost:5000/i.test(url)) {
    return url.replace(
      /^https?:\/\/localhost:5000/i,
      BACKEND_URL
    );
  }

  // Already absolute URL
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  // Relative backend upload path
  if (url.startsWith("/uploads/")) {
    return `${BACKEND_URL}${url}`;
  }

  return url;
}

export default function AddHomeBanner({ onBannerAdded }) {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [savedBanner, setSavedBanner] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ==========================================
  // FETCH EXISTING HOME HERO
  // ==========================================

  const fetchSavedBanner = async () => {
    setFetching(true);
    setErrorMsg("");

    try {
      const response = await fetch(`${API_URL}/banners`);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to fetch Home Hero."
        );
      }

      const banners = Array.isArray(result.data)
        ? result.data
        : [];

      const activeBanner = banners.find(
        (banner) => banner.isActive === true
      );

      if (activeBanner) {
        setSavedBanner(activeBanner);

        setForm({
          title: activeBanner.title || "",
          description: activeBanner.description || "",
          ctaPrimaryText: activeBanner.ctaPrimaryText || "",
          ctaPrimaryUrl: activeBanner.ctaPrimaryUrl || "",
          ctaSecondaryText:
            activeBanner.ctaSecondaryText || "",
          ctaSecondaryUrl:
            activeBanner.ctaSecondaryUrl || "",
        });

        setVideoPreview(
          getVideoUrl(activeBanner.videoUrl)
        );
      } else {
        setSavedBanner(null);
        setForm(initialForm);
        setVideoPreview("");
      }
    } catch (error) {
      console.error("Fetch Home Hero:", error);
      setErrorMsg(error.message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSavedBanner();
  }, []);

  // ==========================================
  // CLEANUP VIDEO PREVIEW
  // ==========================================

  useEffect(() => {
    return () => {
      if (videoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  // ==========================================
  // FORM INPUT CHANGE
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // VIDEO SELECTION
  // ==========================================

  const handleVideoChange = (event) => {
    const file = event.target.files?.[0];

    setSuccessMsg("");
    setErrorMsg("");

    if (!file) return;

    if (
      !ALLOWED_VIDEO_TYPES.includes(file.type) &&
      !/\.(mp4|webm|ogg|mov|m4v)$/i.test(file.name)
    ) {
      setErrorMsg(
        "Please select a valid MP4, WebM, OGG or MOV video."
      );

      event.target.value = "";
      return;
    }

    if (file.size > MAX_VIDEO_SIZE) {
      setErrorMsg(
        "Video size must be less than 100 MB."
      );

      event.target.value = "";
      return;
    }

    if (videoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(videoPreview);
    }

    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  // ==========================================
  // REMOVE SELECTED VIDEO
  // ==========================================

  const removeSelectedVideo = () => {
    if (videoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(videoPreview);
    }

    setVideo(null);

    setVideoPreview(
      savedBanner?.videoUrl
        ? getVideoUrl(savedBanner.videoUrl)
        : ""
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ==========================================
  // SAVE HOME HERO
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMsg("");
    setErrorMsg("");

    if (!savedBanner && !video) {
      setErrorMsg("Please upload a Home Hero video.");
      return;
    }

    if (video && video.size > MAX_VIDEO_SIZE) {
      setErrorMsg("Video size must be less than 100 MB.");
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("ctaPrimaryText", form.ctaPrimaryText);
    formData.append("ctaPrimaryUrl", form.ctaPrimaryUrl);
    formData.append("ctaSecondaryText", form.ctaSecondaryText);
    formData.append("ctaSecondaryUrl", form.ctaSecondaryUrl);

    if (video) {
      formData.append("video", video);
    }

    const isUpdating = Boolean(savedBanner?._id);

    const requestUrl = isUpdating
      ? `${API_URL}/banners/${savedBanner._id}`
      : `${API_URL}/banners`;

    const method = isUpdating ? "PUT" : "POST";

    setLoading(true);

    try {
      const response = await fetch(requestUrl, {
        method,
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to save Home Hero."
        );
      }

      setSuccessMsg(
        result.message || "Home Hero saved successfully!"
      );

      setVideo(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await fetchSavedBanner();

      if (onBannerAdded) {
        onBannerAdded(result.data);
      }
    } catch (error) {
      console.error("Save Home Hero:", error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (fetching) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
        <span className="ml-3 text-sm text-slate-500">
          Loading Home Hero...
        </span>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 rounded-xl bg-white p-5 shadow-sm sm:p-7">

      {/* HEADER */}

      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Video size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Home Hero CMS
            </h2>

            <p className="text-sm text-slate-500">
              Manage your homepage hero video and content.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* VIDEO UPLOAD */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Home Hero Video
          </label>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-500 hover:bg-blue-50/40"
          >
            <UploadCloud className="mb-3 h-9 w-9 text-blue-600" />

            <p className="font-semibold text-slate-800">
              Click to upload hero video
            </p>

            <p className="mt-1 text-xs text-slate-500">
              MP4, WebM, OGG or MOV · Maximum 100 MB
            </p>

            {video && (
              <p className="mt-3 break-all text-sm font-medium text-green-600">
                Selected: {video.name}
              </p>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg,video/quicktime,.m4v"
            onChange={handleVideoChange}
            className="hidden"
          />

          {/* VIDEO PREVIEW */}

          {videoPreview && (
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-black">
              <video
                key={videoPreview}
                src={videoPreview}
                controls
                playsInline
                preload="metadata"
                className="max-h-80 w-full object-contain"
                onError={(event) => {
                  console.error(
                    "Home Hero video URL:",
                    event.currentTarget.src
                  );

                  setErrorMsg(
                    "Video URL is unavailable. Check backend uploads storage."
                  );
                }}
                onLoadedMetadata={() => {
                  setErrorMsg("");
                }}
              />

              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3">
                <span className="text-xs text-slate-500">
                  {video
                    ? "New video preview"
                    : "Saved Home Hero video"}
                </span>

                {video && (
                  <button
                    type="button"
                    onClick={removeSelectedVideo}
                    className="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                    Remove selected video
                  </button>
                )}
              </div>
            </div>
          )}

          {!videoPreview && savedBanner && (
            <p className="mt-3 text-sm text-amber-600">
              No video preview available. Upload a new video to replace it.
            </p>
          )}
        </div>

        {/* TITLE */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Hero Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter hero title"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* DESCRIPTION */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Hero Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Enter hero description"
            className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* PRIMARY CTA */}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Primary Button Text
            </label>

            <input
              type="text"
              name="ctaPrimaryText"
              value={form.ctaPrimaryText}
              onChange={handleChange}
              placeholder="Connect with us"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Primary Button URL
            </label>

            <input
              type="text"
              name="ctaPrimaryUrl"
              value={form.ctaPrimaryUrl}
              onChange={handleChange}
              placeholder="#membership"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* SECONDARY CTA */}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Secondary Button Text
            </label>

            <input
              type="text"
              name="ctaSecondaryText"
              value={form.ctaSecondaryText}
              onChange={handleChange}
              placeholder="Explore Smart Factory"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Secondary Button URL
            </label>

            <input
              type="text"
              name="ctaSecondaryUrl"
              value={form.ctaSecondaryUrl}
              onChange={handleChange}
              placeholder="/learn-more"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* SUCCESS MESSAGE */}

        {successMsg && (
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            <CheckCircle2 size={18} />
            {successMsg}
          </div>
        )}

        {/* ERROR MESSAGE */}

        {errorMsg && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* SUBMIT */}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">

          <button
            type="button"
            onClick={fetchSavedBanner}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <UploadCloud size={17} />
                {savedBanner
                  ? "Save Home Hero"
                  : "Upload Home Hero"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
