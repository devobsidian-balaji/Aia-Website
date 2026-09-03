import React from 'react'

const ecosystemCards = [
  {
    id: 'tech-providers',
    title: 'Technology',
    subtitle: 'Providers',
    iconType: 'tech',
    staggered: false
  },
  {
    id: 'system-integrators',
    title: 'System',
    subtitle: 'Integrators',
    iconType: 'code',
    staggered: true
  },
  {
    id: 'machine-builders',
    title: 'Machine',
    subtitle: 'Builders',
    iconType: 'grid',
    staggered: false
  },
  {
    id: 'software-companies',
    title: 'Software',
    subtitle: 'Companies',
    iconType: 'software',
    staggered: true
  }
]

export default function AutomationEcosystem() {
  const renderIcon = (type) => {
    switch (type) {
      case 'tech':
        return (
          <div className="w-12 h-12 rounded-full border border-[#E37263]/40 bg-[#FFF5F3] flex items-center justify-center text-[#E37263] shadow-sm">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
        )
      case 'code':
        return (
          <div className="w-12 h-12 rounded-full border border-[#E37263]/40 bg-[#FFF5F3] flex items-center justify-center text-[#E37263] shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
        )
      case 'grid':
        return (
          <div className="w-12 h-12 rounded-full border border-[#E37263]/40 bg-[#FFF5F3] flex items-center justify-center text-[#E37263] shadow-sm">
            <div className="grid grid-cols-2 gap-1">
              <span className="w-2 h-2 rounded-xs bg-[#E37263]"></span>
              <span className="w-2 h-2 rounded-xs bg-[#E37263]"></span>
              <span className="w-2 h-2 rounded-xs bg-[#E37263]"></span>
              <span className="w-2 h-2 rounded-xs bg-[#E37263]"></span>
            </div>
          </div>
        )
      case 'software':
        return (
          <div className="w-12 h-12 rounded-full border border-[#E37263]/40 bg-[#FFF5F3] flex items-center justify-center text-[#E37263] shadow-sm">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1 2-4z" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section id="ecosystem" className="py-24 bg-white font-sans relative overflow-hidden text-left">
      
      {/* Background Micro-Grid Texture */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      {/* Soft Pastel Gradient Glow on the Bottom-Left */}
      <div className="absolute -bottom-10 -left-10 w-[450px] h-[450px] bg-[#FDF0EE]/60 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header with Centered Heading and Far-Right Carousel Arrows */}
        <div className="relative flex items-center justify-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight text-center">
            Automation Ecosystem
          </h2>

          {/* Carousel Arrows on the far right matching Image 1 */}
          <div className="absolute right-0 flex items-center gap-3">
            <button 
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-[#E37263]/40 bg-white text-[#E37263] hover:bg-red-50 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 14L4 9l5-5" />
                <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v1.5" />
              </svg>
            </button>

            <button 
              aria-label="Next"
              className="w-10 h-10 rounded-full bg-[#E37263] hover:bg-[#d05f50] text-white flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 14l5-5-5-5" />
                <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5V16" />
              </svg>
            </button>
          </div>
        </div>

        {/* 4 Staggered Square Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto items-start">
          {ecosystemCards.map((card) => (
            <div
              key={card.id}
              className={`bg-white rounded-2xl p-7 border border-red-100/70 flex flex-col justify-between min-h-[220px] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer ${
                card.staggered ? 'lg:mt-10' : ''
              }`}
            >
              {/* Icon Container */}
              <div className="mb-6">
                {renderIcon(card.iconType)}
              </div>

              {/* Title */}
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F2937] leading-snug tracking-tight group-hover:text-[#E37263] transition-colors">
                  {card.title} <br />
                  {card.subtitle}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
