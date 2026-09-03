import React, { useState, useEffect } from 'react'
import { getCampusEvents } from '../services/api'

export default function CampusOurEvents() {
  const [events, setEvents] = useState([
    {
      _id: 'ce-1',
      title: 'Educating Events',
      imageUrl: '/Campusconnect/img_banner_header (2).png',
      link: '#',
    },
    {
      _id: 'ce-2',
      title: 'Prominent Industry Partners',
      imageUrl: '/Campusconnect/img_banner_header (3).png',
      link: '#',
    },
    {
      _id: 'ce-3',
      title: 'Informative Courses',
      imageUrl: '/Campusconnect/img_banner_header (4).png',
      link: '#',
    }
  ])

  useEffect(() => {
    let isMounted = true
    getCampusEvents().then((data) => {
      if (isMounted && data && data.length > 0) {
        setEvents(data.filter(e => e.isActive !== false))
      }
    }).catch(console.error)

    return () => { isMounted = false }
  }, [])

  return (
    <section id="our-events" className="py-24 bg-white font-sans relative overflow-hidden text-center select-none">
      
      {/* Micro-Grid Background Texture */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading matching Image 1 */}
        <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight mb-16 sm:mb-20">
          Our Events
        </h2>

        {/* 3-Column Cards Grid matching Image 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto items-start text-left">
          {events.map((event, idx) => (
            <div
              key={event._id || idx}
              className="flex flex-col space-y-4 group"
            >
              {/* Photo Frame matching Image 1 */}
              <div className="aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-md bg-slate-100 border border-gray-200/80 group-hover:shadow-xl transition-all duration-300">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                />
              </div>

              {/* Title matching Image 1 */}
              <h3 className="text-xl sm:text-2xl font-black text-[#1F2937] tracking-tight group-hover:text-[#E25238] transition-colors line-clamp-1">
                {event.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
