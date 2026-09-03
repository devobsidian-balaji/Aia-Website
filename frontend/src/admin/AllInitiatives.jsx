import React, { useState, useEffect, useRef } from 'react'
import { Edit, Trash2, CheckCircle2, Loader2, RefreshCw, Plus, ExternalLink, UploadCloud, Image as ImageIcon } from 'lucide-react'
import { getInitiatives, deleteInitiative, updateInitiative } from '../services/api'

export default function AllInitiatives({ onNavigate }) {
  const [initiatives, setInitiatives] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')
  const [msg, setMsg] = useState('')

  // Edit modal state
  const [editingItem, setEditingItem] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editInformation, setEditInformation] = useState('')
  const [editLink, setEditLink] = useState('')
  const [editImagePreview, setEditImagePreview] = useState('')
  const [editImageFile, setEditImageFile] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const editFileInputRef = useRef(null)

  const fetchInitiatives = async () => {
    setLoading(true)
    try {
      const data = await getInitiatives()
      setInitiatives(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInitiatives()
  }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return
    setActionLoading(id)
    try {
      await deleteInitiative(id)
      setInitiatives(initiatives.filter(i => i._id !== id))
      setMsg(`Initiative "${title}" deleted!`)
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading('')
    }
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setEditTitle(item.title)
    setEditInformation(item.information)
    setEditLink(item.link || '#')
    setEditImagePreview(item.imageUrl)
    setEditImageFile(null)
  }

  const handleEditFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setEditImageFile(file)
      setEditImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    if (!editingItem) return
    setIsSaving(true)
    try {
      let finalImageUrl = editImagePreview
      if (editImageFile) {
        finalImageUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(editImageFile)
          reader.onload = () => resolve(reader.result)
          reader.onerror = err => reject(err)
        })
      }

      const res = await updateInitiative(editingItem._id, {
        title: editTitle,
        information: editInformation,
        link: editLink,
        imageUrl: finalImageUrl,
      })
      setInitiatives(initiatives.map(i => i._id === editingItem._id ? res.data : i))
      setEditingItem(null)
      setMsg('Initiative updated successfully with new image!')
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="w-full text-left space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
            All Initiatives
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage cards displayed under the "Our Initiatives" section on the IAFSM page
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchInitiatives}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={() => onNavigate('add-initiative')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Initiative</span>
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
          <p className="text-sm text-gray-500">Loading initiatives...</p>
        </div>
      ) : initiatives.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <h3 className="text-base font-bold text-gray-700">No Initiatives Found</h3>
          <button
            onClick={() => onNavigate('add-initiative')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow mt-4"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Initiative</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map((item, idx) => (
            <div
              key={item._id || idx}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative h-52 bg-slate-900 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Details */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-black text-[#1E293B]">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {item.information}
                </p>

                {/* Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit (including Image)"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(item._id, item.title)}
                    disabled={actionLoading === item._id}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal with Image Upload & Replace */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-black text-[#1E293B] mb-5">
              Edit Initiative (Change Title, Information & Photo)
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              
              {/* Image Change / Upload in Edit Modal */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Initiative Photograph
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 border border-gray-300 shrink-0">
                    <img src={editImagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <input
                      type="file"
                      ref={editFileInputRef}
                      onChange={handleEditFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => editFileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-gray-300 transition"
                    >
                      <UploadCloud className="w-4 h-4 text-blue-600" />
                      <span>Change Image</span>
                    </button>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Click to upload a new replacement photo
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Information / Description</label>
                <textarea 
                  rows={4}
                  value={editInformation}
                  onChange={(e) => setEditInformation(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Redirect Link</label>
                <input 
                  type="text" 
                  value={editLink}
                  onChange={(e) => setEditLink(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-bold shadow hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
