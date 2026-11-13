
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  RefreshCw,
  Loader2,
  Search,
  FileText,
  Newspaper,
  Filter,
} from "lucide-react";

import {
  getArticles,
  updateArticle,
  deleteArticle,
  getNews,
  updateNews,
  deleteNews,
} from "../services/api";

export default function AllEntries({ onNavigate }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadEntries = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const results = await Promise.allSettled([
        getArticles(true),
        getNews(true),
      ]);

      const articlesResult = results[0];
      const newsResult = results[1];

      const articles =
        articlesResult.status === "fulfilled" &&
        Array.isArray(articlesResult.value)
          ? articlesResult.value.map((item) => ({
              ...item,
              entryType: "article",
            }))
          : [];

      const news =
        newsResult.status === "fulfilled" &&
        Array.isArray(newsResult.value)
          ? newsResult.value.map((item) => ({
              ...item,
              entryType: "news",
            }))
          : [];

      if (
        articlesResult.status === "rejected" &&
        newsResult.status === "rejected"
      ) {
        throw articlesResult.reason || newsResult.reason;
      }

      if (articlesResult.status === "rejected") {
        console.error("Articles loading error:", articlesResult.reason);
      }

      if (newsResult.status === "rejected") {
        console.error("News loading error:", newsResult.reason);
      }

      setEntries([...articles, ...news]);
      
      if (
        articlesResult.status === "rejected" ||
        newsResult.status === "rejected"
      ) {
        setError("Some entries could not be loaded. Please refresh.");
      }
    } catch (err) {
      console.error("All entries loading error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load articles and news."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const categories = useMemo(() => {
    return [
      ...new Set(
        entries
          .map((item) => item.category)
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries
      .filter((item) => {
        if (
          activeFilter !== "all" &&
          item.entryType !== activeFilter
        ) {
          return false;
        }

        if (
          categoryFilter !== "all" &&
          item.category !== categoryFilter
        ) {
          return false;
        }

        if (statusFilter === "published" && !item.isActive) {
          return false;
        }

        if (statusFilter === "hidden" && item.isActive) {
          return false;
        }

        const searchText = search.trim().toLowerCase();

        if (searchText) {
          const searchableText = [
            item.title,
            item.category,
            item.author,
            item.slug,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          if (!searchableText.includes(searchText)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(
          a.updatedAt || a.createdAt || 0
        ).getTime();

        const dateB = new Date(
          b.updatedAt || b.createdAt || 0
        ).getTime();

        return dateB - dateA;
      });
  }, [
    entries,
    activeFilter,
    categoryFilter,
    statusFilter,
    search,
  ]);

  const counts = useMemo(() => {
    return {
      all: entries.length,
      article: entries.filter(
        (item) => item.entryType === "article"
      ).length,
      news: entries.filter(
        (item) => item.entryType === "news"
      ).length,
    };
  }, [entries]);

  const handleEdit = (item) => {
    if (item.entryType === "article") {
      onNavigate?.("add-article", item);
    } else {
      onNavigate?.("add-news", item);
    }
  };

  const handleDelete = async (item) => {
    const label = item.entryType === "article" ? "article" : "news";

    const confirmed = window.confirm(
      `Are you sure you want to delete this ${label}?`
    );

    if (!confirmed) return;

    const itemKey = `${item.entryType}-${item._id}`;

    try {
      setBusyId(itemKey);

      if (item.entryType === "article") {
        await deleteArticle(item._id);
      } else {
        await deleteNews(item._id);
      }

      setEntries((prev) =>
        prev.filter(
          (entry) =>
            !(
              entry._id === item._id &&
              entry.entryType === item.entryType
            )
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          `Unable to delete ${label}.`
      );
    } finally {
      setBusyId("");
    }
  };

  const toggleStatus = async (item) => {
    const itemKey = `${item.entryType}-${item._id}`;

    try {
      setBusyId(itemKey);

      const nextStatus = !item.isActive;

      const updateFunction =
        item.entryType === "article"
          ? updateArticle
          : updateNews;

      const updated = await updateFunction(item._id, {
        isActive: nextStatus,
      });

      setEntries((prev) =>
        prev.map((entry) =>
          entry._id === item._id &&
          entry.entryType === item.entryType
            ? {
                ...entry,
                ...(updated || {}),
                isActive: nextStatus,
              }
            : entry
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to update entry status."
      );
    } finally {
      setBusyId("");
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleAddEntry = () => {
    if (activeFilter === "news") {
      onNavigate?.("add-news");
    } else {
      onNavigate?.("add-article");
    }
  };

  return (
    <section className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#E25238]" />

            <h2 className="text-2xl font-extrabold text-[#1E293B]">
              All Entries
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Manage all your Articles and News from one place.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={loadEntries}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={handleAddEntry}
            className="flex items-center gap-2 rounded-lg bg-[#E25238] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#C9412B]"
          >
            <Plus size={16} />
            {activeFilter === "news"
              ? "Add News"
              : activeFilter === "article"
                ? "Add Article"
                : "Add New Entry"}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`rounded-xl border bg-white p-4 text-left transition ${
            activeFilter === "all"
              ? "border-[#E25238] ring-1 ring-[#E25238]/20"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-500">
              Total Entries
            </p>
            <FileText className="h-5 w-5 text-[#E25238]" />
          </div>

          <p className="mt-2 text-2xl font-extrabold text-[#1E293B]">
            {counts.all}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("article")}
          className={`rounded-xl border bg-white p-4 text-left transition ${
            activeFilter === "article"
              ? "border-[#E25238] ring-1 ring-[#E25238]/20"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-500">
              Articles
            </p>
            <FileText className="h-5 w-5 text-blue-500" />
          </div>

          <p className="mt-2 text-2xl font-extrabold text-[#1E293B]">
            {counts.article}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("news")}
          className={`rounded-xl border bg-white p-4 text-left transition ${
            activeFilter === "news"
              ? "border-[#E25238] ring-1 ring-[#E25238]/20"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-500">
              News
            </p>
            <Newspaper className="h-5 w-5 text-purple-500" />
          </div>

          <p className="mt-2 text-2xl font-extrabold text-[#1E293B]">
            {counts.news}
          </p>
        </button>
      </div>

      {/* Filters */}
      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { value: "all", label: "All Entries" },
            { value: "article", label: "Articles" },
            { value: "news", label: "News" },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveFilter(tab.value)}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
                activeFilter === tab.value
                  ? "bg-[#E25238] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
              <span className="ml-2 text-xs opacity-80">
                {counts[tab.value]}
              </span>
            </button>
          ))}
        </div>

        {/* Search and dropdown filters */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative md:col-span-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, author, category..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#E25238] focus:ring-2 focus:ring-[#E25238]/10"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#E25238]"
            >
              <option value="all">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#E25238]"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-800">
              {filteredEntries.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-gray-800">
              {entries.length}
            </span>{" "}
            entries
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategoryFilter("all");
              setStatusFilter("all");
              setActiveFilter("all");
            }}
            className="text-xs font-bold text-[#E25238] hover:underline"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-48 items-center justify-center">
          <Loader2
            className="animate-spin text-[#E87565]"
            size={30}
          />
        </div>
      ) : filteredEntries.length === 0 ? (
        /* Empty State */
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
          <FileText className="mx-auto h-10 w-10 text-gray-300" />

          <h3 className="mt-4 font-bold text-gray-800">
            No entries found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            No entries match your current search or filters.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategoryFilter("all");
              setStatusFilter("all");
              setActiveFilter("all");
            }}
            className="mt-5 rounded-lg bg-[#E25238] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#C9412B]"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        /* Entry Cards */
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredEntries.map((item) => {
            const itemKey = `${item.entryType}-${item._id}`;
            const isBusy = busyId === itemKey;
            const isArticle = item.entryType === "article";

            return (
              <article
                key={itemKey}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] bg-slate-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      No image available
                    </div>
                  )}

                  <span
                    className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold ${
                      isArticle
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {isArticle ? (
                      <FileText size={12} />
                    ) : (
                      <Newspaper size={12} />
                    )}
                    {isArticle ? "ARTICLE" : "NEWS"}
                  </span>

                  <span
                    className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold ${
                      item.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item.isActive ? "Published" : "Hidden"}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 p-4">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#E87565]">
                        {item.category || (isArticle ? "Article" : "News")}
                      </p>

                      <span className="text-[11px] text-gray-400">
                        {formatDate(item.createdAt || item.updatedAt)}
                      </span>
                    </div>

                    <h3 className="mt-1 line-clamp-2 font-bold text-[#202B3D]">
                      {item.title || "Untitled Entry"}
                    </h3>

                    <p className="mt-1 break-all text-xs text-gray-400">
                      /publication/{isArticle ? "articles" : "news"}/
                      {item.slug}
                    </p>

                    {item.author && (
                      <p className="mt-2 text-xs text-gray-500">
                        By{" "}
                        <span className="font-semibold text-gray-700">
                          {item.author}
                        </span>
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-50"
                    >
                      <Edit3 size={14} />
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => toggleStatus(item)}
                      className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                    >
                      {isBusy ? (
                        <Loader2
                          size={14}
                          className="animate-spin"
                        />
                      ) : item.isActive ? (
                        <EyeOff size={14} />
                      ) : (
                        <Eye size={14} />
                      )}

                      {item.isActive ? "Hide" : "Publish"}
                    </button>

                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleDelete(item)}
                      className="ml-auto flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
