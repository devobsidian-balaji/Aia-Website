import { Banner } from '../models/Banner.js';

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBanner = async (req, res) => {
  try {
    const { name, base64Images, imageUrl, isFullScreen } = req.body;
    const createdBanners = [];

    // 1. Multer files
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const banner = await Banner.create({
          name: req.files.length > 1 ? `${name || 'Banner'} ${i + 1}` : (name || 'Home Banner'),
          imageUrl: `http://localhost:${process.env.PORT || 5000}/uploads/${file.filename}`,
          isActive: true,
          order: i,
        });
        createdBanners.push(banner);
      }
      return res.json({ success: true, data: createdBanners, message: 'Banners uploaded successfully!' });
    }

    // 2. Base64 images
    if (base64Images && Array.isArray(base64Images) && base64Images.length > 0) {
      for (let i = 0; i < base64Images.length; i++) {
        const banner = await Banner.create({
          name: base64Images.length > 1 ? `${name || 'Banner'} ${i + 1}` : (name || 'Home Banner'),
          imageUrl: base64Images[i],
          isActive: true,
          order: i,
        });
        createdBanners.push(banner);
      }
      return res.json({ success: true, data: createdBanners, message: 'Banners created successfully!' });
    }

    // 3. Direct URL
    if (imageUrl) {
      const banner = await Banner.create({
        name: name || 'Home Banner',
        imageUrl: imageUrl,
        isActive: true,
      });
      return res.json({ success: true, data: [banner], message: 'Banner added successfully!' });
    }

    return res.status(400).json({ success: false, message: 'No images provided' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const { name, isActive, order } = req.body;
    const updated = await Banner.findByIdAndUpdate(
      req.params.id,
      { ...(name && { name }), ...(isActive !== undefined && { isActive }), ...(order !== undefined && { order }) },
      { new: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Banner not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const deleted = await Banner.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Banner not found' });
    res.json({ success: true, message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
