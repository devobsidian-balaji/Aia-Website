
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function MembershipFAQ({ faqs = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!faqs.length) return null;

  return (
    <section className="mt-16 sm:mt-20">
      <p className="mb-1 font-poppins text-[10px] font-bold uppercase tracking-[0.2em] text-[#E87565]">
        FAQs
      </p>

      <h2 className="mb-6 text-2xl font-black text-[#263247] sm:text-3xl">
        Questions.
      </h2>

      <div className="divide-y divide-gray-200">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div key={faq.id || index}>
              <button
                type="button"
                onClick={() => setActiveIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="text-xs font-semibold leading-relaxed text-[#263247] sm:text-sm">
                  {faq.question}
                </span>

                {isOpen ? (
                  <Minus size={17} className="shrink-0 text-[#E87565]" />
                ) : (
                  <Plus size={17} className="shrink-0 text-[#E87565]" />
                )}
              </button>

              {isOpen && (
                <p className="max-w-4xl pb-5 pr-8 text-xs leading-6 text-gray-600 sm:text-sm">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
