import React from 'react'
import { Calendar, Mic, Users, Handshake } from 'lucide-react'

export default function EventsMetrics() {
  const metrics = [
    {
      id: 1,
      number: '20+',
      label: 'Events Every Year',
      bgColor: 'bg-[#EAFBF7]',
      iconBg: 'bg-white',
      iconColor: 'text-[#0D9488]',
      icon: Calendar,
    },
    {
      id: 2,
      number: '15+',
      label: 'Industry Speakers',
      bgColor: 'bg-[#FFF1ED]',
      iconBg: 'bg-white',
      iconColor: 'text-[#E25238]',
      icon: Mic,
    },
    {
      id: 3,
      number: '5k+',
      label: 'Participants',
      bgColor: 'bg-[#F2EFFE]',
      iconBg: 'bg-white',
      iconColor: 'text-[#6366F1]',
      icon: Users,
    },
    {
      id: 4,
      number: '10+',
      label: 'Industry Partners',
      bgColor: 'bg-[#FFF5EB]',
      iconBg: 'bg-white',
      iconColor: 'text-[#EA580C]',
      icon: Handshake,
    },
  ]

  return (
    <section className="py-16 bg-white font-sans relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
         <div className="bg-white px-5 py-5 text-center sm:py-6 mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
          <h2 className="mb-8 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-[#1F2937] sm:mb-12 sm:text-5xl lg:mb-6 lg:text-[54px]">
            Events
          </h2>
            <p className="text-sm font-normal leading-[1.7] text-gray-600 sm:text-base sm:leading-[1.7] lg:text-lg lg:leading-[1.75] mb-5">
              doesn't run a separate events calendar of its own we show up through joint events, panel discussions, and dedicated pavilions at the expos that matter to this industry, plus a growing program of campus events connecting students to real careers in automation.
            </p>
          
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className={`${item.bgColor} rounded-2xl p-6 sm:p-7 border border-black/5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[160px] text-left group`}
              >
                {/* Circular Icon */}
                <div className={`w-10 h-10 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>

                {/* Number & Label matching Image 1 */}
                <div className="space-y-1 mt-4">
                  <div className="text-2xl sm:text-3xl font-black text-[#E25238] tracking-tight">
                    {item.number}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#1E293B] tracking-tight">
                    {item.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
