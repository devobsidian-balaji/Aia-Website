
import { useCallback, useEffect, useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const emptyItem = {
  title: "",
  description: "",
  imageAlt: "",
  link: "",
  linkText: "Learn More",
  order: 0,
  isActive: true,
};

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const buttonClass =
  "rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50";

export default function ManageHomeFeatures() {
  const [section, setSection] = useState({
    heading: "",
    subtitle: "",
    isActive: true,
  });

  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ ...emptyItem });
  const [editingId, setEditingId] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadSection = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/home-features/admin/home`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to load CMS");
      }

      const data = result.data || {};

      setSection({
        heading: data.heading || "",
        subtitle: data.subtitle || "",
        isActive: data.isActive !== false,
      });

      setItems(
        [...(data.items || [])].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        )
      );
    } catch (err) {
      setError(err.message || "Unable to load CMS");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSection();
  }, [loadSection]);

  const updateItem = (event) => {
    const { name, value, checked, type } = event.target;

    setItem((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : name === "order"
            ? value
            : value,
    }));
  };

  const selectImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be 5 MB or less.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError("");
  };

  const resetForm = () => {
    setEditingId("");
    setItem({ ...emptyItem, order: items.length });
    setImage(null);
    setPreview("");
  };

  const saveSettings = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/home-features/admin/home`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(section),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to save settings");
      }

      setMessage("Section settings saved.");
    } catch (err) {
      setError(err.message || "Unable to save settings");
    } finally {
      setSaving(false);
    }
  };

  const saveCard = async (event) => {
    event.preventDefault();

    if (!item.title.trim()) {
      setError("Card title is required.");
      return;
    }

    if (!editingId && !image) {
      setError("Please choose an image.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const body = new FormData();

      body.append("title", item.title.trim());
      body.append("description", item.description || "");
      body.append("imageAlt", item.imageAlt || item.title);
      body.append("link", item.link || "");
      body.append("linkText", item.linkText || "Learn More");
      body.append("order", String(Number(item.order) || 0));
      body.append("isActive", String(item.isActive !== false));

      if (image) body.append("image", image);

      const url = editingId
        ? `${API_URL}/home-features/admin/home/items/${editingId}`
        : `${API_URL}/home-features/admin/home/items`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        body,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to save card");
      }

      await loadSection();
      resetForm();
      setMessage(editingId ? "Card updated." : "Card created.");
    } catch (err) {
      setError(err.message || "Unable to save card");
    } finally {
      setSaving(false);
    }
  };

  const editCard = (savedItem) => {
    setEditingId(savedItem._id);
    setItem({
      title: savedItem.title || "",
      description: savedItem.description || "",
      imageUrl: savedItem.imageUrl || "",
      imageAlt: savedItem.imageAlt || "",
      link: savedItem.link || "",
      linkText: savedItem.linkText || "Learn More",
      order: savedItem.order ?? 0,
      isActive: savedItem.isActive !== false,
    });

    setImage(null);
    setPreview("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteCard = async (savedItem) => {
    if (!window.confirm(`Delete "${savedItem.title}"?`)) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/home-features/admin/home/items/${savedItem._id}`,
        { method: "DELETE" }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete card");
      }

      if (editingId === savedItem._id) resetForm();

      await loadSection();
      setMessage("Card deleted.");
    } catch (err) {
      setError(err.message || "Unable to delete card");
    }
  };

  const imageSrc = (url) => {
    if (!url) return "";
    if (/^(https?:|data:|blob:)/i.test(url)) return url;

    const origin = API_URL.replace(/\/api\/?$/, "");
    return `${origin}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            AIA · Home Page
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Home Feature CMS
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage the alternating image and content section on the Home Page.
            This CMS is separate from Why Join.
          </p>
        </header>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {message}
          </div>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Section Settings
          </h2>

          <form onSubmit={saveSettings} className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Heading
              <input
                value={section.heading}
                onChange={(event) =>
                  setSection({ ...section, heading: event.target.value })
                }
                className={fieldClass}
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Subtitle
              <textarea
                rows={3}
                value={section.subtitle}
                onChange={(event) =>
                  setSection({ ...section, subtitle: event.target.value })
                }
                className={fieldClass}
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={section.isActive}
                onChange={(event) =>
                  setSection({
                    ...section,
                    isActive: event.target.checked,
                  })
                }
                className="accent-blue-600"
              />
              Publish section on Home Page
            </label>

            <button
              disabled={saving}
              className={`${buttonClass} bg-slate-900 text-white hover:bg-slate-700`}
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {editingId ? "Edit Card" : "Add Home Feature Card"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {items.length} card(s) currently saved
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className={`${buttonClass} border border-slate-300 text-slate-700`}
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={saveCard} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Card Title
                <input
                  name="title"
                  value={item.title}
                  onChange={updateItem}
                  className={fieldClass}
                  required
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Display Order
                <input
                  name="order"
                  type="number"
                  min="0"
                  value={item.order}
                  onChange={updateItem}
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-slate-700">
              Description
              <textarea
                name="description"
                rows={4}
                value={item.description}
                onChange={updateItem}
                className={fieldClass}
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Image
              <input
                type="file"
                accept="image/*"
                onChange={selectImage}
                required={!editingId}
                className="mt-2 block w-full text-sm"
              />
            </label>

            {(preview || item.imageUrl) && (
              <img
                src={preview || imageSrc(item.imageUrl)}
                alt="Preview"
                className="aspect-video w-full max-w-sm rounded-xl object-cover"
              />
            )}

            <label className="block text-sm font-medium text-slate-700">
              Image Alt Text
              <input
                name="imageAlt"
                value={item.imageAlt}
                onChange={updateItem}
                className={fieldClass}
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Button URL
                <input
                  name="link"
                  value={item.link}
                  onChange={updateItem}
                  placeholder="/iafsm"
                  className={fieldClass}
                />
              </label>

              <label className="text-sm font-medium text-slate-700">
                Button Text
                <input
                  name="linkText"
                  value={item.linkText}
                  onChange={updateItem}
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name="isActive"
                checked={item.isActive !== false}
                onChange={updateItem}
                className="accent-blue-600"
              />
              Publish this card
            </label>

            <button
              disabled={saving}
              className={`${buttonClass} bg-blue-600 text-white hover:bg-blue-700`}
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Card"
                  : "Add Card"}
            </button>
          </form>
        </section>

        <section className="mt-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Existing Home Feature Cards
          </h2>

          {loading ? (
            <p className="text-sm text-slate-500">Loading cards...</p>
          ) : items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
              No cards added yet. Create the first card above.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {items.map((savedItem) => (
                <article
                  key={savedItem._id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {savedItem.imageUrl && (
                    <img
                      src={imageSrc(savedItem.imageUrl)}
                      alt={savedItem.imageAlt || savedItem.title}
                      className="aspect-video w-full object-cover"
                    />
                  )}

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-slate-900">
                        {savedItem.title}
                      </h3>
                      <span className="text-xs text-slate-500">
                        Order: {savedItem.order ?? 0}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                      {savedItem.description}
                    </p>

                    <p className="mt-3 text-xs text-slate-500">
                      {savedItem.isActive ? "Published" : "Unpublished"}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => editCard(savedItem)}
                        className={`${buttonClass} flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50`}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteCard(savedItem)}
                        className={`${buttonClass} flex-1 border border-red-200 text-red-600 hover:bg-red-50`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
