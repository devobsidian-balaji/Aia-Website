import React from "react";
import ContactHero from "./ContactHero";
import ContactSection from "./ContactSection";
import DynamicPageHero from "../common/DynamicPageHero";
import { submitFormSubmission } from "../../services/formSubmissionApi";

const ContactUs = () => {
  return (
    <div>
      {/* <ContactHero /> */}
      <DynamicPageHero
  pageKey="contact-us"
  fallbackImage="/about-hero-team.png"
  fallbackHeading="Contact Us"
  scrollTarget="#contact-content"
/>
      <ContactSection

      onSubmit={async (formData) => {
    return await submitFormSubmission({
      formType: "contact-us",
      data: formData,
    });
  }}
        // onSubmit={async (formData) => {
        //   const response = await fetch(
        //     `${import.meta.env.VITE_API_URL}/contact-us`,
        //     {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify(formData),
        //     },
        //   );

        //   const data = await response.json();

        //   if (!response.ok) {
        //     throw new Error(data.message || "Failed to submit enquiry.");
        //   }

        //   return data;
        // }}
      />
    </div>
  );
};

export default ContactUs;
