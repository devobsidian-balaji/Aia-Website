
import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    // Validate environment variables first
    if (!mongoUri) {
      throw new Error("MONGODB_URI is missing in backend/.env");
    }

    if (!name || !email || !password || password.length < 8) {
      throw new Error(
        "Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD (minimum 8 characters) in .env"
      );
    }

    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");

    // Check existing admin
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log(`Admin already exists: ${email}`);
      return;
    }

    // Create Super Admin
    const admin = await Admin.create({
      name,
      email,
      password,
      role: "super-admin",
      isActive: true,
    });

    console.log("Super Admin created successfully!");
    console.log("Email:", admin.email);
    console.log("Admin ID:", admin._id);

  } catch (error) {
    console.error("Admin Seeder Error:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
};

createAdmin();
