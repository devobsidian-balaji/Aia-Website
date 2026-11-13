
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SplitFeatureCard from "../../components/learn-more/SplitFeatureCard";
import ArticleCard from "../../components/ArticleCard";
import { getArticles, getNews } from "../../services/api";

const filters = ["All Entries", "Articles", "News"];

export default function AllEntriesPage() {
  const [articles, setArticles] = useState([]);
  const [news, setNews] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Entries");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchEntries = async () => {
      setLoading(true);
      setError("");

      try {
        const results = await Promise.allSettled([
          getArticles(),
          getNews(),
        ]);

        if (!mounted) return;

        const articlesResult = results[0];
        const newsResult = results[1];

        if (articlesResult.status === "fulfilled") {
          setArticles(
            Array.isArray(articlesResult.value)
              ? articlesResult.value
              : []
          );
        } else {
          console.error("Articles loading error:", articlesResult.reason);
        }

        if (newsResult.status === "fulfilled") {
          setNews(
            Array.isArray(newsResult.value)
              ? newsResult.value
              : []
          );
        } else {
          console.error("News loading error:", newsResult.reason);
        }

        if (
          articlesResult.status === "rejected" &&
          newsResult.status === "rejected"
        ) {
          setError("Unable to load entries. Please try again later.");
        }
      } catch (err) {
        console.error("All entries loading error:", err);

        if (mounted) {
          setError("Unable to load entries. Please try again later.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchEntries();

    return () => {
      mounted = false;
    };
  }, []);

  const allEntries = useMemo(() => {
    const articleEntries = articles.map((item) => ({
      ...item,
      entryType: "article",
      entryId: item._id || item.id,
    }));

    const newsEntries = news.map((item) => ({
      ...item,
      entryType: "news",
      entryId: item._id || item.id,
    }));

    return [...articleEntries, ...newsEntries].sort((a, b) => {
      const dateA = new Date(
        a.publishedAt || a.createdAt || a.updatedAt || 0
      ).getTime();

      const dateB = new Date(
        b.publishedAt || b.createdAt || b.updatedAt || 0
      ).getTime();

      return dateB - dateA;
    });
  }, [articles, news]);

  const filteredEntries = useMemo(() => {
    let entries = allEntries;

    if (activeFilter === "Articles") {
      entries = entries.filter(
        (item) => item.entryType === "article"
      );
    } else if (activeFilter === "News") {
      entries = entries.filter(
        (item) => item.entryType === "news"
      );
    }

    const searchTerm = search.trim().toLowerCase();

    if (searchTerm) {
      entries = entries.filter((item) =>
        [
          item.title,
          item.category,
          item.author,
          item.slug,
          item.description,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(searchTerm)
          )
      );
    }

    return entries;
  }, [allEntries, activeFilter, search]);

  return (
    <main className="min-h-screen bg-white font-sans">
      <SplitFeatureCard
        eyebrow="AIA Publications"
        title="All Entries"
        description="Explore the latest articles, industry updates and news from the Automation Industry Association."
        image="/articles/articles-hero-img.png"
        imageAlt="Smart manufacturing and industrial automation"
        imagePosition="right"
        background="dark"
      />

      {/* Filters and Search */}
      <section className="bg-white px-5 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1250px]">
          <div className="flex flex-col gap-6 border-b border-gray-200 pb-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "border-[#20466C] bg-[#20466C] text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-[#20466C] hover:text-[#20466C]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="w-full lg:max-w-[320px]">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search articles or news..."
                aria-label="Search entries"
                className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-sm text-gray-800 outline-none transition focus:border-[#20466C] focus:ring-2 focus:ring-[#20466C]/10"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-6">
            <h2 className="text-xl font-semibold text-[#173653] sm:text-2xl">
              {activeFilter === "All Entries"
                ? "Latest Publications"
                : activeFilter}
            </h2>

            <p className="text-sm text-gray-500">
              {filteredEntries.length}{" "}
              {filteredEntries.length === 1 ? "entry" : "entries"} found
            </p>
          </div>
        </div>
      </section>

      {/* Entries */}
      {loading ? (
        <div className="px-5 py-20 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#20466C]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading entries...
          </p>
        </div>
      ) : error ? (
        <div className="px-5 py-20 text-center">
          <p className="text-sm text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-full bg-[#20466C] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#173653]"
          >
            Try Again
          </button>
        </div>
      ) : filteredEntries.length > 0 ? (
        <section className="bg-white px-5 pb-12 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1250px] grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4 lg:gap-x-7">
            {filteredEntries.map((item, index) => (
              <div
                key={`${item.entryType}-${item.entryId || item.slug || index}`}
                className="relative"
              >
                {/* Entry Type */}
                <span className="mb-3 inline-flex rounded-full bg-[#EAF1F7] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#20466C] sm:text-xs">
                  {item.entryType === "article" ? "Article" : "News"}
                </span>

                <ArticleCard
                  image={item.image}
                  imageAlt={item.imageAlt}
                  title={item.title}
                  category={item.category}
                  categoryLink={item.categoryLink}
                  slug={item.slug}
                  detailBasePath={
                    item.entryType === "article"
                      ? "/publication/articles"
                      : "/publication/news"
                  }
                />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="px-5 py-20 text-center">
          <h3 className="text-xl font-semibold text-[#173653]">
            No entries found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {search
              ? "Try searching with another keyword."
              : "There are no published entries in this category yet."}
          </p>
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-4 text-sm font-semibold text-[#20466C] underline underline-offset-4"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Bottom Navigation */}
      <section className="border-t border-gray-100 bg-[#F8FAFC] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1250px] flex-wrap items-center justify-center gap-6 text-sm">
          <Link
            to="/publication/articles"
            className="font-medium text-[#20466C] transition hover:underline"
          >
            Browse All Articles
          </Link>

          <Link
            to="/publication/news"
            className="font-medium text-[#20466C] transition hover:underline"
          >
            Browse All News
          </Link>
        </div>
      </section>
    </main>
  );
}
