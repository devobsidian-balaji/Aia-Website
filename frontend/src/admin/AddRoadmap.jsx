import React, { useState, useRef } from 'react'
import { Image as ImageIcon, UploadCloud, CheckCircle2, AlertCircle, Loader2, Compass, Trash2 } from 'lucide-react'
import { createRoadmapItem } from '../services/api'

export default function AddRoadmap({ onRoadmapAdded, onNavigate }) {
  const [heading, setHeading] = useState('')
  const [category, setCategory] = useState('Vision')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setErrorMsg('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!heading.trim() || !description.trim()) {
      setErrorMsg('Please enter both Heading and Description.')
      return
    }
    if (!selectedFile && !previewUrl) {
      setErrorMsg('Please upload a milestone / vision image.')
      return
    }

    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      let base64Image = previewUrl
      if (selectedFile) {
        base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(selectedFile)
          reader.onload = () => resolve(reader.result)
          reader.onerror = err => reject(err)
        })
      }

      const payload = {
        heading: heading.trim(),
        category: category,
        description: description.trim(),
        imageUrl: base64Image,
        isActive: true
      }

      await createRoadmapItem(payload)
      setSuccessMsg('Roadmap / Vision milestone successfully saved to database!')
      setHeading('')
      setDescription('')
      setSelectedFile(null)
      setPreviewUrl('')

      if (onRoadmapAdded) onRoadmapAdded()
    } catch (err) {
      console.error(err)
      setErrorMsg(err.response?.data?.message || 'Failed to save roadmap item.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 text-left space-y-6">
      
      <div className="text-center pb-2">
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
          Add Roadmap & Vision Milestone
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Add alternating Vision, Mission, and Objective milestones with curved arrow path connectors
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Milestone Category & Heading */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  if (!heading || ['Vision', 'Mission', 'Objectives'].includes(heading)) {
                    setHeading(e.target.value)
                  }
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold text-gray-800"
              >
                <option value="Vision">Vision</option>
                <option value="Mission">Mission</option>
                <option value="Objectives">Objectives</option>
                <option value="Milestone">Custom Milestone</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Milestone Heading
              </label>
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="e.g., Vision / Mission / Objectives"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Description / Actionable Strategy
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the long-term vision or strategic roadmap for this milestone..."
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
            ></textarea>
          </div>

          {/* Image Upload Box */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Milestone Photograph
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/20 rounded-2xl p-6 text-center cursor-pointer transition"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {previewUrl ? (
                <div className="relative rounded-xl overflow-hidden h-40 max-w-sm mx-auto bg-slate-100">
                  <img src={previewUrl} alt="Roadmap preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedFile(null)
                      setPreviewUrl('')
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2 py-2">
                  <UploadCloud className="w-8 h-8 text-blue-600 mx-auto" />
                  <p className="text-xs text-gray-600 font-semibold">
                    Click to browse or drop milestone image
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Feedback Alerts */}
          {successMsg && (
            <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-md transition disabled:opacity-50 active:scale-95"
            >
              {loading ? 'Saving...' : 'Submit Roadmap Milestone'}
            </button>
          </div>

        </form>
      </div>

    </div>
  )
}
