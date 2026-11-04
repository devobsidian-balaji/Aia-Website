
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
      trim: true,
    },
    categoryLink: {
      type: String,
      default: "",
    },
    introduction: {
      type: String,
      default: "",
    },
    detailCoverImage: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
    sections: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
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

export const Article =
  mongoose.models.Article ||
  mongoose.model("Article", articleSchema);
