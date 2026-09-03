import express from 'express';
import { getServices, createService, updateService, deleteService } from '../controllers/serviceController.js';

export const serviceRouter = express.Router();

serviceRouter.get('/', getServices);
serviceRouter.post('/', createService);
serviceRouter.put('/:id', updateService);
serviceRouter.delete('/:id', deleteService);
