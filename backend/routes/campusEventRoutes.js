import express from 'express';
import { 
  getCampusEvents, 
  createCampusEvent, 
  updateCampusEvent, 
  deleteCampusEvent 
} from '../controllers/campusEventController.js';

export const campusEventRouter = express.Router();

campusEventRouter.get('/', getCampusEvents);
campusEventRouter.post('/', createCampusEvent);
campusEventRouter.put('/:id', updateCampusEvent);
campusEventRouter.delete('/:id', deleteCampusEvent);
