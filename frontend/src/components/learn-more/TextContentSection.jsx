
import React from "react";

export default function TextContentSection({
  eyebrow,
  title,
  description,
  paragraphs = [],
  points = [],
  background = "white",
  alignment = "center",
}) {
  const isDark = background === "dark";

  return (
    <section
      className={`relative overflow-hidden px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 flex items-center justify-center ${
        isDark ? "bg-[#202B3B] text-white" : "bg-white text-[#263247]"
      }`}
    >
      <div
        className={`mx-auto max-w-[1050px] ${
          alignment === "center" ? "text-center" : "text-left"
        }`}
      >
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#E87565]">
            {eyebrow}
          </p>
        )}

        <h2 className="mb-8 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-[#1F2937] sm:mb-12 sm:text-5xl lg:mb-6 lg:text-[४२px]">
          {title}
        </h2>

        {description && (
          <p
            className={`mx-auto mt-5 max-w-[850px] text-sm leading-7 sm:text-base ${
              isDark ? "text-white/75" : "text-gray-600"
            }`}
          >
            {description}
          </p>
        )}

        {paragraphs.length > 0 && (
          <div className="mt-6 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-sm font-normal leading-[1.7] text-gray-600 sm:text-base sm:leading-[1.7] lg:text-lg lg:leading-[1.75] mb-5 ${
                  isDark ? "text-white/75" : "text-gray-600"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {points.length > 0 && (
          <ul className="mx-auto mt-6 max-w-[850px] space-y-3 text-left">
            {points.map((point, index) => (
              <li
                key={index}
                className={`flex items-start gap-3 text-sm leading-6 ${
                  isDark ? "text-white/80" : "text-gray-600"
                }`}
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E87565]" />
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
