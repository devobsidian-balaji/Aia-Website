import { PastPresident } from '../models/PastPresident.js';

export const getPastPresidents = async (req, res) => {
  try {
    const presidents = await PastPresident.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: presidents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPastPresident = async (req, res) => {
  try {
    const { name, term, role, description, imageUrl, order } = req.body;
    
    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
    }

    if (!finalImageUrl) {
      return res.status(400).json({ success: false, message: 'President photograph is required' });
    }

    if (!name || !term || !description) {
      return res.status(400).json({ success: false, message: 'Name, Tenure/Term, and Description are required' });
    }

    const created = await PastPresident.create({
      name: name.trim(),
      term: term.trim(),
      role: role ? role.trim() : 'Past President',
      description: description.trim(),
      imageUrl: finalImageUrl,
      order: order !== undefined ? order : await PastPresident.countDocuments(),
      isActive: true,
    });

    res.json({ success: true, data: created, message: 'Past President added successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePastPresident = async (req, res) => {
  try {
    const updated = await PastPresident.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Past President not found' });
    res.json({ success: true, data: updated, message: 'Past President updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePastPresident = async (req, res) => {
  try {
    const deleted = await PastPresident.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Past President not found' });
    res.json({ success: true, message: 'Past President deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
