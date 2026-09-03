import express from 'express';
import { 
  getInitiatives, 
  createInitiative, 
  updateInitiative, 
  deleteInitiative 
} from '../controllers/initiativeController.js';

export const initiativeRouter = express.Router();

initiativeRouter.get('/', getInitiatives);
initiativeRouter.post('/', createInitiative);
initiativeRouter.put('/:id', updateInitiative);
initiativeRouter.delete('/:id', deleteInitiative);
