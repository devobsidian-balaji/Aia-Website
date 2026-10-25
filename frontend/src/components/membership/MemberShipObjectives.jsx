import React from "react";

export default function MemberShipObjectives() {
  return (
    <section
      id="memebership-aims-objectives"
      className="py-24 bg-white font-sans relative overflow-hidden text-left select-none"
    >
      {/* Background Micro-Grid Texture */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none bg-repeat bg-[length:360px_360px]"
        style={{ backgroundImage: `url('/grid-bg.png')` }}
      ></div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-24 sm:space-y-32">
        {/* ========================================================= */}
        {/* ROW 1: Our Aims (Left Text, Right Image)                 */}
        {/* ========================================================= */}
        <div className="relative">
          <h1 className="flex justify-center text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight mb-16 sm:mb-20">
            Membership Tiers
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#1F2937] tracking-tight leading-[1.1]">
                Technology Providers
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                Get visibility by placing your latest offering, white papers and
                solution references for ready access amongst the system
                integrators and manufacturers actively sourcing automation
                solutions.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href=""
                  className="inline-flex items-center justify-center px-5 py-2 rounded-xl border border-[#E25238] text-[#E25238] hover:bg-[#E25238] hover:text-white font-bold text-xs tracking-wide transition-all shadow-xs"
                >
                  Apply as a Technology Provider
                </a>
                {/* <a
                  href="#learn-more"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-xl border border-gray-300 text-gray-800 hover:border-gray-900 font-bold text-xs tracking-wide transition-all shadow-xs"
                >
                  Learn More
                </a> */}
              </div>
            </div>

            {/* Right Image matching Image 1 */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-slate-100 group">
                <img
                  src="/membershipassets/Technology.png"
                  alt="Our Aims"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 block"
                />
              </div>
            </div>
          </div>

          {/* SVG Dotted Curve 1 (Right to Left downward flow) */}
          <div className="hidden lg:block absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-24 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 800 100" fill="none">
              <path
                d="M 620 10 C 620 70, 220 30, 220 90"
                stroke="#E25238"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROW 2: Objectives (Left Image, Right Text)               */}
        {/* ========================================================= */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Image matching Image 1 (Fist on black background) */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-black group">
                <img
                  src="/membershipassets/system-integrators.png"
                  alt="Objectives"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 block"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#1F2937] tracking-tight leading-[1.1]">
                System Integrators
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                Get visibility with the technology providers, consultants and
                manufacturers actively seeking partners for automation solutions
                from India. Join the directory that manufacturers use to find
                implementation partners. System Integrator members get access to
                AIA's technical forums, early notice of manufacturer RFPs
                surfaced through the network, and a channel to flag on-ground
                implementation challenges back to technology providers and
                policymakers - we may withhold this part for now.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href=""
                  className="inline-flex items-center justify-center px-5 py-2 rounded-xl border border-[#E25238] text-[#E25238] hover:bg-[#E25238] hover:text-white font-bold text-xs tracking-wide transition-all shadow-xs"
                >
                  Apply as a System Integrator
                </a>
                {/* <a
                  href="#learn-more"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-xl border border-gray-300 text-gray-800 hover:border-gray-900 font-bold text-xs tracking-wide transition-all shadow-xs"
                >
                  Learn More
                </a> */}
              </div>
            </div>
          </div>

          {/* SVG Dotted Curve 2 (Left to Right downward flow) */}
          <div className="hidden lg:block absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-24 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 800 100" fill="none">
              <path
                d="M 220 10 C 220 70, 620 30, 620 90"
                stroke="#E25238"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ROW 3: Blended Learning (Left Text, Right Image)         */}
        {/* ========================================================= */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#1F2937] tracking-tight leading-[1.1]">
                Manufacturers & Automation Users
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                AlA membership is restricted to automation vendors.
                Manufacturers and other automation users have their own entry
                point instead: Samarth Community, reached via the self-scoring
                rubric hero on the Resource Center. This box on the Membership
                page exists mainly to redirect manufacturers who land here
                looking to "join" toward the right door.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href=""
                  className="inline-flex items-center justify-center px-5 py-2 rounded-xl border border-[#E25238] text-[#E25238] hover:bg-[#E25238] hover:text-white font-bold text-xs tracking-wide transition-all shadow-xs"
                >
                  Take the self Assessment
                </a>
                {/* <a
                  href="#learn-more"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-xl border border-gray-300 text-gray-800 hover:border-gray-900 font-bold text-xs tracking-wide transition-all shadow-xs"
                >
                  Learn More
                </a> */}
              </div>
            </div>

            {/* Right Image matching Image 1 */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-slate-100 group">
                <img
                  src="/membershipassets/automation.png"
                  alt="Blended Learning"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
