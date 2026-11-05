// import React from 'react'
// import { Instagram, Twitter, Linkedin, MessageCircle, ChevronUp } from 'lucide-react'

// export default function Footer() {
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   return (
//     <footer id="footer" className="bg-[#294560] text-white pt-16 pb-12 font-sans text-left relative z-10">
//       <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
//         {/* Top Header Row with Logo and Slogan */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-10 border-b border-white/20">
//           <div className="flex items-center gap-3">
//             <img 
//               src="/aia-logo.png" 
//               alt="Automation Industry Association" 
//               className="h-14 sm:h-16 w-auto object-contain brightness-125 contrast-125 filter drop-shadow-md"
//             />
//           </div>

//           <div className="text-left md:text-right">
//             <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
//               Building the Future of Smart <br />
//               Manufacturing Together.
//             </h3>
//           </div>
//         </div>

//         {/* 5 Navigation Columns matching Image 2 */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12 border-b border-white/20">
          
//           {/* Column 1: About AIA */}
//           <div className="space-y-4">
//             <h4 className="text-base font-bold text-white tracking-wide">
//               About AIA
//             </h4>
//             <ul className="space-y-3 text-lg text-gray-200 font-normal">
//               <li><a href="#about" className="hover:text-white transition-colors">The Mission</a></li>
//               <li><a href="#about" className="hover:text-white transition-colors">Exec Council</a></li>
//               <li><a href="#about" className="hover:text-white transition-colors">Past Presidents</a></li>
//             </ul>
//           </div>

//           {/* Column 2: Membership */}
//           <div className="space-y-4">
//             <h4 className="text-base font-bold text-white tracking-wide">
//               Membership
//             </h4>
//             <ul className="space-y-3 text-lg text-gray-200 font-normal">
//               <li><a href="#build-factory" className="hover:text-white transition-colors">Member Directory</a></li>
//               <li><a href="#build-factory" className="hover:text-white transition-colors">Technology Providers</a></li>
//               <li><a href="#build-factory" className="hover:text-white transition-colors">System Integrators</a></li>
//             </ul>
//           </div>

//           {/* Column 3: AIA Campus */}
//           <div className="space-y-4">
//             <h4 className="text-base font-bold text-white tracking-wide">
//               AIA Campus
//             </h4>
//             <ul className="space-y-3 text-lg text-gray-200 font-normal">
//               <li><a href="#who-are-you" className="hover:text-white transition-colors">Aims & Objectives</a></li>
//               <li><a href="#who-are-you" className="hover:text-white transition-colors">Methodology</a></li>
//               <li><a href="#who-are-you" className="hover:text-white transition-colors">Visit Website</a></li>
//             </ul>
//           </div>

//           {/* Column 4: Events */}
//           <div className="space-y-4">
//             <h4 className="text-base font-bold text-white tracking-wide">
//               Events
//             </h4>
//             <ul className="space-y-3 text-lg text-gray-200 font-normal">
//               <li><a href="#announcement" className="hover:text-white transition-colors">AIA Events</a></li>
//               <li><a href="#announcement" className="hover:text-white transition-colors">Associate Events</a></li>
//               <li><a href="#announcement" className="hover:text-white transition-colors">All Events</a></li>
//             </ul>
//           </div>

//           {/* Column 5: Publication */}
//           <div className="space-y-4">
//             <h4 className="text-base font-bold text-white tracking-wide">
//               Publication
//             </h4>
//             <ul className="space-y-3 text-lg text-gray-200 font-normal">
//               <li><a href="/publication" className="hover:text-white transition-colors">Articles</a></li>
//               <li><a href="/publication" className="hover:text-white transition-colors">Case Studies</a></li>
//               <li><a href="/publication" className="hover:text-white transition-colors">Whitepapers</a></li>
//               <li><a href="/publication" className="hover:text-white transition-colors">All Publications</a></li>
//             </ul>
//           </div>

//         </div>

//         {/* Bottom Copyright and Social Icons Bar */}
//         <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
//           <div className="text-lg text-gray-300 font-medium">
//             © AIA India . All Rights Reserved 2026
//           </div>

//           {/* Circular Social Icons matching Image 2 */}
//           <div className="flex items-center gap-3">
//             {/* WhatsApp */}
//             <a 
//               href="https://whatsapp.com" 
//               target="_blank" 
//               rel="noreferrer" 
//               aria-label="WhatsApp"
//               className="w-9 h-9 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition-colors"
//             >
//               <MessageCircle className="w-4 h-4" />
//             </a>

//             {/* X (Twitter) */}
//             <a 
//               href="https://twitter.com" 
//               target="_blank" 
//               rel="noreferrer" 
//               aria-label="X Twitter"
//               className="w-9 h-9 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition-colors"
//             >
//               <Twitter className="w-4 h-4" />
//             </a>

//             {/* LinkedIn */}
//             <a 
//               href="https://linkedin.com" 
//               target="_blank" 
//               rel="noreferrer" 
//               aria-label="LinkedIn"
//               className="w-9 h-9 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition-colors text-xs font-bold"
//             >
//               in
//             </a>

//             {/* Instagram */}
//             <a 
//               href="https://instagram.com" 
//               target="_blank" 
//               rel="noreferrer" 
//               aria-label="Instagram"
//               className="w-9 h-9 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition-colors"
//             >
//               <Instagram className="w-4 h-4" />
//             </a>

//             {/* Scroll to Top Arrow */}
//             <button
//               onClick={scrollToTop}
//               aria-label="Scroll to top"
//               className="w-9 h-9 rounded-full border border-white/60 hover:border-white flex items-center justify-center text-white hover:bg-white/10 transition-colors"
//             >
//               <ChevronUp className="w-5 h-5 stroke-[2.5]" />
//             </button>
//           </div>
//         </div>

//       </div>
//     </footer>
//   )
// }




import React from "react";
import { Linkedin, ChevronUp } from "lucide-react";

const footerLinks = [
  {
    title: "About",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Exec Council", href: "/about/executive-council" },
      { label: "Past Presidents", href: "/about/past-presidents" },
      // { label: "Events", href: "/events" },
      { label: "Aims & Objectives", href: "/about/aims-objectives" },
    ],
  },
  {
    title: "Membership",
    links: [
      { label: "Member Directory", href: "/membership/member-directory" },
      { label: "Technology Providers", href: "/membership/technology-providers" },
      { label: "System Integrators", href: "/membership/system-integrators" },
    ],
  },
  {
    title: "Publication",
    links: [
      { label: "Articles", href: "/publication/articles" },
      { label: "News", href: "/publication/news" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { label: "Get in Touch", href: "/contact-us" },
      { label: "Support", href: "/contact-us#support" },
      // { label: "General Inquiries", href: "/contact-us#inquiries" },
       {label: "General Inquiries", href: "/learn-more#enquiry-form",}
    ],
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="footer"
      className="relative z-10 overflow-hidden bg-[#20466C] text-white"
    >
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(104,160,211,0.55)_0%,transparent_48%),linear-gradient(115deg,#1C3E60_0%,#234B72_55%,#24496D_100%)]" />

      {/* Subtle Grid Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
       
      />

      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-8 lg:px-12">

        {/* Top Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/25 py-9 sm:flex-row sm:items-center sm:py-10">

          {/* Logo */}
          <a href="/" className="inline-flex items-center">
            <img
              src="/aia-logo.png"
              alt="Automation Industry Association"
              className="h-12 w-auto object-contain sm:h-14"
              loading="lazy"
            />
          </a>

          {/* Tagline */}
          <p className="max-w-[270px] text-left text-lg font-semibold leading-snug text-white sm:text-right">
            Building the Future of Smart
            <br />
            Manufacturing Together.
          </p>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-white/25 py-9 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-5 lg:gap-8 lg:py-10">

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="mb-6 text-lg font-semibold tracking-wide text-white">
                {column.title}
              </h3>

              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] font-normal text-white/80 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Manufacturers */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="mb-6 text-lg font-semibold tracking-wide text-white">
              Manufacturers
            </h3>

            <div className="flex flex-col items-start gap-4 lg:items-start">
              <a
                href="/membership#join-community"
                className="text-[14px] font-semibold text-white underline underline-offset-2 transition-opacity hover:opacity-70"
              >
                Join Samarth Community
              </a>

              <a
                href="/request-form/membership"
                className="text-[14px] font-semibold text-white underline underline-offset-2 transition-opacity hover:opacity-70 lg:ml-6"
              >
                Become a Member
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col-reverse items-center justify-between gap-6 py-6 sm:flex-row sm:py-7">

          {/* Copyright */}
          <p className="text-center text-xs font-normal tracking-wide text-white/85 sm:text-left">
            © AIA . All Rights Reserved 2026
          </p>

          {/* Social & Scroll Top */}
          <div className="flex items-center gap-3">

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#234B72]"
            >
              <Linkedin size={17} strokeWidth={1.8} />
            </a>

            {/* Scroll To Top */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/80 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-[#234B72]"
            >
              <ChevronUp size={21} strokeWidth={1.8} />
            </button>

          </div>
        </div>
      </div>
    </footer>
  );
}
