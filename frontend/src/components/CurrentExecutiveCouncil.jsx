
import React, { useState, useEffect } from 'react'
import { getCouncilMembers } from '../services/api'

export default function CurrentExecutiveCouncil() {
  const [members, setMembers] = useState([
    {
      _id: 'c1',
      name: 'Sunil Mehta',
      role: 'President',
      fullRole: 'General Manager - FA & ID',
      companyName: 'Mitsubishi Electric India Pvt Ltd',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=faces',
    },
    {
      _id: 'c2',
      name: 'Kalyan Ram',
      role: 'Vice President',
      fullRole: 'Founder & CEO',
      companyName: 'Indxo India Private Limited',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=faces',
    },
    {
      _id: 'c3',
      name: 'Ravi Agarwal',
      role: 'Immediate Past President',
      fullRole: 'Managing Director',
      companyName: 'Pepperl+Fuchs Factory Automation',
      imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=faces',
    },
    {
      _id: 'c4',
      name: 'Dilip Sawhney',
      role: 'Past President',
      fullRole: 'Managing Director - India',
      companyName: 'Rockwell Automation India',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=faces',
    },
    {
      _id: 'c5',
      name: 'Sameer Gandhi',
      role: 'Member',
      fullRole: 'Managing Director',
      companyName: 'Omron Automation India Ltd',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=faces',
    },
    {
      _id: 'c6',
      name: 'Vipul Tandon',
      role: 'Member',
      fullRole: 'CEO',
      companyName: 'Wipro Pari',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=faces',
    },
    {
      _id: 'c7',
      name: 'Anup Wadhwa',
      role: 'Member',
      fullRole: 'Director',
      companyName: 'Automation Industry Association',
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=faces',
    }
  ])

  useEffect(() => {
    let isMounted = true

    getCouncilMembers()
      .then((data) => {
        if (isMounted && data && data.length > 0) {
          setMembers(data.filter(m => m.isActive !== false))
        }
      })
      .catch(console.error)

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section
      id="executive-council"
      className="relative bg-white py-24 font-sans text-left"
    >

      {/* Background Micro-Grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-repeat opacity-40"
        style={{
          backgroundImage: "url('/grid-bg.png')",
          backgroundSize: '360px 360px'
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* Main Layout */}
       <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-12">

          {/* LEFT STICKY CONTENT */}
<div className="lg:col-span-3 lg:self-stretch">
  <div className="lg:sticky lg:top-28 lg:h-fit">
    <h2 className="text-4xl font-black leading-[1.15] tracking-tight text-[#1F2937] sm:text-5xl lg:text-[46px]">
      Current<br />
      Executive<br />
      Council
    </h2>

    <p className="mt-4 text-xs font-normal leading-relaxed text-gray-500 sm:text-sm">
      Eminent industry leaders driving innovation, digital workforce
      skilling, and policy advocacy across Indian automation sectors.
    </p>
  </div>
</div>

          {/* RIGHT SCROLLING MEMBERS */}
          <div className="lg:col-span-9">

            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">

              {members.map((member, idx) => (
                <div
                  key={member._id || idx}
                  className="group flex flex-col space-y-3"
                >

                  {/* Member Image */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#E37263]/70 bg-white p-1.5 shadow-sm transition-all duration-300 group-hover:shadow-xl">

                    <div className="h-full w-full overflow-hidden rounded-xl bg-slate-100">

                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full select-none object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />

                    </div>
                  </div>

                  {/* Member Details */}
                  <div className="space-y-1 pt-1">

                    <h3 className="text-base font-black tracking-tight text-[#1F2937] transition-colors duration-300 group-hover:text-[#E37263] sm:text-lg">
                      {member.name}
                    </h3>

                    <div className="text-xs font-bold text-[#E37263]">
                      {member.role}
                    </div>

                    <div className="space-y-0.5 pt-0.5 text-[11px] leading-snug text-gray-600 sm:text-xs">

                      {member.fullRole && (
                        <p className="font-normal text-gray-700">
                          {member.fullRole}
                        </p>
                      )}

                      <p className="font-normal text-gray-500">
                        {member.companyName}
                      </p>

                    </div>
                  </div>

                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
