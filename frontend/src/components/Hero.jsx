import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getBanners } from '../services/api'

export default function Hero() {
  const [banners, setBanners] = useState([
    { _id: 'default', name: 'Hero Smart Manufacturing Engineer', imageUrl: '/hero-engineer.png', isActive: true, isDefault: true }
  ])
  const [currentIndex, setCurrentIndex] = useState(0)
  const timerRef = useRef(null)

  // Fetch banners from MongoDB
  useEffect(() => {
    let isMounted = true
    getBanners().then((data) => {
      if (isMounted && data && data.length > 0) {
        const activeBanners = data.filter(b => b.isActive)
        if (activeBanners.length > 0) {
          const formatted = activeBanners.map(b => ({
            ...b,
            isDefault: b.imageUrl === '/hero-engineer.png' || (b.name && b.name.toLowerCase().includes('engineer'))
          }))
          setBanners(formatted)
          
          // Eager preloading
          formatted.forEach(b => {
            const img = new Image()
            img.src = b.imageUrl
          })
        }
      }
    }).catch(console.error)

    return () => { isMounted = false }
  }, [])

  // Auto-slide carousel every 6 seconds if multiple banners exist
  useEffect(() => {
    if (banners.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length)
      }, 6000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [banners.length])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  const currentBanner = banners[currentIndex] || banners[0]
  const isDefaultArchBanner = currentBanner?.isDefault

  return (
    <section 
      id="home" 
      className={`relative text-white overflow-hidden font-sans select-none ${
        isDefaultArchBanner ? 'bg-[#0B131E] pt-16 pb-20' : 'h-[540px] sm:h-[600px] lg:h-[650px] w-full flex items-center'
      }`}
    >
      
      {/* 1. Full Image Cover Mode for Newly Uploaded Custom Banners */}
      {!isDefaultArchBanner && (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <img 
            src={currentBanner.imageUrl} 
            alt={currentBanner.name || 'Hero Banner'} 
            className="w-full h-full object-cover object-center block"
          />
          {/* Subtle clean contrast backplate for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {/* 2. Star/Grid Dots Background for Default Theme */}
      {isDefaultArchBanner && (
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:32px_32px]"></div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <div className={`${isDefaultArchBanner ? 'lg:col-span-7' : 'lg:col-span-8'} space-y-6 text-left`}>
            
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] leading-[1.12] text-white tracking-tight drop-shadow-md">
              <span className="font-normal text-white">Accelerating </span>
              <span className="font-extrabold text-white">India’s</span>
              <br />
              <span className="font-extrabold text-white">Smart Manufacturing</span>
              <br />
              <span className="font-normal text-white">Revolution</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-200 max-w-lg leading-relaxed font-normal pt-2 drop-shadow-sm">
              Empowering manufacturers through AI, Industry 4.0, Industrial Automation, Digital Transformation and Collaborative Innovation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a 
                href="#build-factory"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white text-[#E25238] font-bold text-sm shadow-lg hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
              >
                Explore Smart Factory
              </a>

              <a 
                href="#services"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white font-medium text-sm border border-white transition-all hover:scale-105 active:scale-95"
              >
                Watch Video
              </a>
            </div>

          </div>

          {/* Right Column: Exact Default Seed Banner Layout with Right Arch & Doodle Annotations */}
          {isDefaultArchBanner ? (
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[440px]">
                
                {/* Top-Left Curved Arrow */}
                <svg 
                  className="absolute -top-8 -left-12 w-28 h-20 text-white pointer-events-none hidden sm:block z-20" 
                  viewBox="0 0 100 60" 
                  fill="none"
                >
                  <path d="M10 15 C 45 15, 75 25, 82 50" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M72 44 L 82 50 L 84 38" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                {/* Top-Right Sparkle */}
                <svg 
                  className="absolute -top-7 right-24 w-6 h-6 text-white pointer-events-none hidden sm:block z-20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2.2"
                >
                  <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M5.6 18.4L18.4 5.6" strokeLinecap="round" />
                </svg>

                {/* Top-Right Circle Doodle */}
                <div className="absolute -top-2 right-6 w-6 h-6 rounded-full border-2 border-white pointer-events-none hidden sm:block z-20"></div>

                {/* Arch Frame */}
                <div className="relative w-full rounded-t-[140px] rounded-b-2xl overflow-hidden drop-shadow-2xl bg-[#0F2338]">
                  <img 
                    src={currentBanner.imageUrl} 
                    alt={currentBanner.name} 
                    loading="eager"
                    decoding="sync"
                    className="w-full h-[460px] sm:h-[490px] object-cover object-bottom select-none"
                  />
                </div>

                {/* Right-side Curved Doodle Arrow */}
                <svg 
                  className="absolute top-1/2 -right-10 w-10 h-28 text-white pointer-events-none hidden sm:block z-20" 
                  viewBox="0 0 40 100" 
                  fill="none"
                >
                  <path d="M10 10 C 35 35, 35 65, 12 88" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M22 78 L 12 88 L 10 74" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                {/* Bottom-Left Circle Gauge Icon */}
                <div className="absolute -bottom-6 -left-6 pointer-events-none hidden sm:block z-20">
                  <svg className="w-14 h-14" viewBox="0 0 50 50" fill="none">
                    <circle cx="25" cy="25" r="16" stroke="white" strokeWidth="4.5" />
                    <path d="M25 9 A 16 16 0 0 1 41 25 L 25 25 Z" fill="#0B131E" />
                    <path d="M25 25 L 25 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Bottom-Right Small Circles */}
                <div className="absolute bottom-16 -right-5 w-3.5 h-3.5 rounded-full border-2 border-white pointer-events-none hidden sm:block z-20"></div>
                <div className="absolute -bottom-2 right-12 w-3.5 h-3.5 rounded-full border-2 border-white pointer-events-none hidden sm:block z-20"></div>

              </div>
            </div>
          ) : null}

        </div>

        {/* Carousel Navigation Indicator Dots & Arrow Controls */}
        {banners.length > 1 && (
          <div className="mt-8 flex items-center justify-between max-w-xs mx-auto bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === currentIndex ? 'w-6 bg-[#E25238]' : 'w-2 bg-white/50 hover:bg-white'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
