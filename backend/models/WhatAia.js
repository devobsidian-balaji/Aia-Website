
import mongoose from "mongoose";

const whatAiaCardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    imageAlt: {
      type: String,
      default: "",
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

const whatAiaSchema = new mongoose.Schema(
  {
    sectionKey: {
      type: String,
      default: "home-what-aia",
      unique: true,
      immutable: true,
    },
    heading: {
      type: String,
      default: "What AIA does",
      trim: true,
    },
    subtitle: {
      type: String,
      default:
        "AIA brings together players who build, sell, integrate, deploy and maintain the technology infrastructure around automation in India, ensuring the sector grows around shared standards, shared skills, and a shared voice with policymakers.",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    cards: {
      type: [whatAiaCardSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const WhatAia =
  mongoose.models.WhatAia ||
  mongoose.model("WhatAia", whatAiaSchema);
