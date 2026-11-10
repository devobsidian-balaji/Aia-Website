// import React, { useState } from "react";
// import { ChevronDown } from "lucide-react";

// const initialValues = {
//   fullName: "",
//   companyName: "",
//   website: "",
//   email: "",
//   countryCode: "+91",
//   phone: "",
//   businessHelp: "",
// };

// export default function MembershipRegistrationForm() {
//   const [form, setForm] = useState(initialValues);
//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const validate = () => {
//     const nextErrors = {};

//     if (!form.fullName.trim()) {
//       nextErrors.fullName = "Full name is required";
//     }

//     if (!form.companyName.trim()) {
//       nextErrors.companyName = "Company name is required";
//     }

//     if (!form.website.trim()) {
//       nextErrors.website = "Website is required";
//     } else if (
//       !/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i.test(form.website)
//     ) {
//       nextErrors.website = "Enter a valid website";
//     }

//     if (!form.email.trim()) {
//       nextErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       nextErrors.email = "Enter a valid email";
//     }

//     if (
//       form.phone &&
//       !/^\d{7,15}$/.test(form.phone.replace(/\s/g, ""))
//     ) {
//       nextErrors.phone = "Enter a valid phone number";
//     }

//     setErrors(nextErrors);
//     return Object.keys(nextErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     const payload = {
//       ...form,
//       phone: form.phone
//         ? `${form.countryCode} ${form.phone}`
//         : "",
//     };

//     // Replace this with your backend API request.
//     console.log("Membership registration:", payload);

//     setSubmitted(true);
//     setForm(initialValues);
//   };

//   const inputClass =
//     "h-[45px] w-full rounded-lg border border-[#F5D8D4] bg-white px-4 text-[13px] text-[#263247] outline-none transition placeholder:text-[#263247] focus:border-[#F16B5D] focus:bg-[#FFF9F8]";

//   const ErrorMessage = ({ name }) =>
//     errors[name] ? (
//       <p className="mt-1 text-[10px] text-red-500">{errors[name]}</p>
//     ) : null;

//   if (submitted) {
//     return (
//       <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-[#F16B5D] bg-white p-6 text-center">
//         <h3 className="text-xl font-bold text-[#263247]">
//           Thank you for your interest!
//         </h3>

//         <p className="mt-2 text-sm text-gray-500">
//           Your details have been validated successfully.
//         </p>

//         <button
//           type="button"
//           onClick={() => setSubmitted(false)}
//           className="mt-5 text-sm font-semibold text-[#E87565]"
//         >
//           Submit another response
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full rounded-xl border border-[#F16B5D] bg-white p-4 shadow-[0_10px_35px_rgba(231,111,98,0.08)] sm:p-5">
//       <h3 className="mb-5 text-lg font-bold text-[#F16B5D] sm:text-xl">
//         Registration form
//       </h3>

//       <form onSubmit={handleSubmit} noValidate>
//         {/* Full Name + Company Name */}
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div>
//             <input
//               name="fullName"
//               value={form.fullName}
//               onChange={handleChange}
//               placeholder="Full Name *"
//               className={inputClass}
//             />
//             <ErrorMessage name="fullName" />
//           </div>

//           <div>
//             <input
//               name="companyName"
//               value={form.companyName}
//               onChange={handleChange}
//               placeholder="Company Name *"
//               className={inputClass}
//             />
//             <ErrorMessage name="companyName" />
//           </div>
//         </div>

//         {/* Website + Email */}
//         <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div>
//             <input
//               name="website"
//               value={form.website}
//               onChange={handleChange}
//               placeholder="Website *"
//               className={inputClass}
//             />
//             <ErrorMessage name="website" />
//           </div>

//           <div>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Email Address *"
//               className={inputClass}
//             />
//             <ErrorMessage name="email" />
//           </div>
//         </div>

//         {/* Country Code + Phone */}
//         <div className="relative mt-4 flex h-[45px] items-center overflow-hidden rounded-lg border border-[#F5D8D4] bg-white focus-within:border-[#F16B5D]">
//           <div className="relative flex h-full shrink-0 items-center">
//             <select
//               name="countryCode"
//               value={form.countryCode}
//               onChange={handleChange}
//               aria-label="Country code"
//               className="h-full w-[65px] appearance-none bg-transparent pl-3 pr-5 text-xs outline-none"
//             >
//               <option value="+91">Ind</option>
//               <option value="+1">USA</option>
//               <option value="+44">UK</option>
//               <option value="+971">UAE</option>
//               <option value="+61">AUS</option>
//             </select>

//             <ChevronDown
//               size={14}
//               className="pointer-events-none absolute right-1 text-gray-400"
//             />
//           </div>

//           <input
//             type="tel"
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             placeholder="Phone Number"
//             className="h-full min-w-0 flex-1 bg-transparent px-3 text-[13px] outline-none placeholder:text-[#263247]"
//           />
//         </div>
//         <ErrorMessage name="phone" />

//         {/* Business Help */}
//         <textarea
//           name="businessHelp"
//           value={form.businessHelp}
//           onChange={handleChange}
//           rows={4}
//           placeholder="How do you think AIA membership will help your business?"
//           className="mt-5 min-h-[105px] w-full resize-y rounded-lg border border-[#F5D8D4] px-3 py-3 text-[13px] outline-none placeholder:text-[#263247] focus:border-[#F16B5D] focus:bg-[#FFF9F8]"
//         />

//         {/* Submit */}
//         <button
//           type="submit"
//           className="mt-5 w-full rounded-lg bg-gradient-to-r from-[#D92716] via-[#E83D2B] to-[#F17C6D] py-3 text-sm font-semibold text-white transition hover:brightness-95"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }



import React, { useMemo, useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js/max";
import { ChevronDown, Loader2 } from "lucide-react";

const initialForm = {
  fullName: "",
  companyName: "",
  website: "",
  email: "",
  businessHelp: "",
};

const getCountryName = (countryCode) => {
  const displayNames = new Intl.DisplayNames(["en"], {
    type: "region",
  });

  return displayNames.of(countryCode) || countryCode;
};

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
};

const validateWebsite = (website) => {
  try {
    const url = new URL(
      website.startsWith("http://") || website.startsWith("https://")
        ? website
        : `https://${website}`
    );

    return (
      ["http:", "https:"].includes(url.protocol) &&
      url.hostname.includes(".") &&
      !url.hostname.startsWith(".") &&
      !url.hostname.endsWith(".")
    );
  } catch {
    return false;
  }
};

const validateName = (name) => {
  return (
    /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(name.trim()) &&
    name.trim().length >= 2 &&
    name.trim().length <= 80
  );
};

export default function MembershipRegistrationForm({
  onSubmit,
}) {
  const [form, setForm] = useState(initialForm);
  const [country, setCountry] = useState("IN");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Generate complete country list from phone library metadata.
  const countries = useMemo(() => {
    return getCountries()
      .map((code) => ({
        code,
        name: getCountryName(code),
        dialCode: `+${getCountryCallingCode(code)}`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const updateField = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSubmitMessage("");
  };

  const handleCountryChange = (value) => {
    setCountry(value);
    setPhone("");

    setErrors((prev) => ({
      ...prev,
      phone: "",
    }));

    setSubmitMessage("");
  };

  const handlePhoneChange = (value) => {
    // Keep digits only. Country calling code is displayed separately.
    const cleanedValue = value.replace(/\D/g, "");

    setPhone(cleanedValue);

    setErrors((prev) => ({
      ...prev,
      phone: "",
    }));

    setSubmitMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (!validateName(form.fullName)) {
      newErrors.fullName =
        "Enter a valid name (2–80 characters).";
    }

    // Company Name
    if (!form.companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    } else if (
      form.companyName.trim().length < 2 ||
      form.companyName.trim().length > 100
    ) {
      newErrors.companyName =
        "Company name must be between 2 and 100 characters.";
    }

    // Website
    if (!form.website.trim()) {
      newErrors.website = "Website is required.";
    } else if (!validateWebsite(form.website.trim())) {
      newErrors.website = "Enter a valid website URL.";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      form.email.length > 254 ||
      !validateEmail(form.email.trim())
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    // Country
    if (!country || !countries.some((item) => item.code === country)) {
      newErrors.phone = "Please select a valid country.";
    } else if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else {
      const parsedPhone = parsePhoneNumberFromString(
        phone,
        country
      );

      if (
        !parsedPhone ||
        parsedPhone.country !== country ||
        !parsedPhone.isValid()
      ) {
        newErrors.phone =
          "Enter a valid phone number for the selected country.";
      }
    }

    // Business Help
    if (!form.businessHelp.trim()) {
      newErrors.businessHelp =
        "Please tell us how we can help your business.";
    } else if (form.businessHelp.trim().length < 10) {
      newErrors.businessHelp =
        "Please enter at least 10 characters.";
    } else if (form.businessHelp.trim().length > 1000) {
      newErrors.businessHelp =
        "Maximum 1000 characters allowed.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage("");

    if (!validateForm()) {
      return;
    }

    const parsedPhone = parsePhoneNumberFromString(
      phone,
      country
    );

    // Send phone in E.164 international format.
    const payload = {
      fullName: form.fullName.trim(),
      companyName: form.companyName.trim(),
      website: form.website.trim().startsWith("http")
        ? form.website.trim()
        : `https://${form.website.trim()}`,
      email: form.email.trim().toLowerCase(),
      country,
      countryName: getCountryName(country),
      countryCode: `+${getCountryCallingCode(country)}`,
      phone: parsedPhone.number,
      businessHelp: form.businessHelp.trim(),
    };

    try {
      setIsSubmitting(true);

      if (typeof onSubmit !== "function") {
        throw new Error(
          "Form submission handler is not configured."
        );
      }

      await onSubmit(payload);

      setForm(initialForm);
      setCountry("IN");
      setPhone("");
      setErrors({});
      setSubmitMessage("Registration submitted successfully.");
    } catch (error) {
      setSubmitMessage(
        error?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-sm text-[#263247] outline-none transition placeholder:text-gray-400 focus:border-[#E52B18] ${
      errors[field]
        ? "border-red-500"
        : "border-gray-300"
    }`;

  const labelClass =
    "mb-2 block text-sm font-medium text-[#263247]";

  const errorClass =
    "mt-1.5 block text-xs text-red-600";

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Full Name */}
        <div>
          <label className={labelClass}>
            Full Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            autoComplete="name"
            maxLength={80}
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={(e) =>
              updateField("fullName", e.target.value)
            }
            className={inputClass("fullName")}
          />

          {errors.fullName && (
            <span className={errorClass}>
              {errors.fullName}
            </span>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className={labelClass}>
            Company Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            autoComplete="organization"
            maxLength={100}
            placeholder="Enter company name"
            value={form.companyName}
            onChange={(e) =>
              updateField("companyName", e.target.value)
            }
            className={inputClass("companyName")}
          />

          {errors.companyName && (
            <span className={errorClass}>
              {errors.companyName}
            </span>
          )}
        </div>

        {/* Website */}
        <div>
          <label className={labelClass}>
            Website <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            inputMode="url"
            autoComplete="url"
            maxLength={253}
            placeholder="www.example.com"
            value={form.website}
            onChange={(e) =>
              updateField("website", e.target.value)
            }
            className={inputClass("website")}
          />

          {errors.website && (
            <span className={errorClass}>
              {errors.website}
            </span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>
            Email Address <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) =>
              updateField("email", e.target.value)
            }
            className={inputClass("email")}
          />

          {errors.email && (
            <span className={errorClass}>
              {errors.email}
            </span>
          )}
        </div>

        {/* Phone Number */}
        <div className="md:col-span-2">
          <label className={labelClass}>
            Phone Number <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">

            {/* Country Dropdown */}
            <div className="relative">
              <label className="mb-1.5 block text-xs text-gray-500">
                Country
              </label>

              <select
                value={country}
                onChange={(e) =>
                  handleCountryChange(e.target.value)
                }
                className={`${inputClass("phone")} h-[46px] appearance-none pr-10`}
              >
                {countries.map((item) => (
                  <option
                    key={item.code}
                    value={item.code}
                  >
                    {item.name}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 top-[38px] text-gray-500"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="mb-1.5 block text-xs text-gray-500">
                Number
              </label>

              <div
                className={`flex h-[46px] items-center rounded-lg border bg-white px-3 transition focus-within:border-[#E52B18] ${
                  errors.phone
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <span className="mr-3 shrink-0 border-r border-gray-200 pr-3 text-sm text-[#263247]">
                  +{getCountryCallingCode(country)}
                </span>

                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) =>
                    handlePhoneChange(e.target.value)
                  }
                  className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#263247] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {errors.phone && (
            <span className={errorClass}>
              {errors.phone}
            </span>
          )}
        </div>

        {/* Business Help */}
        <div className="md:col-span-2">
          <label className={labelClass}>
            How can we help your business?{" "}
            <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={5}
            maxLength={1000}
            placeholder="Tell us about your business and how we can help..."
            value={form.businessHelp}
            onChange={(e) =>
              updateField("businessHelp", e.target.value)
            }
            className={`${inputClass("businessHelp")} resize-y`}
          />

          <div className="mt-1 flex justify-between">
            {errors.businessHelp ? (
              <span className={errorClass}>
                {errors.businessHelp}
              </span>
            ) : (
              <span />
            )}

            <span className="text-xs text-gray-400">
              {form.businessHelp.length}/1000
            </span>
          </div>
        </div>
      </div>

      {/* Submit Message */}
      {submitMessage && (
        <p
          role="status"
          className={`mt-4 text-sm ${
            submitMessage.includes("successfully")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {submitMessage}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#E52B18] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#C92313] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && (
          <Loader2 size={17} className="animate-spin" />
        )}

        {isSubmitting ? "Submitting..." : "Submit Registration"}
      </button>
    </form>
  );
}
