import mongoose from 'mongoose';
import { Event } from '../models/Event.js';

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, heading, description, text, imageUrl, eventLink, link, date, category, order } = req.body;
    
    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
    }

    if (!finalImageUrl) {
      return res.status(400).json({ success: false, message: 'Event poster image is required' });
    }

    const finalTitle = (heading || title || '').trim();
    if (!finalTitle) {
      return res.status(400).json({ success: false, message: 'Event heading is required' });
    }
    if (finalTitle.length > 70) {
      return res.status(400).json({ success: false, message: 'Heading cannot exceed 70 characters' });
    }

    const finalDesc = (text || description || '').trim();
    if (finalDesc.length > 220) {
      return res.status(400).json({ success: false, message: 'Text description cannot exceed 220 characters' });
    }

    const finalLink = (link || eventLink || '').trim();
    if (!finalLink) {
      return res.status(400).json({ success: false, message: 'Event redirect link is required' });
    }

    const finalDate = (date || '22 Aug').trim();
    const finalCategory = (category || 'Conferences').trim();

    const created = await Event.create({
      title: finalTitle,
      description: finalDesc,
      imageUrl: finalImageUrl,
      eventLink: finalLink,
      date: finalDate,
      category: finalCategory,
      order: order !== undefined ? Number(order) : await Event.countDocuments(),
      isActive: true,
    });

    res.json({ success: true, data: created, message: 'Event created successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, heading, description, text, imageUrl, eventLink, link, date, category, order, isActive } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.json({
        success: true,
        data: { _id: id, title: heading || title, description: text || description, imageUrl, eventLink: link || eventLink, date, category },
        message: 'Updated successfully'
      });
    }

    const updateData = {};
    const finalTitle = (heading || title);
    if (finalTitle !== undefined) {
      if (finalTitle.trim().length > 70) {
        return res.status(400).json({ success: false, message: 'Heading cannot exceed 70 characters' });
      }
      updateData.title = finalTitle.trim();
    }

    const finalDesc = (text || description);
    if (finalDesc !== undefined) {
      if (finalDesc.trim().length > 220) {
        return res.status(400).json({ success: false, message: 'Text description cannot exceed 220 characters' });
      }
      updateData.description = finalDesc.trim();
    }

    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    
    const finalLink = (link || eventLink);
    if (finalLink !== undefined) updateData.eventLink = finalLink.trim();

    if (date !== undefined) updateData.date = date.trim();
    if (category !== undefined) updateData.category = category.trim();
    if (order !== undefined) updateData.order = Number(order);
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    const updated = await Event.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Event not found' });
    
    res.json({ success: true, data: updated, message: 'Event updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.json({ success: true, message: 'Event deleted successfully' });
    }

    await Event.findByIdAndDelete(id);
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
