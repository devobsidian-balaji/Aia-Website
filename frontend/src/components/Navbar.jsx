import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Mail, Instagram, Twitter, Linkedin, Search, Menu, X, ShieldCheck } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const path = location.pathname

  const isHomeActive = path === '/' || path === '/home'
  const isAboutActive = path.startsWith('/about')
  const isIafsmActive = path.startsWith('/iafsm') || path.startsWith('/ifsm')
  const isCampusActive = path.startsWith('/campus-connect')
  const isEventsActive = path.startsWith('/events') || path.startsWith('/event')

  const closeMobile = () => setMobileMenuOpen(false)

  return (
    <header className="w-full bg-[#0B131E] text-white font-sans z-50 relative border-b border-white/5">
      {/* Top Header Contact, Social & Admin Strip */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-2 flex items-center justify-between text-xs text-gray-300 border-b border-white/5">
        <a 
          href="mailto:info@aia-india.org" 
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-medium tracking-wide">info@aia-india.org</span>
        </a>

        {/* Right Side Social & Admin Button */}
        <div className="flex items-center gap-4">
          
          {/* Admin CMS Direct Shortcut */}
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/30 hover:bg-blue-600 border border-blue-400/40 text-blue-200 hover:text-white transition text-[11px] font-bold"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin CMS</span>
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram"
              className="w-5 h-5 rounded-full border border-gray-400/40 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors"
            >
              <Instagram className="w-3 h-3" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="X Twitter"
              className="w-5 h-5 rounded-full border border-gray-400/40 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors"
            >
              <Twitter className="w-3 h-3" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn"
              className="w-5 h-5 rounded-full border border-gray-400/40 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors text-[10px] font-bold"
            >
              in
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        {/* AIA Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group"
        >
          <img 
            src="/aia-logo.png" 
            alt="Automation Industry Association (AIA)" 
            className="h-10 sm:h-12 w-auto object-contain brightness-125 contrast-125 filter drop-shadow-md cursor-pointer"
          />
        </Link>

        {/* Center Nav Links with real URLs */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-medium text-gray-300">
          
          {/* Home Link (/) */}
          <div className="relative flex flex-col items-center">
            <Link 
              to="/"
              className={`py-1 transition-colors ${
                isHomeActive ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              Home
            </Link>
            {isHomeActive && (
              <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
            )}
          </div>

          {/* About AIA Link (/about) */}
          <div className="relative flex flex-col items-center">
            <Link 
              to="/about"
              className={`py-1 transition-colors ${
                isAboutActive ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              About AIA
            </Link>
            {isAboutActive && (
              <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
            )}
          </div>

          {/* IAFSM Link (/iafsm) */}
          <div className="relative flex flex-col items-center">
            <Link 
              to="/iafsm"
              className={`py-1 transition-colors ${
                isIafsmActive ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              IAFSM
            </Link>
            {isIafsmActive && (
              <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
            )}
          </div>

          {/* Campus Connect Link (/campus-connect) */}
          <div className="relative flex flex-col items-center">
            <Link 
              to="/campus-connect"
              className={`py-1 transition-colors ${
                isCampusActive ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              Campus Connect
            </Link>
            {isCampusActive && (
              <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
            )}
          </div>

          {/* Events Link (/events or /event) */}
          <div className="relative flex flex-col items-center">
            <Link 
              to="/events"
              className={`py-1 transition-colors ${
                isEventsActive ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              Events
            </Link>
            {isEventsActive && (
              <span className="w-3.5 h-[3px] bg-white rounded-full mt-0.5"></span>
            )}
          </div>

          <a href="/#services" className="hover:text-white transition-colors py-1">
            Services
          </a>
          
          <a href="/#dashboard" className="hover:text-white transition-colors py-1">
            Publication
          </a>
          
          <a href="/#footer" className="hover:text-white transition-colors py-1">
            Contact Us
          </a>
        </div>

        {/* Right Actions: Join Now + Circular Search */}
        <div className="hidden sm:flex items-center gap-3">
          <a 
            href="/#build-factory"
            className="px-5 py-2 rounded-lg bg-white text-[#E25238] font-bold text-xs tracking-wide shadow-md hover:bg-gray-50 transition-all hover:scale-105 active:scale-95"
          >
            Join Now
          </a>

          <button 
            aria-label="Search"
            className="w-8 h-8 rounded-full bg-[#E25238] hover:bg-[#d0462e] text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Search className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown with real Links */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pt-2 pb-6 bg-[#0B131E] border-b border-white/10 space-y-2 text-left">
          <Link 
            to="/" 
            onClick={closeMobile}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
              isHomeActive ? 'font-semibold text-white bg-white/10' : 'text-gray-300 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            onClick={closeMobile}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
              isAboutActive ? 'font-semibold text-white bg-white/10' : 'text-gray-300 hover:text-white'
            }`}
          >
            About AIA
          </Link>
          <Link 
            to="/iafsm" 
            onClick={closeMobile}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
              isIafsmActive ? 'font-semibold text-white bg-white/10' : 'text-gray-300 hover:text-white'
            }`}
          >
            IAFSM
          </Link>
          <Link 
            to="/campus-connect" 
            onClick={closeMobile}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
              isCampusActive ? 'font-semibold text-white bg-white/10' : 'text-gray-300 hover:text-white'
            }`}
          >
            Campus Connect
          </Link>
          <Link 
            to="/events" 
            onClick={closeMobile}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
              isEventsActive ? 'font-semibold text-white bg-white/10' : 'text-gray-300 hover:text-white'
            }`}
          >
            Events
          </Link>
          <Link 
            to="/admin" 
            onClick={closeMobile}
            className="block w-full text-left px-3 py-2 rounded-lg text-sm text-blue-300 hover:text-white font-bold"
          >
            Admin CMS Dashboard
          </Link>
          <div className="pt-3 border-t border-white/10 flex items-center gap-3">
            <a href="/#build-factory" onClick={closeMobile} className="flex-1 py-2.5 text-center text-xs font-bold text-[#E25238] bg-white rounded-lg shadow">
              Join Now
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
