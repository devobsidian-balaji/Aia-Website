import React, { useEffect, useState } from "react";
import SplitFeatureCard from "../../components/learn-more/SplitFeatureCard";
import ArticleCardGrid from "../../components/publication/ArticleCardGrid";
import { getArticles } from "../../services/api";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getArticles()
      .then((data) => {
        if (mounted) setArticles(data);
      })
      .catch((error) => {
        console.error("Articles loading error:", error);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white font-sans">
      <SplitFeatureCard
        eyebrow=""
        title="All Articles"
        description=""
        image="/articles/articles-hero-img.png"
        imageAlt="Smart manufacturing and industrial automation"
        imagePosition="right"
        background="dark"
      />

      {loading ? (
        <p className="py-16 text-center text-sm text-gray-500">
          Loading articles...
        </p>
      ) : articles.length ? (
        <ArticleCardGrid items={articles} columns={4} />
      ) : (
        <p className="py-16 text-center text-sm text-gray-500">
          No articles published yet.
        </p>
      )}
    </main>
  );
};

export default ArticlesPage;