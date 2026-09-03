import React from 'react'

export default function CampusConnectHero() {
  return (
    <section id="campus-connect-hero" className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] overflow-hidden font-sans select-none flex items-end">
      
      {/* 1. Lab Engineer Background Photograph matching Image 1 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/Campusconnect/campus-connect-hero.jpg')` }}
      ></div>

      {/* 2. Dark Vignette Gradient for High Contrast Typography */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 pointer-events-none"></div>

      {/* 3. Hero Content matching Image 1 */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20 relative z-10 w-full text-center">
        
        {/* Headline matching Image 1 */}
        <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-black text-white tracking-tight leading-[1.15] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] max-w-5xl mx-auto">
          <span className="text-white font-black">AIA Campus Connect</span> program runs with<br className="hidden sm:inline" /> chosen <span className="text-white font-black">Engineering Institutions.</span>
        </h1>

        {/* Mouse Scroll Indicator */}
        <div className="mt-8 sm:mt-10 flex justify-center items-center">
          <a 
            href="#three-pillars-footprint" 
            aria-label="Scroll to Pillars Footprint"
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
