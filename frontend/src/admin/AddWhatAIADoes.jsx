
import { useEffect, useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL || "/api"
).replace(/\/$/, "");

const emptyCard = {
  title: "",
  description: "",
  imageAlt: "",
  order: 0,
};

export default function AddWhatAIADoes() {
  const [section, setSection] = useState({
    heading: "What AIA does",
    subtitle: "",
  });

  const [card, setCard] = useState(emptyCard);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadSection() {
      try {
        const response = await fetch(`${API_URL}/what-aia/admin`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load section");
        }

        if (mounted && result.data) {
          setSection({
            heading: result.data.heading || "What AIA does",
            subtitle: result.data.subtitle || "",
          });

          setCard((current) => ({
            ...current,
            order: result.data.cards?.length || 0,
          }));
        }
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadSection();

    return () => {
      mounted = false;
    };
  }, []);

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setMessage("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be 2 MB or less.");
      return;
    }

    setImage(file);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
    };

    reader.onerror = () => {
      setError("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
  }

  async function saveSection(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      const response = await fetch(`${API_URL}/what-aia`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heading: section.heading,
          subtitle: section.subtitle,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to save section");
      }

      setMessage("Section heading and subtitle saved successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function createCard(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!preview) {
      setError("Please select a card image.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`${API_URL}/what-aia/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: card.title.trim(),
          description: card.description.trim(),
          imageUrl: preview,
          imageAlt: card.imageAlt.trim() || card.title.trim(),
          order: Number(card.order) || 0,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to create card");
      }

      setCard({
        ...emptyCard,
        order: Number(card.order) + 1,
      });

      setImage(null);
      setPreview("");
      event.target.reset();

      setMessage("Card created successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-6 text-slate-600">Loading CMS...</div>;
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100";

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          What AIA Does
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage the home page section and its cards.
        </p>
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {message && (
        <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
          {message}
        </p>
      )}

      {/* Section settings */}
      <form
        onSubmit={saveSection}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-800">
          Section Settings
        </h2>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Heading
          </label>
          <input
            required
            className={inputClass}
            value={section.heading}
            onChange={(e) =>
              setSection({ ...section, heading: e.target.value })
            }
            placeholder="What AIA does"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Subtitle
          </label>
          <textarea
            rows={3}
            className={inputClass}
            value={section.subtitle}
            onChange={(e) =>
              setSection({ ...section, subtitle: e.target.value })
            }
            placeholder="Enter section description"
          />
        </div>

        <button
          disabled={saving}
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Section"}
        </button>
      </form>

      {/* New card */}
      <form
        onSubmit={createCard}
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-800">
          Add New Card
        </h2>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Card Image
          </label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleImageChange}
            className="block w-full rounded-lg border border-slate-300 p-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2"
          />
          <p className="mt-1 text-xs text-slate-500">
            JPG, PNG or WebP. Maximum 2 MB.
          </p>

          {preview && (
            <img
              src={preview}
              alt="Selected card preview"
              className="mt-3 h-44 w-full max-w-sm rounded-lg border object-cover"
            />
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Card Title
          </label>
          <input
            required
            className={inputClass}
            value={card.title}
            onChange={(e) =>
              setCard({ ...card, title: e.target.value })
            }
            placeholder="Represent"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Description
          </label>
          <textarea
            required
            rows={3}
            className={inputClass}
            value={card.description}
            onChange={(e) =>
              setCard({ ...card, description: e.target.value })
            }
            placeholder="Enter card description"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Image Alt Text
          </label>
          <input
            className={inputClass}
            value={card.imageAlt}
            onChange={(e) =>
              setCard({ ...card, imageAlt: e.target.value })
            }
            placeholder="Describe the image"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Display Order
          </label>
          <input
            type="number"
            min="0"
            className={inputClass}
            value={card.order}
            onChange={(e) =>
              setCard({ ...card, order: e.target.value })
            }
          />
        </div>

        <button
          disabled={saving}
          className="rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Create Card"}
        </button>
      </form>
    </div>
  );
}
