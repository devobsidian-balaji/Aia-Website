import React from 'react'

export default function AboutHero() {
  return (
    <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center text-white overflow-hidden font-sans">
      
      {/* High-res Photographic Background matching Image 1 */}
      <div 
        className="absolute inset-0 bg-cover bg-center select-none"
        style={{ backgroundImage: `url('/about-hero-team.png')` }}
      ></div>

      {/* Vignette Overlay: Dark at Top & Bottom, Clear in the Middle for Maximum Team Visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B131E]/85 via-transparent to-[#0B131E]/90 pointer-events-none"></div>

      {/* Side Edge Vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B131E]/50 via-transparent to-[#0B131E]/50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center pt-20 pb-12 flex flex-col items-center justify-between min-h-[580px] lg:min-h-[660px]">
        
        <div className="my-auto max-w-4xl space-y-4">
          {/* Main Headline matching Image 1 exact font weights and styling */}
          <h1 className="text-4xl sm:text-5xl lg:text-[62px] leading-[1.12] text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
            <span className="font-normal text-white">Shaping the </span>
            <span className="font-extrabold text-white">Future of India's</span>
            <br />
            <span className="font-extrabold text-white">Manufacturing </span>
            <span className="font-normal text-white">Industry</span>
          </h1>
        </div>

        {/* Bottom Center Mouse Scroll Indicator matching Image 1 */}
        <div className="mt-6 flex justify-center items-center">
          <a 
            href="#about-overview" 
            aria-label="Scroll down to About AIA Overview"
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
