import React from 'react'
import { Instagram, Twitter, Linkedin, MessageCircle, ChevronUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="footer" className="bg-[#294560] text-white pt-16 pb-12 font-sans text-left relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top Header Row with Logo and Slogan */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-10 border-b border-white/20">
          <div className="flex items-center gap-3">
            <img 
              src="/aia-logo.png" 
              alt="Automation Industry Association" 
              className="h-14 sm:h-16 w-auto object-contain brightness-125 contrast-125 filter drop-shadow-md"
            />
          </div>

          <div className="text-left md:text-right">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              Building the Future of Smart <br />
              Manufacturing Together.
            </h3>
          </div>
        </div>

        {/* 5 Navigation Columns matching Image 2 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12 border-b border-white/20">
          
          {/* Column 1: About AIA */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white tracking-wide">
              About AIA
            </h4>
            <ul className="space-y-3 text-sm text-gray-200 font-normal">
              <li><a href="#about" className="hover:text-white transition-colors">The Mission</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Exec Council</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Past Presidents</a></li>
            </ul>
          </div>

          {/* Column 2: Membership */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white tracking-wide">
              Membership
            </h4>
            <ul className="space-y-3 text-sm text-gray-200 font-normal">
              <li><a href="#build-factory" className="hover:text-white transition-colors">Member Directory</a></li>
              <li><a href="#build-factory" className="hover:text-white transition-colors">Technology Providers</a></li>
              <li><a href="#build-factory" className="hover:text-white transition-colors">System Integrators</a></li>
            </ul>
          </div>

          {/* Column 3: AIA Campus */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white tracking-wide">
              AIA Campus
            </h4>
            <ul className="space-y-3 text-sm text-gray-200 font-normal">
              <li><a href="#who-are-you" className="hover:text-white transition-colors">Aims & Objectives</a></li>
              <li><a href="#who-are-you" className="hover:text-white transition-colors">Methodology</a></li>
              <li><a href="#who-are-you" className="hover:text-white transition-colors">Visit Website</a></li>
            </ul>
          </div>

          {/* Column 4: Events */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white tracking-wide">
              Events
            </h4>
            <ul className="space-y-3 text-sm text-gray-200 font-normal">
              <li><a href="#announcement" className="hover:text-white transition-colors">AIA Events</a></li>
              <li><a href="#announcement" className="hover:text-white transition-colors">Associate Events</a></li>
              <li><a href="#announcement" className="hover:text-white transition-colors">All Events</a></li>
            </ul>
          </div>

          {/* Column 5: Publication */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white tracking-wide">
              Publication
            </h4>
            <ul className="space-y-3 text-sm text-gray-200 font-normal">
              <li><a href="/publication" className="hover:text-white transition-colors">Articles</a></li>
              <li><a href="/publication" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="/publication" className="hover:text-white transition-colors">Whitepapers</a></li>
              <li><a href="/publication" className="hover:text-white transition-colors">All Publications</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright and Social Icons Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-300 font-medium">
            © AIA India . All Rights Reserved 2026
          </div>

          {/* Circular Social Icons matching Image 2 */}
          <div className="flex items-center gap-3">
            {/* WhatsApp */}
            <a 
              href="https://whatsapp.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* X (Twitter) */}
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="X Twitter"
              className="w-9 h-9 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition-colors text-xs font-bold"
            >
              in
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Scroll to Top Arrow */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-9 h-9 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronUp className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  )
}
