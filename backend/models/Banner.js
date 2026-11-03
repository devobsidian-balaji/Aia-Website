// import mongoose from 'mongoose';

// const bannerSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   imageUrl: {
//     type: String,
//     required: true,
//   },
//   isActive: {
//     type: Boolean,
//     default: true,
//   },
//   order: {
//     type: Number,
//     default: 0,
//   }
// }, {
//   timestamps: true,
// });

// export const Banner = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);

import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Home Hero",
      trim: true,
    },
    title: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      required: true,
    },
    ctaPrimaryText: {
      type: String,
      default: "Become a Member",
    },
    ctaPrimaryUrl: {
      type: String,
      default: "#membership",
    },
    ctaSecondaryText: {
      type: String,
      default: "Explore Smart Factory",
    },
    ctaSecondaryUrl: {
      type: String,
      default: "#build-factory",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Banner =
  mongoose.models.Banner || mongoose.model("Banner", bannerSchema);