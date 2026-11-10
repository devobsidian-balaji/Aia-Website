import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// const generateToken = (admin) => {
//   return jwt.sign(
//     {
//       id: admin._id.toString(),
//       role: admin.role,
//     },
//     process.env.ADMIN_JWT_SECRET,
//     { expiresIn: "8h" }
//   );
// };

const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id.toString(),
      role: admin.role,
      tokenVersion: admin.tokenVersion,
    },
    process.env.ADMIN_JWT_SECRET,
    { expiresIn: "8h" }
  );
};

// POST /admin-auth/login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const admin = await Admin.findOne({
      email: String(email).trim().toLowerCase(),
    }).select("+password");

    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to login. Please try again.",
    });
  }
};

// GET /admin-auth/me
export const getCurrentAdmin = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      admin: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch admin details.",
    });
  }
};

// POST /admin-auth/logout
export const adminLogout = async (req, res) => {
  try {
    await Admin.findByIdAndUpdate(req.admin._id, {
      $inc: { tokenVersion: 1 },
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed.",
    });
  }
};