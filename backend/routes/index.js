import { Router } from 'express';
import { bannerRouter } from './bannerRoutes.js';
import { serviceRouter } from './serviceRoutes.js';
import { aboutRouter } from './aboutRoutes.js';
import { roadmapRouter } from './roadmapRoutes.js';
import { councilRouter } from './councilRoutes.js';
import { pastPresidentRouter } from './pastPresidentRoutes.js';
import { eventRouter } from './eventRoutes.js';
import { initiativeRouter } from './initiativeRoutes.js';
import { pillarFootprintRouter } from './pillarFootprintRoutes.js';
import { campusEventRouter } from './campusEventRoutes.js';
import { statsRouter } from './statsRoutes.js';

const apiRouter = Router();

// Modular Route Registrations
apiRouter.use('/banners', bannerRouter);
apiRouter.use('/services', serviceRouter);
apiRouter.use('/about', aboutRouter);
apiRouter.use('/roadmap', roadmapRouter);
apiRouter.use('/council', councilRouter);
apiRouter.use('/past-presidents', pastPresidentRouter);
apiRouter.use('/events', eventRouter);
apiRouter.use('/initiatives', initiativeRouter);
apiRouter.use('/pillar-footprints', pillarFootprintRouter);
apiRouter.use('/campus-events', campusEventRouter);
apiRouter.use('/stats', statsRouter);

export default apiRouter;
