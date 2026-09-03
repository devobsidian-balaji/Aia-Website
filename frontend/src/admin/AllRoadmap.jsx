import React, { useState, useEffect } from 'react'
import { Trash2, CheckCircle2, Loader2, RefreshCw, Plus } from 'lucide-react'
import { getRoadmapItems, deleteRoadmapItem } from '../services/api'

export default function AllRoadmap({ onNavigate }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')
  const [msg, setMsg] = useState('')

  const fetchItems = async () => {
    setLoading(true)
    try {
      const data = await getRoadmapItems()
      setItems(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleDelete = async (id, heading) => {
    if (!window.confirm(`Are you sure you want to delete "${heading}"?`)) return
    setActionLoading(id)
    try {
      await deleteRoadmapItem(id)
      setItems(items.filter(i => i._id !== id))
      setMsg(`Milestone "${heading}" deleted!`)
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading('')
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 text-left space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
            Roadmap & Vision Milestones
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage the alternating milestones connected by dotted curves on the About Us page
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchItems}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={() => onNavigate('add-roadmap')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Milestone</span>
          </button>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>{msg}</span>
        </div>
      )}

      {loading ? (
        <div className="p-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading milestones from database...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <h3 className="text-base font-bold text-gray-700">No Milestones Found</h3>
          <button
            onClick={() => onNavigate('add-roadmap')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow mt-4"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Milestone</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={item._id || idx}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="relative h-44 bg-slate-900 overflow-hidden">
                <img src={item.imageUrl} alt={item.heading} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#E37263] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  Step #{idx + 1} ({item.category})
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-[#1E293B]">
                  {item.heading}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => handleDelete(item._id, item.heading)}
                    disabled={actionLoading === item._id}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
