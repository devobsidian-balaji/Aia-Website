
import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Loader2,
  FileText,
  CalendarDays,
  Building2,
  Newspaper,
  BookOpen,
  Users,
  ArrowUpRight,
  X,
} from "lucide-react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const categoryIcons = {
  Page: FileText,
  Member: Building2,
  Article: BookOpen,
  News: Newspaper,
  Event: CalendarDays,
  Publication: BookOpen,
  Service: FileText,
  Initiative: FileText,
  Council: Users,
  "Past President": Users,
};

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const isExternalUrl = (url = "") =>
  /^https?:\/\//i.test(url);

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [input, setInput] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setInput(initialQuery);
    setQuery(initialQuery);
  }, [initialQuery]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      const value = input.trim();

      setQuery(value);

      if (value) {
        setSearchParams({ q: value }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [input, setSearchParams]);

  // Fetch global search results
  useEffect(() => {
    const controller = new AbortController();

    const fetchResults = async () => {
      if (query.length < 2) {
        setResults([]);
        setLoading(false);
        setError("");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/search?q=${encodeURIComponent(query)}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok || data.success === false) {
          throw new Error(
            data.message || "Search request failed."
          );
        }

        setResults(
          Array.isArray(data.results) ? data.results : []
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Global Search Error:", err);
          setError(
            err.message || "Unable to search right now. Please try again."
          );
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchResults();

    return () => controller.abort();
  }, [query]);

  const categories = useMemo(() => {
    const unique = [...new Set(results.map((item) => item.type).filter(Boolean))];
    return ["All", ...unique];
  }, [results]);

  const filteredResults = useMemo(() => {
    if (activeCategory === "All") return results;

    return results.filter(
      (item) => item.type === activeCategory
    );
  }, [results, activeCategory]);

  const handleClear = () => {
    setInput("");
    setQuery("");
    setResults([]);
    setActiveCategory("All");
    setSearchParams({}, { replace: true });
  };

  const renderResultLink = (item, children) => {
    const url = item.url || "/";

    if (isExternalUrl(url)) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="block h-full"
        >
          {children}
        </a>
      );
    }

    return (
      <Link to={url} className="block h-full">
        {children}
      </Link>
    );
  };

  return (
    <main className="min-h-[70vh] bg-[#F8FAFC]">
      {/* Search Hero */}
      <section className="relative overflow-hidden bg-[#0B131E] px-5 py-16 text-white sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#E25238]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#F16B5E]">
            AIA Website
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Search AIA
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
            Discover members, events, articles, news, publications
            and information across the Automation Industry Association.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-xl bg-white p-2 shadow-2xl">
            <Search className="ml-2 shrink-0 text-gray-400" size={21} />

            <input
              type="search"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") handleClear();
              }}
              placeholder="Search anything..."
              aria-label="Search the AIA website"
              className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#172033] outline-none placeholder:text-gray-400 sm:text-base"
            />

            {input && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <p className="mt-3 text-xs text-gray-400">
            Search by keyword, topic, company, event or publication.
          </p>
        </div>
      </section>

      {/* Search Results */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
        {query.length < 2 ? (
          <div className="py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#E25238] shadow-sm">
              <Search size={27} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#172033]">
              What are you looking for?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Enter at least 2 characters to search across AIA.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-[#172033]">
                  Search Results
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Results for{" "}
                  <span className="font-semibold text-[#E25238]">
                    "{query}"
                  </span>
                </p>
              </div>

              {!loading && !error && (
                <p className="text-sm text-gray-500">
                  {filteredResults.length} result
                  {filteredResults.length === 1 ? "" : "s"}
                </p>
              )}
            </div>

            {/* Category Filters */}
            {!loading && results.length > 0 && (
              <div className="mb-7 flex flex-wrap gap-2">
                {categories.map((category) => {
                  const selected = activeCategory === category;

                  const count =
                    category === "All"
                      ? results.length
                      : results.filter(
                          (item) => item.type === category
                        ).length;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        selected
                          ? "border-[#E25238] bg-[#E25238] text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-[#E25238] hover:text-[#E25238]"
                      }`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <Loader2 className="animate-spin text-[#E25238]" size={32} />
                <p className="mt-4 text-sm">Searching AIA website...</p>
              </div>
            )}

            {!loading && error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-8 text-center">
                <p className="font-semibold text-red-700">
                  Search could not be completed
                </p>
                <p className="mt-2 text-sm text-red-600">{error}</p>
                <button
                  type="button"
                  onClick={() => setQuery((current) => `${current} `)}
                  className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && filteredResults.length === 0 && (
              <div className="rounded-xl border border-gray-200 bg-white px-5 py-14 text-center">
                <Search className="mx-auto text-gray-300" size={36} />

                <h3 className="mt-4 text-lg font-bold text-[#172033]">
                  No results found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try different keywords or select another category.
                </p>
              </div>
            )}

            {!loading && !error && filteredResults.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResults.map((item, index) => {
                  const Icon =
                    categoryIcons[item.type] || FileText;

                  return (
                    <article
                      key={`${item.type}-${item.id || index}`}
                      className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#E25238]/40 hover:shadow-lg"
                    >
                      {renderResultLink(
                        item,
                        <>
                          {item.image ? (
                            <div className="h-44 overflow-hidden bg-gray-100">
                              <img
                                src={item.image}
                                alt={item.title || "Search result"}
                                loading="lazy"
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                onError={(event) => {
                                  event.currentTarget.style.display = "none";
                                }}
                              />
                            </div>
                          ) : (
                            <div className="flex h-28 items-center justify-center bg-[#0B131E] text-white">
                              <Icon size={34} />
                            </div>
                          )}

                          <div className="p-5">
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-[#FFF0ED] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#D94E38]">
                                {item.type}
                              </span>

                              {item.category && (
                                <span className="text-[11px] text-gray-500">
                                  {item.category}
                                </span>
                              )}
                            </div>

                            <h3 className="line-clamp-2 text-base font-bold leading-6 text-[#172033] transition group-hover:text-[#E25238]">
                              {item.title}
                            </h3>

                            {item.description && (
                              <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                                {item.description}
                              </p>
                            )}

                            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3">
                              <span className="text-[11px] text-gray-400">
                                {formatDate(item.date)}
                              </span>

                              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E25238]">
                                View Details
                                <ArrowUpRight size={14} />
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
