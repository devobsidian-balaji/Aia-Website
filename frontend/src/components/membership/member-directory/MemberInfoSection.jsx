import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Mail, Phone } from "lucide-react";

function InfoBlock({ title, children }) {
  if (!children) return null;

  return (
    <div className="border-b border-gray-100 py-5 last:border-0">
      <h3 className="mb-2 text-lg font-bold text-[#263247]">{title}</h3>
      {children}
    </div>
  );
}

export default function MemberInfoSection({
  member,
  previousMember,
  nextMember,
}) {
  if (!member) return null;

  const familyMember = member.familyMember || {};

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8 lg:px-12">
        {/* Mission */}
        {member.mission && (
          <InfoBlock title="Mission">
            <p className="text-lg leading-7 text-gray-600">{member.mission}</p>
          </InfoBlock>
        )}

        {/* Vision */}
        {member.vision && (
          <InfoBlock title="Vision">
            <p className="text-lg leading-7 text-gray-600">{member.vision}</p>
          </InfoBlock>
        )}

        {/* Quality Policy */}
        {member.qualityPolicy && (
          <InfoBlock title="Quality Policy">
            <p className="text-lg leading-7 text-gray-600">
              {member.qualityPolicy}
            </p>
          </InfoBlock>
        )}

        {/* Quality Objectives */}
        {member.qualityObjectives?.length > 0 && (
          <InfoBlock title="Our Quality Objectives:">
            <ul className="space-y-2">
              {member.qualityObjectives.map((objective, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-lg leading-6 text-gray-600"
                >
                  <span className="mt-0.5 shrink-0 text-[#E87565]">•</span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </InfoBlock>
        )}

        {/* Our Commitment */}
        {member.commitment && (
          <InfoBlock title="Our Commitment:">
            <p className="text-lg leading-7 text-gray-600">
              {member.commitment}
            </p>
          </InfoBlock>
        )}

        {/* AIA Family Member */}
        {(familyMember.name ||
          familyMember.email ||
          familyMember.phone ||
          familyMember.designation ||
          familyMember.organization) && (
          <div className="border-b border-gray-100 py-5">
            <h3 className="mb-4 text-lg font-bold text-[#263247]">
              AIA Family Member
            </h3>

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              {/* Person Details */}
              <div className="space-y-2">
                {familyMember.name && (
                  <p className="text-sm font-semibold text-[#263247]">
                    {familyMember.name}

                    {familyMember.designation && (
                      <span className="ml-1 text-xs font-normal text-[#E87565]">
                        ({familyMember.designation})
                      </span>
                    )}
                  </p>
                )}

                {familyMember.organization && (
                  <p className="text-xs leading-6 text-gray-600">
                    {familyMember.organization}
                  </p>
                )}
              </div>

              {/* Contact Details */}
              <div className="space-y-3 sm:text-right">
                {familyMember.email && (
                  <a
                    href={`mailto:${familyMember.email}`}
                    className="flex items-center gap-2 text-xs text-[#263247] transition-colors hover:text-[#E87565] sm:justify-end"
                  >
                    <Mail size={14} />
                    {familyMember.email}
                  </a>
                )}

                {familyMember.phone && (
                  <a
                    href={`tel:${familyMember.phone.replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-2 text-xs text-[#263247] transition-colors hover:text-[#E87565] sm:justify-end"
                  >
                    <Phone size={14} />
                    Tel: {familyMember.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Previous / Next Member */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Previous */}
          {previousMember ? (
            <Link
  to={`/membership/member-directory/${previousMember.slug}`}
  className="group flex min-h-[100px] flex-col justify-center rounded-md border border-gray-200 bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#E87565] hover:bg-[#FFF9F8] hover:shadow-md sm:px-7"
>
              <div className="mb-2 flex items-center gap-2 text-[#E87565]">
                <ArrowLeft
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
                <span className="text-xs font-medium">Previous</span>
              </div>

              <h4 className="text-sm font-semibold text-[#263247]">
                {previousMember.name}
              </h4>

              <p className="mt-1 text-[10px] text-gray-500">
                {previousMember.category}
              </p>
            </Link>
          ) : (
            <div />
          )}

          {/* Next */}
          {nextMember && (
           <Link
  to={`/membership/member-directory/${nextMember.slug}`}
  className="group flex min-h-[100px] flex-col items-start justify-center rounded-md border border-gray-200 bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#E87565] hover:bg-[#FFF9F8] hover:shadow-md sm:items-end sm:px-7 sm:text-right"
>
              <div className="mb-2 flex items-center gap-2 text-[#E87565]">
                <span className="text-xs font-medium">Next</span>
                <ArrowRight size={15} />
              </div>

              <h4 className="text-sm font-semibold text-[#263247]">
                {nextMember.name}
              </h4>

              <p className="mt-1 text-[10px] text-gray-500">
                {nextMember.category}
              </p>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
