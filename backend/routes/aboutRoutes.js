import express from 'express';
import { getAboutContents, createAboutContent, updateAboutContent, deleteAboutContent } from '../controllers/aboutController.js';

export const aboutRouter = express.Router();

aboutRouter.get('/', getAboutContents);
aboutRouter.post('/', createAboutContent);
aboutRouter.put('/:id', updateAboutContent);
aboutRouter.delete('/:id', deleteAboutContent);
