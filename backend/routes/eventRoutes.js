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

eventRouter.get("/", getEvents);
eventRouter.get("/admin", getAdminEvents);
eventRouter.get("/slug/:slug", getEventBySlug);

eventRouter.post("/", eventImageUpload.any(), createEvent);
eventRouter.put("/:id", eventImageUpload.any(), updateEvent);
eventRouter.delete("/:id", deleteEvent);

export default eventRouter;
