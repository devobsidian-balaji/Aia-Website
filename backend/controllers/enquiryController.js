
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
      fullName,
      email,
      companyName,
      website,
      phoneNumber,
      message,
    } = req.body;

    // Required field validation
    if (
      !category ||
      !selectedOption ||
      !fullName?.trim() ||
      !email?.trim() ||
      !companyName?.trim() ||
      !website?.trim() ||
      !phoneNumber?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Validate category
    if (!categoryOptions[category]) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid category.",
      });
    }

    // Validate selected option against category
    if (!categoryOptions[category].includes(selectedOption)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid option for this category.",
      });
    }

    // Validate full name
    if (fullName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Full name must contain at least 2 characters.",
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Validate phone
    const normalizedPhone = phoneNumber.replace(/[\s()-]/g, "");

    if (!/^\+?[1-9]\d{6,14}$/.test(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number.",
      });
    }

    // Validate website
    let normalizedWebsite = website.trim();

    if (!/^https?:\/\//i.test(normalizedWebsite)) {
      normalizedWebsite = `https://${normalizedWebsite}`;
    }

    try {
      const websiteUrl = new URL(normalizedWebsite);

      if (
        !["http:", "https:"].includes(websiteUrl.protocol) ||
        !websiteUrl.hostname.includes(".")
      ) {
        throw new Error("Invalid website");
      }
    } catch {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid website URL.",
      });
    }

    // Save enquiry
    const enquiry = await Enquiry.create({
      category: category.trim(),
      selectedOption: selectedOption.trim(),

      // Legacy fields for existing admin UI compatibility
      ecosystem: category.trim(),
      manufacturingSector: selectedOption.trim(),

      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      companyName: companyName.trim(),
      website: normalizedWebsite,
      phoneNumber: normalizedPhone,
      message: message?.trim() || "",
    });

    await FormSubmission.create({
  formType: "general-inquiry",
  sourcePage: req.headers.referer || "",
  data: {
    category: category.trim(),
    selectedOption: selectedOption.trim(),
    ecosystem: category.trim(),
    manufacturingSector: selectedOption.trim(),
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    companyName: companyName.trim(),
    website: normalizedWebsite,
    phoneNumber: normalizedPhone,
    message: message?.trim() || "",
  },
});

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
      { new: true, runValidators: true }
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
