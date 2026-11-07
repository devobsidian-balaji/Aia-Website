
// export default function HomeFeatureCard({ item, index }) {
//   const reverse = index % 2 === 1;

//   return (
//     <article
//       className={`group grid items-center gap-7 py-7 md:gap-10 md:py-8 lg:grid-cols-2 lg:gap-12 ${
//         reverse ? "lg:[&>*:first-child]:order-2" : ""
//       }`}
//     >
//       <div className="overflow-hidden rounded-md border-4 border-white shadow-lg">
//         <img
//           src={item.imageUrl}
//           alt={item.imageAlt || item.title}
//           loading="lazy"
//           className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
//         />
//       </div>

//       <div className="text-white">
//         <h3 className="max-w-xl text-xl font-semibold leading-snug sm:text-2xl">
//           {item.title}
//         </h3>

//         <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-50/90">
//           {item.description}
//         </p>

//         {item.link && (
//           <a
//             href={item.link}
//             className={`mt-5 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
//               reverse
//                 ? "border-white/70 text-white hover:bg-white hover:text-slate-900"
//                 : "border-white bg-white text-slate-900 hover:bg-blue-50"
//             }`}
//           >
//             {item.linkText || "Learn More"}
//             <span aria-hidden="true">→</span>
//           </a>
//         )}
//       </div>
//     </article>
//   );
// }



const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const BACKEND_URL = API_URL.replace(/\/api\/?$/, "");

function getImageUrl(url) {
  if (!url) return "";

  if (/^(https?:\/\/|data:|blob:)/i.test(url)) {
    return url;
  }

  if (url.startsWith("/uploads/")) {
    return `${BACKEND_URL}${url}`;
  }

  return url;
}

export default function HomeFeatureCard({ item, index }) {
  const reverse = index % 2 === 1;

  return (
    <article
      className={`group grid items-center gap-7 py-7 md:gap-10 md:py-8 lg:grid-cols-2 lg:gap-12 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* IMAGE */}

      <div className="overflow-hidden rounded-md border-4 border-white shadow-lg">
        <img
        src={getImageUrl(item.imageUrl)}
        alt={item.imageAlt || item.title}
        loading="lazy"
        className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {/* <img
          src={getImageUrl(item.imageUrl)}
          alt={item.imageAlt || item.title}
          loading="lazy"
          onError={(event) => {
            console.error(
              "Home Feature Image Error:",
              event.currentTarget.src
            );
          }}
          className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        /> */}
      </div>

      {/* CONTENT */}

      <div className="text-white">
        <h3 className="max-w-xl text-xl font-semibold leading-snug sm:text-2xl">
          {item.title}
        </h3>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-50/90">
          {item.description}
        </p>

        {item.link && (
          <a
            href={item.link}
            className={`mt-5 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
              reverse
                ? "border-white/70 text-white hover:bg-white hover:text-slate-900"
                : "border-white bg-white text-slate-900 hover:bg-blue-50"
            }`}
          >
            {item.linkText || "Learn More"}
            <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </article>
  );
}
