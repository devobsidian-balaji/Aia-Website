import express from 'express';
import { Banner } from '../models/Banner.js';
import { Service } from '../models/Service.js';
import { AboutContent } from '../models/AboutContent.js';
import { Roadmap } from '../models/Roadmap.js';
import { Event } from '../models/Event.js';
import { Initiative } from '../models/Initiative.js';
import { PillarFootprint } from '../models/PillarFootprint.js';
import { CampusEvent } from '../models/CampusEvent.js';

export const statsRouter = express.Router();

statsRouter.get('/', async (req, res) => {
  try {
    const [
      bannerCount,
      serviceCount,
      aboutCount,
      roadmapCount,
      eventCount,
      initiativeCount,
      footprintCount,
      campusEventCount
    ] = await Promise.all([
      Banner.countDocuments(),
      Service.countDocuments(),
      AboutContent.countDocuments(),
      Roadmap.countDocuments(),
      Event.countDocuments(),
      Initiative.countDocuments(),
      PillarFootprint.countDocuments(),
      CampusEvent.countDocuments(),
    ]);

    res.json({
      success: true,
      data: {
        banners: bannerCount,
        services: serviceCount,
        about: aboutCount,
        roadmap: roadmapCount,
        events: eventCount,
        initiatives: initiativeCount,
        footprints: footprintCount,
        campusEvents: campusEventCount,
        queries: 18,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
