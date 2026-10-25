
import { useCallback, useEffect, useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL || "/api"
).replace(/\/$/, "");

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100";

export default function AllWhatAIADoes() {
  const [section, setSection] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadCards = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/what-aia/admin`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to load cards");
      }

      setSection({
        heading: result.data.heading || "",
        subtitle: result.data.subtitle || "",
      });

      setCards(
        [...(result.data.cards || [])].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  function updateCardField(id, field, value) {
    setCards((current) =>
      current.map((card) =>
        card._id === id ? { ...card, [field]: value } : card
      )
    );
  }

  async function handleImageChange(id, event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setMessage("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be 2 MB or less.");
      event.target.value = "";
      return;
    }

    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Unable to read image"));
        reader.readAsDataURL(file);
      });

      updateCardField(id, "imageUrl", dataUrl);
    } catch (err) {
      setError(err.message);
    }
  }

  async function saveCard(card) {
    setSavingId(card._id);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/what-aia/cards/${card._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: card.title,
            description: card.description,
            imageUrl: card.imageUrl,
            imageAlt: card.imageAlt || card.title,
            order: Number(card.order),
            isActive: card.isActive,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to update card");
      }

      setMessage(`"${card.title}" updated successfully.`);
      await loadCards();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingId("");
    }
  }

  async function deleteCard(card) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${card.title}"?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");
    setSavingId(card._id);

    try {
      const response = await fetch(
        `${API_URL}/what-aia/cards/${card._id}`,
        { method: "DELETE" }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete card");
      }

      setCards((current) =>
        current.filter((item) => item._id !== card._id)
      );

      setMessage("Card deleted successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingId("");
    }
  }

  if (loading) {
    return <div className="p-6 text-slate-600">Loading cards...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            All What AIA Does Cards
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Edit, reorder, publish or remove home page cards.
          </p>
        </div>

        <button
          type="button"
          onClick={loadCards}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      {section && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Section heading
          </p>
          <p className="mt-1 font-semibold text-slate-800">
            {section.heading}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {section.subtitle}
          </p>
        </div>
      )}

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

      {cards.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
          <h2 className="font-semibold text-slate-800">No cards yet</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add your first card using Add What AIA Does.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card._id}
              className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-slate-800">
                  {card.title}
                </h2>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    card.isActive
                      ? "bg-green-50 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {card.isActive ? "Published" : "Hidden"}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                <div>
                  <img
                    src={card.imageUrl}
                    alt={card.imageAlt || card.title}
                    className="aspect-[4/3] w-full rounded-lg border border-slate-200 object-cover"
                  />

                  <label className="mt-2 block cursor-pointer text-sm font-medium text-rose-600 hover:text-rose-700">
                    Change image
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(event) =>
                        handleImageChange(card._id, event)
                      }
                    />
                  </label>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                      Title
                    </label>
                    <input
                      className={inputClass}
                      value={card.title}
                      onChange={(e) =>
                        updateCardField(card._id, "title", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className={inputClass}
                      value={card.description}
                      onChange={(e) =>
                        updateCardField(
                          card._id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Display order
                  </label>
                  <input
                    type="number"
                    min="0"
                    className={inputClass}
                    value={card.order ?? 0}
                    onChange={(e) =>
                      updateCardField(
                        card._id,
                        "order",
                        e.target.value
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
                    value={String(card.isActive)}
                    onChange={(e) =>
                      updateCardField(
                        card._id,
                        "isActive",
                        e.target.value === "true"
                      )
                    }
                  >
                    <option value="true">Published</option>
                    <option value="false">Hidden</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  disabled={savingId === card._id}
                  onClick={() => deleteCard(card)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  Delete
                </button>

                <button
                  type="button"
                  disabled={savingId === card._id}
                  onClick={() => saveCard(card)}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
                >
                  {savingId === card._id ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
