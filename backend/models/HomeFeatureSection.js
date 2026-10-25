
import mongoose from "mongoose";

const homeFeatureItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    imageAlt: { type: String, default: "" },
    link: { type: String, default: "" },
    linkText: { type: String, default: "Learn More" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const homeFeatureSectionSchema = new mongoose.Schema(
  {
    pageKey: {
      type: String,
      default: "home",
      unique: true,
    },
    heading: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    items: { type: [homeFeatureItemSchema], default: [] },
  },
  { timestamps: true }
);

const homeFeatureSection =
  mongoose.models.homeFeatureSection ||
  mongoose.model("homeFeatureSection", homeFeatureSectionSchema);

export default homeFeatureSection;
