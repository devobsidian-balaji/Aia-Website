import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { loginAdmin } from "../services/adminAuth";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await loginAdmin(email, password);

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F5F8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-[#10263B] px-8 py-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#E25238] flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-9 h-9 text-white" />
            </div>

            <h1 className="text-2xl font-black text-white mt-5">
              AIA Command CMS
            </h1>

            <p className="text-sm text-slate-300 mt-2">
              Secure Administrator Access
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-7 sm:p-9">
            <div className="mb-7">
              <h2 className="text-xl font-bold text-[#172B40]">
                Admin Login
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Sign in to manage your AIA website.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  autoComplete="username"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 outline-none focus:border-[#E25238] focus:ring-2 focus:ring-[#E25238]/10"
                  required
                />
              </div>
            </div>

            <div className="mb-7">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-12 pl-12 pr-12 rounded-xl border border-gray-200 outline-none focus:border-[#E25238] focus:ring-2 focus:ring-[#E25238]/10"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-[#E25238] hover:bg-[#c9432d] disabled:opacity-60 text-white font-bold flex items-center justify-center gap-2 transition"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-7">
              Authorized AIA administrators only.
            </p>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          AIA Smart Manufacturing Hub
        </p>
      </div>
    </div>
  );
}