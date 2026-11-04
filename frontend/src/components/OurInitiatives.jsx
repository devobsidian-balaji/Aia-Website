// import React, { useState, useEffect, useRef } from 'react'
// import { ArrowLeft, ArrowRight } from 'lucide-react'
// import { getInitiatives } from '../services/api'

// export default function OurInitiatives() {
//   const [initiatives, setInitiatives] = useState([
//     {
//       _id: '1',
//       title: 'Government Initiatives',
//       information: 'AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of "Make In India" movement.',
//       imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=700&h=700&fit=crop',
//       link: '#',
//     },
//     {
//       _id: '2',
//       title: 'Industry Initiatives',
//       information: 'AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of "Make In India" movement.',
//       imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=700&h=700&fit=crop',
//       link: '#',
//     },
//     {
//       _id: '3',
//       title: 'SAMARTH Udyog',
//       information: 'AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of "Make In India" movement.',
//       imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=700&h=700&fit=crop',
//       link: '#',
//     }
//   ])
//   const [startIndex, setStartIndex] = useState(0)
//   const timerRef = useRef(null)

//   const itemsPerPage = 3

//   useEffect(() => {
//     let isMounted = true
//     getInitiatives().then((data) => {
//       if (isMounted && data && data.length > 0) {
//         setInitiatives(data.filter(i => i.isActive !== false))
//       }
//     }).catch(console.error)

//     return () => { isMounted = false }
//   }, [])

//   // Auto-slide carousel every 5 seconds if more than 3 initiatives exist
//   useEffect(() => {
//     if (initiatives.length > itemsPerPage) {
//       timerRef.current = setInterval(() => {
//         setStartIndex((prev) => {
//           if (prev + itemsPerPage >= initiatives.length) {
//             return 0
//           }
//           return prev + 1
//         })
//       }, 5000)
//     }
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current)
//     }
//   }, [initiatives.length])

//   const canPrev = startIndex > 0
//   const canNext = startIndex + itemsPerPage < initiatives.length

//   const handlePrev = () => {
//     if (canPrev) {
//       setStartIndex(prev => Math.max(0, prev - 1))
//     } else if (initiatives.length > itemsPerPage) {
//       setStartIndex(initiatives.length - itemsPerPage)
//     }
//   }

//   const handleNext = () => {
//     if (canNext) {
//       setStartIndex(prev => Math.min(initiatives.length - itemsPerPage, prev + 1))
//     } else if (initiatives.length > itemsPerPage) {
//       setStartIndex(0)
//     }
//   }

//   const visibleInitiatives = initiatives.slice(startIndex, startIndex + itemsPerPage)

//   return (
//     <section id="our-initiatives" className="py-24 bg-white font-sans relative overflow-hidden text-left select-none">
      
//       {/* Background Micro-Grid Texture matching Image 1 */}
//       <div 
//         className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
//         style={{ backgroundImage: `url('/grid-bg.png')` }}
//       ></div>

//       <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
//         {/* Header matching Image 1: Centered Title + Right Navigation Buttons */}
//         <div className="relative flex flex-col sm:flex-row items-center justify-between mb-16 max-w-6xl mx-auto">
//           <div className="sm:w-28 hidden sm:block"></div> {/* Spacer for perfect centering */}

//           <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight text-center">
//             Our Initiatives
//           </h2>

//           {/* Arrow Buttons matching Image 1 */}
//           <div className="flex items-center gap-3 mt-4 sm:mt-0">
//             <button
//               onClick={handlePrev}
//               className="w-10 h-10 rounded-full border border-[#E37263] text-[#E37263] hover:bg-[#E37263] hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
//               aria-label="Previous Initiatives"
//             >
//               <ArrowLeft className="w-4 h-4" />
//             </button>

//             <button
//               onClick={handleNext}
//               className="w-10 h-10 rounded-full bg-[#E37263] text-white flex items-center justify-center shadow-md hover:bg-[#d0594a] transition-all cursor-pointer active:scale-95"
//               aria-label="Next Initiatives"
//             >
//               <ArrowRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         {/* 3-Column Cards Grid matching Image 1 */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto items-stretch">
//           {visibleInitiatives.map((item, idx) => (
//             <div
//               key={item._id || idx}
//               className="flex flex-col justify-between space-y-5 group"
//             >
//               <div className="space-y-4">
//                 {/* Photo Frame matching Image 1 */}
//                 <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-slate-100 border border-gray-200/80 group-hover:shadow-xl transition-all duration-300">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
//                   />
//                 </div>

//                 {/* Title matching Image 1 */}
//                 <h3 className="text-xl sm:text-2xl font-black text-[#1F2937] tracking-tight group-hover:text-[#E37263] transition-colors">
//                   {item.title}
//                 </h3>

//                 {/* Information Paragraph matching Image 1 */}
//                 <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
//                   {item.information}
//                 </p>
//               </div>

//               {/* Learn More Button matching Image 1 */}
//               <div className="pt-2">
//                 <a
//                   href={item.link || '#'}
//                   className="inline-flex items-center justify-center px-6 py-2 rounded-xl border border-gray-300 bg-white text-[#1F2937] hover:border-[#E37263] hover:text-[#E37263] font-bold text-xs tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-95"
//                 >
//                   Learn More
//                 </a>
//               </div>

//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   )
// }



import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getInitiatives } from "../services/api";

const fallbackInitiatives = [
  {
    _id: "1",
    title: "Government Initiatives",
    information:
      'AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of "Make In India" movement.',
    imageUrl:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=700&h=700&fit=crop",
    link: "#",
  },
  {
    _id: "2",
    title: "Industry Initiatives",
    information:
      "AIA participates in several industry conferences on the topic of smart automation for SMEs and industry development.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=700&h=700&fit=crop",
    link: "#",
  },
  {
    _id: "3",
    title: "SAMARTH Udyog",
    information:
      "Supporting smart manufacturing, industrial innovation and technology adoption across India.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=700&h=700&fit=crop",
    link: "#",
  },
];

export default function OurInitiatives() {
  const [initiatives, setInitiatives] = useState(fallbackInitiatives);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);
  const autoplayRef = useRef(null);
  const isInteractingRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    const fetchInitiatives = async () => {
      try {
        const data = await getInitiatives();

        if (mounted && Array.isArray(data)) {
          setInitiatives(
            data.filter((item) => item.isActive !== false)
          );
        }
      } catch (error) {
        console.error("Unable to fetch initiatives:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchInitiatives();

    return () => {
      mounted = false;
    };
  }, []);

  // Calculate card width + gap
  const getScrollAmount = () => {
    const slider = sliderRef.current;
    if (!slider) return 0;

    const card = slider.querySelector(".initiative-card");
    if (!card) return slider.clientWidth;

    const styles = window.getComputedStyle(slider);
    const gap = parseFloat(styles.columnGap) || 0;

    return card.getBoundingClientRect().width + gap;
  };

  // Update active slide based on scroll position
  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const amount = getScrollAmount();
    if (!amount) return;

    const index = Math.round(slider.scrollLeft / amount);
    setActiveIndex(index);
  };

  const scrollToStart = () => {
    sliderRef.current?.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (slider.scrollLeft >= maxScroll - 5) {
      slider.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      slider.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    if (slider.scrollLeft <= 5) {
      slider.scrollTo({
        left: slider.scrollWidth,
        behavior: "smooth",
      });
    } else {
      slider.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    }
  };

  // Autoplay
  useEffect(() => {
    if (initiatives.length <= 1) return;

    autoplayRef.current = setInterval(() => {
      if (!isInteractingRef.current) {
        handleNext();
      }
    }, 5000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [initiatives.length]);

  const pauseAutoplay = () => {
    isInteractingRef.current = true;
  };

  const resumeAutoplay = () => {
    isInteractingRef.current = false;
  };

  const pageNumber = (number) => String(number).padStart(2, "0");

  return (
    <section
      id="our-initiatives"
      className="relative w-full overflow-hidden bg-white py-12 font-sans sm:py-16 lg:py-20"
    >
      {/* Background Texture */}
      <div
        className="pointer-events-none absolute inset-0 bg-repeat opacity-20"
        style={{
          backgroundImage: "url('/grid-bg.png')",
          backgroundSize: "360px 360px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Section Heading */}
        <div className="mb-8 flex items-center justify-center sm:justify-between sm:mb-10">
          <div className="hidden sm:flex">
            <span>
              
            </span>

          </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#202B3D] sm:text-3xl lg:text-4xl">
              Upcoming Events
            </h2>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous initiatives"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E87568] text-[#E87568] transition-all duration-300 hover:bg-[#E87568] hover:text-white active:scale-95"
            >
              <ArrowLeft size={17} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next initiatives"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E87568] text-white shadow-sm transition-all duration-300 hover:bg-[#D94F42] active:scale-95"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[330px] animate-pulse rounded-xl bg-slate-100"
              />
            ))}
          </div>
        ) : initiatives.length > 0 ? (
          <>
            {/* Slider */}
            <div
              ref={sliderRef}
              onScroll={handleScroll}
              onMouseEnter={pauseAutoplay}
              onMouseLeave={resumeAutoplay}
              onTouchStart={pauseAutoplay}
              onTouchEnd={resumeAutoplay}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 scrollbar-hide sm:gap-5"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollBehavior: "smooth",
              }}
            >
              {initiatives.map((item, index) => (
                <article
                  key={item._id || index}
                  className="initiative-card group flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-gray-100 bg-[#F7F8FA] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title || "AIA Initiative"}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}

                    {/* Image Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />

                    {/* Index Badge */}
                    <span className="absolute left-3 top-3 rounded-md bg-[#202B3D]/90 px-2.5 py-1.5 text-[9px] font-bold text-white backdrop-blur-sm">
                      {pageNumber(index + 1)} / {pageNumber(initiatives.length)}
                    </span>

                    {/* Date-like Accent */}
                    <span className="absolute right-3 top-3 flex h-10 min-w-10 flex-col items-center justify-center rounded-md bg-[#E87568] px-2 text-white shadow-md">
                      <span className="text-sm font-extrabold leading-none">
                        {pageNumber(index + 1)}
                      </span>
                      <span className="mt-0.5 text-[8px] font-semibold uppercase">
                        AIA
                      </span>
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-4 sm:p-4 lg:p-5">
                    <span className="mb-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#E87568]">
                      AIA Initiatives
                    </span>

                    <h3 className="mb-2 line-clamp-2 text-base font-extrabold leading-snug text-[#202B3D] transition-colors duration-300 group-hover:text-[#E87568] sm:text-lg">
                      {item.title}
                    </h3>

                    <p className="mb-4 line-clamp-3 text-[11px] leading-[1.7] text-gray-600 sm:text-xs">
                      {item.information || item.description}
                    </p>

                    {/* CTA */}
                    <div className="mt-auto pt-1">
                      <a
                        href={item.link || "#"}
                        target={
                          item.link?.startsWith("/")
                            ? undefined
                            : "_blank"
                        }
                        rel={
                          item.link?.startsWith("/")
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#D9402C] to-[#F0786D] px-4 py-2 text-[10px] font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
                      >
                        View Initiative
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom Navigation */}
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-[#202B3D]">
                <span className="font-extrabold tabular-nums">
                  {pageNumber(activeIndex + 1)}
                </span>

                <span className="text-gray-400">/</span>

                <span className="text-gray-500">
                  {pageNumber(initiatives.length)}
                </span>
              </div>

              {/* Mobile Navigation */}
              <div className="flex items-center gap-2 sm:hidden">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous initiative"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E87568] text-[#E87568] active:scale-95"
                >
                  <ArrowLeft size={16} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next initiative"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E87568] text-white active:scale-95"
                >
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Progress Indicators */}
              <div className="hidden items-center gap-1.5 sm:flex">
                {initiatives.map((item, index) => (
                  <button
                    key={item._id || index}
                    type="button"
                    aria-label={`Go to initiative ${index + 1}`}
                    onClick={() => {
                      const slider = sliderRef.current;
                      if (!slider) return;

                      slider.scrollTo({
                        left: index * getScrollAmount(),
                        behavior: "smooth",
                      });
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? "w-7 bg-[#E87568]"
                        : "w-1.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-xl bg-[#F7F8FA] px-5 py-16 text-center">
            <p className="text-sm text-gray-500">
              No initiatives available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
