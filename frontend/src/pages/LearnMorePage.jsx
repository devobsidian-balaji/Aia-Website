import React, { useEffect } from "react";

import SplitFeatureCard from "../components/learn-more/SplitFeatureCard";
import TextContentSection from "../components/learn-more/TextContentSection";
import GeneralInquiryForm from "../components/learn-more/GeneralInquiryForm";
import AboutObjectivesSection from "../components/learn-more/AboutObjectivesSection";
import CurrentExecutiveCouncil from "../components/CurrentExecutiveCouncil";
import PastPresidents from "../components/PastPresidents";
import MembersCarousel from "../components/MembersCarousel";
import { membersData } from "../data/membersData";
import { useLocation } from "react-router-dom";

export default function LearnMorePage() {
 const location = useLocation();

  useEffect(() => {
    if (location.hash === "#enquiry-form") {
      setTimeout(() => {
        document.getElementById("enquiry-form")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 500);
    }
  }, [location]);

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* HERO */}
      <SplitFeatureCard
        eyebrow=""
        title="Driving India's Smart Manufacturing Mission"
        description=""
        image="/national-party.png"
        imageAlt="Smart manufacturing and industrial automation"
        imagePosition="right"
        background="dark"
      />

      {/* WHAT WE SEE */}
      <TextContentSection
        eyebrow=""
        title="What We See"
        description=""
        paragraphs={[
          "The Indian business ecosystem has improved considerably in the past few years.",
          "Make In India' has opened Indian market globally in a completely different manner. With this increased competition, the market is focusing on improving productivity and efficiency in their operations. Automation technologies can play a key role here.",
          "Automation Industry Association aims to be the platform-of-choice for the Indian industry to connect and exchange knowledge on topics related to Automation, Internet of Things and Robotics. ",
        ]}
      />

      {/* MESSAGE FROM PRESIDENT */}
      <SplitFeatureCard
        eyebrow=""
        title="Message from President"
        description=""
        paragraphs={[
          "Industry 4.0 is not a regulatory compliance; it is a journey towards digitalisation and better integration of processes within the company. Educating and hand-holding owners and engineers is essential for imbibing the nuances of digital power and sustaining long term success of business.",
        ]}
        name="PV Sivaram, Past President,
            AIA (2016-2018)"
        image="/message-from-pre.png"
        imageAlt="AIA President"
        imagePosition="right"
        background="dark"
        buttonText="View Publication"
        buttonLink="/publication"
      />
      {/* General Inquiry Form */}
      <div id="enquiry-form" className="scroll-mt-24">
  <GeneralInquiryForm />
</div>

      {/* What We Do + Our Objectives */}
      <AboutObjectivesSection />

      {/* WHY AIA */}
      {/* <TextContentSection
        eyebrow="Our Commitment"
        title="Building a Connected Industrial Ecosystem"
        description="AIA brings together the stakeholders who are shaping the future of Indian manufacturing."
        points={[
          "Encouraging adoption of smart manufacturing technologies.",
          "Creating opportunities for industry collaboration.",
          "Supporting skill development and workforce readiness.",
          "Promoting knowledge sharing and industry best practices.",
          "Representing the collective interests of the automation industry.",
        ]}
      /> */}

            <CurrentExecutiveCouncil />

                  <PastPresidents />

                   <MembersCarousel
                          title="Our Members"
                          members={membersData}
                          slidesPerView={5}
                          autoplay
                          autoplayDelay={3500}
                          pauseOnHover
                          indicatorCount={3}
                        />

      {/* CONTACT CTA */}
      {/* <section className="bg-[#244665] px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 rounded-lg border border-white/15 bg-white/5 p-6 sm:p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Connect with AIA
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
              Interested in learning more about AIA, our initiatives or
              membership opportunities? Get in touch with our team.
            </p>
          </div>

          <a
            href="/contact-us"
            className="inline-flex shrink-0 items-center justify-center rounded-sm bg-[#E87565] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d65d50]"
          >
            Contact Us
          </a>
        </div>
      </section> */}
    </main>
  );
}
