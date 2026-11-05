// import React, { useEffect, useState } from "react";
// import { Link, Navigate, useParams } from "react-router-dom";
// import SplitFeatureCard from "../../../components/learn-more/SplitFeatureCard";
// import { getNewsBySlug } from "../../../services/api";

// export default function NewsDetailsPage() {
//   const { slug } = useParams();

//   const [news, setNews] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [notFound, setNotFound] = useState(false);

//   useEffect(() => {
//     let mounted = true;

//     const fetchNews = async () => {
//       setLoading(true);
//       setNotFound(false);

//       try {
//         const data = await getNewsBySlug(slug);

//         if (mounted) {
//           setNews(data);
//           setNotFound(!data);
//         }
//       } catch (error) {
//         console.error("News detail error:", error);
//         if (mounted) setNotFound(true);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     fetchNews();

//     return () => {
//       mounted = false;
//     };
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         Loading news...
//       </div>
//     );
//   }

//   if (notFound || !news) {
//     return <Navigate to="/publication/news" replace />;
//   }

//   return (
//     <main className="min-h-screen bg-white font-sans">
//       <SplitFeatureCard
//         eyebrow=""
//         title="News"
//         description=""
//         image="/national-party.png"
//         imageAlt="Smart manufacturing and industrial automation"
//         imagePosition="right"
//         background="dark"
//       />

//       <article className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 lg:px-12">
//         <header className="mb-8 text-center">
//           {news.category && (
//             <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#E87565]">
//               {news.category}
//             </p>
//           )}

//           <h1 className="mx-auto max-w-4xl text-2xl font-bold leading-tight text-[#263247] sm:text-4xl">
//             {news.title}
//           </h1>

//           {news.publishedAt && (
//             <p className="mt-4 text-sm text-gray-500">
//               {news.publishedAt}
//             </p>
//           )}

//           {news.introduction && (
//             <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600">
//               {news.introduction}
//             </p>
//           )}
//         </header>

//         {(news.detailCoverImage || news.image) && (
//           <img
//             src={news.detailCoverImage || news.image}
//             alt={news.imageAlt || news.title}
//             className="mb-8 max-h-[480px] w-full rounded-lg object-cover"
//           />
//         )}

//         {news.author && (
//           <p className="mb-5 text-sm text-gray-500">
//             By {news.author}
//           </p>
//         )}

//         <div className="mx-auto max-w-3xl whitespace-pre-line text-base leading-8 text-[#354052]">
//           {news.content}
//         </div>

//         <div className="mt-10 text-center">
//           <Link
//             to="/publication/news"
//             className="font-medium text-[#315778] underline underline-offset-4 hover:text-[#E87565]"
//           >
//             Back to all news
//           </Link>
//         </div>
//       </article>
//     </main>
//   );
// }


import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import {
  getNewsBySlug,
  getNews,
} from "../../../services/api";

import PublicationDetailLayout from "../../../components/PublicationDetailLayout";

export default function NewsDetailsPage() {
  const { slug } = useParams();

  const [news, setNews] = useState(null);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadNews = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const [newsData, newsList] = await Promise.all([
          getNewsBySlug(slug),
          getNews(),
        ]);

        if (!mounted) return;

        setNews(newsData);
        setAllNews(newsList || []);
        setNotFound(!newsData);
      } catch (error) {
        console.error("News detail error:", error);

        if (mounted) {
          setNotFound(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadNews();

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading news...
      </div>
    );
  }

  if (notFound || !news) {
    return <Navigate to="/publication/news" replace />;
  }

  // Sort news by CMS display order
  const sortedNews = [...allNews].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  // Find current news
  const currentIndex = sortedNews.findIndex(
    (item) =>
      item._id === news._id ||
      item.slug === news.slug
  );

  // Previous news
  const previousNews =
    currentIndex > 0
      ? sortedNews[currentIndex - 1]
      : null;

  // Next news
  const nextNews =
    currentIndex >= 0 &&
    currentIndex < sortedNews.length - 1
      ? sortedNews[currentIndex + 1]
      : null;

  return (
    <PublicationDetailLayout
      publication={news}
      previousArticle={previousNews}
      nextArticle={nextNews}
      backLink="/publication/news"
      backLabel="Back to all news"
    />
  );
}
