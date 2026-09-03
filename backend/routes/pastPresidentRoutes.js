import express from 'express';
import { 
  getPastPresidents, 
  createPastPresident, 
  updatePastPresident, 
  deletePastPresident 
} from '../controllers/pastPresidentController.js';

export const pastPresidentRouter = express.Router();

pastPresidentRouter.get('/', getPastPresidents);
pastPresidentRouter.post('/', createPastPresident);
pastPresidentRouter.put('/:id', updatePastPresident);
pastPresidentRouter.delete('/:id', deletePastPresident);
