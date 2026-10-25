
import IndustryInsightHero from "../components/industry-insight/IndustryInsightHero";
// import ReusableCardSlider from "../components/ReusableCardSlider";
import ContentIntroSection from "../components/ContentIntroSection";
import StickyStackCards from "../components/industry-insight/StickyStackCards";
import { editorialItems } from "../data/editorialData";
import MembersCarousel from "../components/MembersCarousel";
import { membersData } from "../data/membersData";
import { insightSlides } from "../data/industryInsightData";
import TalenctConnectPrograme from "../components/talent-connect/TalenctConnectPrograme";
import ReusableCardGrid from "../components/ReusableCardGrid";
import { talentprograms } from "../data/talentData";
import CmsSliderSection from "../components/sliders/CmsSliderSection";
import AIASection from "../components/sections/AIASection";



export default function TalentConnectPage() {
  return (
    <div className="w-full font-sans bg-white">
      {/* 1. Full-Bleed Membership Hero */}
      <IndustryInsightHero />
      {/* <ContentIntroSection
        id="talent-connect?"
        title="What is Talent Connect?"
        description="AIA introduced brand-agnostic automation learning to India, setting up four Competency Development Centers across partner institutions to teach systems thinking not any one vendor's product line."
        secondaryDescription={"That model is now being crowded out by company sponsored labs, and the result shows: students who  can operate a specific product, but few who know how to design and deliver a holistic automation system. Talent Connect is where that distinction becomes actionable - for members hiring, for the graduates and professionals trained through AlA's programs, and for students just entering the field."}
      /> */}
       <CmsSliderSection
        pageKey="talent-connect"
        sectionKey="talent-connect"
      />
      {/* <ReusableCardSlider
        slides={insightSlides}
        visibleSlides={3}
        introColor="bg-[#E52B18]"
        // showReadMore={true}
        // onReadMore={handleReadMore}
      /> */}
      <AIASection />
     <ReusableCardGrid
      title="Talent Programs"
      cards={talentprograms}
      columns={3}
      sectionId="talent-connect"
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
