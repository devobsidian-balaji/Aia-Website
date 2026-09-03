import express from 'express';
import { 
  getCouncilMembers, 
  createCouncilMember, 
  updateCouncilMember, 
  deleteCouncilMember 
} from '../controllers/councilController.js';

export const councilRouter = express.Router();

councilRouter.get('/', getCouncilMembers);
councilRouter.post('/', createCouncilMember);
councilRouter.put('/:id', updateCouncilMember);
councilRouter.delete('/:id', deleteCouncilMember);
