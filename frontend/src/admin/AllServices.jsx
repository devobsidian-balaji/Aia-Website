import React, { useState, useEffect } from 'react'
import { Edit, Trash2, CheckCircle2, Eye, EyeOff, Loader2, RefreshCw, Plus, Clock, Tag } from 'lucide-react'
import { getServices, deleteService, updateService } from '../services/api'

export default function AllServices({ onNavigate }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')
  const [msg, setMsg] = useState('')
  
  // Edit Modal State
  const [editingService, setEditingService] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDuration, setEditDuration] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editHighlights, setEditHighlights] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const fetchServices = async () => {
    setLoading(true)
    try {
      const data = await getServices()
      setServices(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleToggleActive = async (service) => {
    setActionLoading(service._id)
    try {
      await updateService(service._id, { isActive: !service.isActive })
      setServices(services.map(s => s._id === service._id ? { ...s, isActive: !s.isActive } : s))
      setMsg(`Service "${service.title}" updated!`)
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading('')
    }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return
    setActionLoading(id)
    try {
      await deleteService(id)
      setServices(services.filter(s => s._id !== id))
      setMsg(`Service "${title}" deleted!`)
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading('')
    }
  }

  const openEditModal = (service) => {
    setEditingService(service)
    setEditTitle(service.title)
    setEditDuration(service.duration || '')
    setEditDescription(service.description)
    setEditHighlights(Array.isArray(service.highlights) ? service.highlights.join(', ') : service.highlights || '')
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    if (!editingService) return
    setIsSaving(true)
    try {
      const res = await updateService(editingService._id, {
        title: editTitle,
        duration: editDuration,
        description: editDescription,
        highlights: editHighlights
      })
      setServices(services.map(s => s._id === editingService._id ? res.data : s))
      setEditingService(null)
      setMsg('Service updated successfully!')
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 text-left space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
            All Services & Programs
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage, edit, or remove services displayed in the frontend homepage
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchServices}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={() => onNavigate('add-service')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>{msg}</span>
        </div>
      )}

      {/* Services List Grid */}
      {loading ? (
        <div className="p-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading services from database...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <h3 className="text-base font-bold text-gray-700">No Services Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1 mb-6">
            Click below to add your first service or program.
          </p>
          <button
            onClick={() => onNavigate('add-service')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Service</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service._id || index}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header & Status */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-[#1E293B] leading-snug">
                    {service.title}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 ${
                    service.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {service.isActive ? 'Active' : 'Hidden'}
                  </span>
                </div>

                {/* Duration Badge */}
                {service.duration && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-[#2563EB] text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.duration}</span>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {service.description}
                </p>

                {/* Highlights list */}
                {service.highlights && service.highlights.length > 0 && (
                  <div className="pt-2">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Key Highlights
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.highlights.map((hl, i) => (
                        <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                          • {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(service)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit Service"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleToggleActive(service)}
                    disabled={actionLoading === service._id}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                    title={service.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {service.isActive ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>

                <button
                  onClick={() => handleDelete(service._id, service.title)}
                  disabled={actionLoading === service._id}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                  title="Delete Service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-[#1E293B] mb-6">
              Edit Service / Academic Program
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
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
                <label className="block text-xs font-bold text-gray-700 mb-1">Duration</label>
                <input 
                  type="text" 
                  value={editDuration}
                  onChange={(e) => setEditDuration(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                <textarea 
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Highlights (comma separated)</label>
                <input 
                  type="text" 
                  value={editHighlights}
                  onChange={(e) => setEditHighlights(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
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
