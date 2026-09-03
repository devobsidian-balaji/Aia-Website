import React, { useState, useRef } from 'react'
import { Image as ImageIcon, UploadCloud, CheckCircle2, AlertCircle, Loader2, Trash2, Calendar, Award } from 'lucide-react'
import { createPastPresident } from '../services/api'

export default function AddPastPresident({ onPresidentAdded, onNavigate }) {
  const [name, setName] = useState('')
  const [term, setTerm] = useState('Past President 2016-2018')
  const [role, setRole] = useState('Past President')
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
    if (!name.trim() || !term.trim() || !description.trim()) {
      setErrorMsg('Please enter Name, Tenure/Term, and Career Message/Description.')
      return
    }
    if (!selectedFile && !previewUrl) {
      setErrorMsg('Please upload a president portrait photo.')
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
        name: name.trim(),
        term: term.trim(),
        role: role.trim(),
        description: description.trim(),
        imageUrl: base64Image,
        isActive: true
      }

      await createPastPresident(payload)
      setSuccessMsg('AIA Past President added successfully to database!')
      setName('')
      setTerm('Past President 2016-2018')
      setDescription('')
      setSelectedFile(null)
      setPreviewUrl('')

      if (onPresidentAdded) onPresidentAdded()
    } catch (err) {
      console.error(err)
      setErrorMsg(err.response?.data?.message || 'Failed to add past president.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full text-left space-y-6">
      
      {/* Title */}
      <div className="text-center pb-2">
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
          Add AIA Past President
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Add past leadership profiles displayed under the "AIA Past Presidents" carousel on the About Us page
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: President Portrait Upload */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#F4F8FF] px-4 py-3 rounded-xl border border-gray-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#E0EDFF] text-[#2563EB] flex items-center justify-center shrink-0 shadow-xs">
                <ImageIcon className="w-4 h-4" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#1E293B]">
                Upload Portrait (Circular Preview)
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
                <div className="relative flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#E37263]/50 shadow-md">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedFile(null)
                      setPreviewUrl('')
                    }}
                    className="absolute top-0 right-0 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 shadow"
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
                    Drop president photo here, or <span className="text-[#2563EB] underline">browse</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Square 1:1 or circular portrait
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Name, Tenure Dates, Message */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                President Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Mr. P Sivaram, Mr. Dilip Sawhney"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
              />
            </div>

            {/* Tenure / Term Dates */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Tenure / Term Range (Start - End)
              </label>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="e.g., Past President 2016-2018 or (2014-2016)"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
              />
            </div>

            {/* Message / Bio Description */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">
                Career Experience & Leadership Message
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mr. Sivaram has nearly forty years of work experience, most notably having served as the MD of B&R Industrial Automation India, for over 20 years..."
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
              ></textarea>
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
                    Saving President...
                  </span>
                ) : (
                  <span>Submit Past President</span>
                )}
              </button>
            </div>

          </div>

        </form>
      </div>

    </div>
  )
}
