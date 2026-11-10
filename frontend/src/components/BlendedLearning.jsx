
import React from "react";
import ViewSampleButton from "./common/ViewSampleButton";

const BlendedLearning = ({ sampleUrl = "#" }) => {
  return (
    <section className="w-full bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-7 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-[#172033] sm:text-2xl">
            Blended learning
          </h2>

          {/* <a
            href={sampleUrl}
            target={sampleUrl !== "#" ? "_blank" : undefined}
            rel={sampleUrl !== "#" ? "noopener noreferrer" : undefined}
            className="shrink-0 text-[10px] font-medium text-[#D94F42] underline underline-offset-2 transition-colors hover:text-[#A92F25] sm:text-xs"
          >
            View Sample
          </a> */}
          <ViewSampleButton
           href="/aims-objectives/campus+connect+sampler.pdf"
          label="View Sample" />
        </div>

        {/* Content */}
        <div className="space-y-4 text-[13px] leading-[1.65] text-[#273246] sm:text-sm sm:leading-[1.7]">
          <p>
            Blended learning, the teaching practice that combines teaching
            methods from both face-to-face and online learning, is an
            established, rapidly growing instructional model that is proving
            highly effective in helping institutions address the challenges
            of limited resources and the expectations of 21st century learners.
            The model extends classroom instruction beyond the normal hours,
            supports credit recovery programs, enhances professional
            development for teachers and delivers enriched learning
            opportunities for accelerated students.
          </p>

          <p>
            <a
              href="#"
              className="underline underline-offset-2 hover:text-[#D94F42]"
            >
              AIA Campus Connect
            </a>{" "}
            implements blended learning in a variety of ways, ranging from
            models in which curriculum is fully online with face-to-face
            interaction in laboratory sessions, to models in which
            face-to-face classroom instruction is integrated with online
            components. The rapid growth of blended learning has been a
            catalyst for additional instructional transformation, including:
          </p>

          {/* Bullet points */}
          <ul className="list-disc space-y-3 pl-5 marker:text-[#172033] sm:pl-6">
            <li>
              Evolving pedagogy in which teachers’ roles include facilitation,
              student mentoring and differentiating instruction for
              individual learners,
            </li>

            <li>
              Increased flexibility and personalization of students’ learning
              experiences
            </li>

            <li>
              Strategic uses of technology as colleges tap the capabilities
              of the learning management systems to support a wider range of
              instructional programs.
            </li>
          </ul>

          <p>
            The intent of AIA Campus Connect programme is to showcase this
            blended learning model’s potential and ignite faculty and students
            with new conversations about Integrated Automation learning and
            relevance to career needs in Industry.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlendedLearning;
