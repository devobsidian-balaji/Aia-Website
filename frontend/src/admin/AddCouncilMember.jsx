// import React, { useState, useRef } from 'react'
// import { Image as ImageIcon, UploadCloud, CheckCircle2, AlertCircle, Loader2, Trash2, UserPlus, Building2, Briefcase } from 'lucide-react'
// import { createCouncilMember } from '../services/api'

// export default function AddCouncilMember({ onMemberAdded, onNavigate }) {
//   const [name, setName] = useState('')
//   const [role, setRole] = useState('Member')
//   const [fullRole, setFullRole] = useState('')
//   const [companyName, setCompanyName] = useState('')
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [previewUrl, setPreviewUrl] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [successMsg, setSuccessMsg] = useState('')
//   const [errorMsg, setErrorMsg] = useState('')
//   const fileInputRef = useRef(null)

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
//     if (!name.trim() || !companyName.trim()) {
//       setErrorMsg('Please enter Name and Company Name.')
//       return
//     }
//     if (!selectedFile && !previewUrl) {
//       setErrorMsg('Please upload a member photograph.')
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
//         name: name.trim(),
//         role: role.trim(),
//         fullRole: fullRole.trim(),
//         companyName: companyName.trim(),
//         imageUrl: base64Image,
//         isActive: true
//       }

//       await createCouncilMember(payload)
//       setSuccessMsg('Council Executive Member added successfully to database!')
//       setName('')
//       setRole('Member')
//       setFullRole('')
//       setCompanyName('')
//       setSelectedFile(null)
//       setPreviewUrl('')

//       if (onMemberAdded) onMemberAdded()
//     } catch (err) {
//       console.error(err)
//       setErrorMsg(err.response?.data?.message || 'Failed to add council member.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="w-full text-left space-y-6">
      
//       {/* Title */}
//       <div className="text-center pb-2">
//         <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
//           Add Current Council Executive Member
//         </h2>
//         <p className="text-xs sm:text-sm text-gray-500 mt-1">
//           Add leadership profiles displayed under "Current Executive Council" on the About Us page
//         </p>
//       </div>

//       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
//           {/* Left Column: Member Photo Upload */}
//           <div className="lg:col-span-5 space-y-4">
//             <div className="bg-[#F4F8FF] px-4 py-3 rounded-xl border border-gray-100 flex items-center gap-2.5">
//               <div className="w-7 h-7 rounded-lg bg-[#E0EDFF] text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs">
//                 <ImageIcon className="w-4 h-4" />
//               </div>
//               <h3 className="text-xs sm:text-sm font-bold text-[#1E293B]">
//                 Upload Executive Photo (Max 1)
//               </h3>
//             </div>

//             <div
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={handleDrop}
//               onClick={() => fileInputRef.current?.click()}
//               className="border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/30 rounded-2xl p-6 text-center cursor-pointer transition relative min-h-[220px] flex items-center justify-center"
//             >
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 accept="image/*"
//                 className="hidden"
//               />

//               {previewUrl ? (
//                 <div className="relative w-full rounded-xl overflow-hidden shadow-xs h-56 bg-slate-100">
//                   <img src={previewUrl} alt="Preview" className="w-full h-full object-cover object-top" />
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       setSelectedFile(null)
//                       setPreviewUrl('')
//                     }}
//                     className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 shadow"
//                   >
//                     <Trash2 className="w-3.5 h-3.5" />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   <div className="w-12 h-12 rounded-full bg-[#EBF3FF] text-[#2563EB] flex items-center justify-center mx-auto shadow-sm">
//                     <UploadCloud className="w-6 h-6" />
//                   </div>
//                   <p className="text-sm text-gray-700 font-semibold">
//                     Drop member photo here, or <span className="text-[#2563EB] underline">browse</span>
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     Supports JPG, PNG, WEBP — 4:5 Portrait recommended
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column: Name, Role, Full Role, Company Name */}
//           <div className="lg:col-span-7 space-y-4">
            
//             {/* Member Name */}
//             <div>
//               <label className="block text-xs font-bold text-gray-800 mb-1.5">
//                 Executive Name
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="e.g., Sunil Mehta"
//                 required
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
//               />
//             </div>

//             {/* Role (Designation in Council) */}
//             <div>
//               <label className="block text-xs font-bold text-gray-800 mb-1.5">
//                 Council Role / Category
//               </label>
//               <select
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm font-semibold text-gray-800"
//               >
//                 <option value="President">President</option>
//                 <option value="Vice President">Vice President</option>
//                 <option value="Immediate Past President">Immediate Past President</option>
//                 <option value="Past President">Past President</option>
//                 <option value="Member">Member</option>
//                 <option value="Advisor">Advisor</option>
//               </select>
//             </div>

//             {/* Full Role / Corporate Title */}
//             <div>
//               <label className="block text-xs font-bold text-gray-800 mb-1.5">
//                 Corporate Designation / Full Role
//               </label>
//               <input
//                 type="text"
//                 value={fullRole}
//                 onChange={(e) => setFullRole(e.target.value)}
//                 placeholder="e.g., General Manager - FA & ID, Managing Director, CEO"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
//               />
//             </div>

//             {/* Company Name */}
//             <div>
//               <label className="block text-xs font-bold text-gray-800 mb-1.5">
//                 Company / Organization Name
//               </label>
//               <input
//                 type="text"
//                 value={companyName}
//                 onChange={(e) => setCompanyName(e.target.value)}
//                 placeholder="e.g., Mitsubishi Electric India Pvt Ltd"
//                 required
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
//               />
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
//                 className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-md transition disabled:opacity-50 active:scale-95"
//               >
//                 {loading ? (
//                   <span className="flex items-center gap-2">
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Saving Member...
//                   </span>
//                 ) : (
//                   <span>Submit Executive Member</span>
//                 )}
//               </button>
//             </div>

//           </div>

//         </form>
//       </div>

//     </div>
//   )
// }


import React, { useEffect, useRef, useState } from "react";
import {
  Image as ImageIcon,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
} from "lucide-react";
import { createCouncilMember } from "../services/api";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-800";

export default function AddCouncilMember({ onMemberAdded, onNavigate }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Member");
  const [fullRole, setFullRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [order, setOrder] = useState("0");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFile = (file) => {
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMsg("Only JPG, PNG, WebP and GIF images are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMsg("Image size must be less than 5MB.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files?.[0]);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !role.trim() || !companyName.trim()) {
      setErrorMsg("Please enter Name, Role and Company Name.");
      return;
    }

    if (!selectedFile) {
      setErrorMsg("Please upload a member photograph.");
      return;
    }

    const numericOrder = Number(order);

    if (!Number.isInteger(numericOrder) || numericOrder < 0) {
      setErrorMsg("Display order must be a valid number greater than or equal to 0.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("role", role.trim());
      formData.append("fullRole", fullRole.trim());
      formData.append("companyName", companyName.trim());
      formData.append("order", String(numericOrder));
      formData.append("isActive", "true");
      formData.append("image", selectedFile);

      await createCouncilMember(formData);

      setSuccessMsg("Council Executive Member added successfully!");

      setName("");
      setRole("Member");
      setFullRole("");
      setCompanyName("");
      setOrder("0");
      setSelectedFile(null);
      setPreviewUrl("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (onMemberAdded) {
        onMemberAdded();
      }
    } catch (err) {
      console.error("Create council member error:", err);
      setErrorMsg(
        err.response?.data?.message || "Failed to add council member."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-left space-y-6">
      <div className="text-center pb-2">
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
          Add Current Council Executive Member
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Add leadership profiles displayed under "Current Executive Council"
          on the About Us page.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start"
        >
          {/* Photo Upload */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#F4F8FF] px-4 py-3 rounded-xl border border-gray-100 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E0EDFF] text-[#2563EB] flex items-center justify-center shrink-0">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1E293B]">
                  Executive Photograph
                </h3>
                <p className="text-[11px] text-gray-500">Maximum size: 5MB</p>
              </div>
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/30 rounded-2xl p-5 sm:p-6 text-center cursor-pointer transition min-h-[250px] flex items-center justify-center"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.webp,.gif"
                className="hidden"
              />

              {previewUrl ? (
                <div className="relative w-full rounded-xl overflow-hidden shadow-sm h-64 bg-slate-100">
                  <img
                    src={previewUrl}
                    alt="Council member preview"
                    className="w-full h-full object-cover object-top"
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow"
                    aria-label="Remove image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs px-3 py-2 truncate">
                    {selectedFile?.name}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#EBF3FF] text-[#2563EB] flex items-center justify-center mx-auto">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <p className="text-sm text-gray-700 font-semibold">
                    Drop member photo here, or{" "}
                    <span className="text-[#2563EB] underline">browse</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    JPG, PNG, WEBP or GIF · 5MB maximum
                  </p>
                  <p className="text-xs text-gray-400">
                    4:5 portrait image recommended
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Member Details */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Executive Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Sunil Mehta"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Council Role / Category *
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`${inputClass} font-semibold`}
              >
                <option value="President">President</option>
                <option value="Vice President">Vice President</option>
                <option value="Immediate Past President">
                  Immediate Past President
                </option>
                <option value="Past President">Past President</option>
                <option value="Member">Member</option>
                <option value="Advisor">Advisor</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Corporate Designation / Full Role
              </label>
              <input
                type="text"
                value={fullRole}
                onChange={(e) => setFullRole(e.target.value)}
                placeholder="e.g., Managing Director, CEO"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Company / Organization Name *
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Mitsubishi Electric India Pvt Ltd"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className={inputClass}
              />
              <p className="text-[11px] text-gray-400 mt-1.5">
                Lower numbers appear first. For example, 0 appears before 1.
              </p>
            </div>

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="pt-3 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-md transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading & Saving...
                  </>
                ) : (
                  "Submit Executive Member"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}