// import React, { useState, useEffect } from 'react'
// import { Edit, Trash2, CheckCircle2, Eye, EyeOff, Loader2, RefreshCw, Plus, Building2, Briefcase } from 'lucide-react'
// import { getCouncilMembers, deleteCouncilMember, updateCouncilMember } from '../services/api'

// export default function AllCouncilMembers({ onNavigate }) {
//   const [members, setMembers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [actionLoading, setActionLoading] = useState('')
//   const [msg, setMsg] = useState('')

//   // Edit modal state
//   const [editingMember, setEditingMember] = useState(null)
//   const [editName, setEditName] = useState('')
//   const [editRole, setEditRole] = useState('')
//   const [editFullRole, setEditFullRole] = useState('')
//   const [editCompanyName, setEditCompanyName] = useState('')
//   const [isSaving, setIsSaving] = useState(false)

//   const fetchMembers = async () => {
//     setLoading(true)
//     try {
//       const data = await getCouncilMembers()
//       setMembers(data)
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchMembers()
//   }, [])

//   const handleDelete = async (id, name) => {
//     if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return
//     setActionLoading(id)
//     try {
//       await deleteCouncilMember(id)
//       setMembers(members.filter(m => m._id !== id))
//       setMsg(`Council member "${name}" deleted!`)
//       setTimeout(() => setMsg(''), 3000)
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setActionLoading('')
//     }
//   }

//   const openEditModal = (member) => {
//     setEditingMember(member)
//     setEditName(member.name)
//     setEditRole(member.role)
//     setEditFullRole(member.fullRole || '')
//     setEditCompanyName(member.companyName)
//   }

//   const handleSaveEdit = async (e) => {
//     e.preventDefault()
//     if (!editingMember) return
//     setIsSaving(true)
//     try {
//       const res = await updateCouncilMember(editingMember._id, {
//         name: editName,
//         role: editRole,
//         fullRole: editFullRole,
//         companyName: editCompanyName,
//       })
//       setMembers(members.map(m => m._id === editingMember._id ? res.data : m))
//       setEditingMember(null)
//       setMsg('Council Member updated successfully!')
//       setTimeout(() => setMsg(''), 3000)
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   return (
//     <div className="w-full text-left space-y-6">
      
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
//         <div>
//           <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
//             All Council Executive Members
//           </h2>
//           <p className="text-xs sm:text-sm text-gray-500 mt-1">
//             Manage profiles displayed under the "Current Executive Council" section on the About Us page
//           </p>
//         </div>

//         <div className="flex items-center gap-3">
//           <button
//             onClick={fetchMembers}
//             className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition"
//             title="Refresh"
//           >
//             <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//           </button>
          
//           <button
//             onClick={() => onNavigate('add-council')}
//             className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
//           >
//             <Plus className="w-4 h-4" />
//             <span>Add New Member</span>
//           </button>
//         </div>
//       </div>

//       {msg && (
//         <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-2 shadow-xs">
//           <CheckCircle2 className="w-4 h-4 text-green-600" />
//           <span>{msg}</span>
//         </div>
//       )}

//       {/* Members Grid */}
//       {loading ? (
//         <div className="p-16 text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
//           <p className="text-sm text-gray-500">Loading council members...</p>
//         </div>
//       ) : members.length === 0 ? (
//         <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
//           <h3 className="text-base font-bold text-gray-700">No Council Members Found</h3>
//           <button
//             onClick={() => onNavigate('add-council')}
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow mt-4"
//           >
//             <Plus className="w-4 h-4" />
//             <span>Add First Executive</span>
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {members.map((member, idx) => (
//             <div
//               key={member._id || idx}
//               className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col justify-between"
//             >
//               {/* Photo Frame */}
//               <div className="relative h-56 bg-slate-900 overflow-hidden">
//                 <img 
//                   src={member.imageUrl} 
//                   alt={member.name} 
//                   className="w-full h-full object-cover object-top" 
//                 />
//                 <span className="absolute top-3 right-3 bg-[#E37263] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
//                   {member.role}
//                 </span>
//               </div>

//               {/* Details */}
//               <div className="p-5 space-y-2.5">
//                 <div>
//                   <h3 className="text-base font-black text-[#1E293B]">
//                     {member.name}
//                   </h3>
//                   <div className="text-xs font-bold text-[#E37263] mt-0.5">
//                     {member.role}
//                   </div>
//                 </div>

//                 <div className="text-xs text-gray-600 space-y-1 pt-1 border-t border-gray-100">
//                   {member.fullRole && (
//                     <p className="font-medium text-gray-700">
//                       {member.fullRole}
//                     </p>
//                   )}
//                   <p className="text-gray-500 font-normal">
//                     {member.companyName}
//                   </p>
//                 </div>

//                 {/* Actions */}
//                 <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
//                   <button
//                     onClick={() => openEditModal(member)}
//                     className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
//                     title="Edit Member"
//                   >
//                     <Edit className="w-4 h-4" />
//                   </button>

//                   <button
//                     onClick={() => handleDelete(member._id, member.name)}
//                     disabled={actionLoading === member._id}
//                     className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
//                     title="Delete Member"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Edit Modal */}
//       {editingMember && (
//         <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200">
//             <h3 className="text-lg font-black text-[#1E293B] mb-5">
//               Edit Council Executive Member
//             </h3>

//             <form onSubmit={handleSaveEdit} className="space-y-4">
//               <div>
//                 <label className="block text-xs font-bold text-gray-700 mb-1">Name</label>
//                 <input 
//                   type="text" 
//                   value={editName}
//                   onChange={(e) => setEditName(e.target.value)}
//                   required
//                   className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold text-gray-700 mb-1">Role</label>
//                 <select
//                   value={editRole}
//                   onChange={(e) => setEditRole(e.target.value)}
//                   className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
//                 >
//                   <option value="President">President</option>
//                   <option value="Vice President">Vice President</option>
//                   <option value="Immediate Past President">Immediate Past President</option>
//                   <option value="Past President">Past President</option>
//                   <option value="Member">Member</option>
//                   <option value="Advisor">Advisor</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold text-gray-700 mb-1">Corporate Title / Full Role</label>
//                 <input 
//                   type="text" 
//                   value={editFullRole}
//                   onChange={(e) => setEditFullRole(e.target.value)}
//                   className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                 />
//               </div>

//               <div>
//                 <label className="block text-xs font-bold text-gray-700 mb-1">Company Name</label>
//                 <input 
//                   type="text" 
//                   value={editCompanyName}
//                   onChange={(e) => setEditCompanyName(e.target.value)}
//                   required
//                   className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                 />
//               </div>

//               <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
//                 <button
//                   type="button"
//                   onClick={() => setEditingMember(null)}
//                   className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSaving}
//                   className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-bold shadow hover:bg-blue-700 disabled:opacity-50"
//                 >
//                   {isSaving ? 'Saving...' : 'Save Changes'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   )
// }


import React, { useEffect, useState } from "react";
import {
  Edit,
  Trash2,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Plus,
  X,
  Image as ImageIcon,
  UploadCloud,
  AlertCircle,
} from "lucide-react";

import {
  getCouncilMembers,
  deleteCouncilMember,
  updateCouncilMember,
} from "../services/api";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-800";

export default function AllCouncilMembers({ onNavigate }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Edit modal state
  const [editingMember, setEditingMember] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("Member");
  const [editFullRole, setEditFullRole] = useState("");
  const [editCompanyName, setEditCompanyName] = useState("");
  const [editOrder, setEditOrder] = useState("0");

  const [editImage, setEditImage] = useState(null);
  const [editPreview, setEditPreview] = useState("");
  const [editError, setEditError] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const sortMembers = (items) =>
    [...items].sort(
      (a, b) =>
        Number(a.order || 0) - Number(b.order || 0) ||
        new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
    );

  const fetchMembers = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const data = await getCouncilMembers();
      setMembers(sortMembers(data || []));
    } catch (err) {
      console.error("Fetch council members error:", err);
      setErrorMsg(
        err.response?.data?.message || "Failed to load council members."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setActionLoading(id);
    setMsg("");
    setErrorMsg("");

    try {
      await deleteCouncilMember(id);

      setMembers((previous) =>
        sortMembers(previous.filter((member) => member._id !== id))
      );

      setMsg(`Council member "${name}" deleted successfully.`);
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      console.error("Delete council member error:", err);
      setErrorMsg(
        err.response?.data?.message || "Failed to delete council member."
      );
    } finally {
      setActionLoading("");
    }
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setEditName(member.name || "");
    setEditRole(member.role || "Member");
    setEditFullRole(member.fullRole || "");
    setEditCompanyName(member.companyName || "");
    setEditOrder(String(member.order ?? 0));

    setEditImage(null);
    setEditPreview(member.imageUrl || "");
    setEditError("");
  };

  const closeEditModal = () => {
    if (isSaving) return;

    setEditingMember(null);
    setEditImage(null);
    setEditPreview("");
    setEditError("");
  };

  const handleEditImage = (file) => {
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setEditError("Only JPG, PNG, WebP and GIF images are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setEditError("Image size must be less than 5MB.");
      return;
    }

    setEditImage(file);
    setEditPreview(URL.createObjectURL(file));
    setEditError("");
  };

  // Revoke only locally-created preview URLs.
  useEffect(() => {
    return () => {
      if (editPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(editPreview);
      }
    };
  }, [editPreview]);

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!editingMember) return;

    if (
      !editName.trim() ||
      !editRole.trim() ||
      !editCompanyName.trim()
    ) {
      setEditError("Name, Role and Company Name are required.");
      return;
    }

    const numericOrder = Number(editOrder);

    if (!Number.isInteger(numericOrder) || numericOrder < 0) {
      setEditError("Display order must be a valid non-negative number.");
      return;
    }

    setIsSaving(true);
    setEditError("");
    setMsg("");

    try {
      const formData = new FormData();

      formData.append("name", editName.trim());
      formData.append("role", editRole.trim());
      formData.append("fullRole", editFullRole.trim());
      formData.append("companyName", editCompanyName.trim());
      formData.append("order", String(numericOrder));

      if (editImage) {
        formData.append("image", editImage);
      }

      const response = await updateCouncilMember(
        editingMember._id,
        formData
      );

      const updatedMember = response.data;

      setMembers((previous) =>
        sortMembers(
          previous.map((member) =>
            member._id === editingMember._id
              ? updatedMember
              : member
          )
        )
      );

      setEditingMember(null);
      setEditImage(null);
      setEditPreview("");

      setMsg("Council Member updated successfully!");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      console.error("Update council member error:", err);

      setEditError(
        err.response?.data?.message ||
          "Failed to update council member."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full text-left space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
            All Council Executive Members
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage profiles displayed under the "Current Executive
            Council" section on the About Us page.
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Total Members: {members.length}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={fetchMembers}
            disabled={loading}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw
              className={`w-4 h-4 ${
                loading ? "animate-spin" : ""
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.("add-council")}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex-1 sm:flex-none"
          >
            <Plus className="w-4 h-4" />
            Add New Member
          </button>
        </div>
      </div>

      {/* Success */}
      {msg && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* Error */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Members */}
      {loading ? (
        <div className="p-16 text-center bg-white rounded-2xl border border-gray-200">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500">
            Loading council members...
          </p>
        </div>
      ) : members.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-6 h-6" />
          </div>

          <h3 className="text-base font-bold text-gray-700">
            No Council Members Found
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            Add your first executive council member.
          </p>

          <button
            type="button"
            onClick={() => onNavigate?.("add-council")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow mt-5"
          >
            <Plus className="w-4 h-4" />
            Add First Executive
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {members.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col"
            >
              {/* Photo */}
              <div className="relative h-60 bg-slate-100 overflow-hidden">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />

                <span className="absolute top-3 right-3 bg-[#E37263] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                  {member.role}
                </span>

                <span className="absolute bottom-3 left-3 bg-black/65 text-white text-[10px] font-semibold px-2.5 py-1 rounded-md">
                  Order: {member.order ?? 0}
                </span>
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col flex-1">
                <div className="space-y-1">
                  <h3 className="text-base font-black text-[#1E293B]">
                    {member.name}
                  </h3>

                  <p className="text-xs font-bold text-[#E37263]">
                    {member.role}
                  </p>
                </div>

                <div className="text-xs text-gray-600 space-y-2 pt-3 mt-3 border-t border-gray-100 flex-1">
                  {member.fullRole && (
                    <p className="font-medium text-gray-700">
                      {member.fullRole}
                    </p>
                  )}

                  <p className="text-gray-500">
                    {member.companyName}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => openEditModal(member)}
                    className="inline-flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition text-xs font-bold"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Member
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(member._id, member.name)
                    }
                    disabled={actionLoading === member._id}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                    title="Delete Member"
                  >
                    {actionLoading === member._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingMember && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
          onClick={closeEditModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[94vh] shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-gray-100 flex items-center justify-between gap-4 shrink-0">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#1E293B]">
                  Edit Council Executive Member
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Update member information, photograph and display order.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={isSaving}
                className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition disabled:opacity-50"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSaveEdit}
              className="flex flex-col min-h-0 flex-1"
            >
              {/* Scrollable Content */}
              <div className="px-5 sm:px-7 py-5 sm:py-6 space-y-5 overflow-y-auto">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Executive Name *
                  </label>

                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className={inputClass}
                    placeholder="Enter member name"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Council Role *
                  </label>

                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
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

                {/* Full Role */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Corporate Designation / Full Role
                  </label>

                  <input
                    type="text"
                    value={editFullRole}
                    onChange={(e) => setEditFullRole(e.target.value)}
                    className={inputClass}
                    placeholder="e.g., Managing Director, CEO"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Company / Organization Name *
                  </label>

                  <input
                    type="text"
                    value={editCompanyName}
                    onChange={(e) =>
                      setEditCompanyName(e.target.value)
                    }
                    required
                    className={inputClass}
                    placeholder="Enter company name"
                  />
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Display Order
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={editOrder}
                    onChange={(e) => setEditOrder(e.target.value)}
                    className={inputClass}
                  />

                  <p className="text-[11px] text-gray-400 mt-1.5">
                    Lower numbers appear first in the council list.
                  </p>
                </div>

                {/* Image */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-700">
                    Executive Photograph
                  </label>

                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    {editPreview ? (
                      <div className="relative w-full sm:w-36 h-44 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shrink-0">
                        <img
                          src={editPreview}
                          alt="Member preview"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="w-full sm:w-36 h-44 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center shrink-0">
                        <ImageIcon className="w-8 h-8 text-gray-300" />
                      </div>
                    )}

                    <div className="w-full space-y-3">
                      <label
                        className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl px-4 py-5 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          handleEditImage(e.dataTransfer.files?.[0]);
                        }}
                      >
                        <UploadCloud className="w-6 h-6 text-blue-600" />

                        <span className="text-xs font-bold text-gray-700">
                          Click to upload or drop image
                        </span>

                        <span className="text-[11px] text-gray-400">
                          JPG, PNG, WEBP or GIF · Maximum 5MB
                        </span>

                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.webp,.gif"
                          className="hidden"
                          onChange={(e) => {
                            handleEditImage(e.target.files?.[0]);
                            e.target.value = "";
                          }}
                        />
                      </label>

                      {editImage && (
                        <div className="flex items-center justify-between gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                          <span className="text-xs text-blue-700 truncate">
                            {editImage.name}
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setEditImage(null);
                              setEditPreview(editingMember.imageUrl || "");
                            }}
                            className="text-red-500 hover:text-red-700 shrink-0"
                            title="Remove selected replacement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      <p className="text-[11px] text-gray-400">
                        Leave unchanged to keep the existing Cloudinary image.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Error */}
                {editError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{editError}</span>
                  </div>
                )}
              </div>

              {/* Fixed Footer */}
              <div className="px-5 sm:px-7 py-4 border-t border-gray-100 bg-white flex flex-col-reverse sm:flex-row justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={isSaving}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#2563EB] text-white text-sm font-bold shadow hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}