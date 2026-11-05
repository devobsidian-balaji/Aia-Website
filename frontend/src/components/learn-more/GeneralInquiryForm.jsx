
import React, { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

const initialValues = {
  areaOfInquiry: "",
  fullName: "",
  email: "",
  companyName: "",
  website: "",
  phone: "",
  message: "",
};

const inputClass =
  "h-10 w-full rounded-md border border-[#F2B9B1] bg-white px-3 text-[13px] text-[#000] outline-none transition placeholder:text-gray-500 focus:border-[#E87565] focus:ring-2 focus:ring-[#E87565]/10 font-semibold";

export default function GeneralInquiryForm({
  onSubmit,
  apiUrl,
  logo = "/aia-logo-blue.png",
}) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (status !== "idle") setStatus("idle");
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.areaOfInquiry) {
      nextErrors.areaOfInquiry = "Please select an inquiry area.";
    }

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!/^[+]?[0-9\s()-]{7,15}$/.test(formData.phone)) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Please enter your message.";
    }

    if (
      formData.website.trim() &&
      !/^https?:\/\/.+\..+/.test(formData.website)
    ) {
      nextErrors.website = "Enter a valid website URL.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("loading");

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else if (apiUrl) {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(result.message || "Unable to submit inquiry.");
        }
      } else {
        throw new Error("Inquiry API is not configured yet.");
      }

      setStatus("success");
      setFormData(initialValues);
      setErrors({});
    } catch (error) {
      console.error("Inquiry submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="enquiry-form" className="relative overflow-hidden bg-[#244665] px-4 py-10 sm:px-8 sm:py-16 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#244665] via-transparent to-[#3B6389]" />

      <div className="relative mx-auto max-w-[1200px]">

        {/* Divider */}
        <div className="mb-6 border-t border-dotted border-white/40" />

        <div className="grid grid-cols-1 items-center gap-7 rounded-md bg-white p-5 shadow-xl sm:p-7 lg:grid-cols-[0.65fr_1.35fr] lg:gap-10 lg:p-10">

          {/* Logo */}
          <div className="flex items-center justify-center">
            <img
              src={logo}
              alt="Automation Industry Association"
              loading="lazy"
              decoding="async"
              className="h-auto max-h-[180px] w-[190px] object-contain sm:w-[220px]"
            />
          </div>

          {/* Form */}
          <div className="min-w-0">
            <h2 className="mb-5 text-left text-xl font-bold text-[#263247]">
              General Inquiry
            </h2>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center rounded-md bg-green-50 px-5 py-10 text-center">
                <CheckCircle2 size={36} className="text-green-600" />

                <h3 className="mt-3 font-bold text-[#263247]">
                  Inquiry Submitted!
                </h3>

                <p className="mt-2 text-xs text-black">
                  Thank you for contacting AIA. Our team will get back to you.
                </p>

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-5 text-xs font-semibold text-[#E87565] underline"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                  {/* Area of Inquiry */}
                  <div>
                    <select
                      name="areaOfInquiry"
                      value={formData.areaOfInquiry}
                      onChange={handleChange}
                      className={inputClass}
                      aria-label="Area of Inquiry"
                    >
                      <option value="">Area of Inquiry *</option>
                      <option value="Membership">Membership</option>
                      <option value="Automation Products & Services">
                        Automation Products & Services
                      </option>
                      <option value="Partnership">Partnership</option>
                      <option value="Events">Events</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>

                    {errors.areaOfInquiry && (
                      <ErrorText>{errors.areaOfInquiry}</ErrorText>
                    )}
                  </div>

                  {/* Full Name */}
                  <div>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name *"
                      className={inputClass}
                    />

                    {errors.fullName && (
                      <ErrorText>{errors.fullName}</ErrorText>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      className={inputClass}
                    />

                    {errors.email && (
                      <ErrorText>{errors.email}</ErrorText>
                    )}
                  </div>

                  {/* Company */}
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name (Optional)"
                    className={inputClass}
                  />

                  {/* Website */}
                  <div>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="Website (Optional)"
                      className={inputClass}
                    />

                    {errors.website && (
                      <ErrorText>{errors.website}</ErrorText>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      className={inputClass}
                    />

                    {errors.phone && (
                      <ErrorText>{errors.phone}</ErrorText>
                    )}
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message *"
                      rows={3}
                      className="w-full resize-y rounded-md border border-[#F2B9B1] bg-white px-3 py-3 text-[13px] text-[#000] outline-none transition placeholder:text-gray-500 focus:border-[#E87565] focus:ring-2 focus:ring-[#E87565]/10 font-semibold"
                    />

                    {errors.message && (
                      <ErrorText>{errors.message}</ErrorText>
                    )}
                  </div>
                </div>

                {status === "error" && (
                  <p className="mt-3 flex items-center gap-2 text-xs text-red-600">
                    <AlertCircle size={14} />
                    Something went wrong. Please try again.
                  </p>
                )}

                {/* Actions */}
                <div className="mt-4 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="min-w-[100px] rounded-md bg-gradient-to-r from-[#D92D20] to-[#F27D70] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
                  >
                    {status === "loading" ? "Submitting..." : "Submit"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData(initialValues);
                      setErrors({});
                      setStatus("idle");
                    }}
                    className="text-[13px] font-medium text-[#263247] hover:text-[#E87565]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ErrorText({ children }) {
  return (
    <p className="mt-1 text-[10px] text-red-500" role="alert">
      {children}
    </p>
  );
}
