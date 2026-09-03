import express from 'express';
import { getBanners, createBanner, updateBanner, deleteBanner } from '../controllers/bannerController.js';

export const bannerRouter = express.Router();

bannerRouter.get('/', getBanners);
bannerRouter.post('/', createBanner);
bannerRouter.put('/:id', updateBanner);
bannerRouter.delete('/:id', deleteBanner);
