
import mongoose from "mongoose";

const stickyStackItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    number: {
      type: Number,
      default: 1,
    },
    background: {
      type: String,
      default: "bg-[#202B3B]",
    },
    textColor: {
      type: String,
      default: "text-white",
    },
    numberColor: {
      type: String,
      default: "text-white",
    },
    titleClassName: {
      type: String,
      default: "",
    },
    descriptionClassName: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const stickyStackSectionSchema = new mongoose.Schema(
  {
    pageKey: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    sectionKey: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    heading: {
      type: String,
      default: "",
      trim: true,
    },
    subtitle: {
      type: String,
      default: "",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    items: {
      type: [stickyStackItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// A unique document for each page + section combination.
stickyStackSectionSchema.index(
  { pageKey: 1, sectionKey: 1 },
  { unique: true }
);

const StickyStackSection =
  mongoose.models.StickyStackSection ||
  mongoose.model("StickyStackSection", stickyStackSectionSchema);

export default StickyStackSection;
