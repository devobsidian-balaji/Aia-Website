
export default function SliderIntroCard({
  eyebrow = "",
  title = "",
  color = "bg-[#E52B18]",
  mobile = false,
}) {
  return (
    <article
      className={`relative flex w-full flex-col justify-between overflow-hidden rounded-[5px] p-5 text-white sm:p-6 lg:p-7 xl:p-8 ${
        mobile
          ? "min-h-[240px] sm:min-h-[280px]"
          : "min-h-[315px] sm:min-h-[350px] lg:min-h-[420px] xl:min-h-[450px]"
      } ${color}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:25px_25px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-white/30 blur-[70px]"
      />

      {eyebrow && (
        <p className="relative z-10 text-sm font-medium sm:text-base lg:text-[17px]">
          {eyebrow}
        </p>
      )}

      <h2 className="relative z-10 max-w-[300px] text-[23px] font-medium leading-[1.18] tracking-[-0.025em] sm:text-[26px] lg:text-[28px] xl:text-[30px]">
        {title}
      </h2>
    </article>
  );
}
