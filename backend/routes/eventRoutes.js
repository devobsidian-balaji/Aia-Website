// import express from "express";
// import {
//   getEvents,
//   getAdminEvents,
//   getEventBySlug,
//   createEvent,
//   updateEvent,
//   deleteEvent,
// } from "../controllers/eventController.js";
// import { sliderImageUpload } from "../config/upload.js";

// export const eventRouter = express.Router();

// eventRouter.get("/", getEvents);
// eventRouter.get("/admin", getAdminEvents);
// eventRouter.get("/slug/:slug", getEventBySlug);

// eventRouter.post(
//   "/",
//   sliderImageUpload.any(),
//   createEvent
// );

// eventRouter.put(
//   "/:id",
//   sliderImageUpload.any(),
//   updateEvent
// );

// eventRouter.delete("/:id", deleteEvent);




import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  getEvents,
  getAdminEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

import { eventImageUpload } from "../config/upload.js";

export const eventRouter = express.Router();

// Public website routes
eventRouter.get("/", getEvents);
eventRouter.get("/slug/:slug", getEventBySlug);

// Admin only
eventRouter.get("/admin", adminAuth, getAdminEvents);

eventRouter.post(
  "/",
  adminAuth,
  eventImageUpload.any(),
  createEvent
);

eventRouter.put(
  "/:id",
  adminAuth,
  eventImageUpload.any(),
  updateEvent
);

eventRouter.delete("/:id", adminAuth, deleteEvent);

export default eventRouter;
