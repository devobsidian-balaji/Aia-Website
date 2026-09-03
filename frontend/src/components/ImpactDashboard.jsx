import React from 'react'

const metrics = [
  {
    id: 'utilisation',
    label: 'Machine Utilisation',
    value: '84%',
    bg: 'bg-[#FFF3E8]',
    iconType: 'chart'
  },
  {
    id: 'health',
    label: 'Tool Health',
    value: 'Good',
    bg: 'bg-[#FFF0F0]',
    iconType: 'pulse'
  },
  {
    id: 'stops',
    label: 'Micro Stops Today',
    value: '118',
    bg: 'bg-[#EFEFFE]',
    iconType: 'chart'
  },
  {
    id: 'cycle',
    label: 'Average Cycle Time',
    value: '47 sec',
    bg: 'bg-[#E0F4FB]',
    iconType: 'timer'
  },
  {
    id: 'loss',
    label: 'Estimated Hidden Loss',
    value: '₹ 14.6',
    unit: 'Lakhs/year',
    bg: 'bg-[#F4F3F1]',
    iconType: 'rupee'
  },
  {
    id: 'oee',
    label: 'OEE',
    value: '71%',
    bg: 'bg-[#E2F7F0]',
    iconType: 'chart'
  }
]

export default function ImpactDashboard() {
  const renderIcon = (type) => {
    switch (type) {
      case 'chart':
        return (
          <div className="w-11 h-11 rounded-full border-2 border-[#0B5ED7] flex items-center justify-center bg-white/70 shadow-sm">
            <svg className="w-5 h-5 text-[#0B5ED7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="M18 9l-5 5-4-4-3 3" />
            </svg>
          </div>
        )
      case 'pulse':
        return (
          <div className="w-11 h-11 rounded-full border-2 border-[#0B5ED7] flex items-center justify-center bg-white/70 shadow-sm">
            <svg className="w-5 h-5 text-[#0B5ED7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
        )
      case 'timer':
        return (
          <div className="w-11 h-11 rounded-full border-2 border-[#0B5ED7] flex items-center justify-center bg-white/70 shadow-sm">
            <svg className="w-5 h-5 text-[#0B5ED7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="13" r="8" />
              <path d="M12 9v4l2 2" />
              <path d="M12 2v3" />
            </svg>
          </div>
        )
      case 'rupee':
        return (
          <div className="w-11 h-11 rounded-full border-2 border-[#0B5ED7] flex items-center justify-center bg-white/70 shadow-sm">
            <span className="text-[#0B5ED7] font-bold text-lg font-sans">₹</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section id="dashboard" className="py-20 bg-white font-sans relative overflow-hidden text-left">
      
      {/* Subtle Micro-Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading matching Image 2 */}
        <h2 className="text-4xl sm:text-5xl font-black text-[#1F2937] tracking-tight text-center mb-16">
          AIA Impact Dashboard
        </h2>

        {/* 6 Pastel Dashboard Tiles in 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {metrics.map((item) => (
            <div
              key={item.id}
              className={`${item.bg} rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between min-h-[220px]`}
            >
              {/* Icon Container */}
              <div className="mb-6">
                {renderIcon(item.iconType)}
              </div>

              {/* Metric Details */}
              <div>
                <div className="text-sm sm:text-[15px] font-medium text-[#1F2937] mb-1">
                  {item.label}
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-[#1F2937] tracking-tight">
                    {item.value}
                  </span>
                  {item.unit && (
                    <span className="text-lg sm:text-xl font-extrabold text-[#1F2937]">
                      {item.unit}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
