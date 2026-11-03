// import React, { useState, useRef } from 'react'
// import { Image as ImageIcon, UploadCloud, CheckCircle2, AlertCircle, Loader2, Trash2, Link as LinkIcon, Calendar, Tag, Type, AlignLeft } from 'lucide-react'
// import { createEvent } from '../services/api'

// export default function AddEvent({ onEventAdded, onNavigate }) {
//   const [heading, setHeading] = useState('')
//   const [text, setText] = useState('')
//   const [link, setLink] = useState('')
//   const [date, setDate] = useState('22 Aug')
//   const [category, setCategory] = useState('Conferences')
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [previewUrl, setPreviewUrl] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [successMsg, setSuccessMsg] = useState('')
//   const [errorMsg, setErrorMsg] = useState('')
//   const fileInputRef = useRef(null)

//   const MAX_HEADING_LEN = 70
//   const MAX_TEXT_LEN = 220

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0]
//       setSelectedFile(file)
//       setPreviewUrl(URL.createObjectURL(file))
//       setErrorMsg('')
//     }
//   }

//   const handleDrop = (e) => {
//     e.preventDefault()
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const file = e.dataTransfer.files[0]
//       setSelectedFile(file)
//       setPreviewUrl(URL.createObjectURL(file))
//       setErrorMsg('')
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     // Strict validation
//     if (!heading.trim()) {
//       setErrorMsg('Event heading is required.')
//       return
//     }
//     if (heading.trim().length > MAX_HEADING_LEN) {
//       setErrorMsg(`Heading cannot exceed ${MAX_HEADING_LEN} characters.`)
//       return
//     }
//     if (!text.trim()) {
//       setErrorMsg('Event text description is required.')
//       return
//     }
//     if (text.trim().length > MAX_TEXT_LEN) {
//       setErrorMsg(`Text description cannot exceed ${MAX_TEXT_LEN} characters.`)
//       return
//     }
//     if (!link.trim()) {
//       setErrorMsg('Please provide the redirect URL/link for the event.')
//       return
//     }
//     if (!date.trim()) {
//       setErrorMsg('Please provide the event date (e.g. 22 Aug).')
//       return
//     }
//     if (!selectedFile && !previewUrl) {
//       setErrorMsg('Please upload an event card poster/image.')
//       return
//     }

//     setLoading(true)
//     setErrorMsg('')
//     setSuccessMsg('')

//     try {
//       let base64Image = previewUrl
//       if (selectedFile) {
//         base64Image = await new Promise((resolve, reject) => {
//           const reader = new FileReader()
//           reader.readAsDataURL(selectedFile)
//           reader.onload = () => resolve(reader.result)
//           reader.onerror = err => reject(err)
//         })
//       }

//       const payload = {
//         title: heading.trim(),
//         heading: heading.trim(),
//         description: text.trim(),
//         text: text.trim(),
//         eventLink: link.trim(),
//         link: link.trim(),
//         date: date.trim(),
//         category,
//         imageUrl: base64Image,
//         isActive: true
//       }

//       await createEvent(payload)
//       setSuccessMsg('Event created and published to database successfully!')
//       setHeading('')
//       setText('')
//       setLink('')
//       setDate('22 Aug')
//       setCategory('Conferences')
//       setSelectedFile(null)
//       setPreviewUrl('')

//       if (onEventAdded) onEventAdded()
//     } catch (err) {
//       console.error(err)
//       setErrorMsg(err.response?.data?.message || 'Failed to save event.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="w-full text-left space-y-6">
      
//       {/* Header */}
//       <div className="text-center pb-2">
//         <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
//           Add New Event
//         </h2>
//         <p className="text-xs sm:text-sm text-gray-500 mt-1">
//           Upload event photo with orange border styling, heading, text, link, date, and category
//         </p>
//       </div>

//       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
//           {/* Left Column: Event Poster Upload with Orange Box Frame */}
//           <div className="lg:col-span-5 space-y-4">
//             <div className="bg-[#FFF4F0] px-4 py-3 rounded-xl border border-orange-200 flex items-center gap-2.5">
//               <div className="w-7 h-7 rounded-lg bg-[#E25238] text-white flex items-center justify-center shrink-0 shadow-xs">
//                 <ImageIcon className="w-4 h-4" />
//               </div>
//               <div>
//                 <h3 className="text-xs sm:text-sm font-bold text-[#1E293B]">
//                   Upload Event Image
//                 </h3>
//                 <p className="text-[10px] text-gray-500">Rendered with orange border & date badge</p>
//               </div>
//             </div>

//             {/* Orange box surrounding the upload/preview area */}
//             <div
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={handleDrop}
//               onClick={() => fileInputRef.current?.click()}
//               className="border-2 border-dashed border-[#E25238]/70 hover:border-[#E25238] hover:bg-orange-50/40 rounded-2xl p-5 text-center cursor-pointer transition relative min-h-[260px] flex items-center justify-center shadow-xs"
//             >
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 accept="image/*"
//                 className="hidden"
//               />

//               {previewUrl ? (
//                 <div className="relative w-full rounded-xl overflow-hidden shadow-xs h-64 bg-slate-900 border-2 border-[#E25238]">
//                   <img src={previewUrl} alt="Event preview" className="w-full h-full object-contain" />
                  
//                   {/* Orange Date Box Preview */}
//                   <div className="absolute top-2.5 right-2.5 bg-[#E25238] text-white rounded-lg px-2.5 py-1 text-center shadow-md font-black text-xs leading-tight">
//                     <div>{date.split(' ')[0] || '22'}</div>
//                     <div className="text-[9px] uppercase tracking-wider opacity-90">{date.split(' ')[1] || 'AUG'}</div>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       setSelectedFile(null)
//                       setPreviewUrl('')
//                     }}
//                     className="absolute top-2.5 left-2.5 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 shadow"
//                   >
//                     <Trash2 className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   <div className="w-12 h-12 rounded-full bg-orange-100 text-[#E25238] flex items-center justify-center mx-auto shadow-sm">
//                     <UploadCloud className="w-6 h-6" />
//                   </div>
//                   <p className="text-sm text-gray-700 font-semibold">
//                     Drop event photo here, or <span className="text-[#E25238] underline">browse</span>
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     Supports JPG, PNG, WEBP — Square or 4:5 portrait
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column: Heading, Text, Link, Date, Category */}
//           <div className="lg:col-span-7 space-y-4">
            
//             {/* Heading with Strict Limit */}
//             <div>
//               <div className="flex justify-between items-center mb-1.5">
//                 <label className="block text-xs font-bold text-gray-800 flex items-center gap-1.5">
//                   <Type className="w-3.5 h-3.5 text-[#E25238]" />
//                   <span>Event Heading (Strict max {MAX_HEADING_LEN} chars)</span>
//                 </label>
//                 <span className={`text-[11px] font-bold ${heading.length > MAX_HEADING_LEN ? 'text-red-500' : 'text-gray-400'}`}>
//                   {heading.length}/{MAX_HEADING_LEN}
//                 </span>
//               </div>
//               <input
//                 type="text"
//                 maxLength={MAX_HEADING_LEN}
//                 value={heading}
//                 onChange={(e) => setHeading(e.target.value)}
//                 placeholder="e.g. Smart Automation for Manufacturing..."
//                 required
//                 className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-sm text-gray-800"
//               />
//             </div>

//             {/* Text / Description with Strict Limit */}
//             <div>
//               <div className="flex justify-between items-center mb-1.5">
//                 <label className="block text-xs font-bold text-gray-800 flex items-center gap-1.5">
//                   <AlignLeft className="w-3.5 h-3.5 text-[#E25238]" />
//                   <span>Event Text / Information (Strict max {MAX_TEXT_LEN} chars)</span>
//                 </label>
//                 <span className={`text-[11px] font-bold ${text.length > MAX_TEXT_LEN ? 'text-red-500' : 'text-gray-400'}`}>
//                   {text.length}/{MAX_TEXT_LEN}
//                 </span>
//               </div>
//               <textarea
//                 rows={3}
//                 maxLength={MAX_TEXT_LEN}
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of 'Make In India' movement."
//                 required
//                 className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-sm text-gray-800 leading-relaxed"
//               ></textarea>
//             </div>

//             {/* Link */}
//             <div>
//               <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
//                 <LinkIcon className="w-3.5 h-3.5 text-[#E25238]" />
//                 <span>Redirect Link / URL (e.g. https://himtex.in)</span>
//               </label>
//               <input
//                 type="text"
//                 value={link}
//                 onChange={(e) => setLink(e.target.value)}
//                 placeholder="https://himtex.in or https://aia-india.org/events/registration"
//                 required
//                 className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-sm text-gray-800"
//               />
//             </div>

//             {/* Date & Category Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {/* Date */}
//               <div>
//                 <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
//                   <Calendar className="w-3.5 h-3.5 text-[#E25238]" />
//                   <span>Event Date Badge (e.g. 22 Aug)</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   placeholder="22 Aug or 02 Sep"
//                   required
//                   className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-sm text-gray-800"
//                 />
//               </div>

//               {/* Category */}
//               <div>
//                 <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
//                   <Tag className="w-3.5 h-3.5 text-[#E25238]" />
//                   <span>Event Category</span>
//                 </label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-sm text-gray-800 bg-white"
//                 >
//                   <option value="Conferences">Conferences</option>
//                   <option value="Workshops">Workshops</option>
//                   <option value="Webinars">Webinars</option>
//                   <option value="Training Programs">Training Programs</option>
//                   <option value="Exhibitions">Exhibitions</option>
//                 </select>
//               </div>
//             </div>

//             {/* Feedback Alerts */}
//             {successMsg && (
//               <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
//                 <span>{successMsg}</span>
//               </div>
//             )}

//             {errorMsg && (
//               <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
//                 <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
//                 <span>{errorMsg}</span>
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="pt-2">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#E25238] hover:bg-[#c9452e] text-white font-bold text-sm shadow-md transition disabled:opacity-50 active:scale-95"
//               >
//                 {loading ? (
//                   <span className="flex items-center gap-2">
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Publishing Event...
//                   </span>
//                 ) : (
//                   <span>Submit Event</span>
//                 )}
//               </button>
//             </div>

//           </div>

//         </form>
//       </div>

//     </div>
//   )
// }




import React, { useRef, useState } from "react";
import {
  Image as ImageIcon,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Link as LinkIcon,
  Calendar,
  Tag,
  Type,
  AlignLeft,
} from "lucide-react";
import { createEvent } from "../services/api";

const categories = [
  "Conference",
  "Workshops",
  "Webinars",
  "Training Program",
];

const MAX_HEADING_LEN = 70;
const MAX_TEXT_LEN = 220;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const inputClass =
  "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#E25238] focus:ring-2 focus:ring-[#E25238]/20";

// Internal routes and external URLs validation
const isValidEventLink = (value) => {
  const link = value.trim();

  // Internal route: /learn-more
  if (link.startsWith("/") && !link.startsWith("//")) {
    return true;
  }

  // External website: example.com, www.example.com, https://example.com
  try {
    const normalizedLink = link.startsWith("www.")
      ? `https://${link}`
      : link.includes("://")
        ? link
        : `https://${link}`;

    const url = new URL(normalizedLink);

    return (
      ["http:", "https:"].includes(url.protocol) &&
      url.hostname.includes(".")
    );
  } catch {
    return false;
  }
};

export default function AddEvent({ onEventAdded, onNavigate }) {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Conference");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef(null);

  // Image selection
  const selectImage = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please select a valid image file.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setErrorMsg("Image size must be less than 5 MB.");
      return;
    }

    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setErrorMsg("");
  };

  const handleFileChange = (e) => {
    selectImage(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    selectImage(e.dataTransfer.files?.[0]);
  };

  const removeImage = () => {
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Reset form
  const resetForm = () => {
    removeImage();
    setHeading("");
    setText("");
    setLink("");
    setDate("");
    setCategory("Conference");
    setErrorMsg("");
  };

  // Convert image to base64
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = () =>
        reject(new Error("Unable to process image."));
    });
  };

  // Submit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    // Heading validation
    if (!heading.trim()) {
      setErrorMsg("Event heading is required.");
      return;
    }

    if (heading.trim().length > MAX_HEADING_LEN) {
      setErrorMsg(
        `Heading cannot exceed ${MAX_HEADING_LEN} characters.`
      );
      return;
    }

    // Description validation
    if (!text.trim()) {
      setErrorMsg("Event description is required.");
      return;
    }

    if (text.trim().length > MAX_TEXT_LEN) {
      setErrorMsg(
        `Description cannot exceed ${MAX_TEXT_LEN} characters.`
      );
      return;
    }

    // Link validation
    if (!link.trim()) {
      setErrorMsg("Event redirect link is required.");
      return;
    }

    if (!isValidEventLink(link)) {
      setErrorMsg(
        "Enter a valid internal route (/learn-more) or external website URL."
      );
      return;
    }

    // Date validation
    if (!date.trim()) {
      setErrorMsg("Event date badge is required.");
      return;
    }

    // Image validation
    if (!selectedFile) {
      setErrorMsg("Please upload an event image.");
      return;
    }

    setLoading(true);

    try {
      const base64Image = await convertImageToBase64(selectedFile);

      const payload = {
        title: heading.trim(),
        heading: heading.trim(),

        description: text.trim(),
        text: text.trim(),

        eventLink: link.trim(),
        link: link.trim(),

        date: date.trim(),
        category,

        imageUrl: base64Image,

        isActive: true,
      };

      await createEvent(payload);

      setSuccessMsg("Event created and published successfully!");

      resetForm();

      if (onEventAdded) {
        onEventAdded();
      }
    } catch (error) {
      console.error("Create event error:", error);

      setErrorMsg(
        error.response?.data?.message ||
          error.message ||
          "Failed to create event. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 text-left">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#1E293B]">
            Add New Event
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Create an event for the AIA Events section.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.("all-events")}
          className="w-fit rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-600 transition hover:bg-gray-50"
        >
          View All Events
        </button>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 items-start gap-7 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-12"
      >

        {/* Image Upload */}
        <div className="space-y-4 lg:col-span-5">

          <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-[#FFF4F0] p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E25238] text-white">
              <ImageIcon className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#1E293B]">
                Event Poster
              </h3>
              <p className="text-xs text-gray-500">
                Upload your event image.
              </p>
            </div>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="flex min-h-[260px] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-[#E25238]/60 p-4 text-center transition hover:border-[#E25238] hover:bg-orange-50/40"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />

            {previewUrl ? (
              <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={previewUrl}
                  alt="Event preview"
                  className="h-full w-full object-cover"
                />

                {date && (
                  <span className="absolute bottom-3 right-3 rounded-md bg-[#E87568] px-3 py-2 text-xs font-bold text-white">
                    {date}
                  </span>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white shadow transition hover:bg-red-700"
                  aria-label="Remove image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-[#E25238]">
                  <UploadCloud className="h-7 w-7" />
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  Drop event image or{" "}
                  <span className="text-[#E25238] underline">
                    browse
                  </span>
                </p>

                <p className="text-xs text-gray-400">
                  JPG, PNG, WEBP — Maximum 5 MB
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-5 lg:col-span-7">

          {/* Heading */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
                <Type className="h-4 w-4 text-[#E25238]" />
                Event Heading
              </label>

              <span className="text-[11px] text-gray-400">
                {heading.length}/{MAX_HEADING_LEN}
              </span>
            </div>

            <input
              type="text"
              value={heading}
              maxLength={MAX_HEADING_LEN}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Enter event heading"
              required
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
                <AlignLeft className="h-4 w-4 text-[#E25238]" />
                Event Description
              </label>

              <span className="text-[11px] text-gray-400">
                {text.length}/{MAX_TEXT_LEN}
              </span>
            </div>

            <textarea
              rows={4}
              value={text}
              maxLength={MAX_TEXT_LEN}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a short event description..."
              required
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Redirect URL */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold text-gray-700">
              <LinkIcon className="h-4 w-4 text-[#E25238]" />
              Event Website / Redirect URL
            </label>

            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="/learn-more or https://example.com"
              required
              className={inputClass}
            />

            <p className="mt-1.5 text-xs leading-relaxed text-gray-400">
              Internal route: <span className="font-medium text-gray-600">/learn-more</span>
              {" "}or external website:{" "}
              <span className="font-medium text-gray-600">https://example.com</span>
            </p>
          </div>

          {/* Date and Category */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-gray-700">
                <Calendar className="h-4 w-4 text-[#E25238]" />
                Date Badge
              </label>

              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="16 Sep"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-gray-700">
                <Tag className="h-4 w-4 text-[#E25238]" />
                Event Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`${inputClass} bg-white`}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {errorMsg}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5">

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E25238] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#C9452E] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Event"
              )}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Reset Form
            </button>

          </div>
        </div>
      </form>
    </div>
  );
}
