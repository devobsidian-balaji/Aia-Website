// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { verifyAdmin } from "../services/adminAuth";

// export default function ProtectedAdminRoute() {
//   const [admin, setAdmin] = useState(null);
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     let active = true;

//     verifyAdmin()
//       .then((result) => {
//         if (active) setAdmin(result);
//       })
//       .finally(() => {
//         if (active) setChecking(false);
//       });

//     return () => {
//       active = false;
//     };
//   }, []);

//   if (checking) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
//         <div className="text-center">
//           <div className="w-9 h-9 border-4 border-[#E25238] border-t-transparent rounded-full animate-spin mx-auto" />
//           <p className="text-sm text-gray-500 mt-4">
//             Verifying admin access...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!admin) {
//     return <Navigate to="/admin" replace />;
//   }

//   return <Outlet />;
// }



import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { verifyAdmin } from "../services/adminAuth.js";

export default function ProtectedAdminRoute() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let isMounted = true;

    const checkAdmin = async () => {
      try {
        const admin = await verifyAdmin();

        if (isMounted) {
          setStatus(admin ? "authenticated" : "unauthenticated");
        }
      } catch (error) {
        if (isMounted) {
          setStatus("unauthenticated");
        }
      }
    };

    checkAdmin();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-9 h-9 border-4 border-[#E25238] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">
            Verifying administrator access...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
