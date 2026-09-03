import React, { useState } from 'react'

const insightCards = [
  {
    id: 'monitoring',
    title: 'Real-time',
    subtitle: 'Monitoring',
    iconType: 'timer'
  },
  {
    id: 'ai-insights',
    title: 'AI Powered',
    subtitle: 'Insights',
    iconType: 'sparkle'
  },
  {
    id: 'alerts',
    title: 'Intelligent',
    subtitle: 'Alerts',
    iconType: 'alert',
    defaultActive: true
  },
  {
    id: 'improvement',
    title: 'Continues',
    subtitle: 'Improvement',
    iconType: 'barchart'
  }
]

export default function FactoryInsight() {
  const [activeCard, setActiveCard] = useState('alerts')

  const renderIcon = (type, isActive) => {
    switch (type) {
      case 'timer':
        return (
          <div className="w-8 h-8 flex items-center justify-center text-gray-400">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a1 1 0 0 1 1 1v1.055A8.002 8.002 0 0 1 12 20a8.002 8.002 0 0 1-1-15.945V3a1 1 0 0 1 1-1zm0 5a1 1 0 0 0-1 1v4a1 1 0 0 0 .293.707l2.5 2.5a1 1 0 0 0 1.414-1.414L13 11.586V8a1 1 0 0 0-1-1z" />
            </svg>
          </div>
        )
      case 'sparkle':
        return (
          <div className="w-8 h-8 rounded-lg bg-gray-400 flex items-center justify-center text-white">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
            </svg>
          </div>
        )
      case 'alert':
        return (
          <div className="relative w-8 h-8 rounded-lg bg-[#E25238] flex items-center justify-center text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-white absolute -top-1 -right-1 border border-[#E25238]"></span>
          </div>
        )
      case 'barchart':
        return (
          <div className="w-8 h-8 flex items-end gap-1 text-gray-400">
            <span className="w-2 h-4 bg-gray-400 rounded-xs"></span>
            <span className="w-2 h-6 bg-gray-400 rounded-xs"></span>
            <span className="w-2 h-3 bg-gray-400 rounded-xs"></span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section id="factory-insight" className="py-20 relative overflow-hidden font-sans bg-white text-left">
      
      {/* Background Micro-Grid Texture */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      {/* Warm Golden / Amber Gradient Glow on the Left (Figma: #FCCE88) */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-[550px] h-[550px] bg-[#FCCE88]/25 rounded-full blur-3xl pointer-events-none"></div>

      {/* Subtle Ambient Blue Gradient Glow on the Right (Figma: #0057B8 15%) */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#0057B8]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Top 2-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          
          {/* Left Column: Factory Conveyor Line Photo */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white group">
              <img 
                src="/factory-conveyor.png" 
                alt="Smart Factory Conveyor and Production Insight" 
                className="w-full h-auto object-cover select-none block rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Heading, Subtext & CTA Button */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] leading-[1.08] tracking-tight">
              Factory <br />
              Insight
            </h2>

            <p className="text-base sm:text-lg text-black/70 leading-relaxed max-w-md font-normal">
              Your selected profile suggests that the biggest opportunity is hidden production losses.
            </p>

            <div className="pt-2">
              <a 
                href="#build-factory"
                className="inline-flex items-center justify-center px-7 py-3 rounded-xl border border-[#1F2937] bg-white text-[#1F2937] hover:bg-[#1F2937] hover:text-white font-bold text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
              >
                Book Live Demo
              </a>
            </div>
          </div>

        </div>

        {/* Bottom 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {insightCards.map((card) => {
            const isActive = activeCard === card.id
            return (
              <div
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                className={`relative cursor-pointer rounded-2xl bg-white p-7 transition-all duration-300 flex flex-col justify-between min-h-[170px] ${
                  isActive
                    ? 'border border-red-100/60 shadow-xl -translate-y-1.5'
                    : 'border border-gray-200/80 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {/* Icon */}
                <div className="mb-4">
                  {renderIcon(card.iconType, isActive)}
                </div>

                {/* Card Title */}
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#1F2937] leading-snug">
                    {card.title} <br />
                    {card.subtitle}
                  </h3>
                </div>

                {/* Active Red/Coral Underline Bar (Figma: #F2713E) */}
                {isActive && (
                  <div className="absolute -bottom-1.5 left-4 right-4 h-1.5 bg-[#F2713E] rounded-full shadow-sm"></div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
