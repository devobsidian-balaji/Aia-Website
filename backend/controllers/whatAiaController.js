
// import mongoose from "mongoose";
// import { WhatAia } from "../models/WhatAia.js";

// const SECTION_KEY = "home-what-aia";

// const DEFAULT_HEADING = "What AIA does";

// const getOrCreateSection = async () => {
//   let section = await WhatAia.findOne({
//     sectionKey: SECTION_KEY,
//   });

//   if (!section) {
//     section = await WhatAia.create({
//       sectionKey: SECTION_KEY,
//       heading: DEFAULT_HEADING,
//       cards: [],
//     });
//   }

//   if (!Array.isArray(section.cards)) {
//     section.cards = [];
//     await section.save();
//   }

//   return section;
// };

// const validateId = (id, res) => {
//   if (!mongoose.isValidObjectId(id)) {
//     res.status(400).json({
//       success: false,
//       message: "Invalid card ID",
//     });

//     return false;
//   }

//   return true;
// };

// // PUBLIC SECTION
// export const getWhatAia = async (req, res) => {
//   try {
//     const section = await WhatAia.findOne({
//       sectionKey: SECTION_KEY,
//       isActive: true,
//     }).lean();

//     if (!section) {
//       return res.json({
//         success: true,
//         data: {
//           heading: DEFAULT_HEADING,
//           subtitle: "",
//           cards: [],
//         },
//       });
//     }

//     section.cards = (section.cards || [])
//       .filter((card) => card.isActive)
//       .sort((a, b) => a.order - b.order);

//     return res.json({
//       success: true,
//       data: section,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ADMIN GET
// export const getAdminWhatAia = async (req, res) => {
//   try {
//     const section = await getOrCreateSection();

//     return res.json({
//       success: true,
//       data: section,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // UPDATE SECTION
// export const updateWhatAiaSection = async (req, res) => {
//   try {
//     const { heading, subtitle, isActive } = req.body;
//     const update = {};

//     if (heading !== undefined) {
//       if (typeof heading !== "string" || !heading.trim()) {
//         return res.status(400).json({
//           success: false,
//           message: "Heading is required",
//         });
//       }

//       update.heading = heading.trim();
//     }

//     if (subtitle !== undefined) {
//       if (typeof subtitle !== "string") {
//         return res.status(400).json({
//           success: false,
//           message: "Subtitle must be text",
//         });
//       }

//       update.subtitle = subtitle.trim();
//     }

//     if (isActive !== undefined) {
//       if (typeof isActive !== "boolean") {
//         return res.status(400).json({
//           success: false,
//           message: "isActive must be boolean",
//         });
//       }

//       update.isActive = isActive;
//     }

//     const section = await WhatAia.findOneAndUpdate(
//       { sectionKey: SECTION_KEY },
//       {
//         $set: update,
//         $setOnInsert: {
//           sectionKey: SECTION_KEY,
//         },
//       },
//       {
//         new: true,
//         upsert: true,
//         runValidators: true,
//       }
//     );

//     return res.json({
//       success: true,
//       data: section,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // CREATE CARD
// export const createWhatAiaCard = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       imageUrl,
//       imageAlt,
//       order,
//     } = req.body;

//     if (
//       typeof title !== "string" ||
//       !title.trim() ||
//       typeof description !== "string" ||
//       !description.trim() ||
//       typeof imageUrl !== "string" ||
//       !imageUrl.trim()
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Title, description and imageUrl are required",
//       });
//     }

//     const section = await getOrCreateSection();

//     section.cards.push({
//       title: title.trim(),
//       description: description.trim(),
//       imageUrl: imageUrl.trim(),
//       imageAlt: imageAlt || title.trim(),
//       order: Number.isFinite(Number(order))
//         ? Number(order)
//         : section.cards.length,
//       isActive: true,
//     });

//     await section.save();

//     return res.status(201).json({
//       success: true,
//       data: section.cards[section.cards.length - 1],
//       message: "Card created successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // UPDATE CARD
// export const updateWhatAiaCard = async (req, res) => {
//   try {
//     if (!validateId(req.params.cardId, res)) return;

//     const section = await getOrCreateSection();

//     const card = section.cards.id(req.params.cardId);

//     if (!card) {
//       return res.status(404).json({
//         success: false,
//         message: "Card not found",
//       });
//     }

//     const {
//       title,
//       description,
//       imageUrl,
//       imageAlt,
//       order,
//       isActive,
//     } = req.body;

//     if (title !== undefined) {
//       if (typeof title !== "string" || !title.trim()) {
//         return res.status(400).json({
//           success: false,
//           message: "Title is required",
//         });
//       }

//       card.title = title.trim();
//     }

//     if (description !== undefined) {
//       if (
//         typeof description !== "string" ||
//         !description.trim()
//       ) {
//         return res.status(400).json({
//           success: false,
//           message: "Description is required",
//         });
//       }

//       card.description = description.trim();
//     }

//     if (imageUrl !== undefined) {
//       if (
//         typeof imageUrl !== "string" ||
//         !imageUrl.trim()
//       ) {
//         return res.status(400).json({
//           success: false,
//           message: "Image is required",
//         });
//       }

//       card.imageUrl = imageUrl.trim();
//     }

//     if (imageAlt !== undefined) {
//       card.imageAlt = imageAlt;
//     }

//     if (order !== undefined) {
//       const parsedOrder = Number(order);

//       if (!Number.isFinite(parsedOrder)) {
//         return res.status(400).json({
//           success: false,
//           message: "Order must be a number",
//         });
//       }

//       card.order = parsedOrder;
//     }

//     if (isActive !== undefined) {
//       if (typeof isActive !== "boolean") {
//         return res.status(400).json({
//           success: false,
//           message: "isActive must be boolean",
//         });
//       }

//       card.isActive = isActive;
//     }

//     await section.save();

//     return res.json({
//       success: true,
//       data: card,
//       message: "Card updated successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // DELETE CARD
// export const deleteWhatAiaCard = async (req, res) => {
//   try {
//     if (!validateId(req.params.cardId, res)) return;

//     const section = await getOrCreateSection();

//     const card = section.cards.id(req.params.cardId);

//     if (!card) {
//       return res.status(404).json({
//         success: false,
//         message: "Card not found",
//       });
//     }

//     card.deleteOne();

//     await section.save();

//     return res.json({
//       success: true,
//       message: "Card deleted successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



// import {WhatAia} from "../models/WhatAia.js";
// import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// const getOrCreateSection = async () => {
//   let section = await WhatAia.findOne();

//   if (!section) {
//     section = await WhatAia.create({
//       heading: "What AIA does",
//       subtitle: "",
//       cards: [],
//     });
//   }

//   return section;
// };

// // Public section
// export const getWhatAia = async (_req, res) => {
//   try {
//     const section = await getOrCreateSection();

//     const activeCards = section.cards
//       .filter((card) => card.isActive)
//       .sort((a, b) => a.order - b.order);

//     return res.status(200).json({
//       success: true,
//       data: {
//         heading: section.heading,
//         subtitle: section.subtitle,
//         cards: activeCards,
//       },
//     });
//   } catch (error) {
//     console.error("Get What AIA Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to fetch What AIA section.",
//     });
//   }
// };

// // Admin section
// export const getAdminWhatAia = async (_req, res) => {
//   try {
//     const section = await getOrCreateSection();

//     return res.status(200).json({
//       success: true,
//       data: section,
//     });
//   } catch (error) {
//     console.error("Get Admin What AIA Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to fetch admin What AIA section.",
//     });
//   }
// };

// // Update section heading and subtitle
// export const updateWhatAiaSection = async (req, res) => {
//   try {
//     const { heading, subtitle } = req.body;

//     const section = await getOrCreateSection();

//     if (heading !== undefined) {
//       section.heading = heading;
//     }

//     if (subtitle !== undefined) {
//       section.subtitle = subtitle;
//     }

//     await section.save();

//     return res.status(200).json({
//       success: true,
//       message: "What AIA section updated successfully.",
//       data: section,
//     });
//   } catch (error) {
//     console.error("Update What AIA Section Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to update What AIA section.",
//     });
//   }
// };

// // Create card with Cloudinary image
// export const createWhatAiaCard = async (req, res) => {
//   try {
//     const { title, description, imageAlt, order } = req.body;

//     if (!title?.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Card title is required.",
//       });
//     }

//     if (!description?.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Card description is required.",
//       });
//     }

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Please upload a card image.",
//       });
//     }

//     const uploadedImage = await uploadToCloudinary(
//       req.file.path,
//       "AIA-Project-Assets/What-AIA"
//     );

//     const section = await getOrCreateSection();

//     section.cards.push({
//       title: title.trim(),
//       description: description.trim(),
//       imageUrl: uploadedImage.url,
//       imageAlt: imageAlt?.trim() || title.trim(),
//       order: Number(order) || 0,
//       isActive: true,
//     });

//     await section.save();

//     const createdCard = section.cards[section.cards.length - 1];

//     return res.status(201).json({
//       success: true,
//       message: "What AIA card created successfully.",
//       data: createdCard,
//     });
//   } catch (error) {
//     console.error("Create What AIA Card Error:", error);

//     return res.status(500).json({
//       success: false,
//       message:
//         error.message || "Unable to create What AIA card.",
//     });
//   }
// };

// // Update card
// export const updateWhatAiaCard = async (req, res) => {
//   try {
//     const { cardId } = req.params;
//     const { title, description, imageAlt, order, isActive } = req.body;

//     const section = await getOrCreateSection();

//     const card = section.cards.id(cardId);

//     if (!card) {
//       return res.status(404).json({
//         success: false,
//         message: "What AIA card not found.",
//       });
//     }

//     if (title !== undefined) card.title = title.trim();
//     if (description !== undefined) {
//       card.description = description.trim();
//     }

//     if (imageAlt !== undefined) {
//       card.imageAlt = imageAlt.trim();
//     }

//     if (order !== undefined) {
//       card.order = Number(order) || 0;
//     }

//     if (isActive !== undefined) {
//       card.isActive = isActive === true || isActive === "true";
//     }

//     // Upload new image only when a new file is selected
//     if (req.file) {
//       const uploadedImage = await uploadToCloudinary(
//         req.file.path,
//         "AIA-Project-Assets/What-AIA"
//       );

//       card.imageUrl = uploadedImage.url;
//     }

//     await section.save();

//     return res.status(200).json({
//       success: true,
//       message: "What AIA card updated successfully.",
//       data: card,
//     });
//   } catch (error) {
//     console.error("Update What AIA Card Error:", error);

//     return res.status(500).json({
//       success: false,
//       message:
//         error.message || "Unable to update What AIA card.",
//     });
//   }
// };

// // Delete card
// export const deleteWhatAiaCard = async (req, res) => {
//   try {
//     const { cardId } = req.params;

//     const section = await getOrCreateSection();

//     const card = section.cards.id(cardId);

//     if (!card) {
//       return res.status(404).json({
//         success: false,
//         message: "What AIA card not found.",
//       });
//     }

//     card.deleteOne();

//     await section.save();

//     return res.status(200).json({
//       success: true,
//       message: "What AIA card deleted successfully.",
//       data: section,
//     });
//   } catch (error) {
//     console.error("Delete What AIA Card Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Unable to delete What AIA card.",
//     });
//   }
// };



import { WhatAia } from "../models/WhatAia.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import cloudinary from "../config/cloudinary.js";

// ==========================================
// CLOUDINARY HELPERS
// ==========================================

async function deleteCloudinaryImage(publicId) {
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    if (!["ok", "not found"].includes(result.result)) {
      console.warn("Cloudinary deletion result:", result);
    }

    return result;
  } catch (error) {
    console.error("Cloudinary image deletion failed:", error);
  }
}

function getWhatAiaFolder() {
  return "AIA-Project-Assets/What-AIA";
}

function parseBoolean(value, fallback = true) {
  if (value === undefined) return fallback;

  return value === true || value === "true";
}

// ==========================================
// GET OR CREATE WHAT AIA SECTION
// ==========================================

async function getOrCreateSection() {
  let section = await WhatAia.findOne({
    sectionKey: "home-what-aia",
  });

  if (!section) {
    section = await WhatAia.create({
      sectionKey: "home-what-aia",
      heading: "What AIA does",
      cards: [],
    });
  }

  return section;
}

// ==========================================
// PUBLIC: GET WHAT AIA SECTION
// ==========================================

export const getWhatAia = async (req, res) => {
  try {
    const section = await WhatAia.findOne({
      sectionKey: "home-what-aia",
      isActive: true,
    }).lean();

    if (!section) {
      return res.json({
        success: true,
        data: null,
      });
    }

    section.cards = (section.cards || [])
      .filter((card) => card.isActive)
      .sort((a, b) => a.order - b.order);

    return res.json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Get What AIA error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: GET WHAT AIA SECTION
// ==========================================

export const getAdminWhatAia = async (req, res) => {
  try {
    const section = await getOrCreateSection();

    return res.json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Get admin What AIA error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: UPDATE WHAT AIA SECTION
// ==========================================

export const updateWhatAiaSection = async (req, res) => {
  try {
    const { heading, subtitle, isActive } = req.body;

    const update = {};

    if (heading !== undefined) {
      update.heading = heading;
    }

    if (subtitle !== undefined) {
      update.subtitle = subtitle;
    }

    if (isActive !== undefined) {
      update.isActive = parseBoolean(isActive);
    }

    const section = await WhatAia.findOneAndUpdate(
      { sectionKey: "home-what-aia" },
      {
        $set: update,
        $setOnInsert: {
          sectionKey: "home-what-aia",
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.json({
      success: true,
      data: section,
      message: "What AIA section updated successfully",
    });
  } catch (error) {
    console.error("Update What AIA section error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: CREATE WHAT AIA CARD
// ==========================================

export const createWhatAiaCard = async (req, res) => {
  let uploadedImage = null;

  try {
    const {
      title,
      description,
      imageAlt,
      order,
      isActive,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Card title is required",
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Card description is required",
      });
    }

    // Upload new image to Cloudinary.
    if (req.file) {
      uploadedImage = await uploadToCloudinary(
        req.file.path,
        getWhatAiaFolder()
      );
    }

    // Legacy imageUrl support.
    const imageUrl = uploadedImage?.url || req.body.imageUrl;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Card image is required",
      });
    }

    const section = await getOrCreateSection();

    section.cards.push({
      title: title.trim(),
      description: description.trim(),
      imageUrl,
      imagePublicId: uploadedImage?.publicId || "",
      imageAlt: imageAlt || title,
      order: Number.isFinite(Number(order))
        ? Number(order)
        : section.cards.length,
      isActive: parseBoolean(isActive),
    });

    try {
      await section.save();
    } catch (saveError) {
      // Remove newly uploaded image if database save fails.
      if (uploadedImage?.publicId) {
        await deleteCloudinaryImage(uploadedImage.publicId);
        uploadedImage = null;
      }

      throw saveError;
    }

    const createdCard = section.cards[section.cards.length - 1];

    return res.status(201).json({
      success: true,
      data: createdCard,
      message: "What AIA card created successfully",
    });
  } catch (error) {
    console.error("Create What AIA card error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: UPDATE WHAT AIA CARD
// ==========================================

export const updateWhatAiaCard = async (req, res) => {
  let uploadedImage = null;

  try {
    const { cardId } = req.params;

    const section = await getOrCreateSection();

    const card = section.cards.id(cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "What AIA card not found",
      });
    }

    const {
      title,
      description,
      imageAlt,
      order,
      isActive,
    } = req.body;

    // Update text fields only when provided.
    if (title !== undefined) {
      card.title = String(title).trim();
    }

    if (description !== undefined) {
      card.description = description;
    }

    if (imageAlt !== undefined) {
      card.imageAlt = imageAlt;
    }

    if (order !== undefined && Number.isFinite(Number(order))) {
      card.order = Number(order);
    }

    if (isActive !== undefined) {
      card.isActive = parseBoolean(isActive);
    }

    const oldPublicId = card.imagePublicId;

    // Upload replacement image when a new file is provided.
    if (req.file) {
      uploadedImage = await uploadToCloudinary(
        req.file.path,
        getWhatAiaFolder()
      );

      card.imageUrl = uploadedImage.url;
      card.imagePublicId = uploadedImage.publicId;
    } else if (req.body.imageUrl) {
      // Legacy imageUrl support.
      card.imageUrl = req.body.imageUrl;
    }

    try {
      await section.save();
    } catch (saveError) {
      // Remove new image if database update fails.
      if (uploadedImage?.publicId) {
        await deleteCloudinaryImage(uploadedImage.publicId);
        uploadedImage = null;
      }

      throw saveError;
    }

    // Delete old Cloudinary image only after successful DB update.
    if (uploadedImage && oldPublicId) {
      await deleteCloudinaryImage(oldPublicId);
    }

    return res.json({
      success: true,
      data: card,
      message: "What AIA card updated successfully",
    });
  } catch (error) {
    console.error("Update What AIA card error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// ADMIN: DELETE WHAT AIA CARD
// ==========================================

export const deleteWhatAiaCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const section = await WhatAia.findOne({
      sectionKey: "home-what-aia",
    });

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "What AIA section not found",
      });
    }

    const card = section.cards.id(cardId);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "What AIA card not found",
      });
    }

    const oldPublicId = card.imagePublicId;

    card.deleteOne();

    await section.save();

    // Delete Cloudinary image after successful database deletion.
    if (oldPublicId) {
      await deleteCloudinaryImage(oldPublicId);
    }

    return res.json({
      success: true,
      message: "What AIA card and its Cloudinary image deleted successfully",
    });
  } catch (error) {
    console.error("Delete What AIA card error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
