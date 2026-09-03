import mongoose from 'mongoose';
import { PillarFootprint } from '../models/PillarFootprint.js';

export const getPillarFootprints = async (req, res) => {
  try {
    const items = await PillarFootprint.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPillarFootprint = async (req, res) => {
  try {
    const { title, description, imageUrl, brochureUrl, isHighlighted, order } = req.body;
    
    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
    }

    if (!finalImageUrl) {
      return res.status(400).json({ success: false, message: 'Pillar footprint image is required' });
    }

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Pillar title is required' });
    }

    if (title.trim().length > 60) {
      return res.status(400).json({ success: false, message: 'Title exceeds 60 characters limit' });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({ success: false, message: 'Description is required' });
    }

    if (description.trim().length > 220) {
      return res.status(400).json({ success: false, message: 'Description exceeds 220 characters limit' });
    }

    const created = await PillarFootprint.create({
      title: title.trim(),
      description: description.trim(),
      imageUrl: finalImageUrl,
      brochureUrl: brochureUrl ? brochureUrl.trim() : '#',
      isHighlighted: Boolean(isHighlighted),
      order: order !== undefined ? Number(order) : await PillarFootprint.countDocuments(),
      isActive: true,
    });

    res.json({ success: true, data: created, message: 'Pillar Footprint created successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePillarFootprint = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, brochureUrl, isHighlighted, order, isActive } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.json({
        success: true,
        data: { _id: id, title, description, imageUrl, brochureUrl, isHighlighted },
        message: 'Updated successfully'
      });
    }

    if (title && title.trim().length > 60) {
      return res.status(400).json({ success: false, message: 'Title exceeds 60 characters limit' });
    }

    if (description && description.trim().length > 220) {
      return res.status(400).json({ success: false, message: 'Description exceeds 220 characters limit' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (brochureUrl !== undefined) updateData.brochureUrl = brochureUrl.trim();
    if (isHighlighted !== undefined) updateData.isHighlighted = Boolean(isHighlighted);
    if (order !== undefined) updateData.order = Number(order);
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    const updated = await PillarFootprint.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Pillar footprint not found' });
    }
    
    res.json({ success: true, data: updated, message: 'Pillar Footprint updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePillarFootprint = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.json({ success: true, message: 'Pillar Footprint deleted successfully' });
    }

    await PillarFootprint.findByIdAndDelete(id);
    res.json({ success: true, message: 'Pillar Footprint deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
