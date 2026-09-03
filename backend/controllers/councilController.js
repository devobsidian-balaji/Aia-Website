import { CouncilMember } from '../models/CouncilMember.js';

export const getCouncilMembers = async (req, res) => {
  try {
    const members = await CouncilMember.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCouncilMember = async (req, res) => {
  try {
    const { name, role, fullRole, companyName, imageUrl, order } = req.body;
    
    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`;
    }

    if (!finalImageUrl) {
      return res.status(400).json({ success: false, message: 'Member photograph is required' });
    }

    if (!name || !role || !companyName) {
      return res.status(400).json({ success: false, message: 'Name, Role, and Company Name are required' });
    }

    const created = await CouncilMember.create({
      name: name.trim(),
      role: role.trim(),
      fullRole: fullRole ? fullRole.trim() : '',
      companyName: companyName.trim(),
      imageUrl: finalImageUrl,
      order: order !== undefined ? order : await CouncilMember.countDocuments(),
      isActive: true,
    });

    res.json({ success: true, data: created, message: 'Council Executive Member added successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCouncilMember = async (req, res) => {
  try {
    const updated = await CouncilMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Council member not found' });
    res.json({ success: true, data: updated, message: 'Council member updated successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCouncilMember = async (req, res) => {
  try {
    const deleted = await CouncilMember.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Council member not found' });
    res.json({ success: true, message: 'Council member deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
