// import React, { useState } from 'react'
// import { Link, NavLink, useLocation } from 'react-router-dom'
// import { Mail, Instagram, Twitter, Linkedin, Search, Menu, X, ShieldCheck } from 'lucide-react'

// export default function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const location = useLocation()
//   const path = location.pathname

//   const isHomeActive = path === '/' || path === '/home'
//   const isAboutActive = path.startsWith('/about')
//   const isMembershipActive = path.startsWith('/membership')
//   const isIafsmActive = path.startsWith('/iafsm') || path.startsWith('/ifsm')
//   const isCampusActive = path.startsWith('/campus-connect')
//   const isEventsActive = path.startsWith('/events') || path.startsWith('/event')
//   const isPublicationActive = path.startsWith('/publication')
//   const isIndustryInsight = path.startsWith('/industry-insight')
//   const isTalentConnect = path.startsWith('/talent-connect')
//   const isContactUsActive = path.startsWith('/contact-us')

//   const closeMobile = () => setMobileMenuOpen(false)

//   return (
//     <header className="w-full bg-[#0B131E] text-white font-sans z-50 relative border-b border-white/5">
//       {/* Top Header Contact, Social & Admin Strip */}
//       <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-2 flex items-center justify-between text-xs text-gray-300 border-b border-white/5">
//         <a 
//           href="mailto:info@aia.org" 
//           className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
//         >
//           <Mail className="w-3.5 h-3.5 text-gray-400" />
//           <span className="font-medium tracking-wide">info@aia.org</span>
//         </a>

//         {/* Right Side Social & Admin Button */}
//         <div className="flex items-center gap-4">
          
//           {/* Admin CMS Direct Shortcut */}
//           <Link
//             to="/admin"
//             className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/30 hover:bg-blue-600 border border-blue-400/40 text-blue-200 hover:text-white transition text-[11px] font-bold"
//           >
//             <ShieldCheck className="w-3.5 h-3.5" />
//             <span>Admin CMS</span>
//           </Link>

//           {/* Social Icons */}
//           <div className="flex items-center gap-2">
//             <a 
//               href="https://instagram.com" 
//               target="_blank" 
//               rel="noreferrer" 
//               aria-label="Instagram"
//               className="w-5 h-5 rounded-full border border-gray-400/40 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors"
//             >
//               <Instagram className="w-3 h-3" />
//             </a>
//             <a 
//               href="https://twitter.com" 
//               target="_blank" 
//               rel="noreferrer" 
//               aria-label="X Twitter"
//               className="w-5 h-5 rounded-full border border-gray-400/40 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors"
//             >
//               <Twitter className="w-3 h-3" />
//             </a>
//             <a 
//               href="https://linkedin.com" 
//               target="_blank" 
//               rel="noreferrer" 
//               aria-label="LinkedIn"
//               className="w-5 h-5 rounded-full border border-gray-400/40 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors text-[10px] font-bold"
//             >
//               in
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Main Navbar */}
//       <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
//         {/* AIA Logo */}
//         <Link 
//           to="/" 
//           className="flex items-center gap-3 group"
//         >
//           <img 
//             src="/aia-logo.png" 
//             alt="Automation Industry Association (AIA)" 
//             className="h-10 sm:h-12 w-auto object-contain brightness-125 contrast-125 filter drop-shadow-md cursor-pointer"
//           />
//         </Link>

//         {/* Center Nav Links with real URLs */}
//         <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-medium text-gray-300">
          
//           {/* Home Link (/) */}
//           <div className="relative flex flex-col items-center">
//             <Link 
//               to="/"
//               className={`py-1 transition-colors ${
//                 isHomeActive ? 'text-white font-semibold' : 'hover:text-white'
//               }`}
//             >
//               Home
//             </Link>
//             {isHomeActive && (
//               <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
//             )}
//           </div>

//           {/* About AIA Link (/about) */}
//           <div className="relative flex flex-col items-center">
//             <Link 
//               to="/about"
//               className={`py-1 transition-colors ${
//                 isAboutActive ? 'text-white font-semibold' : 'hover:text-white'
//               }`}
//             >
//               About AIA
//             </Link>
//             {isAboutActive && (
//               <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
//             )}
//           </div>

//           {/* Membership Link (/) */}
//           <div className="relative flex flex-col items-center">
//             {/* <Link to="/membership" >MemberShip</Link> */}
//            <Link 
//               to="/membership"
//               className={`py-1 transition-colors ${
//                 isMembershipActive ? 'text-white font-semibold' : 'hover:text-white'
//               }`}
//             >
//               Membership
//             </Link>
//             {isMembershipActive && (
//               <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
//             )}
//           </div>
//           {/* Industry Insight Link (/) */}
//           <div className="relative flex flex-col items-center">
//             {/* <Link to="/industry-insight" >Industry Insight</Link> */}
//            <Link 
//               to="/industry-insight"
//               className={`py-1 transition-colors ${
//                 isIndustryInsight ? 'text-white font-semibold' : 'hover:text-white'
//               }`}
//             >
//               Industry Insight
//             </Link>
//             {isIndustryInsight && (
//               <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
//             )}
//           </div>
//           {/* Talent Connect Link (/) */}
//           <div className="relative flex flex-col items-center">
//             {/* <Link to="/talent-connect" >Talent Connect</Link> */}
//            <Link 
//               to="/talent-connect"
//               className={`py-1 transition-colors ${
//                 isTalentConnect ? 'text-white font-semibold' : 'hover:text-white'
//               }`}
//             >
//               Talent Connect
//             </Link>
//             {isTalentConnect && (
//               <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
//             )}
//           </div>

//           {/* IAFSM Link (/iafsm) */}
//           {/* <div className="relative flex flex-col items-center">
//             <Link 
//               to="/iafsm"
//               className={`py-1 transition-colors ${
//                 isIafsmActive ? 'text-white font-semibold' : 'hover:text-white'
//               }`}
//             >
//               IAFSM
//             </Link>
//             {isIafsmActive && (
//               <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
//             )}
//           </div> */}

//           {/* Campus Connect Link (/campus-connect) */}
//           {/* <div className="relative flex flex-col items-center">
//             <Link 
//               to="/campus-connect"
//               className={`py-1 transition-colors ${
//                 isCampusActive ? 'text-white font-semibold' : 'hover:text-white'
//               }`}
//             >
//               Campus Connect
//             </Link>
//             {isCampusActive && (
//               <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
//             )}
//           </div> */}

//           {/* Events Link (/events or /event) */}
//           <div className="relative flex flex-col items-center">
//             <Link 
//               to="/events"
//               className={`py-1 transition-colors ${
//                 isEventsActive ? 'text-white font-semibold' : 'hover:text-white'
//               }`}
//             >
//               Events
//             </Link>
//             {isEventsActive && (
//               <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
//             )}
//           </div>

//           {/* Publication Link (/publication or /publications) */}
//           {/* <div className="relative flex flex-col items-center">
//             <Link 
//               to="/publication"
//               className={`py-1 transition-colors ${
//                 isPublicationActive ? 'text-white font-semibold' : 'hover:text-white'
//               }`}
//             >
//               Publication
//             </Link>
//             {isPublicationActive && (
//               <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
//             )}
//           </div> */}

//           {/* <a href="/#services" className="hover:text-white transition-colors py-1">
//             Services
//           </a> */}
//            <div className="relative flex flex-col items-center">
//             <Link 
//               to="/contact-us"
//               className={`py-1 transition-colors ${
//                 isContactUsActive ? 'text-white font-semibold' : 'hover:text-white'
//               }`}
//             >
//               Contact Us
//             </Link>
//             {isContactUsActive && (
//               <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
//             )}
//           </div>
          
//           {/* <a href="/ContactUsPage" className="hover:text-white transition-colors py-1">
//             Contact Us
//           </a> */}
//         </div>

//         {/* Right Actions: Join Now + Circular Search */}
//         <div className="hidden sm:flex items-center gap-3">
//           <a 
//             href="/#build-factory"
//             className="px-5 py-2 rounded-lg bg-white text-[#E25238] font-bold text-xs tracking-wide shadow-md hover:bg-gray-50 transition-all hover:scale-105 active:scale-95"
//           >
//             Join Now
//           </a>

//           <button 
//             aria-label="Search"
//             className="w-8 h-8 rounded-full bg-[#E25238] hover:bg-[#d0462e] text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95"
//           >
//             <Search className="w-3.5 h-3.5 stroke-[2.5]" />
//           </button>
//         </div>

//         {/* Mobile Hamburger Button */}
//         <div className="flex lg:hidden items-center gap-2">
//           <button 
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Toggle Navigation Menu"
//             className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
//           >
//             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu Dropdown with real Links */}
//       {mobileMenuOpen && (
//         <div className="lg:hidden px-6 pt-2 pb-6 bg-[#0B131E] border-b border-white/10 space-y-2 text-left">
//           <Link 
//             to="/" 
//             onClick={closeMobile}
//             className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
//               isHomeActive ? 'font-semibold text-white bg-white/10' : 'text-gray-300 hover:text-white'
//             }`}
//           >
//             Home
//           </Link>
//           <Link 
//             to="/about" 
//             onClick={closeMobile}
//             className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
//               isAboutActive ? 'font-semibold text-white bg-white/10' : 'text-gray-300 hover:text-white'
//             }`}
//           >
//             About AIA
//           </Link>
//           <Link 
//             to="/iafsm" 
//             onClick={closeMobile}
//             className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
//               isIafsmActive ? 'font-semibold text-white bg-white/10' : 'text-gray-300 hover:text-white'
//             }`}
//           >
//             IAFSM
//           </Link>
//           <Link 
//             to="/campus-connect" 
//             onClick={closeMobile}
//             className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
//               isCampusActive ? 'font-semibold text-white bg-white/10' : 'text-gray-300 hover:text-white'
//             }`}
//           >
//             Campus Connect
//           </Link>
//           <Link 
//             to="/events" 
//             onClick={closeMobile}
//             className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
//               isEventsActive ? 'font-semibold text-white bg-white/10' : 'text-gray-300 hover:text-white'
//             }`}
//           >
//             Events
//           </Link>
//           <Link 
//             to="/publication" 
//             onClick={closeMobile}
//             className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
//               isPublicationActive ? 'font-semibold text-white bg-white/10' : 'text-gray-300 hover:text-white'
//             }`}
//           >
//             Publication
//           </Link>
//           <Link 
//             to="/admin" 
//             onClick={closeMobile}
//             className="block w-full text-left px-3 py-2 rounded-lg text-sm text-blue-300 hover:text-white font-bold"
//           >
//             Admin CMS Dashboard
//           </Link>
//           <div className="pt-3 border-t border-white/10 flex items-center gap-3">
//             <a href="/#build-factory" onClick={closeMobile} className="flex-1 py-2.5 text-center text-xs font-bold text-[#E25238] bg-white rounded-lg shadow">
//               Join Now
//             </a>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }


import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Mail,
  Instagram,
  Twitter,
  Linkedin,
  Search,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

/* =========================================
   NAVIGATION DATA
========================================= */

const navigation = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "About AIA",
    to: "/about",
    children: [
      { label: "About Us", to: "/about" },
      { label: "Exec Council", to: "/about/executive-council" },
      { label: "Past Presidents", to: "/about/past-presidents" },
      // { label: "Events", to: "/event" },
      { label: "aims-objectives", to: "/about/aims-objectives" },
    ],
  },
  {
    label: "Membership",
    to: "/membership",
    children: [
      { label: "Member Directory", to: "/membership/member-directory" },
      { label: "Technology Providers", to: "/technology-providers-signup" },
      { label: "System Integrators", to: "/system-integrators-signup" },
    ],
  },
  {
    label: "Industry Insights",
    to: "/industry-insight",
  },
  {
    label: "Talent Connect",
    to: "/talent-connect",
  },
  {
    label: "Events",
    to: "/events",
  },
  // {
  //   label: "Publication",
  //   to: "/publication",
  //   children: [
  //     { label: "Articles", to: "/publication/articles" },
  //     { label: "News", to: "/publication/news" },
  //   ],
  // },
  {
    label: "Contact Us",
    to: "/contact-us",
    children: [
      { label: "Get in Touch", to: "/contact-us" },
      { label: "Support", to: "/support" },
      {label: "General Inquiries", to: "/learn-more#enquiry-form",}
    ],
  },
  // {
  //   label: "Manufacturers",
  //   to: "/manufacturers",
  //   children: [
  //     { label: "Join Samarth Community", to: "/samarth-community" },
  //     { label: "Become a Member", to: "/membership" },
  //   ],
  // },
];

/* =========================================
   NAVBAR
========================================= */

export default function Navbar() {
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const currentPath = location.pathname;

  // const isActive = (to) => {
  //   if (!to) return false;

  //   const path = to.split("#")[0];

  //   if (path === "/") return currentPath === "/";

  //   return currentPath === path || currentPath.startsWith(`${path}/`);
  // };

  const isActive = (to) => {
  if (!to) return false;

  const path = to.split("#")[0];

  return currentPath === path;
};

const isDropdownActive = (item) => {
  if (!item.children?.length) {
    return isActive(item.to);
  }

  return item.children.some((child) => isActive(child.to));
};

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
  };

  const toggleMobileDropdown = (label) => {
    setMobileDropdown((current) =>
      current === label ? null : label
    );
  };

  return (
    <header className="relative z-50 w-full border-b border-white/10 bg-[#0B131E] font-sans text-white">

      {/* =====================================
          TOP HEADER
      ===================================== */}

      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 sm:px-8 lg:px-12">

          <a
            href="mailto:info@aia.org"
            className="flex items-center gap-2 text-[11px] text-gray-300 transition hover:text-white"
          >
            <Mail size={14} />
            <span>info@aia.org</span>
          </a>

          <div className="flex items-center gap-3 sm:gap-4">

            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/40 bg-blue-600/20 px-3 py-1 text-[10px] font-semibold text-blue-200 transition hover:bg-blue-600 hover:text-white"
            >
              <ShieldCheck size={13} />
              Admin CMS
            </Link>

            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-gray-300 transition hover:border-white hover:text-white"
              >
                <Instagram size={12} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-gray-300 transition hover:border-white hover:text-white"
              >
                <Twitter size={12} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-[10px] font-bold text-gray-300 transition hover:border-white hover:text-white"
              >
                in
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* =====================================
          MAIN NAVBAR
      ===================================== */}

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-12">

        {/* Logo */}
        <Link to="/" onClick={closeMobile} className="shrink-0">
          <img
            src="/aia-logo.png"
            alt="Automation Industry Association"
            className="h-10 w-auto object-contain sm:h-12"
          />
        </Link>

        {/* Desktop Navigation */}

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-5 xl:flex">
        <div className="hidden items-center gap-5 text-[11px] font-medium text-gray-300 xl:flex 2xl:gap-5">

          {navigation.map((item) => {
            const active = isDropdownActive(item);

            return (
              <div
                key={item.label}
                className="group relative flex h-full items-center"
              >

                {/* Parent Link */}
                <Link
                  to={item.to}
                  className={`relative flex items-center gap-1 whitespace-nowrap py-5 transition-colors duration-200 text-[13px] ${
                    active
                      ? "font-semibold text-[#F16B5E]"
                      : "hover:text-white"
                  }`}
                >
                  {item.label}

                  {item.children && (
                    <ChevronDown
                      size={12}
                      className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                    />
                  )}
                </Link>

                {/* Active Underline */}
                {active && (
                  <span className="absolute bottom-3 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-[#E87565]" />
                )}

                {/* Dropdown */}
                {item.children && (
                 <div className="invisible absolute left-0 top-full z-[100] w-[205px] translate-y-2 rounded-b-md border border-white/10 bg-[#252522]/95 p-1.5 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                    <div className="flex flex-col gap-0.5">
                      {item.children.map((child) => {
                        const childActive = isActive(child.to);

                        return (
                          <Link
                            key={child.label}
                            to={child.to}
                            className={`rounded px-3 py-2.5 text-[11px] transition-all duration-200 ${
                              childActive
                                ? "bg-white text-[#E87565]"
                                : "text-white hover:bg-white hover:text-[#E87565]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>

                  </div>
                )}

              </div>
            );
          })}

        </div>

          {/* <Link
            to="/membership"
            className="rounded-md bg-white px-4 py-2 text-[11px] font-bold text-[#E25238] shadow-sm transition hover:scale-105 hover:bg-gray-100"
          >
            Join Now
          </Link> */}

          <button
            type="button"
            aria-label="Search"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E25238] text-white transition hover:scale-105 hover:bg-[#d0462e]"
          >
            <Search size={14} />
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
          className="rounded-lg p-2 text-white transition hover:bg-white/10 xl:hidden"
        >
          {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

      </nav>

      {/* =====================================
          MOBILE NAVIGATION
      ===================================== */}

      {mobileMenuOpen && (
        <div className="absolute left-0 top-full z-[100] max-h-[calc(100vh-70px)] w-full overflow-y-auto border-t border-white/10 bg-[#0B131E] px-5 pb-6 pt-3 shadow-2xl xl:hidden">

          <div className="mx-auto max-w-7xl">

            {navigation.map((item) => {
              const active = isDropdownActive(item);
              const expanded = mobileDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="border-b border-white/10"
                >

                  <div className="flex items-center justify-between">

                    <Link
                      to={item.to}
                      onClick={closeMobile}
                      className={`flex-1 py-3 text-sm transition-colors ${
                        active
                          ? "font-semibold text-[#F16B5E]"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>

                    {item.children && (
                      <button
                        type="button"
                        onClick={() => toggleMobileDropdown(item.label)}
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={expanded}
                        className="p-3 text-gray-300 hover:text-white"
                      >
                        <ChevronDown
                          size={17}
                          className={`transition-transform duration-300 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}

                  </div>

                  {/* Mobile Submenu */}
                  {item.children && expanded && (
                    <div className="mb-3 ml-3 flex flex-col border-l border-[#E87565]/50 pl-3">

                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.to}
                          onClick={closeMobile}
                          className={`rounded-md px-3 py-2.5 text-xs transition-colors ${
                            isActive(child.to)
                              ? "bg-white text-[#E87565]"
                              : "text-gray-400 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}

                    </div>
                  )}

                </div>
              );
            })}

            {/* Mobile Actions */}
            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/membership"
                onClick={closeMobile}
                className="rounded-md bg-white px-4 py-3 text-center text-xs font-bold text-[#E25238]"
              >
                Join Now
              </Link>

              <Link
                to="/admin"
                onClick={closeMobile}
                className="flex items-center justify-center gap-2 rounded-md border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-xs font-semibold text-blue-200"
              >
                <ShieldCheck size={15} />
                Admin CMS
              </Link>

            </div>

          </div>
        </div>
      )}

    </header>
  );
}

