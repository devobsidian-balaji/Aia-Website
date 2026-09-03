import React, { useState, useRef } from 'react'
import { Image as ImageIcon, UploadCloud, CheckCircle2, AlertCircle, Loader2, Trash2 } from 'lucide-react'
import { createAboutContent } from '../services/api'

export default function AddAboutContent({ onContentAdded, onNavigate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [stat1, setStat1] = useState('250+')
  const [stat2, setStat2] = useState('90%')
  const [stat3, setStat3] = useState('17+')
  
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
    if (!title.trim() || !description.trim()) {
      setErrorMsg('Please enter both Title and Description.')
      return
    }
    if (!selectedFile && !previewUrl) {
      setErrorMsg('Please select an image to upload.')
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
        stats: {
          number1: stat1.trim() || '250+',
          label1: 'Industry Members',
          number2: stat2.trim() || '90%',
          label2: 'Adoption Rate',
          number3: stat3.trim() || '17+',
          label3: 'Years of Excellence',
        },
        isFeatured: true
      }

      await createAboutContent(payload)
      setSuccessMsg('About AIA content published to database successfully!')
      setTitle('')
      setDescription('')
      setSelectedFile(null)
      setPreviewUrl('')

      if (onContentAdded) onContentAdded()
    } catch (err) {
      console.error(err)
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to save about content.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full text-left space-y-6">
      
      {/* Title */}
      <div className="text-center pb-2">
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
          Add About Content
        </h2>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Upload Box */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Box Header */}
            <div className="bg-[#F4F8FF] px-4 py-3 rounded-xl border border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#E0EDFF] text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs">
                <ImageIcon className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#1E293B]">
                Upload About Content Images (Max 1)
              </h3>
            </div>

            {/* Drag & Drop Area */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50/30 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition relative min-h-[220px] flex items-center justify-center"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {previewUrl ? (
                <div className="relative w-full rounded-xl overflow-hidden shadow-xs h-48 bg-slate-100">
                  <img src={previewUrl} alt="About preview" className="w-full h-full object-cover" />
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
                    Drop your images here, or <span className="text-[#2563EB] underline">browse</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports JPG, PNG, GIF — Max 1 images
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-lg bg-[#F1F5F9] text-gray-600 hover:bg-gray-200 text-xs font-semibold"
              >
                Upload Images
              </button>
            </div>

          </div>

          {/* Right Column: Title, Description, Stats & Submit Button */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="About AIA - Automation Industry Association India"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Description
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="AIA is the apex body in India spearheading the adoption of smart manufacturing, robotics, and cyber-physical testbeds..."
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
              ></textarea>
            </div>

            {/* 3 Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 truncate">
                  Number of Members
                </label>
                <input
                  type="text"
                  value={stat1}
                  onChange={(e) => setStat1(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-800 text-center"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 truncate">
                  Adoption Rate %
                </label>
                <input
                  type="text"
                  value={stat2}
                  onChange={(e) => setStat2(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-800 text-center"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 truncate">
                  Years of Excellence
                </label>
                <input
                  type="text"
                  value={stat3}
                  onChange={(e) => setStat3(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-800 text-center"
                />
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

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-md transition disabled:opacity-50 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing...
                  </span>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </div>

          </div>

        </form>
      </div>

    </div>
  )
}
