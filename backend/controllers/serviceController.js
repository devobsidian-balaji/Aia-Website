import { Service } from '../models/Service.js';

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, duration, description, highlights, icon, isActive } = req.body;
    
    let parsedHighlights = [];
    if (Array.isArray(highlights)) {
      parsedHighlights = highlights;
    } else if (typeof highlights === 'string') {
      parsedHighlights = highlights.split(',').map(h => h.trim()).filter(Boolean);
    }

    const service = await Service.create({
      title: title || 'New Service',
      duration: duration || '',
      description: description || '',
      highlights: parsedHighlights,
      icon: icon || 'cpu',
      isActive: isActive !== undefined ? isActive : true,
    });

    res.json({ success: true, data: service, message: 'Service added successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { title, duration, description, highlights, icon, isActive } = req.body;
    
    let parsedHighlights;
    if (highlights !== undefined) {
      if (Array.isArray(highlights)) {
        parsedHighlights = highlights;
      } else if (typeof highlights === 'string') {
        parsedHighlights = highlights.split(',').map(h => h.trim()).filter(Boolean);
      }
    }

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title }),
        ...(duration !== undefined && { duration }),
        ...(description && { description }),
        ...(parsedHighlights && { highlights: parsedHighlights }),
        ...(icon && { icon }),
        ...(isActive !== undefined && { isActive }),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: updated, message: 'Service updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
