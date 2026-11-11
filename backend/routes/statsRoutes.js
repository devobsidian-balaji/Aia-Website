// import express from 'express';
// import { Banner } from '../models/Banner.js';
// import { Service } from '../models/Service.js';
// import { AboutContent } from '../models/AboutContent.js';
// import { Roadmap } from '../models/Roadmap.js';
// import { Event } from '../models/Event.js';
// import { Initiative } from '../models/Initiative.js';
// import { PillarFootprint } from '../models/PillarFootprint.js';
// import { CampusEvent } from '../models/CampusEvent.js';
// import { Publication } from '../models/Publication.js';

// export const statsRouter = express.Router();

// statsRouter.get('/', async (req, res) => {
//   try {
//     const [
//       bannerCount,
//       serviceCount,
//       aboutCount,
//       roadmapCount,
//       eventCount,
//       initiativeCount,
//       footprintCount,
//       campusEventCount,
//       publicationCount
//     ] = await Promise.all([
//       Banner.countDocuments(),
//       Service.countDocuments(),
//       AboutContent.countDocuments(),
//       Roadmap.countDocuments(),
//       Event.countDocuments(),
//       Initiative.countDocuments(),
//       PillarFootprint.countDocuments(),
//       CampusEvent.countDocuments(),
//       Publication.countDocuments(),
//     ]);

//     res.json({
//       success: true,
//       data: {
//         banners: bannerCount,
//         services: serviceCount,
//         about: aboutCount,
//         roadmap: roadmapCount,
//         events: eventCount,
//         initiatives: initiativeCount,
//         footprints: footprintCount,
//         campusEvents: campusEventCount,
//         publications: publicationCount,
//         queries: 18,
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });



import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import { Banner } from "../models/Banner.js";
import { Service } from "../models/Service.js";
import { AboutContent } from "../models/AboutContent.js";
import { Roadmap } from "../models/Roadmap.js";
import { Event } from "../models/Event.js";
import { Initiative } from "../models/Initiative.js";
import { PillarFootprint } from "../models/PillarFootprint.js";
import { CampusEvent } from "../models/CampusEvent.js";
import { Publication } from "../models/Publication.js";

export const statsRouter = express.Router();

// Admin only: Dashboard statistics
statsRouter.get("/", adminAuth, async (req, res) => {
  try {
    const [
      bannerCount,
      serviceCount,
      aboutCount,
      roadmapCount,
      eventCount,
      initiativeCount,
      footprintCount,
      campusEventCount,
      publicationCount,
    ] = await Promise.all([
      Banner.countDocuments(),
      Service.countDocuments(),
      AboutContent.countDocuments(),
      Roadmap.countDocuments(),
      Event.countDocuments(),
      Initiative.countDocuments(),
      PillarFootprint.countDocuments(),
      CampusEvent.countDocuments(),
      Publication.countDocuments(),
    ]);

    return res.status(200).json({
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
        publications: publicationCount,
        queries: 18,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics.",
    });
  }
});
