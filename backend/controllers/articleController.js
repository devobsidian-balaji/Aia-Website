// import mongoose from "mongoose";
// import fs from "fs/promises";

// import { Article } from "../models/Article.js";
// import cloudinary from "../config/cloudinary.js";
// import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// const ARTICLE_FOLDER = "AIA-Project-Assets/Articles";

// // ------------------------------------------
// // COMMON HELPERS
// // ------------------------------------------

// const parsePayload = (body = {}) => {
//   if (body.data) {
//     try {
//       return typeof body.data === "string"
//         ? JSON.parse(body.data)
//         : body.data;
//     } catch {
//       throw new Error("Invalid publication form data.");
//     }
//   }

//   return body;
// };

// const parseArray = (value) => {
//   return Array.isArray(value) ? value : [];
// };

// const getFilesByField = (files = []) => {
//   const result = {};

//   for (const file of files) {
//     result[file.fieldname] = file;
//   }

//   return result;
// };

// const deleteTemporaryFiles = async (files = []) => {
//   await Promise.all(
//     files.map(async (file) => {
//       if (!file?.path) return;

//       try {
//         await fs.unlink(file.path);
//       } catch (error) {
//         if (error.code !== "ENOENT") {
//           console.error("Temporary file cleanup error:", error.message);
//         }
//       }
//     })
//   );
// };

// const deleteCloudinaryImage = async (publicId) => {
//   if (!publicId) return;

//   try {
//     await cloudinary.uploader.destroy(publicId, {
//       resource_type: "image",
//       invalidate: true,
//     });
//   } catch (error) {
//     console.error(
//       `Cloudinary deletion failed for ${publicId}:`,
//       error.message
//     );
//   }
// };

// const uniqueIds = (ids = []) => [
//   ...new Set(ids.filter(Boolean)),
// ];

// const collectArticlePublicIds = (article) => {
//   if (!article) return [];

//   const data = article.toObject
//     ? article.toObject()
//     : article;

//   return uniqueIds([
//     data.imagePublicId,
//     data.detailHeroImagePublicId,
//     ...(data.contentBlocks || []).map(
//       (block) => block.imagePublicId
//     ),
//     ...(data.sections || []).map(
//       (section) => section.imagePublicId
//     ),
//   ]);
// };

// const uploadImage = async (file, folder) => {
//   if (!file) return null;

//   return uploadToCloudinary(file.path, folder);
// };

// const uploadPublicationImages = async (
//   payload,
//   files,
//   uploaded
// ) => {
//   // Listing image
//   if (files.image) {
//     const result = await uploadImage(
//       files.image,
//       `${ARTICLE_FOLDER}/Listing`
//     );

//     uploaded.push(result);
//     payload.image = result.url;
//     payload.imagePublicId = result.publicId;
//   }

//   // Detail hero image
//   if (files.detailHeroImage) {
//     const result = await uploadImage(
//       files.detailHeroImage,
//       `${ARTICLE_FOLDER}/Detail-Heroes`
//     );

//     uploaded.push(result);
//     payload.detailHeroImage = result.url;
//     payload.detailHeroImagePublicId = result.publicId;
//   }

//   // Dynamic content block images
//   const blocks = parseArray(payload.contentBlocks);

//   for (let index = 0; index < blocks.length; index++) {
//     const file = files[`contentBlockImage_${index}`];

//     if (!file) continue;

//     const result = await uploadImage(
//       file,
//       `${ARTICLE_FOLDER}/Content-Blocks`
//     );

//     uploaded.push(result);

//     blocks[index].image = result.url;
//     blocks[index].imagePublicId = result.publicId;
//   }

//   payload.contentBlocks = blocks;

//   return payload;
// };

// const normalizePublicationPayload = (payload = {}) => {
//   return {
//     title: String(payload.title || "").trim(),
//     slug: String(payload.slug || "").trim().toLowerCase(),

//     image: payload.image || "",
//     imagePublicId: payload.imagePublicId || "",
//     imageAlt: payload.imageAlt || "",

//     category: payload.category || "",
//     categoryLink: payload.categoryLink || "",

//     detailHeroTitle: payload.detailHeroTitle || "",
//     detailHeroDescription: payload.detailHeroDescription || "",
//     detailHeroImage: payload.detailHeroImage || "",
//     detailHeroImagePublicId:
//       payload.detailHeroImagePublicId || "",
//     detailHeroImageAlt: payload.detailHeroImageAlt || "",

//     detailTitle: payload.detailTitle || "",
//     detailSubtitle: payload.detailSubtitle || "",

//     introductionTitle:
//       payload.introductionTitle || "Introduction",
//     introductionParagraphs: parseArray(
//       payload.introductionParagraphs
//     ),

//     contentBlocks: parseArray(payload.contentBlocks).map(
//       (block) => ({
//         _id: block._id,
//         type: block.type,
//         text: block.text || "",
//         items: parseArray(block.items),
//         image: block.image || "",
//         imagePublicId: block.imagePublicId || "",
//         imageAlt: block.imageAlt || "",
//         caption: block.caption || "",
//       })
//     ),

//     closingTitle: payload.closingTitle || "",
//     closingParagraphs: parseArray(payload.closingParagraphs),
//     closingBullets: parseArray(payload.closingBullets),

//     // Keep older fields compatible
//     introduction: payload.introduction || "",
//     detailCoverImage: payload.detailCoverImage || "",
//     sections: parseArray(payload.sections),

//     author: payload.author || "",
//     publishedAt: payload.publishedAt || "",
//     order:
//       payload.order !== undefined && payload.order !== ""
//         ? Number(payload.order)
//         : 0,
//     isActive:
//       payload.isActive === undefined
//         ? true
//         : payload.isActive === true ||
//           payload.isActive === "true",
//   };
// };

// const validateRequiredFields = (payload) => {
//   if (!payload.title || !payload.slug || !payload.image) {
//     return "Title, slug and listing image are required.";
//   }

//   return null;
// };

// // ------------------------------------------
// // GET ALL ARTICLES
// // ------------------------------------------

// // export const getArticles = async (req, res) => {
// //   try {
// //     const filter =
// //       req.query.admin === "true"
// //         ? {}
// //         : { isActive: true };

// //     const articles = await Article.find(filter).sort({
// //       order: 1,
// //       createdAt: -1,
// //     });

// //     return res.json({
// //       success: true,
// //       data: articles,
// //     });
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };
// export const getArticles = async (req, res) => {
//   try {
//     const filter =
//       req.query.admin === "true"
//         ? {}
//         : { isActive: { $ne: false } };

//     const articles = await Article.find(filter).sort({
//       order: 1,
//       createdAt: -1,
//     });

//     return res.json({
//       success: true,
//       data: articles,
//     });
//   } catch (error) {
//     console.error("Get articles error:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ------------------------------------------
// // GET ARTICLE BY SLUG
// // ------------------------------------------

// // export const getArticleBySlug = async (req, res) => {
// //   try {
// //     const article = await Article.findOne({
// //       slug: req.params.slug,
// //       isActive: true,
// //     });

// //     if (!article) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Article not found.",
// //       });
// //     }

// //     return res.json({
// //       success: true,
// //       data: article,
// //     });
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// export const getArticleBySlug = async (req, res) => {
//   try {
//     const article = await Article.findOne({
//       slug: req.params.slug,
//       isActive: { $ne: false },
//     });

//     if (!article) {
//       return res.status(404).json({
//         success: false,
//         message: "Article not found.",
//       });
//     }

//     return res.json({
//       success: true,
//       data: article,
//     });
//   } catch (error) {
//     console.error("Get article by slug error:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ------------------------------------------
// // CREATE ARTICLE
// // ------------------------------------------

// export const createArticle = async (req, res) => {
//   const filesArray = req.files || [];
//   const uploaded = [];

//   try {
//     const files = getFilesByField(filesArray);
//     let payload = parsePayload(req.body);

//     payload = normalizePublicationPayload(payload);

//     if (!payload.title || !payload.slug) {
//       return res.status(400).json({
//         success: false,
//         message: "Title and slug are required.",
//       });
//     }

//     const existing = await Article.findOne({
//       slug: payload.slug,
//     });

//     if (existing) {
//       return res.status(409).json({
//         success: false,
//         message: "This article slug already exists.",
//       });
//     }

//     await uploadPublicationImages(payload, files, uploaded);

//     const validationError = validateRequiredFields(payload);

//     if (validationError) {
//       return res.status(400).json({
//         success: false,
//         message: validationError,
//       });
//     }

//     if (!Number.isFinite(payload.order) || payload.order < 0) {
//       payload.order = await Article.countDocuments();
//     }

//     const article = await Article.create(payload);

//     return res.status(201).json({
//       success: true,
//       message: "Article created successfully.",
//       data: article,
//     });
//   } catch (error) {
//     await Promise.all(
//       uploaded.map((item) =>
//         deleteCloudinaryImage(item.publicId)
//       )
//     );

//     console.error("Create article error:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   } finally {
//     await deleteTemporaryFiles(filesArray);
//   }
// };

// // ------------------------------------------
// // UPDATE ARTICLE
// // ------------------------------------------

// export const updateArticle = async (req, res) => {
//   const filesArray = req.files || [];
//   const uploaded = [];

//   try {
//     const { id } = req.params;

//     if (!mongoose.isValidObjectId(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid article ID.",
//       });
//     }

//     const article = await Article.findById(id);

//     if (!article) {
//       return res.status(404).json({
//         success: false,
//         message: "Article not found.",
//       });
//     }

//     const files = getFilesByField(filesArray);
//     const incoming = parsePayload(req.body);

//     const oldPublicIds = collectArticlePublicIds(article);

//     // Merge incoming data with existing document.
//     const current = article.toObject();

//     const merged = {
//       ...current,
//       ...incoming,
//       image:
//         incoming.image !== undefined
//           ? incoming.image
//           : current.image,
//       imagePublicId:
//         incoming.imagePublicId !== undefined
//           ? incoming.imagePublicId
//           : current.imagePublicId,
//       detailHeroImage:
//         incoming.detailHeroImage !== undefined
//           ? incoming.detailHeroImage
//           : current.detailHeroImage,
//       detailHeroImagePublicId:
//         incoming.detailHeroImagePublicId !== undefined
//           ? incoming.detailHeroImagePublicId
//           : current.detailHeroImagePublicId,
//       contentBlocks:
//         incoming.contentBlocks !== undefined
//           ? incoming.contentBlocks
//           : current.contentBlocks,
//     };

//     let payload = normalizePublicationPayload(merged);

//     if (!payload.title || !payload.slug) {
//       return res.status(400).json({
//         success: false,
//         message: "Title and slug are required.",
//       });
//     }

//     const duplicate = await Article.findOne({
//       slug: payload.slug,
//       _id: { $ne: id },
//     });

//     if (duplicate) {
//       return res.status(409).json({
//         success: false,
//         message: "This article slug already exists.",
//       });
//     }

//     await uploadPublicationImages(payload, files, uploaded);

//     const validationError = validateRequiredFields(payload);

//     if (validationError) {
//       return res.status(400).json({
//         success: false,
//         message: validationError,
//       });
//     }

//     Object.assign(article, payload);
//     await article.save();

//     const newPublicIds = collectArticlePublicIds(article);

//     const obsoleteIds = oldPublicIds.filter(
//       (publicId) => !newPublicIds.includes(publicId)
//     );

//     await Promise.all(
//       uniqueIds(obsoleteIds).map(deleteCloudinaryImage)
//     );

//     return res.json({
//       success: true,
//       message: "Article updated successfully.",
//       data: article,
//     });
//   } catch (error) {
//     await Promise.all(
//       uploaded.map((item) =>
//         deleteCloudinaryImage(item.publicId)
//       )
//     );

//     console.error("Update article error:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   } finally {
//     await deleteTemporaryFiles(filesArray);
//   }
// };

// // ------------------------------------------
// // DELETE ARTICLE
// // ------------------------------------------

// export const deleteArticle = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.isValidObjectId(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid article ID.",
//       });
//     }

//     const article = await Article.findById(id);

//     if (!article) {
//       return res.status(404).json({
//         success: false,
//         message: "Article not found.",
//       });
//     }

//     const publicIds = collectArticlePublicIds(article);

//     await article.deleteOne();

//     await Promise.all(
//       publicIds.map(deleteCloudinaryImage)
//     );

//     return res.json({
//       success: true,
//       message: "Article deleted successfully.",
//     });
//   } catch (error) {
//     console.error("Delete article error:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

import mongoose from "mongoose";
import fs from "fs/promises";

import { Article } from "../models/Article.js";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

const ARTICLE_FOLDER = "AIA-Project-Assets/Articles";

// ==========================================
// COMMON HELPERS
// ==========================================

const parsePayload = (body = {}) => {
  if (body.data) {
    try {
      return typeof body.data === "string"
        ? JSON.parse(body.data)
        : body.data;
    } catch {
      throw new Error("Invalid article form data.");
    }
  }

  return body;
};

const parseArray = (value) => {
  return Array.isArray(value) ? value : [];
};

const uniqueIds = (ids = []) => [
  ...new Set(ids.filter(Boolean)),
];

// ==========================================
// GET FILES BY FIELD NAME
// ==========================================

const getFilesByField = (files = []) => {
  const result = {};

  if (Array.isArray(files)) {
    files.forEach((file) => {
      result[file.fieldname] = file;
    });
  } else if (files && typeof files === "object") {
    Object.entries(files).forEach(([field, fieldFiles]) => {
      result[field] = Array.isArray(fieldFiles)
        ? fieldFiles[0]
        : fieldFiles;
    });
  }

  return result;
};

// ==========================================
// DELETE TEMPORARY MULTER FILES
// ==========================================

const deleteTemporaryFiles = async (files = []) => {
  await Promise.all(
    files.map(async (file) => {
      if (!file?.path) return;

      try {
        await fs.unlink(file.path);
      } catch (error) {
        if (error.code !== "ENOENT") {
          console.error(
            "Temporary file cleanup error:",
            error.message
          );
        }
      }
    })
  );
};

// ==========================================
// CLOUDINARY DELETE
// ==========================================

const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    console.log(
      "Cloudinary image deletion:",
      publicId,
      result.result
    );
  } catch (error) {
    console.error(
      `Cloudinary deletion failed for ${publicId}:`,
      error.message
    );
  }
};

// ==========================================
// COLLECT ARTICLE CLOUDINARY IDS
// ==========================================

const collectArticlePublicIds = (article) => {
  if (!article) return [];

  const data = article.toObject
    ? article.toObject()
    : article;

  return uniqueIds([
    data.imagePublicId,
    data.detailHeroImagePublicId,

    ...(data.contentBlocks || []).map(
      (block) => block.imagePublicId
    ),

    ...(data.sections || []).map(
      (section) => section.imagePublicId
    ),
  ]);
};

// ==========================================
// UPLOAD SINGLE IMAGE
// ==========================================

const uploadFile = async (file, folder) => {
  if (!file) return null;

  console.log("=================================");
  console.log("ARTICLE CLOUDINARY UPLOAD");
  console.log("File:", file.originalname);
  console.log("Folder:", folder);
  console.log("=================================");

  const result = await uploadToCloudinary(
    file.path,
    folder
  );

  console.log("ARTICLE IMAGE UPLOADED:", result.url);
  console.log("ARTICLE PUBLIC ID:", result.publicId);

  return result;
};

// ==========================================
// UPLOAD AND REPLACE ARTICLE IMAGES
// ==========================================

const uploadPublicationImages = async (
  payload,
  files,
  oldArticle = null
) => {
  const uploaded = [];
  const oldImagesToDelete = [];

  const oldData = oldArticle
    ? oldArticle.toObject
      ? oldArticle.toObject()
      : oldArticle
    : {};

  const uploadAndReplace = async ({
    file,
    folder,
    currentPublicId,
    onSuccess,
  }) => {
    if (!file) return;

    const result = await uploadFile(file, folder);

    uploaded.push(result);

    if (
      currentPublicId &&
      currentPublicId !== result.publicId
    ) {
      oldImagesToDelete.push(currentPublicId);
    }

    onSuccess(result);
  };

  try {
    // --------------------------------------
    // 1. ARTICLE LISTING / THUMBNAIL IMAGE
    // --------------------------------------

    await uploadAndReplace({
      file: files.image,
      folder: `${ARTICLE_FOLDER}/Listing`,
      currentPublicId: oldData.imagePublicId,

      onSuccess: (result) => {
        payload.image = result.url;
        payload.imagePublicId = result.publicId;
      },
    });

    // --------------------------------------
    // 2. ARTICLE DETAIL HERO IMAGE
    // --------------------------------------

    await uploadAndReplace({
      file: files.detailHeroImage,
      folder: `${ARTICLE_FOLDER}/Detail-Heroes`,
      currentPublicId: oldData.detailHeroImagePublicId,

      onSuccess: (result) => {
        payload.detailHeroImage = result.url;
        payload.detailHeroImagePublicId = result.publicId;
      },
    });

    // --------------------------------------
    // 3. CONTENT BLOCK IMAGES
    // --------------------------------------

    const oldBlocks = oldData.contentBlocks || [];
    const blocks = parseArray(payload.contentBlocks);

    payload.contentBlocks = await Promise.all(
      blocks.map(async (block, index) => {
        const nextBlock = { ...block };

        const oldBlock =
          oldBlocks.find(
            (item) =>
              block._id &&
              item._id?.toString() === block._id.toString()
          ) || oldBlocks[index] || {};

        const file = files[`contentBlockImage_${index}`];

        await uploadAndReplace({
          file,
          folder: `${ARTICLE_FOLDER}/Content-Blocks`,
          currentPublicId:
            block.imagePublicId || oldBlock.imagePublicId,

          onSuccess: (result) => {
            nextBlock.image = result.url;
            nextBlock.imagePublicId = result.publicId;
          },
        });

        // Preserve an existing image when no new file is selected.
        if (!file) {
          const sameImage =
            nextBlock.image &&
            nextBlock.image === oldBlock.image;

          if (
            !nextBlock.imagePublicId &&
            sameImage
          ) {
            nextBlock.imagePublicId =
              oldBlock.imagePublicId || "";
          }

          if (nextBlock.image === undefined) {
            nextBlock.image = oldBlock.image || "";
          }

          if (nextBlock.imagePublicId === undefined) {
            nextBlock.imagePublicId = "";
          }
        }

        return nextBlock;
      })
    );

    return {
      uploaded,
      oldImagesToDelete,
    };
  } catch (error) {
    // Remove newly uploaded images if the operation fails.
    await Promise.all(
      uploaded.map((item) =>
        deleteCloudinaryImage(item.publicId)
      )
    );

    throw error;
  }
};

// ==========================================
// NORMALIZE ARTICLE DATA
// ==========================================

const normalizePublicationPayload = (payload = {}) => {
  return {
    title: String(payload.title || "").trim(),

    slug: String(payload.slug || "")
      .trim()
      .toLowerCase(),

    image: payload.image || "",
    imagePublicId: payload.imagePublicId || "",
    imageAlt: payload.imageAlt || "",

    category: payload.category || "",
    categoryLink: payload.categoryLink || "",

    detailHeroTitle: payload.detailHeroTitle || "",
    detailHeroDescription:
      payload.detailHeroDescription || "",

    detailHeroImage: payload.detailHeroImage || "",

    detailHeroImagePublicId:
      payload.detailHeroImagePublicId || "",

    detailHeroImageAlt:
      payload.detailHeroImageAlt || "",

    detailTitle: payload.detailTitle || "",
    detailSubtitle: payload.detailSubtitle || "",

    introductionTitle:
      payload.introductionTitle || "Introduction",

    introductionParagraphs: parseArray(
      payload.introductionParagraphs
    ),

    contentBlocks: parseArray(
      payload.contentBlocks
    ).map((block) => ({
      _id: block._id,
      type: block.type,
      text: block.text || "",
      items: parseArray(block.items),
      image: block.image || "",
      imagePublicId: block.imagePublicId || "",
      imageAlt: block.imageAlt || "",
      caption: block.caption || "",
    })),

    closingTitle: payload.closingTitle || "",

    closingParagraphs: parseArray(
      payload.closingParagraphs
    ),

    closingBullets: parseArray(
      payload.closingBullets
    ),

    // Legacy fields: preserve old article compatibility.
    introduction: payload.introduction || "",
    detailCoverImage: payload.detailCoverImage || "",
    sections: parseArray(payload.sections),

    author: payload.author || "",
    publishedAt: payload.publishedAt || "",

    order:
      payload.order !== undefined &&
      payload.order !== ""
        ? Number(payload.order)
        : 0,

    isActive:
      payload.isActive === undefined
        ? true
        : payload.isActive === true ||
          payload.isActive === "true",
  };
};

// ==========================================
// VALIDATION
// ==========================================

const validateRequiredFields = (payload) => {
  if (!payload.title) {
    return "Article title is required.";
  }

  if (!payload.slug) {
    return "Article slug is required.";
  }

  if (!payload.image) {
    return "Article listing image is required.";
  }

  return null;
};

// ==========================================
// GET ALL ARTICLES
// ==========================================

// export const getArticles = async (req, res) => {
//   try {
//     const filter =
//       req.query.admin === "true"
//         ? {}
//         : { isActive: { $ne: false } };

//     const articles = await Article.find(filter)
//       .sort({
//         order: 1,
//         createdAt: -1,
//       })
//       .lean();

//     return res.json({
//       success: true,
//       data: articles,
//     });
//   } catch (error) {
//     console.error("Get articles error:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const getArticles = async (req, res) => {
  const startTime = Date.now();

  try {
    console.log("\n========== GET ARTICLES ==========");
    console.log("MongoDB State:", mongoose.connection.readyState);
    console.log("Request Query:", req.query);

    const filter =
      req.query.admin === "true"
        ? {}
        : { isActive: { $ne: false } };

    console.log("MongoDB Filter:", filter);
    console.log("Starting Article.find()...");

    const articles = await Article.find(filter)
      .sort({
        order: 1,
        createdAt: -1,
      })
      .lean()
      .maxTimeMS(15000);

    console.log("Articles fetched:", articles.length);
    console.log("Query duration:", Date.now() - startTime, "ms");
    console.log("==================================\n");

    return res.json({
      success: true,
      data: articles,
    });
  } catch (error) {
    console.error("\n========== GET ARTICLES ERROR ==========");
    console.error("Error:", error.message);
    console.error("MongoDB State:", mongoose.connection.readyState);
    console.error("Duration:", Date.now() - startTime, "ms");
    console.error("========================================\n");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ARTICLE BY SLUG
// ==========================================

export const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({
      slug: req.params.slug,
      isActive: { $ne: false },
    }).lean();

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    return res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error("Get article by slug error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// CREATE ARTICLE
// ==========================================

export const createArticle = async (req, res) => {
  const filesArray = req.files || [];
  const uploaded = [];

  try {
    const files = getFilesByField(filesArray);

    let incoming = parsePayload(req.body);

    let payload = normalizePublicationPayload(incoming);

    if (!payload.title || !payload.slug) {
      return res.status(400).json({
        success: false,
        message: "Title and slug are required.",
      });
    }

    // Check duplicate slug.
    const existing = await Article.findOne({
      slug: payload.slug,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "This article slug already exists.",
      });
    }

    // Upload images to Cloudinary.
    const uploadResult = await uploadPublicationImages(
      payload,
      files
    );

    uploaded.push(...uploadResult.uploaded);

    const validationError =
      validateRequiredFields(payload);

    if (validationError) {
      await Promise.all(
        uploaded.map((item) =>
          deleteCloudinaryImage(item.publicId)
        )
      );

      uploaded.length = 0;

      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    if (
      !Number.isFinite(payload.order) ||
      payload.order < 0
    ) {
      payload.order = await Article.countDocuments();
    }

    const article = await Article.create(payload);

    console.log(
      "Article created successfully:",
      article._id
    );

    return res.status(201).json({
      success: true,
      message: "Article created successfully.",
      data: article,
    });
  } catch (error) {
    // Rollback new Cloudinary uploads.
    await Promise.all(
      uploaded.map((item) =>
        deleteCloudinaryImage(item.publicId)
      )
    );

    console.error("Create article error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    await deleteTemporaryFiles(filesArray);
  }
};

// ==========================================
// UPDATE ARTICLE
// ==========================================

export const updateArticle = async (req, res) => {
  const filesArray = req.files || [];
  const uploaded = [];

  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid article ID.",
      });
    }

    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    const files = getFilesByField(filesArray);
    const incoming = parsePayload(req.body);

    const oldPublicIds =
      collectArticlePublicIds(article);

    const current = article.toObject();

    // Merge existing and incoming content.
    const merged = {
      ...current,
      ...incoming,

      image:
        incoming.image !== undefined
          ? incoming.image
          : current.image,

      imagePublicId:
        incoming.imagePublicId !== undefined
          ? incoming.imagePublicId
          : current.imagePublicId,

      detailHeroImage:
        incoming.detailHeroImage !== undefined
          ? incoming.detailHeroImage
          : current.detailHeroImage,

      detailHeroImagePublicId:
        incoming.detailHeroImagePublicId !== undefined
          ? incoming.detailHeroImagePublicId
          : current.detailHeroImagePublicId,

      contentBlocks:
        incoming.contentBlocks !== undefined
          ? incoming.contentBlocks
          : current.contentBlocks,
    };

    let payload =
      normalizePublicationPayload(merged);

    if (!payload.title || !payload.slug) {
      return res.status(400).json({
        success: false,
        message: "Title and slug are required.",
      });
    }

    // Duplicate slug check.
    const duplicate = await Article.findOne({
      slug: payload.slug,
      _id: { $ne: id },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "This article slug already exists.",
      });
    }

    // Upload and replace images.
    const uploadResult = await uploadPublicationImages(
      payload,
      files,
      article
    );

    uploaded.push(...uploadResult.uploaded);

    const validationError =
      validateRequiredFields(payload);

    if (validationError) {
      await Promise.all(
        uploaded.map((item) =>
          deleteCloudinaryImage(item.publicId)
        )
      );

      uploaded.length = 0;

      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    // Save updated article.
    Object.assign(article, payload);

    await article.save();

    // Find remaining Cloudinary image references.
    const newPublicIds =
      collectArticlePublicIds(article);

    // Delete only images no longer referenced.
    const obsoleteIds = oldPublicIds.filter(
      (publicId) => !newPublicIds.includes(publicId)
    );

    await Promise.all(
      uniqueIds(obsoleteIds).map(
        deleteCloudinaryImage
      )
    );

    console.log(
      "Article updated successfully:",
      article._id
    );

    return res.json({
      success: true,
      message: "Article updated successfully.",
      data: article,
    });
  } catch (error) {
    // Remove newly uploaded files if database update fails.
    await Promise.all(
      uploaded.map((item) =>
        deleteCloudinaryImage(item.publicId)
      )
    );

    console.error("Update article error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    await deleteTemporaryFiles(filesArray);
  }
};

// ==========================================
// DELETE ARTICLE
// ==========================================

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid article ID.",
      });
    }

    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    const publicIds =
      collectArticlePublicIds(article);

    await article.deleteOne();

    await Promise.all(
      publicIds.map(deleteCloudinaryImage)
    );

    return res.json({
      success: true,
      message: "Article and its Cloudinary images deleted successfully.",
    });
  } catch (error) {
    console.error("Delete article error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};