import React, { useRef, useState, useEffect } from "react";
import {
  UploadCloud,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  X,
} from "lucide-react";

const toSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const readImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function PublicationForm({
  type = "article",
  onSave,
  onNavigate,
  initialData = null,
}) {
  const isArticle = type === "article";
  const fileRef = useRef(null);
  const coverRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    image: "",
    imageAlt: "",
    category: "",
    categoryLink: "",
    introduction: "",
    detailCoverImage: "",
    author: "",
    content: "",
    publishedAt: "",
    sections: [],
  });

  useEffect(() => {
  if (!initialData) return;

  setForm({
    title: initialData.title || "",
    slug: initialData.slug || "",
    image: initialData.image || "",
    imageAlt: initialData.imageAlt || "",
    category: initialData.category || "",
    categoryLink: initialData.categoryLink || "",
    introduction: initialData.introduction || "",
    detailCoverImage: initialData.detailCoverImage || "",
    author: initialData.author || "",
    content: initialData.content || "",
    publishedAt: initialData.publishedAt || "",
    sections: initialData.sections || [],
  });

  setCardFile(null);
  setCoverFile(null);
}, [initialData]);

  const [cardFile, setCardFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [sectionHeading, setSectionHeading] = useState("");
  const [sectionParagraph, setSectionParagraph] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleTitle = (value) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: toSlug(value),
    }));
  };

  const handleImage = (file, isCover = false) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    setError("");

    if (isCover) {
      setCoverFile(file);
    } else {
      setCardFile(file);
    }
  };

  const addSection = () => {
    if (!sectionHeading.trim() && !sectionParagraph.trim()) return;

    setForm((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          heading: sectionHeading.trim(),
          paragraphs: sectionParagraph
            .split("\n")
            .map((p) => p.trim())
            .filter(Boolean),
        },
      ],
    }));

    setSectionHeading("");
    setSectionParagraph("");
  };

  const removeSection = (index) => {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }

    if (!cardFile && !form.image) {
  setError("Please upload a card image.");
  return;
}

    setLoading(true);

    try {
      const cardImage = cardFile
  ? await readImage(cardFile)
  : form.image;

const coverImage = coverFile
  ? await readImage(coverFile)
  : form.detailCoverImage;

const payload = {
  ...form,
  image: cardImage,
  detailCoverImage: coverImage,
  slug: toSlug(form.slug),
  isActive: initialData?.isActive ?? true,
};

      await onSave(payload);

      setSuccess(
        `${isArticle ? "Article" : "News"} published successfully!`
      );

      setForm({
        title: "",
        slug: "",
        image: "",
        imageAlt: "",
        category: "",
        categoryLink: "",
        introduction: "",
        detailCoverImage: "",
        author: "",
        content: "",
        publishedAt: "",
        sections: [],
      });

      setCardFile(null);
      setCoverFile(null);
      if (fileRef.current) fileRef.current.value = "";
      if (coverRef.current) coverRef.current.value = "";
    } catch (err) {
      console.error("Publication save error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to publish. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#E87565] focus:ring-2 focus:ring-[#E87565]/20";

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-[#1E293B] sm:text-3xl">
          Add New {isArticle ? "Article" : "News"}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Create and publish content on your website.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-2"
      >
        {/* Card Image */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-800">
            Card Thumbnail *
          </label>

          <div
            onClick={() => fileRef.current?.click()}
            className="flex min-h-48 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-slate-50 transition hover:border-[#E87565]"
          >
           {cardFile || form.image ? (
              <img
                src={cardFile ? URL.createObjectURL(cardFile) : form.image}
                alt="Card preview"
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="text-center text-gray-500">
                <UploadCloud className="mx-auto mb-2" size={30} />
                <p className="text-sm font-semibold">Upload card image</p>
                <p className="mt-1 text-xs">JPG, PNG, WEBP · Max 5 MB</p>
              </div>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImage(e.target.files?.[0])}
          />

          {cardFile && (
            <button
              type="button"
              onClick={() => {
                setCardFile(null);
                if (fileRef.current) fileRef.current.value = "";
              }}
              className="flex items-center gap-2 text-xs font-semibold text-red-600"
            >
              <Trash2 size={14} /> Remove card image
            </button>
          )}
        </div>

        {/* Detail Cover */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-800">
            Detail Page Cover Image (Optional)
          </label>

          <div
            onClick={() => coverRef.current?.click()}
            className="flex min-h-48 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-slate-50 transition hover:border-[#E87565]"
          >
            {coverFile ? (
              <img
                src={coverFile ? URL.createObjectURL(coverFile) : form.detailCoverImage}
                alt="Cover preview"
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="text-center text-gray-500">
                <UploadCloud className="mx-auto mb-2" size={30} />
                <p className="text-sm font-semibold">Upload cover image</p>
                <p className="mt-1 text-xs">Optional · Max 5 MB</p>
              </div>
            )}
          </div>

          <input
            ref={coverRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImage(e.target.files?.[0], true)}
          />

          {coverFile && (
            <button
              type="button"
              onClick={() => {
                setCoverFile(null);
                if (coverRef.current) coverRef.current.value = "";
              }}
              className="flex items-center gap-2 text-xs font-semibold text-red-600"
            >
              <Trash2 size={14} /> Remove cover image
            </button>
          )}
        </div>

        {/* Basic Details */}
        <div className="space-y-4 lg:col-span-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold">
              {initialData ? "Edit Article" : `Add New ${isArticle ? "Article" : "News"}`} Title *
            </label>
            <input
              value={form.title}
              onChange={(e) => handleTitle(e.target.value)}
              placeholder="Enter title"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold">
              URL Slug *
            </label>
            <input
              value={form.slug}
              onChange={(e) => updateField("slug", toSlug(e.target.value))}
              placeholder="article-url-slug"
              className={inputClass}
              required
            />
            <p className="mt-1 text-xs text-gray-400">
              Detail URL: /publication/{isArticle ? "articles" : "news"}/{form.slug || "your-slug"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-bold">
                Category
              </label>
              <input
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                placeholder="e.g. Pharmaceuticals"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold">
                Category Link
              </label>
              <input
                value={form.categoryLink}
                onChange={(e) => updateField("categoryLink", e.target.value)}
                placeholder="/publication/category"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold">
              Card Image Alt Text
            </label>
            <input
              value={form.imageAlt}
              onChange={(e) => updateField("imageAlt", e.target.value)}
              placeholder="Describe the image"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold">
              Introduction
            </label>
            <textarea
              rows={3}
              value={form.introduction}
              onChange={(e) => updateField("introduction", e.target.value)}
              placeholder="Write a short introduction..."
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold">
              Author
            </label>
            <input
              value={form.author}
              onChange={(e) => updateField("author", e.target.value)}
              placeholder="Author name"
              className={inputClass}
            />
          </div>

          {!isArticle && (
            <>
              <div>
                <label className="mb-1.5 block text-xs font-bold">
                  Published Date
                </label>
                <input
                  value={form.publishedAt}
                  onChange={(e) => updateField("publishedAt", e.target.value)}
                  placeholder="e.g. 03 Nov 2026"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold">
                  News Content
                </label>
                <textarea
                  rows={8}
                  value={form.content}
                  onChange={(e) => updateField("content", e.target.value)}
                  placeholder="Write the full news content..."
                  className={inputClass}
                />
              </div>
            </>
          )}

          {isArticle && (
            <div className="space-y-4 rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-800">
                  Article Content Sections
                </h3>
                <span className="text-xs text-gray-400">
                  {form.sections.length} sections
                </span>
              </div>

              {form.sections.map((section, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-3 rounded-lg bg-slate-50 p-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-800">
                      {section.heading || `Section ${index + 1}`}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                      {section.paragraphs.join(" ")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="text-red-500"
                    aria-label="Remove section"
                  >
                    <X size={17} />
                  </button>
                </div>
              ))}

              <input
                value={sectionHeading}
                onChange={(e) => setSectionHeading(e.target.value)}
                placeholder="Section heading"
                className={inputClass}
              />

              <textarea
                rows={4}
                value={sectionParagraph}
                onChange={(e) => setSectionParagraph(e.target.value)}
                placeholder={"Write paragraph(s). Put each paragraph on a new line."}
                className={inputClass}
              />

              <button
                type="button"
                onClick={addSection}
                className="inline-flex items-center gap-2 rounded-lg border border-[#E87565] px-4 py-2 text-xs font-bold text-[#E87565] hover:bg-[#FFF3F1]"
              >
                <Plus size={15} /> Add Content Section
              </button>
            </div>
          )}
        </div>

        {/* Feedback */}
        {(error || success) && (
          <div
            className={`flex items-center gap-2 rounded-xl border p-3 text-sm lg:col-span-2 ${
              error
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {error ? <AlertCircle size={17} /> : <CheckCircle2 size={17} />}
            {error || success}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E25238] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#C9412B] disabled:opacity-60"
          >
            {loading ? (
  <>
    <Loader2 size={17} className="animate-spin" />
    {initialData ? "Updating..." : "Publishing..."}
  </>
) : (
  initialData
    ? `Update ${isArticle ? "Article" : "News"}`
    : `Publish ${isArticle ? "Article" : "News"}`
)}
          </button>

          <button
            type="button"
            onClick={() =>
              onNavigate?.(isArticle ? "all-articles" : "all-news")
            }
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            View All
          </button>
        </div>
      </form>
    </div>
  );
}
