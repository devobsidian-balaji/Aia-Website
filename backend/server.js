import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import apiRouter from './routes/index.js';
import { Banner } from './models/Banner.js';
import { Service } from './models/Service.js';
import { Event } from './models/Event.js';
import { Initiative } from './models/Initiative.js';
import { PillarFootprint } from './models/PillarFootprint.js';
import { CampusEvent } from './models/CampusEvent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Global Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static Uploads Serving
app.use('/uploads', express.static(uploadsDir, {
  maxAge: '30d',
  immutable: true,
}));

// Master API Routing
app.use('/api', apiRouter);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve Frontend SPA in Production (Render, Railway, VPS, etc.)
const distDir = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path === '/health') {
      return next();
    }
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

// Connect to Database and Seed Defaults
connectDB().then(() => {
  seedInitialData();
});

async function seedInitialData() {
  try {
    // 1. Seed Default Initial Hero Banner
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      await Banner.create([
        {
          name: 'Hero Smart Manufacturing Engineer',
          imageUrl: '/hero-engineer.png',
          isActive: true,
          order: 1,
        }
      ]);
    }

    // 2. Seed Default Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.create([
        {
          title: 'Industry 4.0 Skilling & Certification',
          duration: '6 Months / Executive',
          description: 'Comprehensive hands-on training on cyber-physical systems, IIoT architecture, and automated quality diagnostics at IIT Delhi CEFC.',
          highlights: ['Industry-focused curriculum', 'Hands-on CEFC Testbed Access', 'Govt Recognized Certification', 'Flexible Weekend Schedule'],
          icon: 'cpu',
          isActive: true,
          order: 1,
        },
        {
          title: 'Smart Factory Assessment & Roadmap (SIRI)',
          duration: '4 Weeks Program',
          description: 'Standardized readiness evaluation for MSMEs and large manufacturers to identify hidden bottlenecks and implement prioritized automation.',
          highlights: ['SIRI Framework Diagnostics', 'ROI & Value Stream Mapping', 'Vendor-Neutral SI Advisory', 'Detailed Digital Roadmap'],
          icon: 'target',
          isActive: true,
          order: 2,
        },
        {
          title: 'Cyber-Physical Testbed & PoC Verification',
          duration: 'On-Demand / Project-Based',
          description: 'Live physical simulation and testing of robotics, PLC networks, and edge sensors before full-scale factory rollout.',
          highlights: ['Zero Production Downtime PoC', 'Multi-OEM Interoperability', 'Data Analytics & ML Integration', 'Faculty & Mentor Support'],
          icon: 'layers',
          isActive: true,
          order: 3,
        }
      ]);
    }

    // 3. Seed Default Events matching Image 1
    const eventCount = await Event.countDocuments();
    if (eventCount < 3) {
      await Event.deleteMany({});
      await Event.create([
        {
          title: 'Smart Automation for Manufacturing...',
          description: "AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of 'Make In India' movement.",
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop',
          eventLink: 'https://himtex.in',
          date: '22 Aug',
          category: 'Conferences',
          order: 1,
          isActive: true,
        },
        {
          title: 'ANUTEC – International FoodTEC India Mumbai...',
          description: 'AIA is proud to voice messages across industry forums. Members and team from AIA helped host over a part of several such delegations.',
          imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=1000&fit=crop',
          eventLink: 'https://himtex.in',
          date: '24 Aug',
          category: 'Conferences',
          order: 2,
          isActive: true,
        },
        {
          title: 'Smart Automation for Manufacturing : Hosur',
          description: "AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of 'Make In India' movement.",
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop',
          eventLink: 'https://himtex.in',
          date: '02 Sep',
          category: 'Conferences',
          order: 3,
          isActive: true,
        },
        {
          title: 'Smart Automation for Manufacturing...',
          description: "AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of 'Make In India' movement.",
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop',
          eventLink: 'https://himtex.in',
          date: '22 Aug',
          category: 'Conferences',
          order: 4,
          isActive: true,
        },
        {
          title: 'ANUTEC – International FoodTEC India Mumbai...',
          description: 'AIA is proud to voice messages across industry forums. Members and team from AIA helped host over a part of several such delegations.',
          imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=1000&fit=crop',
          eventLink: 'https://himtex.in',
          date: '24 Aug',
          category: 'Conferences',
          order: 5,
          isActive: true,
        },
        {
          title: 'Smart Automation for Manufacturing : Hosur',
          description: "AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of 'Make In India' movement.",
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=1000&fit=crop',
          eventLink: 'https://himtex.in',
          date: '02 Sep',
          category: 'Conferences',
          order: 6,
          isActive: true,
        }
      ]);
    }

    // 4. Seed Default Initiatives
    const initiativeCount = await Initiative.countDocuments();
    if (initiativeCount === 0) {
      await Initiative.create([
        {
          title: 'Government Initiatives',
          information: 'AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of "Make In India" movement.',
          imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=700&h=700&fit=crop',
          link: '#',
          order: 1,
          isActive: true,
        },
        {
          title: 'Industry Initiatives',
          information: 'AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of "Make In India" movement.',
          imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=700&h=700&fit=crop',
          link: '#',
          order: 2,
          isActive: true,
        },
        {
          title: 'SAMARTH Udyog',
          information: 'AIA participates in several industry conferences on the topic of smart automation for SMEs, in the context of "Make In India" movement.',
          imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=700&h=700&fit=crop',
          link: '#',
          order: 3,
          isActive: true,
        }
      ]);
    }

    // 5. Seed Default Pillar Footprints
    const footprintCount = await PillarFootprint.countDocuments();
    if (footprintCount === 0) {
      await PillarFootprint.create([
        {
          title: 'Knowledge infrastructure',
          description: 'Comprising curriculum, exercises and teaching learning material.',
          imageUrl: '/Campusconnect/Knowledge Infrastructure.png',
          brochureUrl: '#',
          isHighlighted: false,
          order: 1,
          isActive: true,
        },
        {
          title: 'Physical infrastructure',
          description: 'Comprising custom-fit workstation hardware and modern software toolkits.',
          imageUrl: '/Campusconnect/Physical Infrastructure.png',
          brochureUrl: '#',
          isHighlighted: true,
          order: 2,
          isActive: true,
        },
        {
          title: 'Management infrastructure',
          description: 'Comprising project management and evaluations for continuous improvement.',
          imageUrl: '/Campusconnect/Management Infrastructure.png',
          brochureUrl: '#',
          isHighlighted: false,
          order: 3,
          isActive: true,
        }
      ]);
    }

    // 6. Seed Default Campus Events
    const campusEventCount = await CampusEvent.countDocuments();
    if (campusEventCount === 0) {
      await CampusEvent.create([
        {
          title: 'Educating Events',
          imageUrl: '/Campusconnect/img_banner_header (2).png',
          link: '#',
          order: 1,
          isActive: true,
        },
        {
          title: 'Prominent Industry Partners',
          imageUrl: '/Campusconnect/img_banner_header (3).png',
          link: '#',
          order: 2,
          isActive: true,
        },
        {
          title: 'Informative Courses',
          imageUrl: '/Campusconnect/img_banner_header (4).png',
          link: '#',
          order: 3,
          isActive: true,
        }
      ]);
    }

  } catch (err) {
    console.error('[Seed Error]:', err.message);
  }
}

app.listen(PORT, () => {
  console.log(`[AIA API Server] Running on http://localhost:${PORT}`);
});
