import React, { useEffect, useMemo, useState } from "react";
import {
  Edit,
  Trash2,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Plus,
  ExternalLink,
  UploadCloud,
  Calendar,
  Tag,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  getEvents,
  deleteEvent,
  updateEvent,
} from "../services/api";

const categories = [
  "All Events",
  "Conference",
  "Workshops",
  "Webinars",
  "Training Program",
];

const normalizeCategory = (category = "") => {
  const value = category.trim().toLowerCase();

  if (["conference", "conference"].includes(value)) return "Conference";
  if (["workshop", "workshops"].includes(value)) return "Workshops";
  if (["webinar", "webinars"].includes(value)) return "Webinars";

  if (["training program", "training programs"].includes(value)) {
    return "Training Program";
  }

  return category;
};

const inputClass =
  "w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#E25238] focus:ring-2 focus:ring-[#E25238]/20";

export default function AllEvents({ onNavigate }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [msg, setMsg] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Events");




  const fetchEvents = async () => {
    setLoading(true);

    try {
      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Unable to fetch events:", error);
      setMsg("Unable to load events. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    if (activeCategory === "All Events") return events;

    return events.filter(
      (event) => normalizeCategory(event.category) === activeCategory
    );
  }, [events, activeCategory]);

  const categoryCount = (category) => {
    if (category === "All Events") return events.length;

    return events.filter(
      (event) => normalizeCategory(event.category) === category
    ).length;
  };

  const showMessage = (message) => {
    setMsg(message);
    window.setTimeout(() => setMsg(""), 3000);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setActionLoading(id);

    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((event) => event._id !== id));
      showMessage("Event deleted successfully.");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || error.message || "Failed to delete event."
      );
    } finally {
      setActionLoading("");
    }
  };

  const toggleStatus = async (event) => {
    const nextStatus = event.isActive === false;

    setActionLoading(event._id);

    try {
      await updateEvent(event._id, { isActive: nextStatus });

      setEvents((prev) =>
        prev.map((item) =>
          item._id === event._id
            ? { ...item, isActive: nextStatus }
            : item
        )
      );

      showMessage(
        nextStatus ? "Event published successfully." : "Event hidden successfully."
      );
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Unable to update event status."
      );
    } finally {
      setActionLoading("");
    }
  };


  return (
    <div className="w-full space-y-6 text-left">

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-xl font-black tracking-tight text-[#1E293B] sm:text-2xl">
            All Events & Exhibitions
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage event cards, categories, images and publishing status.
          </p>
          <p className="mt-2 text-xs font-bold text-[#E25238]">
            {events.length} Total Events
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchEvents}
            title="Refresh events"
            className="rounded-xl border border-gray-200 p-3 text-gray-600 hover:bg-gray-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.("add-event")}
            className="inline-flex items-center gap-2 rounded-xl bg-[#E25238] px-4 py-3 text-xs font-bold text-white shadow hover:bg-[#C9452E]"
          >
            <Plus className="h-4 w-4" />
            Add New Event
          </button>
        </div>
      </div>

      {/* Feedback */}
      {msg && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {msg}
        </div>
      )}

      {/* Category Filters */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex min-w-max gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition ${
                activeCategory === category
                  ? "bg-[#E25238] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-[#E25238]"
              }`}
            >
              {category}
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  activeCategory === category
                    ? "bg-white/20 text-white"
                    : "bg-white text-gray-500"
                }`}
              >
                {categoryCount(category)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-16 text-center">
          <Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-[#E25238]" />
          <p className="text-sm text-gray-500">Loading events...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-[#E25238]">
            <Calendar className="h-6 w-6" />
          </div>

          <h3 className="font-bold text-gray-700">No Events Found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No events are available in this category.
          </p>

          <button
            type="button"
            onClick={() => onNavigate?.("add-event")}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#E25238] px-5 py-2.5 text-xs font-bold text-white"
          >
            <Plus className="h-4 w-4" />
            Add Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event) => (
            <article
              key={event._id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Event Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                <img
                  src={event.imageUrl}
                  alt={event.title || "Event"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {event.date && (
                  <span className="absolute bottom-3 right-3 rounded-md bg-[#E87568] px-3 py-2 text-[10px] font-bold text-white shadow">
                    {event.date}
                  </span>
                )}

                <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur">
                  {normalizeCategory(event.category)}
                </span>
              </div>

              {/* Event Details */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-[#E25238]">
                    <Tag className="h-3 w-3" />
                    {normalizeCategory(event.category)}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      event.isActive === false
                        ? "bg-gray-100 text-gray-500"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {event.isActive === false ? "Hidden" : "Published"}
                  </span>
                </div>

                <h3 className="line-clamp-2 text-base font-black leading-snug text-[#1E293B]">
                  {event.title || event.heading}
                </h3>

                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-500">
                  {event.description || event.text}
                </p>

                {(event.eventLink || event.link) && (
                  <a
                    href={event.eventLink || event.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex w-fit max-w-full items-center gap-2 truncate text-xs font-semibold text-[#E25238] hover:text-[#C9452E]"
                  >
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    View Event Link
                  </a>
                )}

                {/* Admin Actions */}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-4">
                  <button
                    type="button"
                    onClick={() => onNavigate?.("add-event", event)}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-100"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleStatus(event)}
                    disabled={actionLoading === event._id}
                    className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100 disabled:opacity-50"
                  >
                    {event.isActive === false ? (
                      <>
                        <Eye className="h-3.5 w-3.5" />
                        Publish
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3.5 w-3.5" />
                        Hide
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(
                        event._id,
                        event.title || event.heading || "this event"
                      )
                    }
                    disabled={actionLoading === event._id}
                    title="Delete event"
                    className="rounded-lg bg-red-50 p-2 text-red-500 hover:bg-red-100 disabled:opacity-50"
                  >
                    {actionLoading === event._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
}
