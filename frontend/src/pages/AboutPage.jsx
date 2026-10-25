import React from "react";
import AboutHero from "../components/AboutHero.jsx";
import AboutAIAOverview from "../components/AboutAIAOverview.jsx";
import VisionMissionObjectives from "../components/VisionMissionObjectives.jsx";
import PastPresidents from "../components/PastPresidents.jsx";
import CurrentExecutiveCouncil from "../components/CurrentExecutiveCouncil.jsx";
import AutomationEcosystem from "../components/AutomationEcosystem.jsx";
import WhyJoinCmsSection from "../components/why-join/WhyJoinCmsSection.jsx";
import CmsSliderSection from "../components/sliders/CmsSliderSection.jsx";
import MembersCarousel from "../components/MembersCarousel.jsx";
import { membersData } from "../data/membersData.js";
import StickyStackCards from "../components/industry-insight/StickyStackCards.jsx";
import { editorialItems } from "../data/editorialData.js";
import StickyStackCmsSection from "../components/StickyStackCmsSection.jsx";

export default function AboutPage() {
  return (
    <div className="w-full font-sans bg-white">
      {/* 1. Full-Bleed About Hero */}
      <AboutHero />

      <CmsSliderSection pageKey="about-aia" sectionKey="about-slider" />

      {/* 2. Dynamic 3-Card About Overview */}
      <AboutAIAOverview />

      {/* 3. Dynamic Vision, Mission, Objectives with Dotted Curves */}
      {/* <VisionMissionObjectives /> */}

      {/* 4. AIA Past Presidents matching Image 1 */}
      <PastPresidents />
      {/* Second Slider - different CMS content */}
      <CmsSliderSection pageKey="about-aia" sectionKey="about-slider-2" />

      <WhyJoinCmsSection pageKey="about-aia" sectionKey="why-join" />

      <section className="w-full">
        <StickyStackCmsSection
  pageKey="about-aia"
  sectionKey="our-journey"
/>
      </section>
      {/* 5. Current Executive Council matching Image 2 */}
      <CurrentExecutiveCouncil />

      {/* 6. Automation Ecosystem */}
      <AutomationEcosystem />
      <MembersCarousel
        title="Our Members"
        members={membersData}
        slidesPerView={5}
        autoplay
        autoplayDelay={3500}
        pauseOnHover
        indicatorCount={3}
      />
    </div>
  );
}
