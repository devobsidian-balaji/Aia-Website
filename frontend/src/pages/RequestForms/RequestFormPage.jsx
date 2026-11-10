
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, ArrowLeft } from "lucide-react";

import StickyFormCard from "../../components/RequestForms/StickyFormCard";
import {
  FormField,
  FormSelect,
  FormTextarea,
} from "../../components/RequestForms/FormFields";
import { submitFormSubmission } from "../../services/formSubmissionApi";

// const API_URL = (
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api"
// ).replace(/\/$/, "");


const membershipClasses = [
  {
    id: "PM-06",
    revenue: "Above 500",
    admissionFee: "2,00,000/- + GST",
    subscriptionFee: "1,00,000/- + GST",
  },
  {
    id: "PM-05",
    revenue: "Above 250 upto 500",
    admissionFee: "1,00,000/- + GST",
    subscriptionFee: "1,00,000/- + GST",
  },
  {
    id: "PM-04",
    revenue: "Above 100 upto 250",
    admissionFee: "75,000/- + GST",
    subscriptionFee: "75,000/- + GST",
  },
  {
    id: "PM-03",
    revenue: "Above 50 upto 100",
    admissionFee: "50,000/- + GST",
    subscriptionFee: "50,000/- + GST",
  },
  {
    id: "PM-02",
    revenue: "Above 25 upto 50",
    admissionFee: "25,000/- + GST",
    subscriptionFee: "25,000/- + GST",
  },
  {
    id: "PM-01",
    revenue: "Upto 25",
    admissionFee: "10,000/- + GST",
    subscriptionFee: "10,000/- + GST",
  },
];

const initialValues = {
  // Card 1 - General Information
  companyName: "",
  principalAddress: "",
  city: "",
  pincode: "",
  businessPhone1: "",
  businessPhone2: "",
  website: "",
  gstNumber: "",

  // Card 2 - Principal Company
  capitalEmployed: "",
  numberOfEmployees: "",
  annualRevenue: "",
  incorporationYear: "",
  revenueStream: "",
  legalStructure: "",
  foreignCollaborations: "",
  industryFocus: "",

  // Card 3 - Benefits and Contributions
  expectedBenefits: "",
  contributions: "",

  // Card 4 - Membership
  membershipClass: "",

  // Card 5 - CEO
  ceoName: "",
  ceoDesignation: "",
  ceoAddress: "",
  ceoPhone: "",
  ceoEmail: "",

  // Card 6 - Representative
  representativeName: "",
  representativeDesignation: "",
  representativeAddress: "",
  representativePhone: "",
  representativeEmail: "",

  // Card 7 - Alternate Nominee
  nomineeName: "",
  nomineeDesignation: "",
  nomineeAddress: "",
  nomineePhone: "",
  nomineeEmail: "",

  // Card 8 - Submitted By
  submittedByName: "",
  submittedByDesignation: "",
  submittedByPhone: "",
  submittedByEmail: "",

  agree: false,
};

const inputGrid = "grid grid-cols-1 gap-4 sm:grid-cols-2";

function CardHeading({ children, description }) {
  return (
    <div className="mb-7">
      <h2 className="text-lg font-bold leading-[1.4] text-[#263247] sm:text-xl lg:text-[22px]">
        {children}
      </h2>

      {description && (
        <p className="mt-3 max-w-[850px] text-xs leading-[1.7] text-[#263247] sm:text-sm">
          {description}
        </p>
      )}
    </div>
  );
}

function MembershipFeeTable({ value, onChange }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#F4D7D3]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border-collapse text-left text-xs text-[#263247]">
          <thead>
            <tr className="bg-white">
              <th className="border-b border-r border-[#F4D7D3] px-3 py-4 font-medium">
                S no.
              </th>
              <th className="border-b border-r border-[#F4D7D3] px-3 py-4 font-medium">
                Class of Membership (Primary)
              </th>
              <th className="border-b border-r border-[#F4D7D3] px-3 py-4 font-medium">
                Annual Revenues of company / group (in INR, Crores)
              </th>
              <th className="border-b border-r border-[#F4D7D3] px-3 py-4 font-medium">
                Non-Refundable Admission Fee (in INR)
              </th>
              <th className="border-b border-r border-[#F4D7D3] px-3 py-4 font-medium">
                Annual Subscription Fee (in INR)*
              </th>
              <th className="border-b border-[#F4D7D3] px-3 py-4 text-center font-medium">
                Check as applicable
              </th>
            </tr>
          </thead>

          <tbody>
            {membershipClasses.map((item, index) => (
              <tr
                key={item.id}
                className={`transition-colors ${
                  value === item.id ? "bg-[#FFF7F5]" : "bg-white"
                }`}
              >
                <td className="border-b border-r border-[#F4D7D3] px-3 py-4">
                  {index + 1}
                </td>

                <td className="border-b border-r border-[#F4D7D3] px-3 py-4 font-medium">
                  {item.id}
                </td>

                <td className="border-b border-r border-[#F4D7D3] px-3 py-4">
                  {item.revenue}
                </td>

                <td className="border-b border-r border-[#F4D7D3] px-3 py-4">
                  {item.admissionFee}
                </td>

                <td className="border-b border-r border-[#F4D7D3] px-3 py-4">
                  {item.subscriptionFee}
                </td>

                <td className="border-b border-[#F4D7D3] px-3 py-4 text-center">
                  <input
                    type="radio"
                    name="membershipClass"
                    value={item.id}
                    checked={value === item.id}
                    onChange={onChange}
                    required
                    aria-label={`Select ${item.id}`}
                    className="h-4 w-4 cursor-pointer accent-[#E87565]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="px-3 py-2 text-[10px] text-gray-500">
        * Applicable annual subscription fee as per selected membership class.
      </p>
    </div>
  );
}

function PersonFields({ prefix, values, onChange, requiredAddress = true }) {
  return (
    <div className="space-y-5">
      <div className={inputGrid}>
        <FormField
          label="Name"
          name={`${prefix}Name`}
          value={values[`${prefix}Name`]}
          onChange={onChange}
          required
          placeholder="Enter name"
        />

        <FormField
          label="Designation"
          name={`${prefix}Designation`}
          value={values[`${prefix}Designation`]}
          onChange={onChange}
          placeholder="Enter designation"
        />
      </div>

      <FormField
        label="Address"
        name={`${prefix}Address`}
        value={values[`${prefix}Address`]}
        onChange={onChange}
        required={requiredAddress}
        placeholder="Enter address"
      />

      <div className={inputGrid}>
        <FormField
          label="Landline / Mobile"
          name={`${prefix}Phone`}
          type="tel"
          value={values[`${prefix}Phone`]}
          onChange={onChange}
          placeholder="Enter phone number"
        />

        <FormField
          label="E-mail"
          name={`${prefix}Email`}
          type="email"
          value={values[`${prefix}Email`]}
          onChange={onChange}
          placeholder="Enter email address"
        />
      </div>
    </div>
  );
}

export default function RequestFormPage() {
  const { type } = useParams();

  const [formData, setFormData] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const isMembership = type === "membership";

  const pageTitle = {
    membership: "Application Form for Primary Membership of AIA",
    automation: "Automation Product & Services Request",
    partnership: "Partnership Request with AIA",
  }[type];

  const handleChange = (event) => {
    const { name, value, checked, type: inputType } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: inputType === "checkbox" ? checked : value,
    }));
  };


const handleSubmit = async (event) => {
  event.preventDefault();
  setError("");

  if (!formData.membershipClass) {
    setError("Please select a membership class.");
    return;
  }

  try {
    setSubmitting(true);

    const payload = {
      requestType: type,
      ...formData,
    };

    const result = await submitFormSubmission({
      formType: "aia-membership",
      data: payload,
    });

    console.log("Membership submission successful:", result);

    setSubmitted(true);
  } catch (err) {
    console.error("Request submission error:", err);

    setError(
      err.message || "Something went wrong. Please try again."
    );
  } finally {
    setSubmitting(false);
  }
};


  if (!pageTitle) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#31577C] px-5">
        <div className="rounded-lg bg-white p-8 text-center">
          <h1 className="text-xl font-bold text-[#263247]">
            Request form not found
          </h1>
          <Link to="/" className="mt-4 inline-block text-sm text-[#E87565]">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  if (!isMembership) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#31577C] px-5">
        <div className="max-w-md rounded-lg bg-white p-8 text-center">
          <h1 className="text-xl font-bold text-[#263247]">
            {pageTitle}
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            This request form needs its own field configuration.
            The screenshots provided are for Primary Membership of AIA.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 text-sm text-[#E87565]"
          >
            <ArrowLeft size={15} /> Back to Home
          </Link>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#31577C] px-5">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
          <CheckCircle2 size={48} className="mx-auto text-green-600" />

          <h1 className="mt-4 text-xl font-bold text-[#263247]">
            Application Submitted
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Thank you for applying for AIA membership.
            Your application has been received.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-md bg-[#E87565] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full touch-pan-y bg-[#31577C] px-3 py-6 font-sans sm:px-5 sm:py-10">
      <div className="mx-auto max-w-[760px]">

        {/* Header */}
        <header className="sticky top-0 z-[100] mb-4 flex min-h-[65px] items-center justify-between gap-4 bg-white px-5 py-3 shadow-sm sm:px-7">
          <Link to="/" aria-label="AIA Home">
            <img
              src="/aia-logo-blue.png"
              alt="AIA Logo"
              className="h-20 w-auto object-contain"
            />
          </Link>

          <p className="max-w-[230px] text-left text-[9px] font-semibold leading-relaxed text-[#263247] sm:text-[16px]">
            {pageTitle}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* CARD 1 - GENERAL INFORMATION */}
          <StickyFormCard number={1} index={0}>
            <CardHeading description="We have gone through the aims and objectives of AIA and wish to apply for Primary Membership. The application details are duly completed as below:">
              General Information
            </CardHeading>

            <div className={inputGrid}>
              <FormField
                label="Name of the Company / Group of Companies"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder="Company name"
              />

              <FormField
                label="Principal Address"
                name="principalAddress"
                value={formData.principalAddress}
                onChange={handleChange}
                required
              />

              <FormField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

              <FormField
                label="Pin code"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                pattern="[0-9]{6}"
                maxLength={6}
                placeholder="6-digit PIN code"
              />

              <FormField
                label="Business Phone 1"
                name="businessPhone1"
                type="tel"
                value={formData.businessPhone1}
                onChange={handleChange}
              />

              <FormField
                label="Phone 2"
                name="businessPhone2"
                type="tel"
                value={formData.businessPhone2}
                onChange={handleChange}
              />

              <FormField
                label="Website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://"
              />

              <FormField
                label="GST Registration No"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
              />
            </div>
          </StickyFormCard>

          {/* CARD 2 - ABOUT PRINCIPAL COMPANY */}
          <StickyFormCard number={2} index={1}>
            <CardHeading description="If any other companies belonging to the same group are to be included, furnish additional information through separate sheets.">
              About the Principal Company
            </CardHeading>

            <div className={inputGrid}>
              <FormField
                label="Capital Employed (Rs. crore)"
                name="capitalEmployed"
                value={formData.capitalEmployed}
                onChange={handleChange}
                placeholder="Enter amount"
              />

              <FormField
                label="Number of Employees"
                name="numberOfEmployees"
                type="number"
                value={formData.numberOfEmployees}
                onChange={handleChange}
              />

              <FormField
                label="Annual Revenue (Rs. crore)"
                name="annualRevenue"
                type="number"
                value={formData.annualRevenue}
                onChange={handleChange}
              />

              <FormField
                label="Year of incorporation"
                name="incorporationYear"
                type="number"
                value={formData.incorporationYear}
                onChange={handleChange}
                placeholder="YYYY"
              />

              <div className="sm:col-span-2">
                <FormSelect
                  label="Revenue stream (indicate ranking 1-4, against each)"
                  name="revenueStream"
                  value={formData.revenueStream}
                  onChange={handleChange}
                  options={[
                    "Manufacturing - Rank 1",
                    "Manufacturing - Rank 2",
                    "Manufacturing - Rank 3",
                    "Manufacturing - Rank 4",
                    "Services - Rank 1",
                    "Services - Rank 2",
                    "Services - Rank 3",
                    "Services - Rank 4",
                    "Other",
                  ]}
                />
              </div>

              <FormSelect
                label="Legal/Tax Structure of Company"
                name="legalStructure"
                value={formData.legalStructure}
                onChange={handleChange}
                options={[
                  "Private Limited",
                  "Public Limited",
                  "Partnership",
                  "Proprietorship",
                  "LLP",
                  "Other",
                ]}
              />

              <FormField
                label="Foreign collaborations if any"
                name="foreignCollaborations"
                value={formData.foreignCollaborations}
                onChange={handleChange}
              />

              <div className="sm:col-span-2">
                <FormTextarea
                  label="Industry and applications focus"
                  name="industryFocus"
                  value={formData.industryFocus}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </div>
          </StickyFormCard>

          {/* CARD 3 - BENEFITS AND CONTRIBUTIONS */}
          <StickyFormCard number={3} index={2}>
            <CardHeading>
              How does the company expect to benefit from the AIA membership and contribute to the growth of AIA objectives?
            </CardHeading>

            <div className="space-y-5">
              <FormTextarea
                label="Expected Benefits from AIA Membership"
                name="expectedBenefits"
                value={formData.expectedBenefits}
                onChange={handleChange}
                rows={3}
              />

              <FormTextarea
                label="Ways of Contributions to AIA Objective"
                name="contributions"
                value={formData.contributions}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </StickyFormCard>

          {/* CARD 4 - MEMBERSHIP CLASS */}
          <StickyFormCard number={4} index={3}>
            <CardHeading>
              Current Membership class and fee details
            </CardHeading>

            <MembershipFeeTable
              value={formData.membershipClass}
              onChange={handleChange}
            />
          </StickyFormCard>

          {/* CARD 5 - CEO */}
          <StickyFormCard number={5} index={4}>
            <CardHeading>
              Chief Executive Officer of the Principal Company or Group
            </CardHeading>

            <PersonFields
              prefix="ceo"
              values={formData}
              onChange={handleChange}
            />
          </StickyFormCard>

          {/* CARD 6 - PRINCIPAL REPRESENTATIVE */}
          <StickyFormCard number={6} index={5}>
            <CardHeading description="(if different from Chief Executive Officer)">
              Principal Representative for attending Annual Body & Special Meetings:
            </CardHeading>

            <PersonFields
              prefix="representative"
              values={formData}
              onChange={handleChange}
            />
          </StickyFormCard>

          {/* CARD 7 - ALTERNATE NOMINEE */}
          <StickyFormCard number={7} index={6}>
            <CardHeading>
              Alternate Nominee for attending Annual Body & Special Meetings:
            </CardHeading>

            <PersonFields
              prefix="nominee"
              values={formData}
              onChange={handleChange}
            />
          </StickyFormCard>

          {/* CARD 8 - SUBMITTED BY */}
          <StickyFormCard number={8} index={7}>
            <CardHeading>
              Submitted by
            </CardHeading>

            <div className={inputGrid}>
              <FormField
                label="Name"
                name="submittedByName"
                value={formData.submittedByName}
                onChange={handleChange}
                required
              />

              <FormField
                label="Designation"
                name="submittedByDesignation"
                value={formData.submittedByDesignation}
                onChange={handleChange}
                required
              />

              <FormField
                label="Mobile Number"
                name="submittedByPhone"
                type="tel"
                value={formData.submittedByPhone}
                onChange={handleChange}
                required
                pattern="[6-9][0-9]{9}"
                maxLength={10}
              />

              <FormField
                label="Email"
                name="submittedByEmail"
                type="email"
                value={formData.submittedByEmail}
                onChange={handleChange}
                required
              />
            </div>

            <p className="mt-5 text-[10px] leading-[1.7] text-[#263247] sm:text-xs">
              Note: AIA does not provide individual membership. Any firm or
              company in India engaged in manufacturing activities or
              providing services shall be eligible to apply for membership
              of the Confederation of Indian Industry.
            </p>

            <label className="mt-5 flex items-start gap-2 text-xs leading-5 text-gray-600">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
                className="mt-1 h-4 w-4 shrink-0 accent-[#E87565]"
              />

              <span>
                I confirm that the information provided in this application
                is accurate and complete.
              </span>
            </label>
          </StickyFormCard>

          {/* FORM ERROR */}
          {error && (
            <p
              role="alert"
              className="rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-600"
            >
              {error}
            </p>
          )}

          {/* FINAL SUBMIT BUTTON */}
          <div className="relative z-[110] flex justify-center py-6 bg-white px-5">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-gradient-to-r from-[#D72C1D] to-[#F27D70] px-8 py-3.5 text-lg font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
