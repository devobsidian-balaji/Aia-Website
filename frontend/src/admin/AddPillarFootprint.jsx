import React, { useState, useRef } from 'react'
import { Image as ImageIcon, UploadCloud, CheckCircle2, AlertCircle, Loader2, Trash2, Link as LinkIcon, Sparkles } from 'lucide-react'
import { createPillarFootprint } from '../services/api'

export default function AddPillarFootprint({ onFootprintAdded, onNavigate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [brochureUrl, setBrochureUrl] = useState('#')
  const [isHighlighted, setIsHighlighted] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const fileInputRef = useRef(null)

  const MAX_TITLE_LEN = 60
  const MAX_DESC_LEN = 220

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setErrorMsg('')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setErrorMsg('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Strict validation
    if (!title.trim()) {
      setErrorMsg('Pillar title is required.')
      return
    }
    if (title.trim().length > MAX_TITLE_LEN) {
      setErrorMsg(`Title cannot exceed ${MAX_TITLE_LEN} characters.`)
      return
    }
    if (!description.trim()) {
      setErrorMsg('Pillar description is required.')
      return
    }
    if (description.trim().length > MAX_DESC_LEN) {
      setErrorMsg(`Description cannot exceed ${MAX_DESC_LEN} characters.`)
      return
    }
    if (!selectedFile && !previewUrl) {
      setErrorMsg('Please upload a pillar footprint card photo.')
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
        title: title.trim(),
        description: description.trim(),
        imageUrl: base64Image,
        brochureUrl: brochureUrl.trim() || '#',
        isHighlighted,
        isActive: true
      }

      await createPillarFootprint(payload)
      setSuccessMsg('Pillar Footprint created and aligned successfully!')
      setTitle('')
      setDescription('')
      setBrochureUrl('#')
      setIsHighlighted(false)
      setSelectedFile(null)
      setPreviewUrl('')

      if (onFootprintAdded) onFootprintAdded()
    } catch (err) {
      console.error(err)
      setErrorMsg(err.response?.data?.message || 'Failed to save pillar footprint.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full text-left space-y-6">
      
      {/* Header */}
      <div className="text-center pb-2">
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
          Add Pillar Footprint
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Add cards displayed under "Our 3 Pillars Footprint" on the Campus Connect page
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Upload with exact card aspect guidance */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#F4F8FF] px-4 py-3 rounded-xl border border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#E0EDFF] text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#1E293B]">
                  Pillar Image (Card Header)
                </h3>
                <p className="text-[10px] text-gray-400">Strict aspect ratio ~ 1:1 or 4:3</p>
              </div>
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/30 rounded-2xl p-6 text-center cursor-pointer transition relative min-h-[220px] flex items-center justify-center"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {previewUrl ? (
                <div className="relative w-full rounded-xl overflow-hidden shadow-xs h-56 bg-slate-100">
                  <img src={previewUrl} alt="Pillar preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedFile(null)
                      setPreviewUrl('')
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 shadow"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#EBF3FF] text-[#2563EB] flex items-center justify-center mx-auto shadow-sm">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-gray-700 font-semibold">
                    Drop photo here, or <span className="text-[#2563EB] underline">browse</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    JPG, PNG, WEBP (e.g. Knowledge, Physical, Management)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Title, Description, Link, Strict Constraints */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Title with Strict Limit */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-gray-800">
                  Pillar Title (Strict max {MAX_TITLE_LEN} chars)
                </label>
                <span className={`text-[11px] font-bold ${title.length > MAX_TITLE_LEN ? 'text-red-500' : 'text-gray-400'}`}>
                  {title.length}/{MAX_TITLE_LEN}
                </span>
              </div>
              <input
                type="text"
                maxLength={MAX_TITLE_LEN}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Knowledge infrastructure, Physical infrastructure"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
              />
            </div>

            {/* Description with Strict Limit */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-gray-800">
                  Description (Strict max {MAX_DESC_LEN} chars)
                </label>
                <span className={`text-[11px] font-bold ${description.length > MAX_DESC_LEN ? 'text-red-500' : 'text-gray-400'}`}>
                  {description.length}/{MAX_DESC_LEN}
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={MAX_DESC_LEN}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Comprising curriculum, exercises and teaching learning material."
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800 leading-relaxed"
              ></textarea>
            </div>

            {/* Brochure URL */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>Brochure Link / Action URL</span>
              </label>
              <input
                type="text"
                value={brochureUrl}
                onChange={(e) => setBrochureUrl(e.target.value)}
                placeholder="# or https://aia-india.org/brochure.pdf"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
              />
            </div>

            {/* Highlighted checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isHighlighted"
                checked={isHighlighted}
                onChange={(e) => setIsHighlighted(e.target.checked)}
                className="w-4 h-4 rounded text-red-500 border-gray-300 focus:ring-red-400 cursor-pointer"
              />
              <label htmlFor="isHighlighted" className="text-xs text-gray-700 font-semibold cursor-pointer">
                Highlight Card (Fills button with Coral Red like "Physical infrastructure" in design)
              </label>
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

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-md transition disabled:opacity-50 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing Footprint...
                  </span>
                ) : (
                  <span>Submit Pillar Footprint</span>
                )}
              </button>
            </div>

          </div>

        </form>
      </div>

    </div>
  )
}
