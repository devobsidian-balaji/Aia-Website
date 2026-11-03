
import React from "react";

export default function ArticleBody({ sections = [],author = "", }) {
  return (
    <div className="space-y-5">
      {sections.map((section, index) => (
        <section key={section.id || index}>
          {section.heading && (
            <h2 className="mb-2 text-[13px] font-bold leading-relaxed text-[#315778] sm:text-lg">
              {section.heading}
            </h2>
          )}

          {section.paragraphs?.map((paragraph, paragraphIndex) => (
            <p
              key={paragraphIndex}
              className="mb-3 text-[10px] leading-[1.65] text-[#263247] sm:text-[14px] sm:leading-[1.7]"
            >
              {paragraph}
            </p>
          ))}

          {section.bullets?.length > 0 && (
            <ul className="mb-3 list-disc space-y-1 pl-5 text-[10px] leading-[1.65] text-[#263247] sm:text-[11px]">
              {section.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex}>{bullet}</li>
              ))}
            </ul>
          )}

          {section.image && (
            <figure className="my-5">
              <img
                src={section.image}
                alt={section.imageAlt || section.heading || "Article image"}
                loading="lazy"
                decoding="async"
                className="mx-auto max-h-[420px] w-full rounded-[3px] border-l-[3px] border-r-[3px] border-[#E87565] object-cover"
              />

              {section.caption && (
                <figcaption className="mt-2 text-[10px] text-gray-500">
                  {section.caption}
                </figcaption>
              )}
            </figure>
          )}
          {/* Article Author - After all sections */}
        </section>
      ))}
      {author && (
        <p className="pt-1 text-[11px] font-semibold text-[#172337]">
          {author}
        </p>
      )}
    </div>
  );
}
