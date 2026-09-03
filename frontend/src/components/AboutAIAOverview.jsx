import React, { useState, useEffect } from 'react'
import { getAboutContents } from '../services/api'

export default function AboutAIAOverview() {
  const [aboutCards, setAboutCards] = useState([
    {
      _id: '1',
      title: 'Introduction to',
      subtitle: 'AIA',
      description: 'Proud contributor to the Samarth Udyog Bharat 4.0 Initiative, enabling industries to adopt advanced smart technologies.',
      imageUrl: '/about-card-1.png',
    },
    {
      _id: '2',
      title: "AIA's establishment and",
      subtitle: 'purpose',
      description: 'Proud contributor to the Samarth Udyog Bharat 4.0 Initiative, creating neutral testbeds and experiential cyber-physical centers.',
      imageUrl: '/about-card-2.png',
      isFeatured: true,
    },
    {
      _id: '3',
      title: "AIA's role in the automation",
      subtitle: 'industry',
      description: 'Proud contributor to the Samarth Udyog Bharat 4.0 Initiative, connecting machine builders, system integrators, and academia.',
      imageUrl: '/about-card-3.png',
    }
  ])
  const [selectedCard, setSelectedCard] = useState('2')

  useEffect(() => {
    let isMounted = true
    getAboutContents().then((data) => {
      if (isMounted && data && data.length > 0) {
        setAboutCards(data)
        const featured = data.find(d => d.isFeatured) || data[0]
        if (featured) setSelectedCard(featured._id)
      }
    }).catch(console.error)

    return () => { isMounted = false }
  }, [])

  return (
    <section id="about-overview" className="py-24 bg-white font-sans relative overflow-hidden text-center">
      
      {/* Background Micro-Grid Texture */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight text-center mb-16">
          About AIA
        </h2>

        {/* Dynamic 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {aboutCards.map((card) => {
            const isSelected = selectedCard === card._id
            return (
              <div
                key={card._id}
                onClick={() => setSelectedCard(card._id)}
                className={`relative cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between bg-white border border-red-100/70 ${
                  isSelected ? 'ring-2 ring-[#E37263]/60 shadow-xl' : ''
                }`}
              >
                {/* If it's a pre-rendered composite image or uploaded custom card */}
                {card.imageUrl.includes('about-card-') ? (
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-auto object-cover select-none block rounded-2xl"
                  />
                ) : (
                  <div className="p-4 flex flex-col justify-between h-full space-y-4 text-left">
                    <div className="rounded-xl overflow-hidden h-48 bg-slate-100">
                      <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover rounded-xl" />
                    </div>

                    <div className="space-y-2 px-1">
                      <h3 className="text-xl font-extrabold text-[#1F2937] leading-snug">
                        {card.title} {card.subtitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-black/75 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button className={`px-6 py-2 rounded-xl text-xs font-bold transition ${
                        isSelected 
                          ? 'bg-[#E37263] text-white shadow-md' 
                          : 'border border-[#E37263] text-[#E37263] bg-white hover:bg-[#E37263] hover:text-white'
                      }`}>
                        Learn More
                      </button>
                    </div>
                  </div>
                )}

                {/* Bottom Active Stroke */}
                {(card.isFeatured || isSelected) && (
                  <div className="absolute -bottom-0.5 left-6 right-6 h-1.5 bg-[#E37263] rounded-full shadow-sm"></div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
