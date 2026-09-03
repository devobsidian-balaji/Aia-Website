import React, { useState, useEffect } from 'react'
import { Edit, Trash2, CheckCircle2, Loader2, RefreshCw, Plus, Calendar, Award } from 'lucide-react'
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
    setEditingPresident(president)
    setEditName(president.name)
    setEditTerm(president.term)
    setEditDescription(president.description)
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    if (!editingPresident) return
    setIsSaving(true)
    try {
      const res = await updatePastPresident(editingPresident._id, {
        name: editName,
        term: editTerm,
        description: editDescription,
      })
      setPresidents(presidents.map(p => p._id === editingPresident._id ? res.data : p))
      setEditingPresident(null)
      setMsg('Past President updated successfully!')
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-black text-[#1E293B] mb-5">
              Edit Past AIA President
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Tenure / Term Range</label>
                <input 
                  type="text" 
                  value={editTerm}
                  onChange={(e) => setEditTerm(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description / Message</label>
                <textarea 
                  rows={4}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingPresident(null)}
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
