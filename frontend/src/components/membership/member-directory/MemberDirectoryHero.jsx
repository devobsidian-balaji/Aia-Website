
import React from "react";

export default function MemberDirectoryHero({ members = [] }) {
  const featuredMembers = members.slice(0, 2);

  return (
    <section className="relative overflow-hidden bg-[#20466C] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(100,155,205,0.55),transparent_55%)]" />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto flex max-w-[1240px] flex-col justify-between gap-8 px-6 py-12 sm:flex-row sm:items-center sm:px-8 lg:px-12 lg:py-16">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            Membership
          </p>

          <h1 className="max-w-md text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Our Member
            <br />
            Directory
          </h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          {featuredMembers.map((member) => (
            <a
              key={member.id}
              href={`/membership/member-directory/${member.slug}`}
              className="flex h-[130px] w-[130px] items-center justify-center border border-[#E87565] bg-white transition-transform duration-300 hover:-translate-y-1 sm:h-[130px] sm:w-[130px]"
            >
              <img
                src={member.logo}
                alt={member.name}
                loading="lazy"
                className="max-h-full max-w-full w-full h-full object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
