
import React from "react";

const objectives = [
  {
    title: "Spreading Ideas:",
    description:
      "Ideas are the seed of innovation. We talk about and regularly discuss the positive impact of technology, automation and robotics on business, the Indian economy and society at large.",
  },
  {
    title: "Growing a Community:",
    description:
      "It's important that people understand robotics and automation better. We are building a community of engineers, system integrators and automation suppliers over this online platform to interact and learn from each other. We often collaborate with similar associations as the AIA, outside India as well.",
  },
  {
    title: "Building Consensus:",
    description:
      "Complex transformations like Industry 4.0, depend on people coming together in agreement. AIA regularly brings the industry together with researchers and policy makers through meetings, conferences, seminars and symposia.",
  },
  {
    title: "Encouraging Adoption:",
    description:
      "Indian industries have an opportunity to invest in research & development and take advantage of cutting-edge automation technologies. We recognise that this may promote and extend the interests and influence of AIA's members and we consciously do that in a brand-neutral manner as much as possible.",
  },
  {
    title: "Keeping it Safe:",
    description:
      "Robotics and automation solutions need to comply with safety and compliance standards in the respective industry. Some areas need new regulations and safety standards altogether. AIA plays a continuous role in discussing these rules and regulations as well as promote, improve and encourage training opportunities for people in robotics, automation and related disciplines.",
  },
];

const defaultIntroduction = [
  "Automation Industry Association is a national association that represents the leading manufacturers and distributors of systems, software and related services used in industrial process control and factory automation around the world.",

  "Our member companies include the leading multi-national companies together with a range of more niche-oriented channel partners and system integrators.",

  "We help our members operate and expand their business by providing industry knowledge, sharing market trends and creating networking opportunities.",

  "We also see manufacturers looking for solutions to automate their factory floors. We help such businesses with technologies and ideas to transform the way they do business.",
];

export default function AboutObjectivesSection({
  introduction = defaultIntroduction,
  objectives: objectiveItems = objectives,
  className = "",
}) {
  return (
    <section
      className={`relative overflow-hidden bg-[#FCFCFD] px-5 py-10 font-sans sm:px-8 sm:py-14 lg:px-12 lg:py-16 ${className}`}
    >
      {/* Subtle Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(232,117,101,0.055),transparent_45%)]" />

      <div className="relative mx-auto max-w-[1100px]">

        {/* WHAT WE DO */}
        <div>
          <h2 className="mb-4 text-base font-bold tracking-tight text-[#345778] sm:text-lg">
            What We Do
          </h2>

          <div className="space-y-3">
            {introduction.map((paragraph, index) => (
              <p
                key={index}
                className="text-[11px] leading-[1.75] text-[#263247] sm:text-xs sm:leading-[1.8] lg:text-[16px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* OUR OBJECTIVES */}
        <div className="mt-9 sm:mt-12">
          <h2 className="mb-4 text-base font-bold tracking-tight text-[#345778] sm:text-lg">
            Our Objectives
          </h2>

          <p className="mb-5 text-[11px] leading-[1.75] text-[#263247] sm:text-xs sm:leading-[1.8] lg:text-[16px]">
            To help usher in an era of Automation in India and become the platform-of-choice for the industry to discover, learn and adopt the latest technologies, we are engaged in.
          </p>

          <div className="space-y-5 sm:space-y-6">
            {objectiveItems.map((item, index) => (
              <article key={item.id || index}>
                <h3 className="mb-2 text-[11px] font-medium leading-relaxed text-[#E87565] sm:text-sm">
                  • {item.title}
                </h3>

                <p className="text-[11px] leading-[1.75] text-[#263247] sm:text-xs sm:leading-[1.8] lg:text-[16px]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
