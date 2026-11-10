// const mongoose = require("mongoose");

// const formSubmissionSchema = new mongoose.Schema(
//   {
//     formType: {
//       type: String,
//       required: true,
//       enum: [
//         "contact_us",
//         "get_enquiry",
//         "membership",
//         "ecosystem_registration",
//       ],
//     },

//     registrationType: {
//       type: String,
//       enum: [
//         "system_integrator",
//         "technology_provider",
//         null,
//       ],
//       default: null,
//     },

//     fullName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       trim: true,
//       lowercase: true,
//     },

//     phone: {
//       type: String,
//       default: "",
//     },

//     companyName: {
//       type: String,
//       default: "",
//     },

//     formData: {
//       type: mongoose.Schema.Types.Mixed,
//       default: {},
//     },

//     pageUrl: {
//       type: String,
//       default: "",
//     },

//     status: {
//       type: String,
//       enum: ["new", "contacted", "in_progress", "closed"],
//       default: "new",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model(
//   "FormSubmission",
//   formSubmissionSchema
// );



import mongoose from "mongoose";

const FORM_TYPES = [
  "contact-us",
  "general-inquiry",
  "aia-membership",
  "system-integrator",
  "technology-provider",
];

const formSubmissionSchema = new mongoose.Schema(
  {
    formType: {
      type: String,
      required: true,
      enum: FORM_TYPES,
      index: true,
    },

    // URL/page from which the form was submitted
    sourcePage: {
      type: String,
      trim: true,
      default: "",
    },

    // Stores the complete original form payload
    // so no form-specific fields are lost.
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
      index: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

formSubmissionSchema.index({ formType: 1, createdAt: -1 });

const FormSubmission = mongoose.model(
  "FormSubmission",
  formSubmissionSchema
);

export { FORM_TYPES };
export default FormSubmission;
