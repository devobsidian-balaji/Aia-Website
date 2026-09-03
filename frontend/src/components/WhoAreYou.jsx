import React, { useState } from 'react'

const personas = [
  {
    id: 'ceo',
    title: 'CEO',
    image: '/ceo-card.png',
    isImageCard: true,
  },
  {
    id: 'plant-head',
    title: 'Plant Head',
    image: '/plant-head-card.png',
    isImageCard: false,
  },
  {
    id: 'production',
    title: 'Production',
    image: '/production-card.png',
    isImageCard: false,
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    image: '/maintenance-card.png',
    isImageCard: false,
  }
]

export default function WhoAreYou() {
  const [selectedId, setSelectedId] = useState('ceo')

  return (
    <section id="who-are-you" className="py-20 bg-white text-center font-sans relative overflow-hidden">
      
      {/* Subtle Micro-Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading matching Figma */}
        <h2 className="text-4xl sm:text-5xl font-black text-[#1F2937] tracking-tight mb-14">
          Who Are You?
        </h2>

        {/* 4 Cards Grid - Dimensions: ~290px width x 550px height as per Figma */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto items-stretch">
          {personas.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center items-center ${
                selectedId === item.id ? 'ring-2 ring-[#1F2937] shadow-xl' : 'ring-1 ring-black/5'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover select-none block rounded-2xl"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
