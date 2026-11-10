// import React, { useState, useEffect } from 'react'
// import { Image as ImageIcon, Briefcase, Calendar, Sparkles, Layers, ArrowUpRight, Database, GraduationCap, FileText, BookOpen, Inbox,
//   Bell,
//   Clock,
//   CheckCircle2,
//   MessageSquare,
//   RefreshCw, } from 'lucide-react'
// import { getStats } from '../services/api'

// export default function AdminDashboard({ onNavigate }) {
//   const [stats, setStats] = useState({
//     banners: 1,
//     services: 3,
//     events: 6,
//     initiatives: 3,
//     footprints: 3,
//     campusEvents: 3,
//     publications: 6,
//     about: 1
//   })

//   useEffect(() => {
//     getStats().then((data) => {
//       if (data) setStats(prev => ({ ...prev, ...data }))
//     }).catch(console.error)
//   }, [])

//   return (
//     <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 text-left space-y-8">
      
//       {/* Welcome Banner */}
//       <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//         <div className="space-y-2">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
//             <Database className="w-3.5 h-3.5 text-blue-200" />
//             <span>MongoDB Atlas Live</span>
//           </div>
//           <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
//             AIA Dynamic CMS Portal
//           </h1>
//           <p className="text-sm text-blue-100 max-w-xl leading-relaxed">
//             Manage your frontend Hero Banners, Services, Events, Initiatives, Campus Connect, and Publications in real-time.
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           <button 
//             onClick={() => onNavigate('add-publication')}
//             className="px-5 py-2.5 rounded-xl bg-[#E25238] hover:bg-[#c9452e] text-white font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-1.5"
//           >
//             <BookOpen className="w-3.5 h-3.5" />
//             <span>+ Add Publication</span>
//           </button>
//           <button 
//             onClick={() => onNavigate('add-event')}
//             className="px-5 py-2.5 rounded-xl bg-white text-[#1E3A8A] font-bold text-xs shadow-md hover:bg-blue-50 transition active:scale-95"
//           >
//             + Add Event
//           </button>
//           <button 
//             onClick={() => onNavigate('add-pillar-footprint')}
//             className="px-5 py-2.5 rounded-xl bg-blue-900/60 hover:bg-blue-900 text-white font-bold text-xs border border-white/20 transition active:scale-95"
//           >
//             + Add Footprint
//           </button>
//         </div>
//       </div>

//       {/* Real Metrics Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
//         {/* Metric 1: Events */}
//         <div 
//           onClick={() => onNavigate('all-events')}
//           className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#E25238] flex items-center justify-center group-hover:scale-110 transition">
//               <Calendar className="w-6 h-6" />
//             </div>
//             <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#E25238] transition" />
//           </div>
//           <div className="text-3xl font-black text-[#1E293B]">{stats.events || 0}</div>
//           <div className="text-xs font-semibold text-gray-500 mt-1">Events & Conferences</div>
//         </div>

//         {/* Metric 2: Banners */}
//         <div 
//           onClick={() => onNavigate('all-banners')}
//           className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition">
//               <ImageIcon className="w-6 h-6" />
//             </div>
//             <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition" />
//           </div>
//           <div className="text-3xl font-black text-[#1E293B]">{stats.banners || 0}</div>
//           <div className="text-xs font-semibold text-gray-500 mt-1">Hero Banners</div>
//         </div>

//         {/* Metric 3: Services */}
//         <div 
//           onClick={() => onNavigate('all-services')}
//           className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
//               <Briefcase className="w-6 h-6" />
//             </div>
//             <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition" />
//           </div>
//           <div className="text-3xl font-black text-[#1E293B]">{stats.services || 0}</div>
//           <div className="text-xs font-semibold text-gray-500 mt-1">Active Services / Programs</div>
//         </div>

//         {/* Metric 4: Initiatives */}
//         <div 
//           onClick={() => onNavigate('all-initiatives')}
//           className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition">
//               <Sparkles className="w-6 h-6" />
//             </div>
//             <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition" />
//           </div>
//           <div className="text-3xl font-black text-[#1E293B]">{stats.initiatives || 0}</div>
//           <div className="text-xs font-semibold text-gray-500 mt-1">IAFSM Initiatives</div>
//         </div>

//         {/* Metric 5: Pillar Footprints */}
//         <div 
//           onClick={() => onNavigate('all-pillar-footprints')}
//           className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition">
//               <Layers className="w-6 h-6" />
//             </div>
//             <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition" />
//           </div>
//           <div className="text-3xl font-black text-[#1E293B]">{stats.footprints || 0}</div>
//           <div className="text-xs font-semibold text-gray-500 mt-1">Pillar Footprints (Campus Connect)</div>
//         </div>

//         {/* Metric 6: Campus Events */}
//         <div 
//           onClick={() => onNavigate('all-campus-events')}
//           className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition">
//               <GraduationCap className="w-6 h-6" />
//             </div>
//             <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 transition" />
//           </div>
//           <div className="text-3xl font-black text-[#1E293B]">{stats.campusEvents || 0}</div>
//           <div className="text-xs font-semibold text-gray-500 mt-1">Campus Connect Events</div>
//         </div>

//         {/* Metric 7: Publications */}
//         <div 
//           onClick={() => onNavigate('all-publications')}
//           className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#E25238] flex items-center justify-center group-hover:scale-110 transition">
//               <BookOpen className="w-6 h-6" />
//             </div>
//             <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#E25238] transition" />
//           </div>
//           <div className="text-3xl font-black text-[#1E293B]">{stats.publications || 6}</div>
//           <div className="text-xs font-semibold text-gray-500 mt-1">Technical Publications</div>
//         </div>

//         {/* Metric 8: About AIA Information */}
//         <div 
//           onClick={() => onNavigate('all-about')}
//           className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:shadow-xl transition cursor-pointer group"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition">
//               <FileText className="w-6 h-6" />
//             </div>
//             <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition" />
//           </div>
//           <div className="text-3xl font-black text-[#1E293B]">{stats.about || 0}</div>
//           <div className="text-xs font-semibold text-gray-500 mt-1">About AIA Records</div>
//         </div>

//       </div>

//     </div>
//   )
// }



import React, { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Briefcase,
  Calendar,
  Sparkles,
  Layers,
  ArrowUpRight,
  Database,
  GraduationCap,
  FileText,
  BookOpen,
  Inbox,
  Bell,
  Clock,
  CheckCircle2,
  MessageSquare,
  RefreshCw,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { getStats } from "../services/api";
import { adminRequest } from "../services/adminAuth";

const initialCmsStats = {
  banners: 0,
  services: 0,
  events: 0,
  initiatives: 0,
  footprints: 0,
  campusEvents: 0,
  publications: 0,
  about: 0,
};

const initialSubmissionStats = {
  total: 0,
  new: 0,
  unread: 0,
  contacted: 0,
  closed: 0,
  pending: 0,
};

const normalizeStats = (response) => {
  return response?.data?.data ?? response?.data ?? response ?? {};
};

export default function AdminDashboard({ onNavigate }) {
  const [stats, setStats] = useState(initialCmsStats);
  const [submissionStats, setSubmissionStats] = useState(
    initialSubmissionStats
  );

  const [loading, setLoading] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(true);
  const [error, setError] = useState("");
  const [submissionError, setSubmissionError] = useState("");

  const fetchDashboardStats = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getStats();
      const data = normalizeStats(response);

      setStats((prev) => ({
        ...prev,
        ...data,
      }));
    } catch (err) {
      console.error("Dashboard CMS Stats Error:", err);
      setError("Unable to load CMS statistics.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissionStats = async () => {
    setSubmissionLoading(true);
    setSubmissionError("");

    try {
      const response = await adminRequest("/form-submissions/stats");
      const data = normalizeStats(response);

      setSubmissionStats({
        total: Number(data.total ?? 0),
        new: Number(data.new ?? 0),
        unread: Number(data.unread ?? 0),
        contacted: Number(data.contacted ?? 0),
        closed: Number(data.closed ?? 0),
        pending: Number(data.pending ?? 0),
      });
    } catch (err) {
      console.error("Form Submission Stats Error:", err);
      setSubmissionError("Unable to load form submission statistics.");
    } finally {
      setSubmissionLoading(false);
    }
  };

  const refreshDashboard = () => {
    fetchDashboardStats();
    fetchSubmissionStats();
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  const cmsCards = [
    {
      title: "Events & Conferences",
      value: stats.events,
      icon: Calendar,
      iconBg: "bg-orange-50",
      iconColor: "text-[#E25238]",
      tab: "all-events",
    },
    {
      title: "Hero Banners",
      value: stats.banners,
      icon: ImageIcon,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      tab: "all-banners",
    },
    {
      title: "Active Services / Programs",
      value: stats.services,
      icon: Briefcase,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      tab: "all-services",
    },
    {
      title: "IAFSM Initiatives",
      value: stats.initiatives,
      icon: Sparkles,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      tab: "all-initiatives",
    },
    {
      title: "Pillar Footprints",
      value: stats.footprints,
      icon: Layers,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      tab: "all-pillar-footprints",
    },
    {
      title: "Campus Connect Events",
      value: stats.campusEvents,
      icon: GraduationCap,
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
      tab: "all-campus-events",
    },
    {
      title: "Technical Publications",
      value: stats.publications,
      icon: BookOpen,
      iconBg: "bg-orange-50",
      iconColor: "text-[#E25238]",
      tab: "all-publications",
    },
    {
      title: "About AIA Records",
      value: stats.about,
      icon: FileText,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      tab: "all-about",
    },
  ];

  const submissionCards = [
    {
      title: "Total Submissions",
      value: submissionStats.total,
      icon: Inbox,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      description: "All received enquiries",
    },
    {
      title: "New Submissions",
      value: submissionStats.new,
      icon: Bell,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      description: "Newly submitted forms",
    },
    {
      title: "Unread Submissions",
      value: submissionStats.unread,
      icon: MessageSquare,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      description: "Not opened yet",
    },
    {
      title: "Contacted",
      value: submissionStats.contacted,
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      description: "Already contacted",
    },
    {
      title: "Closed",
      value: submissionStats.closed,
      icon: CheckCircle2,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      description: "Completed submissions",
    },
    {
      title: "Pending",
      value: submissionStats.pending,
      icon: Clock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      description: "Awaiting follow-up",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 text-left space-y-8">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-sm">
            <Database className="w-3.5 h-3.5 text-blue-200" />
            <span>MongoDB Atlas Live</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            AIA Dynamic CMS Portal
          </h1>

          <p className="text-sm text-blue-100 max-w-xl leading-relaxed">
            Manage your Hero Banners, Services, Events, Initiatives,
            Campus Connect, Publications and Form Submissions in real-time.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate("add-publication")}
            className="px-5 py-2.5 rounded-xl bg-[#E25238] hover:bg-[#c9452e] text-white font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>+ Add Publication</span>
          </button>

          <button
            onClick={() => onNavigate("add-event")}
            className="px-5 py-2.5 rounded-xl bg-white text-[#1E3A8A] font-bold text-xs shadow-md hover:bg-blue-50 transition active:scale-95"
          >
            + Add Event
          </button>

          <button
            onClick={() => onNavigate("add-pillar-footprint")}
            className="px-5 py-2.5 rounded-xl bg-blue-900/60 hover:bg-blue-900 text-white font-bold text-xs border border-white/20 transition active:scale-95"
          >
            + Add Footprint
          </button>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Dashboard Overview
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Live content statistics from your CMS.
          </p>
        </div>

        <button
          onClick={refreshDashboard}
          disabled={loading || submissionLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 text-xs font-bold hover:bg-gray-50 transition disabled:opacity-50"
        >
          <RefreshCw
            className={`w-4 h-4 ${
              loading || submissionLoading ? "animate-spin" : ""
            }`}
          />
          Refresh
        </button>
      </div>

      {/* CMS Statistics */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-800">
            Website CMS Statistics
          </h3>
          {error && (
            <span className="text-xs text-red-500">{error}</span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cmsCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                type="button"
                onClick={() => onNavigate(card.tab)}
                className="text-left bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center group-hover:scale-110 transition`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition" />
                </div>

                <div className="text-3xl font-black text-[#1E293B]">
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  ) : (
                    Number(card.value ?? 0)
                  )}
                </div>

                <div className="text-xs font-semibold text-gray-500 mt-1">
                  {card.title}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Form Submission Statistics */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Form Submissions Overview
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Monitor enquiries and track your submission follow-ups.
            </p>
          </div>

          <button
            onClick={() => onNavigate("form-submissions")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-800 text-white text-xs font-bold transition"
          >
            <Inbox className="w-4 h-4" />
            View All Submissions
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {submissionError && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {submissionError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {submissionCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                type="button"
                onClick={() => onNavigate("form-submissions")}
                className="text-left bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center group-hover:scale-110 transition`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition" />
                </div>

                <div className="text-3xl font-black text-[#1E293B]">
                  {submissionLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  ) : (
                    card.value
                  )}
                </div>

                <div className="text-xs font-bold text-gray-700 mt-1">
                  {card.title}
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {card.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

    </div>
  );
}
