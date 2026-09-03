import React, { useState } from 'react'

const sectorList = [
  {
    id: 'machinetools',
    title: 'Machine Tools',
    image: '/industry-machinetools.png',
  },
  {
    id: 'automotive',
    title: 'Automotive',
    image: '/industry-automotive.png',
  },
  {
    id: 'pharma',
    title: 'Pharma',
    image: '/industry-pharma.png',
  }
]

export default function IndustrySectors() {
  const [startIndex, setStartIndex] = useState(0)

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? sectorList.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev === sectorList.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="sectors" className="py-20 bg-white font-sans relative overflow-hidden">
      
      {/* Subtle Micro-Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header: Centered Heading with Top-Right Navigation Arrows */}
        <div className="relative flex items-center justify-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-black text-[#1F2937] tracking-tight text-center">
            Industry
          </h2>

          {/* Carousel Arrows on the far right */}
          <div className="absolute right-0 flex items-center gap-3">
            <button 
              onClick={handlePrev}
              aria-label="Previous Industry"
              className="w-10 h-10 rounded-full border border-[#E37263]/40 bg-white text-[#E37263] hover:bg-red-50 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 14L4 9l5-5" />
                <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v1.5" />
              </svg>
            </button>

            <button 
              onClick={handleNext}
              aria-label="Next Industry"
              className="w-10 h-10 rounded-full bg-[#E37263] hover:bg-[#d05f50] text-white flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 14l5-5-5-5" />
                <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5V16" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3 Industry Cards Grid matching Image 1 exactly without duplicate labels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {sectorList.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover select-none block rounded-2xl"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
