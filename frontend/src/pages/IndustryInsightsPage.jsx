
import IndustryInsightHero from "../components/industry-insight/IndustryInsightHero";
// import ReusableCardSlider from "../components/ReusableCardSlider";
import ContentIntroSection from "../components/ContentIntroSection";
import StickyStackCards from "../components/industry-insight/StickyStackCards";
import { editorialItems } from "../data/editorialData";
import MembersCarousel from "../components/MembersCarousel";
import { membersData } from "../data/membersData";
import { insightSlides } from "../data/industryInsightData";
import CmsSliderSection from "../components/sliders/CmsSliderSection";
import StickyStackCmsSection from "../components/StickyStackCmsSection";



export default function IndustryInsightPage() {
  return (
    <div className="w-full font-sans bg-white">
      {/* 1. Full-Bleed Membership Hero */}
      <IndustryInsightHero />
       <CmsSliderSection
  pageKey="industry-insight"
  sectionKey="industry-insight"
/>
      {/* <ContentIntroSection
        id="industry-insight"
        title="Industry Insight"
        description="Data, policy context, and perspective on where Indian industrial automation is headed 
        curated by the association that represents the people building it."
      /> */}
      {/* <ReusableCardSlider
        slides={insightSlides}
        visibleSlides={3}
        introColor="bg-[#E52B18]"
        // showReadMore={true}
        // onReadMore={handleReadMore}
      /> */}
      {/* <ContentIntroSection
        id="articles & perspectives"
        title="Articles & Perspectives"
        description="AIA already maintains a library of brand-agnostic technical articles on the current site migrate and re-home this existing content here rather than starting from zero. This is a real asset the current IA just doesn't surface well."
      /> */}
      <section className="w-full">
        {/* <StickyStackCards items={editorialItems} /> */}
        <StickyStackCmsSection
  pageKey="industry-insight"
  sectionKey="articles-perspectives"
  fallbackHeading="Articles & Perspectives"
/>
      </section>
        <MembersCarousel
      title="Our Members"
      members={membersData}
      slidesPerView={5}
      autoplay
      autoplayDelay={3500}
      pauseOnHover
      indicatorCount={3}
    />
      {/* 2. Dynamic 3-Card Membership Overview */}
      {/* <MemberShipPara />
      <WhyJoinSlider/>
      <MemberShipObjectives />
      <MemberDirectory />
      <FAQSections /> */}

      {/* 3. Dynamic Vision, Mission, Objectives with Dotted Curves */}
      {/* <VisionMissionObjectives /> */}

      {/* 4. AIA Past Presidents matching Image 1 */}
      {/* <PastPresidents /> */}

      {/* 5. Current Executive Council matching Image 2 */}
      {/* <CurrentExecutiveCouncil /> */}

      {/* 6. Automation Ecosystem */}
      {/* <AutomationEcosystem /> */}
    </div>
  );
}
