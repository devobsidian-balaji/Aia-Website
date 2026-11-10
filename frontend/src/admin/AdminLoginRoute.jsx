
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AdminLogin from "./AdminLogin.jsx";
import { verifyAdmin } from "../services/adminAuth.js";

export default function AdminLoginRoute() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      const admin = await verifyAdmin();

      if (active) {
        setStatus(admin ? "authenticated" : "unauthenticated");
      }
    };

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-9 h-9 border-4 border-[#E25238] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "authenticated") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <AdminLogin />;
}
