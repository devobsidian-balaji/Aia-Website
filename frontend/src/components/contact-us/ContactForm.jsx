
import React, { useState } from "react";
import { LoaderCircle, ArrowUpRight } from "lucide-react";

const initialForm = {
  fullName: "",
  email: "",
  inquiry: "",
  companyName: "",
  website: "",
  phone: "",
  message: "",
};

const inquiryOptions = [
  "General Inquiry",
  "Membership",
  "Partnership",
  "Training & Certification",
  "Events & Programs",
  "Industry Collaboration",
  "Other",
];

export default function ContactForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    } else if (form.fullName.trim().length < 2) {
      newErrors.fullName = "Name must contain at least 2 characters.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.inquiry) {
      newErrors.inquiry = "Please select an area of inquiry.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (
      !/^\+?[0-9\s()-]{10,18}$/.test(form.phone.trim()) ||
      form.phone.replace(/\D/g, "").length < 10
    ) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (form.website.trim()) {
      try {
        const url = new URL(
          /^https?:\/\//i.test(form.website)
            ? form.website
            : `https://${form.website}`
        );

        if (!url.hostname.includes(".")) {
          newErrors.website = "Please enter a valid website URL.";
        }
      } catch {
        newErrors.website = "Please enter a valid website URL.";
      }
    }

    if (!form.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must contain at least 10 characters.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      submit: "",
    }));

    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setSuccessMessage("");

    if (Object.keys(validationErrors).length > 0) {
      const firstError = document.querySelector(
        `[name="${Object.keys(validationErrors)[0]}"]`
      );
      firstError?.focus();
      return;
    }

    if (typeof onSubmit !== "function") {
      setErrors({
        submit: "Form submission API is not connected yet.",
      });
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        ...form,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        website: form.website.trim()
          ? /^https?:\/\//i.test(form.website)
            ? form.website.trim()
            : `https://${form.website.trim()}`
          : "",
        phone: form.phone.trim(),
        message: form.message.trim(),
      };

      await onSubmit(payload);

      setForm(initialForm);
      setErrors({});
      setSuccessMessage(
        "Thank you! Your enquiry has been submitted successfully."
      );
    } catch (error) {
      setErrors({
        submit:
          error?.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `h-[42px] w-full rounded-md border bg-white px-3 text-[12px] text-[#252D3A] outline-none transition-all placeholder:text-gray-400 focus:border-[#E66F61] focus:ring-2 focus:ring-[#E66F61]/10 ${
      errors[field] ? "border-red-400" : "border-[#DDE1E7]"
    }`;

  const labelClass = "mb-1.5 block text-[11px] font-semibold text-[#263142]";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-3">

        {/* Full Name */}
        <div>
          <label className={labelClass} htmlFor="fullName">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Type"
            value={form.fullName}
            onChange={handleChange}
            className={inputClass("fullName")}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p className="mt-1 text-[11px] text-red-500">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className={labelClass} htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Area of Inquiry */}
        <div>
          <label className={labelClass} htmlFor="inquiry">
            Area of Inquiry <span className="text-red-500">*</span>
          </label>
          <select
            id="inquiry"
            name="inquiry"
            value={form.inquiry}
            onChange={handleChange}
            className={`${inputClass("inquiry")} appearance-none`}
            aria-invalid={!!errors.inquiry}
          >
            <option value="">Select</option>
            {inquiryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.inquiry && (
            <p className="mt-1 text-[11px] text-red-500">{errors.inquiry}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className={labelClass} htmlFor="companyName">
            Company Name
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            autoComplete="organization"
            placeholder="Type"
            value={form.companyName}
            onChange={handleChange}
            className={inputClass("companyName")}
          />
        </div>

        {/* Website */}
        <div>
          <label className={labelClass} htmlFor="website">
            Website
          </label>
          <input
            id="website"
            name="website"
            type="text"
            inputMode="url"
            placeholder="www.company.com"
            value={form.website}
            onChange={handleChange}
            className={inputClass("website")}
            aria-invalid={!!errors.website}
          />
          {errors.website && (
            <p className="mt-1 text-[11px] text-red-500">{errors.website}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={handleChange}
            className={inputClass("phone")}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="mt-1 text-[11px] text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="mt-5">
        <label className={labelClass} htmlFor="message">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Leave us a message..."
          value={form.message}
          onChange={handleChange}
          className={`w-full resize-y rounded-md border bg-white px-3 py-3 text-[12px] text-[#252D3A] outline-none transition-all placeholder:text-gray-400 focus:border-[#E66F61] focus:ring-2 focus:ring-[#E66F61]/10 ${
            errors.message ? "border-red-400" : "border-[#DDE1E7]"
          }`}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="mt-1 text-[11px] text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Feedback */}
      {(successMessage || errors.submit) && (
        <div
          role="status"
          className={`mt-4 rounded-md px-4 py-3 text-sm ${
            errors.submit
              ? "bg-red-50 text-red-600"
              : "bg-green-50 text-green-700"
          }`}
        >
          {errors.submit || successMessage}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="mt-5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[#E87565] px-6 py-3 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#D95F50] disabled:cursor-not-allowed disabled:opacity-70 sm:w-[200px]"
      >
        {submitting ? (
          <>
            <LoaderCircle size={15} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Submit
            <ArrowUpRight size={15} />
          </>
        )}
      </button>
    </form>
  );
}
