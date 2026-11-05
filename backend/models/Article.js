
// import mongoose from "mongoose";

// const articleSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     imageAlt: {
//       type: String,
//       default: "",
//     },
//     category: {
//       type: String,
//       default: "",
//       trim: true,
//     },
//     categoryLink: {
//       type: String,
//       default: "",
//     },
//     introduction: {
//       type: String,
//       default: "",
//     },
//     detailCoverImage: {
//       type: String,
//       default: "",
//     },
//     author: {
//       type: String,
//       default: "",
//     },
//     sections: {
//       type: [mongoose.Schema.Types.Mixed],
//       default: [],
//     },
//     order: {
//       type: Number,
//       default: 0,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// export const Article =
//   mongoose.models.Article ||
//   mongoose.model("Article", articleSchema);

import mongoose from "mongoose";

const contentBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["heading", "paragraph", "bulletList", "image"],
      required: true,
    },

    text: {
      type: String,
      default: "",
    },

    items: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: "",
    },

    imageAlt: {
      type: String,
      default: "",
    },

    caption: {
      type: String,
      default: "",
    },
  },
  { _id: true }
);

const articleSchema = new mongoose.Schema(
  {
    // Listing
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

    // SplitFeatureCard hero
    detailHeroTitle: {
      type: String,
      default: "",
    },

    detailHeroDescription: {
      type: String,
      default: "",
    },

    detailHeroImage: {
      type: String,
      default: "",
    },

    detailHeroImageAlt: {
      type: String,
      default: "",
    },

    // Main detail heading
    detailTitle: {
      type: String,
      default: "",
    },

    detailSubtitle: {
      type: String,
      default: "",
    },

    // Introduction
    introductionTitle: {
      type: String,
      default: "Introduction",
    },

    introductionParagraphs: {
      type: [String],
      default: [],
    },

    // Ordered content blocks
    contentBlocks: {
      type: [contentBlockSchema],
      default: [],
    },

    // Final section
    closingTitle: {
      type: String,
      default: "",
    },

    closingParagraphs: {
      type: [String],
      default: [],
    },

    closingBullets: {
      type: [String],
      default: [],
    },

    // Author
    author: {
      type: String,
      default: "",
    },

    publishedAt: {
      type: String,
      default: "",
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