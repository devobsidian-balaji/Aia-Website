
// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft, ArrowUpRight, Mail, Phone, Globe } from "lucide-react";

// import { membershipDirectory } from "../../../data/membership-directory";
// import StickyStackCards from "../../../components/membership/member-directory/StickyStackCards";
// import MemberInfoSection from "../../../components/membership/member-directory/MemberInfoSection";

// export default function MemberDetails() {

//   const { slug } = useParams();

//   // Find current member
//   const currentIndex = membershipDirectory.findIndex(
//     (item) => item.slug === slug
//   );

//   const member =
//     currentIndex !== -1
//       ? membershipDirectory[currentIndex]
//       : null;

//   // Previous member
//   const previousMember =
//     currentIndex > 0
//       ? membershipDirectory[currentIndex - 1]
//       : null;

//   // Next member
//   const nextMember =
//     currentIndex !== -1 &&
//     currentIndex < membershipDirectory.length - 1
//       ? membershipDirectory[currentIndex + 1]
//       : null;

// //   const member = membershipDirectory.find((item) => item.slug === slug);

//   if (!member) {
//     return (
//       <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
//         <h1 className="text-3xl font-bold text-[#202A3A]">
//           Member Not Found
//         </h1>

//         <p className="mt-3 text-sm text-gray-500">
//           The member profile you are looking for does not exist.
//         </p>

//         <Link
//           to="/membership/member-directory"
//           className="mt-6 rounded-md bg-[#E87565] px-6 py-3 text-sm font-semibold text-white"
//         >
//           Back to Directory
//         </Link>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-white font-sans">

//       {/* Member Header */}
//       <section className="relative overflow-hidden bg-[#20466C] text-white">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(100,155,205,0.5),transparent_55%)]" />

//         <div className="relative mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 px-6 py-9 sm:flex-row sm:px-8 lg:px-12">

//           <div className="w-full sm:max-w-[45%]">
//             <Link
//               to="/membership/member-directory"
//               className="mb-5 inline-flex items-center gap-2 text-xs text-white/70 transition-colors hover:text-white"
//             >
//               <ArrowLeft size={15} />
//               Back to Member Directory
//             </Link>

//             <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
//               {member.name}
//             </h1>

//             <p className="mt-2 text-[10px] text-white/60">
//               {member.category}
//             </p>
//           </div>

//           <div className="flex h-[110px] w-full items-center justify-center border border-[#E87565] bg-white p-5 sm:h-[130px] sm:w-[240px]">
//             <img
//               src={member.coverLogo || member.logo}
//               alt={member.name}
//               className="max-h-full max-w-full object-contain"
//             />
//           </div>

//         </div>
//       </section>

//       {/* About */}
//       <section className="bg-white px-5 py-5 text-center sm:py-6 mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
//         <div className="">
//           <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight text-center mb-5 font-semibold">
//             About
//           </h2>

//           <p className="text-sm font-normal leading-[1.7] text-gray-600 sm:text-base sm:leading-[1.7] lg:text-lg lg:leading-[1.75] mb-5">
//             {member.about}
//           </p>
//         </div>
//       </section>

//       {/* Services with Sticky Cards */}
//       <StickyStackCards
//         title="Services"
//         items={member.services || []}
//       />

//       {/* Mission, Vision, Quality */}
//       <MemberInfoSection 
//         member={member}
//         previousMember={previousMember}
//         nextMember={nextMember} />

//       {/* Contact Details */}
//       <section className="border-t border-gray-100 bg-white py-10 sm:py-14">
//         <div className="mx-auto max-w-[1240px] px-6 sm:px-8 lg:px-12">

//           <h2 className="mb-7 text-xl font-bold text-[#202A3A] sm:text-2xl">
//             Contact Information
//           </h2>

//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

//             {member.website && (
//               <Link
//                 href={member.website}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-3 border border-gray-200 p-4 transition-colors hover:border-[#E87565]"
//               >
//                 <Globe className="shrink-0 text-[#E87565]" size={19} />
//                 <div className="min-w-0">
//                   <p className="text-[10px] text-gray-500">Website</p>
//                   <p className="truncate text-xs font-semibold text-[#263247]">
//                     Visit Website
//                   </p>
//                 </div>
//                 <ArrowUpRight className="ml-auto shrink-0 text-gray-400" size={15} />
//               </Link>
//             )}

//             {member.email && (
//               <Link
//                 href={`mailto:${member.email}`}
//                 className="flex items-center gap-3 border border-gray-200 p-4 transition-colors hover:border-[#E87565]"
//               >
//                 <Mail className="shrink-0 text-[#E87565]" size={19} />
//                 <div className="min-w-0">
//                   <p className="text-[10px] text-gray-500">Email</p>
//                   <p className="truncate text-xs font-semibold text-[#263247]">
//                     {member.email}
//                   </p>
//                 </div>
//               </Link>
//             )}

//             {member.phone && (
//               <Link
//                 href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}
//                 className="flex items-center gap-3 border border-gray-200 p-4 transition-colors hover:border-[#E87565]"
//               >
//                 <Phone className="shrink-0 text-[#E87565]" size={19} />
//                 <div className="min-w-0">
//                   <p className="text-[10px] text-gray-500">Phone</p>
//                   <p className="truncate text-xs font-semibold text-[#263247]">
//                     {member.phone}
//                   </p>
//                 </div>
//               </Link>
//             )}

//           </div>
//         </div>
//       </section>

//     </main>
//   );
// }



import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

import StickyStackCards from "../../../components/membership/member-directory/StickyStackCards";
import MemberInfoSection from "../../../components/membership/member-directory/MemberInfoSection";

const API = `${import.meta.env.VITE_API_URL || ""}/members`;

export default function MemberDetails() {
  const { slug } = useParams();

  const [member, setMember] = useState(null);
  const [previousMember, setPreviousMember] = useState(null);
  const [nextMember, setNextMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${API}/slug/${encodeURIComponent(slug)}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch member."
          );
        }

        const data = result.member;

        setMember({
          ...data,

          // Keep complete logo object
          // Same logo is used on directory card and details page
          logo: data.logo || {},

          // Convert service image objects into URL strings
          services: (data.services || []).map((service) => ({
            ...service,
            image: service.image?.url || "",
          })),

          qualityObjectives: Array.isArray(data.qualityObjectives)
            ? data.qualityObjectives
            : [],
        });

        setPreviousMember(result.previousMember || null);
        setNextMember(result.nextMember || null);
      } catch (error) {
        console.error("Member details error:", error);
        setMember(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading member details...
      </div>
    );
  }

  if (!member) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold text-[#202A3A]">
          Member Not Found
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          The member profile you are looking for does not exist.
        </p>

        <Link
          to="/membership/member-directory"
          className="mt-6 rounded-md bg-[#E87565] px-6 py-3 text-sm font-semibold text-white"
        >
          Back to Directory
        </Link>
      </main>
    );
  }

  const websiteUrl = member.website
    ? member.website.startsWith("http")
      ? member.website
      : `https://${member.website}`
    : "";

  return (
    <main className="min-h-screen bg-white font-sans">

      {/* MEMBER HEADER */}
      <section className="relative overflow-hidden bg-[#20466C] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(100,155,205,0.5),transparent_55%)]" />

        <div className="relative mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 px-6 py-9 sm:flex-row sm:px-8 lg:px-12">

          <div className="w-full sm:max-w-[45%]">
            <Link
              to="/membership/member-directory"
              className="mb-5 inline-flex items-center gap-2 text-xs text-white/70 hover:text-white"
            >
              <ArrowLeft size={15} />
              Back to Member Directory
            </Link>

            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
              {member.name}
            </h1>

            {member.category && (
              <p className="mt-2 text-[10px] text-white/60">
                {member.category}
              </p>
            )}
          </div>

          {/* SAME LOGO AS DIRECTORY CARD */}
          <div className="flex h-[110px] w-full items-center justify-center border border-[#E87565] bg-white p-5 sm:h-[130px] sm:w-[240px]">
            {member.logo?.url ? (
              <img
                src={member.logo.url}
                alt={`${member.name} logo`}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="text-sm text-gray-400">
                No Logo Available
              </span>
            )}
          </div>

        </div>
      </section>

      {/* ABOUT */}
      {member.about && (
        <section className="mx-auto w-full max-w-6xl bg-white px-5 py-8 text-center sm:px-8 lg:px-12">
          <h2 className="mb-5 text-4xl font-semibold text-[#1F2937]">
            About
          </h2>

          <p className="text-sm leading-[1.7] text-gray-600 sm:text-base">
            {member.about}
          </p>
        </section>
      )}

      {/* SERVICES */}
      {member.services?.length > 0 && (
        <StickyStackCards
          title="Services"
          items={member.services}
        />
      )}

      {/* MISSION / VISION / QUALITY / AIA FAMILY MEMBER */}
      <MemberInfoSection
        member={member}
        previousMember={previousMember}
        nextMember={nextMember}
      />

      {/* CONTACT INFORMATION */}
      <section className="border-t border-gray-100 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-8 lg:px-12">

          <h2 className="mb-7 text-xl font-bold text-[#202A3A] sm:text-2xl">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-gray-200 p-4 hover:border-[#E87565]"
              >
                <Globe
                  className="shrink-0 text-[#E87565]"
                  size={19}
                />

                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500">
                    Website
                  </p>

                  <p className="truncate text-xs font-semibold text-[#263247]">
                    Visit Website
                  </p>
                </div>

                <ArrowUpRight
                  className="ml-auto shrink-0 text-gray-400"
                  size={15}
                />
              </a>
            )}

            {member.familyMember?.email && (
              <a
                href={`mailto:${member.familyMember.email}`}
                className="flex items-center gap-3 border border-gray-200 p-4 hover:border-[#E87565]"
              >
                <Mail
                  className="shrink-0 text-[#E87565]"
                  size={19}
                />

                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500">
                    Email
                  </p>

                  <p className="truncate text-xs font-semibold text-[#263247]">
                    {member.familyMember.email}
                  </p>
                </div>
              </a>
            )}

            {member.familyMember?.phone && (
              <a
                href={`tel:${member.familyMember.phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-3 border border-gray-200 p-4 hover:border-[#E87565]"
              >
                <Phone
                  className="shrink-0 text-[#E87565]"
                  size={19}
                />

                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500">
                    Phone
                  </p>

                  <p className="truncate text-xs font-semibold text-[#263247]">
                    {member.familyMember.phone}
                  </p>
                </div>
              </a>
            )}

          </div>
        </div>
      </section>

    </main>
  );
}
