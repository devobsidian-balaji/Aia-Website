import React from "react";
import ContactHero from "./ContactHero";
import ContactSection from "./ContactSection";

const ContactUs = () => {
  return (
    <div>
      <ContactHero />
      <ContactSection
        onSubmit={async (formData) => {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/contact-us`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            },
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to submit enquiry.");
          }

          return data;
        }}
      />
    </div>
  );
};

export default ContactUs;
