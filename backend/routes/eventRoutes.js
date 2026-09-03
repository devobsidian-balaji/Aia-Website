import express from 'express';
import { 
  getEvents, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from '../controllers/eventController.js';

export const eventRouter = express.Router();

eventRouter.get('/', getEvents);
eventRouter.post('/', createEvent);
eventRouter.put('/:id', updateEvent);
eventRouter.delete('/:id', deleteEvent);
