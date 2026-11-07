
// import React from "react";
// import { Link } from "react-router-dom";

// import SplitFeatureCard from "./learn-more/SplitFeatureCard";
// import ArticleBody from "./publication/ArticleBody";
// import ArticleNavigation from "./publication/ArticleNavigation";

// export default function PublicationDetailLayout({
//   publication,
//   previousArticle = null,
//   nextArticle = null,
//   backLink = "/publication/articles",
//   backLabel = "Back to all publications",
// }) {
//   if (!publication) return null;

//   return (
//     <main className="min-h-screen bg-white font-sans">
//       <SplitFeatureCard
//         eyebrow={publication.category || ""}
//         title={
//           publication.detailHeroTitle ||
//           publication.title
//         }
//         description={publication.detailHeroDescription || ""}
//         image={
//           publication.detailHeroImage ||
//           publication.image
//         }
//         imageAlt={
//           publication.detailHeroImageAlt ||
//           publication.imageAlt ||
//           publication.title
//         }
//         imagePosition="right"
//         background="dark"
//       />

//       {/* MAIN TITLE */}
//       <section className="mx-auto w-full max-w-[1100px] px-5 pb-6 pt-9 sm:px-8 sm:pb-8 sm:pt-12">
//         <header className="mx-auto max-w-[850px] text-center">
//           <h1 className="text-xl font-bold leading-[1.4] text-[#263247] sm:text-2xl lg:text-[28px]">
//             {publication.detailTitle || publication.title}
//           </h1>

//           {publication.detailSubtitle && (
//             <p className="mx-auto mt-4 max-w-[850px] text-[12px] leading-[1.8] text-[#414B59] sm:text-sm">
//               {publication.detailSubtitle}
//             </p>
//           )}
//         </header>
//       </section>

//       {/* ARTICLE CONTENT */}
//       <section className="bg-[#FCFCFD]">
//         <div className="mx-auto w-full max-w-[1100px] px-5 py-8 sm:px-8 sm:py-10">
//           <ArticleBody
//             introductionTitle={publication.introductionTitle}
//             introductionParagraphs={
//               publication.introductionParagraphs || []
//             }
//             contentBlocks={publication.contentBlocks || []}
//             closingTitle={publication.closingTitle}
//             closingParagraphs={
//               publication.closingParagraphs || []
//             }
//             closingBullets={publication.closingBullets || []}
//             author={publication.author}
//           />

//           {/* PREVIOUS / NEXT NAVIGATION */}
//           <ArticleNavigation
//             previousArticle={previousArticle}
//             nextArticle={nextArticle}
//           />

//           {/* BACK TO ARTICLES */}
//           <div className="mt-8 border-t border-gray-200 pt-6 text-center">
//             <Link
//               to={backLink}
//               className="text-sm font-medium text-[#315778] underline underline-offset-4 transition hover:text-[#E87565]"
//             >
//               {backLabel}
//             </Link>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";

import SplitFeatureCard from "./learn-more/SplitFeatureCard";
import ArticleBody from "./publication/ArticleBody";
import ArticleNavigation from "./publication/ArticleNavigation";

export default function PublicationDetailLayout({
  publication,
  previousArticle = null,
  nextArticle = null,
  backLink = "/publication/articles",
  backLabel = "Back to all publications",
  basePath
}) {
  if (!publication) return null;

  return (
    <main className="min-h-screen bg-white font-sans">
      <SplitFeatureCard
        eyebrow={publication.category || ""}
        title={
          publication.detailHeroTitle ||
          publication.title
        }
        description={publication.detailHeroDescription || ""}
        image={
          publication.detailHeroImage ||
          publication.image
        }
        imageAlt={
          publication.detailHeroImageAlt ||
          publication.imageAlt ||
          publication.title
        }
        imagePosition="right"
        background="dark"
      />

      <section className="mx-auto w-full max-w-[1100px] px-5 pb-6 pt-9 sm:px-8 sm:pb-8 sm:pt-12">
        <header className="mx-auto max-w-[850px] text-center">
          <h1 className="text-xl font-bold leading-[1.4] text-[#263247] sm:text-2xl lg:text-[28px]">
            {publication.detailTitle || publication.title}
          </h1>

          {publication.detailSubtitle && (
            <p className="mx-auto mt-4 max-w-[850px] text-[12px] leading-[1.8] text-[#414B59] sm:text-sm">
              {publication.detailSubtitle}
            </p>
          )}
        </header>
      </section>

      <section className="bg-[#FCFCFD]">
        <div className="mx-auto w-full max-w-[1100px] px-5 py-8 sm:px-8 sm:py-10">
          <ArticleBody
            introductionTitle={publication.introductionTitle}
            introductionParagraphs={
              publication.introductionParagraphs || []
            }
            contentBlocks={publication.contentBlocks || []}
            closingTitle={publication.closingTitle}
            closingParagraphs={
              publication.closingParagraphs || []
            }
            closingBullets={publication.closingBullets || []}
            author={publication.author}
          />

          <ArticleNavigation
            previousArticle={previousArticle}
            nextArticle={nextArticle}
            basePath={basePath}
          />

          <div className="mt-8 border-t border-gray-200 pt-6 text-center">
            <Link
              to={backLink}
              className="text-sm font-medium text-[#315778] underline underline-offset-4 transition hover:text-[#E87565]"
            >
              {backLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}