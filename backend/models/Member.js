
import mongoose from "mongoose";

// ==========================================
// IMAGE SCHEMA
// ==========================================

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

// ==========================================
// SERVICE SCHEMA
// ==========================================

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: "",
  },

  description: {
    type: String,
    default: "",
  },

  image: {
    type: imageSchema,
    default: () => ({}),
  },
});

// ==========================================
// AIA FAMILY MEMBER SCHEMA
// ==========================================

const familyMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },

    designation: {
      type: String,
      trim: true,
      default: "",
    },

    organization: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

// ==========================================
// MEMBER SCHEMA
// ==========================================

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    shortName: {
      type: String,
      trim: true,
      default: "",
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
      default: "",
    },

    logo: {
      type: imageSchema,
      default: () => ({}),
    },

    coverLogo: {
      type: imageSchema,
      default: () => ({}),
    },

    about: {
      type: String,
      default: "",
    },

    services: {
      type: [serviceSchema],
      default: [],
    },

    mission: {
      type: String,
      default: "",
    },

    vision: {
      type: String,
      default: "",
    },

    qualityPolicy: {
      type: String,
      default: "",
    },

    qualityObjectives: {
      type: [String],
      default: [],
    },

    commitment: {
      type: String,
      default: "",
    },

    // AIA Family Member details
    familyMember: {
      type: familyMemberSchema,
      default: () => ({}),
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// TEXT INDEX
// ==========================================

memberSchema.index({
  name: "text",
  shortName: "text",
  category: "text",
});

// ==========================================
// EXPORT MODEL
// ==========================================

const Member = mongoose.model("Member", memberSchema);

export default Member;
