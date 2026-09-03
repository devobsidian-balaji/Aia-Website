import React, { useState, useRef } from 'react'
import { Image as ImageIcon, UploadCloud, CheckCircle2, AlertCircle, Trash2, Loader2, ArrowRight } from 'lucide-react'
import { createBanner } from '../services/api'

export default function AddHomeBanner({ onBannerAdded, onNavigate }) {
  const [bannerName, setBannerName] = useState('')
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    processFiles(files)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files))
    }
  }

  const processFiles = (files) => {
    setErrorMsg('')
    setSuccessMsg('')
    
    // Max 3 images validation
    const totalFiles = [...selectedFiles, ...files].slice(0, 3)
    if (totalFiles.length > 3) {
      setErrorMsg('You can upload a maximum of 3 banner images at a time.')
    }
    
    setSelectedFiles(totalFiles)

    // Generate previews
    const previews = totalFiles.map(file => URL.createObjectURL(file))
    setPreviewUrls(previews)
  }

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    const newPreviews = previewUrls.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    setPreviewUrls(newPreviews)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedFiles.length === 0) {
      setErrorMsg('Please select at least 1 image to upload.')
      return
    }

    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      // Convert to Base64 for instant storage & fast retrieval
      const base64Promises = selectedFiles.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = error => reject(error)
        })
      })

      const base64Images = await Promise.all(base64Promises)

      const payload = {
        name: bannerName.trim() || 'Home Hero Banner',
        base64Images: base64Images
      }

      await createBanner(payload)
      setSuccessMsg(`Successfully uploaded ${selectedFiles.length} banner(s)!`)
      setBannerName('')
      setSelectedFiles([])
      setPreviewUrls([])

      if (onBannerAdded) onBannerAdded()
    } catch (err) {
      console.error(err)
      setErrorMsg(err.response?.data?.message || 'Failed to upload images. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      
      {/* Upload Card matching Image 2 design */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden text-left">
        
        {/* Card Header matching Image 2 */}
        <div className="bg-[#F4F8FF] px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E0EDFF] text-[#2563EB] flex items-center justify-center shadow-xs">
            <ImageIcon className="w-4 h-4" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#1E293B]">
            Upload Home Banner Images (Max 3)
          </h2>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Banner Name / Title Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Banner Title / Identifier
            </label>
            <input 
              type="text"
              value={bannerName}
              onChange={(e) => setBannerName(e.target.value)}
              placeholder="e.g., Smart Manufacturing Automation 2026"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-800 transition"
            />
          </div>

          {/* Drag & Drop Zone matching Image 2 */}
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/40 rounded-2xl p-10 text-center cursor-pointer transition duration-200"
          >
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
              className="hidden"
            />

            <div className="w-14 h-14 rounded-full bg-[#EBF3FF] text-[#2563EB] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <UploadCloud className="w-7 h-7" />
            </div>

            <p className="text-base text-gray-700 font-semibold mb-1">
              Drop your images here, or <span className="text-[#2563EB] underline font-bold">browse</span>
            </p>
            <p className="text-xs text-gray-400">
              Supports JPG, PNG, GIF — Max 3 images
            </p>
          </div>

          {/* Selected Previews */}
          {previewUrls.length > 0 && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Selected Images ({previewUrls.length}/3)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-xs h-36 bg-slate-50">
                    <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFile(idx)
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 transition shadow"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-1 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded">
                      Image {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alerts */}
          {successMsg && (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Upload Button matching Image 2 */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || selectedFiles.length === 0}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#2563EB] hover:text-white font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span>Uploading to Database...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Images</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  )
}
