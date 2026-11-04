
import React, { useEffect, useState } from "react";
import {
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const initialForm = {
  ecosystem: "Manufacturing Sector",
  manufacturingSector: "Cement",
  fullName: "",
  email: "",
  companyName: "",
  website: "",
  phoneNumber: "",
  message: "",
};

const ecosystemOptions = [
  "Manufacturing Sector",
  "Automotive Ecosystem",
  "Technology Providers",
  "System Integrators",
  "Manufacturers & Automation Users",
];

const manufacturingOptions = [
  "Cement",
  "Automotive",
  "Steel",
  "Textile",
  "Pharmaceuticals",
  "Food Processing",
  "Electronics",
  "Other",
];

// Normalize website URL
const normalizeWebsite = (value) => {
  const website = value.trim();

  if (!website) return "";

  return /^https?:\/\//i.test(website)
    ? website
    : `https://${website}`;
};

// Validate website URL
const isValidWebsite = (value) => {
  if (!value.trim()) return true;

  try {
    const url = new URL(normalizeWebsite(value));

    const hostname = url.hostname;

    const hostnameRegex =
      /^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/;

    return (
      ["http:", "https:"].includes(url.protocol) &&
      hostnameRegex.test(hostname)
    );
  } catch {
    return false;
  }
};

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

  // Handle input changes
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

  // Phone number input
  const handlePhoneChange = (event) => {
    const value = event.target.value;

    // Only digits, +, spaces, brackets and hyphens
    if (!/^[0-9+\s()-]*$/.test(value)) return;

    // Plus sign only once and at the beginning
    if ((value.match(/\+/g) || []).length > 1) return;

    if (value.includes("+") && !value.startsWith("+")) return;

    handleChange(event);
  };

  // Complete form validation
  const validateForm = () => {
    const newErrors = {};

    // Ecosystem
    if (!form.ecosystem) {
      newErrors.ecosystem = "Please select an ecosystem.";
    }

    // Manufacturing sector
    if (!form.manufacturingSector) {
      newErrors.manufacturingSector = "Please select a sector.";
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

    // Company name
    if (form.companyName.trim().length > 150) {
      newErrors.companyName = "Company name is too long.";
    }

    // Website validation
    if (form.website.trim() && !isValidWebsite(form.website)) {
      newErrors.website = "Please enter a valid website URL.";
    }

    // Phone number validation
    const phone = form.phoneNumber.trim();
    const normalizedPhone = phone.replace(/[\s()-]/g, "");

    const phoneRegex = /^\+?[1-9]\d{6,14}$/;

    if (!phone) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!phoneRegex.test(normalizedPhone)) {
      newErrors.phoneNumber =
        "Enter a valid phone number (7–15 digits).";
    }

    // Message
    if (form.message.length > 2000) {
      newErrors.message = "Message cannot exceed 2000 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitError("");

    if (!validateForm()) return;

    if (typeof onSubmit !== "function") {
      setSubmitError(
        "Inquiry API is not connected. Please contact the administrator."
      );
      return;
    }

    setSubmitting(true);

    try {
      const normalizedPhone = form.phoneNumber
        .trim()
        .replace(/[\s()-]/g, "");

      const payload = {
        ecosystem: form.ecosystem,
        manufacturingSector: form.manufacturingSector,
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        companyName: form.companyName.trim(),
        website: normalizeWebsite(form.website),
        phoneNumber: normalizedPhone,
        message: form.message.trim(),
      };

      const result = await onSubmit(payload);

      setSuccess(true);
      setForm(initialForm);
      setErrors({});

      return result;
    } catch (error) {
      console.error("Inquiry submission error:", error);

      setSubmitError(
        error?.message ||
          "Unable to submit your inquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Close popup
  const closePopup = () => {
    if (submitting) return;

    setIsOpen(false);
  };

  // Input styles
  const inputClass = (field) =>
    `h-[42px] w-full min-w-0 rounded-md border bg-white px-3 text-[12px] text-[#202938] outline-none transition placeholder:text-[#687386] focus:border-[#E37263] focus:ring-2 focus:ring-[#E37263]/20 ${
      errors[field] ? "border-red-500" : "border-gray-200"
    }`;

  const labelClass =
    "mb-1 block text-[10px] font-medium text-[#A9A9A9]";

  const requiredMark = <span className="text-red-500"> *</span>;

  if (!isOpen) return null;

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
        className="relative my-auto w-full max-w-[535px] overflow-hidden rounded-lg border border-white/15 bg-gradient-to-br from-[#252525] to-[#191919] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:p-5 md:p-6"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closePopup}
          disabled={submitting}
          aria-label="Close inquiry form"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
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
              <div className="grid grid-cols-1 gap-x-3 gap-y-2.5 sm:grid-cols-2">

                {/* Automotive Ecosystem */}
                <div>
                  <label className={labelClass}>
                    Automotive Ecosystem
                  </label>

                  <select
                    name="ecosystem"
                    value={form.ecosystem}
                    onChange={handleChange}
                    className={inputClass("ecosystem")}
                  >
                    {ecosystemOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  {errors.ecosystem && (
                    <p className="mt-1 text-[10px] text-red-400">
                      {errors.ecosystem}
                    </p>
                  )}
                </div>

                {/* Manufacturing Sector */}
                <div>
                  <label className={labelClass}>
                    Manufacturing Sector
                  </label>

                  <select
                    name="manufacturingSector"
                    value={form.manufacturingSector}
                    onChange={handleChange}
                    className={inputClass("manufacturingSector")}
                  >
                    {manufacturingOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  {errors.manufacturingSector && (
                    <p className="mt-1 text-[10px] text-red-400">
                      {errors.manufacturingSector}
                    </p>
                  )}
                </div>

                {/* Full Name */}
                <div>
                  <label className={labelClass}>
                    Full Name{requiredMark}
                  </label>

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
                    <p className="mt-1 text-[10px] text-red-400">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
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
                    <p className="mt-1 text-[10px] text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label className={labelClass}>
                    Company Name
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
                    <p className="mt-1 text-[10px] text-red-400">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                {/* Website */}
                <div>
                  <label className={labelClass}>
                    Website
                  </label>

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
                    <p className="mt-1 text-[10px] text-red-400">
                      {errors.website}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
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
                    <p className="mt-1 text-[10px] text-red-400">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Your Message
                  </label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    rows={3}
                    maxLength={2000}
                    className={`w-full resize-y rounded-md border bg-white px-3 py-3 text-[12px] text-[#202938] outline-none transition placeholder:text-[#687386] focus:border-[#E37263] focus:ring-2 focus:ring-[#E37263]/20 ${
                      errors.message
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  />

                  <div className="mt-1 flex justify-end">
                    <span className="text-[10px] text-white/40">
                      {form.message.length}/2000
                    </span>
                  </div>

                  {errors.message && (
                    <p className="mt-1 text-[10px] text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {/* API Error */}
              {submitError && (
                <div className="mt-3 flex items-start gap-2 rounded-md border border-red-400/30 bg-red-500/10 p-2.5 text-xs text-red-300">
                  <AlertCircle
                    size={15}
                    className="mt-0.5 shrink-0"
                  />
                  {submitError}
                </div>
              )}

              {/* Actions */}
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
          <div className="flex min-h-[260px] flex-col items-center justify-center py-8 text-center">
            <CheckCircle2
              size={48}
              className="mb-4 text-[#70D6A0]"
            />

            <h2 className="text-xl font-bold text-white">
              Thank You!
            </h2>

            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/65">
              Your inquiry has been submitted successfully.
              Our team will get back to you soon.
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
