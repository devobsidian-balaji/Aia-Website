import React, { useState } from 'react'
import { CheckCircle2, AlertCircle, Loader2, Sparkles, Plus } from 'lucide-react'
import { createService } from '../services/api'

export default function AddService({ onServiceAdded, onNavigate }) {
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [description, setDescription] = useState('')
  const [highlights, setHighlights] = useState('')
  const [icon, setIcon] = useState('cpu')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      setErrorMsg('Please provide both a Program/Service Title and Description.')
      return
    }

    setLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      const payload = {
        title: title.trim(),
        duration: duration.trim(),
        description: description.trim(),
        highlights: highlights.trim(),
        icon: icon,
        isActive: true
      }

      await createService(payload)
      setSuccessMsg('Program / Service successfully added to database!')
      setTitle('')
      setDuration('')
      setDescription('')
      setHighlights('')

      if (onServiceAdded) onServiceAdded()
    } catch (err) {
      console.error(err)
      setErrorMsg(err.response?.data?.message || 'Failed to add service. Please check your database connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 text-left">
      
      {/* Form Card matching Image 4 */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10 space-y-6">
        
        {/* Title matching Image 4 in bold blue text */}
        <div className="text-center pb-2">
          <h2 className="text-2xl sm:text-[28px] font-black text-[#2563EB] tracking-tight">
            Add New Academic Program
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Program Title Input matching Image 4 */}
          <div>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Program Title"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-400/60 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-800 placeholder-gray-400 transition"
            />
          </div>

          {/* Program Duration Input matching Image 4 */}
          <div>
            <input 
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Program Duration"
              className="w-full px-4 py-3 rounded-xl border border-gray-400/60 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-800 placeholder-gray-400 transition"
            />
          </div>

          {/* Program Description Textarea matching Image 4 */}
          <div>
            <textarea 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Program Description"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-400/60 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-800 placeholder-gray-400 transition resize-y"
            ></textarea>
          </div>

          {/* Highlights (comma separated) Input matching Image 4 */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-gray-800">
              Highlights (comma separated)
            </label>
            <input 
              type="text"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              placeholder="e.g., Industry-focused curriculum, Experienced faculty, Flexible schedule"
              className="w-full px-4 py-3 rounded-xl border border-gray-400/60 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-800 placeholder-gray-400 transition"
            />
            <p className="text-[11px] text-gray-500 pl-1">
              Enter multiple highlights separated by commas.
            </p>
          </div>

          {/* Icon Selector (Optional enhancement) */}
          <div className="pt-1">
            <label className="block text-xs font-bold text-gray-800 mb-2">
              Service / Program Icon Category
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'cpu', label: 'Robotics & Hardware' },
                { id: 'target', label: 'Diagnostics & Strategy' },
                { id: 'layers', label: 'Cyber-Physical Testbed' },
                { id: 'sparkles', label: 'AI & Data Insights' }
              ].map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setIcon(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    icon === item.id 
                      ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Alerts */}
          {successMsg && (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Button matching Image 4 */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving to Database...</span>
                </>
              ) : (
                <span>Submit Program</span>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  )
}
