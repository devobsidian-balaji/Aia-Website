
import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <section className="min-h-[75vh] flex items-center justify-center px-5 py-20 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm font-bold tracking-[0.3em] text-blue-600 uppercase mb-4">
          Page Not Found
        </p>

        <h1 className="text-8xl md:text-9xl font-extrabold text-slate-900 leading-none">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-6">
          Oops! This Page Doesn't Exist.
        </h2>

        <p className="text-slate-500 text-base md:text-lg mt-4 max-w-lg mx-auto">
          The page you are looking for may have been moved, deleted,
          or the URL may be incorrect.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            to="/search"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition"
          >
            <Search size={18} />
            Search Website
          </Link>
        </div>

        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 mt-8 text-sm text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
      </div>
    </section>
  );
};

export default NotFound;
