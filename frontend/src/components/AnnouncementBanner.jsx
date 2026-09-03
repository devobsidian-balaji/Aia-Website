import React from 'react'
import { Calendar, MapPin, ArrowRight, Users, Bell } from 'lucide-react'

export default function AnnouncementBanner() {
  return (
    <section id="announcement" className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8 transition-all hover:shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Side: Real Conference / Event Photo */}
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden shadow-inner group">
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" 
              alt="National Smart Manufacturing Summit" 
              className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4D4D] text-white text-xs font-bold shadow-md">
                <Bell className="w-3.5 h-3.5" /> Flagship Summit 2026
              </span>
            </div>
          </div>

          {/* Right Side: Announcement Details */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">
              <span className="px-2.5 py-1 rounded-md bg-red-50 text-[#FF4D4D] border border-red-100">
                Conference & Expo
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <Calendar className="w-3.5 h-3.5 text-[#FF4D4D]" /> Oct 14 - 16, 2026
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-3.5 h-3.5 text-[#FF4D4D]" /> IIT Delhi CEFC & Pragati Maidan
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#0B1B2B] leading-tight">
              5th National Smart Manufacturing & Automation Summit 2026
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              Join 500+ automation pioneers, MSME visionaries, technology providers, and government leaders exploring AI in robotics, digital twins, and cyber-physical automation architectures.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-4">
              <a 
                href="#build-factory"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B1B2B] hover:bg-[#162C42] text-white font-semibold text-xs transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                <span>Register for Summit</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF4D4D]" />
              </a>
              <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-500" /> Over 400+ delegates confirmed
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
