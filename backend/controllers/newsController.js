import mongoose from "mongoose";
import fs from "fs/promises";

import { News } from "../models/News.js";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

const NEWS_FOLDER = "AIA-Project-Assets/News";

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
      throw new Error("Invalid news form data.");
    }
  }

  return body;
};

const parseArray = (value) =>
  Array.isArray(value) ? value : [];

const uniqueIds = (ids = []) =>
  [...new Set(ids.filter(Boolean))];

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
// TEMPORARY FILE CLEANUP
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
// CLOUDINARY HELPERS
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

const collectNewsPublicIds = (news) => {
  if (!news) return [];

  const data = news.toObject
    ? news.toObject()
    : news;

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

  console.log("---------------------------------");
  console.log("NEWS CLOUDINARY UPLOAD");
  console.log("File:", file.originalname);
  console.log("Folder:", folder);
  console.log("---------------------------------");

  const result = await uploadToCloudinary(
    file.path,
    folder
  );

  console.log("NEWS IMAGE UPLOADED:", result.url);
  console.log("NEWS PUBLIC ID:", result.publicId);

  return result;
};

// ==========================================
// UPLOAD AND REPLACE NEWS IMAGES
// ==========================================

const uploadPublicationImages = async (
  payload,
  files,
  oldNews = null
) => {
  const uploaded = [];
  const oldData = oldNews
    ? oldNews.toObject
      ? oldNews.toObject()
      : oldNews
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

    onSuccess(result);
  };

  try {
    // --------------------------------------
    // 1. NEWS LISTING IMAGE
    // --------------------------------------

    await uploadAndReplace({
      file: files.image,
      folder: `${NEWS_FOLDER}/Listing`,
      currentPublicId: oldData.imagePublicId,

      onSuccess: (result) => {
        payload.image = result.url;
        payload.imagePublicId = result.publicId;
      },
    });

    // --------------------------------------
    // 2. NEWS DETAIL HERO IMAGE
    // --------------------------------------

    await uploadAndReplace({
      file: files.detailHeroImage,
      folder: `${NEWS_FOLDER}/Detail-Heroes`,
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
          ) ||
          oldBlocks[index] ||
          {};

        const file = files[`contentBlockImage_${index}`];

        await uploadAndReplace({
          file,
          folder: `${NEWS_FOLDER}/Content-Blocks`,
          currentPublicId:
            oldBlock.imagePublicId || block.imagePublicId,

          onSuccess: (result) => {
            nextBlock.image = result.url;
            nextBlock.imagePublicId = result.publicId;
          },
        });

        // Preserve existing image if no new file is selected.
        if (!file) {
          const sameImage =
            nextBlock.image &&
            nextBlock.image === oldBlock.image;

          if (!nextBlock.imagePublicId && sameImage) {
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
    };
  } catch (error) {
    // Rollback newly uploaded Cloudinary images.
    await Promise.all(
      uploaded.map((item) =>
        deleteCloudinaryImage(item.publicId)
      )
    );

    throw error;
  }
};

// ==========================================
// NORMALIZE NEWS DATA
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

    // Legacy fields preserved.
    introduction: payload.introduction || "",

    sections: parseArray(payload.sections).map(
      (section) => ({
        ...section,
        image: section.image || "",
        imagePublicId: section.imagePublicId || "",
      })
    ),

    closingContent: payload.closingContent || "",

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
    return "News title is required.";
  }

  if (!payload.slug) {
    return "News slug is required.";
  }

  if (!payload.image) {
    return "News listing image is required.";
  }

  return null;
};

// ==========================================
// GET ALL NEWS
// ==========================================

export const getNews = async (req, res) => {
  try {
    const filter =
      req.query.admin === "true"
        ? {}
        : { isActive: { $ne: false } };

    const news = await News.find(filter)
      .sort({
        order: 1,
        createdAt: -1,
      })
      .lean();

    return res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("Get news error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET NEWS BY SLUG
// ==========================================

export const getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({
      slug: req.params.slug,
      isActive: { $ne: false },
    }).lean();

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    return res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("Get news by slug error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// CREATE NEWS
// ==========================================

export const createNews = async (req, res) => {
  const filesArray = req.files || [];
  const uploaded = [];

  try {
    const files = getFilesByField(filesArray);

    const incoming = parsePayload(req.body);

    let payload = normalizePublicationPayload(incoming);

    if (!payload.title || !payload.slug) {
      return res.status(400).json({
        success: false,
        message: "Title and slug are required.",
      });
    }

    // Check duplicate slug.
    const existing = await News.findOne({
      slug: payload.slug,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "This news slug already exists.",
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
      payload.order = await News.countDocuments();
    }

    const news = await News.create(payload);

    console.log(
      "News created successfully:",
      news._id
    );

    return res.status(201).json({
      success: true,
      message: "News created successfully.",
      data: news,
    });
  } catch (error) {
    // Rollback new Cloudinary uploads.
    await Promise.all(
      uploaded.map((item) =>
        deleteCloudinaryImage(item.publicId)
      )
    );

    console.error("Create news error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    await deleteTemporaryFiles(filesArray);
  }
};

// ==========================================
// UPDATE NEWS
// ==========================================

export const updateNews = async (req, res) => {
  const filesArray = req.files || [];
  const uploaded = [];

  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID.",
      });
    }

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    const files = getFilesByField(filesArray);
    const incoming = parsePayload(req.body);

    const oldPublicIds = collectNewsPublicIds(news);
    const current = news.toObject();

    // Merge existing and incoming content.
    const merged = {
      ...current,
      ...incoming,

      image:
        incoming.image !== undefined
          ? incoming.image
          : current.image,

      imagePublicId:
        incoming.imagePublicId ||
        current.imagePublicId ||
        "",

      detailHeroImage:
        incoming.detailHeroImage !== undefined
          ? incoming.detailHeroImage
          : current.detailHeroImage,

      detailHeroImagePublicId:
        incoming.detailHeroImagePublicId ||
        current.detailHeroImagePublicId ||
        "",

      contentBlocks:
        incoming.contentBlocks !== undefined
          ? incoming.contentBlocks
          : current.contentBlocks,
    };

    let payload =
      normalizePublicationPayload(merged);

    // Preserve IDs when image URLs remain unchanged.
    if (
      payload.image === current.image &&
      !files.image
    ) {
      payload.imagePublicId =
        current.imagePublicId || "";
    }

    if (
      payload.detailHeroImage === current.detailHeroImage &&
      !files.detailHeroImage
    ) {
      payload.detailHeroImagePublicId =
        current.detailHeroImagePublicId || "";
    }

    if (!payload.title || !payload.slug) {
      return res.status(400).json({
        success: false,
        message: "Title and slug are required.",
      });
    }

    // Duplicate slug check.
    const duplicate = await News.findOne({
      slug: payload.slug,
      _id: { $ne: id },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "This news slug already exists.",
      });
    }

    // Upload and replace images.
    const uploadResult = await uploadPublicationImages(
      payload,
      files,
      news
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

    // Save updated news.
    Object.assign(news, payload);

    await news.save();

    // Find remaining Cloudinary image references.
    const newPublicIds = collectNewsPublicIds(news);

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
      "News updated successfully:",
      news._id
    );

    return res.json({
      success: true,
      message: "News updated successfully.",
      data: news,
    });
  } catch (error) {
    // Remove newly uploaded files if database update fails.
    await Promise.all(
      uploaded.map((item) =>
        deleteCloudinaryImage(item.publicId)
      )
    );

    console.error("Update news error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    await deleteTemporaryFiles(filesArray);
  }
};

// ==========================================
// DELETE NEWS
// ==========================================

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID.",
      });
    }

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    const publicIds = collectNewsPublicIds(news);

    await news.deleteOne();

    await Promise.all(
      publicIds.map(deleteCloudinaryImage)
    );

    return res.json({
      success: true,
      message:
        "News and its Cloudinary images deleted successfully.",
    });
  } catch (error) {
    console.error("Delete news error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};