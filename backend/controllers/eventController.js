// // import mongoose from "mongoose";
// // import { Event } from "../models/Event.js";
// // import cloudinary from "../config/cloudinary.js";
// // import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// // const EVENT_FOLDER = "AIA-Project-Assets/Events";

// // const allowedCategories = [
// //   "Conference",
// //   "Workshops",
// //   "Webinars",
// //   "Training Program",
// //   "Exhibitions",
// // ];

// // const deleteCloudinaryImage = async (publicId) => {
// //   if (!publicId) return;

// //   try {
// //     await cloudinary.uploader.destroy(publicId, {
// //       resource_type: "image",
// //       invalidate: true,
// //     });
// //   } catch (error) {
// //     console.error("Event image deletion error:", error);
// //   }
// // };

// // const parseJSON = (value, fallback = {}) => {
// //   if (!value) return fallback;
// //   if (typeof value === "object") return value;

// //   try {
// //     return JSON.parse(value);
// //   } catch {
// //     return fallback;
// //   }
// // };

// // const slugify = (value = "") =>
// //   value
// //     .toLowerCase()
// //     .trim()
// //     .replace(/[^a-z0-9]+/g, "-")
// //     .replace(/^-|-$/g, "");

// // const makeUniqueSlug = async (title, excludeId = null) => {
// //   const base = slugify(title) || `event-${Date.now()}`;
// //   let slug = base;
// //   let count = 1;

// //   while (
// //     await Event.exists({
// //       slug,
// //       ...(excludeId ? { _id: { $ne: excludeId } } : {}),
// //     })
// //   ) {
// //     slug = `${base}-${count++}`;
// //   }

// //   return slug;
// // };

// // const normalizeBoolean = (value, fallback = true) => {
// //   if (value === undefined) return fallback;
// //   return value === true || value === "true";
// // };

// // const getFilesByField = (files = []) => {
// //   const result = {};

// //   files.forEach((file) => {
// //     result[file.fieldname] = file;
// //   });

// //   return result;
// // };

// // const uploadFile = async (file, folder) => {
// //   if (!file) return null;
// //   return uploadToCloudinary(file.path, folder);
// // };

// // const uploadDetailImages = async (detailPage, files, oldDetailPage = {}) => {
// //   const uploaded = [];

// //   try {
// //     const heroFile = files.heroImage;
// //     const agendaFile = files.agendaImage;

// //     if (heroFile) {
// //       const result = await uploadFile(
// //         heroFile,
// //         `${EVENT_FOLDER}/Detail-Heroes`
// //       );

// //       uploaded.push(result);

// //       detailPage.hero = {
// //         ...detailPage.hero,
// //         imageUrl: result.url,
// //         imagePublicId: result.publicId,
// //       };
// //     }

// //     if (agendaFile) {
// //       const result = await uploadFile(
// //         agendaFile,
// //         `${EVENT_FOLDER}/Agendas`
// //       );

// //       uploaded.push(result);

// //       detailPage.agenda = {
// //         ...detailPage.agenda,
// //         imageUrl: result.url,
// //         imagePublicId: result.publicId,
// //       };
// //     }

// //     return uploaded;
// //   } catch (error) {
// //     await Promise.all(
// //       uploaded.map((item) => deleteCloudinaryImage(item.publicId))
// //     );
// //     throw error;
// //   }
// // };

// // const cleanDetailPage = (value = {}) => {
// //   const detail = parseJSON(value, {});

// //   return {
// //     hero: {
// //       eyebrow: detail.hero?.eyebrow || "",
// //       title: detail.hero?.title || "",
// //       description: detail.hero?.description || "",
// //       imageUrl: detail.hero?.imageUrl || "",
// //       imagePublicId: detail.hero?.imagePublicId || "",
// //       imageAlt: detail.hero?.imageAlt || "",
// //       imagePosition: detail.hero?.imagePosition || "right",
// //       background: detail.hero?.background || "dark",
// //     },

// //     introduction: {
// //       title: detail.introduction?.title || "Introduction",
// //       sections: Array.isArray(detail.introduction?.sections)
// //         ? detail.introduction.sections
// //         : [],

// //       eventInfo: {
// //         date: detail.introduction?.eventInfo?.date || "",
// //         title: detail.introduction?.eventInfo?.title || "",
// //         venue: detail.introduction?.eventInfo?.venue || "",
// //         time: detail.introduction?.eventInfo?.time || "",
// //         saveDateLink: detail.introduction?.eventInfo?.saveDateLink || "",
// //         registrationLink:
// //           detail.introduction?.eventInfo?.registrationLink || "",
// //         locationLink: detail.introduction?.eventInfo?.locationLink || "",
// //       },

// //       partners: Array.isArray(detail.introduction?.partners)
// //         ? detail.introduction.partners
// //         : [],

// //       supporters: Array.isArray(detail.introduction?.supporters)
// //         ? detail.introduction.supporters
// //         : [],

// //       contact: {
// //         email: detail.introduction?.contact?.email || "",
// //         phone: detail.introduction?.contact?.phone || "",
// //         website: detail.introduction?.contact?.website || "",
// //       },
// //     },

// //     agenda: {
// //       title: detail.agenda?.title || "",
// //       imageUrl: detail.agenda?.imageUrl || "",
// //       imagePublicId: detail.agenda?.imagePublicId || "",
// //       imageAlt: detail.agenda?.imageAlt || "",
// //       items: Array.isArray(detail.agenda?.items)
// //         ? detail.agenda.items
// //         : [],
// //     },

// //     contentSections: Array.isArray(detail.contentSections)
// //       ? detail.contentSections
// //       : [],
// //   };
// // };

// // export const getEvents = async (req, res) => {
// //   try {
// //     const events = await Event.find({ isActive: true })
// //       .sort({ order: 1, createdAt: -1 })
// //       .lean();

// //     res.json({ success: true, data: events });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // export const getAdminEvents = async (req, res) => {
// //   try {
// //     const events = await Event.find()
// //       .sort({ order: 1, createdAt: -1 })
// //       .lean();

// //     res.json({ success: true, data: events });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // export const getEventBySlug = async (req, res) => {
// //   try {
// //     const event = await Event.findOne({
// //       slug: req.params.slug,
// //       isActive: true,
// //     }).lean();

// //     if (!event) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Event not found",
// //       });
// //     }

// //     res.json({ success: true, data: event });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // export const createEvent = async (req, res) => {
// //   let uploadedCard = null;
// //   let uploadedDetail = [];

// //   try {
// //     const files = getFilesByField(req.files);

// //     const title = String(req.body.title || req.body.heading || "").trim();
// //     const description = String(
// //       req.body.description || req.body.text || ""
// //     ).trim();
// //     const eventLink = String(
// //       req.body.eventLink || req.body.link || ""
// //     ).trim();
// //     const date = String(req.body.date || "").trim();
// //     const category = String(req.body.category || "Conference").trim();

// //     if (!title || title.length > 70) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Event heading is required and must be under 70 characters.",
// //       });
// //     }

// //     if (description.length > 220) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Event description cannot exceed 220 characters.",
// //       });
// //     }

// //     if (!eventLink) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Event redirect link is required.",
// //       });
// //     }

// //     if (!allowedCategories.includes(category)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid event category.",
// //       });
// //     }

// //     if (!files.image) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Event card image is required.",
// //       });
// //     }

// //     const detailPage = cleanDetailPage(req.body.detailPage);

// //     uploadedCard = await uploadFile(
// //       files.image,
// //       `${EVENT_FOLDER}/Event-Posters`
// //     );

// //     uploadedDetail = await uploadDetailImages(
// //       detailPage,
// //       files
// //     );

// //     const slug = await makeUniqueSlug(title);

// //     const created = await Event.create({
// //       title,
// //       slug,
// //       description,
// //       eventLink,
// //       date,
// //       category,
// //       imageUrl: uploadedCard.url,
// //       imagePublicId: uploadedCard.publicId,
// //       detailPage,
// //       order:
// //         req.body.order !== undefined && req.body.order !== ""
// //           ? Number(req.body.order)
// //           : await Event.countDocuments(),
// //       isActive: normalizeBoolean(req.body.isActive),
// //     });

// //     res.status(201).json({
// //       success: true,
// //       data: created,
// //       message: "Event created successfully.",
// //     });
// //   } catch (error) {
// //     if (uploadedCard?.publicId) {
// //       await deleteCloudinaryImage(uploadedCard.publicId);
// //     }

// //     await Promise.all(
// //       uploadedDetail.map((item) =>
// //         deleteCloudinaryImage(item.publicId)
// //       )
// //     );

// //     console.error("Create event error:", error);

// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // export const updateEvent = async (req, res) => {
// //   let uploadedCard = null;
// //   let uploadedDetail = [];

// //   try {
// //     const { id } = req.params;

// //     if (!mongoose.isValidObjectId(id)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid event ID.",
// //       });
// //     }

// //     const event = await Event.findById(id);

// //     if (!event) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Event not found.",
// //       });
// //     }

// //     const files = getFilesByField(req.files);
// //     const update = {};

// //     const title = String(
// //       req.body.title || req.body.heading || event.title
// //     ).trim();

// //     const description = String(
// //       req.body.description ?? req.body.text ?? event.description
// //     ).trim();

// //     const eventLink = String(
// //       req.body.eventLink ?? req.body.link ?? event.eventLink
// //     ).trim();

// //     if (!title || title.length > 70) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Event heading is required and must be under 70 characters.",
// //       });
// //     }

// //     if (description.length > 220) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Event description cannot exceed 220 characters.",
// //       });
// //     }

// //     if (!eventLink) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Event redirect link is required.",
// //       });
// //     }

// //     update.title = title;
// //     update.description = description;
// //     update.eventLink = eventLink;

// //     if (title !== event.title) {
// //       update.slug = await makeUniqueSlug(title, id);
// //     }

// //     if (req.body.date !== undefined) {
// //       update.date = String(req.body.date).trim();
// //     }

// //     if (req.body.category !== undefined) {
// //       const category = String(req.body.category).trim();

// //       if (!allowedCategories.includes(category)) {
// //         return res.status(400).json({
// //           success: false,
// //           message: "Invalid event category.",
// //         });
// //       }

// //       update.category = category;
// //     }

// //     if (req.body.order !== undefined && req.body.order !== "") {
// //       const order = Number(req.body.order);

// //       if (!Number.isFinite(order) || order < 0) {
// //         return res.status(400).json({
// //           success: false,
// //           message: "Invalid event order.",
// //         });
// //       }

// //       update.order = order;
// //     }

// //     if (req.body.isActive !== undefined) {
// //       update.isActive = normalizeBoolean(req.body.isActive);
// //     }

// //     const detailPage =
// //       req.body.detailPage !== undefined
// //         ? cleanDetailPage(req.body.detailPage)
// //         : cleanDetailPage(event.detailPage);

// //     if (files.image) {
// //       uploadedCard = await uploadFile(
// //         files.image,
// //         `${EVENT_FOLDER}/Event-Posters`
// //       );

// //       update.imageUrl = uploadedCard.url;
// //       update.imagePublicId = uploadedCard.publicId;
// //     }

// //     uploadedDetail = await uploadDetailImages(
// //       detailPage,
// //       files,
// //       event.detailPage
// //     );

// //     update.detailPage = detailPage;

// //     const oldCardPublicId = event.imagePublicId;
// //     const oldHeroPublicId = event.detailPage?.hero?.imagePublicId;
// //     const oldAgendaPublicId = event.detailPage?.agenda?.imagePublicId;

// //     Object.assign(event, update);
// //     await event.save();

// //     if (uploadedCard && oldCardPublicId) {
// //       await deleteCloudinaryImage(oldCardPublicId);
// //     }

// //     if (files.heroImage && oldHeroPublicId) {
// //       await deleteCloudinaryImage(oldHeroPublicId);
// //     }

// //     if (files.agendaImage && oldAgendaPublicId) {
// //       await deleteCloudinaryImage(oldAgendaPublicId);
// //     }

// //     res.json({
// //       success: true,
// //       data: event,
// //       message: "Event updated successfully.",
// //     });
// //   } catch (error) {
// //     if (uploadedCard?.publicId) {
// //       await deleteCloudinaryImage(uploadedCard.publicId);
// //     }

// //     await Promise.all(
// //       uploadedDetail.map((item) =>
// //         deleteCloudinaryImage(item.publicId)
// //       )
// //     );

// //     console.error("Update event error:", error);

// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // export const deleteEvent = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     if (!mongoose.isValidObjectId(id)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid event ID.",
// //       });
// //     }

// //     const event = await Event.findById(id);

// //     if (!event) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Event not found.",
// //       });
// //     }

// //     const publicIds = [
// //       event.imagePublicId,
// //       event.detailPage?.hero?.imagePublicId,
// //       event.detailPage?.agenda?.imagePublicId,
// //       ...(event.detailPage?.introduction?.partners || []).map(
// //         (item) => item.logoPublicId
// //       ),
// //       ...(event.detailPage?.introduction?.supporters || []).map(
// //         (item) => item.logoPublicId
// //       ),
// //     ].filter(Boolean);

// //     await event.deleteOne();

// //     await Promise.all(
// //       publicIds.map((publicId) => deleteCloudinaryImage(publicId))
// //     );

// //     res.json({
// //       success: true,
// //       message: "Event deleted successfully.",
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// import mongoose from "mongoose";
// import fs from "fs/promises";

// import { Event } from "../models/Event.js";
// import cloudinary from "../config/cloudinary.js";
// import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// const EVENT_FOLDER = "AIA-Project-Assets/Events";

// const allowedCategories = [
//   "Conference",
//   "Workshops",
//   "Webinars",
//   "Training Program",
//   "Exhibitions",
// ];

// // ------------------------------------------
// // COMMON HELPERS
// // ------------------------------------------

// const parseJSON = (value, fallback = {}) => {
//   if (!value) return fallback;
//   if (typeof value === "object") return value;

//   try {
//     return JSON.parse(value);
//   } catch {
//     return fallback;
//   }
// };

// const normalizeBoolean = (value, fallback = true) => {
//   if (value === undefined) return fallback;
//   return value === true || value === "true";
// };

// const slugify = (value = "") =>
//   value
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-|-$/g, "");

// const makeUniqueSlug = async (title, excludeId = null) => {
//   const base = slugify(title) || `event-${Date.now()}`;
//   let slug = base;
//   let count = 1;

//   while (
//     await Event.exists({
//       slug,
//       ...(excludeId ? { _id: { $ne: excludeId } } : {}),
//     })
//   ) {
//     slug = `${base}-${count++}`;
//   }

//   return slug;
// };

// const getFilesByField = (files = []) => {
//   const result = {};

//   for (const file of files) {
//     result[file.fieldname] = file;
//   }

//   return result;
// };

// const uploadFile = async (file, folder) => {
//   if (!file) return null;
//   return uploadToCloudinary(file.path, folder);
// };

// const deleteCloudinaryImage = async (publicId) => {
//   if (!publicId) return;

//   try {
//     await cloudinary.uploader.destroy(publicId, {
//       resource_type: "image",
//       invalidate: true,
//     });
//   } catch (error) {
//     console.error(
//       `Cloudinary deletion failed for ${publicId}:`,
//       error.message
//     );
//   }
// };

// const deleteTemporaryFiles = async (files = []) => {
//   await Promise.all(
//     files.map(async (file) => {
//       if (!file?.path) return;

//       try {
//         await fs.unlink(file.path);
//       } catch (error) {
//         if (error.code !== "ENOENT") {
//           console.error("Temporary upload cleanup error:", error.message);
//         }
//       }
//     })
//   );
// };

// const uniquePublicIds = (ids = []) => [
//   ...new Set(ids.filter(Boolean)),
// ];

// // ------------------------------------------
// // CLEAN DETAIL PAGE DATA
// // ------------------------------------------

// const cleanDetailPage = (value = {}, oldDetailPage = {}) => {
//   const detail = parseJSON(value, {});
//   const old = oldDetailPage?.toObject
//     ? oldDetailPage.toObject()
//     : oldDetailPage || {};

//   const oldBlocks = old.introduction?.blocks || [];
//   const oldContentSections = old.contentSections || [];

//   const blocks = Array.isArray(detail.introduction?.blocks)
//     ? detail.introduction.blocks
//     : oldBlocks;

//   const contentSections = Array.isArray(detail.contentSections)
//     ? detail.contentSections
//     : oldContentSections;

//   return {
//     hero: {
//       eyebrow: detail.hero?.eyebrow || "",
//       title: detail.hero?.title || "",
//       subtitle: detail.hero?.subtitle || "",
//       description: detail.hero?.description || "",
//       imageUrl:
//         detail.hero?.imageUrl || old.hero?.imageUrl || "",
//       imagePublicId:
//         detail.hero?.imagePublicId || old.hero?.imagePublicId || "",
//       imageAlt: detail.hero?.imageAlt || "",
//       imagePosition: detail.hero?.imagePosition || "right",
//       background: detail.hero?.background || "dark",
//     },

//     introduction: {
//       eyebrow: detail.introduction?.eyebrow || "",
//       title: detail.introduction?.title || "Introduction",
//       description: detail.introduction?.description || "",

//       blocks: blocks.map((block, index) => ({
//         ...block,
//         image:
//           block.image ||
//           oldBlocks[index]?.image ||
//           "",
//         imagePublicId:
//           block.imagePublicId ||
//           oldBlocks[index]?.imagePublicId ||
//           "",
//       })),

//       // Keep legacy fields for older event pages.
//       sections: Array.isArray(detail.introduction?.sections)
//         ? detail.introduction.sections
//         : old.introduction?.sections || [],

//       eventInfo: {
//         date: detail.introduction?.eventInfo?.date || "",
//         title: detail.introduction?.eventInfo?.title || "",
//         venue: detail.introduction?.eventInfo?.venue || "",
//         time: detail.introduction?.eventInfo?.time || "",
//         saveDateLink:
//           detail.introduction?.eventInfo?.saveDateLink || "",
//         registrationLink:
//           detail.introduction?.eventInfo?.registrationLink || "",
//         locationLink:
//           detail.introduction?.eventInfo?.locationLink || "",
//       },

//       partners: Array.isArray(detail.introduction?.partners)
//         ? detail.introduction.partners
//         : old.introduction?.partners || [],

//       supporters: Array.isArray(detail.introduction?.supporters)
//         ? detail.introduction.supporters
//         : old.introduction?.supporters || [],

//       contact: {
//         email: detail.introduction?.contact?.email || "",
//         phone: detail.introduction?.contact?.phone || "",
//         website: detail.introduction?.contact?.website || "",
//       },
//     },

//     agenda: {
//       eyebrow: detail.agenda?.eyebrow || "",
//       title: detail.agenda?.title || "",
//       description: detail.agenda?.description || "",
//       imageUrl:
//         detail.agenda?.imageUrl || old.agenda?.imageUrl || "",
//       imagePublicId:
//         detail.agenda?.imagePublicId || old.agenda?.imagePublicId || "",
//       imageAlt: detail.agenda?.imageAlt || "",
//       items: Array.isArray(detail.agenda?.items)
//         ? detail.agenda.items
//         : old.agenda?.items || [],
//     },

//     contentSections: contentSections.map((section, index) => ({
//       ...section,
//       image:
//         section.image ||
//         oldContentSections[index]?.image ||
//         "",
//       imagePublicId:
//         section.imagePublicId ||
//         oldContentSections[index]?.imagePublicId ||
//         "",
//     })),
//   };
// };

// // ------------------------------------------
// // UPLOAD DETAIL PAGE IMAGES
// // ------------------------------------------

// const uploadDetailImages = async (detailPage, files) => {
//   const uploaded = [];

//   try {
//     // Hero image
//     if (files.heroImage) {
//       const result = await uploadFile(
//         files.heroImage,
//         `${EVENT_FOLDER}/Detail-Heroes`
//       );

//       uploaded.push(result);

//       detailPage.hero.imageUrl = result.url;
//       detailPage.hero.imagePublicId = result.publicId;
//     }

//     // Agenda image
//     if (files.agendaImage) {
//       const result = await uploadFile(
//         files.agendaImage,
//         `${EVENT_FOLDER}/Agendas`
//       );

//       uploaded.push(result);

//       detailPage.agenda.imageUrl = result.url;
//       detailPage.agenda.imagePublicId = result.publicId;
//     }

//     // Introduction images
//     for (let index = 0; index < detailPage.introduction.blocks.length; index++) {
//       const fieldName = `introductionBlockImage_${index}`;
//       const file = files[fieldName];

//       if (!file) continue;

//       const result = await uploadFile(
//         file,
//         `${EVENT_FOLDER}/Introduction`
//       );

//       uploaded.push(result);

//       detailPage.introduction.blocks[index].image = result.url;
//       detailPage.introduction.blocks[index].imagePublicId =
//         result.publicId;
//     }

//     // Additional content section images
//     for (let index = 0; index < detailPage.contentSections.length; index++) {
//       const fieldName = `contentSectionImage_${index}`;
//       const file = files[fieldName];

//       if (!file) continue;

//       const result = await uploadFile(
//         file,
//         `${EVENT_FOLDER}/Content-Sections`
//       );

//       uploaded.push(result);

//       detailPage.contentSections[index].image = result.url;
//       detailPage.contentSections[index].imagePublicId =
//         result.publicId;
//     }

//     return uploaded;
//   } catch (error) {
//     await Promise.all(
//       uploaded.map((item) => deleteCloudinaryImage(item.publicId))
//     );

//     throw error;
//   }
// };

// // ------------------------------------------
// // COLLECT ALL EVENT IMAGE PUBLIC IDS
// // ------------------------------------------

// const collectEventPublicIds = (event) => {
//   const detail = event.detailPage || {};
//   const introduction = detail.introduction || {};

//   return uniquePublicIds([
//     event.imagePublicId,

//     detail.hero?.imagePublicId,
//     detail.agenda?.imagePublicId,

//     ...(introduction.blocks || []).map(
//       (block) => block.imagePublicId
//     ),

//     ...(detail.contentSections || []).map(
//       (section) => section.imagePublicId
//     ),

//     ...(introduction.partners || []).map(
//       (item) => item.logoPublicId
//     ),

//     ...(introduction.supporters || []).map(
//       (item) => item.logoPublicId
//     ),
//   ]);
// };

// // ------------------------------------------
// // EXPLICIT IMAGE REMOVAL
// // ------------------------------------------

// const removeRequestedImages = async (detailPage, files, reqBody) => {
//   const removedIds = [];

//   const removeHero = reqBody.removeHeroImage === "true";
//   const removeAgenda = reqBody.removeAgendaImage === "true";

//   if (removeHero && !files.heroImage) {
//     if (detailPage.hero.imagePublicId) {
//       removedIds.push(detailPage.hero.imagePublicId);
//     }

//     detailPage.hero.imageUrl = "";
//     detailPage.hero.imagePublicId = "";
//   }

//   if (removeAgenda && !files.agendaImage) {
//     if (detailPage.agenda.imagePublicId) {
//       removedIds.push(detailPage.agenda.imagePublicId);
//     }

//     detailPage.agenda.imageUrl = "";
//     detailPage.agenda.imagePublicId = "";
//   }

//   const removedIntroductionKeys = parseJSON(
//     reqBody.removedIntroductionImageKeys,
//     []
//   );

//   if (Array.isArray(removedIntroductionKeys)) {
//     detailPage.introduction.blocks.forEach((block) => {
//       if (
//         removedIntroductionKeys.includes(block._key) &&
//         !block.imagePublicId
//       ) {
//         block.image = "";
//       }
//     });
//   }

//   const removedContentIndexes = parseJSON(
//     reqBody.removedContentSectionImageIndexes,
//     []
//   );

//   if (Array.isArray(removedContentIndexes)) {
//     removedContentIndexes.forEach((index) => {
//       const section = detailPage.contentSections[Number(index)];

//       if (section) {
//         if (section.imagePublicId) {
//           removedIds.push(section.imagePublicId);
//         }

//         section.image = "";
//         section.imagePublicId = "";
//       }
//     });
//   }

//   return removedIds;
// };

// // ------------------------------------------
// // GET EVENTS
// // ------------------------------------------

// export const getEvents = async (_req, res) => {
//   try {
//     const events = await Event.find({ isActive: true })
//       .sort({ order: 1, createdAt: -1 })
//       .lean();

//     res.json({ success: true, data: events });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getAdminEvents = async (_req, res) => {
//   try {
//     const events = await Event.find()
//       .sort({ order: 1, createdAt: -1 })
//       .lean();

//     res.json({ success: true, data: events });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getEventBySlug = async (req, res) => {
//   try {
//     const event = await Event.findOne({
//       slug: req.params.slug,
//       isActive: true,
//     }).lean();

//     if (!event) {
//       return res.status(404).json({
//         success: false,
//         message: "Event not found",
//       });
//     }

//     res.json({ success: true, data: event });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ------------------------------------------
// // CREATE EVENT
// // ------------------------------------------

// export const createEvent = async (req, res) => {
//   const filesArray = req.files || [];
//   const files = getFilesByField(filesArray);

//   const uploaded = [];

//   try {
//     const title = String(
//       req.body.title || req.body.heading || ""
//     ).trim();

//     const description = String(
//       req.body.description || req.body.text || ""
//     ).trim();

//     const eventLink = String(
//       req.body.eventLink || req.body.link || ""
//     ).trim();

//     const date = String(req.body.date || "").trim();
//     const category = String(
//       req.body.category || "Conference"
//     ).trim();

//     if (!title || title.length > 70) {
//       return res.status(400).json({
//         success: false,
//         message: "Event heading is required and must be under 70 characters.",
//       });
//     }

//     if (description.length > 220) {
//       return res.status(400).json({
//         success: false,
//         message: "Event description cannot exceed 220 characters.",
//       });
//     }

//     if (!eventLink) {
//       return res.status(400).json({
//         success: false,
//         message: "Event detail page URL is required.",
//       });
//     }

//     if (!allowedCategories.includes(category)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid event category.",
//       });
//     }

//     if (!files.image) {
//       return res.status(400).json({
//         success: false,
//         message: "Event card image is required.",
//       });
//     }

//     const detailPage = cleanDetailPage(req.body.detailPage);

//     const cardUpload = await uploadFile(
//       files.image,
//       `${EVENT_FOLDER}/Event-Posters`
//     );

//     uploaded.push(cardUpload);

//     const detailUploads = await uploadDetailImages(
//       detailPage,
//       files
//     );

//     uploaded.push(...detailUploads);

//     const slug = await makeUniqueSlug(title);

//     const created = await Event.create({
//       title,
//       slug,
//       description,
//       eventLink,
//       date,
//       category,

//       imageUrl: cardUpload.url,
//       imagePublicId: cardUpload.publicId,

//       detailPage,

//       order:
//         req.body.order !== undefined && req.body.order !== ""
//           ? Number(req.body.order)
//           : await Event.countDocuments(),

//       isActive: normalizeBoolean(req.body.isActive),
//     });

//     res.status(201).json({
//       success: true,
//       data: created,
//       message: "Event created successfully.",
//     });
//   } catch (error) {
//     await Promise.all(
//       uploaded.map((item) => deleteCloudinaryImage(item.publicId))
//     );

//     console.error("Create event error:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   } finally {
//     await deleteTemporaryFiles(filesArray);
//   }
// };

// // ------------------------------------------
// // UPDATE EVENT
// // ------------------------------------------

// export const updateEvent = async (req, res) => {
//   const filesArray = req.files || [];
//   const files = getFilesByField(filesArray);

//   const uploaded = [];

//   try {
//     const { id } = req.params;

//     if (!mongoose.isValidObjectId(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid event ID.",
//       });
//     }

//     const event = await Event.findById(id);

//     if (!event) {
//       return res.status(404).json({
//         success: false,
//         message: "Event not found.",
//       });
//     }

//     const title = String(
//       req.body.title || req.body.heading || event.title
//     ).trim();

//     const description = String(
//       req.body.description ?? req.body.text ?? event.description
//     ).trim();

//     const eventLink = String(
//       req.body.eventLink ?? req.body.link ?? event.eventLink
//     ).trim();

//     if (!title || title.length > 70) {
//       return res.status(400).json({
//         success: false,
//         message: "Event heading is required and must be under 70 characters.",
//       });
//     }

//     if (description.length > 220) {
//       return res.status(400).json({
//         success: false,
//         message: "Event description cannot exceed 220 characters.",
//       });
//     }

//     if (!eventLink) {
//       return res.status(400).json({
//         success: false,
//         message: "Event detail page URL is required.",
//       });
//     }

//     const category =
//       req.body.category !== undefined
//         ? String(req.body.category).trim()
//         : event.category;

//     if (!allowedCategories.includes(category)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid event category.",
//       });
//     }

//     const detailPage = cleanDetailPage(
//       req.body.detailPage !== undefined
//         ? req.body.detailPage
//         : event.detailPage,
//       event.detailPage
//     );

//     const removedIds = await removeRequestedImages(
//       detailPage,
//       files,
//       req.body
//     );

//     let newCardUpload = null;

//     if (files.image) {
//       newCardUpload = await uploadFile(
//         files.image,
//         `${EVENT_FOLDER}/Event-Posters`
//       );

//       uploaded.push(newCardUpload);
//     }

//     const detailUploads = await uploadDetailImages(
//       detailPage,
//       files
//     );

//     uploaded.push(...detailUploads);

//     const oldPublicIds = collectEventPublicIds(event);

//     event.title = title;
//     event.slug =
//       title !== event.title
//         ? await makeUniqueSlug(title, id)
//         : event.slug;

//     event.description = description;
//     event.eventLink = eventLink;
//     event.category = category;

//     if (req.body.date !== undefined) {
//       event.date = String(req.body.date).trim();
//     }

//     if (req.body.order !== undefined && req.body.order !== "") {
//       const order = Number(req.body.order);

//       if (!Number.isFinite(order) || order < 0) {
//         throw new Error("Invalid event order.");
//       }

//       event.order = order;
//     }

//     if (req.body.isActive !== undefined) {
//       event.isActive = normalizeBoolean(req.body.isActive);
//     }

//     if (newCardUpload) {
//       event.imageUrl = newCardUpload.url;
//       event.imagePublicId = newCardUpload.publicId;
//     }

//     event.detailPage = detailPage;

//     await event.save();

//     const newPublicIds = collectEventPublicIds(event);

//     const obsoleteIds = oldPublicIds.filter(
//       (publicId) => !newPublicIds.includes(publicId)
//     );

//     await Promise.all(
//       [...obsoleteIds, ...removedIds].map(deleteCloudinaryImage)
//     );

//     res.json({
//       success: true,
//       data: event,
//       message: "Event updated successfully.",
//     });
//   } catch (error) {
//     await Promise.all(
//       uploaded.map((item) => deleteCloudinaryImage(item.publicId))
//     );

//     console.error("Update event error:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   } finally {
//     await deleteTemporaryFiles(filesArray);
//   }
// };

// // ------------------------------------------
// // DELETE EVENT
// // ------------------------------------------

// export const deleteEvent = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.isValidObjectId(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid event ID.",
//       });
//     }

//     const event = await Event.findById(id);

//     if (!event) {
//       return res.status(404).json({
//         success: false,
//         message: "Event not found.",
//       });
//     }

//     const publicIds = collectEventPublicIds(event);

//     await event.deleteOne();

//     await Promise.all(
//       publicIds.map(deleteCloudinaryImage)
//     );

//     res.json({
//       success: true,
//       message: "Event deleted successfully.",
//     });
//   } catch (error) {
//     console.error("Delete event error:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


import mongoose from "mongoose";
import { Event } from "../models/Event.js";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

const EVENT_FOLDER = "AIA-Project-Assets/Events";

const allowedCategories = [
  "Conference",
  "Workshops",
  "Webinars",
  "Training Program",
  "Exhibitions",
];

const parseJSON = (value, fallback = {}) => {
  if (!value) return fallback;
  if (typeof value === "object") return value;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const makeUniqueSlug = async (title, excludeId = null) => {
  const base = slugify(title) || `event-${Date.now()}`;
  let slug = base;
  let count = 1;

  while (
    await Event.exists({
      slug,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    })
  ) {
    slug = `${base}-${count++}`;
  }

  return slug;
};

const normalizeBoolean = (value, fallback = true) => {
  if (value === undefined) return fallback;
  return value === true || value === "true";
};

const getFilesByField = (files = []) => {
  const result = {};

  if (Array.isArray(files)) {
    files.forEach((file) => {
      result[file.fieldname] = file;
    });
  } else if (files && typeof files === "object") {
    Object.entries(files).forEach(([field, fieldFiles]) => {
      result[field] = Array.isArray(fieldFiles)
        ? fieldFiles[0]
        : fieldFiles;
    });
  }

  return result;
};

const uploadFile = async (file, folder) => {
  if (!file) return null;

  return uploadToCloudinary(file.path, folder);
};

const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });
  } catch (error) {
    console.error("Cloudinary delete error:", publicId, error.message);
  }
};

const cleanDetailPage = (value = {}) => {
  const detail = parseJSON(value, {});
  const hero = detail.hero || {};
  const introduction = detail.introduction || {};
  const agenda = detail.agenda || {};

  return {
    hero: {
      ...hero,
      eyebrow: hero.eyebrow || "",
      title: hero.title || "",
      subtitle: hero.subtitle || "",
      description: hero.description || "",
      imageUrl: hero.imageUrl || hero.image || "",
      imagePublicId: hero.imagePublicId || "",
      imageAlt: hero.imageAlt || "",
      imagePosition: hero.imagePosition || "right",
      background: hero.background || "dark",
    },

    introduction: {
      ...introduction,
      eyebrow: introduction.eyebrow || "",
      title: introduction.title || "",
      description: introduction.description || "",
      blocks: Array.isArray(introduction.blocks)
        ? introduction.blocks
        : [],
      // Keep compatibility with previously saved events.
      sections: Array.isArray(introduction.sections)
        ? introduction.sections
        : [],
      eventInfo: introduction.eventInfo || {},
      partners: Array.isArray(introduction.partners)
        ? introduction.partners
        : [],
      supporters: Array.isArray(introduction.supporters)
        ? introduction.supporters
        : [],
      contact: introduction.contact || {},
    },

    agenda: {
      ...agenda,
      eyebrow: agenda.eyebrow || "",
      title: agenda.title || "",
      description: agenda.description || "",
      imageUrl: agenda.imageUrl || agenda.image || "",
      imagePublicId: agenda.imagePublicId || "",
      imageAlt: agenda.imageAlt || "",
      items: Array.isArray(agenda.items) ? agenda.items : [],
    },

    contentSections: Array.isArray(detail.contentSections)
      ? detail.contentSections
      : [],
  };
};

const getOldBlock = (oldBlocks, block, index) => {
  if (block?._key) {
    const match = oldBlocks.find((item) => item?._key === block._key);
    if (match) return match;
  }

  return oldBlocks[index] || {};
};

const uploadDetailImages = async (
  detailPage,
  files,
  oldDetailPage = {}
) => {
  const uploaded = [];
  const oldImagesToDelete = [];

  const uploadAndReplace = async ({
    file,
    folder,
    currentPublicId,
    onSuccess,
  }) => {
    if (!file) return;

    const result = await uploadFile(file, folder);
    uploaded.push(result);

    if (currentPublicId && currentPublicId !== result.publicId) {
      oldImagesToDelete.push(currentPublicId);
    }

    onSuccess(result);
  };

  try {
    const oldHero = oldDetailPage?.hero || {};
    const oldAgenda = oldDetailPage?.agenda || {};

    await uploadAndReplace({
      file: files.heroImage,
      folder: `${EVENT_FOLDER}/Detail-Heroes`,
      currentPublicId: oldHero.imagePublicId,
      onSuccess: (result) => {
        detailPage.hero.imageUrl = result.url;
        detailPage.hero.imagePublicId = result.publicId;
      },
    });

    await uploadAndReplace({
      file: files.agendaImage,
      folder: `${EVENT_FOLDER}/Agendas`,
      currentPublicId: oldAgenda.imagePublicId,
      onSuccess: (result) => {
        detailPage.agenda.imageUrl = result.url;
        detailPage.agenda.imagePublicId = result.publicId;
      },
    });

    const oldBlocks = oldDetailPage?.introduction?.blocks || [];

    detailPage.introduction.blocks = await Promise.all(
      (detailPage.introduction.blocks || []).map(
        async (block, index) => {
          const oldBlock = getOldBlock(oldBlocks, block, index);
          const file = files[`introductionBlockImage_${index}`];

          const nextBlock = { ...block };

          await uploadAndReplace({
            file,
            folder: `${EVENT_FOLDER}/Introduction`,
            currentPublicId: oldBlock.imagePublicId,
            onSuccess: (result) => {
              nextBlock.imageUrl = result.url;
              nextBlock.image = result.url;
              nextBlock.imagePublicId = result.publicId;
            },
          });

          // Preserve old image when no new file is selected.
          if (!file) {
            nextBlock.imageUrl =
              nextBlock.imageUrl ||
              nextBlock.image ||
              oldBlock.imageUrl ||
              oldBlock.image ||
              "";

            nextBlock.imagePublicId =
              nextBlock.imagePublicId ||
              oldBlock.imagePublicId ||
              "";
          }

          return nextBlock;
        }
      )
    );

    const oldSections = oldDetailPage?.contentSections || [];

    detailPage.contentSections = await Promise.all(
      (detailPage.contentSections || []).map(
        async (section, index) => {
          const oldSection = oldSections[index] || {};
          const file = files[`contentSectionImage_${index}`];
          const nextSection = { ...section };

          await uploadAndReplace({
            file,
            folder: `${EVENT_FOLDER}/Content-Sections`,
            currentPublicId: oldSection.imagePublicId,
            onSuccess: (result) => {
              nextSection.imageUrl = result.url;
              nextSection.image = result.url;
              nextSection.imagePublicId = result.publicId;
            },
          });

          if (!file) {
            nextSection.imageUrl =
              nextSection.imageUrl ||
              nextSection.image ||
              oldSection.imageUrl ||
              oldSection.image ||
              "";

            nextSection.imagePublicId =
              nextSection.imagePublicId ||
              oldSection.imagePublicId ||
              "";
          }

          return nextSection;
        }
      )
    );

    return { uploaded, oldImagesToDelete };
  } catch (error) {
    await Promise.all(
      uploaded.map((item) => deleteCloudinaryImage(item.publicId))
    );

    throw error;
  }
};

const getAllPublicIds = (event) => {
  const detail = event.detailPage || {};
  const intro = detail.introduction || {};

  return [
    event.imagePublicId,
    detail.hero?.imagePublicId,
    detail.agenda?.imagePublicId,

    ...(intro.blocks || []).map((item) => item.imagePublicId),
    ...(detail.contentSections || []).map(
      (item) => item.imagePublicId
    ),

    ...(intro.partners || []).map((item) => item.logoPublicId),
    ...(intro.supporters || []).map((item) => item.logoPublicId),
  ].filter(Boolean);
};

// GET ALL PUBLIC EVENTS
export const getEvents = async (_req, res) => {
  try {
    const events = await Event.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return res.json({ success: true, data: events });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL EVENTS FOR ADMIN
export const getAdminEvents = async (_req, res) => {
  try {
    const events = await Event.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return res.json({ success: true, data: events });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET EVENT BY SLUG
export const getEventBySlug = async (req, res) => {
  try {
    const event = await Event.findOne({
      slug: req.params.slug,
      isActive: true,
    }).lean();

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    return res.json({ success: true, data: event });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE EVENT
export const createEvent = async (req, res) => {
  let uploadedCard = null;
  let uploadedDetail = [];

  try {
    const files = getFilesByField(req.files);

    const title = String(req.body.title || req.body.heading || "").trim();
    const description = String(
      req.body.description || req.body.text || ""
    ).trim();
    const eventLink = String(
      req.body.eventLink || req.body.link || ""
    ).trim();
    const category = String(
      req.body.category || "Conference"
    ).trim();

    if (!title || title.length > 70) {
      return res.status(400).json({
        success: false,
        message: "Event heading is required and must be under 70 characters.",
      });
    }

    if (description.length > 220) {
      return res.status(400).json({
        success: false,
        message: "Event description cannot exceed 220 characters.",
      });
    }

    if (!eventLink) {
      return res.status(400).json({
        success: false,
        message: "Event redirect link is required.",
      });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event category.",
      });
    }

    if (!files.image) {
      return res.status(400).json({
        success: false,
        message: "Event card image is required.",
      });
    }

    const detailPage = cleanDetailPage(req.body.detailPage);

    uploadedCard = await uploadFile(
      files.image,
      `${EVENT_FOLDER}/Event-Posters`
    );

    const detailResult = await uploadDetailImages(
      detailPage,
      files
    );
    uploadedDetail = detailResult.uploaded;

    const slug = await makeUniqueSlug(title);

    const event = await Event.create({
      title,
      slug,
      description,
      eventLink,
      date: String(req.body.date || "").trim(),
      category,
      imageUrl: uploadedCard.url,
      imagePublicId: uploadedCard.publicId,
      detailPage,
      order:
        req.body.order !== undefined && req.body.order !== ""
          ? Number(req.body.order)
          : await Event.countDocuments(),
      isActive: normalizeBoolean(req.body.isActive),
    });

    return res.status(201).json({
      success: true,
      data: event,
      message: "Event created successfully.",
    });
  } catch (error) {
    if (uploadedCard?.publicId) {
      await deleteCloudinaryImage(uploadedCard.publicId);
    }

    await Promise.all(
      uploadedDetail.map((item) =>
        deleteCloudinaryImage(item.publicId)
      )
    );

    console.error("Create event error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  let uploadedCard = null;
  let uploadedDetail = [];

  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID.",
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const files = getFilesByField(req.files);

    const title = String(
      req.body.title ?? req.body.heading ?? event.title
    ).trim();

    const description = String(
      req.body.description ?? req.body.text ?? event.description
    ).trim();

    const eventLink = String(
      req.body.eventLink ?? req.body.link ?? event.eventLink
    ).trim();

    const category = String(
      req.body.category ?? event.category
    ).trim();

    if (!title || title.length > 70) {
      return res.status(400).json({
        success: false,
        message: "Event heading is required and must be under 70 characters.",
      });
    }

    if (description.length > 220) {
      return res.status(400).json({
        success: false,
        message: "Event description cannot exceed 220 characters.",
      });
    }

    if (!eventLink) {
      return res.status(400).json({
        success: false,
        message: "Event redirect link is required.",
      });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event category.",
      });
    }

    const oldDetailPage = event.detailPage?.toObject
      ? event.detailPage.toObject()
      : event.detailPage || {};

    const detailPage =
      req.body.detailPage !== undefined
        ? cleanDetailPage(req.body.detailPage)
        : cleanDetailPage(oldDetailPage);

    if (files.image) {
      uploadedCard = await uploadFile(
        files.image,
        `${EVENT_FOLDER}/Event-Posters`
      );
    }

    const detailResult = await uploadDetailImages(
      detailPage,
      files,
      oldDetailPage
    );
    uploadedDetail = detailResult.uploaded;

    const oldCardPublicId = event.imagePublicId;

   const titleChanged = title !== event.title;

if (titleChanged) {
  event.slug = await makeUniqueSlug(title, id);
}

event.title = title;
    event.description = description;
    event.eventLink = eventLink;
    event.category = category;

    if (req.body.date !== undefined) {
      event.date = String(req.body.date).trim();
    }

    if (req.body.order !== undefined && req.body.order !== "") {
      event.order = Number(req.body.order);
    }

    if (req.body.isActive !== undefined) {
      event.isActive = normalizeBoolean(req.body.isActive);
    }

    if (uploadedCard) {
      event.imageUrl = uploadedCard.url;
      event.imagePublicId = uploadedCard.publicId;
    }

    event.detailPage = detailPage;

    await event.save();

    if (uploadedCard && oldCardPublicId) {
      await deleteCloudinaryImage(oldCardPublicId);
    }

    await Promise.all(
      detailResult.oldImagesToDelete.map(deleteCloudinaryImage)
    );

    return res.json({
      success: true,
      data: event,
      message: "Event updated successfully.",
    });
  } catch (error) {
    if (uploadedCard?.publicId) {
      await deleteCloudinaryImage(uploadedCard.publicId);
    }

    await Promise.all(
      uploadedDetail.map((item) =>
        deleteCloudinaryImage(item.publicId)
      )
    );

    console.error("Update event error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID.",
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const publicIds = [...new Set(getAllPublicIds(event))];

    await event.deleteOne();

    await Promise.all(publicIds.map(deleteCloudinaryImage));

    return res.json({
      success: true,
      message: "Event and its Cloudinary images deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
