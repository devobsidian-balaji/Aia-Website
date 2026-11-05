
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

    introduction: {
      type: String,
      default: "",
    },

    // Repeatable content sections
    sections: {
      type: [publicationSectionSchema],
      default: [],
    },

    // Closing content
    closingTitle: {
      type: String,
      default: "",
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