import React, { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import { getEvents } from '../services/api'

export default function EventsSection() {
  const [events, setEvents] = useState([
    {
      _id: 'ev-1',
      title: 'What If Your Factory Could Speak? - Digital Factory Experience Zone',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop',
      eventLink: 'https://himtex.in',
      description: 'Presented by AIA, Organised by HIMTEX Hyderabad Machine Tool Exhibition.',
    },
    {
      _id: 'ev-2',
      title: 'Small Stops. Big Losses. - Digital Factory Experience Zone',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=1000&fit=crop',
      eventLink: 'https://himtex.in',
      description: 'Presented by AIA, Organised by HIMTEX Hyderabad Machine Tool Exhibition.',
    }
  ])

  useEffect(() => {
    let isMounted = true
    getEvents().then((data) => {
      if (isMounted && data && data.length > 0) {
        setEvents(data.filter(e => e.isActive !== false))
      }
    }).catch(console.error)

    return () => { isMounted = false }
  }, [])

  return (
    <section id="events-section" className="py-24 bg-[#050B14] text-white font-sans relative overflow-hidden text-center select-none">
      
      {/* Background Star / Micro-Grid Dots */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white tracking-tight mb-16 sm:mb-20">
          Events
        </h2>

        {/* 2-Column Responsive Grid: Event 1 Left, Event 2 Right, Event 3 Down of Event 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">
          {events.map((event, idx) => (
            <div 
              key={event._id || idx}
              className="flex flex-col items-center justify-between space-y-6 group bg-white/5 p-4 sm:p-6 rounded-3xl border border-white/10 hover:border-[#E37263]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(227,114,99,0.2)]"
            >
              {/* Event Poster Frame */}
              <a
                href={event.eventLink}
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center aspect-[4/5] sm:aspect-[3/4] block overflow-hidden"
              >
                <img
                  src={event.imageUrl}
                  alt={event.title || 'AIA Event Poster'}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </a>

              {/* Title & View Website CTA */}
              <div className="space-y-4 w-full flex flex-col items-center">
                <h3 className="text-base sm:text-lg font-bold text-white line-clamp-2 px-2 text-center">
                  {event.title}
                </h3>

                <div>
                  <a
                    href={event.eventLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-white text-[#E37263] border border-[#E37263]/40 hover:bg-[#E37263] hover:text-white font-bold text-xs tracking-wide shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <span>View Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
