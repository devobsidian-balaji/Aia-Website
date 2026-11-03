
import React, { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";

import { articlesData } from "../../../data/articlesData";
import ArticleBody from "../../../components/publication/ArticleBody";
import ArticleNavigation from "../../../components/publication/ArticleNavigation";
import SplitFeatureCard from "../../../components/learn-more/SplitFeatureCard";

export default function NewsDetailsPage() {
  const { slug } = useParams();

  const currentIndex = useMemo(
    () => articlesData.findIndex((article) => article.slug === slug),
    [slug]
  );

  const article = currentIndex >= 0
    ? articlesData[currentIndex]
    : null;

  if (!article) {
    return <Navigate to="/publication" replace />;
  }

  const previousArticle =
    currentIndex > 0
      ? articlesData[currentIndex - 1]
      : null;

  const nextArticle =
    currentIndex < articlesData.length - 1
      ? articlesData[currentIndex + 1]
      : null;

  return (
    <main className="min-h-screen bg-white font-sans">
          <SplitFeatureCard
                eyebrow=""
                title="Driving India's Smart Manufacturing Mission"
                description=""
                image="/national-party.png"
                imageAlt="Smart manufacturing and industrial automation"
                imagePosition="right"
                background="dark"
              />

      <article className="mx-auto w-full max-w-[1100px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">

        {/* Article Header */}
        <header className="mb-7 text-center">
          <h1 className="mx-auto max-w-[850px] text-base font-bold leading-[1.4] text-[#263247] sm:text-[32px]">
            {article.title}
          </h1>

          {article.introduction && (
            <p className="mx-auto mt-4 max-w-[850px] text-[16px] leading-[1.7] text-[#263247] sm:text-[16px]">
              {article.introduction}
            </p>
          )}

          {article.category && (
            <p className="mt-3 text-[14px] text-gray-500">
              {article.category}
            </p>
          )}
        </header>

        {/* Article Cover Image - Optional */}
        {article.detailCoverImage && (
          <figure className="mb-7">
            <img
              src={article.detailCoverImage}
              alt={article.title}
              className="max-h-[400px] w-full object-cover"
              loading="eager"
            />
          </figure>
        )}

        {/* Article Content */}
        <ArticleBody sections={article.sections} author={article.author} />

        {/* Previous / Next */}
        <ArticleNavigation
          previousArticle={previousArticle}
          nextArticle={nextArticle}
        />

        {/* Back to Articles */}
        <div className="mt-7 text-center">
          <Link
            to="/publication/articles"
            className="text-[16px] font-medium text-[#315778] underline underline-offset-4 hover:text-[#E87565]"
          >
            Back to all articles
          </Link>
        </div>

      </article>
    </main>
  );
}
