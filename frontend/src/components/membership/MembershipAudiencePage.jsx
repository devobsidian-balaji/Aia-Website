// import React, { useState } from "react";
// import { Plus, Minus, ChevronDown, CheckCircle2 } from "lucide-react";

// function MembershipRegistrationForm() {
//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     companyName: "",
//     website: "",
//     area: "",
//     message: "",
//   };

//   const [form, setForm] = useState(initialValues);
//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   const updateField = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//     setSubmitted(false);
//   };

//   const validate = () => {
//     const nextErrors = {};

//     if (!form.firstName.trim()) nextErrors.firstName = "First name is required";
//     if (!form.lastName.trim()) nextErrors.lastName = "Last name is required";

//     if (!form.email.trim()) {
//       nextErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       nextErrors.email = "Enter a valid email";
//     }

//     if (!form.phone.trim()) {
//       nextErrors.phone = "Phone number is required";
//     } else if (!/^[0-9+\-\s()]{7,16}$/.test(form.phone)) {
//       nextErrors.phone = "Enter a valid phone number";
//     }

//     if (!form.companyName.trim()) {
//       nextErrors.companyName = "Company name is required";
//     }

//     if (!form.area) nextErrors.area = "Please select an inquiry area";

//     setErrors(nextErrors);
//     return Object.keys(nextErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     // Connect your backend API here.
//     console.log("Membership enquiry:", form);

//     setSubmitted(true);
//     setForm(initialValues);
//   };

//   const fields = [
//     { name: "firstName", placeholder: "First Name", required: true },
//     { name: "lastName", placeholder: "Last Name", required: true },
//     { name: "email", placeholder: "Email Address", required: true, type: "email" },
//     { name: "phone", placeholder: "Phone Number", required: true, type: "tel" },
//     { name: "companyName", placeholder: "Company Name", required: true },
//     { name: "website", placeholder: "Website (Optional)" },
//   ];

//   return (
//     <div className="rounded-xl border border-[#F3C9C4] bg-white p-4 shadow-[0_8px_35px_rgba(231,111,98,0.08)] sm:p-5">
//       <h3 className="mb-5 text-base font-bold text-[#E87565]">
//         Registration Form
//       </h3>

//       {submitted ? (
//         <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
//           <CheckCircle2 size={38} className="mb-3 text-green-600" />
//           <h4 className="font-semibold text-[#263247]">
//             Thank you for your interest!
//           </h4>
//           <p className="mt-2 text-sm text-gray-500">
//             Your form has been validated successfully.
//           </p>
//           <button
//             type="button"
//             onClick={() => setSubmitted(false)}
//             className="mt-4 text-sm font-semibold text-[#E87565]"
//           >
//             Submit another enquiry
//           </button>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} noValidate className="space-y-3">
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//             {fields.map((field) => (
//               <div key={field.name}>
//                 <input
//                   type={field.type || "text"}
//                   name={field.name}
//                   value={form[field.name]}
//                   onChange={updateField}
//                   placeholder={`${field.placeholder}${field.required ? " *" : ""}`}
//                   aria-label={field.placeholder}
//                   className={`h-10 w-full rounded-md border bg-white px-3 text-xs text-[#263247] outline-none transition placeholder:text-gray-500 focus:border-[#E87565] ${
//                     errors[field.name] ? "border-red-500" : "border-[#F2D5D1]"
//                   }`}
//                 />
//                 {errors[field.name] && (
//                   <p className="mt-1 text-[10px] text-red-500">
//                     {errors[field.name]}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div>
//             <div className="relative">
//               <select
//                 name="area"
//                 value={form.area}
//                 onChange={updateField}
//                 className={`h-10 w-full appearance-none rounded-md border bg-white px-3 pr-9 text-xs outline-none focus:border-[#E87565] ${
//                   errors.area ? "border-red-500" : "border-[#F2D5D1]"
//                 } ${form.area ? "text-[#263247]" : "text-gray-500"}`}
//               >
//                 <option value="">Area of Interest *</option>
//                 <option value="Membership">Membership</option>
//                 <option value="Technology">Technology</option>
//                 <option value="Partnership">Partnership</option>
//                 <option value="General Inquiry">General Inquiry</option>
//               </select>
//               <ChevronDown
//                 size={15}
//                 className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//               />
//             </div>
//             {errors.area && (
//               <p className="mt-1 text-[10px] text-red-500">{errors.area}</p>
//             )}
//           </div>

//           <textarea
//             name="message"
//             value={form.message}
//             onChange={updateField}
//             rows={3}
//             placeholder="Tell us about your business and requirements..."
//             className="w-full resize-y rounded-md border border-[#F2D5D1] px-3 py-3 text-xs outline-none placeholder:text-gray-500 focus:border-[#E87565]"
//           />

//           <button
//             type="submit"
//             className="w-full rounded-md bg-gradient-to-r from-[#D92716] to-[#F17C6D] py-3 text-xs font-bold text-white transition hover:brightness-95"
//           >
//             SUBMIT
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// function MembershipFeeTable({ rows = [] }) {
//   return (
//     <div className="overflow-hidden rounded-lg bg-white p-3 shadow-[0_5px_25px_rgba(0,0,0,0.05)] sm:p-4">
//       <h3 className="mb-3 text-sm font-bold text-[#263247]">
//         Membership Fee Structure
//       </h3>

//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[520px] border-collapse text-left text-[10px] sm:text-xs">
//           <thead>
//             <tr className="bg-[#FFF8F7] text-[#263247]">
//               <th className="border border-[#F2DEDA] p-2">S. No.</th>
//               <th className="border border-[#F2DEDA] p-2">Membership Class</th>
//               <th className="border border-[#F2DEDA] p-2">Annual Revenue (₹ Cr.)</th>
//               <th className="border border-[#F2DEDA] p-2">Admission Fee</th>
//               <th className="border border-[#F2DEDA] p-2">Annual Subscription</th>
//             </tr>
//           </thead>

//           <tbody>
//             {rows.map((row, index) => (
//               <tr key={row.id} className="text-[#263247]">
//                 <td className="border border-[#F2DEDA] p-2">{index + 1}</td>
//                 <td className="border border-[#F2DEDA] p-2 font-semibold">
//                   {row.membership}
//                 </td>
//                 <td className="border border-[#F2DEDA] p-2">{row.revenue}</td>
//                 <td className="border border-[#F2DEDA] p-2">
//                   {row.admission}/- + GST
//                 </td>
//                 <td className="border border-[#F2DEDA] p-2">
//                   {row.subscription}/- + GST
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function MembershipPartners({ partners = [] }) {
//   return (
//     <div className="rounded-lg border border-[#F2D5D1] bg-white p-4">
//       <h3 className="mb-3 text-xs font-bold text-[#E87565]">
//         Contributing Partners
//       </h3>

//       <div className="grid grid-cols-4 gap-2">
//         {partners.map((partner) => (
//           <div
//             key={partner.name}
//             className="flex h-14 items-center justify-center border border-gray-100 bg-white p-1"
//           >
//             <img
//               src={partner.logo}
//               alt={partner.name}
//               loading="lazy"
//               className="max-h-full max-w-full object-contain"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MembershipFAQ({ faqs = [] }) {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <section className="mt-16 sm:mt-20">
//       <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E87565]">
//         FAQs
//       </p>

//       <h2 className="mb-6 text-2xl font-black text-[#263247] sm:text-3xl">
//         Questions.
//       </h2>

//       <div className="divide-y divide-gray-200">
//         {faqs.map((faq, index) => {
//           const isOpen = activeIndex === index;

//           return (
//             <div key={index}>
//               <button
//                 type="button"
//                 onClick={() => setActiveIndex(isOpen ? -1 : index)}
//                 aria-expanded={isOpen}
//                 className="flex w-full items-center justify-between gap-4 py-4 text-left"
//               >
//                 <span className="text-xs font-semibold leading-relaxed text-[#263247] sm:text-sm">
//                   {faq.question}
//                 </span>

//                 {isOpen ? (
//                   <Minus size={17} className="shrink-0 text-[#E87565]" />
//                 ) : (
//                   <Plus size={17} className="shrink-0 text-[#E87565]" />
//                 )}
//               </button>

//               {isOpen && (
//                 <p className="max-w-4xl pb-5 pr-8 text-xs leading-6 text-gray-600">
//                   {faq.answer}
//                 </p>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// export default function MembershipAudiencePage({ data }) {
//   if (!data) return null;

//   return (
//     <main className="min-h-screen bg-[#F8FAFE] font-sans text-left">
//       <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_left,_rgba(238,113,99,0.07),_transparent_45%)]" />

//       <div className="relative mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
//         {/* Top Section */}
//         <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
//           <div className="min-w-0 lg:col-span-7">
//             <h1 className="max-w-2xl text-3xl font-black leading-tight text-[#263247] sm:text-4xl">
//               {data.title}
//             </h1>

//             {data.description?.map((paragraph, index) => (
//               <p
//                 key={index}
//                 className="mt-4 max-w-3xl text-xs leading-[1.8] text-[#465366] sm:text-sm"
//               >
//                 {paragraph}
//               </p>
//             ))}

//             <div className="mt-7">
//               <MembershipFeeTable rows={data.feeStructure} />
//             </div>
//           </div>

//           {/* Right Side */}
//           <aside className="space-y-5 lg:col-span-5">
//             <MembershipRegistrationForm />
//             <MembershipPartners partners={data.partners} />
//           </aside>
//         </div>

//         {/* Benefits */}
//         <section className="mt-12 max-w-4xl sm:mt-16">
//           <h2 className="mb-7 text-xl font-black text-[#263247]">
//             {data.benefitsTitle}
//           </h2>

//           <div className="space-y-7">
//             {data.benefits?.map((benefit, index) => (
//               <div key={`${benefit.title}-${index}`}>
//                 <h3 className="mb-2 text-sm font-bold text-[#315778] sm:text-base">
//                   {benefit.title}
//                 </h3>

//                 <p className="text-xs leading-[1.8] text-[#465366] sm:text-sm">
//                   {benefit.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* FAQs */}
//         <MembershipFAQ faqs={data.faqs} />
//       </div>
//     </main>
//   );
// }



// import React from "react";

// import MembershipFeeTable from "./MembershipFeeTable";
// import MembershipRegistrationForm from "./MembershipRegistrationForm";
// import MembershipPartners from "./MembershipPartners";
// import MembershipFAQ from "./MembershipFAQ";
// import { Link } from "react-router-dom";

// export default function MembershipAudiencePage({ data }) {
//   if (!data) return null;

//    const handleRegistration = async (payload) => {
//     // await submitMembershipRegistration(payload);
//   };

//   return (
//     <main className="min-h-screen bg-[#F8FAFE] font-sans text-left">
//       <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_left,_rgba(238,113,99,0.07),_transparent_45%)]" />

//       <div className="relative mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">

//         <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">

//           {/* Left Content */}
//           <div className="min-w-0 lg:col-span-7">
//             <h1 className="max-w-2xl text-3xl font-black leading-tight text-[#263247] sm:text-4xl font-semibold">
//               {data.title}
//             </h1>

//             {data.description?.map((paragraph, index) => (
//               <p
//                 key={index}
//                 className="mt-4 max-w-3xl text-xs leading-[1.8] text-[#465366] sm:text-sm"
//               >
//                 {paragraph}
//               </p>
//             ))}

//             <div className="mt-7">
//               <MembershipFeeTable rows={data.feeStructure} />
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <aside className="space-y-5 lg:col-span-5">
//              <MembershipRegistrationForm
//              onSubmit={handleRegistration}
//             />
//             <div className="flex flex-col">

//             <h1 className="capitalize">Join Our {data.slug}</h1>
//              <Link
//           to="/request-form/membership"
//           className="mt-3 w-fit rounded-lg bg-gradient-to-r from-[#D92716] via-[#E83D2B] to-[#F17C6D] py-3 px-4 text-sm font-semibold text-white transition hover:brightness-95"
//         >
//           Explore Membership
//         </Link>
//             </div>
            
//             <MembershipPartners partners={data.partners} />
//           </aside>

//         </div>

//         {/* Benefits */}
//         <section className="mt-12 max-w-4xl sm:mt-16">
//           <h2 className="mb-7 text-xl font-black text-[#263247]">
//             {data.benefitsTitle}
//           </h2>

//           <div className="space-y-7">
//             {data.benefits?.map((benefit, index) => (
//               <div key={`${benefit.title}-${index}`}>
//                 <h3 className="mb-2 text-sm font-bold text-[#315778] sm:text-base">
//                   {benefit.title}
//                 </h3>

//                 <p className="text-xs leading-[1.8] text-[#465366] sm:text-sm">
//                   {benefit.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* FAQ */}
//         <MembershipFAQ faqs={data.faqs} />

//       </div>
//     </main>
//   );
// }



import React from "react";

import MembershipFeeTable from "./MembershipFeeTable";
import MembershipRegistrationForm from "./MembershipRegistrationForm";
import MembershipPartners from "./MembershipPartners";
import MembershipFAQ from "./MembershipFAQ";
import { Link, useLocation } from "react-router-dom";
import { submitFormSubmission } from "../../services/formSubmissionApi";

export default function MembershipAudiencePage({ data }) {
  const location = useLocation();

  if (!data) return null;

  // Identify which registration page is currently open.
  const formType = location.pathname.includes(
    "technology-providers-signup"
  )
    ? "technology-provider"
    : location.pathname.includes("system-integrators-signup")
      ? "system-integrator"
      : null;

  const handleRegistration = async (payload) => {
    if (!formType) {
      throw new Error("Invalid membership registration page.");
    }

    return await submitFormSubmission({
      formType,
      data: payload,
    });
  };

  return (
    <main className="min-h-screen bg-[#F8FAFE] font-sans text-left">
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_left,_rgba(238,113,99,0.07),_transparent_45%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">

          {/* Left Content */}
          <div className="min-w-0 lg:col-span-7">
            <h1 className="max-w-2xl text-3xl font-black leading-tight text-[#263247] sm:text-4xl font-semibold">
              {data.title}
            </h1>

            {data.description?.map((paragraph, index) => (
              <p
                key={index}
                className="mt-4 max-w-3xl text-xs leading-[1.8] text-[#465366] sm:text-sm"
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-7">
              <MembershipFeeTable rows={data.feeStructure} />
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-5 lg:col-span-5">
            <MembershipRegistrationForm
              onSubmit={handleRegistration}
            />

            <div className="flex flex-col">
              <h1 className="capitalize">
                Join Our {data.slug}
              </h1>

              <Link
                to="/request-form/membership"
                className="mt-3 w-fit rounded-lg bg-gradient-to-r from-[#D92716] via-[#E83D2B] to-[#F17C6D] py-3 px-4 text-sm font-semibold text-white transition hover:brightness-95"
              >
                Explore Membership
              </Link>
            </div>

            <MembershipPartners partners={data.partners} />
          </aside>

        </div>

        {/* Benefits */}
        <section className="mt-12 max-w-4xl sm:mt-16">
          <h2 className="mb-7 text-xl font-black text-[#263247]">
            {data.benefitsTitle}
          </h2>

          <div className="space-y-7">
            {data.benefits?.map((benefit, index) => (
              <div key={`${benefit.title}-${index}`}>
                <h3 className="mb-2 text-sm font-bold text-[#315778] sm:text-base">
                  {benefit.title}
                </h3>

                <p className="text-xs leading-[1.8] text-[#465366] sm:text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <MembershipFAQ faqs={data.faqs} />

      </div>
    </main>
  );
}
