
// import Enquiry from "../models/Enquiry.js";
// import FormSubmission from "../models/FormSubmission.js";

// // =====================================================
// // CATEGORY OPTIONS
// // =====================================================

// const categoryOptions = {
//   "Manufacturing Sector": [
//     "Apparel",
//     "Automotive",
//     "Cement",
//     "Chemical",
//     "Defence Equipment Production",
//     "Electrical",
//     "Electronics",
//     "Fiber & Textiles",
//     "Food & Beverage",
//     "Household & Personal Care",
//     "Infrastructure Equipment",
//     "Life Sciences",
//     "Material Handling Equipment",
//     "Metals",
//     "Mining",
//     "Oil & Gas",
//     "Packaging Machinery",
//     "Plastics",
//     "Printing Machinery",
//     "Process Equipment",
//     "Production Machinery",
//     "Pulp & Paper",
//     "Railway Equipment",
//     "Rubber",
//     "Solar Energy Equipment",
//     "Textile",
//     "Wind Energy Equipment",
//     "OTHER (Custom)",
//   ],

//   "Technology Stream": [
//     "3D Printing",
//     "3D Simulation Software",
//     "Advanced Logic Control",
//     "Advanced Process Control",
//     "Cloud Computing Systems",
//     "Condition Monitoring",
//     "Digital Twin Software",
//     "Edge Computing Systems",
//     "Electrical Sensing and Actuation",
//     "Electro-Hydraulic Actuation",
//     "Electro-Pneumatic Actuation",
//     "Industrial IoT Software",
//     "Industrial Networking Systems",
//     "Intelligent Conveying Systems",
//     "Intelligent Packaging Systems",
//     "Intrusion Detection",
//     "Level, Temp, Pressure, Flow Sensing",
//     "Machine Learning Systems",
//     "Manufacturing Execution Systems",
//     "Material and Presence Sensing",
//     "Position and Safety Sensing",
//     "Precision Motion Control",
//     "Smart HMIs",
//     "Tracking and Tracing",
//     "Vision Sensing and Inspection",
//     "OTHER (Custom)",
//   ],

//   "Service Stream": [
//     "Process Reengineering Services",
//     "Automation Consulting Services",
//     "Digital Deployment Services",
//     "Automation Integration Services",
//     "Automation Software Development",
//     "Business Process App Development",
//     "Commissioning Services",
//     "Data Integration Services",
//     "Education & Skilling Services",
//     "Energy Audit Services",
//     "Field Installation Services",
//     "Maturity Assessment Services",
//     "Project Management Services",
//     "Quality Audit Services",
//     "Safety Assessment Services",
//     "Supply Chain Integration",
//     "OTHER (Custom)",
//   ],
// };

// // =====================================================
// // CREATE NEW ENQUIRY
// // =====================================================

// export const createEnquiry = async (req, res) => {
//   try {
//    const {
//   category,
//   selectedOption,
//   customOption,
//   fullName,
//   email,
//   companyName,
//   website,
//   phoneNumber,
//   message,
// } = req.body;

//     // Required field validation
//     if (
//       !category ||
//       !selectedOption ||
//       !fullName?.trim() ||
//       !email?.trim() ||
//       !companyName?.trim() ||
//       !website?.trim() ||
//       !phoneNumber?.trim()
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide all required fields.",
//       });
//     }

//     // Validate category
//     if (!categoryOptions[category]) {
//       return res.status(400).json({
//         success: false,
//         message: "Please select a valid category.",
//       });
//     }

//    // Validate selected option
// const isCustomOption = selectedOption === "OTHER (Custom)";

// if (isCustomOption) {
//   if (!customOption?.trim()) {
//     return res.status(400).json({
//       success: false,
//       message: "Please enter your custom option.",
//     });
//   }

//   if (customOption.trim().length < 2) {
//     return res.status(400).json({
//       success: false,
//       message: "Custom option must contain at least 2 characters.",
//     });
//   }

//   if (customOption.trim().length > 150) {
//     return res.status(400).json({
//       success: false,
//       message: "Custom option cannot exceed 150 characters.",
//     });
//   }
// } else {
//   if (!categoryOptions[category].includes(selectedOption)) {
//     return res.status(400).json({
//       success: false,
//       message: "Please select a valid option for this category.",
//     });
//   }
// }

//     // Validate full name
//     if (fullName.trim().length < 2) {
//       return res.status(400).json({
//         success: false,
//         message: "Full name must contain at least 2 characters.",
//       });
//     }

//     // Validate email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

//     if (!emailRegex.test(email.trim())) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide a valid email address.",
//       });
//     }

//     // Validate phone
//     const normalizedPhone = phoneNumber.replace(/[\s()-]/g, "");

//     if (!/^\+?[1-9]\d{6,14}$/.test(normalizedPhone)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide a valid phone number.",
//       });
//     }

//     // Validate website
//     let normalizedWebsite = website.trim();

//     if (!/^https?:\/\//i.test(normalizedWebsite)) {
//       normalizedWebsite = `https://${normalizedWebsite}`;
//     }

//     try {
//       const websiteUrl = new URL(normalizedWebsite);

//       if (
//         !["http:", "https:"].includes(websiteUrl.protocol) ||
//         !websiteUrl.hostname.includes(".")
//       ) {
//         throw new Error("Invalid website");
//       }
//     } catch {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide a valid website URL.",
//       });
//     }

//     // Save enquiry
//    const enquiry = await Enquiry.create({
//   category: category.trim(),
//   selectedOption: selectedOption.trim(),
//   customOption: isCustomOption ? customOption.trim() : "",

//   // Legacy fields for existing admin UI compatibility
//   ecosystem: category.trim(),
//   manufacturingSector: isCustomOption
//     ? customOption.trim()
//     : selectedOption.trim(),

//   fullName: fullName.trim(),
//   email: email.trim().toLowerCase(),
//   companyName: companyName.trim(),
//   website: normalizedWebsite,
//   phoneNumber: normalizedPhone,
//   message: message?.trim() || "",
// });

//     await FormSubmission.create({
//   formType: "general-inquiry",
//   sourcePage: req.headers.referer || "",
//   data: {
//     category: category.trim(),
//     selectedOption: selectedOption.trim(),
//     ecosystem: category.trim(),
//     manufacturingSector: isCustomOption
//   ? customOption.trim()
//   : selectedOption.trim(),
//     fullName: fullName.trim(),
//     email: email.trim().toLowerCase(),
//     companyName: companyName.trim(),
//     website: normalizedWebsite,
//     phoneNumber: normalizedPhone,
//     message: message?.trim() || "",
//     customOption: isCustomOption ? customOption.trim() : "",
//   },
// });

//     return res.status(201).json({
//       success: true,
//       message: "Your inquiry has been submitted successfully.",
//       data: enquiry,
//     });
//   } catch (error) {
//     console.error("Create Enquiry Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to submit enquiry.",
//       error: error.message,
//     });
//   }
// };

// // =====================================================
// // GET ALL ENQUIRIES
// // =====================================================

// export const getAllEnquiries = async (req, res) => {
//   try {
//     const enquiries = await Enquiry.find().sort({
//       createdAt: -1,
//     });

//     return res.status(200).json({
//       success: true,
//       count: enquiries.length,
//       data: enquiries,
//     });
//   } catch (error) {
//     console.error("Get Enquiries Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch enquiries.",
//     });
//   }
// };

// // =====================================================
// // GET SINGLE ENQUIRY
// // =====================================================

// export const getEnquiryById = async (req, res) => {
//   try {
//     const enquiry = await Enquiry.findById(req.params.id);

//     if (!enquiry) {
//       return res.status(404).json({
//         success: false,
//         message: "Enquiry not found.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: enquiry,
//     });
//   } catch (error) {
//     console.error("Get Enquiry Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch enquiry.",
//     });
//   }
// };

// // =====================================================
// // UPDATE ENQUIRY STATUS
// // =====================================================

// export const updateEnquiryStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     if (!["new", "contacted", "closed"].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid enquiry status.",
//       });
//     }

//     const enquiry = await Enquiry.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true, runValidators: true }
//     );

//     if (!enquiry) {
//       return res.status(404).json({
//         success: false,
//         message: "Enquiry not found.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Enquiry status updated successfully.",
//       data: enquiry,
//     });
//   } catch (error) {
//     console.error("Update Enquiry Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to update enquiry status.",
//     });
//   }
// };

// // =====================================================
// // DELETE ENQUIRY
// // =====================================================

// export const deleteEnquiry = async (req, res) => {
//   try {
//     const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

//     if (!enquiry) {
//       return res.status(404).json({
//         success: false,
//         message: "Enquiry not found.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Enquiry deleted successfully.",
//     });
//   } catch (error) {
//     console.error("Delete Enquiry Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete enquiry.",
//     });
//   }
// };



import Enquiry from "../models/Enquiry.js";
import FormSubmission from "../models/FormSubmission.js";

// =====================================================
// CATEGORY OPTIONS
// =====================================================

const categoryOptions = {
  "Manufacturing Sector": [
    "Apparel",
    "Automotive",
    "Cement",
    "Chemical",
    "Defence Equipment Production",
    "Electrical",
    "Electronics",
    "Fiber & Textiles",
    "Food & Beverage",
    "Household & Personal Care",
    "Infrastructure Equipment",
    "Life Sciences",
    "Material Handling Equipment",
    "Metals",
    "Mining",
    "Oil & Gas",
    "Packaging Machinery",
    "Plastics",
    "Printing Machinery",
    "Process Equipment",
    "Production Machinery",
    "Pulp & Paper",
    "Railway Equipment",
    "Rubber",
    "Solar Energy Equipment",
    "Textile",
    "Wind Energy Equipment",
    "OTHER (Custom)",
  ],

  "Technology Stream": [
    "3D Printing",
    "3D Simulation Software",
    "Advanced Logic Control",
    "Advanced Process Control",
    "Cloud Computing Systems",
    "Condition Monitoring",
    "Digital Twin Software",
    "Edge Computing Systems",
    "Electrical Sensing and Actuation",
    "Electro-Hydraulic Actuation",
    "Electro-Pneumatic Actuation",
    "Industrial IoT Software",
    "Industrial Networking Systems",
    "Intelligent Conveying Systems",
    "Intelligent Packaging Systems",
    "Intrusion Detection",
    "Level, Temp, Pressure, Flow Sensing",
    "Machine Learning Systems",
    "Manufacturing Execution Systems",
    "Material and Presence Sensing",
    "Position and Safety Sensing",
    "Precision Motion Control",
    "Smart HMIs",
    "Tracking and Tracing",
    "Vision Sensing and Inspection",
    "OTHER (Custom)",
  ],

  "Service Stream": [
    "Process Reengineering Services",
    "Automation Consulting Services",
    "Digital Deployment Services",
    "Automation Integration Services",
    "Automation Software Development",
    "Business Process App Development",
    "Commissioning Services",
    "Data Integration Services",
    "Education & Skilling Services",
    "Energy Audit Services",
    "Field Installation Services",
    "Maturity Assessment Services",
    "Project Management Services",
    "Quality Audit Services",
    "Safety Assessment Services",
    "Supply Chain Integration",
    "OTHER (Custom)",
  ],
};

// =====================================================
// CREATE NEW ENQUIRY
// =====================================================

export const createEnquiry = async (req, res) => {
  try {
    const {
      category,
      selectedOption,
      customOption,
      fullName,
      email,
      companyName,
      website,
      phoneNumber,
      message,
    } = req.body;

    // =================================================
    // REQUIRED FIELD VALIDATION
    // =================================================

    if (
      typeof category !== "string" ||
      typeof selectedOption !== "string" ||
      typeof fullName !== "string" ||
      typeof email !== "string" ||
      typeof companyName !== "string" ||
      typeof website !== "string" ||
      typeof phoneNumber !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    if (
      !category.trim() ||
      !selectedOption.trim() ||
      !fullName.trim() ||
      !email.trim() ||
      !companyName.trim() ||
      !website.trim() ||
      !phoneNumber.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // =================================================
    // CATEGORY VALIDATION
    // =================================================

    if (!categoryOptions[category]) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid category.",
      });
    }

    // =================================================
    // SELECTED OPTION VALIDATION
    // =================================================

    const isCustomOption = selectedOption === "OTHER (Custom)";

    if (!categoryOptions[category].includes(selectedOption)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid option for this category.",
      });
    }

    // =================================================
    // CUSTOM OPTION VALIDATION
    // =================================================

    let normalizedCustomOption = "";

    if (isCustomOption) {
      if (
        typeof customOption !== "string" ||
        !customOption.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Please enter your custom option.",
        });
      }

      normalizedCustomOption = customOption.trim();

      if (normalizedCustomOption.length < 2) {
        return res.status(400).json({
          success: false,
          message: "Custom option must contain at least 2 characters.",
        });
      }

      if (normalizedCustomOption.length > 150) {
        return res.status(400).json({
          success: false,
          message: "Custom option cannot exceed 150 characters.",
        });
      }
    }

    // =================================================
    // FULL NAME VALIDATION
    // =================================================

    const normalizedName = fullName.trim();

    if (normalizedName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Full name must contain at least 2 characters.",
      });
    }

    if (normalizedName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Full name cannot exceed 100 characters.",
      });
    }

    // =================================================
    // EMAIL VALIDATION
    // =================================================

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // =================================================
    // COMPANY NAME VALIDATION
    // =================================================

    const normalizedCompanyName = companyName.trim();

    if (normalizedCompanyName.length > 150) {
      return res.status(400).json({
        success: false,
        message: "Company name cannot exceed 150 characters.",
      });
    }

    // =================================================
    // PHONE NUMBER VALIDATION
    // =================================================

    const normalizedPhone = phoneNumber
      .trim()
      .replace(/[\s()-]/g, "");

    const phoneRegex = /^\+?[1-9]\d{6,14}$/;

    if (!phoneRegex.test(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number.",
      });
    }

    // =================================================
    // WEBSITE VALIDATION
    // =================================================

    let normalizedWebsite = website.trim();

    if (!/^https?:\/\//i.test(normalizedWebsite)) {
      normalizedWebsite = `https://${normalizedWebsite}`;
    }

    try {
      const websiteUrl = new URL(normalizedWebsite);

      const hostnameRegex =
        /^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/;

      if (
        !["http:", "https:"].includes(websiteUrl.protocol) ||
        !hostnameRegex.test(websiteUrl.hostname)
      ) {
        throw new Error("Invalid website");
      }
    } catch {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid website URL.",
      });
    }

    // =================================================
    // MESSAGE VALIDATION
    // =================================================

    const normalizedMessage =
      typeof message === "string" ? message.trim() : "";

    if (normalizedMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message cannot exceed 2000 characters.",
      });
    }

    // =================================================
    // SAVE ENQUIRY
    // =================================================

    const enquiry = await Enquiry.create({
      category: category.trim(),

      selectedOption: selectedOption.trim(),

      customOption: normalizedCustomOption,

      // Legacy fields for existing admin UI compatibility
      ecosystem: category.trim(),

      manufacturingSector: isCustomOption
        ? normalizedCustomOption
        : selectedOption.trim(),

      fullName: normalizedName,

      email: normalizedEmail,

      companyName: normalizedCompanyName,

      website: normalizedWebsite,

      phoneNumber: normalizedPhone,

      message: normalizedMessage,
    });

    // =================================================
    // SAVE FORM SUBMISSION
    // =================================================

    await FormSubmission.create({
      formType: "general-inquiry",

      sourcePage: req.headers.referer || "",

      data: {
        category: category.trim(),

        selectedOption: selectedOption.trim(),

        customOption: normalizedCustomOption,

        // Legacy fields for existing admin UI compatibility
        ecosystem: category.trim(),

        manufacturingSector: isCustomOption
          ? normalizedCustomOption
          : selectedOption.trim(),

        fullName: normalizedName,

        email: normalizedEmail,

        companyName: normalizedCompanyName,

        website: normalizedWebsite,

        phoneNumber: normalizedPhone,

        message: normalizedMessage,
      },
    });

    // =================================================
    // SUCCESS RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
      data: enquiry,
    });
  } catch (error) {
    console.error("Create Enquiry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit enquiry.",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL ENQUIRIES
// =====================================================

export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    console.error("Get Enquiries Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries.",
    });
  }
};

// =====================================================
// GET SINGLE ENQUIRY
// =====================================================

export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.error("Get Enquiry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiry.",
    });
  }
};

// =====================================================
// UPDATE ENQUIRY STATUS
// =====================================================

export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["new", "contacted", "closed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry status.",
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry status updated successfully.",
      data: enquiry,
    });
  } catch (error) {
    console.error("Update Enquiry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update enquiry status.",
    });
  }
};

// =====================================================
// DELETE ENQUIRY
// =====================================================

export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Enquiry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete enquiry.",
    });
  }
};
