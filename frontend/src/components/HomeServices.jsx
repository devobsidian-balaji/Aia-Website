import React, { useState, useEffect } from 'react'
import { Cpu, Target, Layers, Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import { getServices } from '../services/api'

export default function HomeServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    getServices().then(data => {
      if (isMounted) {
        setServices(data.filter(s => s.isActive))
        setLoading(false)
      }
    }).catch(() => setLoading(false))
    return () => { isMounted = false }
  }, [])

  const renderIcon = (type) => {
    switch (type) {
      case 'target':
        return <Target className="w-6 h-6 text-[#E25238]" />
      case 'layers':
        return <Layers className="w-6 h-6 text-[#E25238]" />
      case 'sparkles':
        return <Sparkles className="w-6 h-6 text-[#E25238]" />
      case 'cpu':
      default:
        return <Cpu className="w-6 h-6 text-[#E25238]" />
    }
  }

  if (services.length === 0 && !loading) return null

  return (
    <section id="services" className="py-24 bg-white font-sans relative overflow-hidden text-left">
      
      {/* Background Micro-Grid Texture */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-[#E25238] text-xs font-bold uppercase tracking-wider">
            <span>Specialized Offerings</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#1F2937] tracking-tight">
            Our Services & Programs
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
            Empowering manufacturers, MSMEs, and academic institutions with tailored Industry 4.0 adoption programs, skill certifications, and neutral CEFC testing.
          </p>
        </div>

        {/* Dynamic Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <div
              key={service._id || idx}
              className="rounded-3xl border border-red-100/80 bg-white p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Header & Icon */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF5F3] border border-[#F6C9C2] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300">
                    {renderIcon(service.icon)}
                  </div>

                  {service.duration && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>{service.duration}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-[#1F2937] leading-snug tracking-tight group-hover:text-[#E25238] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {service.description}
                </p>

                {/* Highlights */}
                {service.highlights && service.highlights.length > 0 && (
                  <div className="pt-2 border-t border-gray-100 space-y-2">
                    <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Program Highlights
                    </div>
                    <ul className="space-y-1.5">
                      {service.highlights.map((hl, hIdx) => (
                        <li key={hIdx} className="text-xs text-gray-700 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E25238] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Link */}
              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <a
                  href="#build-factory"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#E25238] group-hover:underline"
                >
                  <span>Explore Program</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#build-factory"
                  className="px-4 py-2 rounded-xl bg-white border border-[#E25238] text-[#E25238] hover:bg-[#E25238] hover:text-white text-xs font-bold transition shadow-xs"
                >
                  Enroll
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
