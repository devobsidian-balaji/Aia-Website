import React, { useState, useEffect } from 'react'
import { getRoadmapItems } from '../services/api'

export default function VisionMissionObjectives() {
  const [items, setItems] = useState([
    {
      _id: '1',
      heading: 'Vision',
      description: 'To position India as a globally competitive hub for Smart Manufacturing by fostering collaborative innovation between automation leaders, MSMEs, and academia.',
      imageUrl: '/vision-robot.png',
    },
    {
      _id: '2',
      heading: 'Mission',
      description: 'Democratize Industry 4.0 through experiential learning, vendor-neutral testbeds, skill empowerment, and actionable digital transformation frameworks across Indian manufacturing verticals.',
      imageUrl: '/mission-fist.png',
    },
    {
      _id: '3',
      heading: 'Objectives',
      description: 'Enable measurable productivity gains, zero-defect manufacturing, energy reduction, and continuous workforce skilling in alignment with national manufacturing missions.',
      imageUrl: '/vision-robot.png',
    }
  ])

  useEffect(() => {
    let isMounted = true
    getRoadmapItems().then((data) => {
      if (isMounted && data && data.length > 0) {
        setItems(data.filter(d => d.isActive !== false))
      }
    }).catch(console.error)

    return () => { isMounted = false }
  }, [])

  return (
    <section id="vision-mission" className="py-24 bg-white font-sans relative overflow-hidden text-left">
      
      {/* Background Micro-Grid Texture */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-28 lg:space-y-36">
        
        {items.map((item, index) => {
          const isEven = index % 2 === 0 // Even index: Text Left, Image Right | Odd index: Image Left, Text Right
          const hasNext = index < items.length - 1

          return (
            <div 
              key={item._id || index}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-6xl mx-auto"
            >
              {/* Text Block */}
              <div className={`lg:col-span-6 space-y-6 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight">
                  {item.heading}
                </h2>

                <p className="text-sm sm:text-base text-black/70 leading-relaxed max-w-lg font-normal">
                  {item.description}
                </p>

                <div>
                  <a 
                    href="#footer"
                    className="inline-flex items-center justify-center px-6 py-2 rounded-xl border border-[#E37263] bg-white text-[#E37263] hover:bg-[#E37263] hover:text-white font-bold text-xs shadow-xs hover:shadow transition-all duration-200"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Image Block */}
              <div className={`lg:col-span-6 relative ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white group">
                  <img
                    src={item.imageUrl}
                    alt={item.heading}
                    className="w-full h-auto max-h-[340px] object-cover block rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* S-Curve Dotted Red Connector with Arrowmark */}
                {hasNext && (
                  isEven ? (
                    // Connector from Even (Right Image) to Odd (Left Image)
                    <div className="absolute -bottom-28 right-12 w-full max-w-[420px] h-32 pointer-events-none hidden lg:block overflow-visible z-20">
                      <svg className="w-full h-full" viewBox="0 0 350 120" fill="none">
                        <path 
                          d="M 280 10 C 280 80, 50 40, 20 115" 
                          stroke="#E37263" 
                          strokeWidth="2.5" 
                          strokeDasharray="6 6" 
                          strokeLinecap="round"
                        />
                        <polygon points="12,112 24,120 22,106" fill="#E37263" />
                      </svg>
                    </div>
                  ) : (
                    // Connector from Odd (Left Image) to Even (Right Image)
                    <div className="absolute -bottom-32 left-12 w-full max-w-[420px] h-36 pointer-events-none hidden lg:block overflow-visible z-20">
                      <svg className="w-full h-full" viewBox="0 0 350 130" fill="none">
                        <path 
                          d="M 20 10 C 20 90, 260 50, 310 125" 
                          stroke="#E37263" 
                          strokeWidth="2.5" 
                          strokeDasharray="6 6" 
                          strokeLinecap="round"
                        />
                        <polygon points="318,125 306,128 308,114" fill="#E37263" />
                      </svg>
                    </div>
                  )
                )}

              </div>

            </div>
          )
        })}

      </div>
    </section>
  )
}
