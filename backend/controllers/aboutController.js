import mongoose from 'mongoose';
import { AboutContent } from '../models/AboutContent.js';

export const getAboutContents = async (req, res) => {
  try {
    const contents = await AboutContent.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: contents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createAboutContent = async (req, res) => {
  try {
    const { title, subtitle, description, imageUrl, stats, isFeatured } = req.body;
    
    // Check if file uploaded via multer
    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
    }

    if (!finalImageUrl) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    const created = await AboutContent.create({
      title: title || 'About AIA',
      subtitle: subtitle || '',
      description: description || '',
      imageUrl: finalImageUrl,
      stats: stats || {
        number1: '250+', label1: 'Members',
        number2: '90%', label2: 'Industry Adoption',
        number3: '17+', label3: 'Years of Excellence'
      },
      isFeatured: isFeatured || false,
    });

    res.json({ success: true, data: created, message: 'About content added successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAboutContent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid About Content ID' });
    }
    const updated = await AboutContent.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'About content not found' });
    res.json({ success: true, data: updated, message: 'About content updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAboutContent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid About Content ID' });
    }
    const deleted = await AboutContent.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Content not found' });
    res.json({ success: true, message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
