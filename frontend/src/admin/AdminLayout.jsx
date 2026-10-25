// // import React, { useState, useEffect } from "react";
// // import {
// //   Cpu,
// //   LayoutDashboard,
// //   Home as HomeIcon,
// //   Users,
// //   Image as ImageIcon,
// //   ChevronDown,
// //   ChevronUp,
// //   ChevronLeft,
// //   ChevronRight,
// //   LogOut,
// //   Globe,
// //   Menu,
// //   X,
// //   Calendar,
// //   Sparkles,
// //   Layers,
// //   Award,
// //   GraduationCap,
// //   BookOpen,
// // } from "lucide-react";
// // import AddHomeBanner from "./AddHomeBanner.jsx";
// // import AllBanners from "./AllBanners.jsx";
// // import AddService from "./AddService.jsx";
// // import AllServices from "./AllServices.jsx";
// // import AddAboutContent from "./AddAboutContent.jsx";
// // import AllAboutAIA from "./AllAboutAIA.jsx";
// // import AddRoadmap from "./AddRoadmap.jsx";
// // import AllRoadmap from "./AllRoadmap.jsx";
// // import AddCouncilMember from "./AddCouncilMember.jsx";
// // import AllCouncilMembers from "./AllCouncilMembers.jsx";
// // import AddPastPresident from "./AddPastPresident.jsx";
// // import AllPastPresidents from "./AllPastPresidents.jsx";
// // import AddEvent from "./AddEvent.jsx";
// // import AllEvents from "./AllEvents.jsx";
// // import AddInitiative from "./AddInitiative.jsx";
// // import AllInitiatives from "./AllInitiatives.jsx";
// // import AddPillarFootprint from "./AddPillarFootprint.jsx";
// // import AllPillarFootprints from "./AllPillarFootprints.jsx";
// // import AddCampusEvent from "./AddCampusEvent.jsx";
// // import AllCampusEvents from "./AllCampusEvents.jsx";
// // import AddPublication from "./AddPublication.jsx";
// // import AllPublications from "./AllPublications.jsx";
// // import AdminDashboard from "./AdminDashboard.jsx";
// // import AddWhatAIADoes from "./AddWhatAIADoes.jsx";
// // import AllWhatAIADoes from "./AllWhatAIADoes.jsx";
// // import { useNavigate, useParams, Link } from "react-router-dom";
// // import ManageSliderCMS from "./ManageSliderCMS.jsx";
// // import ManageWhyJoin from "./ManageWhyJoin.jsx";
// // import ManageHomeFeatures from "./ManageHomeFeatures.jsx";

// // export default function AdminLayout({ onExitAdmin }) {
// //   const navigate = useNavigate();
// //   const { tab: urlTab } = useParams();
// //   const [currentTab, setCurrentTab] = useState(urlTab || "dashboard");

// //   useEffect(() => {
// //     if (urlTab) {
// //       setCurrentTab(urlTab);
// //       if (
// //         [
// //           "add-banner",
// //           "all-banners",
// //           "add-service",
// //           "all-services",
// //           "add-what-aia",
// //           "all-what-aia",
// //           "home-features-cms",
// //         ].includes(urlTab)
// //       )
// //         setHomeMenuOpen(true);
// //       if (
// //         [
// //           "add-about",
// //           "all-about",
// //           "all-about-aia",
// //           "add-roadmap",
// //           "all-roadmap",
// //           "add-council",
// //           "all-council",
// //           "add-past-president",
// //           "all-past-presidents",
// //         ].includes(urlTab)
// //       )
// //         setAboutMenuOpen(true);
// //       if (["add-event", "all-events"].includes(urlTab)) setEventMenuOpen(true);
// //       if (["add-initiative", "all-initiatives"].includes(urlTab))
// //         setInitiativeMenuOpen(true);
// //       if (
// //         [
// //           "add-campus-event",
// //           "all-campus-events",
// //           "add-pillar-footprint",
// //           "all-pillar-footprints",
// //         ].includes(urlTab)
// //       )
// //         setCampusConnectMenuOpen(true);
// //       if (["add-publication", "all-publications"].includes(urlTab))
// //         setPublicationMenuOpen(true);
// //     } else {
// //       setCurrentTab("dashboard");
// //     }
// //   }, [urlTab]);

// //   const [homeMenuOpen, setHomeMenuOpen] = useState(true);
// //   const [aboutMenuOpen, setAboutMenuOpen] = useState(true);
// //   const [eventMenuOpen, setEventMenuOpen] = useState(true);
// //   const [initiativeMenuOpen, setInitiativeMenuOpen] = useState(true);
// //   const [campusConnectMenuOpen, setCampusConnectMenuOpen] = useState(true);
// //   const [publicationMenuOpen, setPublicationMenuOpen] = useState(true);
// //   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
// //   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

// //   const handleNavigate = (tab) => {
// //     setCurrentTab(tab);
// //     navigate(`/admin/${tab}`);
// //     setMobileSidebarOpen(false);
// //   };

// //   const handleExitAdmin = () => {
// //     if (onExitAdmin) onExitAdmin();
// //     navigate("/");
// //   };

// //   const sidebarWidthClass = sidebarCollapsed ? "w-20" : "w-64";
// //   const contentMarginClass = sidebarCollapsed ? "md:ml-20" : "md:ml-64";

// //   return (
// //     <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-left">
// //       {/* 1. Left Sidebar Navigation */}
// //       <aside
// //         className={`bg-[#F8FAFC] text-white border-r border-white/10 transition-all duration-300 z-40 flex flex-col justify-between ${sidebarWidthClass} fixed top-0 bottom-0 left-0 ${
// //           mobileSidebarOpen
// //             ? "translate-x-0"
// //             : "-translate-x-full md:translate-x-0"
// //         }`}
// //       >
// //         <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
// //           {/* Brand Header */}
// //           <div className="flex items-center justify-between pb-4 border-b border-white/10 relative">
// //             <div className="flex items-center gap-3 overflow-hidden">
// //               <div className="w-10 h-10 rounded-xl bg-[#E25238] text-white flex items-center justify-center shrink-0 shadow-md">
// //                 <Cpu className="w-5 h-5" />
// //               </div>
// //               {!sidebarCollapsed && (
// //                 <div className="truncate">
// //                   <h1 className="text-sm font-black text-white tracking-tight leading-tight flex items-center gap-1.5">
// //                     <span>AIA Command</span>
// //                     <span className="text-[10px] bg-red-500/20 text-[#FF6B55] px-1.5 py-0.5 rounded font-bold border border-red-500/30">
// //                       CMS
// //                     </span>
// //                   </h1>
// //                   <p className="text-[10px] text-gray-400 font-medium">
// //                     Smart Manufacturing Hub
// //                   </p>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Collapse Toggle Button */}
// //             <button
// //               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
// //               className="hidden md:flex absolute -right-3 top-2 w-6 h-6 rounded-full border border-gray-700 bg-[#0F2338] text-gray-500 hover:text-[#FF6B55] hover:border-red-400 items-center justify-center shadow-md transition z-50"
// //               title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
// //             >
// //               {sidebarCollapsed ? (
// //                 <ChevronRight className="w-3.5 h-3.5" />
// //               ) : (
// //                 <ChevronLeft className="w-3.5 h-3.5" />
// //               )}
// //             </button>
// //           </div>

// //           {/* Navigation Items */}
// //           <div className="space-y-1.5">
// //             {!sidebarCollapsed && (
// //               <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider px-3 mb-2">
// //                 NAVIGATION
// //               </div>
// //             )}

// //             {/* 1. Dashboard */}
// //             <button
// //               onClick={() => handleNavigate("dashboard")}
// //               className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
// //                 currentTab === "dashboard"
// //                   ? "bg-[#E25238] text-white shadow-md"
// //                   : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
// //               }`}
// //             >
// //               <LayoutDashboard className="w-4 h-4 shrink-0" />
// //               {!sidebarCollapsed && <span>Dashboard</span>}
// //             </button>

// //             {/* 2. Home Submenu */}
// //             <div>
// //               <button
// //                 onClick={() => setHomeMenuOpen(!homeMenuOpen)}
// //                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
// //                   [
// //                     "add-banner",
// //                     "all-banners",
// //                     "add-service",
// //                     "all-services",
// //                     "add-what-aia",
// //                     "all-what-aia",
// //                   ].includes(currentTab)
// //                     ? "text-[#FF6B55] bg-white/5"
// //                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
// //                 }`}
// //               >
// //                 <div className="flex items-center gap-3">
// //                   <HomeIcon className="w-4 h-4 shrink-0" />
// //                   {!sidebarCollapsed && <span>Home Section</span>}
// //                 </div>
// //                 {!sidebarCollapsed &&
// //                   (homeMenuOpen ? (
// //                     <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
// //                   ) : (
// //                     <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
// //                   ))}
// //               </button>

// //               {homeMenuOpen && !sidebarCollapsed && (
// //                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
// //                   <button
// //                     onClick={() => handleNavigate("add-banner")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "add-banner"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Add Home Banner
// //                   </button>

// //                   <button
// //                     onClick={() => handleNavigate("all-banners")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "all-banners"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     All Banner Images
// //                   </button>

// //                   <button
// //                     onClick={() => handleNavigate("add-service")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "add-service"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Add Services
// //                   </button>

// //                   <button
// //                     onClick={() => handleNavigate("all-services")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "all-services"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     All Services
// //                   </button>

// //                   {/* What AIA Does CMS */}
// //                   <button
// //                     onClick={() => handleNavigate("add-what-aia")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "add-what-aia"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Add What AIA Does
// //                   </button>

// //                   <button
// //                     onClick={() => handleNavigate("all-what-aia")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "all-what-aia"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     All What AIA Cards
// //                   </button>

// //                   <button
// //                     onClick={() => handleNavigate("slider-cms")}
// //                     className={`w-full rounded-lg px-2.5 py-1.5 text-left text-xs transition ${
// //                       currentTab === "slider-cms"
// //                         ? "bg-white/10 font-bold text-[#FF6B55]"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Slider CMS
// //                   </button>

// //                   {/* Membership Slider CMS */}
// //                   <button
// //                     onClick={() => handleNavigate("membership-slider-cms")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "membership-slider-cms"
// //                         ? "bg-white/10 font-bold text-[#FF6B55]"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Membership Slider CMS
// //                   </button>

// //                   {/* Talent Connect Slider CMS */}
// //                   <button
// //                     onClick={() => handleNavigate("talent-connect-slider-cms")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "talent-connect-slider-cms"
// //                         ? "bg-white/10 font-bold text-[#FF6B55]"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Talent Connect Slider CMS
// //                   </button>

// //                   {/* Industry Insight Slider CMS */}
// //                   <button
// //                     onClick={() =>
// //                       handleNavigate("industry-insight-slider-cms")
// //                     }
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "industry-insight-slider-cms"
// //                         ? "bg-white/10 font-bold text-[#FF6B55]"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Industry Insight Slider CMS
// //                   </button>

// //                   <button
// //                     onClick={() => handleNavigate("why-join-cms")}
// //                     className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-500 hover:text-rose-500"
// //                   >
// //                     Why Join CMS
// //                   </button>

// //                   <button
// //                     onClick={() => handleNavigate("home-features-cms")}
// //                     className={`w-full rounded-lg px-3 py-2 text-left text-xs transition ${
// //                       currentTab === "home-features-cms"
// //                         ? "bg-white/10 font-bold text-[#FF6B55]"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Home Features CMS
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             {/* 3. About Us Submenu */}
// //             <div>
// //               <button
// //                 onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
// //                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
// //                   [
// //                     "add-about",
// //                     "add-roadmap",
// //                     "all-roadmap",
// //                     "add-council",
// //                     "all-council",
// //                     "add-past-president",
// //                     "all-past-presidents",
// //                   ].includes(currentTab)
// //                     ? "text-[#FF6B55] bg-white/5"
// //                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
// //                 }`}
// //               >
// //                 <div className="flex items-center gap-3">
// //                   <Users className="w-4 h-4 shrink-0" />
// //                   {!sidebarCollapsed && <span>About Us Section</span>}
// //                 </div>
// //                 {!sidebarCollapsed &&
// //                   (aboutMenuOpen ? (
// //                     <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
// //                   ) : (
// //                     <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
// //                   ))}
// //               </button>

// //               {aboutMenuOpen && !sidebarCollapsed && (
// //                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
// //                   <button
// //                     onClick={() => handleNavigate("add-about")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "add-about"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Add About Content
// //                   </button>

// //                   <button
// //                     onClick={() => handleNavigate("all-about")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "all-about" ||
// //                       currentTab === "all-about-aia"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     All About-AIA
// //                   </button>

// //                   <button
// //                     onClick={() => handleNavigate("add-roadmap")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "add-roadmap"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Roadmap & Vision
// //                   </button>

// //                   <button
// //                     onClick={() => handleNavigate("all-roadmap")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "all-roadmap"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     All Milestones
// //                   </button>

// //                   <div className="pt-1.5 pb-1 border-t border-white/10">
// //                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">
// //                       Council Leadership
// //                     </span>
// //                   </div>

// //                   <button
// //                     onClick={() => handleNavigate("add-council")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "add-council"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Add Council Executive
// //                   </button>

// //                   <button
// //                     onClick={() => handleNavigate("all-council")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "all-council"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     All Council Members
// //                   </button>

// //                   <div className="pt-1.5 pb-1 border-t border-white/10">
// //                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">
// //                       Past Leadership
// //                     </span>
// //                   </div>

// //                   <button
// //                     onClick={() => handleNavigate("add-past-president")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "add-past-president"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Add Past President
// //                   </button>

// //                   <button
// //                     onClick={() => handleNavigate("all-past-presidents")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "all-past-presidents"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     All Past Presidents
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             {/* 4. Events Submenu */}
// //             <div>
// //               <button
// //                 onClick={() => setEventMenuOpen(!eventMenuOpen)}
// //                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
// //                   ["add-event", "all-events"].includes(currentTab)
// //                     ? "text-[#FF6B55] bg-white/5"
// //                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
// //                 }`}
// //               >
// //                 <div className="flex items-center gap-3">
// //                   <Calendar className="w-4 h-4 shrink-0" />
// //                   {!sidebarCollapsed && <span>Events Section</span>}
// //                 </div>
// //                 {!sidebarCollapsed &&
// //                   (eventMenuOpen ? (
// //                     <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
// //                   ) : (
// //                     <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
// //                   ))}
// //               </button>

// //               {eventMenuOpen && !sidebarCollapsed && (
// //                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
// //                   <button
// //                     onClick={() => handleNavigate("add-event")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "add-event"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Add Event
// //                   </button>

// //                   <button
// //                     onClick={() => handleNavigate("all-events")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "all-events"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     All Events
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             {/* 5. Initiatives Submenu */}
// //             <div>
// //               <button
// //                 onClick={() => setInitiativeMenuOpen(!initiativeMenuOpen)}
// //                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
// //                   ["add-initiative", "all-initiatives"].includes(currentTab)
// //                     ? "text-[#FF6B55] bg-white/5"
// //                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
// //                 }`}
// //               >
// //                 <div className="flex items-center gap-3">
// //                   <Sparkles className="w-4 h-4 shrink-0" />
// //                   {!sidebarCollapsed && <span>Our Initiatives</span>}
// //                 </div>
// //                 {!sidebarCollapsed &&
// //                   (initiativeMenuOpen ? (
// //                     <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
// //                   ) : (
// //                     <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
// //                   ))}
// //               </button>

// //               {initiativeMenuOpen && !sidebarCollapsed && (
// //                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
// //                   <button
// //                     onClick={() => handleNavigate("add-initiative")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "add-initiative"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Add Initiative
// //                   </button>

// //                   <button
// //                     onClick={() => handleNavigate("all-initiatives")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "all-initiatives"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     All Initiatives
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             {/* 6. Campus Connect Submenu (Below Our Initiatives as requested) */}
// //             <div>
// //               <button
// //                 onClick={() => setCampusConnectMenuOpen(!campusConnectMenuOpen)}
// //                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
// //                   [
// //                     "add-campus-event",
// //                     "all-campus-events",
// //                     "add-pillar-footprint",
// //                     "all-pillar-footprints",
// //                   ].includes(currentTab)
// //                     ? "text-[#FF6B55] bg-white/5"
// //                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
// //                 }`}
// //               >
// //                 <div className="flex items-center gap-3">
// //                   <GraduationCap className="w-4 h-4 shrink-0 text-[#FF6B55]" />
// //                   {!sidebarCollapsed && <span>Campus Connect</span>}
// //                 </div>
// //                 {!sidebarCollapsed &&
// //                   (campusConnectMenuOpen ? (
// //                     <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
// //                   ) : (
// //                     <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
// //                   ))}
// //               </button>

// //               {campusConnectMenuOpen && !sidebarCollapsed && (
// //                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
// //                   {/* Subsection 1: For adding events in last section */}
// //                   <button
// //                     onClick={() => handleNavigate("add-campus-event")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "add-campus-event"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Add Campus Event
// //                   </button>

// //                   {/* Subsection 2: show all events */}
// //                   <button
// //                     onClick={() => handleNavigate("all-campus-events")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "all-campus-events"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Show All Events
// //                   </button>

// //                   <div className="pt-1.5 pb-1 border-t border-white/10">
// //                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">
// //                       Pillar Footprints
// //                     </span>
// //                   </div>

// //                   {/* Subsection 3: our pillar footprints */}
// //                   <button
// //                     onClick={() => handleNavigate("add-pillar-footprint")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "add-pillar-footprint"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Our Pillar Footprints
// //                   </button>

// //                   {/* Subsection 4: Show all pillar footprints */}
// //                   <button
// //                     onClick={() => handleNavigate("all-pillar-footprints")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "all-pillar-footprints"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Show All Pillar Footprints
// //                   </button>
// //                 </div>
// //               )}
// //             </div>

// //             {/* 7. Publications Submenu */}
// //             <div>
// //               <button
// //                 onClick={() => setPublicationMenuOpen(!publicationMenuOpen)}
// //                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
// //                   ["add-publication", "all-publications"].includes(currentTab)
// //                     ? "text-[#FF6B55] bg-white/5"
// //                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
// //                 }`}
// //               >
// //                 <div className="flex items-center gap-3">
// //                   <BookOpen className="w-4 h-4 shrink-0 text-[#FF6B55]" />
// //                   {!sidebarCollapsed && <span>Publications</span>}
// //                 </div>
// //                 {!sidebarCollapsed &&
// //                   (publicationMenuOpen ? (
// //                     <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
// //                   ) : (
// //                     <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
// //                   ))}
// //               </button>

// //               {publicationMenuOpen && !sidebarCollapsed && (
// //                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
// //                   {/* Sub-option 1: Add publication */}
// //                   <button
// //                     onClick={() => handleNavigate("add-publication")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "add-publication"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Add Publication
// //                   </button>

// //                   {/* Sub-option 2: Show all publications */}
// //                   <button
// //                     onClick={() => handleNavigate("all-publications")}
// //                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
// //                       currentTab === "all-publications"
// //                         ? "text-[#FF6B55] font-bold bg-white/10"
// //                         : "text-gray-400 hover:text-[#FF6B55]"
// //                     }`}
// //                   >
// //                     Show All Publications
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Footer Link */}
// //         <div className="p-4 border-t border-white/10">
// //           <button
// //             onClick={handleExitAdmin}
// //             className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-[#E25238] transition shadow-sm"
// //           >
// //             <Globe className="w-4 h-4 text-white shrink-0" />
// //             {!sidebarCollapsed && <span>View Live Website</span>}
// //           </button>
// //         </div>
// //       </aside>

// //       {/* 2. Main CMS Content Panel */}
// //       <div
// //         className={`flex-1 flex flex-col min-h-screen ${contentMarginClass} transition-all duration-300`}
// //       >
// //         {/* Top Header Bar */}
// //         <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
// //           <div className="flex items-center gap-3">
// //             <button
// //               onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
// //               className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
// //             >
// //               {mobileSidebarOpen ? (
// //                 <X className="w-5 h-5" />
// //               ) : (
// //                 <Menu className="w-5 h-5" />
// //               )}
// //             </button>
// //             <div className="flex items-center gap-2">
// //               <h1 className="text-base sm:text-lg font-black text-[#1E293B] tracking-tight">
// //                 Admin Dashboard
// //               </h1>
// //               <span className="text-[11px] font-bold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full border border-green-200">
// //                 MongoDB Live
// //               </span>
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-4">
// //             <button
// //               onClick={handleExitAdmin}
// //               className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
// //             >
// //               <Globe className="w-3.5 h-3.5 text-[#E25238]" />
// //               <span className="hidden sm:inline">View Public Site</span>
// //             </button>

// //             <button
// //               onClick={handleExitAdmin}
// //               className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-red-600 transition"
// //             >
// //               <LogOut className="w-4 h-4" />
// //               <span>Log out</span>
// //             </button>
// //           </div>
// //         </header>

// //         {/* Dynamic CMS Page View */}
// //         <main className="flex-1 p-4 sm:p-6 lg:p-10 bg-[#F8FAFC]">
// //           <div className="w-full max-w-6xl mx-auto">
// //             {currentTab === "dashboard" && (
// //               <AdminDashboard onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "add-banner" && (
// //               <AddHomeBanner onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "all-banners" && (
// //               <AllBanners onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "add-service" && (
// //               <AddService onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "all-services" && (
// //               <AllServices onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "add-what-aia" && (
// //               <AddWhatAIADoes onNavigate={handleNavigate} />
// //             )}

// //             {currentTab === "all-what-aia" && (
// //               <AllWhatAIADoes onNavigate={handleNavigate} />
// //             )}

// //             {currentTab === "slider-cms" && <ManageSliderCMS />}

// //             {currentTab === "membership-slider-cms" && (
// //               <ManageSliderCMS
// //                 defaultPageKey="membership"
// //                 defaultSectionKey="membership-slider"
// //               />
// //             )}

// //             {currentTab === "talent-connect-slider-cms" && (
// //               <ManageSliderCMS
// //                 defaultPageKey="talent-connect"
// //                 defaultSectionKey="talent-connect"
// //               />
// //             )}

// //             {currentTab === "industry-insight-slider-cms" && (
// //               <ManageSliderCMS
// //                 defaultPageKey="industry_insight"
// //                 defaultSectionKey="industry-insight"
// //               />
// //             )}

// //             {currentTab === "why-join-cms" && <ManageWhyJoin />}

// //             {currentTab === "home-features-cms" && <ManageHomeFeatures />}

// //             {currentTab === "add-about" && (
// //               <AddAboutContent onNavigate={handleNavigate} />
// //             )}
// //             {(currentTab === "all-about" || currentTab === "all-about-aia") && (
// //               <AllAboutAIA onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "add-roadmap" && (
// //               <AddRoadmap onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "all-roadmap" && (
// //               <AllRoadmap onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "add-council" && (
// //               <AddCouncilMember onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "all-council" && (
// //               <AllCouncilMembers onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "add-past-president" && (
// //               <AddPastPresident onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "all-past-presidents" && (
// //               <AllPastPresidents onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "add-event" && (
// //               <AddEvent onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "all-events" && (
// //               <AllEvents onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "add-initiative" && (
// //               <AddInitiative onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "all-initiatives" && (
// //               <AllInitiatives onNavigate={handleNavigate} />
// //             )}

// //             {/* Campus Connect CMS Subsections */}
// //             {currentTab === "add-campus-event" && (
// //               <AddCampusEvent onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "all-campus-events" && (
// //               <AllCampusEvents onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "add-pillar-footprint" && (
// //               <AddPillarFootprint onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "all-pillar-footprints" && (
// //               <AllPillarFootprints onNavigate={handleNavigate} />
// //             )}

// //             {/* Publications CMS Subsections */}
// //             {currentTab === "add-publication" && (
// //               <AddPublication onNavigate={handleNavigate} />
// //             )}
// //             {currentTab === "all-publications" && (
// //               <AllPublications onNavigate={handleNavigate} />
// //             )}
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import {
//   Cpu,
//   LayoutDashboard,
//   Home as HomeIcon,
//   Users,
//   Image as ImageIcon,
//   ChevronDown,
//   ChevronUp,
//   ChevronLeft,
//   ChevronRight,
//   LogOut,
//   Globe,
//   Menu,
//   X,
//   Calendar,
//   Sparkles,
//   Layers,
//   Award,
//   GraduationCap,
//   BookOpen,
//   BriefcaseBusiness,
// } from "lucide-react";
// import AddHomeBanner from "./AddHomeBanner.jsx";
// import AllBanners from "./AllBanners.jsx";
// import AddService from "./AddService.jsx";
// import AllServices from "./AllServices.jsx";
// import AddAboutContent from "./AddAboutContent.jsx";
// import AllAboutAIA from "./AllAboutAIA.jsx";
// import AddRoadmap from "./AddRoadmap.jsx";
// import AllRoadmap from "./AllRoadmap.jsx";
// import AddCouncilMember from "./AddCouncilMember.jsx";
// import AllCouncilMembers from "./AllCouncilMembers.jsx";
// import AddPastPresident from "./AddPastPresident.jsx";
// import AllPastPresidents from "./AllPastPresidents.jsx";
// import AddEvent from "./AddEvent.jsx";
// import AllEvents from "./AllEvents.jsx";
// import AddInitiative from "./AddInitiative.jsx";
// import AllInitiatives from "./AllInitiatives.jsx";
// import AddPillarFootprint from "./AddPillarFootprint.jsx";
// import AllPillarFootprints from "./AllPillarFootprints.jsx";
// import AddCampusEvent from "./AddCampusEvent.jsx";
// import AllCampusEvents from "./AllCampusEvents.jsx";
// import AddPublication from "./AddPublication.jsx";
// import AllPublications from "./AllPublications.jsx";
// import AdminDashboard from "./AdminDashboard.jsx";
// import AddWhatAIADoes from "./AddWhatAIADoes.jsx";
// import AllWhatAIADoes from "./AllWhatAIADoes.jsx";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import ManageSliderCMS from "./ManageSliderCMS.jsx";
// import ManageWhyJoin from "./ManageWhyJoin.jsx";
// import ManageHomeFeatures from "./ManageHomeFeatures.jsx";

// export default function AdminLayout({ onExitAdmin }) {
//   const navigate = useNavigate();
//   const { tab: urlTab } = useParams();
//   const [currentTab, setCurrentTab] = useState(urlTab || "dashboard");

//   useEffect(() => {
//     if (urlTab) {
//       setCurrentTab(urlTab);
//       if (
//         [
//           "add-banner",
//           "all-banners",
//           "add-service",
//           "all-services",
//           "add-what-aia",
//           "all-what-aia",
//           "home-features-cms",
//         ].includes(urlTab)
//       )
//         setHomeMenuOpen(true);
//       if (
//         [
//           "add-about",
//           "all-about",
//           "all-about-aia",
//           "add-roadmap",
//           "all-roadmap",
//           "add-council",
//           "all-council",
//           "add-past-president",
//           "all-past-presidents",
//         ].includes(urlTab)
//       )
//         setAboutMenuOpen(true);
//       if (["add-event", "all-events"].includes(urlTab)) setEventMenuOpen(true);
//       if (["add-initiative", "all-initiatives"].includes(urlTab))
//         setInitiativeMenuOpen(true);
//       if (
//         [
//           "add-campus-event",
//           "all-campus-events",
//           "add-pillar-footprint",
//           "all-pillar-footprints",
//         ].includes(urlTab)
//       )
//         setCampusConnectMenuOpen(true);
//       if (["add-publication", "all-publications"].includes(urlTab))
//         setPublicationMenuOpen(true);
//       if (urlTab === "membership-slider-cms") setMembershipMenuOpen(true);
//       if (urlTab === "industry-insight-slider-cms") setIndustryInsightMenuOpen(true);
//       if (urlTab === "talent-connect-slider-cms") setTalentConnectMenuOpen(true);
//     } else {
//       setCurrentTab("dashboard");
//     }
//   }, [urlTab]);

//   const [homeMenuOpen, setHomeMenuOpen] = useState(true);
//   const [aboutMenuOpen, setAboutMenuOpen] = useState(true);
//   const [eventMenuOpen, setEventMenuOpen] = useState(true);
//   const [initiativeMenuOpen, setInitiativeMenuOpen] = useState(true);
//   const [campusConnectMenuOpen, setCampusConnectMenuOpen] = useState(true);
//   const [publicationMenuOpen, setPublicationMenuOpen] = useState(true);
//   const [membershipMenuOpen, setMembershipMenuOpen] = useState(true);
//   const [industryInsightMenuOpen, setIndustryInsightMenuOpen] = useState(true);
//   const [talentConnectMenuOpen, setTalentConnectMenuOpen] = useState(true);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

//   const handleNavigate = (tab) => {
//     setCurrentTab(tab);
//     navigate(`/admin/${tab}`);
//     setMobileSidebarOpen(false);
//   };

//   const handleExitAdmin = () => {
//     if (onExitAdmin) onExitAdmin();
//     navigate("/");
//   };

//   const sidebarWidthClass = sidebarCollapsed ? "w-20" : "w-64";
//   const contentMarginClass = sidebarCollapsed ? "md:ml-20" : "md:ml-64";

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-left">
//       {/* 1. Left Sidebar Navigation */}
//       <aside
//         className={`bg-[#F8FAFC] text-white border-r border-white/10 transition-all duration-300 z-40 flex flex-col justify-between ${sidebarWidthClass} fixed top-0 bottom-0 left-0 ${
//           mobileSidebarOpen
//             ? "translate-x-0"
//             : "-translate-x-full md:translate-x-0"
//         }`}
//       >
//         <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
//           {/* Brand Header */}
//           <div className="flex items-center justify-between pb-4 border-b border-white/10 relative">
//             <div className="flex items-center gap-3 overflow-hidden">
//               <div className="w-10 h-10 rounded-xl bg-[#E25238] text-white flex items-center justify-center shrink-0 shadow-md">
//                 <Cpu className="w-5 h-5" />
//               </div>
//               {!sidebarCollapsed && (
//                 <div className="truncate">
//                   <h1 className="text-sm font-black text-white tracking-tight leading-tight flex items-center gap-1.5">
//                     <span>AIA Command</span>
//                     <span className="text-[10px] bg-red-500/20 text-[#FF6B55] px-1.5 py-0.5 rounded font-bold border border-red-500/30">
//                       CMS
//                     </span>
//                   </h1>
//                   <p className="text-[10px] text-gray-400 font-medium">
//                     Smart Manufacturing Hub
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Collapse Toggle Button */}
//             <button
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className="hidden md:flex absolute -right-3 top-2 w-6 h-6 rounded-full border border-gray-700 bg-[#0F2338] text-gray-500 hover:text-[#FF6B55] hover:border-red-400 items-center justify-center shadow-md transition z-50"
//               title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
//             >
//               {sidebarCollapsed ? (
//                 <ChevronRight className="w-3.5 h-3.5" />
//               ) : (
//                 <ChevronLeft className="w-3.5 h-3.5" />
//               )}
//             </button>
//           </div>

//           {/* Navigation Items */}
//           <div className="space-y-1.5">
//             {!sidebarCollapsed && (
//               <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider px-3 mb-2">
//                 NAVIGATION
//               </div>
//             )}

//             {/* 1. Dashboard */}
//             <button
//               onClick={() => handleNavigate("dashboard")}
//               className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
//                 currentTab === "dashboard"
//                   ? "bg-[#E25238] text-white shadow-md"
//                   : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
//               }`}
//             >
//               <LayoutDashboard className="w-4 h-4 shrink-0" />
//               {!sidebarCollapsed && <span>Dashboard</span>}
//             </button>

//             {/* 2. Home Submenu */}
//             <div>
//               <button
//                 onClick={() => setHomeMenuOpen(!homeMenuOpen)}
//                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
//                   [
//                     "add-banner",
//                     "all-banners",
//                     "add-service",
//                     "all-services",
//                     "add-what-aia",
//                     "all-what-aia",
//                   ].includes(currentTab)
//                     ? "text-[#FF6B55] bg-white/5"
//                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <HomeIcon className="w-4 h-4 shrink-0" />
//                   {!sidebarCollapsed && <span>Home Section</span>}
//                 </div>
//                 {!sidebarCollapsed &&
//                   (homeMenuOpen ? (
//                     <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
//                   ) : (
//                     <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
//                   ))}
//               </button>

//               {homeMenuOpen && !sidebarCollapsed && (
//                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
//                   <button
//                     onClick={() => handleNavigate("add-banner")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "add-banner"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Add Home Banner
//                   </button>

//                   <button
//                     onClick={() => handleNavigate("all-banners")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "all-banners"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     All Banner Images
//                   </button>

//                   <button
//                     onClick={() => handleNavigate("add-service")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "add-service"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Add Services
//                   </button>

//                   <button
//                     onClick={() => handleNavigate("all-services")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "all-services"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     All Services
//                   </button>

//                   {/* What AIA Does CMS */}
//                   <button
//                     onClick={() => handleNavigate("add-what-aia")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "add-what-aia"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Add What AIA Does
//                   </button>

//                   <button
//                     onClick={() => handleNavigate("all-what-aia")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "all-what-aia"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     All What AIA Cards
//                   </button>

//                   <button
//                     onClick={() => handleNavigate("slider-cms")}
//                     className={`w-full rounded-lg px-2.5 py-1.5 text-left text-xs transition ${
//                       currentTab === "slider-cms"
//                         ? "bg-white/10 font-bold text-[#FF6B55]"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Slider CMS
//                   </button>

//                   <button
//                     onClick={() => handleNavigate("why-join-cms")}
//                     className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-500 hover:text-rose-500"
//                   >
//                     Why Join CMS
//                   </button>

//                   <button
//                     onClick={() => handleNavigate("home-features-cms")}
//                     className={`w-full rounded-lg px-3 py-2 text-left text-xs transition ${
//                       currentTab === "home-features-cms"
//                         ? "bg-white/10 font-bold text-[#FF6B55]"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Home Features CMS
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* 3. Membership page CMS submenu */}
//             <div>
//               <button
//                 onClick={() => setMembershipMenuOpen(!membershipMenuOpen)}
//                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
//                   currentTab === "membership-slider-cms"
//                     ? "text-[#FF6B55] bg-white/5"
//                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <Users className="w-4 h-4 shrink-0" />
//                   {!sidebarCollapsed && <span>Membership</span>}
//                 </div>
//                 {!sidebarCollapsed && (membershipMenuOpen ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />)}
//               </button>
//               {membershipMenuOpen && !sidebarCollapsed && (
//                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
//                   <button onClick={() => handleNavigate("membership-slider-cms")} className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${currentTab === "membership-slider-cms" ? "text-[#FF6B55] font-bold bg-white/10" : "text-gray-400 hover:text-[#FF6B55]"}`}>
//                     Slider CMS
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* 4. Industry Insight page CMS submenu */}
//             <div>
//               <button
//                 onClick={() => setIndustryInsightMenuOpen(!industryInsightMenuOpen)}
//                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
//                   currentTab === "industry-insight-slider-cms"
//                     ? "text-[#FF6B55] bg-white/5"
//                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <Layers className="w-4 h-4 shrink-0" />
//                   {!sidebarCollapsed && <span>Industry Insight</span>}
//                 </div>
//                 {!sidebarCollapsed && (industryInsightMenuOpen ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />)}
//               </button>
//               {industryInsightMenuOpen && !sidebarCollapsed && (
//                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
//                   <button onClick={() => handleNavigate("industry-insight-slider-cms")} className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${currentTab === "industry-insight-slider-cms" ? "text-[#FF6B55] font-bold bg-white/10" : "text-gray-400 hover:text-[#FF6B55]"}`}>
//                     Slider CMS
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* 5. Talent Connect page CMS submenu */}
//             <div>
//               <button
//                 onClick={() => setTalentConnectMenuOpen(!talentConnectMenuOpen)}
//                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
//                   currentTab === "talent-connect-slider-cms"
//                     ? "text-[#FF6B55] bg-white/5"
//                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <BriefcaseBusiness className="w-4 h-4 shrink-0" />
//                   {!sidebarCollapsed && <span>Talent Connect</span>}
//                 </div>
//                 {!sidebarCollapsed && (talentConnectMenuOpen ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />)}
//               </button>
//               {talentConnectMenuOpen && !sidebarCollapsed && (
//                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
//                   <button onClick={() => handleNavigate("talent-connect-slider-cms")} className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${currentTab === "talent-connect-slider-cms" ? "text-[#FF6B55] font-bold bg-white/10" : "text-gray-400 hover:text-[#FF6B55]"}`}>
//                     Slider CMS
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* 6. About Us Submenu */}

//             <div>
//               <button
//                 onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
//                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
//                   [
//                     "add-about",
//                     "add-roadmap",
//                     "all-roadmap",
//                     "add-council",
//                     "all-council",
//                     "add-past-president",
//                     "all-past-presidents",
//                   ].includes(currentTab)
//                     ? "text-[#FF6B55] bg-white/5"
//                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <Users className="w-4 h-4 shrink-0" />
//                   {!sidebarCollapsed && <span>About Us Section</span>}
//                 </div>
//                 {!sidebarCollapsed &&
//                   (aboutMenuOpen ? (
//                     <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
//                   ) : (
//                     <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
//                   ))}
//               </button>

//               {aboutMenuOpen && !sidebarCollapsed && (
//                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
//                   <button
//                     onClick={() => handleNavigate("add-about")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "add-about"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Add About Content
//                   </button>

//                   <button
//                     onClick={() => handleNavigate("all-about")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "all-about" ||
//                       currentTab === "all-about-aia"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     All About-AIA
//                   </button>

//                   <button
//                     onClick={() => handleNavigate("add-roadmap")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "add-roadmap"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Roadmap & Vision
//                   </button>

//                   <button
//                     onClick={() => handleNavigate("all-roadmap")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "all-roadmap"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     All Milestones
//                   </button>

//                   <div className="pt-1.5 pb-1 border-t border-white/10">
//                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">
//                       Council Leadership
//                     </span>
//                   </div>

//                   <button
//                     onClick={() => handleNavigate("add-council")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "add-council"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Add Council Executive
//                   </button>

//                   <button
//                     onClick={() => handleNavigate("all-council")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "all-council"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     All Council Members
//                   </button>

//                   <div className="pt-1.5 pb-1 border-t border-white/10">
//                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">
//                       Past Leadership
//                     </span>
//                   </div>

//                   <button
//                     onClick={() => handleNavigate("add-past-president")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "add-past-president"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Add Past President
//                   </button>

//                   <button
//                     onClick={() => handleNavigate("all-past-presidents")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "all-past-presidents"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     All Past Presidents
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* 4. Events Submenu */}
//             <div>
//               <button
//                 onClick={() => setEventMenuOpen(!eventMenuOpen)}
//                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
//                   ["add-event", "all-events"].includes(currentTab)
//                     ? "text-[#FF6B55] bg-white/5"
//                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <Calendar className="w-4 h-4 shrink-0" />
//                   {!sidebarCollapsed && <span>Events Section</span>}
//                 </div>
//                 {!sidebarCollapsed &&
//                   (eventMenuOpen ? (
//                     <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
//                   ) : (
//                     <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
//                   ))}
//               </button>

//               {eventMenuOpen && !sidebarCollapsed && (
//                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
//                   <button
//                     onClick={() => handleNavigate("add-event")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "add-event"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Add Event
//                   </button>

//                   <button
//                     onClick={() => handleNavigate("all-events")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "all-events"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     All Events
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* 5. Initiatives Submenu */}
//             <div>
//               <button
//                 onClick={() => setInitiativeMenuOpen(!initiativeMenuOpen)}
//                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
//                   ["add-initiative", "all-initiatives"].includes(currentTab)
//                     ? "text-[#FF6B55] bg-white/5"
//                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <Sparkles className="w-4 h-4 shrink-0" />
//                   {!sidebarCollapsed && <span>Our Initiatives</span>}
//                 </div>
//                 {!sidebarCollapsed &&
//                   (initiativeMenuOpen ? (
//                     <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
//                   ) : (
//                     <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
//                   ))}
//               </button>

//               {initiativeMenuOpen && !sidebarCollapsed && (
//                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
//                   <button
//                     onClick={() => handleNavigate("add-initiative")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "add-initiative"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Add Initiative
//                   </button>

//                   <button
//                     onClick={() => handleNavigate("all-initiatives")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "all-initiatives"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     All Initiatives
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* 6. Campus Connect Submenu (Below Our Initiatives as requested) */}
//             <div>
//               <button
//                 onClick={() => setCampusConnectMenuOpen(!campusConnectMenuOpen)}
//                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
//                   [
//                     "add-campus-event",
//                     "all-campus-events",
//                     "add-pillar-footprint",
//                     "all-pillar-footprints",
//                   ].includes(currentTab)
//                     ? "text-[#FF6B55] bg-white/5"
//                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <GraduationCap className="w-4 h-4 shrink-0 text-[#FF6B55]" />
//                   {!sidebarCollapsed && <span>Campus Connect</span>}
//                 </div>
//                 {!sidebarCollapsed &&
//                   (campusConnectMenuOpen ? (
//                     <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
//                   ) : (
//                     <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
//                   ))}
//               </button>

//               {campusConnectMenuOpen && !sidebarCollapsed && (
//                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
//                   {/* Subsection 1: For adding events in last section */}
//                   <button
//                     onClick={() => handleNavigate("add-campus-event")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "add-campus-event"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Add Campus Event
//                   </button>

//                   {/* Subsection 2: show all events */}
//                   <button
//                     onClick={() => handleNavigate("all-campus-events")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "all-campus-events"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Show All Events
//                   </button>

//                   <div className="pt-1.5 pb-1 border-t border-white/10">
//                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">
//                       Pillar Footprints
//                     </span>
//                   </div>

//                   {/* Subsection 3: our pillar footprints */}
//                   <button
//                     onClick={() => handleNavigate("add-pillar-footprint")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "add-pillar-footprint"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Our Pillar Footprints
//                   </button>

//                   {/* Subsection 4: Show all pillar footprints */}
//                   <button
//                     onClick={() => handleNavigate("all-pillar-footprints")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "all-pillar-footprints"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Show All Pillar Footprints
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* 7. Publications Submenu */}
//             <div>
//               <button
//                 onClick={() => setPublicationMenuOpen(!publicationMenuOpen)}
//                 className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
//                   ["add-publication", "all-publications"].includes(currentTab)
//                     ? "text-[#FF6B55] bg-white/5"
//                     : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <BookOpen className="w-4 h-4 shrink-0 text-[#FF6B55]" />
//                   {!sidebarCollapsed && <span>Publications</span>}
//                 </div>
//                 {!sidebarCollapsed &&
//                   (publicationMenuOpen ? (
//                     <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
//                   ) : (
//                     <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
//                   ))}
//               </button>

//               {publicationMenuOpen && !sidebarCollapsed && (
//                 <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
//                   {/* Sub-option 1: Add publication */}
//                   <button
//                     onClick={() => handleNavigate("add-publication")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "add-publication"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Add Publication
//                   </button>

//                   {/* Sub-option 2: Show all publications */}
//                   <button
//                     onClick={() => handleNavigate("all-publications")}
//                     className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
//                       currentTab === "all-publications"
//                         ? "text-[#FF6B55] font-bold bg-white/10"
//                         : "text-gray-400 hover:text-[#FF6B55]"
//                     }`}
//                   >
//                     Show All Publications
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Footer Link */}
//         <div className="p-4 border-t border-white/10">
//           <button
//             onClick={handleExitAdmin}
//             className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-[#E25238] transition shadow-sm"
//           >
//             <Globe className="w-4 h-4 text-white shrink-0" />
//             {!sidebarCollapsed && <span>View Live Website</span>}
//           </button>
//         </div>
//       </aside>

//       {/* 2. Main CMS Content Panel */}
//       <div
//         className={`flex-1 flex flex-col min-h-screen ${contentMarginClass} transition-all duration-300`}
//       >
//         {/* Top Header Bar */}
//         <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
//               className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
//             >
//               {mobileSidebarOpen ? (
//                 <X className="w-5 h-5" />
//               ) : (
//                 <Menu className="w-5 h-5" />
//               )}
//             </button>
//             <div className="flex items-center gap-2">
//               <h1 className="text-base sm:text-lg font-black text-[#1E293B] tracking-tight">
//                 Admin Dashboard
//               </h1>
//               <span className="text-[11px] font-bold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full border border-green-200">
//                 MongoDB Live
//               </span>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleExitAdmin}
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
//             >
//               <Globe className="w-3.5 h-3.5 text-[#E25238]" />
//               <span className="hidden sm:inline">View Public Site</span>
//             </button>

//             <button
//               onClick={handleExitAdmin}
//               className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-red-600 transition"
//             >
//               <LogOut className="w-4 h-4" />
//               <span>Log out</span>
//             </button>
//           </div>
//         </header>

//         {/* Dynamic CMS Page View */}
//         <main className="flex-1 p-4 sm:p-6 lg:p-10 bg-[#F8FAFC]">
//           <div className="w-full max-w-6xl mx-auto">
//             {currentTab === "dashboard" && (
//               <AdminDashboard onNavigate={handleNavigate} />
//             )}
//             {currentTab === "add-banner" && (
//               <AddHomeBanner onNavigate={handleNavigate} />
//             )}
//             {currentTab === "all-banners" && (
//               <AllBanners onNavigate={handleNavigate} />
//             )}
//             {currentTab === "add-service" && (
//               <AddService onNavigate={handleNavigate} />
//             )}
//             {currentTab === "all-services" && (
//               <AllServices onNavigate={handleNavigate} />
//             )}
//             {currentTab === "add-what-aia" && (
//               <AddWhatAIADoes onNavigate={handleNavigate} />
//             )}

//             {currentTab === "all-what-aia" && (
//               <AllWhatAIADoes onNavigate={handleNavigate} />
//             )}

//             {currentTab === "slider-cms" && <ManageSliderCMS />}

//             {/* Page-specific slider CMS instances */}
//             {currentTab === "membership-slider-cms" && (
//               <ManageSliderCMS defaultPageKey="membership" defaultSectionKey="membership-slider" />
//             )}
//             {currentTab === "industry-insight-slider-cms" && (
//               <ManageSliderCMS defaultPageKey="industry_insight" defaultSectionKey="industry-insight" />
//             )}
//             {currentTab === "talent-connect-slider-cms" && (
//               <ManageSliderCMS defaultPageKey="talent-connect" defaultSectionKey="talent-connect" />
//             )}

//             {currentTab === "why-join-cms" && <ManageWhyJoin />}

//             {currentTab === "home-features-cms" && ( <ManageHomeFeatures /> )}

//             {currentTab === "add-about" && (
//               <AddAboutContent onNavigate={handleNavigate} />
//             )}
//             {(currentTab === "all-about" || currentTab === "all-about-aia") && (
//               <AllAboutAIA onNavigate={handleNavigate} />
//             )}
//             {currentTab === "add-roadmap" && (
//               <AddRoadmap onNavigate={handleNavigate} />
//             )}
//             {currentTab === "all-roadmap" && (
//               <AllRoadmap onNavigate={handleNavigate} />
//             )}
//             {currentTab === "add-council" && (
//               <AddCouncilMember onNavigate={handleNavigate} />
//             )}
//             {currentTab === "all-council" && (
//               <AllCouncilMembers onNavigate={handleNavigate} />
//             )}
//             {currentTab === "add-past-president" && (
//               <AddPastPresident onNavigate={handleNavigate} />
//             )}
//             {currentTab === "all-past-presidents" && (
//               <AllPastPresidents onNavigate={handleNavigate} />
//             )}
//             {currentTab === "add-event" && (
//               <AddEvent onNavigate={handleNavigate} />
//             )}
//             {currentTab === "all-events" && (
//               <AllEvents onNavigate={handleNavigate} />
//             )}
//             {currentTab === "add-initiative" && (
//               <AddInitiative onNavigate={handleNavigate} />
//             )}
//             {currentTab === "all-initiatives" && (
//               <AllInitiatives onNavigate={handleNavigate} />
//             )}

//             {/* Campus Connect CMS Subsections */}
//             {currentTab === "add-campus-event" && (
//               <AddCampusEvent onNavigate={handleNavigate} />
//             )}
//             {currentTab === "all-campus-events" && (
//               <AllCampusEvents onNavigate={handleNavigate} />
//             )}
//             {currentTab === "add-pillar-footprint" && (
//               <AddPillarFootprint onNavigate={handleNavigate} />
//             )}
//             {currentTab === "all-pillar-footprints" && (
//               <AllPillarFootprints onNavigate={handleNavigate} />
//             )}

//             {/* Publications CMS Subsections */}
//             {currentTab === "add-publication" && (
//               <AddPublication onNavigate={handleNavigate} />
//             )}
//             {currentTab === "all-publications" && (
//               <AllPublications onNavigate={handleNavigate} />
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Cpu,
  LayoutDashboard,
  Home as HomeIcon,
  Users,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Globe,
  Menu,
  X,
  Calendar,
  Sparkles,
  Layers,
  Award,
  GraduationCap,
  BookOpen,
  BriefcaseBusiness,
} from "lucide-react";
import AddHomeBanner from "./AddHomeBanner.jsx";
import AllBanners from "./AllBanners.jsx";
import AddService from "./AddService.jsx";
import AllServices from "./AllServices.jsx";
import AddAboutContent from "./AddAboutContent.jsx";
import AllAboutAIA from "./AllAboutAIA.jsx";
import AddRoadmap from "./AddRoadmap.jsx";
import AllRoadmap from "./AllRoadmap.jsx";
import AddCouncilMember from "./AddCouncilMember.jsx";
import AllCouncilMembers from "./AllCouncilMembers.jsx";
import AddPastPresident from "./AddPastPresident.jsx";
import AllPastPresidents from "./AllPastPresidents.jsx";
import AddEvent from "./AddEvent.jsx";
import AllEvents from "./AllEvents.jsx";
import AddInitiative from "./AddInitiative.jsx";
import AllInitiatives from "./AllInitiatives.jsx";
import AddPillarFootprint from "./AddPillarFootprint.jsx";
import AllPillarFootprints from "./AllPillarFootprints.jsx";
import AddCampusEvent from "./AddCampusEvent.jsx";
import AllCampusEvents from "./AllCampusEvents.jsx";
import AddPublication from "./AddPublication.jsx";
import AllPublications from "./AllPublications.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import AddWhatAIADoes from "./AddWhatAIADoes.jsx";
import AllWhatAIADoes from "./AllWhatAIADoes.jsx";
import { useNavigate, useParams, Link } from "react-router-dom";
import ManageSliderCMS from "./ManageSliderCMS.jsx";
import ManageWhyJoin from "./ManageWhyJoin.jsx";
import ManageHomeFeatures from "./ManageHomeFeatures.jsx";
import ManageStickyStackCMS from "./ManageStickyStackCMS.jsx";

export default function AdminLayout({ onExitAdmin }) {
  const navigate = useNavigate();
  const { tab: urlTab } = useParams();
  const [currentTab, setCurrentTab] = useState(urlTab || "dashboard");

  useEffect(() => {
    if (urlTab) {
      setCurrentTab(urlTab);
      if (
        [
          "add-banner",
          "all-banners",
          "add-service",
          "all-services",
          "add-what-aia",
          "all-what-aia",
          "home-features-cms",
        ].includes(urlTab)
      )
        setHomeMenuOpen(true);
      if (
        [
          "add-about",
          "all-about",
          "all-about-aia",
          "add-roadmap",
          "all-roadmap",
          "add-council",
          "all-council",
          "add-past-president",
          "all-past-presidents",
        ].includes(urlTab)
      )
        setAboutMenuOpen(true);
      if (["add-event", "all-events"].includes(urlTab)) setEventMenuOpen(true);
      if (["add-initiative", "all-initiatives"].includes(urlTab))
        setInitiativeMenuOpen(true);
      if (
        [
          "add-campus-event",
          "all-campus-events",
          "add-pillar-footprint",
          "all-pillar-footprints",
        ].includes(urlTab)
      )
        setCampusConnectMenuOpen(true);
      if (["add-publication", "all-publications"].includes(urlTab))
        setPublicationMenuOpen(true);
      if (urlTab === "membership-slider-cms") setMembershipMenuOpen(true);
      if (urlTab === "industry-insight-slider-cms")
        setIndustryInsightMenuOpen(true);
      if (urlTab === "talent-connect-slider-cms")
        setTalentConnectMenuOpen(true);
    } else {
      setCurrentTab("dashboard");
    }
  }, [urlTab]);

  const [homeMenuOpen, setHomeMenuOpen] = useState(true);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(true);
  const [eventMenuOpen, setEventMenuOpen] = useState(true);
  const [initiativeMenuOpen, setInitiativeMenuOpen] = useState(true);
  const [campusConnectMenuOpen, setCampusConnectMenuOpen] = useState(true);
  const [publicationMenuOpen, setPublicationMenuOpen] = useState(true);
  const [membershipMenuOpen, setMembershipMenuOpen] = useState(true);
  const [industryInsightMenuOpen, setIndustryInsightMenuOpen] = useState(true);
  const [talentConnectMenuOpen, setTalentConnectMenuOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleNavigate = (tab) => {
    setCurrentTab(tab);
    navigate(`/admin/${tab}`);
    setMobileSidebarOpen(false);
  };

  const handleExitAdmin = () => {
    if (onExitAdmin) onExitAdmin();
    navigate("/");
  };

  const sidebarWidthClass = sidebarCollapsed ? "w-20" : "w-64";
  const contentMarginClass = sidebarCollapsed ? "md:ml-20" : "md:ml-64";

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-left">
      {/* 1. Left Sidebar Navigation */}
      <aside
        className={`bg-[#F8FAFC] text-white border-r border-white/10 transition-all duration-300 z-40 flex flex-col justify-between ${sidebarWidthClass} fixed top-0 bottom-0 left-0 ${
          mobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 relative">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#E25238] text-white flex items-center justify-center shrink-0 shadow-md">
                <Cpu className="w-5 h-5" />
              </div>
              {!sidebarCollapsed && (
                <div className="truncate">
                  <h1 className="text-sm font-black text-white tracking-tight leading-tight flex items-center gap-1.5">
                    <span>AIA Command</span>
                    <span className="text-[10px] bg-red-500/20 text-[#FF6B55] px-1.5 py-0.5 rounded font-bold border border-red-500/30">
                      CMS
                    </span>
                  </h1>
                  <p className="text-[10px] text-gray-400 font-medium">
                    Smart Manufacturing Hub
                  </p>
                </div>
              )}
            </div>

            {/* Collapse Toggle Button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex absolute -right-3 top-2 w-6 h-6 rounded-full border border-gray-700 bg-[#0F2338] text-gray-500 hover:text-[#FF6B55] hover:border-red-400 items-center justify-center shadow-md transition z-50"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1.5">
            {!sidebarCollapsed && (
              <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider px-3 mb-2">
                NAVIGATION
              </div>
            )}

            {/* 1. Dashboard */}
            <button
              onClick={() => handleNavigate("dashboard")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                currentTab === "dashboard"
                  ? "bg-[#E25238] text-white shadow-md"
                  : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </button>

            {/* 2. Home Submenu */}
            <div>
              <button
                onClick={() => setHomeMenuOpen(!homeMenuOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  [
                    "add-banner",
                    "all-banners",
                    "add-service",
                    "all-services",
                    "add-what-aia",
                    "all-what-aia",
                  ].includes(currentTab)
                    ? "text-[#FF6B55] bg-white/5"
                    : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HomeIcon className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Home Section</span>}
                </div>
                {!sidebarCollapsed &&
                  (homeMenuOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  ))}
              </button>

              {homeMenuOpen && !sidebarCollapsed && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
                  <button
                    onClick={() => handleNavigate("add-banner")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "add-banner"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Add Home Banner
                  </button>

                  <button
                    onClick={() => handleNavigate("all-banners")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "all-banners"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    All Banner Images
                  </button>

                  <button
                    onClick={() => handleNavigate("add-service")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "add-service"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Add Services
                  </button>

                  <button
                    onClick={() => handleNavigate("all-services")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "all-services"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    All Services
                  </button>

                  {/* What AIA Does CMS */}
                  <button
                    onClick={() => handleNavigate("add-what-aia")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "add-what-aia"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Add What AIA Does
                  </button>

                  <button
                    onClick={() => handleNavigate("all-what-aia")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "all-what-aia"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    All What AIA Cards
                  </button>

                  <button
                    onClick={() => handleNavigate("slider-cms")}
                    className={`w-full rounded-lg px-2.5 py-1.5 text-left text-xs transition ${
                      currentTab === "slider-cms"
                        ? "bg-white/10 font-bold text-[#FF6B55]"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Slider CMS
                  </button>

                  <button
                    onClick={() => handleNavigate("home-why-join-cms")}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-500 hover:text-rose-500"
                  >
                    Why Join CMS
                  </button>

                  <button
                    onClick={() => handleNavigate("home-features-cms")}
                    className={`w-full rounded-lg px-3 py-2 text-left text-xs transition ${
                      currentTab === "home-features-cms"
                        ? "bg-white/10 font-bold text-[#FF6B55]"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Home Features CMS
                  </button>
                </div>
              )}
            </div>

            {/* 3. Membership page CMS submenu */}
            <div>
              <button
                onClick={() => setMembershipMenuOpen(!membershipMenuOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  currentTab === "membership-slider-cms"
                    ? "text-[#FF6B55] bg-white/5"
                    : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Membership</span>}
                </div>
                {!sidebarCollapsed &&
                  (membershipMenuOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  ))}
              </button>
              {membershipMenuOpen && !sidebarCollapsed && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
                  <button
                    onClick={() => handleNavigate("membership-slider-cms")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${currentTab === "membership-slider-cms" ? "text-[#FF6B55] font-bold bg-white/10" : "text-gray-400 hover:text-[#FF6B55]"}`}
                  >
                    Slider CMS
                  </button>
                </div>
              )}
              {membershipMenuOpen && !sidebarCollapsed && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
                  <button
                    onClick={() => handleNavigate("membership-why-join-cms")}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${currentTab === "membership-slider-cms" ? "text-[#FF6B55] font-bold bg-white/10" : "text-gray-400 hover:text-[#FF6B55]"}`}
                  >
                   Why Join CMS
                  </button>
                </div>
              )}

             
            </div>

            {/* 4. Industry Insight page CMS submenu */}
            <div>
              <button
                onClick={() =>
                  setIndustryInsightMenuOpen(!industryInsightMenuOpen)
                }
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  currentTab === "industry-insight-slider-cms"
                    ? "text-[#FF6B55] bg-white/5"
                    : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Industry Insight</span>}
                </div>
                {!sidebarCollapsed &&
                  (industryInsightMenuOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  ))}
              </button>
              {industryInsightMenuOpen && !sidebarCollapsed && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
                  <button
                    onClick={() =>
                      handleNavigate("industry-insight-slider-cms")
                    }
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${currentTab === "industry-insight-slider-cms" ? "text-[#FF6B55] font-bold bg-white/10" : "text-gray-400 hover:text-[#FF6B55]"}`}
                  >
                    Slider CMS
                  </button>
                </div>
              )}
              <button
              type="button"
              onClick={() => handleNavigate("sticky-stack-industry-cms")}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${currentTab === "sticky-stack-industry-cms" ? "text-[#FF6B55] font-bold bg-white/10" : "text-gray-400 hover:text-[#FF6B55]"}`}
              >
              <span>Industry Insight Sticky Stack CMS</span>
            </button>
            </div>

            {/* 5. Talent Connect page CMS submenu */}
            <div>
              <button
                onClick={() => setTalentConnectMenuOpen(!talentConnectMenuOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  currentTab === "talent-connect-slider-cms"
                    ? "text-[#FF6B55] bg-white/5"
                    : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <BriefcaseBusiness className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Talent Connect</span>}
                </div>
                {!sidebarCollapsed &&
                  (talentConnectMenuOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  ))}
              </button>
              {talentConnectMenuOpen && !sidebarCollapsed && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
                  <button
                    onClick={() => handleNavigate("talent-connect-slider-cms")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${currentTab === "talent-connect-slider-cms" ? "text-[#FF6B55] font-bold bg-white/10" : "text-gray-400 hover:text-[#FF6B55]"}`}
                  >
                    Slider CMS
                  </button>
                </div>
              )}
            </div>

            {/* 6. About Us Submenu */}

            <div>
              <button
                onClick={() => setAboutMenuOpen(!aboutMenuOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  [
                    "add-about",
                    "add-roadmap",
                    "all-roadmap",
                    "add-council",
                    "all-council",
                    "add-past-president",
                    "all-past-presidents",
                  ].includes(currentTab)
                    ? "text-[#FF6B55] bg-white/5"
                    : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>About Us Section</span>}
                </div>
                {!sidebarCollapsed &&
                  (aboutMenuOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  ))}
              </button>

              {aboutMenuOpen && !sidebarCollapsed && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
                  <button
                    onClick={() => handleNavigate("about-aia-slider-cms")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "about-aia-slider-cms"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Slider CMS
                  </button>
                  <button
                    onClick={() => handleNavigate("about-aia-slider-2-cms")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "about-aia-slider-2-cms"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Slider 2 CMS
                  </button>
                  <button
                    onClick={() => handleNavigate("add-about")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "add-about"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Add About Content
                  </button>

                  <button
                    onClick={() => handleNavigate("all-about")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "all-about" ||
                      currentTab === "all-about-aia"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    All About-AIA
                  </button>

                  <button
                    onClick={() => handleNavigate("add-roadmap")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "add-roadmap"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Roadmap & Vision
                  </button>

                  <button
                    onClick={() => handleNavigate("all-roadmap")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "all-roadmap"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    All Milestones
                  </button>

                   <button
                      onClick={() => handleNavigate("about-aia-why-join-cms")}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${currentTab === "membership-slider-cms" ? "text-[#FF6B55] font-bold bg-white/10" : "text-gray-400 hover:text-[#FF6B55]"}`}
                    >
                    Why Join CMS
                  </button>

    
                  <button
                   type="button"
                       onClick={() => handleNavigate("sticky-stack-about-cms")}
                       
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${currentTab === "sticky-stack-about-cms" ? "text-[#FF6B55] font-bold bg-white/10" : "text-gray-400 hover:text-[#FF6B55]"}`}
                                        >
                      
                                   <span>About Sticky Stack CMS</span>
                                      </button>

                  <div className="pt-1.5 pb-1 border-t border-white/10">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">
                      Council Leadership
                    </span>
                  </div>

                  <button
                    onClick={() => handleNavigate("add-council")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "add-council"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Add Council Executive
                  </button>

                  <button
                    onClick={() => handleNavigate("all-council")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "all-council"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    All Council Members
                  </button>

                  <div className="pt-1.5 pb-1 border-t border-white/10">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">
                      Past Leadership
                    </span>
                  </div>

                  <button
                    onClick={() => handleNavigate("add-past-president")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "add-past-president"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Add Past President
                  </button>

                  <button
                    onClick={() => handleNavigate("all-past-presidents")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "all-past-presidents"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    All Past Presidents
                  </button>
                </div>
              )}
           


            </div>

            {/* 4. Events Submenu */}
            <div>
              <button
                onClick={() => setEventMenuOpen(!eventMenuOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  ["add-event", "all-events"].includes(currentTab)
                    ? "text-[#FF6B55] bg-white/5"
                    : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Events Section</span>}
                </div>
                {!sidebarCollapsed &&
                  (eventMenuOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  ))}
              </button>

              {eventMenuOpen && !sidebarCollapsed && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
                  <button
                    onClick={() => handleNavigate("add-event")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "add-event"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Add Event
                  </button>

                  <button
                    onClick={() => handleNavigate("all-events")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "all-events"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    All Events
                  </button>
                </div>
              )}
            </div>

            {/* 5. Initiatives Submenu */}
            <div>
              <button
                onClick={() => setInitiativeMenuOpen(!initiativeMenuOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  ["add-initiative", "all-initiatives"].includes(currentTab)
                    ? "text-[#FF6B55] bg-white/5"
                    : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && <span>Our Initiatives</span>}
                </div>
                {!sidebarCollapsed &&
                  (initiativeMenuOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  ))}
              </button>

              {initiativeMenuOpen && !sidebarCollapsed && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
                  <button
                    onClick={() => handleNavigate("add-initiative")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "add-initiative"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Add Initiative
                  </button>

                  <button
                    onClick={() => handleNavigate("all-initiatives")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "all-initiatives"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    All Initiatives
                  </button>
                </div>
              )}
            </div>

            {/* 6. Campus Connect Submenu (Below Our Initiatives as requested) */}
            <div>
              <button
                onClick={() => setCampusConnectMenuOpen(!campusConnectMenuOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  [
                    "add-campus-event",
                    "all-campus-events",
                    "add-pillar-footprint",
                    "all-pillar-footprints",
                  ].includes(currentTab)
                    ? "text-[#FF6B55] bg-white/5"
                    : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 shrink-0 text-[#FF6B55]" />
                  {!sidebarCollapsed && <span>Campus Connect</span>}
                </div>
                {!sidebarCollapsed &&
                  (campusConnectMenuOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  ))}
              </button>

              {campusConnectMenuOpen && !sidebarCollapsed && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
                  {/* Subsection 1: For adding events in last section */}
                  <button
                    onClick={() => handleNavigate("add-campus-event")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "add-campus-event"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Add Campus Event
                  </button>

                  {/* Subsection 2: show all events */}
                  <button
                    onClick={() => handleNavigate("all-campus-events")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "all-campus-events"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Show All Events
                  </button>

                  <div className="pt-1.5 pb-1 border-t border-white/10">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1">
                      Pillar Footprints
                    </span>
                  </div>

                  {/* Subsection 3: our pillar footprints */}
                  <button
                    onClick={() => handleNavigate("add-pillar-footprint")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "add-pillar-footprint"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Our Pillar Footprints
                  </button>

                  {/* Subsection 4: Show all pillar footprints */}
                  <button
                    onClick={() => handleNavigate("all-pillar-footprints")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "all-pillar-footprints"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Show All Pillar Footprints
                  </button>
                </div>
              )}
            </div>

            {/* 7. Publications Submenu */}
            <div>
              <button
                onClick={() => setPublicationMenuOpen(!publicationMenuOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  ["add-publication", "all-publications"].includes(currentTab)
                    ? "text-[#FF6B55] bg-white/5"
                    : "text-gray-500 hover:bg-white/5 hover:text-[#FF6B55]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 shrink-0 text-[#FF6B55]" />
                  {!sidebarCollapsed && <span>Publications</span>}
                </div>
                {!sidebarCollapsed &&
                  (publicationMenuOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  ))}
              </button>

              {publicationMenuOpen && !sidebarCollapsed && (
                <div className="pl-9 pr-2 py-1 space-y-1 border-l border-white/10 ml-5 my-1">
                  {/* Sub-option 1: Add publication */}
                  <button
                    onClick={() => handleNavigate("add-publication")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "add-publication"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Add Publication
                  </button>

                  {/* Sub-option 2: Show all publications */}
                  <button
                    onClick={() => handleNavigate("all-publications")}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition ${
                      currentTab === "all-publications"
                        ? "text-[#FF6B55] font-bold bg-white/10"
                        : "text-gray-400 hover:text-[#FF6B55]"
                    }`}
                  >
                    Show All Publications
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleExitAdmin}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-[#E25238] transition shadow-sm"
          >
            <Globe className="w-4 h-4 text-white shrink-0" />
            {!sidebarCollapsed && <span>View Live Website</span>}
          </button>
        </div>
      </aside>

      {/* 2. Main CMS Content Panel */}
      <div
        className={`flex-1 flex flex-col min-h-screen ${contentMarginClass} transition-all duration-300`}
      >
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {mobileSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-[#1E293B] tracking-tight">
                Admin Dashboard
              </h1>
              <span className="text-[11px] font-bold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full border border-green-200">
                MongoDB Live
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleExitAdmin}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
            >
              <Globe className="w-3.5 h-3.5 text-[#E25238]" />
              <span className="hidden sm:inline">View Public Site</span>
            </button>

            <button
              onClick={handleExitAdmin}
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-red-600 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        </header>

        {/* Dynamic CMS Page View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 bg-[#F8FAFC]">
          <div className="w-full max-w-6xl mx-auto">
            {currentTab === "dashboard" && (
              <AdminDashboard onNavigate={handleNavigate} />
            )}
            {currentTab === "add-banner" && (
              <AddHomeBanner onNavigate={handleNavigate} />
            )}
            {currentTab === "all-banners" && (
              <AllBanners onNavigate={handleNavigate} />
            )}
            {currentTab === "add-service" && (
              <AddService onNavigate={handleNavigate} />
            )}
            {currentTab === "all-services" && (
              <AllServices onNavigate={handleNavigate} />
            )}
            {currentTab === "add-what-aia" && (
              <AddWhatAIADoes onNavigate={handleNavigate} />
            )}

            {currentTab === "all-what-aia" && (
              <AllWhatAIADoes onNavigate={handleNavigate} />
            )}

            {currentTab === "slider-cms" && (
              <ManageSliderCMS
                key="home-slider-cms"
                defaultPageKey="home"
                defaultSectionKey="industry-slider"
              />
            )}

            {/* Page-specific slider CMS instances */}
            {currentTab === "membership-slider-cms" && (
              <ManageSliderCMS
                key="membership-slider-cms"
                defaultPageKey="membership"
                defaultSectionKey="member-benefits"
              />
            )}

            {currentTab === "industry-insight-slider-cms" && (
              <ManageSliderCMS
                key="industry-insight-slider-cms"
                defaultPageKey="industry-insight"
                defaultSectionKey="industry-insight"
              />
            )}

            {currentTab === "talent-connect-slider-cms" && (
              <ManageSliderCMS
                key="talent-connect-slider-cms"
                defaultPageKey="talent-connect"
                defaultSectionKey="talent-connect"
              />
            )}

            {currentTab === "home-why-join-cms" && (
            <ManageWhyJoin
              key="home-why-join-cms"
              defaultPageKey="home"
              defaultSectionKey="why-join"
              />
            )}
            {currentTab === "membership-why-join-cms" && (
  <ManageWhyJoin
    key="membership-why-join-cms"
    defaultPageKey="membership"
    defaultSectionKey="why-join"
  />
)}
{currentTab === "about-aia-why-join-cms" && (
  <ManageWhyJoin
    key="about-aia-why-join-cms"
    defaultPageKey="about-aia"
    defaultSectionKey="why-join"
  />
)}
{currentTab === "about-aia-slider-cms" && (
  <ManageSliderCMS
    key="about-aia-slider-cms"
    defaultPageKey="about-aia"
    defaultSectionKey="about-slider"
  />
)}
{currentTab === "about-aia-slider-2-cms" && (
  <ManageSliderCMS
    key="about-aia-slider-2-cms"
    defaultPageKey="about-aia"
    defaultSectionKey="about-slider-2"
  />
)}
{currentTab === "sticky-stack-about-cms" && (
  <ManageStickyStackCMS
    key="sticky-stack-about-cms"
    defaultPageKey="about-aia"
    defaultSectionKey="our-journey"
  />
)}

{currentTab === "sticky-stack-industry-cms" && (
  <ManageStickyStackCMS
    key="sticky-stack-industry-cms"
    defaultPageKey="industry-insight"
    defaultSectionKey="articles-perspectives"
  />
)}

            {currentTab === "home-features-cms" && <ManageHomeFeatures />}

            {currentTab === "add-about" && (
              <AddAboutContent onNavigate={handleNavigate} />
            )}
            {(currentTab === "all-about" || currentTab === "all-about-aia") && (
              <AllAboutAIA onNavigate={handleNavigate} />
            )}
            {currentTab === "add-roadmap" && (
              <AddRoadmap onNavigate={handleNavigate} />
            )}
            {currentTab === "all-roadmap" && (
              <AllRoadmap onNavigate={handleNavigate} />
            )}
            {currentTab === "add-council" && (
              <AddCouncilMember onNavigate={handleNavigate} />
            )}
            {currentTab === "all-council" && (
              <AllCouncilMembers onNavigate={handleNavigate} />
            )}
            {currentTab === "add-past-president" && (
              <AddPastPresident onNavigate={handleNavigate} />
            )}
            {currentTab === "all-past-presidents" && (
              <AllPastPresidents onNavigate={handleNavigate} />
            )}
            {currentTab === "add-event" && (
              <AddEvent onNavigate={handleNavigate} />
            )}
            {currentTab === "all-events" && (
              <AllEvents onNavigate={handleNavigate} />
            )}
            {currentTab === "add-initiative" && (
              <AddInitiative onNavigate={handleNavigate} />
            )}
            {currentTab === "all-initiatives" && (
              <AllInitiatives onNavigate={handleNavigate} />
            )}

            {/* Campus Connect CMS Subsections */}
            {currentTab === "add-campus-event" && (
              <AddCampusEvent onNavigate={handleNavigate} />
            )}
            {currentTab === "all-campus-events" && (
              <AllCampusEvents onNavigate={handleNavigate} />
            )}
            {currentTab === "add-pillar-footprint" && (
              <AddPillarFootprint onNavigate={handleNavigate} />
            )}
            {currentTab === "all-pillar-footprints" && (
              <AllPillarFootprints onNavigate={handleNavigate} />
            )}

            {/* Publications CMS Subsections */}
            {currentTab === "add-publication" && (
              <AddPublication onNavigate={handleNavigate} />
            )}
            {currentTab === "all-publications" && (
              <AllPublications onNavigate={handleNavigate} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
