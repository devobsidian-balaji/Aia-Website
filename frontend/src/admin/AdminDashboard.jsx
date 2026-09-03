import React, { useState, useEffect } from 'react'
import { Image as ImageIcon, Briefcase, Calendar, Sparkles, Layers, ArrowUpRight, Database, GraduationCap, FileText } from 'lucide-react'
import { getStats } from '../services/api'

export default function AdminDashboard({ onNavigate }) {
  const [stats, setStats] = useState({
    banners: 1,
    services: 3,
    events: 6,
    initiatives: 3,
    footprints: 3,
    campusEvents: 3,
    about: 1
  })

  useEffect(() => {
    getStats().then((data) => {
      if (data) setStats(prev => ({ ...prev, ...data }))
    }).catch(console.error)
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 text-left space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
            <Database className="w-3.5 h-3.5 text-blue-200" />
            <span>MongoDB Atlas Live</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            AIA Dynamic CMS Portal
          </h1>
          <p className="text-sm text-blue-100 max-w-xl leading-relaxed">
            Manage your frontend Hero Banners, Services, Events, Initiatives, and Campus Connect in real-time.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => onNavigate('add-event')}
            className="px-5 py-2.5 rounded-xl bg-[#E25238] hover:bg-[#c9452e] text-white font-bold text-xs shadow-md transition active:scale-95"
          >
            + Add Event
          </button>
          <button 
            onClick={() => onNavigate('add-banner')}
            className="px-5 py-2.5 rounded-xl bg-white text-[#1E3A8A] font-bold text-xs shadow-md hover:bg-blue-50 transition active:scale-95"
          >
            + Add Banner
          </button>
          <button 
            onClick={() => onNavigate('add-pillar-footprint')}
            className="px-5 py-2.5 rounded-xl bg-blue-900/60 hover:bg-blue-900 text-white font-bold text-xs border border-white/20 transition active:scale-95"
          >
            + Add Footprint
          </button>
        </div>
      </div>

      {/* Real Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Metric 1: Events */}
        <div 
          onClick={() => onNavigate('all-events')}
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#E25238] flex items-center justify-center group-hover:scale-110 transition">
              <Calendar className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#E25238] transition" />
          </div>
          <div className="text-3xl font-black text-[#1E293B]">{stats.events || 0}</div>
          <div className="text-xs font-semibold text-gray-500 mt-1">Events & Conferences</div>
        </div>

        {/* Metric 2: Banners */}
        <div 
          onClick={() => onNavigate('all-banners')}
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition">
              <ImageIcon className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition" />
          </div>
          <div className="text-3xl font-black text-[#1E293B]">{stats.banners || 0}</div>
          <div className="text-xs font-semibold text-gray-500 mt-1">Hero Banners</div>
        </div>

        {/* Metric 3: Services */}
        <div 
          onClick={() => onNavigate('all-services')}
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
              <Briefcase className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition" />
          </div>
          <div className="text-3xl font-black text-[#1E293B]">{stats.services || 0}</div>
          <div className="text-xs font-semibold text-gray-500 mt-1">Active Services / Programs</div>
        </div>

        {/* Metric 4: Initiatives */}
        <div 
          onClick={() => onNavigate('all-initiatives')}
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition">
              <Sparkles className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition" />
          </div>
          <div className="text-3xl font-black text-[#1E293B]">{stats.initiatives || 0}</div>
          <div className="text-xs font-semibold text-gray-500 mt-1">IAFSM Initiatives</div>
        </div>

        {/* Metric 5: Pillar Footprints */}
        <div 
          onClick={() => onNavigate('all-pillar-footprints')}
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition">
              <Layers className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition" />
          </div>
          <div className="text-3xl font-black text-[#1E293B]">{stats.footprints || 0}</div>
          <div className="text-xs font-semibold text-gray-500 mt-1">Pillar Footprints (Campus Connect)</div>
        </div>

        {/* Metric 6: Campus Events */}
        <div 
          onClick={() => onNavigate('all-campus-events')}
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition">
              <GraduationCap className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 transition" />
          </div>
          <div className="text-3xl font-black text-[#1E293B]">{stats.campusEvents || 0}</div>
          <div className="text-xs font-semibold text-gray-500 mt-1">Campus Connect Events</div>
        </div>

        {/* Metric 7: About AIA Information */}
        <div 
          onClick={() => onNavigate('all-about')}
          className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition">
              <FileText className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition" />
          </div>
          <div className="text-3xl font-black text-[#1E293B]">{stats.about || 0}</div>
          <div className="text-xs font-semibold text-gray-500 mt-1">About AIA Records</div>
        </div>

      </div>

    </div>
  )
}
