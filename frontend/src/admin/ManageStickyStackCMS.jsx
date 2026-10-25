
import React, { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  RefreshCw,
  Layers,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const DEFAULT_ITEM = {
  title: "",
  description: "",
  number: 1,
  background: "bg-[#202B3B]",
  textColor: "text-white",
  numberColor: "text-white",
  titleClassName: "",
  descriptionClassName: "",
  isActive: true,
};

const EMPTY_SECTION = {
  heading: "",
  subtitle: "",
  isActive: true,
  items: [],
};

export default function ManageStickyStackCMS({
  defaultPageKey = "about-aia",
  defaultSectionKey = "our-journey",
}) {
  // Each CMS instance manages only its own section.
  const pageKey = defaultPageKey;
  const sectionKey = defaultSectionKey;

  const basePath = `${API_URL}/sticky-stack/admin/${encodeURIComponent(
    pageKey
  )}/${encodeURIComponent(sectionKey)}`;

  const [section, setSection] = useState(EMPTY_SECTION);
  const [form, setForm] = useState({ ...DEFAULT_ITEM });
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [itemSaving, setItemSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const request = useCallback(async (url, options = {}) => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("adminToken");

    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.body
          ? { "Content-Type": "application/json" }
          : {}),
        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {}),
        ...options.headers,
      },
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success === false) {
      throw new Error(
        result.message || `Request failed (${response.status})`
      );
    }

    return result;
  }, []);

  const loadSection = useCallback(async () => {
    setLoading(true);
    setError("");
    setNotice("");
    setEditingId(null);
    setForm({ ...DEFAULT_ITEM });

    try {
      const result = await request(basePath);
      const data = result.data || {};

      setSection({
        heading: data.heading ?? "",
        subtitle: data.subtitle ?? "",
        isActive: data.isActive ?? true,
        items: Array.isArray(data.items) ? data.items : [],
      });
    } catch (err) {
      setError(err.message || "Failed to load Sticky Stack section.");
    } finally {
      setLoading(false);
    }
  }, [basePath, request]);

  useEffect(() => {
    loadSection();
  }, [loadSection]);

  const updateSectionField = (field, value) => {
    setSection((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updateFormField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Save heading, subtitle and section visibility.
  const saveSection = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const result = await request(basePath, {
        method: "PUT",
        body: JSON.stringify({
          heading: section.heading,
          subtitle: section.subtitle,
          isActive: section.isActive,
        }),
      });

      if (result.data) {
        setSection((previous) => ({
          ...previous,
          heading: result.data.heading ?? previous.heading,
          subtitle: result.data.subtitle ?? previous.subtitle,
          isActive: result.data.isActive ?? previous.isActive,
        }));
      }

      setNotice("Section settings saved successfully.");
    } catch (err) {
      setError(err.message || "Failed to save section settings.");
    } finally {
      setSaving(false);
    }
  };

  const resetItemForm = () => {
    setForm({
      ...DEFAULT_ITEM,
      number: section.items.length + 1,
    });
    setEditingId(null);
  };

  const startEditing = (item) => {
    setEditingId(item._id);

    setForm({
      title: item.title ?? "",
      description: item.description ?? "",
      number: item.number ?? 1,
      background: item.background ?? "bg-[#202B3B]",
      textColor: item.textColor ?? "text-white",
      numberColor: item.numberColor ?? "text-white",
      titleClassName: item.titleClassName ?? "",
      descriptionClassName: item.descriptionClassName ?? "",
      isActive: item.isActive !== false,
    });

    setError("");
    setNotice("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add or update card.
  const saveItem = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Please enter a card title.");
      return;
    }

    setItemSaving(true);
    setError("");
    setNotice("");

    try {
      const isEditing = Boolean(editingId);

      const url = isEditing
        ? `${basePath}/items/${encodeURIComponent(editingId)}`
        : `${basePath}/items`;

      const result = await request(url, {
        method: isEditing ? "PUT" : "POST",
        body: JSON.stringify({
          ...form,
          title: form.title.trim(),
          description: form.description.trim(),
          number: Number(form.number),
        }),
      });

      if (isEditing) {
        setSection((previous) => ({
          ...previous,
          items: previous.items.map((item) =>
            item._id === editingId
              ? { ...item, ...result.data }
              : item
          ),
        }));

        setNotice("Card updated successfully.");
      } else {
        setSection((previous) => ({
          ...previous,
          items: [...previous.items, result.data],
        }));

        setNotice("Card added successfully.");
      }

      resetItemForm();
    } catch (err) {
      setError(err.message || "Failed to save card.");
    } finally {
      setItemSaving(false);
    }
  };

  // Delete card.
  const deleteItem = async (item) => {
    if (!item._id) {
      setError("Card ID is missing. Refresh and try again.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.title}"?`
    );

    if (!confirmed) return;

    setDeletingId(item._id);
    setError("");
    setNotice("");

    try {
      await request(
        `${basePath}/items/${encodeURIComponent(item._id)}`,
        { method: "DELETE" }
      );

      setSection((previous) => ({
        ...previous,
        items: previous.items.filter(
          (current) => current._id !== item._id
        ),
      }));

      if (editingId === item._id) {
        resetItemForm();
      }

      setNotice("Card deleted successfully.");
    } catch (err) {
      setError(err.message || "Failed to delete card.");
    } finally {
      setDeletingId(null);
    }
  };

  // Activate/deactivate a card.
  const toggleItemStatus = async (item) => {
    if (!item._id) {
      setError("Card ID is missing. Refresh and try again.");
      return;
    }

    setTogglingId(item._id);
    setError("");
    setNotice("");

    try {
      const result = await request(
        `${basePath}/items/${encodeURIComponent(item._id)}`,
        {
          method: "PUT",
          body: JSON.stringify({
            isActive: item.isActive === false,
          }),
        }
      );

      setSection((previous) => ({
        ...previous,
        items: previous.items.map((current) =>
          current._id === item._id
            ? { ...current, ...result.data }
            : current
        ),
      }));

      setNotice(
        item.isActive === false
          ? "Card activated successfully."
          : "Card deactivated successfully."
      );
    } catch (err) {
      setError(err.message || "Failed to update card status.");
    } finally {
      setTogglingId(null);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100";

  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Layers size={17} />
              <span>Content Management</span>
              <span>/</span>
              <span>Sticky Stack CMS</span>
            </div>

            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Sticky Stack Cards
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage cards for this page section.
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-md bg-gray-200 px-2 py-1 text-gray-700">
                Page: {pageKey}
              </span>
              <span className="rounded-md bg-gray-200 px-2 py-1 text-gray-700">
                Section: {sectionKey}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={loadSection}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          >
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
            Loading Sticky Stack section...
          </div>
        ) : (
          <>
            {/* Section Settings */}
            <form
              onSubmit={saveSection}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Section Settings
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Configure the heading, subtitle and visibility.
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    section.isActive
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {section.isActive ? "Published" : "Hidden"}
                </span>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Section heading
                  </label>
                  <input
                    value={section.heading}
                    onChange={(event) =>
                      updateSectionField("heading", event.target.value)
                    }
                    placeholder="Enter section heading"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Section subtitle
                  </label>
                  <input
                    value={section.subtitle}
                    onChange={(event) =>
                      updateSectionField("subtitle", event.target.value)
                    }
                    placeholder="Enter section subtitle"
                    className={inputClass}
                  />
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl bg-gray-50 p-4">
                <input
                  type="checkbox"
                  checked={section.isActive}
                  onChange={(event) =>
                    updateSectionField("isActive", event.target.checked)
                  }
                  className="h-4 w-4 accent-gray-900"
                />

                <span>
                  <span className="block text-sm font-medium text-gray-900">
                    Publish section
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    Disable to hide this section from the public API.
                  </span>
                </span>
              </label>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50"
                >
                  <Save size={16} />
                  {saving ? "Saving..." : "Save Section"}
                </button>
              </div>
            </form>

            {/* Add/Edit Card */}
            <form
              onSubmit={saveItem}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {editingId ? "Edit Card" : "Add New Card"}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the content and styling classes.
                  </p>
                </div>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetItemForm}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <X size={15} />
                    Cancel
                  </button>
                )}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    Card title *
                  </label>
                  <input
                    required
                    value={form.title}
                    onChange={(event) =>
                      updateFormField("title", event.target.value)
                    }
                    placeholder="Enter card title"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Card number
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.number}
                    onChange={(event) =>
                      updateFormField("number", event.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(event) =>
                      updateFormField("description", event.target.value)
                    }
                    placeholder="Enter card description"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Background Tailwind class
                  </label>
                  <input
                    value={form.background}
                    onChange={(event) =>
                      updateFormField("background", event.target.value)
                    }
                    placeholder="bg-[#202B3B]"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Text color Tailwind class
                  </label>
                  <input
                    value={form.textColor}
                    onChange={(event) =>
                      updateFormField("textColor", event.target.value)
                    }
                    placeholder="text-white"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Number color Tailwind class
                  </label>
                  <input
                    value={form.numberColor}
                    onChange={(event) =>
                      updateFormField("numberColor", event.target.value)
                    }
                    placeholder="text-white"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Title extra classes
                  </label>
                  <input
                    value={form.titleClassName}
                    onChange={(event) =>
                      updateFormField("titleClassName", event.target.value)
                    }
                    placeholder="Optional Tailwind classes"
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Description extra classes
                  </label>
                  <input
                    value={form.descriptionClassName}
                    onChange={(event) =>
                      updateFormField(
                        "descriptionClassName",
                        event.target.value
                      )
                    }
                    placeholder="Optional Tailwind classes"
                    className={inputClass}
                  />
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl bg-gray-50 p-4">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(event) =>
                    updateFormField("isActive", event.target.checked)
                  }
                  className="h-4 w-4 accent-gray-900"
                />
                <span className="text-sm font-medium text-gray-800">
                  Card is active
                </span>
              </label>

              {/* Preview */}
              <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
                <p className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Card preview
                </p>

                <div
                  className={`flex min-h-32 items-center gap-5 p-6 ${
                    form.background || "bg-[#202B3B]"
                  } ${form.textColor || "text-white"}`}
                >
                  <span
                    className={`text-3xl font-medium ${
                      form.numberColor || "text-white"
                    }`}
                  >
                    {form.number || 1}
                  </span>

                  <div className="min-w-0">
                    <h3 className={form.titleClassName}>
                      {form.title || "Card title"}
                    </h3>
                    <p
                      className={`mt-2 text-sm opacity-90 ${form.descriptionClassName}`}
                    >
                      {form.description || "Card description preview"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetItemForm}
                    className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  disabled={itemSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50"
                >
                  {editingId ? <Save size={16} /> : <Plus size={17} />}
                  {itemSaving
                    ? "Saving..."
                    : editingId
                    ? "Update Card"
                    : "Add Card"}
                </button>
              </div>
            </form>

            {/* Cards List */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Existing Cards
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage cards belonging to this section only.
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700">
                  {section.items.length} cards
                </span>
              </div>

              {section.items.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 px-5 py-12 text-center">
                  <Layers
                    size={32}
                    className="mx-auto text-gray-400"
                  />
                  <h3 className="mt-4 font-medium text-gray-900">
                    No cards added yet
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Use the form above to create your first card.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {section.items.map((item, index) => (
                    <div
                      key={item._id || index}
                      className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex min-w-0 flex-1 items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg font-semibold text-gray-800">
                          {item.number ?? index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="break-words font-semibold text-gray-900">
                              {item.title || "Untitled card"}
                            </h3>

                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                item.isActive === false
                                  ? "bg-gray-100 text-gray-600"
                                  : "bg-green-50 text-green-700"
                              }`}
                            >
                              {item.isActive === false
                                ? "Inactive"
                                : "Active"}
                            </span>
                          </div>

                          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                            {item.description || "No description"}
                          </p>

                          <p className="mt-2 break-all text-xs text-gray-400">
                            {item.background || "bg-[#202B3B]"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                        <button
                          type="button"
                          onClick={() => toggleItemStatus(item)}
                          disabled={togglingId === item._id}
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                        >
                          {item.isActive === false ? (
                            <Eye size={15} />
                          ) : (
                            <EyeOff size={15} />
                          )}

                          {togglingId === item._id
                            ? "Updating..."
                            : item.isActive === false
                            ? "Activate"
                            : "Deactivate"}
                        </button>

                        <button
                          type="button"
                          onClick={() => startEditing(item)}
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteItem(item)}
                          disabled={deletingId === item._id}
                          className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 size={15} />
                          {deletingId === item._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
