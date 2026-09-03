import React from 'react'

export default function WhatIsIAFSM() {
  return (
    <section id="what-is-iafsm" className="py-24 bg-white font-sans relative overflow-hidden text-left">
      
      {/* Background Micro-Grid Texture */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Grid matching Image 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Heading, Paragraph & CTA matching Image 4 */}
          <div className="lg:col-span-6 space-y-6">
            
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#1F2937] leading-[1.1] tracking-tight">
              What is IAFSM
            </h2>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
              IITD and AIA have launched the 'Foundation for Smart Manufacturing', a fully integrated smart manufacturing and learning facility for discrete and hybrid manufacturing segments such as automotive, machine tools, consumer durables and processed food, and others. The Government of India has approved this project as a Common Engineering Facility Centre (CEFC) under the Samarth Udyog Mission
            </p>

            <div className="pt-2">
              <a
                href="#events-section"
                className="inline-flex items-center justify-center px-7 py-3 rounded-xl border border-[#E37263] bg-white text-[#E37263] hover:bg-[#E37263] hover:text-white font-bold text-xs tracking-wide shadow-xs hover:shadow-md transition-all duration-200 active:scale-95"
              >
                Read Full Story
              </a>
            </div>

          </div>

          {/* Right Column: Conference Photo Card matching Image 4 */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white group">
              <img
                src="/iafsm-hero.jpg"
                alt="IITD-AIA Smart Advanced Manufacturing and Rapid Transformation Hub"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 select-none block rounded-3xl"
              />
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}
