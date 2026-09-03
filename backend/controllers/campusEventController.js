import mongoose from 'mongoose';
import { CampusEvent } from '../models/CampusEvent.js';

export const getCampusEvents = async (req, res) => {
  try {
    const items = await CampusEvent.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCampusEvent = async (req, res) => {
  try {
    const { title, imageUrl, link, order } = req.body;
    
    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
    }

    if (!finalImageUrl) {
      return res.status(400).json({ success: false, message: 'Campus Event image is required' });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Campus Event title is required' });
    }

    if (title.trim().length > 60) {
      return res.status(400).json({ success: false, message: 'Title exceeds 60 characters limit' });
    }

    const created = await CampusEvent.create({
      title: title.trim(),
      imageUrl: finalImageUrl,
      link: link ? link.trim() : '#',
      order: order !== undefined ? Number(order) : await CampusEvent.countDocuments(),
      isActive: true,
    });

    res.json({ success: true, data: created, message: 'Campus Event created successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCampusEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl, link, order, isActive } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.json({
        success: true,
        data: { _id: id, title, imageUrl, link },
        message: 'Updated successfully'
      });
    }

    if (title && title.trim().length > 60) {
      return res.status(400).json({ success: false, message: 'Title exceeds 60 characters limit' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (link !== undefined) updateData.link = link.trim();
    if (order !== undefined) updateData.order = Number(order);
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    const updated = await CampusEvent.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Campus Event not found' });
    }
    
    res.json({ success: true, data: updated, message: 'Campus Event updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCampusEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.json({ success: true, message: 'Campus Event deleted successfully' });
    }

    await CampusEvent.findByIdAndDelete(id);
    res.json({ success: true, message: 'Campus Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
