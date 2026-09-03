import React, { useState, useEffect } from 'react'
import { getPillarFootprints } from '../services/api'

export default function ThreePillarsFootprint() {
  const [footprints, setFootprints] = useState([
    {
      _id: 'fp-1',
      title: 'Knowledge infrastructure',
      description: 'Comprising curriculum, exercises and teaching learning material.',
      imageUrl: '/Campusconnect/Knowledge Infrastructure.png',
      brochureUrl: '#',
      isHighlighted: false,
    },
    {
      _id: 'fp-2',
      title: 'Physical infrastructure',
      description: 'Comprising custom-fit workstation hardware and modern software toolkits.',
      imageUrl: '/Campusconnect/Physical Infrastructure.png',
      brochureUrl: '#',
      isHighlighted: true,
    },
    {
      _id: 'fp-3',
      title: 'Management infrastructure',
      description: 'Comprising project management and evaluations for continuous improvement.',
      imageUrl: '/Campusconnect/Management Infrastructure.png',
      brochureUrl: '#',
      isHighlighted: false,
    }
  ])

  useEffect(() => {
    let isMounted = true
    getPillarFootprints().then((data) => {
      if (isMounted && data && data.length > 0) {
        setFootprints(data.filter(f => f.isActive !== false))
      }
    }).catch(console.error)

    return () => { isMounted = false }
  }, [])

  return (
    <section id="three-pillars-footprint" className="py-24 bg-white font-sans relative overflow-hidden text-center select-none">
      
      {/* Micro-Grid Background Texture matching Image 1 */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading matching Image 1 */}
        <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight mb-16 sm:mb-20">
          Our 3 Pillars Footprint
        </h2>

        {/* 3-Column Responsive Cards Grid matching Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto items-stretch text-left">
          {footprints.map((item, idx) => (
            <div
              key={item._id || idx}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Card Top Photograph matching Image 1 */}
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                  />
                </div>

                {/* Card Title matching Image 1 */}
                <h3 className="text-lg sm:text-xl font-black text-[#1F2937] tracking-tight group-hover:text-[#E25238] transition-colors line-clamp-1">
                  {item.title}
                </h3>

                {/* Description matching Image 1 */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal min-h-[44px] line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Action Button: Highlighted card is coral filled, others are coral outlined */}
              <div className="pt-6">
                {item.isHighlighted ? (
                  <a
                    href={item.brochureUrl || '#'}
                    className="inline-flex items-center justify-center px-6 py-2 rounded-xl bg-[#E25238] hover:bg-[#c9452e] text-white font-bold text-xs tracking-wide shadow-md transition-all duration-200 active:scale-95"
                  >
                    View Brochure
                  </a>
                ) : (
                  <a
                    href={item.brochureUrl || '#'}
                    className="inline-flex items-center justify-center px-6 py-2 rounded-xl border border-[#E25238] bg-white text-[#E25238] hover:bg-[#E25238] hover:text-white font-bold text-xs tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-95"
                  >
                    View Brochure
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
