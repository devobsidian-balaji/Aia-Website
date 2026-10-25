
import mongoose from "mongoose";

const whyJoinItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      default: "",
      trim: true,
    },
    link: {
      type: String,
      default: "",
      trim: true,
    },
    linkText: {
      type: String,
      default: "Learn More",
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const whyJoinSectionSchema = new mongoose.Schema(
  {
    pageKey: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    sectionKey: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    heading: {
      type: String,
      default: "Why Join",
      trim: true,
    },
    subtitle: {
      type: String,
      default: "",
      trim: true,
    },
    lineColor: {
      type: String,
      default: "#FF6B5F",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    items: {
      type: [whyJoinItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

whyJoinSectionSchema.index(
  { pageKey: 1, sectionKey: 1 },
  { unique: true }
);

export const WhyJoinSection =
  mongoose.models.WhyJoinSection ||
  mongoose.model("WhyJoinSection", whyJoinSectionSchema);
