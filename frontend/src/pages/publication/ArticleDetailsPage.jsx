// import React, { useEffect, useState } from "react";
// import { Link, useParams, Navigate } from "react-router-dom";

// import { getArticleBySlug, getArticles } from "../../services/api";
// import ArticleBody from "../../components/publication/ArticleBody";
// import ArticleNavigation from "../../components/publication/ArticleNavigation";
// import SplitFeatureCard from "../../components/learn-more/SplitFeatureCard";

// export default function ArticleDetailsPage() {
//   const { slug } = useParams();

//   const [article, setArticle] = useState(null);
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     let mounted = true;

//     const loadArticle = async () => {
//       setLoading(true);
//       setNotFound(false);

//       try {
//         const [articleData, allArticles] = await Promise.all([
//           getArticleBySlug(slug),
//           getArticles(),
//         ]);

//         if (!mounted) return;

//         setArticle(articleData);
//         setArticles(allArticles);
//         setNotFound(!articleData);
//       } catch (error) {
//         if (mounted) {
//           console.error(error);
//           setNotFound(true);
//         }
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     loadArticle();

//     return () => {
//       mounted = false;
//     };
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading article...
//       </div>
//     );
//   }

//   if (notFound || !article) {
//     return <Navigate to="/publication/articles" replace />;
//   }

//   const currentIndex = articles.findIndex(
//     (item) => item.slug === article.slug
//   );

//   const previousArticle =
//     currentIndex > 0 ? articles[currentIndex - 1] : null;

//   const nextArticle =
//     currentIndex >= 0 && currentIndex < articles.length - 1
//       ? articles[currentIndex + 1]
//       : null;

//   return (
//     <main className="min-h-screen bg-white font-sans">
//       <SplitFeatureCard
//         eyebrow=""
//         title="Driving India's Smart Manufacturing Mission"
//         description=""
//         image="/national-party.png"
//         imageAlt="Smart manufacturing and industrial automation"
//         imagePosition="right"
//         background="dark"
//       />

//       <article className="mx-auto w-full max-w-[1100px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
//         <header className="mb-7 text-center">
//           <h1 className="mx-auto max-w-[850px] text-base font-bold leading-[1.4] text-[#263247] sm:text-[32px]">
//             {article.title}
//           </h1>

//           {article.introduction && (
//             <p className="mx-auto mt-4 max-w-[850px] text-base leading-[1.7] text-[#263247]">
//               {article.introduction}
//             </p>
//           )}

//           {article.category && (
//             <p className="mt-3 text-sm text-gray-500">
//               {article.category}
//             </p>
//           )}
//         </header>

//         {article.detailCoverImage && (
//           <figure className="mb-7">
//             <img
//               src={article.detailCoverImage}
//               alt={article.title}
//               className="max-h-[400px] w-full object-cover"
//               loading="eager"
//             />
//           </figure>
//         )}

//         <ArticleBody
//           sections={article.sections || []}
//           author={article.author}
//         />

//         <ArticleNavigation
//           previousArticle={previousArticle}
//           nextArticle={nextArticle}
//         />

//         <div className="mt-7 text-center">
//           <Link
//             to="/publication/articles"
//             className="text-base font-medium text-[#315778] underline underline-offset-4 hover:text-[#E87565]"
//           >
//             Back to all articles
//           </Link>
//         </div>
//       </article>
//     </main>
//   );
// }



import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import {
  getArticleBySlug,
  getArticles,
} from "../../services/api";

import PublicationDetailLayout from "../../components/PublicationDetailLayout";

export default function ArticleDetailsPage() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadArticle = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const [articleData, allArticles] = await Promise.all([
          getArticleBySlug(slug),
          getArticles(),
        ]);

        if (!mounted) return;

        setArticle(articleData);
        setArticles(allArticles || []);
        setNotFound(!articleData);
      } catch (error) {
        console.error("Article detail error:", error);

        if (mounted) {
          setNotFound(true);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadArticle();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading article...
      </div>
    );
  }

  if (notFound || !article) {
    return <Navigate to="/publication/articles" replace />;
  }

  const sortedArticles = [...articles].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  const currentIndex = sortedArticles.findIndex(
    (item) =>
      item._id === article._id ||
      item.slug === article.slug
  );

  const previousArticle =
    currentIndex > 0
      ? sortedArticles[currentIndex - 1]
      : null;

  const nextArticle =
    currentIndex >= 0 &&
    currentIndex < sortedArticles.length - 1
      ? sortedArticles[currentIndex + 1]
      : null;

  return (
    <PublicationDetailLayout
      publication={article}
      previousArticle={previousArticle}
      nextArticle={nextArticle}
      backLink="/publication/articles"
      backLabel="Back to all articles"
      basePath="/publication/articles"
    />
  );
}