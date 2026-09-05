import React, { useState, useRef } from 'react'
import { 
  Image as ImageIcon, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Trash2, 
  Link as LinkIcon, 
  Calendar, 
  Tag, 
  Type, 
  AlignLeft, 
  Plus, 
  Layers, 
  User, 
  Star,
  ExternalLink,
  BookOpen
} from 'lucide-react'
import { createPublication } from '../services/api'

export default function AddPublication({ onPublicationAdded, onNavigate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [category, setCategory] = useState('Articles')
  const [date, setDate] = useState('Aug 2026')
  const [author, setAuthor] = useState('Automation Industry Association')
  
  // Multiple images state: array of image strings (data URLs or remote URLs)
  const [images, setImages] = useState([])
  const [urlInput, setUrlInput] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const fileInputRef = useRef(null)

  const MAX_TITLE_LEN = 150

  const compressImageFile = (file, maxWidth = 1200, quality = 0.8) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          resolve(canvas.toDataURL('image/jpeg', quality))
        }
        img.onerror = () => resolve(event.target.result)
      }
      reader.onerror = () => resolve(null)
    })
  }

  const handleMultipleFiles = async (files) => {
    const fileList = Array.from(files)
    if (fileList.length === 0) return

    setLoading(true)
    const newImages = []
    for (const file of fileList) {
      if (file.type.startsWith('image/')) {
        const compressed = await compressImageFile(file)
        if (compressed) newImages.push(compressed)
      }
    }
    setLoading(false)

    if (newImages.length > 0) {
      setImages((prev) => [...prev, ...newImages])
      setErrorMsg('')
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      handleMultipleFiles(e.target.files)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      handleMultipleFiles(e.dataTransfer.files)
    }
  }

  const handleAddUrlImage = () => {
    if (urlInput.trim()) {
      setImages((prev) => [...prev, urlInput.trim()])
      setUrlInput('')
      setErrorMsg('')
    }
  }

  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove))
  }

  const handleMakeCover = (index) => {
    if (index === 0) return
    setImages((prev) => {
      const selected = prev[index]
      const remaining = prev.filter((_, idx) => idx !== index)
      return [selected, ...remaining]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setErrorMsg('Publication title is required.')
      return
    }
    if (title.trim().length > MAX_TITLE_LEN) {
      setErrorMsg(`Title cannot exceed ${MAX_TITLE_LEN} characters.`)
      return
    }
    if (!description.trim()) {
      setErrorMsg('Publication description is required.')
      return
    }
    if (images.length === 0) {
      setErrorMsg('Please upload or provide at least 1 image for the publication.')
      return
    }

    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        images,
        link: link.trim(),
        category,
        date: date.trim(),
        author: author.trim(),
        isActive: true,
      }

      await createPublication(payload)
      setSuccessMsg('Publication published successfully to website & database!')
      setTitle('')
      setDescription('')
      setLink('')
      setImages([])
      setUrlInput('')
      setDate('Aug 2026')
      setCategory('Articles')

      if (onPublicationAdded) onPublicationAdded()
    } catch (err) {
      console.error('Publication submit error:', err)
      const msg = err.response?.data?.message || err.message || 'Failed to save publication.'
      setErrorMsg(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full text-left space-y-6">
      
      {/* Header */}
      <div className="text-center pb-2">
        <h2 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
          Add New Publication
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Upload single or multiple images, title, external/PDF link, category, and comprehensive article description
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 1 or Multiple Images Upload Manager */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="bg-[#FFF4F0] px-4 py-3 rounded-xl border border-orange-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#E25238] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#1E293B]">
                    Publication Images
                  </h3>
                  <p className="text-[10px] text-gray-500">Upload 1 or multiple pictures</p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-[#E25238] text-white text-[11px] font-bold">
                {images.length} Selected
              </span>
            </div>

            {/* Dropzone for Multi-image Upload */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#E25238]/60 hover:border-[#E25238] hover:bg-orange-50/40 rounded-2xl p-6 text-center cursor-pointer transition relative min-h-[180px] flex flex-col items-center justify-center shadow-xs"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden"
              />

              <div className="w-12 h-12 rounded-full bg-orange-100 text-[#E25238] flex items-center justify-center mb-2 shadow-sm">
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-700 font-bold">
                Drop multiple images here, or <span className="text-[#E25238] underline">browse files</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Select one or several photos (JPG, PNG, WEBP)
              </p>
            </div>

            {/* URL Image Add Field */}
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Or paste direct image URL..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none"
              />
              <button
                type="button"
                onClick={handleAddUrlImage}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add URL</span>
              </button>
            </div>

            {/* Uploaded Images Gallery Preview */}
            {images.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-gray-600 font-bold">
                  <span>Selected Photos ({images.length})</span>
                  <span className="text-[10px] text-gray-400 font-normal">First photo is Cover image</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 max-h-60 overflow-y-auto p-1">
                  {images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className={`relative rounded-xl overflow-hidden aspect-video bg-slate-900 border-2 shadow-xs group ${
                        idx === 0 ? 'border-[#E25238] ring-2 ring-[#E25238]/20' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                      
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-[#E25238] text-white text-[9px] font-black flex items-center gap-0.5 shadow">
                          <Star className="w-2.5 h-2.5 fill-current" /> Cover
                        </span>
                      )}

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleMakeCover(idx)}
                            className="p-1 rounded bg-white text-gray-800 text-[10px] font-bold shadow hover:bg-yellow-400"
                            title="Make Cover"
                          >
                            <Star className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="p-1 rounded bg-red-600 text-white shadow hover:bg-red-700"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Preview Card */}
            {images.length > 0 && title && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Live Card Preview</span>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="h-32 bg-slate-800 relative">
                    <img src={images[0]} alt="Card preview" className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold">
                      {category}
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{title}</h4>
                    <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{description || 'Description preview...'}</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Title, Description, Link, Category, Date, Author */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Title */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-[#E25238]" />
                  <span>Publication Title (Strict max {MAX_TITLE_LEN} chars)</span>
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
                placeholder="e.g. A seamless blend of process control and automation in steel"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-sm text-gray-800 font-medium"
              />
            </div>

            {/* Description */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <AlignLeft className="w-3.5 h-3.5 text-[#E25238]" />
                  <span>Comprehensive Publication Content / Description</span>
                </label>
              </div>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail the technical overview, methodology, industry outcomes, process architectures, and research implications..."
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-sm text-gray-800 leading-relaxed font-normal"
              ></textarea>
            </div>

            {/* Link */}
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-[#E25238]" />
                <span>Redirect / Article / PDF Link URL</span>
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://aia-india.org/publications/steel-automation or https://example.com/paper.pdf"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-sm text-gray-800"
              />
            </div>

            {/* Grid: Category, Date, Author */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#E25238]" />
                  <span>Category</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-xs text-gray-800 bg-white font-medium"
                >
                  <option value="Articles">Articles</option>
                  <option value="Technical Articles">Technical Articles</option>
                  <option value="Case Studies">Case Studies</option>
                  <option value="Whitepapers">Whitepapers</option>
                  <option value="Research">Research</option>
                  <option value="Reports">Reports</option>
                  <option value="Process Automation">Process Automation</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#E25238]" />
                  <span>Publication Date</span>
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Aug 2026"
                  required
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-xs text-gray-800"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#E25238]" />
                  <span>Author / Body</span>
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="AIA Editorial Board"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#E25238] outline-none text-xs text-gray-800"
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

            {/* Submit Button & Navigation */}
            <div className="pt-3 flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-[#E25238] hover:bg-[#c9452e] text-white font-bold text-sm shadow-md transition disabled:opacity-50 active:scale-95 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    <span>Publish Publication</span>
                  </>
                )}
              </button>

              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('all-publications')}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                >
                  View All Publications
                </button>
              )}
            </div>

          </div>

        </form>
      </div>

    </div>
  )
}
