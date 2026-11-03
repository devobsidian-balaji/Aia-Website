
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";

const contactDetails = [
  {
    icon: Mail,
    title: "Email",
    description: "Our friendly team is here to help.",
    value: "director@aia-india.org",
    href: "mailto:director@aia-india.org",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Mon–Fri from 8am to 5pm.",
    value: "+91 011-41659981",
    href: "tel:+9101141659981",
  },
  {
    icon: MapPin,
    title: "Office Pune",
    description: "Come say hello at our office HQ.",
    value: "100 Smith Street",
    address: "Collingwood VIC 3066 AU",
  },
  {
    icon: MapPin,
    title: "Office Delhi",
    description: "Come say hello at our office HQ.",
    value: "100 Smith Street",
    address: "Collingwood VIC 3066 AU",
  },
];

export default function ContactSection({ onSubmit }) {
  return (
    <section
      id="contact-us"
      className="relative bg-white py-12 font-sans sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">

        {/* Contact Information */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">

          {/* Image */}
          <div className="lg:col-span-5">
            <div className="group h-[280px] overflow-hidden rounded-md bg-gray-100 sm:h-[360px] lg:h-[420px]">
              <img
                src="/contact-us/img_delhi.png"
                alt="India Gate, New Delhi"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-7">
            <div className="mb-7">
              <h2 className="text-2xl font-bold tracking-tight text-[#202A3A] sm:text-3xl">
                We’d love to hear from you
              </h2>

              <p className="mt-2 text-[12px] leading-relaxed text-gray-500">
                Need something cleared up? Here are our most frequently asked
                questions.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title}>
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-[#D92F1D] text-white">
                      <Icon size={19} strokeWidth={2} />
                    </div>

                    <h3 className="text-sm font-bold text-[#202A3A]">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500">
                      {item.description}
                    </p>

                    <div className="mt-2 text-[12px] font-medium leading-relaxed text-[#D93C2D]">
                      {item.href ? (
                        <a
                          href={item.href}
                          className="transition-colors hover:text-[#A92318]"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <>
                          <p>{item.value}</p>
                          <p>{item.address}</p>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-12 sm:mt-14 lg:mt-16">
          <div className="mb-7">
            <h2 className="text-2xl font-bold tracking-tight text-[#202A3A] sm:text-3xl">
              Get in touch
            </h2>

            <p className="mt-2 text-[12px] text-gray-500">
              We’d love to hear from you. Please fill out this form.
            </p>
          </div>

          <ContactForm onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
}
