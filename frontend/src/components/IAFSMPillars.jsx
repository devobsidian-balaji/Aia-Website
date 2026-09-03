import React from 'react'

export default function IAFSMPillars() {
  return (
    <section id="pillars" className="py-24 bg-[#FAFCFF] font-sans relative overflow-hidden text-center select-none">
      
      {/* Background Micro-Grid Texture matching Image 1 */}
      <div 
        className="absolute inset-0 opacity-35 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      {/* Ambient soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-100/40 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading matching Image 1 */}
        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#1F2937] tracking-tight mb-16 sm:mb-20">
          Our Pillars
        </h2>

        {/* 4 Staggered Columns with exact Pillar Card Images matching Image 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
          
          {/* Column 1: Technology & Cloud Licensing, Education & Training */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-xl">
              <img 
                src="/Pillars/Technology and Cloud Licensing.png" 
                alt="Technology and Cloud Licensing" 
                className="w-full h-auto object-contain block" 
              />
            </div>
            <div className="rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-xl">
              <img 
                src="/Pillars/Education & Training.png" 
                alt="Education & Training" 
                className="w-full h-auto object-contain block" 
              />
            </div>
          </div>

          {/* Column 2 (Staggered offset): Research & Consulting, Simulation */}
          <div className="flex flex-col gap-6 lg:gap-8 lg:mt-10">
            <div className="rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-xl">
              <img 
                src="/Pillars/Research & Consulting.png" 
                alt="Research & Consulting" 
                className="w-full h-auto object-contain block" 
              />
            </div>
            <div className="rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-xl">
              <img 
                src="/Pillars/Simulation.png" 
                alt="Simulation" 
                className="w-full h-auto object-contain block" 
              />
            </div>
          </div>

          {/* Column 3: Skill Certification, Integration */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-xl">
              <img 
                src="/Pillars/Skill Certification.png" 
                alt="Skill Certification" 
                className="w-full h-auto object-contain block" 
              />
            </div>
            <div className="rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-xl">
              <img 
                src="/Pillars/Integration.png" 
                alt="Integration" 
                className="w-full h-auto object-contain block" 
              />
            </div>
          </div>

          {/* Column 4 (Staggered offset): Testing, Prototyping */}
          <div className="flex flex-col gap-6 lg:gap-8 lg:mt-10">
            <div className="rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-xl">
              <img 
                src="/Pillars/testing.png" 
                alt="Testing" 
                className="w-full h-auto object-contain block" 
              />
            </div>
            <div className="rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-sm hover:shadow-xl">
              <img 
                src="/Pillars/Prototyping.png" 
                alt="Prototyping" 
                className="w-full h-auto object-contain block" 
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
