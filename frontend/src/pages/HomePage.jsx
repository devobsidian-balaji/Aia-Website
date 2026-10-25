import React from "react";
import Hero from "../components/Hero.jsx";
import GovernmentInitiative from "../components/GovernmentInitiative.jsx";
import WhoAreYou from "../components/WhoAreYou.jsx";
import HomeServices from "../components/HomeServices.jsx";
import IndustrySectors from "../components/IndustrySectors.jsx";
import ImpactDashboard from "../components/ImpactDashboard.jsx";
// import FactoryInsight from "../components/FactoryInsight.jsx";
import BuildYourFactory from "../components/BuildYourFactory.jsx";
import AIASection from "../components/sections/AIASection.jsx";
// import ReusableCardSlider from "../components/sliders/ReusableCardSlider.jsx";
import CmsSliderSection from "../components/sliders/CmsSliderSection.jsx";
import WhyJoinCmsSection from "../components/why-join/WhyJoinCmsSection.jsx";
import HomeFeatureSection from "../components/home/HomeFeatureSection.jsx";
import ResourceCenter from "../components/FactoryInsight.jsx";

// import ReusableCardSlider from "../components/ReusableCardSlider.jsx";

export default function HomePage() {
  const homeSlides = [
    {
      id: 1,
      type: "intro",
      eyebrow: "Insights + Events",
      title:
        "Here, we’ll highlight the latest policy tracker or report, along with upcoming events and important updates.",
    },

    {
      id: 2,
      type: "content",
      image: "/images/why-join/collective-voice.jpg",
      title: "A Collective Voice",
      description:
        "Individual companies rarely get a hearing on policy or PL-implementation, standards, incentive schemes. AIA represents the sector as a bloc.",
    },

    {
      id: 3,
      type: "content",
      image: "/images/why-join/talent.jpg",
      title: "Talent Pipeline Access.",
      description:
        "Priority access to Campus Connect and IAFSM-trained engineers entering the workforce.",
    },

    {
      id: 4,
      type: "content",
      image: "/images/why-join/visibility.jpg",
      title: "Industry Visibility.",
      description:
        "Build stronger visibility and connect with the wider industry ecosystem.",
    },

    {
      id: 5,
      type: "content",
      image: "/images/why-join/policy.jpg",
      title: "Policy Representation.",
      description:
        "Collective representation gives members a stronger platform for industry conversations.",
    },

    {
      id: 6,
      type: "content",
      image: "/images/why-join/growth.jpg",
      title: "Strategic Growth.",
      description:
        "Create opportunities for collaboration, partnerships and long-term growth.",
    },
  ];
  return (
    <main>
      <Hero />
      <AIASection />
      <GovernmentInitiative />
      {/* <ReusableCardSlider
        slides={whyJoinSlides}
        visibleSlides={3}
        introColor="bg-[#E52B18]"
      /> */}
      {/* <ReusableCardSlider
        slides={homeSlides}
        visibleSlides={3}
        introColor="bg-[#E52B18]"
        accentColor="#E96F62"
        className="py-12 lg:py-16"
      /> */}
      <CmsSliderSection pageKey="home" sectionKey="industry-slider" />
      <WhyJoinCmsSection pageKey="home" sectionKey="why-join" />
      <IndustrySectors />
      <HomeFeatureSection />
      <ResourceCenter />
      {/* <HomeServices />
      <WhoAreYou />
      <ImpactDashboard />
      <BuildYourFactory /> */}
    </main>
  );
}
