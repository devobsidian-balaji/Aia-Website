
import Enquiry from "../models/Enquiry.js";

// Create new enquiry
export const createEnquiry = async (req, res) => {
  try {
    const {
      ecosystem,
      manufacturingSector,
      fullName,
      email,
      companyName,
      website,
      phoneNumber,
      message,
    } = req.body;

    // Required field validation
    if (
      !ecosystem ||
      !manufacturingSector ||
      !fullName ||
      !email ||
      !phoneNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Phone validation
    const normalizedPhone = phoneNumber.replace(/[\s()-]/g, "");

    if (!/^\+?[1-9]\d{6,14}$/.test(normalizedPhone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number.",
      });
    }

    // Save enquiry
    const enquiry = await Enquiry.create({
      ecosystem: ecosystem.trim(),
      manufacturingSector: manufacturingSector.trim(),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      companyName: companyName?.trim() || "",
      website: website?.trim() || "",
      phoneNumber: normalizedPhone,
      message: message?.trim() || "",
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

// Get all enquiries
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

// Get single enquiry
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

// Update enquiry status
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

// Delete enquiry
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
