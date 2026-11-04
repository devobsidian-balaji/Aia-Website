
import React, { useEffect, useRef, useState } from "react";
import {
  Image as ImageIcon,
  Upload,
  Save,
  Trash2,
  Loader2,
  Eye,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Type,
  Layers,
} from "lucide-react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const PAGES = [
  { key: "about-aia", name: "About AIA" },
  { key: "membership", name: "Membership" },
  { key: "industry-insight", name: "Industry Insights" },
  { key: "talent-connect", name: "Talent Connect" },
  { key: "events", name: "Events" },
  { key: "contact-us", name: "Contact Us" },
  { key: "iafsm", name: "IAFSM" },
];

export default function ManagePageHero() {
  const fileInputRef = useRef(null);

  const [selectedPage, setSelectedPage] = useState(PAGES[0]);
  const [hero, setHero] = useState({
    heading: "",
    bannerImage: "",
    overlayOpacity: 85,
    isActive: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch selected page hero
  const fetchHero = async (pageKey) => {
    setLoading(true);
    setMessage(null);
    setImageFile(null);
    setPreview("");

    try {
      const response = await fetch(
        `${API_URL}/page-heroes/${pageKey}`
      );

      if (response.status === 404) {
        setHero({
          heading: "",
          bannerImage: "",
          overlayOpacity: 85,
          isActive: true,
        });
        return;
      }

      if (!response.ok) {
        throw new Error("Unable to fetch hero data");
      }

      const result = await response.json();
      const data = result?.data || result?.hero || result;

      setHero({
        heading: data?.heading || "",
        bannerImage: data?.bannerImage || "",
        overlayOpacity: data?.overlayOpacity ?? 85,
        isActive: data?.isActive ?? true,
      });

      setPreview(data?.bannerImage || "");
    } catch (error) {
      console.error("Fetch hero error:", error);
      setMessage({
        type: "error",
        text: "Unable to load hero data. Please check your API.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHero(selectedPage.key);
  }, [selectedPage]);

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({
        type: "error",
        text: "Please select a valid image file.",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Image size should be less than 10MB.",
      });
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setMessage(null);
  };

  // Save hero

const handleSave = async () => {
  if (!hero.heading.trim()) {
    setMessage({
      type: "error",
      text: "Please enter hero heading.",
    });
    return;
  }

  if (!hero.bannerImage && !imageFile) {
    setMessage({
      type: "error",
      text: "Please upload a hero image.",
    });
    return;
  }

  setSaving(true);
  setMessage(null);

  try {
    const formData = new FormData();

    formData.append("pageKey", selectedPage.key);
    formData.append("heading", hero.heading);
    formData.append("overlayOpacity", String(hero.overlayOpacity));
    formData.append("isActive", String(hero.isActive));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(`${API_URL}/page-heroes`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Unable to save page hero."
      );
    }

    setHero({
      heading: result.data.heading || "",
      bannerImage: result.data.bannerImage || "",
      overlayOpacity: result.data.overlayOpacity ?? 85,
      isActive: result.data.isActive ?? true,
    });

    setImageFile(null);
    setPreview(result.data.bannerImage || "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setMessage({
      type: "success",
      text: result.message || "Page hero saved successfully!",
    });
  } catch (error) {
    console.error("Save page hero error:", error);

    setMessage({
      type: "error",
      text: error.message || "Unable to save page hero.",
    });
  } finally {
    setSaving(false);
  }
};


  // Delete hero
  const handleDelete = async () => {
    if (!window.confirm(`Delete ${selectedPage.name} hero?`)) return;

    setDeleting(true);
    setMessage(null);

    try {
      const response = await fetch(
        `${API_URL}/page-heroes/${selectedPage.key}`,
        { method: "DELETE" }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Failed to delete hero");
      }

      setHero({
        heading: "",
        bannerImage: "",
        overlayOpacity: 85,
        isActive: true,
      });

      setImageFile(null);
      setPreview("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setMessage({
        type: "success",
        text: "Hero deleted successfully.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Delete failed.",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
            <Layers size={16} />
            Website Management
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Page Hero CMS
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage hero banners and headings for all website pages.
          </p>
        </div>

        <button
          onClick={() => fetchHero(selectedPage.key)}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Page Selector */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="mb-3 block text-sm font-semibold text-slate-800">
          Select Website Page
        </label>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PAGES.map((page) => (
            <button
              key={page.key}
              onClick={() => setSelectedPage(page)}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                selectedPage.key === page.key
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-slate-50"
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <ImageIcon size={17} />
                {selectedPage.key === page.key && (
                  <CheckCircle2 size={15} />
                )}
              </div>
              {page.name}
            </button>
          ))}
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div
          className={`mb-6 flex items-center gap-3 rounded-xl border p-4 text-sm ${
            message.type === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={19} />
          ) : (
            <AlertCircle size={19} />
          )}
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="flex min-h-[350px] items-center justify-center">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="mb-6 text-lg font-bold text-slate-900">
              Edit {selectedPage.name} Hero
            </h2>

            {/* Heading */}
            <div className="mb-6">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Type size={16} />
                Hero Heading
              </label>

              <textarea
                rows={3}
                value={hero.heading}
                onChange={(e) =>
                  setHero((prev) => ({
                    ...prev,
                    heading: e.target.value,
                  }))
                }
                placeholder="Enter your hero heading..."
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Hero Background Image
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50"
              >
                <Upload className="mx-auto mb-3 text-blue-600" size={30} />

                <p className="text-sm font-semibold text-slate-700">
                  Click to upload hero image
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  JPG, PNG, WEBP (Maximum 10MB)
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {preview && (
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">
                      Selected Image Preview
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setPreview(hero.bannerImage || "");
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="text-xs font-semibold text-red-500 hover:text-red-700"
                    >
                      Cancel new image
                    </button>
                  </div>

                  <img
                    src={preview}
                    alt="Hero preview"
                    className="h-52 w-full rounded-xl object-cover"
                  />
                </div>
              )}
            </div>

            {/* Overlay Opacity */}
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">
                  Overlay Opacity
                </label>

                <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                  {hero.overlayOpacity}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={hero.overlayOpacity}
                onChange={(e) =>
                  setHero((prev) => ({
                    ...prev,
                    overlayOpacity: Number(e.target.value),
                  }))
                }
                className="w-full accent-blue-600"
              />
            </div>

            {/* Active Toggle */}
            <label className="mb-6 flex cursor-pointer items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Hero Status
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Show this hero on the website
                </p>
              </div>

              <input
                type="checkbox"
                checked={hero.isActive}
                onChange={(e) =>
                  setHero((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                className="h-5 w-5 accent-blue-600"
              />
            </label>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleSave}
                disabled={saving || deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {saving ? "Saving..." : "Save Hero"}
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting || saving || !hero.bannerImage}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3.5 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {deleting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Trash2 size={18} />
                )}
                Delete
              </button>
            </div>
          </div>

          {/* Live Preview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center gap-2">
              <Eye size={18} className="text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Hero Preview
              </h2>
            </div>

            <div
              className="relative flex min-h-[350px] items-center justify-center overflow-hidden rounded-xl bg-slate-800 bg-cover bg-center p-6 sm:min-h-[450px]"
              style={{
                backgroundImage: preview
                  ? `url("${preview}")`
                  : "none",
              }}
            >
              <div
                className="absolute inset-0 bg-[#0B131E]"
                style={{
                  opacity: hero.overlayOpacity / 100,
                }}
              />

              <div className="relative z-10 w-full text-center">
                <h2 className="whitespace-pre-line text-3xl font-normal leading-tight text-white drop-shadow-lg sm:text-4xl">
                  {hero.heading || "Your hero heading will appear here"}
                </h2>
              </div>

              {!preview && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/70">
                    <ImageIcon className="mx-auto mb-2" size={35} />
                    <p className="text-sm">No hero image selected</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>{selectedPage.name}</span>
              <span>Live preview</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
