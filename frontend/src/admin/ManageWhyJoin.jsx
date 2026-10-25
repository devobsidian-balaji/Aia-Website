
// import { useCallback, useEffect, useMemo, useState } from "react";

// const API_URL = (
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api"
// ).replace(/\/$/, "");

// const PAGE_OPTIONS = [
//   { label: "Home Page", value: "home" },
//   { label: "Membership", value: "membership" },
//   { label: "Industry Insights", value: "industry-insights" },
//   { label: "Talent Connect", value: "talent-connect" },
// ];

// const SECTION_OPTIONS = [
//   { label: "Why Join", value: "why-join" },
//   { label: "member-benefits", value: "member" },
//   { label: "Industry Insights", value: "industry-insight" },
// ];

// const emptyItem = {
//   title: "",
//   description: "",
//   imageAlt: "",
//   link: "",
//   linkText: "Learn More",
//   order: 0,
//   isActive: true,
// };

// const inputClass =
//   "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100";

// const buttonClass =
//   "rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

// function getErrorMessage(error, fallback) {
//   return error?.message || fallback;
// }

// export default function ManageWhyJoin() {
//   // No default page: the admin must explicitly select one.
//   const [pageKey, setPageKey] = useState("");
//   const [sectionKey, setSectionKey] = useState("why-join");

//   const [section, setSection] = useState({
//     heading: "Why Join",
//     subtitle: "",
//     lineColor: "#FF6B5F",
//     isActive: true,
//   });

//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [savingSettings, setSavingSettings] = useState(false);
//   const [savingItem, setSavingItem] = useState(false);
//   const [deletingId, setDeletingId] = useState("");

//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const [editingId, setEditingId] = useState("");
//   const [item, setItem] = useState({ ...emptyItem });
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   const [search, setSearch] = useState("");

//   // The URL always follows the selected page and section.
//   const basePath = useMemo(() => {
//     if (!pageKey || !sectionKey) return "";

//     return (
//       `${API_URL}/why-join/admin/` +
//       `${encodeURIComponent(pageKey)}/` +
//       `${encodeURIComponent(sectionKey)}`
//     );
//   }, [pageKey, sectionKey]);

//   const clearEditor = useCallback(() => {
//     setEditingId("");
//     setItem({ ...emptyItem, order: items.length });
//     setImage(null);
//     setPreview("");
//   }, [items.length]);

//   const resetSection = useCallback(() => {
//     setItems([]);
//     setSection({
//       heading: "Why Join",
//       subtitle: "",
//       lineColor: "#FF6B5F",
//       isActive: true,
//     });
//     setEditingId("");
//     setItem({ ...emptyItem });
//     setImage(null);
//     setPreview("");
//     setSearch("");
//   }, []);

//   const loadSection = useCallback(async () => {
//     if (!pageKey || !sectionKey) {
//       setError("Please select a page and section first.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setMessage("");

//     try {
//       const response = await fetch(basePath);
//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Unable to load section.");
//       }

//       const data = result.data || {};

//       setSection({
//         heading: data.heading ?? "Why Join",
//         subtitle: data.subtitle ?? "",
//         lineColor: data.lineColor ?? "#FF6B5F",
//         isActive: data.isActive !== false,
//       });

//       const savedItems = Array.isArray(data.items) ? data.items : [];

//       setItems(
//         [...savedItems].sort(
//           (a, b) => (a.order ?? 0) - (b.order ?? 0)
//         )
//       );

//       setEditingId("");
//       setItem({ ...emptyItem, order: savedItems.length });
//       setImage(null);
//       setPreview("");
//       setMessage(
//         `Loaded ${savedItems.length} card(s) for ${pageKey}.`
//       );
//     } catch (err) {
//       setError(getErrorMessage(err, "Unable to load section."));
//     } finally {
//       setLoading(false);
//     }
//   }, [basePath, pageKey, sectionKey]);

//   // Do not automatically create or load sections before page selection.
//   useEffect(() => {
//     resetSection();
//     setError("");
//     setMessage("");
//   }, [pageKey, sectionKey, resetSection]);

//   const updateSectionField = (event) => {
//     const { name, value, type, checked } = event.target;

//     setSection((previous) => ({
//       ...previous,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const updateItemField = (event) => {
//     const { name, value, type, checked } = event.target;

//     setItem((previous) => ({
//       ...previous,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : name === "order"
//             ? value
//             : value,
//     }));
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image.");
//       event.target.value = "";
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError("Image size must be 5 MB or less.");
//       event.target.value = "";
//       return;
//     }

//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//     setError("");
//   };

//   const saveSettings = async (event) => {
//     event.preventDefault();

//     if (!basePath) {
//       setError("Select a page and section first.");
//       return;
//     }

//     setSavingSettings(true);
//     setError("");
//     setMessage("");

//     try {
//       const response = await fetch(basePath, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(section),
//       });

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Unable to save settings.");
//       }

//       const data = result.data || {};

//       setSection({
//         heading: data.heading ?? section.heading,
//         subtitle: data.subtitle ?? section.subtitle,
//         lineColor: data.lineColor ?? section.lineColor,
//         isActive: data.isActive !== false,
//       });

//       setMessage("Section settings saved successfully.");
//     } catch (err) {
//       setError(getErrorMessage(err, "Unable to save settings."));
//     } finally {
//       setSavingSettings(false);
//     }
//   };

//   const saveItem = async (event) => {
//     event.preventDefault();

//     if (!basePath) {
//       setError("Select a page and section first.");
//       return;
//     }

//     if (!item.title.trim()) {
//       setError("Card title is required.");
//       return;
//     }

//     if (!editingId && !image) {
//       setError("Please select an image for the new card.");
//       return;
//     }

//     if (editingId && !image && !item.imageUrl) {
//       setError("Please select a card image.");
//       return;
//     }

//     setSavingItem(true);
//     setError("");
//     setMessage("");

//     try {
//       const formData = new FormData();

//       formData.append("title", item.title.trim());
//       formData.append("description", item.description || "");
//       formData.append("imageAlt", item.imageAlt || item.title);
//       formData.append("link", item.link || "");
//       formData.append("linkText", item.linkText || "Learn More");
//       formData.append(
//         "order",
//         String(Number.isFinite(Number(item.order)) ? Number(item.order) : items.length)
//       );
//       formData.append("isActive", String(item.isActive !== false));

//       if (image) {
//         formData.append("image", image);
//       }

//       const url = editingId
//         ? `${basePath}/items/${encodeURIComponent(editingId)}`
//         : `${basePath}/items`;

//       const response = await fetch(url, {
//         method: editingId ? "PUT" : "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Unable to save card.");
//       }

//       const savedItem = result.data;

//       if (editingId) {
//         setItems((previous) =>
//           previous
//             .map((existing) =>
//               existing._id === editingId ? savedItem : existing
//             )
//             .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
//         );

//         setMessage("Card updated successfully.");
//       } else {
//         setItems((previous) =>
//           [...previous, savedItem].sort(
//             (a, b) => (a.order ?? 0) - (b.order ?? 0)
//           )
//         );

//         setMessage("Card created successfully.");
//       }

//       setEditingId("");
//       setItem({
//         ...emptyItem,
//         order: editingId ? items.length : items.length + 1,
//       });
//       setImage(null);
//       setPreview("");
//     } catch (err) {
//       setError(getErrorMessage(err, "Unable to save card."));
//     } finally {
//       setSavingItem(false);
//     }
//   };

//   const startEditing = (savedItem) => {
//     setEditingId(savedItem._id);

//     setItem({
//       title: savedItem.title || "",
//       description: savedItem.description || "",
//       imageUrl: savedItem.imageUrl || "",
//       imageAlt: savedItem.imageAlt || "",
//       link: savedItem.link || "",
//       linkText: savedItem.linkText || "Learn More",
//       order: savedItem.order ?? 0,
//       isActive: savedItem.isActive !== false,
//     });

//     setImage(null);
//     setPreview("");
//     setError("");
//     setMessage("");

//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const deleteItem = async (savedItem) => {
//     if (!basePath) return;

//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${savedItem.title}"?`
//     );

//     if (!confirmed) return;

//     setDeletingId(savedItem._id);
//     setError("");
//     setMessage("");

//     try {
//       const response = await fetch(
//         `${basePath}/items/${encodeURIComponent(savedItem._id)}`,
//         { method: "DELETE" }
//       );

//       const result = await response.json();

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Unable to delete card.");
//       }

//       setItems((previous) =>
//         previous.filter((existing) => existing._id !== savedItem._id)
//       );

//       if (editingId === savedItem._id) {
//         setEditingId("");
//         setItem({ ...emptyItem });
//         setImage(null);
//         setPreview("");
//       }

//       setMessage("Card deleted successfully.");
//     } catch (err) {
//       setError(getErrorMessage(err, "Unable to delete card."));
//     } finally {
//       setDeletingId("");
//     }
//   };

//   const filteredItems = items.filter((savedItem) => {
//     const query = search.trim().toLowerCase();

//     return (
//       !query ||
//       savedItem.title?.toLowerCase().includes(query) ||
//       savedItem.description?.toLowerCase().includes(query)
//     );
//   });

//   const imageSrc = (url) => {
//     if (!url) return "";

//     if (/^(https?:|data:|blob:)/i.test(url)) return url;

//     const origin = API_URL.replace(/\/api\/?$/, "");
//     return `${origin}${url.startsWith("/") ? "" : "/"}${url}`;
//   };

//   return (
//     <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <header className="mb-8">
//           <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
//             AIA Website CMS
//           </p>

//           <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
//             Manage Why Join
//           </h1>

//           <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
//             Select a website page and section to manage its content.
//             Cards from other pages remain separate.
//           </p>
//         </header>

//         {error && (
//           <div
//             role="alert"
//             className="mb-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
//           >
//             {error}
//           </div>
//         )}

//         {message && (
//           <div
//             role="status"
//             className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
//           >
//             {message}
//           </div>
//         )}

//         {/* Page and section selection */}
//         <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//           <div className="mb-5">
//             <h2 className="text-lg font-semibold text-slate-900">
//               Choose content location
//             </h2>
//             <p className="mt-1 text-sm text-slate-500">
//               No page is selected automatically.
//             </p>
//           </div>

//           <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
//             <label className="block text-sm font-medium text-slate-700">
//               Website page
//               <select
//                 value={pageKey}
//                 onChange={(event) => setPageKey(event.target.value)}
//                 className={inputClass}
//               >
//                 <option value="">Select a page</option>
//                 {PAGE_OPTIONS.map((page) => (
//                   <option key={page.value} value={page.value}>
//                     {page.label}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label className="block text-sm font-medium text-slate-700">
//               Section
//               <select
//                 value={sectionKey}
//                 onChange={(event) => setSectionKey(event.target.value)}
//                 className={inputClass}
//               >
//                 {SECTION_OPTIONS.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <button
//               type="button"
//               onClick={loadSection}
//               disabled={!pageKey || !sectionKey || loading}
//               className={`${buttonClass} bg-slate-900 text-white hover:bg-slate-700`}
//             >
//               {loading ? "Loading..." : "Load Section"}
//             </button>
//           </div>

//           {!pageKey && (
//             <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-500">
//               Select a page above, then click Load Section to view its cards.
//             </p>
//           )}
//         </section>

//         {pageKey && (
//           <>
//             {/* Section settings */}
//             <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//               <div className="mb-5">
//                 <h2 className="text-lg font-semibold text-slate-900">
//                   Section settings
//                 </h2>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Settings apply only to the selected page and section.
//                 </p>
//               </div>

//               <form onSubmit={saveSettings} className="space-y-4">
//                 <div className="grid gap-4 md:grid-cols-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Section heading
//                     <input
//                       name="heading"
//                       value={section.heading}
//                       onChange={updateSectionField}
//                       className={inputClass}
//                       required
//                     />
//                   </label>

//                   <label className="block text-sm font-medium text-slate-700">
//                     Line color
//                     <div className="mt-1.5 flex gap-3">
//                       <input
//                         type="color"
//                         name="lineColor"
//                         value={section.lineColor}
//                         onChange={updateSectionField}
//                         className="h-11 w-14 cursor-pointer rounded-lg border border-slate-300 p-1"
//                       />
//                       <input
//                         value={section.lineColor}
//                         onChange={(event) =>
//                           setSection((previous) => ({
//                             ...previous,
//                             lineColor: event.target.value,
//                           }))
//                         }
//                         className={`${inputClass} mt-0`}
//                         pattern="^#[0-9a-fA-F]{6}$"
//                         required
//                       />
//                     </div>
//                   </label>
//                 </div>

//                 <label className="block text-sm font-medium text-slate-700">
//                   Subtitle
//                   <textarea
//                     name="subtitle"
//                     value={section.subtitle}
//                     onChange={updateSectionField}
//                     rows={2}
//                     className={inputClass}
//                   />
//                 </label>

//                 <label className="flex items-center gap-2 text-sm text-slate-700">
//                   <input
//                     type="checkbox"
//                     name="isActive"
//                     checked={section.isActive}
//                     onChange={updateSectionField}
//                     className="h-4 w-4 accent-rose-600"
//                   />
//                   Publish entire section
//                 </label>

//                 <button
//                   type="submit"
//                   disabled={savingSettings || loading}
//                   className={`${buttonClass} border border-slate-300 text-slate-700 hover:bg-slate-50`}
//                 >
//                   {savingSettings ? "Saving..." : "Save Section Settings"}
//                 </button>
//               </form>
//             </section>

//             {/* Add/edit card form */}
//             <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//               <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
//                 <div>
//                   <h2 className="text-lg font-semibold text-slate-900">
//                     {editingId ? "Edit Card" : "Create New Card"}
//                   </h2>
//                   <p className="mt-1 text-sm text-slate-500">
//                     {editingId
//                       ? "Update the selected card."
//                       : "Add a new card to this section."}
//                   </p>
//                 </div>

//                 {editingId && (
//                   <button
//                     type="button"
//                     onClick={clearEditor}
//                     className={`${buttonClass} border border-slate-300 text-slate-700`}
//                   >
//                     Cancel Edit
//                   </button>
//                 )}
//               </div>

//               <form onSubmit={saveItem} className="space-y-4">
//                 <div className="grid gap-4 md:grid-cols-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Card title
//                     <input
//                       name="title"
//                       value={item.title}
//                       onChange={updateItemField}
//                       className={inputClass}
//                       placeholder="For Technology Providers"
//                       required
//                     />
//                   </label>

//                   <label className="block text-sm font-medium text-slate-700">
//                     Display order
//                     <input
//                       name="order"
//                       type="number"
//                       min="0"
//                       value={item.order}
//                       onChange={updateItemField}
//                       className={inputClass}
//                     />
//                   </label>
//                 </div>

//                 <label className="block text-sm font-medium text-slate-700">
//                   Description
//                   <textarea
//                     name="description"
//                     value={item.description}
//                     onChange={updateItemField}
//                     rows={4}
//                     className={inputClass}
//                     placeholder="Enter card description..."
//                   />
//                 </label>

//                 <label className="block text-sm font-medium text-slate-700">
//                   Card image {editingId && "(optional — keep existing image)"}
//                   <input
//                     type="file"
//                     accept="image/jpeg,image/png,image/webp,image/gif"
//                     onChange={handleImageChange}
//                     className="mt-2 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-rose-50 file:px-4 file:py-2 file:font-medium file:text-rose-700 hover:file:bg-rose-100"
//                     required={!editingId}
//                   />
//                 </label>

//                 {(preview || item.imageUrl) && (
//                   <img
//                     src={preview || imageSrc(item.imageUrl)}
//                     alt="Card preview"
//                     className="aspect-video w-full max-w-md rounded-xl border border-slate-200 object-cover"
//                   />
//                 )}

//                 <label className="block text-sm font-medium text-slate-700">
//                   Image alt text
//                   <input
//                     name="imageAlt"
//                     value={item.imageAlt}
//                     onChange={updateItemField}
//                     className={inputClass}
//                     placeholder="Describe the image"
//                   />
//                 </label>

//                 <div className="grid gap-4 md:grid-cols-2">
//                   <label className="block text-sm font-medium text-slate-700">
//                     Link URL
//                     <input
//                       name="link"
//                       value={item.link}
//                       onChange={updateItemField}
//                       className={inputClass}
//                       placeholder="/membership/benefits"
//                     />
//                   </label>

//                   <label className="block text-sm font-medium text-slate-700">
//                     Link text
//                     <input
//                       name="linkText"
//                       value={item.linkText}
//                       onChange={updateItemField}
//                       className={inputClass}
//                     />
//                   </label>
//                 </div>

//                 <label className="flex items-center gap-2 text-sm text-slate-700">
//                   <input
//                     name="isActive"
//                     type="checkbox"
//                     checked={item.isActive !== false}
//                     onChange={updateItemField}
//                     className="h-4 w-4 accent-rose-600"
//                   />
//                   Publish this card
//                 </label>

//                 <button
//                   type="submit"
//                   disabled={savingItem || loading}
//                   className={`${buttonClass} bg-rose-600 text-white hover:bg-rose-700`}
//                 >
//                   {savingItem
//                     ? "Saving..."
//                     : editingId
//                       ? "Save Changes"
//                       : "Create Card"}
//                 </button>
//               </form>
//             </section>

//             {/* Existing cards */}
//             <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//               <div className="flex flex-wrap items-center justify-between gap-4">
//                 <div>
//                   <h2 className="text-lg font-semibold text-slate-900">
//                     Existing Cards
//                   </h2>
//                   <p className="mt-1 text-sm text-slate-500">
//                     {items.length} card{items.length === 1 ? "" : "s"} in{" "}
//                     {PAGE_OPTIONS.find((page) => page.value === pageKey)?.label ||
//                       pageKey}
//                   </p>
//                 </div>

//                 <input
//                   value={search}
//                   onChange={(event) => setSearch(event.target.value)}
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm sm:w-64"
//                   placeholder="Search cards..."
//                 />
//               </div>

//               {!loading && filteredItems.length === 0 ? (
//                 <div className="mt-5 rounded-xl border border-dashed border-slate-300 px-4 py-12 text-center">
//                   <h3 className="font-semibold text-slate-800">
//                     {items.length === 0
//                       ? "No cards in this section yet"
//                       : "No matching cards"}
//                   </h3>
//                   <p className="mt-2 text-sm text-slate-500">
//                     {items.length === 0
//                       ? "Create a card using the form above."
//                       : "Try a different search term."}
//                   </p>
//                 </div>
//               ) : (
//                 <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
//                   {filteredItems.map((savedItem) => (
//                     <article
//                       key={savedItem._id}
//                       className="overflow-hidden rounded-xl border border-slate-200 bg-white"
//                     >
//                       <div className="aspect-[16/9] bg-slate-100">
//                         {savedItem.imageUrl && (
//                           <img
//                             src={imageSrc(savedItem.imageUrl)}
//                             alt={savedItem.imageAlt || savedItem.title}
//                             loading="lazy"
//                             className="h-full w-full object-cover"
//                           />
//                         )}
//                       </div>

//                       <div className="p-4">
//                         <div className="flex items-start justify-between gap-3">
//                           <h3 className="font-semibold text-slate-900">
//                             {savedItem.title}
//                           </h3>
//                           <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
//                             #{savedItem.order ?? 0}
//                           </span>
//                         </div>

//                         <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
//                           {savedItem.description || "No description"}
//                         </p>

//                         <div className="mt-3">
//                           <span
//                             className={`rounded-full px-2.5 py-1 text-xs font-medium ${
//                               savedItem.isActive
//                                 ? "bg-emerald-50 text-emerald-700"
//                                 : "bg-slate-100 text-slate-600"
//                             }`}
//                           >
//                             {savedItem.isActive ? "Published" : "Draft"}
//                           </span>
//                         </div>

//                         <div className="mt-4 flex gap-2">
//                           <button
//                             type="button"
//                             onClick={() => startEditing(savedItem)}
//                             className={`${buttonClass} flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50`}
//                           >
//                             Edit
//                           </button>

//                           <button
//                             type="button"
//                             onClick={() => deleteItem(savedItem)}
//                             disabled={deletingId === savedItem._id}
//                             className={`${buttonClass} flex-1 border border-rose-200 text-rose-600 hover:bg-rose-50`}
//                           >
//                             {deletingId === savedItem._id
//                               ? "Deleting..."
//                               : "Delete"}
//                           </button>
//                         </div>
//                       </div>
//                     </article>
//                   ))}
//                 </div>
//               )}
//             </section>
//           </>
//         )}
//       </div>
//     </main>
//   );
// }



import { useCallback, useEffect, useMemo, useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const EMPTY_ITEM = {
  title: "",
  description: "",
  imageAlt: "",
  link: "",
  linkText: "Learn More",
  order: 0,
  isActive: true,
};

const EMPTY_SECTION = {
  heading: "Why Join",
  subtitle: "",
  lineColor: "#FF6B5F",
  isActive: true,
};

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100";

const buttonClass =
  "rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

const PAGE_LABELS = {
  home: "Home Page",
  "about-aia": "About AIA",
  membership: "Membership",
  "industry-insight": "Industry Insight",
  "talent-connect": "Talent Connect",
};

export default function ManageWhyJoin({
  defaultPageKey,
  defaultSectionKey = "why-join",
}) {
  const pageKey = defaultPageKey;
  const sectionKey = defaultSectionKey;

  const [section, setSection] = useState({ ...EMPTY_SECTION });
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ ...EMPTY_ITEM });
  const [editingId, setEditingId] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingItem, setSavingItem] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const basePath = useMemo(() => {
    if (!pageKey || !sectionKey) return "";
    return `${API_URL}/why-join/admin/${encodeURIComponent(
      pageKey
    )}/${encodeURIComponent(sectionKey)}`;
  }, [pageKey, sectionKey]);

  const imageSrc = useCallback((url) => {
    if (!url) return "";
    if (/^(https?:|data:|blob:)/i.test(url)) return url;

    const origin = API_URL.replace(/\/api\/?$/, "");
    return `${origin}${url.startsWith("/") ? "" : "/"}${url}`;
  }, []);

  const resetEditor = useCallback((order = 0) => {
    setEditingId("");
    setItem({ ...EMPTY_ITEM, order });
    setImage(null);
    setPreview("");
  }, []);

  const loadSection = useCallback(async () => {
    if (!pageKey || !sectionKey) {
      setError("This CMS page is missing its page configuration.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(basePath);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to load section.");
      }

      const data = result.data || {};
      const savedItems = Array.isArray(data.items) ? data.items : [];

      setSection({
        ...EMPTY_SECTION,
        ...data,
      });

      setItems(
        [...savedItems].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        )
      );

      resetEditor(savedItems.length);
      setSearch("");
      setMessage(
        `Loaded ${savedItems.length} card(s) for ${
          PAGE_LABELS[pageKey] || pageKey
        }.`
      );
    } catch (err) {
      setError(err.message || "Unable to load section.");
    } finally {
      setLoading(false);
    }
  }, [basePath, pageKey, sectionKey, resetEditor]);

  useEffect(() => {
    loadSection();
  }, [loadSection]);

  const updateSectionField = (event) => {
    const { name, value, type, checked } = event.target;
    setSection((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateItemField = (event) => {
    const { name, value, type, checked } = event.target;
    setItem((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : name === "order"
            ? Number(value)
            : value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be 5 MB or less.");
      event.target.value = "";
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError("");
  };

  const saveSettings = async (event) => {
    event.preventDefault();
    setSavingSettings(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(basePath, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(section),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to save settings.");
      }

      setSection((previous) => ({
        ...previous,
        ...(result.data || {}),
      }));

      setMessage("Section settings saved successfully.");
    } catch (err) {
      setError(err.message || "Unable to save settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  const saveItem = async (event) => {
    event.preventDefault();

    if (!item.title.trim()) {
      setError("Card title is required.");
      return;
    }

    if (!editingId && !image) {
      setError("Please select an image for the new card.");
      return;
    }

    if (editingId && !image && !item.imageUrl) {
      setError("Please select a card image.");
      return;
    }

    setSavingItem(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("title", item.title.trim());
      formData.append("description", item.description || "");
      formData.append("imageAlt", item.imageAlt || item.title);
      formData.append("link", item.link || "");
      formData.append("linkText", item.linkText || "Learn More");
      formData.append("order", String(Number(item.order) || 0));
      formData.append("isActive", String(item.isActive !== false));

      if (image) formData.append("image", image);

      const url = editingId
        ? `${basePath}/items/${encodeURIComponent(editingId)}`
        : `${basePath}/items`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to save card.");
      }

      await loadSection();
      setMessage(
        editingId
          ? "Card updated successfully."
          : "Card created successfully."
      );
    } catch (err) {
      setError(err.message || "Unable to save card.");
    } finally {
      setSavingItem(false);
    }
  };

  const startEditing = (savedItem) => {
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
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteItem = async (savedItem) => {
    if (
      !window.confirm(`Delete "${savedItem.title}"? This cannot be undone.`)
    ) {
      return;
    }

    setDeletingId(savedItem._id);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${basePath}/items/${encodeURIComponent(savedItem._id)}`,
        { method: "DELETE" }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete card.");
      }

      await loadSection();
      setMessage("Card deleted successfully.");
    } catch (err) {
      setError(err.message || "Unable to delete card.");
    } finally {
      setDeletingId("");
    }
  };

  const toggleItem = async (savedItem) => {
    try {
      const formData = new FormData();
      formData.append("isActive", String(savedItem.isActive === false));

      const response = await fetch(
        `${basePath}/items/${encodeURIComponent(savedItem._id)}`,
        { method: "PUT", body: formData }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to change card status.");
      }

      await loadSection();
      setMessage("Card visibility updated.");
    } catch (err) {
      setError(err.message || "Unable to change card status.");
    }
  };

  const filteredItems = items.filter((savedItem) => {
    const query = search.trim().toLowerCase();
    return (
      !query ||
      savedItem.title?.toLowerCase().includes(query) ||
      savedItem.description?.toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
            AIA Website CMS
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {PAGE_LABELS[pageKey] || pageKey} — Why Join CMS
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage Why Join content for this page only. Other pages have
            separate content.
          </p>
        </header>

        {error && (
          <div role="alert" className="mb-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        )}

        {message && (
          <div role="status" className="mb-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">
            {message}
          </div>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Page Content Settings
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Page: <strong>{PAGE_LABELS[pageKey] || pageKey}</strong>
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Section: <strong>{sectionKey}</strong>
          </p>
          <button
            type="button"
            onClick={loadSection}
            disabled={loading}
            className={`${buttonClass} mt-4 bg-slate-900 text-white`}
          >
            {loading ? "Loading..." : "Reload Section"}
          </button>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold">Section Settings</h2>
          <form onSubmit={saveSettings} className="space-y-4">
            <label className="block text-sm font-medium">
              Section heading
              <input
                name="heading"
                value={section.heading}
                onChange={updateSectionField}
                className={inputClass}
                required
              />
            </label>

            <label className="block text-sm font-medium">
              Subtitle
              <textarea
                name="subtitle"
                value={section.subtitle}
                onChange={updateSectionField}
                rows={3}
                className={inputClass}
              />
            </label>

            <label className="block text-sm font-medium">
              Line color
              <div className="flex gap-3">
                <input
                  type="color"
                  name="lineColor"
                  value={section.lineColor}
                  onChange={updateSectionField}
                  className="mt-2 h-11 w-14 rounded border"
                />
                <input
                  value={section.lineColor}
                  onChange={(event) =>
                    setSection((previous) => ({
                      ...previous,
                      lineColor: event.target.value,
                    }))
                  }
                  className={inputClass}
                  pattern="^#[0-9a-fA-F]{6}$"
                  required
                />
              </div>
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="isActive"
                checked={section.isActive}
                onChange={updateSectionField}
              />
              Publish entire section
            </label>

            <button
              type="submit"
              disabled={savingSettings || loading}
              className={`${buttonClass} bg-slate-900 text-white`}
            >
              {savingSettings ? "Saving..." : "Save Section Settings"}
            </button>
          </form>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold">
            {editingId ? "Edit Card" : "Create New Card"}
          </h2>

          <form onSubmit={saveItem} className="space-y-4">
            <label className="block text-sm font-medium">
              Card title
              <input
                name="title"
                value={item.title}
                onChange={updateItemField}
                className={inputClass}
                required
              />
            </label>

            <label className="block text-sm font-medium">
              Description
              <textarea
                name="description"
                value={item.description}
                onChange={updateItemField}
                rows={4}
                className={inputClass}
              />
            </label>

            <label className="block text-sm font-medium">
              Card image {editingId && "(optional — keep existing image)"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 block w-full text-sm"
                required={!editingId}
              />
            </label>

            {(preview || item.imageUrl) && (
              <img
                src={preview || imageSrc(item.imageUrl)}
                alt="Card preview"
                className="aspect-video w-full max-w-md rounded-xl object-cover"
              />
            )}

            <label className="block text-sm font-medium">
              Image alt text
              <input
                name="imageAlt"
                value={item.imageAlt}
                onChange={updateItemField}
                className={inputClass}
              />
            </label>

            <label className="block text-sm font-medium">
              Link URL
              <input
                name="link"
                value={item.link}
                onChange={updateItemField}
                className={inputClass}
                placeholder="/membership"
              />
            </label>

            <label className="block text-sm font-medium">
              Link text
              <input
                name="linkText"
                value={item.linkText}
                onChange={updateItemField}
                className={inputClass}
              />
            </label>

            <label className="block text-sm font-medium">
              Display order
              <input
                name="order"
                type="number"
                min="0"
                value={item.order}
                onChange={updateItemField}
                className={inputClass}
              />
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                name="isActive"
                type="checkbox"
                checked={item.isActive !== false}
                onChange={updateItemField}
              />
              Publish this card
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={savingItem || loading}
                className={`${buttonClass} bg-rose-600 text-white`}
              >
                {savingItem
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Create Card"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => resetEditor(items.length)}
                  className={`${buttonClass} border border-slate-300`}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Existing Cards</h2>
              <p className="mt-1 text-sm text-slate-500">
                {items.length} card(s) for {PAGE_LABELS[pageKey] || pageKey}
              </p>
            </div>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm sm:w-64"
              placeholder="Search cards..."
            />
          </div>

          {loading ? (
            <p className="py-8 text-sm text-slate-500">Loading cards...</p>
          ) : filteredItems.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed p-10 text-center">
              No cards in this section yet.
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((savedItem) => (
                <article
                  key={savedItem._id}
                  className="overflow-hidden rounded-xl border border-slate-200"
                >
                  {savedItem.imageUrl && (
                    <img
                      src={imageSrc(savedItem.imageUrl)}
                      alt={savedItem.imageAlt || savedItem.title}
                      className="aspect-video w-full object-cover"
                    />
                  )}

                  <div className="p-4">
                    <h3 className="font-semibold">{savedItem.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                      {savedItem.description || "No description"}
                    </p>

                    <p className="mt-3 text-xs text-slate-500">
                      Order: {savedItem.order ?? 0} ·{" "}
                      {savedItem.isActive === false ? "Draft" : "Published"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => startEditing(savedItem)}
                        className={`${buttonClass} border border-slate-300`}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleItem(savedItem)}
                        className={`${buttonClass} border border-slate-300`}
                      >
                        {savedItem.isActive === false ? "Publish" : "Hide"}
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteItem(savedItem)}
                        disabled={deletingId === savedItem._id}
                        className={`${buttonClass} border border-rose-200 text-rose-600`}
                      >
                        {deletingId === savedItem._id ? "Deleting..." : "Delete"}
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
