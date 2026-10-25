
import mongoose from "mongoose";

const sliderCardSchema = new mongoose.Schema(
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
      default: "Read More",
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

const sliderSectionSchema = new mongoose.Schema(
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
    intro: {
      eyebrow: { type: String, default: "" },
      title: { type: String, default: "" },
      color: { type: String, default: "bg-[#E52B18]" },
      enabled: { type: Boolean, default: true },
    },
    visibleSlides: {
      type: Number,
      default: 3,
      min: 1,
      max: 6,
    },
    accentColor: {
      type: String,
      default: "#E96F62",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    cards: {
      type: [sliderCardSchema],
      default: [],
    },
  },
  { timestamps: true }
);

sliderSectionSchema.index(
  { pageKey: 1, sectionKey: 1 },
  { unique: true }
);

export const SliderSection =
  mongoose.models.SliderSection ||
  mongoose.model("SliderSection", sliderSectionSchema);
