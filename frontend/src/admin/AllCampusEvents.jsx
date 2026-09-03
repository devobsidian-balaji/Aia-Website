import React, { useState, useEffect, useRef } from 'react'
import { Edit, Trash2, CheckCircle2, Loader2, RefreshCw, Plus, ExternalLink, UploadCloud } from 'lucide-react'
import { getCampusEvents, deleteCampusEvent, updateCampusEvent } from '../services/api'

export default function AllCampusEvents({ onNavigate }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')
  const [msg, setMsg] = useState('')

  // Edit modal state
  const [editingItem, setEditingItem] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editLink, setEditLink] = useState('')
  const [editImagePreview, setEditImagePreview] = useState('')
  const [editImageFile, setEditImageFile] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const editFileInputRef = useRef(null)

  const MAX_TITLE_LEN = 60

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const data = await getCampusEvents()
      setEvents(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return
    setActionLoading(id)
    try {
      await deleteCampusEvent(id)
      setEvents(prev => prev.filter(e => e._id !== id))
      setMsg(`Campus Event "${title}" deleted!`)
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
      alert(`Failed to delete: ${err.response?.data?.message || err.message}`)
    } finally {
      setActionLoading('')
    }
  }

  const openEditModal = (item) => {
    setEditingItem(item)
    setEditTitle(item.title)
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

    if (editTitle.trim().length > MAX_TITLE_LEN) {
      alert(`Title exceeds ${MAX_TITLE_LEN} characters.`)
      return
    }

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

      const updated = await updateCampusEvent(editingItem._id, {
        title: editTitle.trim(),
        link: editLink.trim(),
        imageUrl: finalImageUrl,
      })

      const finalItem = updated?._id ? updated : {
        ...editingItem,
        title: editTitle.trim(),
        link: editLink.trim(),
        imageUrl: finalImageUrl,
      }

      setEvents(prev => prev.map(e => e._id === editingItem._id ? finalItem : e))
      setEditingItem(null)
      setMsg('Campus Event updated successfully!')
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
      alert(`Failed to save: ${err.response?.data?.message || err.message}`)
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
            All Campus Events
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage cards displayed under "Our Events" on the Campus Connect page
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchEvents}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={() => onNavigate('add-campus-event')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
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
          <p className="text-sm text-gray-500">Loading campus events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <h3 className="text-base font-bold text-gray-700">No Events Found</h3>
          <button
            onClick={() => onNavigate('add-campus-event')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow mt-4"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Event</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((item, idx) => (
            <div
              key={item._id || idx}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative h-60 bg-slate-100 overflow-hidden">
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

                {/* Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit"
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

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-black text-[#1E293B] mb-5">
              Edit Campus Event
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              
              {/* Image Change */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Event Photo
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
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-gray-700">Title</label>
                  <span className="text-[10px] text-gray-400">{editTitle.length}/{MAX_TITLE_LEN}</span>
                </div>
                <input 
                  type="text" 
                  maxLength={MAX_TITLE_LEN}
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
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
