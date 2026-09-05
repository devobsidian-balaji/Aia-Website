import express from 'express';
import { 
  getPublications, 
  getPublicationById,
  createPublication, 
  updatePublication, 
  deletePublication 
} from '../controllers/publicationController.js';

export const publicationRouter = express.Router();

publicationRouter.get('/', getPublications);
publicationRouter.get('/:id', getPublicationById);
publicationRouter.post('/', createPublication);
publicationRouter.put('/:id', updatePublication);
publicationRouter.delete('/:id', deletePublication);
