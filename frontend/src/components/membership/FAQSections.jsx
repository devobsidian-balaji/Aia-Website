"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    id: 1,
    question:
      "Does my company qualify as a primary member or associate member?",
    answer:
      "If the primary activity of your company (your group of companies may have multiple business domains) relates to Industrial Automation, you are eligible to apply for Primary Membership. If the primary activity of your company relates to IT or Electrical Systems, and you have a dedicated division wherein there is significant activity relating to Industrial Automation you are advised to apply for Associate Membership.",
  },
  {
    id: 2,
    question:
      "What constitutes industrial automation activity or what needs to be included while declaring annual revenues?",
    answer:
      "Industrial automation activity includes products, services, systems, engineering, integration, technology, software, controls, instrumentation and other business activities directly related to industrial automation. Annual revenue should reflect the applicable business activity according to the membership requirements.",
  },
  {
    id: 3,
    question:
      "If I am applying for associate membership, will the overall company revenue be considered for determining my fee structure?",
    answer:
      "The applicable membership fee is determined according to the membership category and the revenue criteria defined by the association. Please provide the relevant company and business information during the membership application process.",
  },
  {
    id: 4,
    question:
      "What should one do if there are multiple companies in my group of companies that are deeply involved in automation and interested in the AIA membership?",
    answer:
      "Each eligible company can be evaluated based on its own business activity and membership requirements. If multiple companies within a group are involved in industrial automation, the membership team can guide you regarding the appropriate membership structure for each entity.",
  },
  {
    id: 5,
    question:
      "What happens if we decide to discontinue membership after a few years?",
    answer:
      "Membership can be discontinued according to the applicable membership terms and conditions. Any outstanding obligations should be completed before the membership is formally discontinued.",
  },
  {
    id: 6,
    question:
      "Can we upgrade our membership category in the future?",
    answer:
      "Yes, membership categories can be reviewed when the company's business activities or eligibility criteria change. The membership team can help determine the appropriate category.",
  },
];

export default function FAQSections() {
  // First FAQ is open initially
  const [openId, setOpenId] = useState(1);

  const toggleFAQ = (id) => {
    setOpenId((currentId) => (currentId === id ? null : id));
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* =====================================================
          BACKGROUND GRID
      ====================================================== */}

      <div
        className="pointer-events-none absolute right-0 top-0 h-[420px] w-[42%] opacity-60 [background-image:linear-gradient(rgba(20,20,20,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.07)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,black,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]
        "
      />

      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div
        className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-14 lg:py-24 xl:px-16"
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <div className="mb-8 sm:mb-10 md:mb-12">
          {/* FAQ label */}

          <div
            className="mb-2 flex items-center gap-1.5 font-sans text-[10px] font-medium tracking-[0.02em] text-[#F06B5E] sm:text-[11px]"
          >
            <span className="text-[12px]">•</span>

            <span className="font-sans text-[24px]">FAQ</span>
          </div>

          {/* Heading */}

          <h2
            className="font-sans text-[34px] font-medium leading-[1] tracking-[-0.045em] text-[#17202B] sm:text-[40px] md:text-[44px] lg:text-[48px] xl:text-[50px]"
          >
            Questions.
          </h2>
        </div>

        {/* =================================================
            FAQ LIST
        ================================================== */}

        <div className="w-full">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={isOpen}
                onToggle={() => toggleFAQ(faq.id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   FAQ ITEM
========================================================= */

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className="
        border-b
        border-[#D9D9D9]
      "
    >
      {/* =================================================
          QUESTION BUTTON
      ================================================== */}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6 md:py-6 lg:py-7 xl:py-7"
      >
        {/* Question */}

        <span
          className={`max-w-[calc(100%-45px)] font-sans text-[16px] font-medium leading-[1.4] tracking-[-0.01em] transition-colors duration-300 sm:text-[16px] md:text-[20px] lg:text-[20px]

            ${
              isOpen
                ? "text-[#17202B]"
                : "text-[#17202B]"
            }
          `}
        >
          {faq.question}
        </span>

        {/* =================================================
            ICON
        ================================================== */}

        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center transition-transform duration-300 ease-out sm:h-8 sm:w-8`}
        >
          {isOpen ? (
            <Minus
              size={18}
              strokeWidth={1.6}
              className="
                text-[#F06B5E]
                transition-all
                duration-300
              "
            />
          ) : (
            <Plus
              size={18}
              strokeWidth={1.6}
              className="
                text-[#F06B5E]
                transition-all
                duration-300
              "
            />
          )}
        </span>
      </button>

      {/* =================================================
          ANSWER
      ================================================== */}

      <div
        id={`faq-answer-${faq.id}`}
        className={`
          grid
          transition-[grid-template-rows]
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            isOpen
              ? "grid-rows-[1fr]"
              : "grid-rows-[0fr]"
          }
        `}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className="
              max-w-[900px]
              pb-5
              pr-10

              sm:pb-6

              md:pb-6

              lg:pb-7
            "
          >
            <p
              className="
                font-sans
                text-[16px]
                font-normal
                leading-[1.45]
                tracking-[-0.005em]
                text-[#17202B]/90

                sm:text-[16px]

                md:text-[16px]

                lg:text-[16px]
              "
            >
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}