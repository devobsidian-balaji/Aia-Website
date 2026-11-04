
import { Article } from "../models/Article.js";

export const getArticles = async (req, res) => {
  try {
    const { admin } = req.query;

    const filter = admin === "true" ? {} : { isActive: true };

    const articles = await Article.find(filter).sort({
      order: 1,
      createdAt: -1,
    });

    res.json({ success: true, data: articles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    res.json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createArticle = async (req, res) => {
  try {
    const {
      title,
      slug,
      image,
      imageAlt,
      category,
      categoryLink,
      introduction,
      detailCoverImage,
      author,
      sections,
    } = req.body;

    if (!title?.trim() || !slug?.trim() || !image) {
      return res.status(400).json({
        success: false,
        message: "Title, slug and card image are required.",
      });
    }

    const normalizedSlug = slug.trim().toLowerCase();

    const existing = await Article.findOne({ slug: normalizedSlug });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "This article slug already exists.",
      });
    }

    const article = await Article.create({
      title: title.trim(),
      slug: normalizedSlug,
      image,
      imageAlt,
      category,
      categoryLink,
      introduction,
      detailCoverImage,
      author,
      sections: Array.isArray(sections) ? sections : [],
      order: await Article.countDocuments(),
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "Article created successfully.",
      data: article,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (payload.slug) {
      payload.slug = payload.slug.trim().toLowerCase();

      const duplicate = await Article.findOne({
        slug: payload.slug,
        _id: { $ne: req.params.id },
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "This article slug already exists.",
        });
      }
    }

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    res.json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    res.json({ success: true, message: "Article deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
