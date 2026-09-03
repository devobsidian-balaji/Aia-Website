import React, { useState, useRef } from 'react'
import { Image as ImageIcon, UploadCloud, CheckCircle2, AlertCircle, Loader2, Trash2, Sparkles, Link as LinkIcon } from 'lucide-react'
import { createInitiative } from '../services/api'

export default function AddInitiative({ onInitiativeAdded, onNavigate }) {
  const [title, setTitle] = useState('')
  const [information, setInformation] = useState('')
  const [link, setLink] = useState('#')
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
    if (!title.trim() || !information.trim()) {
      setErrorMsg('Please enter both Title and Information.')
      return
    }
    if (!selectedFile && !previewUrl) {
      setErrorMsg('Please upload an initiative image.')
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
        information: information.trim(),
        imageUrl: base64Image,
        link: link.trim() || '#',
        isActive: true
      }

      await createInitiative(payload)
      setSuccessMsg('Initiative successfully published to database!')
      setTitle('')
      setInformation('')
      setLink('#')
      setSelectedFile(null)
      setPreviewUrl('')

      if (onInitiativeAdded) onInitiativeAdded()
    } catch (err) {
      console.error(err)
      setErrorMsg(err.response?.data?.message || 'Failed to save initiative.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full text-left space-y-6">
      
      {/* Title */}
      <div className="text-center pb-2">
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
          Add New Initiative
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Add national and industry initiatives displayed under "Our Initiatives" on the IAFSM page
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Upload */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#F4F8FF] px-4 py-3 rounded-xl border border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#E0EDFF] text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs">
                <ImageIcon className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#1E293B]">
                Upload Initiative Photo (Max 1)
              </h3>
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
                  <img src={previewUrl} alt="Initiative preview" className="w-full h-full object-cover" />
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
                    Supports JPG, PNG, WEBP — Square or 4:3 format
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Title, Information, Link */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Initiative Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Government Initiatives, SAMARTH Udyog"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
              />
            </div>

            {/* Information */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Information / Description
              </label>
              <textarea
                rows={5}
                value={information}
                onChange={(e) => setInformation(e.target.value)}
                placeholder="AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of 'Make In India' movement."
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
              ></textarea>
            </div>

            {/* Optional URL */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>Redirect Link / URL (Optional)</span>
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="# or https://samarthudyog.in"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
              />
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
                    Publishing Initiative...
                  </span>
                ) : (
                  <span>Submit Initiative</span>
                )}
              </button>
            </div>

          </div>

        </form>
      </div>

    </div>
  )
}
