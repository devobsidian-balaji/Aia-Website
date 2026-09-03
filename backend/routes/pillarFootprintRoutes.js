import express from 'express';
import { 
  getPillarFootprints, 
  createPillarFootprint, 
  updatePillarFootprint, 
  deletePillarFootprint 
} from '../controllers/pillarFootprintController.js';

export const pillarFootprintRouter = express.Router();

pillarFootprintRouter.get('/', getPillarFootprints);
pillarFootprintRouter.post('/', createPillarFootprint);
pillarFootprintRouter.put('/:id', updatePillarFootprint);
pillarFootprintRouter.delete('/:id', deletePillarFootprint);
