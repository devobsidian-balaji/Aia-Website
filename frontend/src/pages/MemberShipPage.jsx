import React from 'react'
import MemberShipHero from '../components/membership/MemberShipHero'
// import MemberShipAIAOverview from '../components/membership/MemberShipAIAOverview'
import MemberShipObjectives from '../components/membership/MemberShipObjectives'
// import MemberShipPara from '../components/membership/MemberShipPara'
// import WhyJoinSlider from '../components/membership/WhyJoinSlider'
import MemberDirectory from '../components/membership/MemberDirectory'
import FAQSections from '../components/membership/FAQSections'
import ContentIntroSection from '../components/ContentIntroSection'
// import ReusableCardSlider from '../components/ReusableCardSlider'
import { memberShipSlides } from '../data/membersData'
import CmsSliderSection from '../components/sliders/CmsSliderSection'
import WhyJoinCmsSection from '../components/why-join/WhyJoinCmsSection'




// import AboutHero from '../components/AboutHero.jsx'
// import AboutAIAOverview from '../components/AboutAIAOverview.jsx'
// import VisionMissionObjectives from '../components/VisionMissionObjectives.jsx'
// import PastPresidents from '../components/PastPresidents.jsx'
// import CurrentExecutiveCouncil from '../components/CurrentExecutiveCouncil.jsx'
// import AutomationEcosystem from '../components/AutomationEcosystem.jsx'

export default function MemberShipPage() {
  return (
    <div className="w-full font-sans bg-white">
      {/* 1. Full-Bleed Membership Hero */}
      <MemberShipHero />

      {/* 2. Dynamic 3-Card Membership Overview */}
      {/* <MemberShipPara /> */}
      {/* <ContentIntroSection id= "membership" title= "Member" description="Membership is open to technology providers and system integrators who together team up to build and deliver cutting edge automation from India. Companies whose primary business comes from the above activity are taken in as Primary Members, with full voting rights and eligibility to aspire for a seat in the AIA Executive Council. Members are listed in the searchable Member Directory, and get priority to represent AIA on different forums and committees and showcase new solutions at AIA events." secondaryDescription="Adopters of automation, such as Machine Builders, Manufacturers, Utility Owners and their advisors or consultants are AIA's other essential audience, and connect through Samarth Community rather than formal membership."  /> */}
      {/* <ReusableCardSlider  slides={memberShipSlides}
        visibleSlides={3}
        introColor="bg-[#E52B18]" /> */}
        
        <CmsSliderSection
        pageKey="membership"
        sectionKey="member-benefits"
      />
      <WhyJoinCmsSection
       pageKey="membership"
  sectionKey="why-join"
        />
      

      {/* <MemberShipObjectives /> */}
      <MemberDirectory />
      <FAQSections />

      {/* 3. Dynamic Vision, Mission, Objectives with Dotted Curves */}
      {/* <VisionMissionObjectives /> */}

      {/* 4. AIA Past Presidents matching Image 1 */}
      {/* <PastPresidents /> */}

      {/* 5. Current Executive Council matching Image 2 */}
      {/* <CurrentExecutiveCouncil /> */}

      {/* 6. Automation Ecosystem */}
      {/* <AutomationEcosystem /> */}
    </div>
  )
}
