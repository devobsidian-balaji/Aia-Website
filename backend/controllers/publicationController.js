import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Publication } from '../models/Publication.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Helper to save base64 image strings as files on disk
const processImageToUrl = (imgStr) => {
  if (!imgStr || typeof imgStr !== 'string') return null;

  // If already a URL or relative path, return it directly
  if (imgStr.startsWith('http://') || imgStr.startsWith('https://') || imgStr.startsWith('/uploads/')) {
    return imgStr;
  }

  // If base64 data URL
  const match = imgStr.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
  if (match) {
    try {
      const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
      const base64Data = match[2];
      const filename = `pub_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
      const filepath = path.join(uploadsDir, filename);

      fs.writeFileSync(filepath, Buffer.from(base64Data, 'base64'));
      return `/uploads/${filename}`;
    } catch (err) {
      console.warn('Failed to write base64 to disk, keeping raw base64 string:', err.message);
      return imgStr;
    }
  }

  return imgStr;
};

// Get all publications (optionally filtered by active status or query)
export const getPublications = async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : {};
    const publications = await Publication.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: publications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single publication by ID
export const getPublicationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ success: false, message: 'Invalid publication ID' });
    }
    const publication = await Publication.findById(id);
    if (!publication) {
      return res.status(404).json({ success: false, message: 'Publication not found' });
    }
    res.json({ success: true, data: publication });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new publication
export const createPublication = async (req, res) => {
  try {
    const {
      title,
      description,
      images,
      imageUrl,
      link,
      category,
      date,
      author,
      order,
      isActive
    } = req.body;

    const finalTitle = (title || '').trim();
    if (!finalTitle) {
      return res.status(400).json({ success: false, message: 'Publication title is required' });
    }

    const finalDescription = (description || '').trim();
    if (!finalDescription) {
      return res.status(400).json({ success: false, message: 'Publication description is required' });
    }

    // Collect raw images
    let rawImages = [];
    if (Array.isArray(images) && images.length > 0) {
      rawImages = images.filter(img => typeof img === 'string' && img.trim() !== '');
    } else if (imageUrl && typeof imageUrl === 'string') {
      rawImages = [imageUrl.trim()];
    }

    if (rawImages.length === 0) {
      return res.status(400).json({ success: false, message: 'At least 1 publication image is required' });
    }

    // Process all images to disk URLs for high performance & light storage
    const finalImages = rawImages.map(processImageToUrl).filter(Boolean);

    const count = await Publication.countDocuments();

    const created = await Publication.create({
      title: finalTitle,
      description: finalDescription,
      images: finalImages,
      link: (link || '').trim(),
      category: (category || 'Articles').trim(),
      date: (date || 'Aug 2026').trim(),
      author: (author || 'Automation Industry Association').trim(),
      order: order !== undefined ? Number(order) : count + 1,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    res.json({ success: true, data: created, message: 'Publication published successfully!' });
  } catch (error) {
    console.error('Publication create error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to create publication' });
  }
};

// Update publication
export const updatePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      images,
      imageUrl,
      link,
      category,
      date,
      author,
      order,
      isActive
    } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid publication ID' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    
    if (images !== undefined) {
      if (Array.isArray(images) && images.length > 0) {
        const raw = images.filter(img => typeof img === 'string' && img.trim() !== '');
        updateData.images = raw.map(processImageToUrl).filter(Boolean);
      }
    } else if (imageUrl !== undefined && imageUrl.trim()) {
      const processed = processImageToUrl(imageUrl.trim());
      if (processed) updateData.images = [processed];
    }

    if (link !== undefined) updateData.link = link.trim();
    if (category !== undefined) updateData.category = category.trim();
    if (date !== undefined) updateData.date = date.trim();
    if (author !== undefined) updateData.author = author.trim();
    if (order !== undefined) updateData.order = Number(order);
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    const updated = await Publication.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Publication not found' });
    }

    res.json({ success: true, data: updated, message: 'Publication updated successfully!' });
  } catch (error) {
    console.error('Publication update error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to update publication' });
  }
};

// Delete publication
export const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid publication ID' });
    }

    await Publication.findByIdAndDelete(id);
    res.json({ success: true, message: 'Publication deleted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
