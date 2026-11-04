import React, { useEffect, useState } from "react";
import SplitFeatureCard from "../../../components/learn-more/SplitFeatureCard";
import NewsCardGrid from "../../../components/publication/news/NewsCardGrid";
import { getNews } from "../../../services/api";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getNews()
      .then((data) => {
        if (mounted) setNews(data);
      })
      .catch((error) => {
        console.error("News loading error:", error);
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
        title="News"
        description=""
        image="/national-party.png"
        imageAlt="Smart manufacturing and industrial automation"
        imagePosition="right"
        background="dark"
      />

      {loading ? (
        <p className="py-16 text-center text-sm text-gray-500">
          Loading news...
        </p>
      ) : news.length ? (
        <NewsCardGrid items={news} columns={4} />
      ) : (
        <p className="py-16 text-center text-sm text-gray-500">
          No news published yet.
        </p>
      )}
    </main>
  );
};

export default NewsPage;