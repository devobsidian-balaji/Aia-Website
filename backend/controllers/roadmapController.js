import { Roadmap } from '../models/Roadmap.js';

export const getRoadmapItems = async (req, res) => {
  try {
    const items = await Roadmap.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createRoadmapItem = async (req, res) => {
  try {
    const { heading, description, imageUrl, category, order } = req.body;
    
    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
    }

    if (!finalImageUrl) {
      return res.status(400).json({ success: false, message: 'Image is required for roadmap milestone' });
    }

    const created = await Roadmap.create({
      heading: heading || 'Vision / Milestone',
      description: description || '',
      imageUrl: finalImageUrl,
      category: category || 'Vision',
      order: order !== undefined ? order : await Roadmap.countDocuments(),
      isActive: true,
    });

    res.json({ success: true, data: created, message: 'Roadmap item added successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRoadmapItem = async (req, res) => {
  try {
    const updated = await Roadmap.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Roadmap item not found' });
    res.json({ success: true, data: updated, message: 'Roadmap item updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteRoadmapItem = async (req, res) => {
  try {
    const deleted = await Roadmap.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Roadmap item not found' });
    res.json({ success: true, message: 'Roadmap item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
