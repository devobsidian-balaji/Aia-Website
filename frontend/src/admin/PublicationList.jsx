import React, { useEffect, useState } from "react";

import {
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  RefreshCw,
  Loader2,
} from "lucide-react";

export default function PublicationList({
  type = "article",
  getItems,
  updateItem,
  deleteItem,
  onNavigate,
}) {
  const isArticle = type === "article";
  const label = isArticle ? "Article" : "News";
  const addTab = isArticle ? "add-article" : "add-news";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  const loadItems = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getItems(true);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          `Unable to load ${label}.`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${label.toLowerCase()}?`
    );

    if (!confirmed) return;

    try {
      setBusyId(id);

      await deleteItem(id);

      setItems((prev) =>
        prev.filter((item) => item._id !== id)
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
    try {
      setBusyId(item._id);

      const nextStatus = !item.isActive;

      const updated = await updateItem(item._id, {
        isActive: nextStatus,
      });

      setItems((prev) =>
        prev.map((current) =>
          current._id === item._id
            ? {
                ...current,
                ...(updated || {}),
                isActive: nextStatus,
              }
            : current
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to update status."
      );
    } finally {
      setBusyId("");
    }
  };

  const handleEdit = (item) => {
    onNavigate?.(addTab, item);
  };

  return (
    <section className="space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-extrabold text-[#1E293B]">
            All {isArticle ? "Articles" : "News"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage, publish and update your website content.
          </p>
        </div>

        <div className="flex gap-2">

          <button
            type="button"
            onClick={loadItems}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.(addTab)}
            className="flex items-center gap-2 rounded-lg bg-[#E25238] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#C9412B]"
          >
            <Plus size={16} />
            Add {label}
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
            size={28}
          />
        </div>

      ) : items.length === 0 ? (

        /* Empty State */
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">

          <h3 className="font-bold text-gray-800">
            No {isArticle ? "articles" : "news"} added yet
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Start by creating your first {label.toLowerCase()}.
          </p>

          <button
            type="button"
            onClick={() => onNavigate?.(addTab)}
            className="mt-5 rounded-lg bg-[#E25238] px-5 py-2.5 text-sm font-bold text-white"
          >
            Add {label}
          </button>

        </div>

      ) : (

        /* Content Cards */
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {items.map((item) => (

            <article
              key={item._id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >

              {/* Image */}
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

                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#E87565]">
                    {item.category || label}
                  </p>

                  <h3 className="mt-1 line-clamp-2 font-bold text-[#202B3D]">
                    {item.title}
                  </h3>

                  <p className="mt-1 break-all text-xs text-gray-400">
                    /{isArticle
                      ? "publication/articles"
                      : "publication/news"}
                    /{item.slug}
                  </p>

                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-3">

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50"
                  >
                    <Edit3 size={14} />
                    Edit
                  </button>

                  {/* Publish / Hide */}
                  <button
                    type="button"
                    disabled={busyId === item._id}
                    onClick={() => toggleStatus(item)}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    {busyId === item._id ? (
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

                  {/* Delete */}
                  <button
                    type="button"
                    disabled={busyId === item._id}
                    onClick={() => handleDelete(item._id)}
                    className="ml-auto flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>

                </div>
              </div>

            </article>

          ))}

        </div>
      )}

    </section>
  );
}