// import mongoose from "mongoose";

// const partnerSchema = new mongoose.Schema(
//   {
//     name: { type: String, trim: true, default: "" },
//     logo: { type: String, default: "" },
//     logoPublicId: { type: String, default: "" },
//   },
//   { _id: true }
// );

// const introductionSectionSchema = new mongoose.Schema(
//   {
//     heading: { type: String, trim: true, default: "" },
//     paragraphs: [{ type: String, trim: true }],
//     bullets: [{ type: String, trim: true }],
//   },
//   { _id: true }
// );

// const agendaItemSchema = new mongoose.Schema(
//   {
//     title: { type: String, trim: true, default: "" },
//     link: { type: String, trim: true, default: "" },
//     external: { type: Boolean, default: false },
//   },
//   { _id: true }
// );

// const eventSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//       maxlength: 70,
//     },

//     slug: {
//       type: String,
//       unique: true,
//       index: true,
//     },

//     description: {
//       type: String,
//       default: "",
//       trim: true,
//       maxlength: 220,
//     },

//     imageUrl: {
//       type: String,
//       required: true,
//     },

//     imagePublicId: {
//       type: String,
//       default: "",
//     },

//     eventLink: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     date: {
//       type: String,
//       default: "",
//       trim: true,
//       maxlength: 50,
//     },

//     category: {
//       type: String,
//       default: "Conference",
//       enum: [
//         "Conference",
//         "Workshops",
//         "Webinars",
//         "Training Program",
//         "Exhibitions",
//       ],
//     },

//     detailPage: {
//       hero: {
//         eyebrow: { type: String, default: "" },
//         title: { type: String, default: "" },
//         description: { type: String, default: "" },
//         imageUrl: { type: String, default: "" },
//         imagePublicId: { type: String, default: "" },
//         imageAlt: { type: String, default: "" },
//         imagePosition: {
//           type: String,
//           enum: ["left", "right"],
//           default: "right",
//         },
//         background: {
//           type: String,
//           enum: ["dark", "light"],
//           default: "dark",
//         },
//       },

//       introduction: {
//         title: { type: String, default: "Introduction" },

//         sections: [introductionSectionSchema],

//         eventInfo: {
//           date: { type: String, default: "" },
//           title: { type: String, default: "" },
//           venue: { type: String, default: "" },
//           time: { type: String, default: "" },
//           saveDateLink: { type: String, default: "" },
//           registrationLink: { type: String, default: "" },
//           locationLink: { type: String, default: "" },
//         },

//         partners: [partnerSchema],
//         supporters: [partnerSchema],

//         contact: {
//           email: { type: String, default: "" },
//           phone: { type: String, default: "" },
//           website: { type: String, default: "" },
//         },
//       },

//       agenda: {
//         title: { type: String, default: "" },
//         imageUrl: { type: String, default: "" },
//         imagePublicId: { type: String, default: "" },
//         imageAlt: { type: String, default: "" },
//         items: [agendaItemSchema],
//       },

//       // DynamicContentSection is kept untouched.
//       contentSections: {
//         type: mongoose.Schema.Types.Mixed,
//         default: [],
//       },
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

// eventSchema.pre("validate", function () {
//   if (this.title && !this.slug) {
//     this.slug = this.title
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/^-|-$/g, "");
//   }
// });

// export const Event =
//   mongoose.models.Event || mongoose.model("Event", eventSchema);


import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "" },
    logo: { type: String, default: "" },
    logoPublicId: { type: String, default: "" },
  },
  { _id: true }
);

const introductionSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true, default: "" },
    paragraphs: [{ type: String, trim: true }],
    bullets: [{ type: String, trim: true }],
  },
  { _id: true }
);

const agendaItemSchema = new mongoose.Schema(
  {
    time: { type: String, default: "" },
    title: { type: String, trim: true, default: "" },
    description: { type: String, default: "" },
    link: { type: String, trim: true, default: "" },
    external: { type: Boolean, default: false },
  },
  { _id: true }
);

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 70,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 220,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    imagePublicId: {
      type: String,
      default: "",
    },

    eventLink: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      default: "",
      trim: true,
      maxlength: 50,
    },

    category: {
      type: String,
      default: "Conference",
      enum: [
        "Conference",
        "Workshops",
        "Webinars",
        "Training Program",
        "Exhibitions",
      ],
    },

    detailPage: {
      hero: {
        eyebrow: { type: String, default: "" },
        title: { type: String, default: "" },
        subtitle: { type: String, default: "" },
        description: { type: String, default: "" },
        imageUrl: { type: String, default: "" },
        imagePublicId: { type: String, default: "" },
        imageAlt: { type: String, default: "" },
        imagePosition: {
          type: String,
          enum: ["left", "right"],
          default: "right",
        },
        background: {
          type: String,
          enum: ["dark", "light"],
          default: "dark",
        },
      },

      introduction: {
        eyebrow: { type: String, default: "" },
        title: { type: String, default: "Introduction" },
        description: { type: String, default: "" },

        // Supports paragraph, heading, list and image blocks.
        blocks: {
          type: [mongoose.Schema.Types.Mixed],
          default: [],
        },

        // Legacy fields retained for existing event records.
        sections: [introductionSectionSchema],

        eventInfo: {
          date: { type: String, default: "" },
          title: { type: String, default: "" },
          venue: { type: String, default: "" },
          time: { type: String, default: "" },

          // Calendar fields
  startDateTime: { type: String, default: "" },
  endDateTime: { type: String, default: "" },
  
          saveDateLink: { type: String, default: "" },
          registrationLink: { type: String, default: "" },
          locationLink: { type: String, default: "" },
        },

        partners: [partnerSchema],
        supporters: [partnerSchema],

        contact: {
          email: { type: String, default: "" },
          phone: { type: String, default: "" },
          website: { type: String, default: "" },
        },
      },

      agenda: {
        eyebrow: { type: String, default: "" },
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        imageUrl: { type: String, default: "" },
        imagePublicId: { type: String, default: "" },
        imageAlt: { type: String, default: "" },
        items: {
          type: [agendaItemSchema],
          default: [],
        },
      },

      contentSections: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
      },
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

eventSchema.pre("validate", function () {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
});

export const Event =
  mongoose.models.Event || mongoose.model("Event", eventSchema);