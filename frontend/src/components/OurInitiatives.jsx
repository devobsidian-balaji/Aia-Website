import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getInitiatives } from '../services/api'

export default function OurInitiatives() {
  const [initiatives, setInitiatives] = useState([
    {
      _id: '1',
      title: 'Government Initiatives',
      information: 'AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of "Make In India" movement.',
      imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=700&h=700&fit=crop',
      link: '#',
    },
    {
      _id: '2',
      title: 'Industry Initiatives',
      information: 'AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of "Make In India" movement.',
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=700&h=700&fit=crop',
      link: '#',
    },
    {
      _id: '3',
      title: 'SAMARTH Udyog',
      information: 'AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of "Make In India" movement.',
      imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=700&h=700&fit=crop',
      link: '#',
    }
  ])
  const [startIndex, setStartIndex] = useState(0)
  const timerRef = useRef(null)

  const itemsPerPage = 3

  useEffect(() => {
    let isMounted = true
    getInitiatives().then((data) => {
      if (isMounted && data && data.length > 0) {
        setInitiatives(data.filter(i => i.isActive !== false))
      }
    }).catch(console.error)

    return () => { isMounted = false }
  }, [])

  // Auto-slide carousel every 5 seconds if more than 3 initiatives exist
  useEffect(() => {
    if (initiatives.length > itemsPerPage) {
      timerRef.current = setInterval(() => {
        setStartIndex((prev) => {
          if (prev + itemsPerPage >= initiatives.length) {
            return 0
          }
          return prev + 1
        })
      }, 5000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [initiatives.length])

  const canPrev = startIndex > 0
  const canNext = startIndex + itemsPerPage < initiatives.length

  const handlePrev = () => {
    if (canPrev) {
      setStartIndex(prev => Math.max(0, prev - 1))
    } else if (initiatives.length > itemsPerPage) {
      setStartIndex(initiatives.length - itemsPerPage)
    }
  }

  const handleNext = () => {
    if (canNext) {
      setStartIndex(prev => Math.min(initiatives.length - itemsPerPage, prev + 1))
    } else if (initiatives.length > itemsPerPage) {
      setStartIndex(0)
    }
  }

  const visibleInitiatives = initiatives.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section id="our-initiatives" className="py-24 bg-white font-sans relative overflow-hidden text-left select-none">
      
      {/* Background Micro-Grid Texture matching Image 1 */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header matching Image 1: Centered Title + Right Navigation Buttons */}
        <div className="relative flex flex-col sm:flex-row items-center justify-between mb-16 max-w-6xl mx-auto">
          <div className="sm:w-28 hidden sm:block"></div> {/* Spacer for perfect centering */}

          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight text-center">
            Our Initiatives
          </h2>

          {/* Arrow Buttons matching Image 1 */}
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-[#E37263] text-[#E37263] hover:bg-[#E37263] hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-xs"
              aria-label="Previous Initiatives"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#E37263] text-white flex items-center justify-center shadow-md hover:bg-[#d0594a] transition-all cursor-pointer active:scale-95"
              aria-label="Next Initiatives"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-Column Cards Grid matching Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto items-stretch">
          {visibleInitiatives.map((item, idx) => (
            <div
              key={item._id || idx}
              className="flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                {/* Photo Frame matching Image 1 */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-slate-100 border border-gray-200/80 group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                  />
                </div>

                {/* Title matching Image 1 */}
                <h3 className="text-xl sm:text-2xl font-black text-[#1F2937] tracking-tight group-hover:text-[#E37263] transition-colors">
                  {item.title}
                </h3>

                {/* Information Paragraph matching Image 1 */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {item.information}
                </p>
              </div>

              {/* Learn More Button matching Image 1 */}
              <div className="pt-2">
                <a
                  href={item.link || '#'}
                  className="inline-flex items-center justify-center px-6 py-2 rounded-xl border border-gray-300 bg-white text-[#1F2937] hover:border-[#E37263] hover:text-[#E37263] font-bold text-xs tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-95"
                >
                  Learn More
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
