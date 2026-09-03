import React, { useState, useEffect } from 'react'
import { getEvents } from '../services/api'

export default function EventsCatalogue() {
  const [events, setEvents] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All Events')
  const [loading, setLoading] = useState(true)

  const categories = ['All Events', 'Conferences', 'Workshops', 'Webinars', 'Training Programs']

  const defaultEvents = [
    {
      _id: 'ev-1',
      title: 'Smart Automation for Manufacturing...',
      description: "AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of 'Make In India' movement.",
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop',
      eventLink: 'https://himtex.in',
      date: '22 Aug',
      category: 'Conferences',
    },
    {
      _id: 'ev-2',
      title: 'ANUTEC – International FoodTEC India Mumbai...',
      description: 'AIA is proud to voice messages across industry forums. Members and team from AIA helped host over a part of several such delegations.',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=1000&fit=crop',
      eventLink: 'https://himtex.in',
      date: '24 Aug',
      category: 'Conferences',
    },
    {
      _id: 'ev-3',
      title: 'Smart Automation for Manufacturing : Hosur',
      description: "AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of 'Make In India' movement.",
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop',
      eventLink: 'https://himtex.in',
      date: '02 Sep',
      category: 'Conferences',
    },
    {
      _id: 'ev-4',
      title: 'Smart Automation for Manufacturing...',
      description: "AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of 'Make In India' movement.",
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop',
      eventLink: 'https://himtex.in',
      date: '22 Aug',
      category: 'Conferences',
    },
    {
      _id: 'ev-5',
      title: 'ANUTEC – International FoodTEC India Mumbai...',
      description: 'AIA is proud to voice messages across industry forums. Members and team from AIA helped host over a part of several such delegations.',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=1000&fit=crop',
      eventLink: 'https://himtex.in',
      date: '24 Aug',
      category: 'Conferences',
    },
    {
      _id: 'ev-6',
      title: 'Smart Automation for Manufacturing : Hosur',
      description: "AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of 'Make In India' movement.",
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop',
      eventLink: 'https://himtex.in',
      date: '02 Sep',
      category: 'Conferences',
    }
  ]

  useEffect(() => {
    let isMounted = true
    getEvents().then((data) => {
      if (isMounted) {
        if (data && data.length > 0) {
          setEvents(data.filter(e => e.isActive !== false))
        } else {
          setEvents(defaultEvents)
        }
        setLoading(false)
      }
    }).catch((err) => {
      console.warn(err)
      if (isMounted) {
        setEvents(defaultEvents)
        setLoading(false)
      }
    })

    return () => { isMounted = false }
  }, [])

  const filteredEvents = selectedCategory === 'All Events'
    ? events
    : events.filter(e => (e.category || 'Conferences').toLowerCase() === selectedCategory.toLowerCase())

  return (
    <section id="events-catalogue" className="py-20 bg-white font-sans relative overflow-hidden text-left select-none">
      
      {/* Background Micro-Grid Texture */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header with Title on Left and Category Filter Pills on Right matching Image 1 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight">
            Events
          </h2>

          {/* Filter Pills matching Image 1 */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all active:scale-95 ${
                  selectedCategory === cat
                    ? 'bg-[#E25238] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#E25238] hover:text-[#E25238]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Responsive Cards Grid matching Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto items-stretch">
          {filteredEvents.map((item, idx) => {
            const dateParts = (item.date || '22 Aug').split(' ')
            const day = dateParts[0] || '22'
            const month = dateParts[1] || 'AUG'

            return (
              <div
                key={item._id || idx}
                className="flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Image Container with Orange Box Border & Orange Date Badge Box matching Image 1 */}
                  <div className="rounded-2xl border-2 border-[#E25238] p-1 bg-black/5 relative overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 select-none"
                      />
                    </div>

                    {/* Orange Date Box Badge matching Image 1 */}
                    <div className="absolute top-3 right-3 bg-[#E25238] text-white rounded-xl px-2.5 py-1 text-center shadow-md font-black text-xs leading-tight border border-white/20">
                      <div className="text-sm font-black leading-none">{day}</div>
                      <div className="text-[9px] uppercase tracking-wider opacity-90">{month}</div>
                    </div>
                  </div>

                  {/* Heading matching Image 1 */}
                  <h3 className="text-base sm:text-lg font-black text-[#1F2937] tracking-tight group-hover:text-[#E25238] transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  {/* Text Description matching Image 1 */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal min-h-[44px] line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* View Event Button matching Image 1 */}
                <div className="pt-2">
                  <a
                    href={item.eventLink || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2 rounded-xl border border-gray-300 bg-white text-[#1F2937] hover:border-[#E25238] hover:text-[#E25238] font-bold text-xs tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-95"
                  >
                    View Event
                  </a>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
