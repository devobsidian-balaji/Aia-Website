
import { News } from "../models/News.js";

export const getNews = async (req, res) => {
  try {
    const filter = req.query.admin === "true" ? {} : { isActive: true };

    const news = await News.find(filter).sort({
      order: 1,
      createdAt: -1,
    });

    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const {
      title,
      slug,
      image,
      imageAlt,
      category,
      categoryLink,
      introduction,
      content,
      detailCoverImage,
      author,
      publishedAt,
    } = req.body;

    if (!title?.trim() || !slug?.trim() || !image) {
      return res.status(400).json({
        success: false,
        message: "Title, slug and card image are required.",
      });
    }

    const normalizedSlug = slug.trim().toLowerCase();

    if (await News.findOne({ slug: normalizedSlug })) {
      return res.status(409).json({
        success: false,
        message: "This news slug already exists.",
      });
    }

    const created = await News.create({
      title: title.trim(),
      slug: normalizedSlug,
      image,
      imageAlt,
      category,
      categoryLink,
      introduction,
      content,
      detailCoverImage,
      author,
      publishedAt,
      order: await News.countDocuments(),
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "News created successfully.",
      data: created,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (payload.slug) {
      payload.slug = payload.slug.trim().toLowerCase();

      const duplicate = await News.findOne({
        slug: payload.slug,
        _id: { $ne: req.params.id },
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "This news slug already exists.",
        });
      }
    }

    const updated = await News.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    res.json({ success: true, message: "News deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
