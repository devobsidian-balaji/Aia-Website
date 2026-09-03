import React, { useState, useEffect, useRef } from 'react'
import { Edit, Trash2, CheckCircle2, Loader2, RefreshCw, Plus, ExternalLink, UploadCloud, Calendar, Tag } from 'lucide-react'
import { getEvents, deleteEvent, updateEvent } from '../services/api'

export default function AllEvents({ onNavigate }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')
  const [msg, setMsg] = useState('')

  // Edit modal state
  const [editingEvent, setEditingEvent] = useState(null)
  const [editHeading, setEditHeading] = useState('')
  const [editText, setEditText] = useState('')
  const [editLink, setEditLink] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editCategory, setEditCategory] = useState('Conferences')
  const [editImagePreview, setEditImagePreview] = useState('')
  const [editImageFile, setEditImageFile] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const editFileInputRef = useRef(null)

  const MAX_HEADING_LEN = 70
  const MAX_TEXT_LEN = 220

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const data = await getEvents()
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
      await deleteEvent(id)
      setEvents(prev => prev.filter(e => e._id !== id))
      setMsg(`Event "${title}" deleted!`)
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
      alert(`Failed to delete: ${err.response?.data?.message || err.message}`)
    } finally {
      setActionLoading('')
    }
  }

  const openEditModal = (event) => {
    setEditingEvent(event)
    setEditHeading(event.title || '')
    setEditText(event.description || '')
    setEditLink(event.eventLink || '')
    setEditDate(event.date || '22 Aug')
    setEditCategory(event.category || 'Conferences')
    setEditImagePreview(event.imageUrl)
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
    if (!editingEvent) return

    if (editHeading.trim().length > MAX_HEADING_LEN) {
      alert(`Heading cannot exceed ${MAX_HEADING_LEN} characters.`)
      return
    }
    if (editText.trim().length > MAX_TEXT_LEN) {
      alert(`Text description cannot exceed ${MAX_TEXT_LEN} characters.`)
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

      const updated = await updateEvent(editingEvent._id, {
        title: editHeading.trim(),
        heading: editHeading.trim(),
        description: editText.trim(),
        text: editText.trim(),
        eventLink: editLink.trim(),
        link: editLink.trim(),
        date: editDate.trim(),
        category: editCategory,
        imageUrl: finalImageUrl,
      })

      const finalItem = updated?._id ? updated : {
        ...editingEvent,
        title: editHeading.trim(),
        description: editText.trim(),
        eventLink: editLink.trim(),
        date: editDate.trim(),
        category: editCategory,
        imageUrl: finalImageUrl,
      }

      setEvents(prev => prev.map(ev => ev._id === editingEvent._id ? finalItem : ev))
      setEditingEvent(null)
      setMsg('Event updated successfully!')
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
      alert(`Failed to save event: ${err.response?.data?.message || err.message}`)
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
            All Events & Exhibitions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage events catalogue with orange boxes around all images, dates, headings, and categories
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
            onClick={() => onNavigate('add-event')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E25238] hover:bg-[#c9452e] text-white font-bold text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Event</span>
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
          <Loader2 className="w-8 h-8 animate-spin text-[#E25238] mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading events from database...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <h3 className="text-base font-bold text-gray-700">No Events Found</h3>
          <button
            onClick={() => onNavigate('add-event')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E25238] text-white font-bold text-xs shadow mt-4"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Event</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, idx) => {
            const dateParts = (event.date || '22 Aug').split(' ')
            const day = dateParts[0] || '22'
            const month = dateParts[1] || 'AUG'

            return (
              <div
                key={event._id || idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col justify-between p-4 space-y-4"
              >
                {/* Image Container with Orange Box Border & Date Badge */}
                <div className="relative rounded-xl overflow-hidden border-2 border-[#E25238] bg-slate-900 aspect-[4/3] p-1 flex items-center justify-center">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-contain rounded-lg" 
                  />
                  
                  {/* Orange Date Box Badge */}
                  <div className="absolute top-3 right-3 bg-[#E25238] text-white rounded-lg px-2.5 py-1 text-center shadow-md font-black text-xs leading-tight border border-white/20">
                    <div className="text-sm leading-none">{day}</div>
                    <div className="text-[9px] uppercase tracking-wider opacity-90">{month}</div>
                  </div>

                  {/* Category Pill on Image */}
                  {event.category && (
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                      {event.category}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <h3 className="text-base font-black text-[#1E293B] line-clamp-2 leading-snug">
                    {event.title}
                  </h3>

                  {event.description && (
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  )}

                  <div className="pt-2">
                    <a
                      href={event.eventLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E25238] hover:text-[#c9452e] truncate max-w-full"
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{event.eventLink}</span>
                    </a>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => openEditModal(event)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit (including Image & Details)"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(event._id, event.title)}
                      disabled={actionLoading === event._id}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-black text-[#1E293B] mb-5">
              Edit Event (Heading, Text, Date, Link & Image)
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              
              {/* Image Change with Orange Box Border */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Event Image (surrounded with orange box)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-900 border-2 border-[#E25238] shrink-0 p-1 flex items-center justify-center">
                    <img src={editImagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
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
                      <UploadCloud className="w-4 h-4 text-[#E25238]" />
                      <span>Change Image</span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-gray-700">Heading</label>
                  <span className="text-[10px] text-gray-400">{editHeading.length}/{MAX_HEADING_LEN}</span>
                </div>
                <input 
                  type="text" 
                  maxLength={MAX_HEADING_LEN}
                  value={editHeading}
                  onChange={(e) => setEditHeading(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-[#E25238] text-sm"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-gray-700">Text / Information</label>
                  <span className="text-[10px] text-gray-400">{editText.length}/{MAX_TEXT_LEN}</span>
                </div>
                <textarea 
                  rows={3}
                  maxLength={MAX_TEXT_LEN}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-[#E25238] text-sm"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Date Badge (e.g. 22 Aug)</label>
                  <input 
                    type="text" 
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-[#E25238] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-[#E25238] text-sm bg-white"
                  >
                    <option value="Conferences">Conferences</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Webinars">Webinars</option>
                    <option value="Training Programs">Training Programs</option>
                    <option value="Exhibitions">Exhibitions</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Redirect Link / URL</label>
                <input 
                  type="text" 
                  value={editLink}
                  onChange={(e) => setEditLink(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-[#E25238] text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#E25238] text-white text-sm font-bold shadow hover:bg-[#c9452e] disabled:opacity-50"
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
