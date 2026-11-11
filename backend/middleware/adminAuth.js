// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.js";

// export const adminAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Admin authentication required.",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(
//       token,
//       process.env.ADMIN_JWT_SECRET
//     );

//     const admin = await Admin.findOne({
//       _id: decoded.id,
//       isActive: true,
//     });

//     if (!admin) {
//       return res.status(401).json({
//         success: false,
//         message: "Admin account is inactive or unavailable.",
//       });
//     }

//     req.admin = admin;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired admin session.",
//     });
//   }
// };



import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Admin authentication required.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Admin token missing.",
      });
    }

    if (!process.env.ADMIN_JWT_SECRET) {
      console.error("ADMIN_JWT_SECRET is not configured.");

      return res.status(500).json({
        success: false,
        message: "Authentication configuration error.",
      });
    }

    // Verify JWT signature and expiration
    const decoded = jwt.verify(
      token,
      process.env.ADMIN_JWT_SECRET
    );

    // Find active admin
    const admin = await Admin.findOne({
      _id: decoded.id,
      isActive: true,
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account is inactive or unavailable.",
      });
    }

    // Verify token version
    if (
  decoded.tokenVersion !== (admin.tokenVersion ?? 0)
) {
  return res.status(401).json({
    success: false,
    message: "Admin session has been revoked. Please login again.",
  });
}

    req.admin = admin;

    return next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Admin session expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid admin token.",
      });
    }

    console.error("Admin Authentication Error:", error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};
