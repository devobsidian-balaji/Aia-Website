
import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    // New dropdown fields
    category: {
      type: String,
      required: true,
      enum: [
        "Manufacturing Sector",
        "Technology Stream",
        "Service Stream",
      ],
      trim: true,
    },

    selectedOption: {
      type: String,
      required: true,
      trim: true,
    },

    // Legacy fields: existing admin compatibility
    ecosystem: {
      type: String,
      trim: true,
      default: "",
    },

    manufacturingSector: {
      type: String,
      trim: true,
      default: "",
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    companyName: {
      type: String,
      trim: true,
      default: "",
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
