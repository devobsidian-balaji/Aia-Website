import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const initialValues = {
  fullName: "",
  companyName: "",
  website: "",
  email: "",
  countryCode: "+91",
  phone: "",
  businessHelp: "",
};

export default function MembershipRegistrationForm() {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    if (!form.companyName.trim()) {
      nextErrors.companyName = "Company name is required";
    }

    if (!form.website.trim()) {
      nextErrors.website = "Website is required";
    } else if (
      !/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i.test(form.website)
    ) {
      nextErrors.website = "Enter a valid website";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email";
    }

    if (
      form.phone &&
      !/^\d{7,15}$/.test(form.phone.replace(/\s/g, ""))
    ) {
      nextErrors.phone = "Enter a valid phone number";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = {
      ...form,
      phone: form.phone
        ? `${form.countryCode} ${form.phone}`
        : "",
    };

    // Replace this with your backend API request.
    console.log("Membership registration:", payload);

    setSubmitted(true);
    setForm(initialValues);
  };

  const inputClass =
    "h-[45px] w-full rounded-lg border border-[#F5D8D4] bg-white px-4 text-[13px] text-[#263247] outline-none transition placeholder:text-[#263247] focus:border-[#F16B5D] focus:bg-[#FFF9F8]";

  const ErrorMessage = ({ name }) =>
    errors[name] ? (
      <p className="mt-1 text-[10px] text-red-500">{errors[name]}</p>
    ) : null;

  if (submitted) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-[#F16B5D] bg-white p-6 text-center">
        <h3 className="text-xl font-bold text-[#263247]">
          Thank you for your interest!
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Your details have been validated successfully.
        </p>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm font-semibold text-[#E87565]"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-[#F16B5D] bg-white p-4 shadow-[0_10px_35px_rgba(231,111,98,0.08)] sm:p-5">
      <h3 className="mb-5 text-lg font-bold text-[#F16B5D] sm:text-xl">
        Registration form
      </h3>

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name + Company Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name *"
              className={inputClass}
            />
            <ErrorMessage name="fullName" />
          </div>

          <div>
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Company Name *"
              className={inputClass}
            />
            <ErrorMessage name="companyName" />
          </div>
        </div>

        {/* Website + Email */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <input
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="Website *"
              className={inputClass}
            />
            <ErrorMessage name="website" />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address *"
              className={inputClass}
            />
            <ErrorMessage name="email" />
          </div>
        </div>

        {/* Country Code + Phone */}
        <div className="relative mt-4 flex h-[45px] items-center overflow-hidden rounded-lg border border-[#F5D8D4] bg-white focus-within:border-[#F16B5D]">
          <div className="relative flex h-full shrink-0 items-center">
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              aria-label="Country code"
              className="h-full w-[65px] appearance-none bg-transparent pl-3 pr-5 text-xs outline-none"
            >
              <option value="+91">Ind</option>
              <option value="+1">USA</option>
              <option value="+44">UK</option>
              <option value="+971">UAE</option>
              <option value="+61">AUS</option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-1 text-gray-400"
            />
          </div>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="h-full min-w-0 flex-1 bg-transparent px-3 text-[13px] outline-none placeholder:text-[#263247]"
          />
        </div>
        <ErrorMessage name="phone" />

        {/* Business Help */}
        <textarea
          name="businessHelp"
          value={form.businessHelp}
          onChange={handleChange}
          rows={4}
          placeholder="How do you think AIA membership will help your business?"
          className="mt-5 min-h-[105px] w-full resize-y rounded-lg border border-[#F5D8D4] px-3 py-3 text-[13px] outline-none placeholder:text-[#263247] focus:border-[#F16B5D] focus:bg-[#FFF9F8]"
        />

        {/* Submit */}
        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-gradient-to-r from-[#D92716] via-[#E83D2B] to-[#F17C6D] py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          Submit
        </button>
      </form>
    </div>
  );
}