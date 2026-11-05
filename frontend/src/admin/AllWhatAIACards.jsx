
import React, { useEffect, useState } from "react";
import {
  ImagePlus,
  Trash2,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const API_URL = (
  import.meta.env.VITE_API_URL || "/api"
).replace(/\/$/, "");

const getImageData = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Unable to read image."));

    reader.readAsDataURL(file);
  });

export default function AllWhatAIACards() {
  const [section, setSection] = useState(null);
  const [cards, setCards] = useState([]);

  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100";

  // -----------------------------------
  // LOAD ALL CARDS
  // -----------------------------------

  const loadCards = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/what-aia/admin`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to load What AIA cards."
        );
      }

      setSection(result.data);

      setCards(
        [...(result.data.cards || [])].sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        )
      );
    } catch (err) {
      console.error("What AIA loading error:", err);
      setError(err.message || "Unable to load cards.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  // -----------------------------------
  // UPDATE CARD FIELD
  // -----------------------------------

  const updateCardField = (cardId, field, value) => {
    setCards((previousCards) =>
      previousCards.map((card) =>
        card._id === cardId
          ? { ...card, [field]: value }
          : card
      )
    );
  };

  // -----------------------------------
  // CHANGE IMAGE
  // -----------------------------------

  const handleImageChange = async (cardId, event) => {
    const file = event.target.files?.[0];

    // Allow selecting the same file again later
    event.target.value = "";

    if (!file) return;

    setError("");
    setMessage("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be 5 MB or less.");
      return;
    }

    try {
      const imageData = await getImageData(file);

      // Update preview immediately
      updateCardField(cardId, "imageUrl", imageData);

      setMessage(
        "Image selected. Click Save Changes to update the card."
      );
    } catch (err) {
      setError(err.message || "Unable to select image.");
    }
  };

  // -----------------------------------
  // SAVE CARD
  // -----------------------------------

  const saveCard = async (card) => {
    setError("");
    setMessage("");
    setSavingId(card._id);

    try {
      const payload = {
        title: card.title.trim(),
        description: card.description.trim(),
        imageUrl: card.imageUrl,
        imageAlt: card.imageAlt?.trim() || card.title.trim(),
        order: Number(card.order) || 0,
        isActive: Boolean(card.isActive),
      };

      if (!payload.title || !payload.description || !payload.imageUrl) {
        throw new Error(
          "Title, description and image are required."
        );
      }

      const response = await fetch(
        `${API_URL}/what-aia/cards/${card._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to update card."
        );
      }

      // Replace local card with saved backend response
      setCards((previousCards) =>
        previousCards.map((item) =>
          item._id === card._id
            ? { ...item, ...result.data }
            : item
        )
      );

      setMessage(`"${payload.title}" updated successfully.`);
    } catch (err) {
      console.error("Card update error:", err);
      setError(err.message || "Unable to update card.");
    } finally {
      setSavingId(null);
    }
  };

  // -----------------------------------
  // DELETE CARD
  // -----------------------------------

  const deleteCard = async (card) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${card.title}"?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");
    setDeletingId(card._id);

    try {
      const response = await fetch(
        `${API_URL}/what-aia/cards/${card._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to delete card."
        );
      }

      setCards((previousCards) =>
        previousCards.filter(
          (item) => item._id !== card._id
        )
      );

      setMessage(`"${card.title}" deleted successfully.`);
    } catch (err) {
      console.error("Card delete error:", err);
      setError(err.message || "Unable to delete card.");
    } finally {
      setDeletingId(null);
    }
  };

  // -----------------------------------
  // LOADING STATE
  // -----------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center gap-3 text-sm text-slate-500">
        <Loader2 className="animate-spin" size={20} />
        Loading What AIA cards...
      </div>
    );
  }

  // -----------------------------------
  // UI
  // -----------------------------------

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">

      {/* PAGE HEADER */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          All What AIA Cards
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage card images, titles, descriptions and visibility
          on the AIA home page.
        </p>
      </div>

      {/* SUCCESS MESSAGE */}

      {message && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700"
        >
          <CheckCircle2 size={17} />
          {message}
        </div>
      )}

      {/* ERROR MESSAGE */}

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle size={17} />
          {error}
        </div>
      )}

      {/* SECTION INFORMATION */}

      {section && (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-800">
            {section.heading || "What AIA does"}
          </h2>

          {section.subtitle && (
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {section.subtitle}
            </p>
          )}

          <p className="mt-3 text-xs text-slate-400">
            {cards.length} cards available
          </p>
        </div>
      )}

      {/* EMPTY STATE */}

      {cards.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <ImagePlus
            size={35}
            className="mx-auto mb-3 text-slate-400"
          />

          <h3 className="font-semibold text-slate-700">
            No cards available
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Create a new card using the Add What AIA Does section.
          </p>
        </div>
      )}

      {/* CARD GRID */}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

        {cards.map((card) => (
          <div
            key={card._id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
          >

            {/* CARD HEADER */}

            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-base font-bold text-slate-800">
                {card.title || "Untitled Card"}
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  card.isActive
                    ? "bg-green-50 text-green-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {card.isActive ? "Published" : "Hidden"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[140px_1fr]">

              {/* IMAGE UPLOAD */}

              <div>
                <div className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  {card.imageUrl ? (
                    <img
                      src={card.imageUrl}
                      alt={card.imageAlt || card.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-slate-400">
                      <ImagePlus size={28} />
                      <span className="mt-2 text-xs">
                        No image
                      </span>
                    </div>
                  )}
                </div>

                <label className="mt-2 block cursor-pointer text-sm font-medium text-rose-600 hover:text-rose-700">
                  <span className="inline-flex items-center gap-1">
                    <ImagePlus size={15} />
                    Change image
                  </span>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    className="hidden"
                    onChange={(event) =>
                      handleImageChange(card._id, event)
                    }
                  />
                </label>

                <p className="mt-1 text-[10px] text-slate-400">
                  JPG, PNG or WebP · Max 5 MB
                </p>
              </div>

              {/* CARD FIELDS */}

              <div className="space-y-3">

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Title
                  </label>

                  <input
                    className={inputClass}
                    value={card.title || ""}
                    onChange={(event) =>
                      updateCardField(
                        card._id,
                        "title",
                        event.target.value
                      )
                    }
                    placeholder="Card title"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Description
                  </label>

                  <textarea
                    rows={3}
                    className={inputClass}
                    value={card.description || ""}
                    onChange={(event) =>
                      updateCardField(
                        card._id,
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Card description"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Image Alt Text
                  </label>

                  <input
                    className={inputClass}
                    value={card.imageAlt || ""}
                    onChange={(event) =>
                      updateCardField(
                        card._id,
                        "imageAlt",
                        event.target.value
                      )
                    }
                    placeholder="Describe the image"
                  />
                </div>

              </div>
            </div>

            {/* ORDER AND VISIBILITY */}

            <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Display order
                </label>

                <input
                  type="number"
                  min="0"
                  className={inputClass}
                  value={card.order ?? 0}
                  onChange={(event) =>
                    updateCardField(
                      card._id,
                      "order",
                      event.target.value
                    )
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Visibility
                </label>

                <select
                  className={inputClass}
                  value={card.isActive ? "published" : "hidden"}
                  onChange={(event) =>
                    updateCardField(
                      card._id,
                      "isActive",
                      event.target.value === "published"
                    )
                  }
                >
                  <option value="published">Published</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
            </div>

            {/* ACTIONS */}

            <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4">

              <button
                type="button"
                disabled={
                  deletingId === card._id ||
                  savingId === card._id
                }
                onClick={() => deleteCard(card)}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                {deletingId === card._id ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Trash2 size={15} />
                )}

                Delete
              </button>

              <button
                type="button"
                disabled={
                  savingId === card._id ||
                  deletingId === card._id
                }
                onClick={() => saveCard(card)}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
              >
                {savingId === card._id ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Save size={15} />
                )}

                {savingId === card._id
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
