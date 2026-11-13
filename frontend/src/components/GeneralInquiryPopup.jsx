// import React, { useEffect, useState } from "react";
// import {
//   X,
//   Loader2,
//   CheckCircle2,
//   AlertCircle,
// } from "lucide-react";

// const initialForm = {
//   ecosystem: "Manufacturing Sector",
//   manufacturingSector: "Cement",
//   fullName: "",
//   email: "",
//   companyName: "",
//   website: "",
//   phoneNumber: "",
//   message: "",
// };

// const ecosystemOptions = [
//   "Manufacturing Sector",
//   "Automotive Ecosystem",
//   "Technology Providers",
//   "System Integrators",
//   "Manufacturers & Automation Users",
// ];

// const manufacturingOptions = [
//   "Cement",
//   "Automotive",
//   "Steel",
//   "Textile",
//   "Pharmaceuticals",
//   "Food Processing",
//   "Electronics",
//   "Other",
// ];

// // Normalize website URL
// const normalizeWebsite = (value) => {
//   const website = value.trim();

//   if (!website) return "";

//   return /^https?:\/\//i.test(website)
//     ? website
//     : `https://${website}`;
// };

// // Validate website URL
// const isValidWebsite = (value) => {
//   if (!value.trim()) return true;

//   try {
//     const url = new URL(normalizeWebsite(value));

//     const hostname = url.hostname;

//     const hostnameRegex =
//       /^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/;

//     return (
//       ["http:", "https:"].includes(url.protocol) &&
//       hostnameRegex.test(hostname)
//     );
//   } catch {
//     return false;
//   }
// };

// export default function GeneralInquiryPopup({ onSubmit }) {
//   const [isOpen, setIsOpen] = useState(false);

//   const [form, setForm] = useState(initialForm);
//   const [errors, setErrors] = useState({});

//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [submitError, setSubmitError] = useState("");

//   // Show popup after 20 seconds
//   useEffect(() => {
//     const timer = window.setTimeout(() => {
//       setIsOpen(true);
//     }, 20000);

//     return () => window.clearTimeout(timer);
//   }, []);

//   // Lock background scroll and handle Escape
//   useEffect(() => {
//     if (!isOpen) return;

//     const previousOverflow = document.body.style.overflow;

//     document.body.style.overflow = "hidden";

//     const handleEscape = (event) => {
//       if (event.key === "Escape" && !submitting) {
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener("keydown", handleEscape);

//     return () => {
//       document.body.style.overflow = previousOverflow;
//       window.removeEventListener("keydown", handleEscape);
//     };
//   }, [isOpen, submitting]);

//   // Handle input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));

//     setSubmitError("");
//   };

//   // Phone number input
//   const handlePhoneChange = (event) => {
//     const value = event.target.value;

//     // Only digits, +, spaces, brackets and hyphens
//     if (!/^[0-9+\s()-]*$/.test(value)) return;

//     // Plus sign only once and at the beginning
//     if ((value.match(/\+/g) || []).length > 1) return;

//     if (value.includes("+") && !value.startsWith("+")) return;

//     handleChange(event);
//   };

//   // Complete form validation
//   const validateForm = () => {
//     const newErrors = {};

//     // Ecosystem
//     if (!form.ecosystem) {
//       newErrors.ecosystem = "Please select an ecosystem.";
//     }

//     // Manufacturing sector
//     if (!form.manufacturingSector) {
//       newErrors.manufacturingSector = "Please select a sector.";
//     }

//     // Full name
//     if (!form.fullName.trim()) {
//       newErrors.fullName = "Full name is required.";
//     } else if (form.fullName.trim().length < 2) {
//       newErrors.fullName = "Name must contain at least 2 characters.";
//     } else if (!/^[a-zA-ZÀ-ÿ\s.'-]+$/.test(form.fullName.trim())) {
//       newErrors.fullName = "Please enter a valid name.";
//     }

//     // Email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

//     if (!form.email.trim()) {
//       newErrors.email = "Email address is required.";
//     } else if (!emailRegex.test(form.email.trim())) {
//       newErrors.email = "Please enter a valid email address.";
//     }

//     // Company name
//     if (form.companyName.trim().length > 150) {
//       newErrors.companyName = "Company name is too long.";
//     }

//     // Website validation
//     if (form.website.trim() && !isValidWebsite(form.website)) {
//       newErrors.website = "Please enter a valid website URL.";
//     }

//     // Phone number validation
//     const phone = form.phoneNumber.trim();
//     const normalizedPhone = phone.replace(/[\s()-]/g, "");

//     const phoneRegex = /^\+?[1-9]\d{6,14}$/;

//     if (!phone) {
//       newErrors.phoneNumber = "Phone number is required.";
//     } else if (!phoneRegex.test(normalizedPhone)) {
//       newErrors.phoneNumber =
//         "Enter a valid phone number (7–15 digits).";
//     }

//     // Message
//     if (form.message.length > 2000) {
//       newErrors.message = "Message cannot exceed 2000 characters.";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   // Submit form
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setSubmitError("");

//     if (!validateForm()) return;

//     if (typeof onSubmit !== "function") {
//       setSubmitError(
//         "Inquiry API is not connected. Please contact the administrator."
//       );
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const normalizedPhone = form.phoneNumber
//         .trim()
//         .replace(/[\s()-]/g, "");

//       const payload = {
//         ecosystem: form.ecosystem,
//         manufacturingSector: form.manufacturingSector,
//         fullName: form.fullName.trim(),
//         email: form.email.trim().toLowerCase(),
//         companyName: form.companyName.trim(),
//         website: normalizeWebsite(form.website),
//         phoneNumber: normalizedPhone,
//         message: form.message.trim(),
//       };

//       const result = await onSubmit(payload);

//       setSuccess(true);
//       setForm(initialForm);
//       setErrors({});

//       return result;
//     } catch (error) {
//       console.error("Inquiry submission error:", error);

//       setSubmitError(
//         error?.message ||
//           "Unable to submit your inquiry. Please try again."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Close popup
//   const closePopup = () => {
//     if (submitting) return;

//     setIsOpen(false);
//   };

//   // Input styles
//   const inputClass = (field) =>
//     `h-[42px] w-full min-w-0 rounded-md border bg-white px-3 text-[12px] text-[#202938] outline-none transition placeholder:text-[#687386] focus:border-[#E37263] focus:ring-2 focus:ring-[#E37263]/20 ${
//       errors[field] ? "border-red-500" : "border-gray-200"
//     }`;

//   const labelClass =
//     "mb-1 block text-[13px] font-medium text-[#A9A9A9]";

//   const requiredMark = <span className="text-red-500"> *</span>;

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/75 px-3 py-5 backdrop-blur-[5px] sm:px-5"
//       onMouseDown={(event) => {
//         if (event.target === event.currentTarget) {
//           closePopup();
//         }
//       }}
//     >
//       <div
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="inquiry-title"
//         className="relative my-auto w-full max-w-[535px] overflow-hidden rounded-lg border border-white/15 bg-gradient-to-br from-[#252525] to-[#191919] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:p-5 md:p-6"
//       >
//         {/* Close Button */}
//         <button
//           type="button"
//           onClick={closePopup}
//           disabled={submitting}
//           aria-label="Close inquiry form"
//           className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
//         >
//           <X size={17} />
//         </button>

//         {!success ? (
//           <>
//             {/* Heading */}
//             <div className="mb-4 pr-7">
//               <h2
//                 id="inquiry-title"
//                 className="text-lg font-bold tracking-tight text-white sm:text-xl"
//               >
//                 General Inquiry
//               </h2>
//             </div>

//             <form onSubmit={handleSubmit} noValidate>
//               <div className="grid grid-cols-1 gap-x-3 gap-y-2.5 sm:grid-cols-2">

//                 {/* Automotive Ecosystem */}
//                 <div>
//                   <label className={labelClass}>
//                     Automotive Ecosystem
//                   </label>

//                   <select
//                     name="ecosystem"
//                     value={form.ecosystem}
//                     onChange={handleChange}
//                     className={inputClass("ecosystem")}
//                   >
//                     {ecosystemOptions.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>

//                   {errors.ecosystem && (
//                     <p className="mt-1 text-[13px] text-red-400">
//                       {errors.ecosystem}
//                     </p>
//                   )}
//                 </div>

//                 {/* Manufacturing Sector */}
//                 <div>
//                   <label className={labelClass}>
//                     Manufacturing Sector
//                   </label>

//                   <select
//                     name="manufacturingSector"
//                     value={form.manufacturingSector}
//                     onChange={handleChange}
//                     className={inputClass("manufacturingSector")}
//                   >
//                     {manufacturingOptions.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>

//                   {errors.manufacturingSector && (
//                     <p className="mt-1 text-[13px] text-red-400">
//                       {errors.manufacturingSector}
//                     </p>
//                   )}
//                 </div>

//                 {/* Full Name */}
//                 <div>
//                   <label className={labelClass}>
//                     Full Name{requiredMark}
//                   </label>

//                   <input
//                     type="text"
//                     name="fullName"
//                     value={form.fullName}
//                     onChange={handleChange}
//                     placeholder="John Doe"
//                     autoComplete="name"
//                     maxLength={100}
//                     className={inputClass("fullName")}
//                   />

//                   {errors.fullName && (
//                     <p className="mt-1 text-[13px] text-red-400">
//                       {errors.fullName}
//                     </p>
//                   )}
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className={labelClass}>
//                     Email Address{requiredMark}
//                   </label>

//                   <input
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email"
//                     autoComplete="email"
//                     maxLength={150}
//                     className={inputClass("email")}
//                   />

//                   {errors.email && (
//                     <p className="mt-1 text-[13px] text-red-400">
//                       {errors.email}
//                     </p>
//                   )}
//                 </div>

//                 {/* Company Name */}
//                 <div>
//                   <label className={labelClass}>
//                     Company Name
//                   </label>

//                   <input
//                     type="text"
//                     name="companyName"
//                     value={form.companyName}
//                     onChange={handleChange}
//                     placeholder="Company Name"
//                     autoComplete="organization"
//                     maxLength={150}
//                     className={inputClass("companyName")}
//                   />

//                   {errors.companyName && (
//                     <p className="mt-1 text-[13px] text-red-400">
//                       {errors.companyName}
//                     </p>
//                   )}
//                 </div>

//                 {/* Website */}
//                 <div>
//                   <label className={labelClass}>
//                     Website
//                   </label>

//                   <input
//                     type="text"
//                     name="website"
//                     value={form.website}
//                     onChange={handleChange}
//                     placeholder="www.example.com"
//                     autoComplete="url"
//                     maxLength={200}
//                     className={inputClass("website")}
//                   />

//                   {errors.website && (
//                     <p className="mt-1 text-[13px] text-red-400">
//                       {errors.website}
//                     </p>
//                   )}
//                 </div>

//                 {/* Phone Number */}
//                 <div>
//                   <label className={labelClass}>
//                     Phone Number{requiredMark}
//                   </label>

//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={form.phoneNumber}
//                     onChange={handlePhoneChange}
//                     placeholder="+91 98765 43210"
//                     autoComplete="tel"
//                     inputMode="tel"
//                     maxLength={20}
//                     className={inputClass("phoneNumber")}
//                   />

//                   {errors.phoneNumber && (
//                     <p className="mt-1 text-[13px] text-red-400">
//                       {errors.phoneNumber}
//                     </p>
//                   )}
//                 </div>

//                 {/* Message */}
//                 <div className="sm:col-span-2">
//                   <label className={labelClass}>
//                     Your Message
//                   </label>

//                   <textarea
//                     name="message"
//                     value={form.message}
//                     onChange={handleChange}
//                     placeholder="Write your message..."
//                     rows={3}
//                     maxLength={2000}
//                     className={`w-full resize-y rounded-md border bg-white px-3 py-3 text-[12px] text-[#202938] outline-none transition placeholder:text-[#687386] focus:border-[#E37263] focus:ring-2 focus:ring-[#E37263]/20 ${
//                       errors.message
//                         ? "border-red-500"
//                         : "border-gray-200"
//                     }`}
//                   />

//                   <div className="mt-1 flex justify-end">
//                     <span className="text-[13px] text-white/40">
//                       {form.message.length}/2000
//                     </span>
//                   </div>

//                   {errors.message && (
//                     <p className="mt-1 text-[13px] text-red-400">
//                       {errors.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* API Error */}
//               {submitError && (
//                 <div className="mt-3 flex items-start gap-2 rounded-md border border-red-400/30 bg-red-500/10 p-2.5 text-xs text-red-300">
//                   <AlertCircle
//                     size={15}
//                     className="mt-0.5 shrink-0"
//                   />
//                   {submitError}
//                 </div>
//               )}

//               {/* Actions */}
//               <div className="mt-3 flex flex-wrap items-center gap-3">
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="inline-flex min-w-[105px] items-center justify-center gap-2 rounded-md border border-white/30 bg-[#E37263] px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#d95f51] disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {submitting ? (
//                     <>
//                       <Loader2 size={14} className="animate-spin" />
//                       Submitting
//                     </>
//                   ) : (
//                     "Submit"
//                   )}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={closePopup}
//                   disabled={submitting}
//                   className="rounded-md px-2 py-2 text-xs font-medium text-white/75 transition hover:text-white disabled:opacity-40"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <div className="flex min-h-[260px] flex-col items-center justify-center py-8 text-center">
//             <CheckCircle2
//               size={48}
//               className="mb-4 text-[#70D6A0]"
//             />

//             <h2 className="text-xl font-bold text-white">
//               Thank You!
//             </h2>

//             <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/65">
//               Your inquiry has been submitted successfully.
//               Our team will get back to you soon.
//             </p>

//             <button
//               type="button"
//               onClick={() => {
//                 setSuccess(false);
//                 setIsOpen(false);
//               }}
//               className="mt-6 rounded-md bg-[#E37263] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d95f51]"
//             >
//               Close
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Search,
  Check,
} from "lucide-react";

// =====================================================
// CATEGORY OPTIONS
// =====================================================

const categoryOptions = [
  "Manufacturing Sector",
  "Technology Stream",
  "Service Stream",
];

// =====================================================
// MANUFACTURING SECTOR OPTIONS
// =====================================================

const manufacturingOptions = [
  "Apparel",
  "Automotive",
  "Cement",
  "Chemical",
  "Defence Equipment Production",
  "Electrical",
  "Electronics",
  "Fiber & Textiles",
  "Food & Beverage",
  "Household & Personal Care",
  "Infrastructure Equipment",
  "Life Sciences",
  "Material Handling Equipment",
  "Metals",
  "Mining",
  "Oil & Gas",
  "Packaging Machinery",
  "Plastics",
  "Printing Machinery",
  "Process Equipment",
  "Production Machinery",
  "Pulp & Paper",
  "Railway Equipment",
  "Rubber",
  "Solar Energy Equipment",
  "Textile",
  "Wind Energy Equipment",
  "OTHER (Custom)",
];

// =====================================================
// TECHNOLOGY STREAM OPTIONS
// =====================================================

const technologyOptions = [
  "3D Printing",
  "3D Simulation Software",
  "Advanced Logic Control",
  "Advanced Process Control",
  "Cloud Computing Systems",
  "Condition Monitoring",
  "Digital Twin Software",
  "Edge Computing Systems",
  "Electrical Sensing and Actuation",
  "Electro-Hydraulic Actuation",
  "Electro-Pneumatic Actuation",
  "Industrial IoT Software",
  "Industrial Networking Systems",
  "Intelligent Conveying Systems",
  "Intelligent Packaging Systems",
  "Intrusion Detection",
  "Level, Temp, Pressure, Flow Sensing",
  "Machine Learning Systems",
  "Manufacturing Execution Systems",
  "Material and Presence Sensing",
  "Position and Safety Sensing",
  "Precision Motion Control",
  "Smart HMIs",
  "Tracking and Tracing",
  "Vision Sensing and Inspection",
  "OTHER (Custom)",
];

// =====================================================
// SERVICE STREAM OPTIONS
// =====================================================

const serviceOptions = [
  "Process Reengineering Services",
  "Automation Consulting Services",
  "Digital Deployment Services",
  "Automation Integration Services",
  "Automation Software Development",
  "Business Process App Development",
  "Commissioning Services",
  "Data Integration Services",
  "Education & Skilling Services",
  "Energy Audit Services",
  "Field Installation Services",
  "Maturity Assessment Services",
  "Project Management Services",
  "Quality Audit Services",
  "Safety Assessment Services",
  "Supply Chain Integration",
  "OTHER (Custom)",
];

// Category-wise options mapping
const categoryData = {
  "Manufacturing Sector": manufacturingOptions,
  "Technology Stream": technologyOptions,
  "Service Stream": serviceOptions,
};

// =====================================================
// INITIAL FORM
// =====================================================

const initialForm = {
  category: "Manufacturing Sector",
  selectedOption: "Apparel",
  customOption: "",
  fullName: "",
  email: "",
  companyName: "",
  website: "",
  phoneNumber: "",
  message: "",
};

// =====================================================
// WEBSITE HELPERS
// =====================================================

const normalizeWebsite = (value) => {
  const website = value.trim();

  if (!website) return "";

  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
};

const isValidWebsite = (value) => {
  if (!value.trim()) return true;

  try {
    const url = new URL(normalizeWebsite(value));

    const hostnameRegex =
      /^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/;

    return (
      ["http:", "https:"].includes(url.protocol) &&
      hostnameRegex.test(url.hostname)
    );
  } catch {
    return false;
  }
};

// =====================================================
// REUSABLE SEARCHABLE DROPDOWN
// =====================================================

function SearchableDropdown({
  label,
  name,
  value,
  options = [],
  placeholder = "Select an option",
  error,
  disabled = false,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase().trim()),
  );

  const handleSelect = (option) => {
    onChange(name, option);
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div className="relative min-w-0">
      <label className="mb-1 block text-[13px] font-medium text-[#A9A9A9]">
        {label}
        <span className="text-red-500"> *</span>
      </label>

      {/* Dropdown Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          setIsOpen((prev) => !prev);
          setSearch("");
        }}
        aria-expanded={isOpen}
        className={`flex h-[42px] w-full items-center justify-between gap-2 rounded-md border bg-white px-3 text-left text-[11px] outline-none transition focus:border-[#E37263] focus:ring-2 focus:ring-[#E37263]/20 disabled:cursor-not-allowed disabled:bg-gray-100 ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      >
        <span
          className={`min-w-0 truncate ${
            value ? "text-[#202938]" : "text-[#687386]"
          }`}
        >
          {value || placeholder}
        </span>

        <ChevronDown
          size={14}
          className={`shrink-0 text-[#566174] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <>
          <button
            type="button"
            aria-label="Close dropdown"
            className="fixed inset-0 z-[10000] cursor-default"
            onClick={() => {
              setIsOpen(false);
              setSearch("");
            }}
          />

          <div className="absolute left-0 top-[calc(100%+5px)] z-[10001] w-full min-w-[190px] overflow-hidden rounded-md border border-gray-200 bg-white shadow-[0_12px_35px_rgba(0,0,0,0.25)]">
            {/* Search */}
            <div className="sticky top-0 border-b border-gray-100 bg-white p-2">
              <div className="flex h-8 items-center gap-2 rounded border border-gray-200 px-2 focus-within:border-[#E37263]">
                <Search size={13} className="shrink-0 text-gray-400" />

                <input
                  type="text"
                  autoFocus
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setIsOpen(false);
                      setSearch("");
                    }

                    if (event.key === "Enter" && filteredOptions.length > 0) {
                      event.preventDefault();
                      handleSelect(filteredOptions[0]);
                    }
                  }}
                  placeholder="Type to search..."
                  className="h-full w-full min-w-0 bg-transparent text-[11px] text-[#202938] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-[190px] overflow-y-auto p-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`flex min-h-[32px] w-full items-center justify-between gap-2 rounded px-2.5 py-2 text-left text-[11px] transition hover:bg-[#FCEAE7] hover:text-[#D94F40] ${
                      value === option
                        ? "bg-[#FCEAE7] font-semibold text-[#D94F40]"
                        : "text-[#303846]"
                    }`}
                  >
                    <span>{option}</span>

                    {value === option && (
                      <Check size={13} className="shrink-0 text-[#D94F40]" />
                    )}
                  </button>
                ))
              ) : (
                <p className="px-3 py-5 text-center text-[11px] text-gray-400">
                  No options found
                </p>
              )}
            </div>

            <div className="border-t border-gray-100 px-3 py-1.5 text-[9px] text-gray-400">
              {filteredOptions.length} options available
            </div>
          </div>
        </>
      )}

      {error && <p className="mt-1 text-[13px] text-red-400">{error}</p>}
    </div>
  );
}

// =====================================================
// MAIN GENERAL INQUIRY POPUP
// =====================================================

export default function GeneralInquiryPopup({ onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Show popup after 20 seconds
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 20000);

    return () => window.clearTimeout(timer);
  }, []);

  // Lock background scroll and handle Escape
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape" && !submitting) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, submitting]);

  // Normal input change
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSubmitError("");
  };

  // Dropdown change
  const handleDropdownChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "selectedOption" ? { customOption: "" } : {}),
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      ...(name === "selectedOption" ? { customOption: "" } : {}),
    }));

    setSubmitError("");
  };

  // Phone number input
  const handlePhoneChange = (event) => {
    const value = event.target.value;

    if (!/^[0-9+\s()-]*$/.test(value)) return;

    if ((value.match(/\+/g) || []).length > 1) return;

    if (value.includes("+") && !value.startsWith("+")) return;

    handleChange(event);
  };

  // ===================================================
  // VALIDATION
  // ===================================================

  const validateForm = () => {
    const newErrors = {};

    // Category
    if (!form.category) {
      newErrors.category = "Please select a category.";
    }

    // Selected option
    if (!form.selectedOption) {
      newErrors.selectedOption = "Please select an option.";
    }

    // Custom option validation
    if (form.selectedOption === "OTHER (Custom)" && !form.customOption.trim()) {
      newErrors.customOption = "Please enter your custom option.";
    } else if (
      form.selectedOption === "OTHER (Custom)" &&
      form.customOption.trim().length < 2
    ) {
      newErrors.customOption =
        "Custom option must contain at least 2 characters.";
    }

    // Full name
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = "Name must contain at least 2 characters.";
    } else if (!/^[a-zA-ZÀ-ÿ\s.'-]+$/.test(form.fullName.trim())) {
      newErrors.fullName = "Please enter a valid name.";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Company
    if (!form.companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    } else if (form.companyName.trim().length > 150) {
      newErrors.companyName = "Company name is too long.";
    }

    // Website
    if (!form.website.trim()) {
      newErrors.website = "Website is required.";
    } else if (!isValidWebsite(form.website)) {
      newErrors.website = "Please enter a valid website URL.";
    }

    // Phone
    const phone = form.phoneNumber.trim();
    const normalizedPhone = phone.replace(/[\s()-]/g, "");

    const phoneRegex = /^\+?[1-9]\d{6,14}$/;

    if (!phone) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!phoneRegex.test(normalizedPhone)) {
      newErrors.phoneNumber = "Enter a valid phone number (7–15 digits).";
    }

    // Message
    if (form.message.length > 2000) {
      newErrors.message = "Message cannot exceed 2000 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ===================================================
  // FORM SUBMISSION
  // ===================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitError("");

    if (!validateForm()) return;

    if (typeof onSubmit !== "function") {
      setSubmitError(
        "Inquiry API is not connected. Please contact the administrator.",
      );
      return;
    }

    setSubmitting(true);

    try {
      const normalizedPhone = form.phoneNumber.trim().replace(/[\s()-]/g, "");

      const payload = {
        category: form.category,
        selectedOption: form.selectedOption,
        customOption:
          form.selectedOption === "OTHER (Custom)"
            ? form.customOption.trim()
            : "",
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        companyName: form.companyName.trim(),
        website: normalizeWebsite(form.website),
        phoneNumber: normalizedPhone,
        message: form.message.trim(),
      };

      await onSubmit(payload);

      setSuccess(true);
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Inquiry submission error:", error);

      setSubmitError(
        error?.message || "Unable to submit your inquiry. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ===================================================
  // CLOSE POPUP
  // ===================================================

  const closePopup = () => {
    if (submitting) return;
    setIsOpen(false);
  };

  // ===================================================
  // INPUT STYLES
  // ===================================================

  const inputClass = (field) =>
    `h-[42px] w-full min-w-0 rounded-md border bg-white px-3 text-[12px] text-[#202938] outline-none transition placeholder:text-[#687386] focus:border-[#E37263] focus:ring-2 focus:ring-[#E37263]/20 ${
      errors[field] ? "border-red-500" : "border-gray-200"
    }`;

  const labelClass = "mb-1 block text-[13px] font-medium text-[#A9A9A9]";

  const requiredMark = <span className="text-red-500"> *</span>;

  if (!isOpen) return null;

  // ===================================================
  // UI
  // ===================================================

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/75 px-3 py-5 backdrop-blur-[5px] sm:px-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closePopup();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
        className="relative my-auto w-full max-w-[535px] overflow-visible rounded-lg border border-white/15 bg-gradient-to-br from-[#252525] to-[#191919] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:p-5 md:p-6"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closePopup}
          disabled={submitting}
          aria-label="Close inquiry form"
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
        >
          <X size={17} />
        </button>

        {!success ? (
          <>
            {/* Heading */}
            <div className="mb-4 pr-7">
              <h2
                id="inquiry-title"
                className="text-lg font-bold tracking-tight text-white sm:text-xl"
              >
                General Inquiry
              </h2>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* =====================================
                  TWO DEPENDENT SEARCHABLE DROPDOWNS
              ====================================== */}

              <div className="mb-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                {/* First Dropdown: Category */}
                <SearchableDropdown
                  label="Select Category"
                  name="category"
                  value={form.category}
                  options={categoryOptions}
                  placeholder="Select Category"
                  error={errors.category}
                  onChange={(name, value) => {
                    setForm((prev) => ({
                      ...prev,
                      category: value,
                      selectedOption: "",
                      customOption: "",
                    }));

                    setErrors((prev) => ({
                      ...prev,
                      category: "",
                      selectedOption: "",
                      customOption: "",
                    }));

                    setSubmitError("");
                  }}
                />

                {/* Second Dropdown: Category Based Options */}
                <SearchableDropdown
                  label="Select Option"
                  name="selectedOption"
                  value={form.selectedOption}
                  options={categoryData[form.category] || []}
                  placeholder={
                    form.category ? "Select Option" : "Select category first"
                  }
                  error={errors.selectedOption}
                  disabled={!form.category}
                  onChange={handleDropdownChange}
                />

                {form.selectedOption === "OTHER (Custom)" && (
                  <div className="mt-2 sm:col-span-2">
                    <label className={labelClass}>
                      Enter Custom Option
                      {requiredMark}
                    </label>

                    <input
                      type="text"
                      name="customOption"
                      value={form.customOption}
                      onChange={handleChange}
                      placeholder="Please specify your industry, technology or service"
                      maxLength={150}
                      autoComplete="off"
                      className={inputClass("customOption")}
                    />

                    {errors.customOption && (
                      <p className="mt-1 text-[13px] text-red-400">
                        {errors.customOption}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* =====================================
                  FULL NAME + EMAIL
              ====================================== */}

              <div className="mb-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Full Name{requiredMark}</label>

                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    autoComplete="name"
                    maxLength={100}
                    className={inputClass("fullName")}
                  />

                  {errors.fullName && (
                    <p className="mt-1 text-[13px] text-red-400">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>
                    Email Address{requiredMark}
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    maxLength={150}
                    className={inputClass("email")}
                  />

                  {errors.email && (
                    <p className="mt-1 text-[13px] text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* =====================================
                  COMPANY + WEBSITE + PHONE
              ====================================== */}

              <div className="mb-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>
                    Company Name{requiredMark}
                  </label>

                  <input
                    type="text"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    autoComplete="organization"
                    maxLength={150}
                    className={inputClass("companyName")}
                  />

                  {errors.companyName && (
                    <p className="mt-1 text-[13px] text-red-400">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Website{requiredMark}</label>

                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="www.example.com"
                    autoComplete="url"
                    maxLength={200}
                    className={inputClass("website")}
                  />

                  {errors.website && (
                    <p className="mt-1 text-[13px] text-red-400">
                      {errors.website}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>
                    Phone Number{requiredMark}
                  </label>

                  <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={20}
                    className={inputClass("phoneNumber")}
                  />

                  {errors.phoneNumber && (
                    <p className="mt-1 text-[13px] text-red-400">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* =====================================
                  MESSAGE
              ====================================== */}

              <div>
                <label className={labelClass}>Your Message</label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows={3}
                  maxLength={2000}
                  className={`w-full resize-y rounded-md border bg-white px-3 py-3 text-[12px] text-[#202938] outline-none transition placeholder:text-[#687386] focus:border-[#E37263] focus:ring-2 focus:ring-[#E37263]/20 ${
                    errors.message ? "border-red-500" : "border-gray-200"
                  }`}
                />

                <div className="mt-1 flex justify-end">
                  <span className="text-[13px] text-white/40">
                    {form.message.length}/2000
                  </span>
                </div>

                {errors.message && (
                  <p className="mt-1 text-[13px] text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* API ERROR */}
              {submitError && (
                <div className="mt-3 flex items-start gap-2 rounded-md border border-red-400/30 bg-red-500/10 p-2.5 text-xs text-red-300">
                  <AlertCircle size={15} className="mt-0.5 shrink-0" />
                  {submitError}
                </div>
              )}

              {/* =====================================
                  ACTION BUTTONS
              ====================================== */}

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-w-[105px] items-center justify-center gap-2 rounded-md border border-white/30 bg-[#E37263] px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#d95f51] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Submitting
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>

                <button
                  type="button"
                  onClick={closePopup}
                  disabled={submitting}
                  className="rounded-md px-2 py-2 text-xs font-medium text-white/75 transition hover:text-white disabled:opacity-40"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          // =========================================
          // SUCCESS SCREEN
          // =========================================

          <div className="flex min-h-[260px] flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 size={48} className="mb-4 text-[#70D6A0]" />

            <h2 className="text-xl font-bold text-white">Thank You!</h2>

            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/65">
              Your inquiry has been submitted successfully. Our team will get
              back to you soon.
            </p>

            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                setIsOpen(false);
              }}
              className="mt-6 rounded-md bg-[#E37263] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d95f51]"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
