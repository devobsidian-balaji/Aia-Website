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
    getCouncilMembers().then((data) => {
      if (isMounted && data && data.length > 0) {
        setMembers(data.filter(m => m.isActive !== false))
      }
    }).catch(console.error)

    return () => { isMounted = false }
  }, [])

  return (
    <section id="executive-council" className="py-24 bg-white font-sans relative overflow-hidden text-left">
      
      {/* Background Micro-Grid Texture */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Layout matching Image 2: Left Title + Right 3-Column Profile Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Title Column matching Image 2 */}
          <div className="lg:col-span-3 lg:sticky lg:top-28">
            <h2 className="text-4xl sm:text-5xl lg:text-[46px] font-black text-[#1F2937] leading-[1.15] tracking-tight">
              Current<br />Executive<br />Council
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-4 leading-relaxed font-normal">
              Eminent industry leaders driving innovation, digital workforce skilling, and policy advocacy across Indian automation sectors.
            </p>
          </div>

          {/* Right Members Grid matching Image 2 */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {members.map((member, idx) => (
                <div 
                  key={member._id || idx}
                  className="flex flex-col space-y-3 group"
                >
                  {/* Photo Frame with Coral border matching Image 2 */}
                  <div className="relative aspect-[4/5] rounded-2xl p-1.5 border border-[#E37263]/70 overflow-hidden bg-white shadow-sm group-hover:shadow-xl transition-all duration-300">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 select-none"
                      />
                    </div>
                  </div>

                  {/* Name & Details matching Image 2 */}
                  <div className="space-y-1 pt-1">
                    <h3 className="text-base sm:text-lg font-black text-[#1F2937] tracking-tight group-hover:text-[#E37263] transition-colors">
                      {member.name}
                    </h3>

                    {/* Role in coral/red text */}
                    <div className="text-xs font-bold text-[#E37263]">
                      {member.role}
                    </div>

                    {/* Corporate title and company name */}
                    <div className="text-[11px] sm:text-xs text-gray-600 space-y-0.5 leading-snug pt-0.5">
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
