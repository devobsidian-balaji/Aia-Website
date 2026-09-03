import React from 'react'

export default function IAFSMHero() {
  return (
    <section id="iafsm-hero" className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] overflow-hidden font-sans select-none flex items-end">
      
      {/* 1. Full-Bleed Meeting Room Photograph matching Image 1 & 2 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/iafsm-hero.jpg')` }}
      ></div>

      {/* 2. Dark Vignette Gradient for High Contrast Typography */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none"></div>

      {/* 3. Hero Content matching Image 1 */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20 relative z-10 w-full text-center">
        
        {/* Headline matching Image 1 */}
        <h1 className="text-3xl sm:text-5xl lg:text-[62px] font-black text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] max-w-5xl mx-auto">
          Driving India’s <span className="text-white font-black">Smart</span><br className="hidden sm:inline" /> <span className="text-white font-black">Manufacturing</span> Revolution
        </h1>

        {/* Mouse Scroll Indicator matching Image 1 */}
        <div className="mt-8 sm:mt-10 flex justify-center items-center">
          <a 
            href="#pillars" 
            aria-label="Scroll to Pillars"
            className="group flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <div className="w-5 h-8 rounded-full border-2 border-white/80 group-hover:border-white flex items-start justify-center p-1.5 transition-colors shadow-md">
              <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
            </div>
          </a>
        </div>

      </div>

    </section>
  )
}
