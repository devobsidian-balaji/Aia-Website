import React from 'react'

export default function GovernmentInitiative() {
  return (
    <section id="about" className="py-20 bg-white text-center font-sans relative overflow-hidden">
      
      {/* Subtle Micro-Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Main Section Heading */}
        <h2 className="text-4xl sm:text-5xl font-black text-[#1F2937] tracking-tight mb-16">
          Government Initiative
        </h2>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Samarth Udyog Portal Preview Screenshot */}
          <div className="lg:col-span-7">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              <img 
                src="/samarth-udyog.png" 
                alt="SAMARTH Udyog Bharat 4.0 - A Industry 4.0 Initiative of Ministry of HI & PE, Government of India" 
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>

          {/* Right Column: Information & Call to Action */}
          <div className="lg:col-span-5 text-left space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] leading-snug tracking-tight">
              Driving India’s Smart <br />
              Manufacturing Mission
            </h3>

            <p className="text-sm sm:text-base text-black/70 leading-relaxed max-w-md font-normal">
              Proud contributor to the Samarth Udyog Bharat 4.0 Initiative, enabling industries to adopt advanced manufacturing technologies and accelerate digital transformation.
            </p>

            <div className="pt-2">
              <a 
                href="#build-factory"
                className="inline-flex items-center justify-center px-7 py-2.5 rounded-xl border border-[#E37263] bg-white text-[#E37263] hover:bg-[#E37263] hover:text-white font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
              >
                Learn More
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
