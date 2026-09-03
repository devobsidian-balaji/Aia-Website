import React from 'react'

const factoryCards = [
  {
    id: 'experience',
    title: 'Experience This',
    subtitle: 'Live',
    bg: 'bg-[#F2F2F2]',
    iconType: 'calendar',
    staggered: false
  },
  {
    id: 'demo',
    title: 'Book a',
    subtitle: 'Demonstration',
    bg: 'bg-[#ECECFD]',
    iconType: 'calendar-clock',
    staggered: true
  },
  {
    id: 'partner',
    title: 'Become a',
    subtitle: 'Partner',
    bg: 'bg-[#FDF0EE]',
    iconType: 'user',
    staggered: false
  },
  {
    id: 'starter-kit',
    title: 'Explore the Starter',
    subtitle: 'Kit',
    bg: 'bg-[#DDF3F4]',
    iconType: 'factory',
    staggered: true
  }
]

export default function BuildYourFactory() {
  const renderIcon = (type) => {
    switch (type) {
      case 'calendar':
        return (
          <div className="w-12 h-12 rounded-full border-2 border-[#1E4E8C] flex items-center justify-center bg-white shadow-sm">
            <svg className="w-5 h-5 text-[#1E4E8C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <circle cx="8" cy="14" r="1" fill="currentColor" />
              <circle cx="12" cy="14" r="1" fill="currentColor" />
              <circle cx="16" cy="14" r="1" fill="currentColor" />
            </svg>
          </div>
        )
      case 'calendar-clock':
        return (
          <div className="w-12 h-12 rounded-full border-2 border-[#1E4E8C] flex items-center justify-center bg-white shadow-sm">
            <svg className="w-5 h-5 text-[#1E4E8C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <circle cx="14" cy="14" r="4" fill="white" stroke="currentColor" strokeWidth="2" />
              <polyline points="14 12 14 14 15.5 15.5" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        )
      case 'user':
        return (
          <div className="w-12 h-12 rounded-full border-2 border-[#1E4E8C] flex items-center justify-center bg-white shadow-sm">
            <svg className="w-5 h-5 text-[#1E4E8C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        )
      case 'factory':
        return (
          <div className="w-12 h-12 rounded-full border-2 border-[#1E4E8C] flex items-center justify-center bg-white shadow-sm">
            <svg className="w-5 h-5 text-[#1E4E8C]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 20h20v2H2v-2zm2-2V9l5 3V9l5 3V5l6 4v9H4z" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section id="build-factory" className="py-24 bg-white font-sans relative overflow-hidden text-left">
      
      {/* Background Micro-Grid Texture */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Title matching Image 1 */}
        <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight text-center mb-20">
          Let’s Build Your Factory
        </h2>

        {/* 4 Staggered Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto items-start">
          {factoryCards.map((card) => (
            <div
              key={card.id}
              className={`${card.bg} rounded-2xl p-7 flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                card.staggered ? 'lg:mt-8' : ''
              }`}
            >
              {/* Icon Container */}
              <div className="mb-6">
                {renderIcon(card.iconType)}
              </div>

              {/* Title & Button Container */}
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F2937] leading-snug">
                  {card.title} <br />
                  {card.subtitle}
                </h3>

                <div>
                  <a
                    href="#footer"
                    className="inline-flex items-center justify-center px-6 py-2 rounded-xl border border-[#E37263] bg-white text-[#E37263] hover:bg-[#E37263] hover:text-white font-bold text-xs shadow-sm hover:shadow transition-all duration-200"
                  >
                    Join Now
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
