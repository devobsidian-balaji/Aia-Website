import React, { useState, useEffect } from 'react'
import { 
  BookOpen, 
  Trash2, 
  Edit3, 
  Eye, 
  Plus, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ExternalLink, 
  Layers, 
  Calendar, 
  User, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Star,
  RefreshCw
} from 'lucide-react'
import { getPublications, deletePublication, updatePublication } from '../services/api'

export default function AllPublications({ onNavigate }) {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  
  // Modals state
  const [viewModalPub, setViewModalPub] = useState(null)
  const [editModalPub, setEditModalPub] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  
  // Feedback
  const [feedback, setFeedback] = useState({ type: '', message: '' })
  const [actionLoading, setActionLoading] = useState(false)

  // Edit form state
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editLink, setEditLink] = useState('')
  const [editCategory, setEditCategory] = useState('Articles')
  const [editDate, setEditDate] = useState('')
  const [editAuthor, setEditAuthor] = useState('')
  const [editImages, setEditImages] = useState([])
  const [editUrlInput, setEditUrlInput] = useState('')

  useEffect(() => {
    fetchPublications()
  }, [])

  const fetchPublications = async () => {
    setLoading(true)
    try {
      const data = await getPublications()
      setPublications(data || [])
    } catch (err) {
      console.error(err)
      setFeedback({ type: 'error', message: 'Failed to load publications from server.' })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setActionLoading(true)
    try {
      await deletePublication(id)
      setPublications((prev) => prev.filter((p) => p._id !== id))
      setDeleteConfirmId(null)
      setFeedback({ type: 'success', message: 'Publication deleted successfully!' })
      setTimeout(() => setFeedback({ type: '', message: '' }), 4000)
    } catch (err) {
      console.error(err)
      setFeedback({ type: 'error', message: 'Failed to delete publication.' })
    } finally {
      setActionLoading(false)
    }
  }

  const handleToggleActive = async (pub) => {
    try {
      const newStatus = !pub.isActive
      await updatePublication(pub._id, { isActive: newStatus })
      setPublications((prev) =>
        prev.map((p) => (p._id === pub._id ? { ...p, isActive: newStatus } : p))
      )
    } catch (err) {
      console.error(err)
    }
  }

  const openEditModal = (pub) => {
    setEditModalPub(pub)
    setEditTitle(pub.title || '')
    setEditDescription(pub.description || '')
    setEditLink(pub.link || '')
    setEditCategory(pub.category || 'Articles')
    setEditDate(pub.date || '')
    setEditAuthor(pub.author || '')
    setEditImages(pub.images && pub.images.length > 0 ? [...pub.images] : (pub.imageUrl ? [pub.imageUrl] : []))
    setEditUrlInput('')
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    if (!editTitle.trim() || !editDescription.trim()) {
      alert('Title and description are required.')
      return
    }
    if (editImages.length === 0) {
      alert('At least 1 image is required.')
      return
    }

    setActionLoading(true)
    try {
      const updated = await updatePublication(editModalPub._id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        link: editLink.trim(),
        category: editCategory,
        date: editDate.trim(),
        author: editAuthor.trim(),
        images: editImages,
      })

      setPublications((prev) =>
        prev.map((p) => (p._id === editModalPub._id ? { ...p, ...updated } : p))
      )
      setEditModalPub(null)
      setFeedback({ type: 'success', message: 'Publication updated successfully!' })
      setTimeout(() => setFeedback({ type: '', message: '' }), 4000)
    } catch (err) {
      console.error(err)
      setFeedback({ type: 'error', message: 'Failed to update publication.' })
    } finally {
      setActionLoading(false)
    }
  }

  // Filtered publications
  const filtered = publications.filter((p) => {
    const matchesCat = activeFilter === 'All' || p.category === activeFilter
    const matchesSearch =
      (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="w-full text-left space-y-6">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
            All Publications
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage public articles, whitepapers, case studies, images, and live links
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchPublications}
            className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-gray-900 shadow-xs transition"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {onNavigate && (
            <button
              onClick={() => onNavigate('add-publication')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E25238] hover:bg-[#c9452e] text-white font-bold text-xs shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Publication</span>
            </button>
          )}
        </div>
      </div>

      {/* Feedback Toast */}
      {feedback.message && (
        <div className={`p-4 rounded-xl text-xs flex items-center gap-2 border ${
          feedback.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or topic..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-gray-200 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#E25238]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
          {['All', 'Articles', 'Technical Articles', 'Case Studies', 'Whitepapers', 'Research', 'Reports', 'Process Automation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                activeFilter === cat ? 'bg-[#1E293B] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Publications Table / List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#E25238]" />
            <p className="text-xs">Loading publications from MongoDB...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-3">
            <BookOpen className="w-10 h-10 mx-auto text-gray-300" />
            <p className="text-sm font-bold text-gray-700">No publications found</p>
            <p className="text-xs text-gray-400">Click "Add Publication" to create your first article.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-gray-200 text-gray-500 uppercase font-extrabold tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Publication</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Date & Author</th>
                  <th className="py-3.5 px-4">Photos</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((pub) => {
                  const mainImg = (pub.images && pub.images.length > 0) ? pub.images[0] : (pub.imageUrl || '/hero-engineer.png')
                  const imgCount = pub.images ? pub.images.length : 1

                  return (
                    <tr key={pub._id} className="hover:bg-slate-50/70 transition">
                      {/* Publication Info */}
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="flex items-center gap-3">
                          <img
                            src={mainImg}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200 bg-slate-900 shrink-0"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop' }}
                          />
                          <div className="truncate">
                            <h4 className="font-bold text-gray-900 truncate text-xs leading-snug">
                              {pub.title}
                            </h4>
                            <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                              {pub.description}
                            </p>
                            {pub.link && (
                              <a
                                href={pub.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-[#E25238] hover:underline inline-flex items-center gap-1 mt-0.5"
                              >
                                <ExternalLink className="w-2.5 h-2.5" />
                                <span className="truncate max-w-[200px]">{pub.link}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200 text-[#E25238] font-bold text-[11px]">
                          {pub.category || 'Article'}
                        </span>
                      </td>

                      {/* Date & Author */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="text-gray-800 font-medium">{pub.date || 'Aug 2026'}</div>
                        <div className="text-[10px] text-gray-400">{pub.author || 'AIA India'}</div>
                      </td>

                      {/* Images Count */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                          <Layers className="w-3 h-3 text-[#E25238]" />
                          <span>{imgCount} {imgCount === 1 ? 'img' : 'imgs'}</span>
                        </span>
                      </td>

                      {/* Status Toggle */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleActive(pub)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold transition border ${
                            pub.isActive
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : 'bg-gray-100 text-gray-600 border-gray-200'
                          }`}
                        >
                          {pub.isActive ? 'Active' : 'Hidden'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View */}
                          <button
                            onClick={() => setViewModalPub(pub)}
                            className="p-1.5 rounded-lg text-gray-500 hover:bg-slate-100 hover:text-gray-800 transition"
                            title="View Reader Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => openEditModal(pub)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                            title="Edit Publication"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => setDeleteConfirmId(pub._id)}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
                            title="Delete Publication"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-200 space-y-4 text-left">
            <h3 className="text-base font-bold text-gray-900">Delete Publication?</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Are you sure you want to delete this publication? This action will permanently remove it from MongoDB and public listing.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow"
              >
                {actionLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK VIEW READER MODAL */}
      {viewModalPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-200 text-left space-y-4 relative">
            <button
              onClick={() => setViewModalPub(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-2.5 py-1 rounded bg-orange-100 text-[#E25238] text-xs font-bold">
              {viewModalPub.category}
            </span>

            <h2 className="text-xl font-bold text-gray-900">{viewModalPub.title}</h2>

            {viewModalPub.images && viewModalPub.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {viewModalPub.images.map((img, idx) => (
                  <img key={idx} src={img} alt="" className="rounded-xl h-36 w-full object-cover bg-slate-900" />
                ))}
              </div>
            )}

            <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {viewModalPub.description}
            </p>

            {viewModalPub.link && (
              <a
                href={viewModalPub.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E25238] hover:underline"
              >
                <span>Read source document</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-200 text-left space-y-5 relative">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-black text-gray-900">Edit Publication</h3>
              <button
                onClick={() => setEditModalPub(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description / Content</label>
                <textarea
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none leading-relaxed"
                ></textarea>
              </div>

              {/* Link */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Link URL</label>
                <input
                  type="text"
                  value={editLink}
                  onChange={(e) => setEditLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none"
                />
              </div>

              {/* Category, Date, Author */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none bg-white"
                  >
                    <option value="Articles">Articles</option>
                    <option value="Technical Articles">Technical Articles</option>
                    <option value="Case Studies">Case Studies</option>
                    <option value="Whitepapers">Whitepapers</option>
                    <option value="Research">Research</option>
                    <option value="Reports">Reports</option>
                    <option value="Process Automation">Process Automation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none"
                  />
                </div>
              </div>

              {/* Images Manager in Edit */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-700">Manage Images ({editImages.length})</label>
                
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={editUrlInput}
                    onChange={(e) => setEditUrlInput(e.target.value)}
                    placeholder="Add image URL..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (editUrlInput.trim()) {
                        setEditImages((prev) => [...prev, editUrlInput.trim()])
                        setEditUrlInput('')
                      }
                    }}
                    className="px-3 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold"
                  >
                    Add
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-2">
                  {editImages.map((img, idx) => (
                    <div key={idx} className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 border border-gray-200 group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 px-1 rounded bg-[#E25238] text-white text-[8px] font-bold">
                          Cover
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => setEditImages((prev) => prev.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 p-1 rounded bg-red-600 text-white text-xs opacity-0 group-hover:opacity-100 transition shadow"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditModalPub(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2.5 rounded-xl bg-[#E25238] hover:bg-[#c9452e] text-white text-xs font-bold shadow transition"
                >
                  {actionLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}
