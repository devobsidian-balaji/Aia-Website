// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://aiaindiaautomation_db_user:aiaindianautomationm@cluster0.yfr41k2.mongodb.net/aia_db?retryWrites=true&w=majority&appName=Cluster0';

// export async function connectDB() {
//   try {
//     const conn = await mongoose.connect(MONGODB_URI, {
//       serverSelectionTimeoutMS: 8000,
//     });
//     console.log(`[MongoDB Connected]: ${conn.connection.host}`);
//     return conn;
//   } catch (error) {
//     console.error(`[MongoDB Connection Error]: ${error.message}`);
//   }
// }



import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from backend/.env");
    }

    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });

    console.log(
      `[MongoDB Connected]: ${conn.connection.host}`
    );

    return conn;
  } catch (error) {
    console.error(
      `[MongoDB Connection Error]: ${error.message}`
    );

    // Important: Pass the error to server.js
    throw error;
  }
}
