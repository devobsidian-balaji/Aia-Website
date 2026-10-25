
import { WhyJoinSection } from "../models/WhyJoinSection.js";

const validKey = /^[a-z0-9-]+$/;

const validKeys = (pageKey, sectionKey) =>
    validKey.test(pageKey || "") && validKey.test(sectionKey || "");

const imageUrlFromRequest = (req) =>
    req.file
        ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        : undefined;

const findOrCreate = async (pageKey, sectionKey) =>
    WhyJoinSection.findOneAndUpdate(
        { pageKey, sectionKey },
        { $setOnInsert: { pageKey, sectionKey, items: [] } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );

export const getPublicWhyJoin = async (req, res) => {
    try {
        const { pageKey, sectionKey } = req.params;

        if (!validKeys(pageKey, sectionKey)) {
            return res.status(400).json({
                success: false,
                message: "Invalid page or section key",
            });
        }

        const section = await WhyJoinSection.findOne({
            pageKey: pageKey.toLowerCase().trim(),
            sectionKey: sectionKey.toLowerCase().trim(),
        }).lean();

        console.log("Public Why Join lookup:", {
            pageKey,
            sectionKey,
            found: Boolean(section),
            isActive: section?.isActive,
            itemCount: section?.items?.length,
        });

        if (!section || !section.isActive) {
  return res.json({ success: true, data: null });
}

        section.items = (section.items || [])
            .filter((item) => item.isActive)
            .sort((a, b) => a.order - b.order);

        res.json({ success: true, data: section });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAdminWhyJoin = async (req, res) => {
    try {
        const { pageKey, sectionKey } = req.params;

        if (!validKeys(pageKey, sectionKey)) {
            return res.status(400).json({
                success: false,
                message: "Invalid page or section key",
            });
        }

        const section = await findOrCreate(pageKey, sectionKey);

        res.json({ success: true, data: section });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const saveWhyJoinSettings = async (req, res) => {
    try {
        const { pageKey, sectionKey } = req.params;

        if (!validKeys(pageKey, sectionKey)) {
            return res.status(400).json({
                success: false,
                message: "Invalid page or section key",
            });
        }

        const update = {};

        for (const key of ["heading", "subtitle", "lineColor"]) {
            if (req.body[key] !== undefined) update[key] = req.body[key];
        }

        if (req.body.isActive !== undefined) {
            update.isActive =
                req.body.isActive === true || req.body.isActive === "true";
        }

        const section = await WhyJoinSection.findOneAndUpdate(
            { pageKey, sectionKey },
            {
                $set: update,
                $setOnInsert: { pageKey, sectionKey },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            }
        );

        res.json({ success: true, data: section });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createWhyJoinItem = async (req, res) => {
    try {
        const { pageKey, sectionKey } = req.params;
        const { title, description, imageAlt, link, linkText, order } = req.body;
        const imageUrl = imageUrlFromRequest(req) || req.body.imageUrl;

        if (!validKeys(pageKey, sectionKey)) {
            return res.status(400).json({
                success: false,
                message: "Invalid page or section key",
            });
        }

        if (!title?.trim() || !imageUrl) {
            return res.status(400).json({
                success: false,
                message: "Title and image are required",
            });
        }

        const section = await findOrCreate(pageKey, sectionKey);

        section.items.push({
            title: title.trim(),
            description: description || "",
            imageUrl,
            imageAlt: imageAlt || title,
            link: link || "",
            linkText: linkText || "Learn More",
            order: Number.isFinite(Number(order))
                ? Number(order)
                : section.items.length,
            isActive: true,
        });

        await section.save();

        res.status(201).json({
            success: true,
            data: section.items[section.items.length - 1],
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateWhyJoinItem = async (req, res) => {
    try {
        const { pageKey, sectionKey, itemId } = req.params;

        const section = await WhyJoinSection.findOne({ pageKey, sectionKey });
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        const item = section.items.id(itemId);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        const { title, description, imageAlt, link, linkText, order, isActive } =
            req.body;

        if (title !== undefined) item.title = title.trim();
        if (description !== undefined) item.description = description;
        if (imageAlt !== undefined) item.imageAlt = imageAlt;
        if (link !== undefined) item.link = link;
        if (linkText !== undefined) item.linkText = linkText;

        if (order !== undefined && Number.isFinite(Number(order))) {
            item.order = Number(order);
        }

        if (isActive !== undefined) {
            item.isActive = isActive === true || isActive === "true";
        }

        const imageUrl = imageUrlFromRequest(req) || req.body.imageUrl;
        if (imageUrl) item.imageUrl = imageUrl;

        await section.save();

        res.json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteWhyJoinItem = async (req, res) => {
    try {
        const { pageKey, sectionKey, itemId } = req.params;

        const section = await WhyJoinSection.findOne({ pageKey, sectionKey });
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        const item = section.items.id(itemId);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        item.deleteOne();
        await section.save();

        res.json({ success: true, message: "Item deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
