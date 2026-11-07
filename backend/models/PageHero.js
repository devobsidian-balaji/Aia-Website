import mongoose from "mongoose";

const pageHeroSchema = new mongoose.Schema(
  {
    pageKey: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "about-aia",
        "membership",
        "industry-insight",
        "talent-connect",
        "events",
        "contact-us",
        "iafsm",
      ],
    },

    pageName: {
      type: String,
      required: true,
    },

    bannerImage: {
      type: String,
      default: "",
    },

    // Cloudinary asset ID
    bannerImagePublicId: {
      type: String,
      default: "",
    },

    heading: {
      type: String,
      default: "",
      trim: true,
    },

    overlayOpacity: {
      type: Number,
      default: 85,
      min: 0,
      max: 100,
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

const PageHero =
  mongoose.models.PageHero ||
  mongoose.model("PageHero", pageHeroSchema);

export default PageHero;