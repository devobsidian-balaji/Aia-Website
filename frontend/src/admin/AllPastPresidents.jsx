import React, { useState, useEffect } from 'react'
import { Edit, Trash2, CheckCircle2, Loader2, RefreshCw, Plus, Calendar, Award,  X,Image as ImageIcon,
 } from 'lucide-react'
import { getPastPresidents, deletePastPresident, updatePastPresident } from '../services/api'

export default function AllPastPresidents({ onNavigate }) {
  const [presidents, setPresidents] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')
  const [msg, setMsg] = useState('')

  // Edit modal state
  const [editingPresident, setEditingPresident] = useState(null)
  const [editName, setEditName] = useState('')
  const [editTerm, setEditTerm] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [editOrder, setEditOrder] = useState(0);
const [editImage, setEditImage] = useState(null);
const [editPreview, setEditPreview] = useState("");

  const fetchPresidents = async () => {
    setLoading(true)
    try {
      const data = await getPastPresidents()
      setPresidents(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPresidents()
  }, [])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return
    setActionLoading(id)
    try {
      await deletePastPresident(id)
      setPresidents(presidents.filter(p => p._id !== id))
      setMsg(`Past President "${name}" deleted!`)
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading('')
    }
  }

const openEditModal = (president) => {
  setEditingPresident(president);

  setEditName(president.name || "");
  setEditTerm(president.term || "");
  setEditDescription(president.description || "");

  setEditOrder(president.order ?? 0);
  setEditImage(null);
  setEditPreview(president.imageUrl || "");
};

 const handleSaveEdit = async (e) => {
  e.preventDefault();

  if (!editingPresident) return;

  if (
    !editName.trim() ||
    !editTerm.trim() ||
    !editDescription.trim()
  ) {
    return;
  }

  setIsSaving(true);

  try {
    const formData = new FormData();

    formData.append("name", editName.trim());
    formData.append("term", editTerm.trim());
    formData.append("description", editDescription.trim());
    formData.append("order", String(editOrder));

    // Only append when a replacement image is selected.
    if (editImage) {
      formData.append("image", editImage);
    }

    const res = await updatePastPresident(
      editingPresident._id,
      formData
    );

    setPresidents((previous) =>
      previous
        .map((president) =>
          president._id === editingPresident._id
            ? res.data
            : president
        )
        .sort((a, b) => a.order - b.order)
    );

    setEditingPresident(null);
    setEditImage(null);
    setEditPreview("");

    setMsg("Past President updated successfully!");
    setTimeout(() => setMsg(""), 3000);
  } catch (err) {
    console.error(err);
    setMsg(
      err.response?.data?.message ||
      "Failed to update Past President."
    );
  } finally {
    setIsSaving(false);
  }
};

  return (
    <div className="w-full text-left space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
            All Past AIA Presidents
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage past leadership profiles displayed under "AIA Past Presidents" on the About Us page
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPresidents}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={() => onNavigate('add-past-president')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Past President</span>
          </button>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>{msg}</span>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="p-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading past presidents...</p>
        </div>
      ) : presidents.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <h3 className="text-base font-bold text-gray-700">No Past Presidents Found</h3>
          <button
            onClick={() => onNavigate('add-past-president')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow mt-4"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Past President</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presidents.map((president, idx) => (
            <div
              key={president._id || idx}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:shadow-lg transition flex flex-col justify-between items-center text-center space-y-4"
            >
              {/* Circular Frame matching Image 1 */}
              <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-[#E37263]/60 shadow-md">
                <img 
                  src={president.imageUrl} 
                  alt={president.name} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Details */}
              <div className="space-y-2 w-full">
                <h3 className="text-lg font-black text-[#1E293B]">
                  {president.name}
                </h3>
                
                <div className="text-xs font-bold text-[#E37263]">
                  ({president.term})
                </div>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed text-left pt-2 border-t border-gray-100">
                  {president.description}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-3 w-full border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => openEditModal(president)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(president._id, president.name)}
                  disabled={actionLoading === president._id}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
     
{/* Edit Modal */}
{editingPresident && (
  <div
    className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
    onClick={() => !isSaving && setEditingPresident(null)}
  >
    <div
      className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-xl max-h-[92vh] overflow-hidden shadow-2xl border border-gray-200 flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="px-5 sm:px-7 py-5 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-[#1E293B]">
            Edit Past AIA President
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Update leadership details and photograph.
          </p>
        </div>

        <button
          type="button"
          onClick={() => !isSaving && setEditingPresident(null)}
          disabled={isSaving}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition disabled:opacity-50"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Modal Body */}
      <form
        onSubmit={handleSaveEdit}
        className="flex flex-col min-h-0 flex-1"
      >
        <div className="px-5 sm:px-7 py-5 sm:py-6 space-y-5 overflow-y-auto">

          {/* Image Replacement */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              President Photograph
            </label>

            <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row items-center gap-5">

                {/* Image Preview */}
                <div className="relative shrink-0">
                  {editPreview ? (
                    <img
                      src={editPreview}
                      alt="President preview"
                      className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}

                  {editImage && (
                    <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-600 border-2 border-white flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </span>
                  )}
                </div>

                {/* Upload Control */}
                <div className="flex-1 min-w-0 w-full text-center sm:text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    Replace current photograph
                  </p>
                  <p className="text-xs text-gray-500 mt-1 mb-3">
                    JPG, PNG, WebP or GIF. Maximum 5 MB.
                  </p>

                  <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 transition cursor-pointer">
                    <ImageIcon className="w-4 h-4" />
                    Choose New Image

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) return;

                        if (file.size > 5 * 1024 * 1024) {
                          setMsg("Image size must be less than 5 MB.");
                          e.target.value = "";
                          return;
                        }

                        setMsg("");
                        setEditImage(file);
                        setEditPreview(URL.createObjectURL(file));
                      }}
                    />
                  </label>

                  <p className="text-xs text-gray-400 mt-2">
                    Leave unchanged to keep the existing photograph.
                  </p>
                </div>
              </div>
            </div>
          </div>
           {/* Display Order */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={editOrder}
              onChange={(e) => setEditOrder(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm text-gray-800 transition"
            />
            <p className="text-xs text-gray-400 mt-2">
              Lower numbers appear first in the Past Presidents section.
            </p>
          </div>

          {/* President Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              President Name
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Enter president name"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm text-gray-800 transition"
            />
          </div>

          {/* Tenure */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tenure / Term Range
            </label>
            <input
              type="text"
              value={editTerm}
              onChange={(e) => setEditTerm(e.target.value)}
              placeholder="e.g. 2016–2018"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm text-gray-800 transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description / Leadership Message
            </label>
            <textarea
              rows={4}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Enter president's experience and leadership message..."
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm text-gray-800 resize-y transition"
            />
          </div>

         

          

        </div>

        {/* Sticky Footer */}
        <div className="px-5 sm:px-7 py-4 border-t border-gray-100 bg-white flex flex-col-reverse sm:flex-row justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setEditingPresident(null)}
            disabled={isSaving}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto min-w-[150px] px-6 py-3 rounded-xl bg-[#2563EB] text-white text-sm font-bold shadow-sm hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
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
  )
}
