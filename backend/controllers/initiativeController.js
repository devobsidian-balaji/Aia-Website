import { Initiative } from '../models/Initiative.js';

export const getInitiatives = async (req, res) => {
  try {
    const initiatives = await Initiative.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: initiatives });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createInitiative = async (req, res) => {
  try {
    const { title, information, imageUrl, link, order } = req.body;
    
    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
    }

    if (!finalImageUrl) {
      return res.status(400).json({ success: false, message: 'Initiative image is required' });
    }

    if (!title || !information) {
      return res.status(400).json({ success: false, message: 'Title and Information are required' });
    }

    const created = await Initiative.create({
      title: title.trim(),
      information: information.trim(),
      imageUrl: finalImageUrl,
      link: link ? link.trim() : '#',
      order: order !== undefined ? order : await Initiative.countDocuments(),
      isActive: true,
    });

    res.json({ success: true, data: created, message: 'Initiative created successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInitiative = async (req, res) => {
  try {
    const updated = await Initiative.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Initiative not found' });
    res.json({ success: true, data: updated, message: 'Initiative updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteInitiative = async (req, res) => {
  try {
    const deleted = await Initiative.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Initiative not found' });
    res.json({ success: true, message: 'Initiative deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
