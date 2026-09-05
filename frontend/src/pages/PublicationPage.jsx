import React, { useState, useEffect } from 'react'
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  ExternalLink, 
  X, 
  Calendar, 
  Tag, 
  User, 
  BookOpen, 
  Layers, 
  Share2, 
  Check, 
  ArrowUpRight,
  Filter,
  Sparkles,
  MousePointer
} from 'lucide-react'
import { getPublications } from '../services/api'

export default function PublicationPage() {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeModalPub, setActiveModalPub] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchPublications()
  }, [])

  const fetchPublications = async () => {
    setLoading(true)
    try {
      const data = await getPublications()
      setPublications(data || [])
    } catch (err) {
      console.error('Error loading publications:', err)
    } finally {
      setLoading(false)
    }
  }

  // Categories list
  const categories = [
    'All',
    'Articles',
    'Technical Articles',
    'Case Studies',
    'Whitepapers',
    'Research',
    'Reports',
    'Process Automation'
  ]

  // Filter & search
  const filteredPublications = publications.filter((pub) => {
    const matchesCategory = selectedCategory === 'All' || pub.category === selectedCategory
    const matchesSearch = 
      (pub.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pub.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pub.category || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const openModal = (pub) => {
    setActiveModalPub(pub)
    setActiveImageIndex(0)
    setCopied(false)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setActiveModalPub(null)
    setActiveImageIndex(0)
    document.body.style.overflow = 'auto'
  }

  const handleCopyLink = (link) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link || window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModalPub) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeModalPub])

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen font-sans text-left">
      
      {/* 1. HERO BANNER (Image 1 & Image 2 design) */}
      <section className="relative w-full h-[480px] sm:h-[540px] lg:h-[620px] bg-[#070F1A] overflow-hidden flex items-center justify-center">
        {/* Background Image with Dark Contrast Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/publication-banner.jpg" 
            alt="Process control and automation in steel banner" 
            className="w-full h-full object-cover object-center brightness-75 contrast-110"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&h=900&fit=crop'
            }}
          />
          {/* Dual Gradient Overlays for High Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B131E] via-[#0B131E]/65 to-[#0B131E]/40"></div>
          <div className="absolute inset-0 bg-radial from-transparent via-[#0B131E]/40 to-[#0B131E]/80"></div>
        </div>

        {/* Hero Content matching Image 2 */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center space-y-6 pt-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FF8E7C] text-xs font-bold tracking-wider uppercase animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AIA Knowledge Hub & Publications</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl drop-shadow-lg">
            A seamless <span className="text-[#FF6B55]">blend</span> of process control and <span className="underline decoration-[#FF6B55] underline-offset-8">automation</span> in steel.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl font-normal leading-relaxed drop-shadow">
            Discover peer-reviewed articles, implementation case studies, whitepapers, and technical guides authored by industry pioneers and CEFC research fellows.
          </p>

          {/* Mouse Scroll Indicator matching Image 2 */}
          <div className="pt-6 sm:pt-10 flex flex-col items-center justify-center gap-2 text-white/60">
            <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5">
              <div className="w-1.5 h-2 bg-white/80 rounded-full animate-bounce"></div>
            </div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-white/50">Scroll to Explore</span>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER STRIP */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Real-time Search */}
          <div className="relative w-full md:w-80 lg:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search publications, topics, steel..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E25238] focus:bg-white transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-[#E25238] text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 3. PUBLICATIONS GRID (Image 3 Design) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#E25238] tracking-widest uppercase">
              Curated Insights
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B131E] tracking-tight mt-1">
              All Technical Publications
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Showing <span className="font-bold text-gray-800">{filteredPublications.length}</span> publications
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 animate-pulse space-y-4">
                <div className="w-full h-56 bg-slate-200 rounded-xl"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredPublications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-orange-50 text-[#E25238] flex items-center justify-center mx-auto">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Publications Found</h3>
            <p className="text-xs text-gray-500">
              No matching publications for "{searchQuery}" under "{selectedCategory}". Try changing filters or clear search.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-4 py-2 rounded-xl bg-[#E25238] text-white text-xs font-bold hover:bg-[#c9452e] transition shadow"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Responsive 3-Column Card Grid matching Image 3 */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {filteredPublications.map((pub) => {
              const mainImg = (pub.images && pub.images.length > 0) ? pub.images[0] : (pub.imageUrl || '/hero-engineer.png')
              const imageCount = pub.images ? pub.images.length : 1

              return (
                <div
                  key={pub._id}
                  onClick={() => openModal(pub)}
                  className="group bg-white rounded-2xl border border-gray-200/90 hover:border-[#E25238]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1"
                >
                  {/* Card Image Thumbnail Box */}
                  <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden">
                    <img
                      src={mainImg}
                      alt={pub.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'
                      }}
                    />

                    {/* Top Overlay Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md bg-[#0B131E]/80 backdrop-blur-md text-white text-[11px] font-bold tracking-wide border border-white/10">
                        {pub.category || 'Article'}
                      </span>
                      
                      {imageCount > 1 && (
                        <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[#0B131E] text-[10px] font-extrabold flex items-center gap-1 shadow-sm">
                          <Layers className="w-3 h-3 text-[#E25238]" />
                          <span>{imageCount} Images</span>
                        </span>
                      )}
                    </div>

                    {/* Hover Prompt Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5 drop-shadow">
                        <span>Click to view full publication</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#FF8E7C]" />
                      </span>
                    </div>
                  </div>

                  {/* Card Body matching Image 3 title style */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Publication Title with 2-line clamp */}
                      <h3 className="text-base sm:text-lg font-bold text-[#0B131E] group-hover:text-[#E25238] transition-colors leading-snug line-clamp-2">
                        {pub.title}
                      </h3>
                      
                      {/* Brief description snippet */}
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                        {pub.description}
                      </p>
                    </div>

                    {/* Card Footer Info */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{pub.date || 'Aug 2026'}</span>
                      </div>

                      <span className="font-bold text-[#E25238] group-hover:underline flex items-center gap-0.5">
                        <span>Read More</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </section>

      {/* 4. INTERACTIVE PUBLICATION DETAIL MODAL */}
      {activeModalPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/75 backdrop-blur-sm animate-fade-in">
          
          {/* Modal Card Backdrop click */}
          <div className="absolute inset-0" onClick={closeModal}></div>

          {/* Modal Dialog Content */}
          <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto border border-gray-200 flex flex-col text-left animate-scale-up">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-orange-100 text-[#E25238] font-bold text-xs">
                  {activeModalPub.category || 'Publication'}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  • {activeModalPub.date || 'Aug 2026'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Share Button */}
                <button
                  onClick={() => handleCopyLink(activeModalPub.link)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition"
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Image Gallery / Slider */}
              {activeModalPub.images && activeModalPub.images.length > 0 && (
                <div className="space-y-3">
                  {/* Main Active Large Image */}
                  <div className="relative w-full h-72 sm:h-96 bg-slate-950 rounded-2xl overflow-hidden border border-gray-200 shadow-inner flex items-center justify-center">
                    <img 
                      src={activeModalPub.images[activeImageIndex] || activeModalPub.images[0]} 
                      alt={`Publication view ${activeImageIndex + 1}`}
                      className="w-full h-full object-contain"
                    />

                    {/* Prev / Next Controls if multiple images */}
                    {activeModalPub.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setActiveImageIndex((prev) => (prev === 0 ? activeModalPub.images.length - 1 : prev - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition shadow"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setActiveImageIndex((prev) => (prev === activeModalPub.images.length - 1 ? 0 : prev + 1))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition shadow"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Strip (if multiple images) */}
                  {activeModalPub.images.length > 1 && (
                    <div className="flex items-center gap-2.5 overflow-x-auto py-1 scrollbar-none">
                      {activeModalPub.images.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                            activeImageIndex === idx ? 'border-[#E25238] shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Title */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B131E] leading-snug">
                {activeModalPub.title}
              </h2>

              {/* Author & Source strip */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 py-2 border-y border-gray-100">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#E25238]" />
                  <span className="font-semibold text-gray-700">{activeModalPub.author || 'Automation Industry Association'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>Published: {activeModalPub.date || 'Aug 2026'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-gray-400" />
                  <span>Category: {activeModalPub.category || 'General'}</span>
                </div>
              </div>

              {/* Full Description & Content */}
              <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-normal whitespace-pre-line">
                <p>{activeModalPub.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                {activeModalPub.link ? (
                  <a
                    href={activeModalPub.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#E25238] hover:bg-[#c9452e] text-white font-bold text-sm shadow-md hover:shadow-lg transition active:scale-95"
                  >
                    <span>Read Full Paper / Source Article</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-xs text-gray-400 italic">Full internal document archive available to members.</span>
                )}

                <button
                  onClick={closeModal}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
                >
                  Close Reader
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}
