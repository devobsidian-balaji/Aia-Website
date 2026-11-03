import React from "react";
import SplitFeatureCard from "../../../components/learn-more/SplitFeatureCard";
import CmsSliderSection from "../../../components/sliders/CmsSliderSection";
import BlendedLearning from "../../../components/BlendedLearning";

const AimsObjectivesPage = () => {
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* HERO */}
      <SplitFeatureCard
        eyebrow=""
        title="Aims & Objectives"
        description=""
        image="/aims-objectives/aim-objective-hero-img.png"
        imageAlt="Smart manufacturing and industrial automation"
        imagePosition="right"
        background="dark"
      />

      <CmsSliderSection pageKey="aims-objectives" sectionKey="aims-slider" />

       <BlendedLearning sampleUrl="/documents/blended-learning.pdf" />
    </main>
  );
};

export default AimsObjectivesPage;
