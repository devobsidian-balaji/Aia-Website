
// import mongoose from "mongoose";

// const newsSchema = new mongoose.Schema(
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
//     content: {
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
//     publishedAt: {
//       type: String,
//       default: "",
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

// export const News =
//   mongoose.models.News ||
//   mongoose.model("News", newsSchema);


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
    imagePublicId: {
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

// Legacy News sections
const publicationSectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: "",
      trim: true,
    },
    paragraphs: {
      type: [String],
      default: [],
    },
    bullets: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
    imagePublicId: {
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

const newsSchema = new mongoose.Schema(
  {
    // Basic information
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
    imagePublicId: {
      type: String,
      default: "",
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

    // Hero section
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
    detailHeroImagePublicId: {
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

    // Current introduction structure
    introductionTitle: {
      type: String,
      default: "Introduction",
    },
    introductionParagraphs: {
      type: [String],
      default: [],
    },

    // Current ordered content blocks
    contentBlocks: {
      type: [contentBlockSchema],
      default: [],
    },

    // Current closing structure
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

    // Legacy fields (preserved)
    introduction: {
      type: String,
      default: "",
    },
    sections: {
      type: [publicationSectionSchema],
      default: [],
    },
    closingContent: {
      type: String,
      default: "",
    },

    // Publication information
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
  {
    timestamps: true,
  }
);

export const News =
  mongoose.models.News ||
  mongoose.model("News", newsSchema);