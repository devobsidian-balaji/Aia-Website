import React, { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getPastPresidents } from '../services/api'

export default function PastPresidents() {
  const [presidents, setPresidents] = useState([
    {
      _id: 'p1',
      name: 'Mr. P Sivaram',
      term: 'Past President 2016-2018',
      role: 'Past President',
      description: 'Mr. Sivaram He has nearly forty years of work experience, most notably having served as the MD of B&R Industrial Automation India, for over 20 years, which he founded in 1996.',
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces',
    },
    {
      _id: 'p2',
      name: 'Mr. Dilip Sawhney',
      term: 'Past President 2014-2016',
      role: 'Past President',
      description: 'Mr Sawhney has more than 27 years of experience in Industrial Automation & Healthcare technology industry. He has been an elected member of the National Council of CII.',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces',
    },
    {
      _id: 'p3',
      name: 'Mr. K Nandakumar',
      term: 'Past President 2012-2014',
      role: 'Past President',
      description: "Mr. K. Nandakumar is the Founder and Managing Director of the Chemtrols Group. Started in 1975, Chemtrols is one of India's Leading Solutions Provider in Process Analytics.",
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    }
  ])
  const [startIndex, setStartIndex] = useState(0)
  const [selectedBio, setSelectedBio] = useState(null)

  useEffect(() => {
    let isMounted = true
    getPastPresidents().then((data) => {
      if (isMounted && data && data.length > 0) {
        setPresidents(data.filter(p => p.isActive !== false))
      }
    }).catch(console.error)

    return () => { isMounted = false }
  }, [])

  const itemsPerPage = 3
  const canPrev = startIndex > 0
  const canNext = startIndex + itemsPerPage < presidents.length

  const handlePrev = () => {
    if (canPrev) setStartIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    if (canNext) setStartIndex(prev => Math.min(presidents.length - itemsPerPage, prev + 1))
  }

  const visiblePresidents = presidents.slice(startIndex, startIndex + itemsPerPage)

  return (
    <section id="past-presidents" className="py-24 bg-white font-sans relative overflow-hidden text-center">
      
      {/* Background Micro-Grid Texture */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header matching Image 1: Centered Title + Right Navigation Buttons */}
        <div className="relative flex flex-col sm:flex-row items-center justify-between mb-16 max-w-6xl mx-auto">
          <div className="sm:w-28 hidden sm:block"></div> {/* Spacer for perfect centering */}
          
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight">
            AIA Past Presidents
          </h2>

          {/* Carousel Arrow Controls matching Image 1 */}
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <button
              onClick={handlePrev}
              disabled={!canPrev}
              className={`w-10 h-10 rounded-full border border-[#E37263] flex items-center justify-center transition-all ${
                canPrev 
                  ? 'text-[#E37263] hover:bg-[#E37263] hover:text-white cursor-pointer active:scale-95' 
                  : 'text-[#E37263]/40 border-[#E37263]/40 cursor-not-allowed'
              }`}
              aria-label="Previous Presidents"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              disabled={!canNext}
              className={`w-10 h-10 rounded-full bg-[#E37263] text-white flex items-center justify-center shadow-md transition-all ${
                canNext 
                  ? 'hover:bg-[#d0594a] cursor-pointer active:scale-95' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
              aria-label="Next Presidents"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Circular Portrait Cards matching Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">
          {visiblePresidents.map((president, idx) => (
            <div 
              key={president._id || idx}
              className="flex flex-col items-center text-center space-y-5 group"
            >
              {/* Circular Portrait with Orange/Coral Border Ring matching Image 1 */}
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full p-2 border-2 border-[#E37263] shadow-md group-hover:scale-105 transition-transform duration-300 bg-white">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={president.imageUrl}
                    alt={president.name}
                    className="w-full h-full object-cover select-none"
                  />
                </div>
              </div>

              {/* Name matching Image 1 */}
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-[#1F2937] tracking-tight">
                  {president.name}
                </h3>
                
                {/* Term in Coral font */}
                <div className="text-xs sm:text-sm font-bold text-[#E37263]">
                  ({president.term})
                </div>
              </div>

              {/* Bio Description */}
              <p className="text-xs sm:text-sm text-black/75 leading-relaxed font-normal max-w-sm">
                {president.description}
              </p>

              {/* Read More Link matching Image 1 */}
              <div>
                <button
                  onClick={() => setSelectedBio(president)}
                  className="text-xs font-bold text-[#E37263] underline underline-offset-4 hover:text-[#d0594a] transition-colors"
                >
                  Read More
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Bio Modal */}
      {selectedBio && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 text-center space-y-4 shadow-2xl border border-gray-200">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#E37263] mx-auto shadow-md">
              <img src={selectedBio.imageUrl} alt={selectedBio.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-[#1F2937]">{selectedBio.name}</h3>
              <p className="text-sm font-bold text-[#E37263]">({selectedBio.term})</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed text-left">
              {selectedBio.description}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setSelectedBio(null)}
                className="px-6 py-2.5 rounded-xl bg-[#E37263] text-white text-xs font-bold shadow hover:bg-[#d0594a] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}
