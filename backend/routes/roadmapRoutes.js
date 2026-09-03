import express from 'express';
import { getRoadmapItems, createRoadmapItem, updateRoadmapItem, deleteRoadmapItem } from '../controllers/roadmapController.js';

export const roadmapRouter = express.Router();

roadmapRouter.get('/', getRoadmapItems);
roadmapRouter.post('/', createRoadmapItem);
roadmapRouter.put('/:id', updateRoadmapItem);
roadmapRouter.delete('/:id', deleteRoadmapItem);
