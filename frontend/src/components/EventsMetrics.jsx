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
