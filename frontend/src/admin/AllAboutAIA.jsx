import React, { useState, useEffect, useRef } from 'react'
import { 
  FileText, 
  Edit3, 
  Trash2, 
  Plus, 
  Sparkles, 
  UploadCloud, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Layers, 
  Image as ImageIcon,
  TrendingUp,
  Award
} from 'lucide-react'
import { getAboutContents, updateAboutContent, deleteAboutContent } from '../services/api'

export default function AllAboutAIA({ onNavigate }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  // Edit Modal State
  const [editingItem, setEditingItem] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editImageUrl, setEditImageUrl] = useState('')
  const [editStat1Num, setEditStat1Num] = useState('')
  const [editStat1Label, setEditStat1Label] = useState('')
  const [editStat2Num, setEditStat2Num] = useState('')
  const [editStat2Label, setEditStat2Label] = useState('')
  const [editStat3Num, setEditStat3Num] = useState('')
  const [editStat3Label, setEditStat3Label] = useState('')
  const editFileInputRef = useRef(null)

  const fetchItems = async () => {
    setLoading(true)
    try {
      const data = await getAboutContents()
      setItems(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
      setFeedback({ type: 'error', message: 'Failed to load About AIA contents.' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  // Open Edit Modal
  const handleOpenEdit = (item) => {
    setEditingItem(item)
    setEditTitle(item.title || '')
    setEditDescription(item.description || '')
    setEditImageUrl(item.imageUrl || '')
    setEditStat1Num(item.stats?.number1 || '250+')
    setEditStat1Label(item.stats?.label1 || 'Members')
    setEditStat2Num(item.stats?.number2 || '90%')
    setEditStat2Label(item.stats?.label2 || 'Industry Adoption')
    setEditStat3Num(item.stats?.number3 || '17+')
    setEditStat3Label(item.stats?.label3 || 'Years of Excellence')
  }

  // Handle Image Upload inside Edit Modal
  const handleEditImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setEditImageUrl(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Submit Update
  const handleSaveEdit = async (e) => {
    e.preventDefault()
    if (!editTitle.trim() || !editDescription.trim()) {
      alert('Title and description are required.')
      return
    }

    setActionLoading(true)
    try {
      const payload = {
        title: editTitle.trim(),
        description: editDescription.trim(),
        imageUrl: editImageUrl,
        stats: {
          number1: editStat1Num.trim() || '250+',
          label1: editStat1Label.trim() || 'Members',
          number2: editStat2Num.trim() || '90%',
          label2: editStat2Label.trim() || 'Industry Adoption',
          number3: editStat3Num.trim() || '17+',
          label3: editStat3Label.trim() || 'Years of Excellence',
        }
      }

      await updateAboutContent(editingItem._id, payload)
      setFeedback({ type: 'success', message: 'About AIA content updated successfully!' })
      setEditingItem(null)
      fetchItems()
      setTimeout(() => setFeedback({ type: '', message: '' }), 4000)
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || err.message || 'Failed to update about content.')
    } finally {
      setActionLoading(false)
    }
  }

  // Delete Action
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title || 'this entry'}"?`)) return

    setActionLoading(true)
    try {
      await deleteAboutContent(id)
      setFeedback({ type: 'success', message: 'About AIA content deleted successfully.' })
      setItems(prev => prev.filter(i => i._id !== id))
      setTimeout(() => setFeedback({ type: '', message: '' }), 4000)
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Failed to delete content.')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div className="w-full text-left space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#1E3A8A] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              About Us Management
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              {items.length} {items.length === 1 ? 'Record' : 'Records'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
            All About-AIA Information
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View, edit, and manage company mission statements, visuals, and key metrics shown on the About page.
          </p>
        </div>

        <button
          onClick={() => onNavigate && onNavigate('add-about')}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#E25238] hover:bg-[#c9452e] text-white font-bold text-xs shadow-md hover:shadow-lg transition active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add About Content</span>
        </button>
      </div>

      {/* Alert Feedback */}
      {feedback.message && (
        <div className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-medium ${
          feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Content Display */}
      {loading ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
          <Loader2 className="w-8 h-8 text-[#E25238] animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500 font-medium">Loading About-AIA records from database...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm space-y-4">
          <div className="w-16 h-16 bg-orange-50 text-[#E25238] rounded-2xl flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#1E293B]">No About AIA Content Found</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            There are currently no about information records created. Click the button below to add your first About AIA section.
          </p>
          <button
            onClick={() => onNavigate && onNavigate('add-about')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#E25238] hover:bg-[#c9452e] text-white font-bold text-xs shadow-md transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create First About Content</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {items.map((item, index) => (
            <div 
              key={item._id || index}
              className="bg-white rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col lg:flex-row items-stretch"
            >
              {/* Image Preview Box */}
              <div className="lg:w-80 w-full relative shrink-0 bg-slate-950/5 flex items-center justify-center min-h-[220px] p-3 border-b lg:border-b-0 lg:border-r border-gray-100">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full max-h-56 object-cover rounded-2xl shadow-inner border border-gray-200"
                  />
                ) : (
                  <div className="w-full h-48 rounded-2xl bg-gray-100 flex flex-col items-center justify-center text-gray-400 gap-2">
                    <ImageIcon className="w-10 h-10" />
                    <span className="text-xs font-semibold">No Image Provided</span>
                  </div>
                )}
                {item.isFeatured && (
                  <span className="absolute top-5 left-5 bg-blue-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow">
                    Featured
                  </span>
                )}
              </div>

              {/* Information Body */}
              <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl sm:text-2xl font-black text-[#0B131E] leading-snug tracking-tight">
                      {item.title}
                    </h2>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-[#0B131E] text-xs font-bold transition shadow-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(item._id, item.title)}
                        disabled={actionLoading}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition shadow-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Key Metrics Badges */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                    <span>Included Metric Highlights:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-base font-black text-[#E25238]">
                        {item.stats?.number1 || '250+'}
                      </div>
                      <div className="text-xs font-semibold text-slate-600">
                        {item.stats?.label1 || 'Members'}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-base font-black text-[#1E3A8A]">
                        {item.stats?.number2 || '90%'}
                      </div>
                      <div className="text-xs font-semibold text-slate-600">
                        {item.stats?.label2 || 'Industry Adoption'}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="text-base font-black text-emerald-600">
                        {item.stats?.number3 || '17+'}
                      </div>
                      <div className="text-xs font-semibold text-slate-600">
                        {item.stats?.label3 || 'Years of Excellence'}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#E25238] flex items-center justify-center">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1E293B]">Edit About AIA Content</h3>
                  <p className="text-xs text-gray-400">Update the details and preview changes live</p>
                </div>
              </div>

              <button
                onClick={() => setEditingItem(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEdit} className="space-y-5 text-left">
              
              {/* Title Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Heading / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="e.g. Automation Industry Association (AIA)"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25238] focus:border-transparent"
                />
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  About AIA Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Enter detailed description of AIA..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E25238] focus:border-transparent leading-relaxed"
                />
              </div>

              {/* Image Uploader & Preview */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Image Attachment
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {editImageUrl ? (
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border border-gray-200 shrink-0 relative group">
                      <img src={editImageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : null}

                  <div className="flex-1 w-full">
                    <input
                      type="file"
                      ref={editFileInputRef}
                      onChange={handleEditImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => editFileInputRef.current?.click()}
                      className="w-full py-3 px-4 border-2 border-dashed border-gray-300 hover:border-[#E25238] rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-gray-600 hover:text-[#E25238] transition bg-gray-50/50"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>{editImageUrl ? 'Replace Current Image' : 'Upload New Image'}</span>
                    </button>
                    <input
                      type="text"
                      value={editImageUrl}
                      onChange={(e) => setEditImageUrl(e.target.value)}
                      placeholder="Or enter direct image URL"
                      className="w-full mt-2 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Metric Highlights (3 Stats) */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                  Metric Statistics (3 Highlights)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500">Stat 1 (Number)</label>
                    <input
                      type="text"
                      value={editStat1Num}
                      onChange={(e) => setEditStat1Num(e.target.value)}
                      placeholder="250+"
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-[#E25238]"
                    />
                    <input
                      type="text"
                      value={editStat1Label}
                      onChange={(e) => setEditStat1Label(e.target.value)}
                      placeholder="Members"
                      className="w-full px-3 py-1 rounded-lg border border-gray-200 text-[11px] text-gray-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500">Stat 2 (Number)</label>
                    <input
                      type="text"
                      value={editStat2Num}
                      onChange={(e) => setEditStat2Num(e.target.value)}
                      placeholder="90%"
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-[#1E3A8A]"
                    />
                    <input
                      type="text"
                      value={editStat2Label}
                      onChange={(e) => setEditStat2Label(e.target.value)}
                      placeholder="Adoption"
                      className="w-full px-3 py-1 rounded-lg border border-gray-200 text-[11px] text-gray-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500">Stat 3 (Number)</label>
                    <input
                      type="text"
                      value={editStat3Num}
                      onChange={(e) => setEditStat3Num(e.target.value)}
                      placeholder="17+"
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-emerald-600"
                    />
                    <input
                      type="text"
                      value={editStat3Label}
                      onChange={(e) => setEditStat3Label(e.target.value)}
                      placeholder="Years"
                      className="w-full px-3 py-1 rounded-lg border border-gray-200 text-[11px] text-gray-600"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#E25238] hover:bg-[#c9452e] text-white font-bold text-xs shadow-md transition disabled:opacity-50"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>Save Changes</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  )
}
