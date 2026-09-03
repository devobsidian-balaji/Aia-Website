import React, { useState, useEffect } from 'react'
import { Trash2, CheckCircle2, Eye, EyeOff, Loader2, RefreshCw, Image as ImageIcon, Plus } from 'lucide-react'
import { getBanners, deleteBanner, updateBanner } from '../services/api'

export default function AllBanners({ onNavigate }) {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')
  const [msg, setMsg] = useState('')

  const fetchBanners = async () => {
    setLoading(true)
    try {
      const data = await getBanners()
      setBanners(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  const handleToggleActive = async (banner) => {
    setActionLoading(banner._id)
    try {
      await updateBanner(banner._id, { isActive: !banner.isActive })
      setBanners(banners.map(b => b._id === banner._id ? { ...b, isActive: !b.isActive } : b))
      setMsg(`Banner "${banner.name}" status updated!`)
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading('')
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete banner "${name}"?`)) return
    setActionLoading(id)
    try {
      await deleteBanner(id)
      setBanners(banners.filter(b => b._id !== id))
      setMsg(`Banner "${name}" deleted!`)
      setTimeout(() => setMsg(''), 3000)
    } catch (err) {
      console.error(err)
    } finally {
      setActionLoading('')
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 text-left space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight">
            All Home Hero Banners
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage all banner images currently rotating in the Hero section
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBanners}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition"
            title="Refresh Banners"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={() => onNavigate('add-banner')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Banner</span>
          </button>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>{msg}</span>
        </div>
      )}

      {/* Banners Grid */}
      {loading ? (
        <div className="p-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading banners from database...</p>
        </div>
      ) : banners.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-700">No Banners Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1 mb-6">
            You haven't uploaded any custom banners yet. The site is currently using the default theme hero image.
          </p>
          <button
            onClick={() => onNavigate('add-banner')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Banner</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <div 
              key={banner._id || index}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              {/* Image Thumbnail Container */}
              <div className="relative h-48 bg-slate-900 overflow-hidden group">
                <img 
                  src={banner.imageUrl} 
                  alt={banner.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-black/70 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                  #{index + 1}
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold backdrop-blur-xs ${
                    banner.isActive ? 'bg-green-500/90 text-white' : 'bg-gray-600/90 text-gray-200'
                  }`}>
                    {banner.isActive ? 'Active on Hero' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Banner Details */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#1E293B] truncate" title={banner.name}>
                    {banner.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Added on {new Date(banner.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleActive(banner)}
                    disabled={actionLoading === banner._id}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      banner.isActive 
                        ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' 
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    {banner.isActive ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Deactivate</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Activate</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(banner._id, banner.name)}
                    disabled={actionLoading === banner._id}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                    title="Delete Banner"
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
