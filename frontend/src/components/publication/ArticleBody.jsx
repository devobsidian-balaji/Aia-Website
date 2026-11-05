
// import React from "react";

// export default function ArticleBody({ sections = [],author = "", }) {
//   return (
//     <div className="space-y-5">
//       {sections.map((section, index) => (
//         <section key={section.id || index}>
//           {section.heading && (
//             <h2 className="mb-2 text-[13px] font-bold leading-relaxed text-[#315778] sm:text-lg">
//               {section.heading}
//             </h2>
//           )}

//           {section.paragraphs?.map((paragraph, paragraphIndex) => (
//             <p
//               key={paragraphIndex}
//               className="mb-3 text-[10px] leading-[1.65] text-[#263247] sm:text-[14px] sm:leading-[1.7]"
//             >
//               {paragraph}
//             </p>
//           ))}

//           {section.bullets?.length > 0 && (
//             <ul className="mb-3 list-disc space-y-1 pl-5 text-[10px] leading-[1.65] text-[#263247] sm:text-[11px]">
//               {section.bullets.map((bullet, bulletIndex) => (
//                 <li key={bulletIndex}>{bullet}</li>
//               ))}
//             </ul>
//           )}

//           {section.image && (
//             <figure className="my-5">
//               <img
//                 src={section.image}
//                 alt={section.imageAlt || section.heading || "Article image"}
//                 loading="lazy"
//                 decoding="async"
//                 className="mx-auto max-h-[420px] w-full rounded-[3px] border-l-[3px] border-r-[3px] border-[#E87565] object-cover"
//               />

//               {section.caption && (
//                 <figcaption className="mt-2 text-[10px] text-gray-500">
//                   {section.caption}
//                 </figcaption>
//               )}
//             </figure>
//           )}
//           {/* Article Author - After all sections */}
//         </section>
//       ))}
//       {author && (
//         <p className="pt-1 text-[11px] font-semibold text-[#172337]">
//           {author}
//         </p>
//       )}
//     </div>
//   );
// }


import React from "react";

export default function ArticleBody({
  introductionTitle = "Introduction",
  introductionParagraphs = [],
  contentBlocks = [],
  closingTitle = "",
  closingParagraphs = [],
  closingBullets = [],
  author = "",
}) {
  return (
    <article className="w-full">
      {/* INTRODUCTION */}
      {(introductionTitle || introductionParagraphs.length > 0) && (
        <section className="mb-8">
          {introductionTitle && (
            <h2 className="mb-3 text-base font-bold text-[#315778] sm:text-lg">
              {introductionTitle}
            </h2>
          )}

          {introductionParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="mb-3 text-[12px] leading-[1.8] text-[#414B59] sm:text-[13px] sm:leading-[1.85]"
            >
              {paragraph}
            </p>
          ))}
        </section>
      )}

      {/* CONTENT BLOCKS */}
      {contentBlocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h3
              key={block._id || index}
              className="mb-3 mt-7 text-sm font-bold leading-relaxed text-[#315778] sm:text-base"
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p
              key={block._id || index}
              className="mb-4 text-[12px] leading-[1.8] text-[#414B59] sm:text-[13px] sm:leading-[1.85]"
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "bulletList") {
          return (
            <ul
              key={block._id || index}
              className="mb-5 list-disc space-y-2 pl-5 text-[12px] leading-[1.8] text-[#414B59] sm:text-[13px]"
            >
              {(block.items || []).map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "image") {
          return (
            <figure
              key={block._id || index}
              className="my-6"
            >
              {block.image && (
                <img
                  src={block.image}
                  alt={block.imageAlt || "Article image"}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[520px] w-full border-l-[3px] border-r-[3px] border-[#E87565] object-cover"
                />
              )}

              {block.caption && (
                <figcaption className="mt-2 text-[10px] leading-5 text-gray-500 sm:text-xs">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}

      {/* FINAL SECTION */}
      {(closingTitle ||
        closingParagraphs.length > 0 ||
        closingBullets.length > 0) && (
        <section className="mt-8">
          {closingTitle && (
            <h3 className="mb-3 text-sm font-bold text-[#315778] sm:text-base">
              {closingTitle}
            </h3>
          )}

          {closingParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="mb-3 text-[12px] leading-[1.8] text-[#414B59] sm:text-[13px] sm:leading-[1.85]"
            >
              {paragraph}
            </p>
          ))}

          {closingBullets.length > 0 && (
            <ul className="mb-5 list-disc space-y-2 pl-5 text-[12px] leading-[1.8] text-[#414B59] sm:text-[13px]">
              {closingBullets.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* AUTHOR ATTRIBUTION */}
      {author && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <p className="text-[11px] font-semibold leading-6 text-[#263247] sm:text-xs">
            {author}
          </p>
        </div>
      )}
    </article>
  );
}