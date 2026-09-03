import React, { useState, useRef } from 'react'
import { Image as ImageIcon, UploadCloud, CheckCircle2, AlertCircle, Loader2, Trash2, Link as LinkIcon, Calendar, Tag, Type, AlignLeft } from 'lucide-react'
import { createEvent } from '../services/api'

export default function AddEvent({ onEventAdded, onNavigate }) {
  const [heading, setHeading] = useState('')
  const [text, setText] = useState('')
  const [link, setLink] = useState('')
  const [date, setDate] = useState('22 Aug')
  const [category, setCategory] = useState('Conferences')
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const fileInputRef = useRef(null)

  const MAX_HEADING_LEN = 70
  const MAX_TEXT_LEN = 220

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
    if (!heading.trim()) {
      setErrorMsg('Event heading is required.')
      return
    }
    if (heading.trim().length > MAX_HEADING_LEN) {
      setErrorMsg(`Heading cannot exceed ${MAX_HEADING_LEN} characters.`)
      return
    }
    if (!text.trim()) {
      setErrorMsg('Event text description is required.')
      return
    }
    if (text.trim().length > MAX_TEXT_LEN) {
      setErrorMsg(`Text description cannot exceed ${MAX_TEXT_LEN} characters.`)
      return
    }
    if (!link.trim()) {
      setErrorMsg('Please provide the redirect URL/link for the event.')
      return
    }
    if (!date.trim()) {
      setErrorMsg('Please provide the event date (e.g. 22 Aug).')
      return
    }
    if (!selectedFile && !previewUrl) {
      setErrorMsg('Please upload an event card poster/image.')
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
        title: heading.trim(),
        heading: heading.trim(),
        description: text.trim(),
        text: text.trim(),
        eventLink: link.trim(),
        link: link.trim(),
        date: date.trim(),
        category,
        imageUrl: base64Image,
        isActive: true
      }

      await createEvent(payload)
      setSuccessMsg('Event created and published to database successfully!')
      setHeading('')
      setText('')
      setLink('')
      setDate('22 Aug')
      setCategory('Conferences')
      setSelectedFile(null)
      setPreviewUrl('')

      if (onEventAdded) onEventAdded()
    } catch (err) {
      console.error(err)
      setErrorMsg(err.response?.data?.message || 'Failed to save event.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full text-left space-y-6">
      
      {/* Header */}
      <div className="text-center pb-2">
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
          Add New Event
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Upload event photo with orange border styling, heading, text, link, date, and category
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Event Poster Upload with Orange Box Frame */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#FFF4F0] px-4 py-3 rounded-xl border border-orange-200 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#E25238] text-white flex items-center justify-center shrink-0 shadow-xs">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#1E293B]">
                  Upload Event Image
                </h3>
                <p className="text-[10px] text-gray-500">Rendered with orange border & date badge</p>
              </div>
            </div>

            {/* Orange box surrounding the upload/preview area */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#E25238]/70 hover:border-[#E25238] hover:bg-orange-50/40 rounded-2xl p-5 text-center cursor-pointer transition relative min-h-[260px] flex items-center justify-center shadow-xs"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {previewUrl ? (
                <div className="relative w-full rounded-xl overflow-hidden shadow-xs h-64 bg-slate-900 border-2 border-[#E25238]">
                  <img src={previewUrl} alt="Event preview" className="w-full h-full object-contain" />
                  
                  {/* Orange Date Box Preview */}
                  <div className="absolute top-2.5 right-2.5 bg-[#E25238] text-white rounded-lg px-2.5 py-1 text-center shadow-md font-black text-xs leading-tight">
                    <div>{date.split(' ')[0] || '22'}</div>
                    <div className="text-[9px] uppercase tracking-wider opacity-90">{date.split(' ')[1] || 'AUG'}</div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedFile(null)
                      setPreviewUrl('')
                    }}
                    className="absolute top-2.5 left-2.5 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 shadow"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-[#E25238] flex items-center justify-center mx-auto shadow-sm">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-gray-700 font-semibold">
                    Drop event photo here, or <span className="text-[#E25238] underline">browse</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports JPG, PNG, WEBP — Square or 4:5 portrait
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Heading, Text, Link, Date, Category */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Heading with Strict Limit */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-[#E25238]" />
                  <span>Event Heading (Strict max {MAX_HEADING_LEN} chars)</span>
                </label>
                <span className={`text-[11px] font-bold ${heading.length > MAX_HEADING_LEN ? 'text-red-500' : 'text-gray-400'}`}>
                  {heading.length}/{MAX_HEADING_LEN}
                </span>
              </div>
              <input
                type="text"
                maxLength={MAX_HEADING_LEN}
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="e.g. Smart Automation for Manufacturing..."
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-sm text-gray-800"
              />
            </div>

            {/* Text / Description with Strict Limit */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <AlignLeft className="w-3.5 h-3.5 text-[#E25238]" />
                  <span>Event Text / Information (Strict max {MAX_TEXT_LEN} chars)</span>
                </label>
                <span className={`text-[11px] font-bold ${text.length > MAX_TEXT_LEN ? 'text-red-500' : 'text-gray-400'}`}>
                  {text.length}/{MAX_TEXT_LEN}
                </span>
              </div>
              <textarea
                rows={3}
                maxLength={MAX_TEXT_LEN}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of 'Make In India' movement."
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-sm text-gray-800 leading-relaxed"
              ></textarea>
            </div>

            {/* Link */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-[#E25238]" />
                <span>Redirect Link / URL (e.g. https://himtex.in)</span>
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://himtex.in or https://aia-india.org/events/registration"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-sm text-gray-800"
              />
            </div>

            {/* Date & Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E25238]" />
                  <span>Event Date Badge (e.g. 22 Aug)</span>
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="22 Aug or 02 Sep"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-sm text-gray-800"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#E25238]" />
                  <span>Event Category</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-sm text-gray-800 bg-white"
                >
                  <option value="Conferences">Conferences</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Webinars">Webinars</option>
                  <option value="Training Programs">Training Programs</option>
                  <option value="Exhibitions">Exhibitions</option>
                </select>
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
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#E25238] hover:bg-[#c9452e] text-white font-bold text-sm shadow-md transition disabled:opacity-50 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing Event...
                  </span>
                ) : (
                  <span>Submit Event</span>
                )}
              </button>
            </div>

          </div>

        </form>
      </div>

    </div>
  )
}
