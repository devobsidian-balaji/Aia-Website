
// import { useCallback, useEffect, useState } from "react";

// const API_URL = (
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api"
// ).replace(/\/$/, "");

// const inputClass =
//   "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100";

// const initialSettings = {
//   heading: "",
//   subtitle: "",
//   intro: {
//     eyebrow: "",
//     title: "",
//     color: "bg-[#E52B18]",
//     enabled: true,
//   },
//   visibleSlides: 3,
//   accentColor: "#E96F62",
//   isActive: true,
// };

// const initialCard = {
//   title: "",
//   description: "",
//   imageAlt: "",
//   link: "",
//   linkText: "Read More",
//   order: 0,
// };

// export default function ManageSliderCMS({
//   defaultPageKey = "",
//   defaultSectionKey = "",
// }) {
//   // Without defaults this remains the global CMS with selectable page/section.
//   // With defaults it becomes a page-specific CMS and locks those values.
//   const isPageLocked = Boolean(defaultPageKey);
//   const isSectionLocked = Boolean(defaultSectionKey);
//   const [pageKey, setPageKey] = useState(defaultPageKey || "home");
//   const [sectionKey, setSectionKey] = useState(
//     defaultSectionKey || "industry-slider"
//   );
//   const [settings, setSettings] = useState(initialSettings);
//   const [cards, setCards] = useState([]);
//   const [card, setCard] = useState(initialCard);
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [editingId, setEditingId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const basePath = `${API_URL}/sliders/admin/${encodeURIComponent(
//     pageKey
//   )}/${encodeURIComponent(sectionKey)}`;

//   const loadSlider = useCallback(async () => {
//     setLoading(true);
//     setError("");
//     setMessage("");

//     try {
//       const response = await fetch(
//         `${API_URL}/sliders/admin/${encodeURIComponent(
//           pageKey
//         )}/${encodeURIComponent(sectionKey)}`
//       );
//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Unable to load slider");
//       }

//       const data = result.data;

//       setSettings({
//         ...initialSettings,
//         ...data,
//         intro: {
//           ...initialSettings.intro,
//           ...(data.intro || {}),
//         },
//       });

//       setCards(
//         [...(data.cards || [])].sort(
//           (a, b) => (a.order ?? 0) - (b.order ?? 0)
//         )
//       );

//       setCard({
//         ...initialCard,
//         order: data.cards?.length || 0,
//       });

//       setEditingId("");
//       setImage(null);
//       setPreview("");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [pageKey, sectionKey]);

//   useEffect(() => {
//     loadSlider();
//   }, [loadSlider]);

//   function updateSetting(name, value) {
//     setSettings((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   }

//   function updateIntro(name, value) {
//     setSettings((previous) => ({
//       ...previous,
//       intro: {
//         ...previous.intro,
//         [name]: value,
//       },
//     }));
//   }

//   function selectImage(file) {
//     setError("");
//     setMessage("");

//     if (!file) {
//       setImage(null);
//       setPreview("");
//       return;
//     }

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image.");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError("Image must be 5 MB or smaller.");
//       return;
//     }

//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   }

//   async function saveSettings(event) {
//     event.preventDefault();
//     setSaving(true);
//     setError("");
//     setMessage("");

//     try {
//       const response = await fetch(basePath, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           heading: settings.heading,
//           subtitle: settings.subtitle,
//           intro: settings.intro,
//           visibleSlides: Number(settings.visibleSlides),
//           accentColor: settings.accentColor,
//           isActive: settings.isActive,
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Unable to save settings");
//       }

//       setSettings((previous) => ({ ...previous, ...result.data }));
//       setMessage("Slider settings saved successfully.");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   }

//   function startEdit(item) {
//     setEditingId(item._id);
//     setCard({
//       title: item.title || "",
//       description: item.description || "",
//       imageAlt: item.imageAlt || "",
//       link: item.link || "",
//       linkText: item.linkText || "Read More",
//       order: item.order ?? 0,
//       isActive: item.isActive !== false,
//     });
//     setImage(null);
//     setPreview(item.imageUrl || "");
//     setError("");
//     setMessage("");
//   }

//   function resetCardForm() {
//     setEditingId("");
//     setCard({ ...initialCard, order: cards.length });
//     setImage(null);
//     setPreview("");
//   }

//   async function saveCard(event) {
//     event.preventDefault();
//     setSaving(true);
//     setError("");
//     setMessage("");

//     try {
//       const formData = new FormData();

//       Object.entries(card).forEach(([key, value]) => {
//         formData.append(key, String(value ?? ""));
//       });

//       if (image) formData.append("image", image);

//       const url = editingId
//         ? `${basePath}/cards/${editingId}`
//         : `${basePath}/cards`;

//       const response = await fetch(url, {
//         method: editingId ? "PUT" : "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Unable to save card");
//       }

//       setMessage(editingId ? "Card updated." : "Card created.");
//       resetCardForm();
//       await loadSlider();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function deleteCard(item) {
//     if (!window.confirm(`Delete "${item.title}"?`)) return;

//     setError("");
//     setMessage("");

//     try {
//       const response = await fetch(
//         `${basePath}/cards/${item._id}`,
//         { method: "DELETE" }
//       );
//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Unable to delete card");
//       }

//       if (editingId === item._id) resetCardForm();

//       setCards((previous) =>
//         previous.filter((entry) => entry._id !== item._id)
//       );

//       setMessage("Card deleted successfully.");
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   async function toggleCard(item) {
//     try {
//       const formData = new FormData();
//       formData.append("isActive", String(!item.isActive));

//       const response = await fetch(
//         `${basePath}/cards/${item._id}`,
//         { method: "PUT", body: formData }
//       );
//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Unable to change visibility");
//       }

//       await loadSlider();
//       setMessage("Card visibility updated.");
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   return (
//     <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
//       <div>
//         <h1 className="text-2xl font-bold text-slate-800">
//           Slider CMS
//         </h1>
//         <p className="mt-1 text-sm text-slate-500">
//           Manage slider content across your website pages.
//         </p>
//       </div>

//       {error && (
//         <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
//           {error}
//         </p>
//       )}

//       {message && (
//         <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
//           {message}
//         </p>
//       )}

//       <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
//         <h2 className="mb-2 text-lg font-semibold">
//           {isPageLocked ? "Page slider settings" : "Select page & section"}
//         </h2>
//         {isPageLocked && (
//           <p className="mb-4 text-sm text-slate-500">
//             This CMS is linked to this page only. Its slider content is stored separately.
//           </p>
//         )}

//         <div className={`grid gap-4 ${isPageLocked && isSectionLocked ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}>
//           {!isPageLocked && (
//             <div>
//               <label className="mb-1 block text-sm font-medium">Page</label>
//               <select
//                 className={inputClass}
//                 value={pageKey}
//                 onChange={(e) => setPageKey(e.target.value)}
//               >
//                 <option value="home">Home Page</option>
//                 <option value="industry-insight">Industry Insights</option>
//                 <option value="membership">Membership</option>
//                 <option value="talent-connect">Talent Connect</option>
//                 <option value="events">Events</option>
//               </select>
//             </div>
//           )}

//           {!isSectionLocked && (
//             <div>
//               <label className="mb-1 block text-sm font-medium">Section key</label>
//               <input
//                 className={inputClass}
//                 value={sectionKey}
//                 onChange={(e) =>
//                   setSectionKey(
//                     e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "-")
//                   )
//                 }
//                 placeholder="industry-slider"
//               />
//             </div>
//           )}

//           {isPageLocked && isSectionLocked && (
//             <div className="rounded-lg bg-slate-50 px-3 py-3 text-sm text-slate-700">
//               <span className="font-medium">Page:</span> {pageKey.replace(/-/g, " ")}<br />
//               <span className="font-medium">Section key:</span> {sectionKey}
//             </div>
//           )}
//         </div>

//         {!isPageLocked && (
//           <button
//             type="button"
//             onClick={loadSlider}
//             className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
//           >
//             Load Section
//           </button>
//         )}
//       </section>

//       {loading ? (
//         <p className="p-5 text-sm text-slate-500">Loading slider...</p>
//       ) : (
//         <>
//           <form
//             onSubmit={saveSettings}
//             className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
//           >
//             <h2 className="text-lg font-semibold">Slider Settings</h2>

//             <div>
//               <label className="mb-1 block text-sm font-medium">
//                 Section heading
//               </label>
//               <input
//                 className={inputClass}
//                 value={settings.heading}
//                 onChange={(e) => updateSetting("heading", e.target.value)}
//               />
//             </div>

//             <div>
//               <label className="mb-1 block text-sm font-medium">
//                 Subtitle
//               </label>
//               <textarea
//                 rows={2}
//                 className={inputClass}
//                 value={settings.subtitle}
//                 onChange={(e) => updateSetting("subtitle", e.target.value)}
//               />
//             </div>

//             <div className="grid gap-4 sm:grid-cols-2">
//               <div>
//                 <label className="mb-1 block text-sm font-medium">
//                   Intro eyebrow
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={settings.intro.eyebrow}
//                   onChange={(e) => updateIntro("eyebrow", e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium">
//                   Intro title
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={settings.intro.title}
//                   onChange={(e) => updateIntro("title", e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium">
//                   Intro background
//                 </label>
//                 <select
//                   className={inputClass}
//                   value={settings.intro.color}
//                   onChange={(e) => updateIntro("color", e.target.value)}
//                 >
//                   <option value="bg-[#E52B18]">Red</option>
//                   <option value="bg-[#17202B]">Dark navy</option>
//                   <option value="bg-[#274C77]">Blue</option>
//                   <option value="bg-[#28745B]">Green</option>
//                   <option value="bg-[#6941C6]">Purple</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium">
//                   Visible slides
//                 </label>
//                 <select
//                   className={inputClass}
//                   value={settings.visibleSlides}
//                   onChange={(e) =>
//                     updateSetting("visibleSlides", Number(e.target.value))
//                   }
//                 >
//                   {[2, 3, 4, 5, 6].map((count) => (
//                     <option key={count} value={count}>
//                       {count}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={settings.intro.enabled}
//                 onChange={(e) => updateIntro("enabled", e.target.checked)}
//               />
//               Show intro card
//             </label>

//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={settings.isActive}
//                 onChange={(e) => updateSetting("isActive", e.target.checked)}
//               />
//               Publish slider section
//             </label>

//             <button
//               disabled={saving}
//               className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
//             >
//               {saving ? "Saving..." : "Save Settings"}
//             </button>
//           </form>

//           <div className="grid items-start gap-6 lg:grid-cols-[1fr_1fr]">
//             <form
//               onSubmit={saveCard}
//               className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
//             >
//               <h2 className="text-lg font-semibold">
//                 {editingId ? "Edit Slider Card" : "Add Slider Card"}
//               </h2>

//               <div>
//                 <label className="mb-1 block text-sm font-medium">
//                   Card image
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/jpeg,image/png,image/webp,image/gif"
//                   required={!editingId}
//                   onChange={(e) => selectImage(e.target.files?.[0])}
//                   className="block w-full text-sm"
//                 />

//                 {preview && (
//                   <img
//                     src={preview}
//                     alt="Card preview"
//                     className="mt-3 aspect-video w-full rounded-lg object-cover"
//                   />
//                 )}
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium">Title</label>
//                 <input
//                   required
//                   className={inputClass}
//                   value={card.title}
//                   onChange={(e) =>
//                     setCard({ ...card, title: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium">
//                   Description
//                 </label>
//                 <textarea
//                   rows={3}
//                   className={inputClass}
//                   value={card.description}
//                   onChange={(e) =>
//                     setCard({ ...card, description: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium">
//                   Image alt text
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={card.imageAlt}
//                   onChange={(e) =>
//                     setCard({ ...card, imageAlt: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium">
//                   Read More URL
//                 </label>
//                 <input
//                   className={inputClass}
//                   value={card.link}
//                   onChange={(e) =>
//                     setCard({ ...card, link: e.target.value })
//                   }
//                   placeholder="/industry-insights/example"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="mb-1 block text-sm font-medium">
//                     Link text
//                   </label>
//                   <input
//                     className={inputClass}
//                     value={card.linkText}
//                     onChange={(e) =>
//                       setCard({ ...card, linkText: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-sm font-medium">
//                     Display order
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     className={inputClass}
//                     value={card.order}
//                     onChange={(e) =>
//                       setCard({ ...card, order: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>

//               {editingId && (
//                 <label className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     checked={card.isActive !== false}
//                     onChange={(e) =>
//                       setCard({ ...card, isActive: e.target.checked })
//                     }
//                   />
//                   Published
//                 </label>
//               )}

//               <div className="flex flex-wrap gap-2">
//                 <button
//                   disabled={saving}
//                   className="rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
//                 >
//                   {saving
//                     ? "Saving..."
//                     : editingId
//                       ? "Update Card"
//                       : "Create Card"}
//                 </button>

//                 {editingId && (
//                   <button
//                     type="button"
//                     onClick={resetCardForm}
//                     className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>

//             <section className="space-y-3">
//               <h2 className="text-lg font-semibold">
//                 Cards ({cards.length})
//               </h2>

//               {cards.length === 0 && (
//                 <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
//                   No cards in this section yet.
//                 </div>
//               )}

//               {cards.map((item) => (
//                 <article
//                   key={item._id}
//                   className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3"
//                 >
//                   <img
//                     src={item.imageUrl}
//                     alt={item.imageAlt || item.title}
//                     className="h-24 w-28 shrink-0 rounded-lg object-cover"
//                   />

//                   <div className="min-w-0 flex-1">
//                     <h3 className="font-semibold text-slate-800">
//                       {item.title}
//                     </h3>
//                     <p className="mt-1 line-clamp-2 text-xs text-slate-500">
//                       {item.description}
//                     </p>
//                     <p className="mt-1 text-xs text-slate-400">
//                       Order: {item.order} ·{" "}
//                       {item.isActive ? "Published" : "Hidden"}
//                     </p>

//                     <div className="mt-3 flex flex-wrap gap-3 text-sm">
//                       <button
//                         type="button"
//                         onClick={() => startEdit(item)}
//                         className="font-medium text-blue-600"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => toggleCard(item)}
//                         className="font-medium text-amber-600"
//                       >
//                         {item.isActive ? "Hide" : "Publish"}
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => deleteCard(item)}
//                         className="font-medium text-red-600"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </section>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }



import { useCallback, useEffect, useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100";

const initialSettings = {
  heading: "",
  subtitle: "",
  intro: {
    eyebrow: "",
    title: "",
    color: "bg-[#E52B18]",
    enabled: true,
  },
  visibleSlides: 3,
  accentColor: "#E96F62",
  isActive: true,
};

const initialCard = {
  title: "",
  description: "",
  imageAlt: "",
  link: "",
  linkText: "Read More",
  order: 0,
};

export default function ManageSliderCMS({
  defaultPageKey = "",
  defaultSectionKey = "",
}) {
  // Without defaults this remains the global CMS with selectable page/section.
  // With defaults it becomes a page-specific CMS and locks those values.
  const isPageLocked = Boolean(defaultPageKey);
  const isSectionLocked = Boolean(defaultSectionKey);
const [pageKey, setPageKey] = useState(defaultPageKey);
const [sectionKey, setSectionKey] = useState(defaultSectionKey);
  const [settings, setSettings] = useState(initialSettings);
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState(initialCard);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const basePath = `${API_URL}/sliders/admin/${encodeURIComponent(
    pageKey
  )}/${encodeURIComponent(sectionKey)}`;

  const loadSlider = useCallback(async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/sliders/admin/${encodeURIComponent(
          pageKey
        )}/${encodeURIComponent(sectionKey)}`
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to load slider");
      }

      const data = result.data;

      setSettings({
        ...initialSettings,
        ...data,
        intro: {
          ...initialSettings.intro,
          ...(data.intro || {}),
        },
      });

      setCards(
        [...(data.cards || [])].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        )
      );

      setCard({
        ...initialCard,
        order: data.cards?.length || 0,
      });

      setEditingId("");
      setImage(null);
      setPreview("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [pageKey, sectionKey]);

  useEffect(() => {
    loadSlider();
  }, [loadSlider]);

  function updateSetting(name, value) {
    setSettings((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function updateIntro(name, value) {
    setSettings((previous) => ({
      ...previous,
      intro: {
        ...previous.intro,
        [name]: value,
      },
    }));
  }

  function selectImage(file) {
    setError("");
    setMessage("");

    if (!file) {
      setImage(null);
      setPreview("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be 5 MB or smaller.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function saveSettings(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(basePath, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heading: settings.heading,
          subtitle: settings.subtitle,
          intro: settings.intro,
          visibleSlides: Number(settings.visibleSlides),
          accentColor: settings.accentColor,
          isActive: settings.isActive,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to save settings");
      }

      setSettings((previous) => ({ ...previous, ...result.data }));
      setMessage("Slider settings saved successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item) {
    setEditingId(item._id);
    setCard({
      title: item.title || "",
      description: item.description || "",
      imageAlt: item.imageAlt || "",
      link: item.link || "",
      linkText: item.linkText || "Read More",
      order: item.order ?? 0,
      isActive: item.isActive !== false,
    });
    setImage(null);
    setPreview(item.imageUrl || "");
    setError("");
    setMessage("");
  }

  function resetCardForm() {
    setEditingId("");
    setCard({ ...initialCard, order: cards.length });
    setImage(null);
    setPreview("");
  }

  async function saveCard(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();

      Object.entries(card).forEach(([key, value]) => {
        formData.append(key, String(value ?? ""));
      });

      if (image) formData.append("image", image);

      const url = editingId
        ? `${basePath}/cards/${editingId}`
        : `${basePath}/cards`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to save card");
      }

      setMessage(editingId ? "Card updated." : "Card created.");
      resetCardForm();
      await loadSlider();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteCard(item) {
    if (!window.confirm(`Delete "${item.title}"?`)) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${basePath}/cards/${item._id}`,
        { method: "DELETE" }
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete card");
      }

      if (editingId === item._id) resetCardForm();

      setCards((previous) =>
        previous.filter((entry) => entry._id !== item._id)
      );

      setMessage("Card deleted successfully.");
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleCard(item) {
    try {
      const formData = new FormData();
      formData.append("isActive", String(!item.isActive));

      const response = await fetch(
        `${basePath}/cards/${item._id}`,
        { method: "PUT", body: formData }
      );
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to change visibility");
      }

      await loadSlider();
      setMessage("Card visibility updated.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {isPageLocked
            ? `${pageKey === "home" ? "Home Page" : pageKey === "industry_insight" ? "Industry Insight" : pageKey === "talent-connect" ? "Talent Connect" : pageKey === "membership" ? "Membership" : pageKey.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())} Slider CMS`
            : "Slider CMS"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {isPageLocked
            ? `Manage slider content for the ${pageKey === "industry_insight" ? "Industry Insight" : pageKey === "talent-connect" ? "Talent Connect" : pageKey === "membership" ? "Membership" : "Home Page"} only.`
            : "Manage slider content across your website pages."}
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

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold">
          {isPageLocked ? "Page slider settings" : "Select page & section"}
        </h2>
        {isPageLocked && (
          <p className="mb-4 text-sm text-slate-500">
            This CMS is linked to this page only. Its slider content is stored separately.
          </p>
        )}

        <div className={`grid gap-4 ${isPageLocked && isSectionLocked ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}>
          {!isPageLocked && (
            <div>
              <label className="mb-1 block text-sm font-medium">Page</label>
              <select
                className={inputClass}
                value={pageKey}
                onChange={(e) => setPageKey(e.target.value)}
              >
                <option value="home">Home Page</option>
                <option value="industry_insight">Industry Insights</option>
                <option value="membership">Membership</option>
                <option value="talent-connect">Talent Connect</option>
                <option value="events">Events</option>
              </select>
            </div>
          )}

          {!isSectionLocked && (
            <div>
              <label className="mb-1 block text-sm font-medium">Section key</label>
              <input
                className={inputClass}
                value={sectionKey}
                onChange={(e) =>
                  setSectionKey(
                    e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "-")
                  )
                }
                placeholder="industry-slider"
              />
            </div>
          )}

          {isPageLocked && isSectionLocked && (
            <div className="rounded-lg bg-slate-50 px-3 py-3 text-sm text-slate-700">
              <span className="font-medium">Page:</span> {pageKey.replace(/-/g, " ")}<br />
              <span className="font-medium">Section key:</span> {sectionKey}
            </div>
          )}
        </div>

        {!isPageLocked && (
          <button
            type="button"
            onClick={loadSlider}
            className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
          >
            Load Section
          </button>
        )}
      </section>

      {loading ? (
        <p className="p-5 text-sm text-slate-500">Loading slider...</p>
      ) : (
        <>
          <form
            onSubmit={saveSettings}
            className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold">Slider Settings</h2>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Section heading
              </label>
              <input
                className={inputClass}
                value={settings.heading}
                onChange={(e) => updateSetting("heading", e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Subtitle
              </label>
              <textarea
                rows={2}
                className={inputClass}
                value={settings.subtitle}
                onChange={(e) => updateSetting("subtitle", e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Intro eyebrow
                </label>
                <input
                  className={inputClass}
                  value={settings.intro.eyebrow}
                  onChange={(e) => updateIntro("eyebrow", e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Intro title
                </label>
                <input
                  className={inputClass}
                  value={settings.intro.title}
                  onChange={(e) => updateIntro("title", e.target.value)}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Intro background
                </label>
                <select
                  className={inputClass}
                  value={settings.intro.color}
                  onChange={(e) => updateIntro("color", e.target.value)}
                >
                  <option value="bg-[#E52B18]">Red</option>
                  <option value="bg-[#17202B]">Dark navy</option>
                  <option value="bg-[#274C77]">Blue</option>
                  <option value="bg-[#28745B]">Green</option>
                  <option value="bg-[#6941C6]">Purple</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Visible slides
                </label>
                <select
                  className={inputClass}
                  value={settings.visibleSlides}
                  onChange={(e) =>
                    updateSetting("visibleSlides", Number(e.target.value))
                  }
                >
                  {[2, 3, 4, 5, 6].map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.intro.enabled}
                onChange={(e) => updateIntro("enabled", e.target.checked)}
              />
              Show intro card
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.isActive}
                onChange={(e) => updateSetting("isActive", e.target.checked)}
              />
              Publish slider section
            </label>

            <button
              disabled={saving}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </form>

          <div className="grid items-start gap-6 lg:grid-cols-[1fr_1fr]">
            <form
              onSubmit={saveCard}
              className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold">
                {editingId ? "Edit Slider Card" : "Add Slider Card"}
              </h2>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Card image
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  required={!editingId}
                  onChange={(e) => selectImage(e.target.files?.[0])}
                  className="block w-full text-sm"
                />

                {preview && (
                  <img
                    src={preview}
                    alt="Card preview"
                    className="mt-3 aspect-video w-full rounded-lg object-cover"
                  />
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Title</label>
                <input
                  required
                  className={inputClass}
                  value={card.title}
                  onChange={(e) =>
                    setCard({ ...card, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Description
                </label>
                <textarea
                  rows={3}
                  className={inputClass}
                  value={card.description}
                  onChange={(e) =>
                    setCard({ ...card, description: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Image alt text
                </label>
                <input
                  className={inputClass}
                  value={card.imageAlt}
                  onChange={(e) =>
                    setCard({ ...card, imageAlt: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Read More URL
                </label>
                <input
                  className={inputClass}
                  value={card.link}
                  onChange={(e) =>
                    setCard({ ...card, link: e.target.value })
                  }
                  placeholder="/industry-insights/example"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Link text
                  </label>
                  <input
                    className={inputClass}
                    value={card.linkText}
                    onChange={(e) =>
                      setCard({ ...card, linkText: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Display order
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
              </div>

              {editingId && (
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={card.isActive !== false}
                    onChange={(e) =>
                      setCard({ ...card, isActive: e.target.checked })
                    }
                  />
                  Published
                </label>
              )}

              <div className="flex flex-wrap gap-2">
                <button
                  disabled={saving}
                  className="rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Card"
                      : "Create Card"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetCardForm}
                    className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold">
                Cards ({cards.length})
              </h2>

              {cards.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                  No cards in this section yet.
                </div>
              )}

              {cards.map((item) => (
                <article
                  key={item._id}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    className="h-24 w-28 shrink-0 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-800">
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                      {item.description}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Order: {item.order} ·{" "}
                      {item.isActive ? "Published" : "Hidden"}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-sm">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="font-medium text-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleCard(item)}
                        className="font-medium text-amber-600"
                      >
                        {item.isActive ? "Hide" : "Publish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCard(item)}
                        className="font-medium text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </div>
        </>
      )}
    </div>
  );
}
