
import React, { useEffect, useRef, useState } from "react";
import {
  Image as ImageIcon,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Link as LinkIcon,
  Calendar,
  Tag,
  Type,
  AlignLeft,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Layers,
} from "lucide-react";

import { createEvent, updateEvent } from "../services/api";

const categories = [
  "Conference",
  "Workshops",
  "Webinars",
  "Training Program",
  "Exhibitions",
];

const MAX_HEADING_LEN = 70;
const MAX_TEXT_LEN = 220;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const inputClass =
  "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#E25238] focus:ring-2 focus:ring-[#E25238]/20";

const emptyAgendaItem = () => ({
  time: "",
  title: "",
  description: "",
  link: "",
  external: false,
});

const emptyIntroductionBlock = (type) => ({
  _key: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  type,
  text: "",
  image: "",
  imagePublicId: "",
  imageAlt: "",
  caption: "",
  imagePosition: "full",
  items: type === "list" ? [""] : [],
});

const emptyContentSection = () => ({
  eyebrow: "",
  title: "",
  description: "",
  paragraphs: [""],
  image: "",
  imagePublicId: "",
  imageAlt: "",
  imagePosition: "right",
});

const initialDetailPage = () => ({
  hero: {
    eyebrow: "",
    title: "",
    subtitle: "",
    description: "",
    image: "",
    imagePublicId: "",
    imageAlt: "",
  },
  introduction: {
    eyebrow: "",
    title: "",
    description: "",
    blocks: [emptyIntroductionBlock("paragraph")],
  },
  agenda: {
    eyebrow: "",
    title: "",
    description: "",
    image: "",
    imagePublicId: "",
    imageAlt: "",
    items: [emptyAgendaItem()],
  },
  contentSections: [emptyContentSection()],
});

const createSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const isValidEventLink = (value) => {
  const link = value.trim();

  if (link.startsWith("/") && !link.startsWith("//")) {
    return true;
  }

  try {
    const normalizedLink = link.startsWith("www.")
      ? `https://${link}`
      : link.includes("://")
        ? link
        : `https://${link}`;

    const url = new URL(normalizedLink);

    return (
      ["http:", "https:"].includes(url.protocol) &&
      url.hostname.includes(".")
    );
  } catch {
    return false;
  }
};

export default function AddEvent({ onEventAdded, onNavigate, eventToEdit = null }) {
  const fileInputRef = useRef(null);
  const heroImageInputRef = useRef(null);
  const agendaImageInputRef = useRef(null);
  const introductionBlockImageInputRefs = useRef({});
  const contentImageInputRefs = useRef({});

  // Event card fields
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Conference");

  // Event card image
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Detail page images
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState("");

  const [agendaImageFile, setAgendaImageFile] = useState(null);
  const [agendaImagePreview, setAgendaImagePreview] = useState("");

  const [introductionBlockImages, setIntroductionBlockImages] = useState({});
  const [introductionBlockPreviews, setIntroductionBlockPreviews] = useState({});

  const [contentSectionImages, setContentSectionImages] =
    useState({});
  const [contentSectionPreviews, setContentSectionPreviews] =
    useState({});

  // Detail page content
  const [detailPage, setDetailPage] = useState(initialDetailPage);

  // Load the selected event into the same CMS form when Edit is selected.
  useEffect(() => {
    if (!eventToEdit) return;

    const detail = eventToEdit.detailPage || {};
    const defaults = initialDetailPage();
    const hero = detail.hero || {};
    const intro = detail.introduction || {};
    const agenda = detail.agenda || {};

    setHeading(eventToEdit.title || eventToEdit.heading || "");
    setText(eventToEdit.description || eventToEdit.text || "");
    setDate(eventToEdit.date || "");
    setCategory(eventToEdit.category || "Conference");

    setPreviewUrl(eventToEdit.imageUrl || eventToEdit.image || "");
    setSelectedFile(null);
    setHeroImagePreview(hero.imageUrl || hero.image || "");
    setHeroImageFile(null);
    setAgendaImagePreview(agenda.imageUrl || agenda.image || "");
    setAgendaImageFile(null);

    const blocks = (intro.blocks || []).map((block, index) => ({
      ...block,
      _key: block._key || block.key || `existing-${eventToEdit._id}-${index}`,
      type: block.type || "paragraph",
    }));

    const sections = (detail.contentSections || []).map((section, index) => ({
      ...section,
      _sectionKey: section._sectionKey || section.sectionKey || `existing-${eventToEdit._id}-${index}`,
      paragraphs: Array.isArray(section.paragraphs) ? section.paragraphs : [],
    }));

    setDetailPage({
      ...defaults,
      ...detail,
      hero: { ...defaults.hero, ...hero },
      introduction: {
        ...defaults.introduction,
        ...intro,
        blocks: blocks.length ? blocks : [],
      },
      agenda: {
        ...defaults.agenda,
        ...agenda,
        items: Array.isArray(agenda.items) ? agenda.items : defaults.agenda.items,
      },
      contentSections: sections,
    });

    setIntroductionBlockImages({});
    setIntroductionBlockPreviews(
      Object.fromEntries(
        blocks
          .filter((block) => block.type === "image" && (block.imageUrl || block.image))
          .map((block) => [block._key, block.imageUrl || block.image])
      )
    );
    setContentSectionImages({});
    setContentSectionPreviews(
      Object.fromEntries(
        sections
          .map((section, index) => [index, section.imageUrl || section.image || ""])
          .filter(([, url]) => Boolean(url))
      )
    );
    setErrorMsg("");
    setSuccessMsg("");
    setDetailPageOpen(true);
  }, [eventToEdit]);

  const [detailPageOpen, setDetailPageOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ------------------------------------------
  // IMAGE VALIDATION
  // ------------------------------------------

  const validateImage = (file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrorMsg("Only JPG, PNG, WEBP and GIF images are allowed.");
      return false;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setErrorMsg("Image size must be less than 5 MB.");
      return false;
    }

    return true;
  };

  const makePreview = (file, previousPreview) => {
    if (previousPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(previousPreview);
    }

    return URL.createObjectURL(file);
  };

  // ------------------------------------------
  // EVENT CARD IMAGE
  // ------------------------------------------

  const selectEventImage = (file) => {
    if (!file) return;
    if (!validateImage(file)) return;

    setPreviewUrl((previous) => makePreview(file, previous));
    setSelectedFile(file);
    setErrorMsg("");
  };

  const handleFileChange = (e) => {
    selectEventImage(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    selectEventImage(e.dataTransfer.files?.[0]);
  };

  const removeEventImage = () => {
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ------------------------------------------
  // HERO IMAGE
  // ------------------------------------------

  const handleHeroImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!validateImage(file)) return;

    setHeroImagePreview((previous) =>
      makePreview(file, previous)
    );

    setHeroImageFile(file);
    setErrorMsg("");
  };

  const removeHeroImage = () => {
    if (heroImagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(heroImagePreview);
    }

    setHeroImageFile(null);
    setHeroImagePreview("");

    if (heroImageInputRef.current) {
      heroImageInputRef.current.value = "";
    }
  };

  // ------------------------------------------
  // AGENDA IMAGE
  // ------------------------------------------

  const handleAgendaImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !validateImage(file)) return;

    setAgendaImagePreview((previous) => makePreview(file, previous));
    setAgendaImageFile(file);
    setErrorMsg("");
  };

  const removeAgendaImage = () => {
    if (agendaImagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(agendaImagePreview);
    }

    setAgendaImageFile(null);
    setAgendaImagePreview("");

    if (agendaImageInputRef.current) {
      agendaImageInputRef.current.value = "";
    }
  };

  // ------------------------------------------
  // CONTENT SECTION IMAGES
  // ------------------------------------------

  const handleContentImageChange = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!validateImage(file)) return;

    setContentSectionPreviews((previous) => {
      const oldPreview = previous[index];

      if (oldPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(oldPreview);
      }

      return {
        ...previous,
        [index]: URL.createObjectURL(file),
      };
    });

    setContentSectionImages((previous) => ({
      ...previous,
      [index]: file,
    }));

    setErrorMsg("");
  };

  const removeContentImage = (index) => {
    const preview = contentSectionPreviews[index];

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setContentSectionImages((previous) => {
      const updated = { ...previous };
      delete updated[index];
      return updated;
    });

    setContentSectionPreviews((previous) => {
      const updated = { ...previous };
      delete updated[index];
      return updated;
    });

    if (contentImageInputRefs.current[index]) {
      contentImageInputRefs.current[index].value = "";
    }
  };

  // ------------------------------------------
  // DETAIL PAGE FIELD HELPERS
  // ------------------------------------------

  const updateHero = (field, value) => {
    setDetailPage((previous) => ({
      ...previous,
      hero: {
        ...previous.hero,
        [field]: value,
      },
    }));
  };

  const updateIntroduction = (field, value) => {
    setDetailPage((previous) => ({
      ...previous,
      introduction: {
        ...previous.introduction,
        [field]: value,
      },
    }));
  };

  const updateAgenda = (field, value) => {
    setDetailPage((previous) => ({
      ...previous,
      agenda: {
        ...previous.agenda,
        [field]: value,
      },
    }));
  };

  // ------------------------------------------
  // INTRODUCTION CONTENT BLOCKS
  // ------------------------------------------

  const addIntroductionBlock = (type) => {
    setDetailPage((previous) => ({
      ...previous,
      introduction: {
        ...previous.introduction,
        blocks: [
          ...(previous.introduction.blocks || []),
          emptyIntroductionBlock(type),
        ],
      },
    }));
  };

  const updateIntroductionBlock = (index, field, value) => {
    setDetailPage((previous) => {
      const blocks = [...(previous.introduction.blocks || [])];
      blocks[index] = { ...blocks[index], [field]: value };

      return {
        ...previous,
        introduction: { ...previous.introduction, blocks },
      };
    });
  };

  // BULLET / LIST BLOCK HELPERS
  const updateIntroductionListItem = (blockIndex, itemIndex, value) => {
    setDetailPage((previous) => {
      const blocks = [...(previous.introduction.blocks || [])];
      const block = { ...blocks[blockIndex] };
      const items = [...(block.items || [])];
      items[itemIndex] = value;
      block.items = items;
      blocks[blockIndex] = block;

      return {
        ...previous,
        introduction: { ...previous.introduction, blocks },
      };
    });
  };

  const addIntroductionListItem = (blockIndex) => {
    setDetailPage((previous) => {
      const blocks = [...(previous.introduction.blocks || [])];
      const block = { ...blocks[blockIndex] };
      block.items = [...(block.items || []), ""];
      blocks[blockIndex] = block;

      return {
        ...previous,
        introduction: { ...previous.introduction, blocks },
      };
    });
  };

  const removeIntroductionListItem = (blockIndex, itemIndex) => {
    setDetailPage((previous) => {
      const blocks = [...(previous.introduction.blocks || [])];
      const block = { ...blocks[blockIndex] };
      const items = (block.items || []).filter((_, i) => i !== itemIndex);
      block.items = items.length ? items : [""];
      blocks[blockIndex] = block;

      return {
        ...previous,
        introduction: { ...previous.introduction, blocks },
      };
    });
  };

  const removeIntroductionBlock = (index) => {
    const block = detailPage.introduction.blocks[index];
    const key = block?._key || String(index);
    const preview = introductionBlockPreviews[key];
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);

    setIntroductionBlockImages((previous) => {
      const updated = { ...previous };
      delete updated[key];
      return updated;
    });
    setIntroductionBlockPreviews((previous) => {
      const updated = { ...previous };
      delete updated[key];
      return updated;
    });
    delete introductionBlockImageInputRefs.current[key];

    setDetailPage((previous) => ({
      ...previous,
      introduction: {
        ...previous.introduction,
        blocks: previous.introduction.blocks.filter((_, i) => i !== index),
      },
    }));
  };

  const moveIntroductionBlock = (index, direction) => {
    setDetailPage((previous) => {
      const blocks = [...previous.introduction.blocks];
      const target = index + direction;
      if (target < 0 || target >= blocks.length) return previous;
      [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
      return {
        ...previous,
        introduction: { ...previous.introduction, blocks },
      };
    });
  };

  const handleIntroductionBlockImageChange = (e, key) => {
    const file = e.target.files?.[0];
    if (!file || !validateImage(file)) return;

    setIntroductionBlockPreviews((previous) => {
      const oldPreview = previous[key];
      if (oldPreview?.startsWith("blob:")) URL.revokeObjectURL(oldPreview);
      return { ...previous, [key]: URL.createObjectURL(file) };
    });
    setIntroductionBlockImages((previous) => ({ ...previous, [key]: file }));
    setErrorMsg("");
  };

  const removeIntroductionBlockImage = (key) => {
    const preview = introductionBlockPreviews[key];
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    setIntroductionBlockImages((previous) => {
      const updated = { ...previous };
      delete updated[key];
      return updated;
    });
    setIntroductionBlockPreviews((previous) => {
      const updated = { ...previous };
      delete updated[key];
      return updated;
    });
    if (introductionBlockImageInputRefs.current[key]) {
      introductionBlockImageInputRefs.current[key].value = "";
    }
  };

  // ------------------------------------------
  // AGENDA ITEMS
  // ------------------------------------------

  const updateAgendaItem = (index, field, value) => {
    setDetailPage((previous) => {
      const items = [...previous.agenda.items];

      items[index] = {
        ...items[index],
        [field]: value,
      };

      return {
        ...previous,
        agenda: {
          ...previous.agenda,
          items,
        },
      };
    });
  };

  const addAgendaItem = () => {
    setDetailPage((previous) => ({
      ...previous,
      agenda: {
        ...previous.agenda,
        items: [...previous.agenda.items, emptyAgendaItem()],
      },
    }));
  };

  const removeAgendaItem = (index) => {
    setDetailPage((previous) => ({
      ...previous,
      agenda: {
        ...previous.agenda,
        items: previous.agenda.items.filter((_, i) => i !== index),
      },
    }));
  };

  // ------------------------------------------
  // CONTENT SECTION HELPERS
  // ------------------------------------------

  const updateContentSection = (index, field, value) => {
    setDetailPage((previous) => {
      const sections = [...previous.contentSections];

      sections[index] = {
        ...sections[index],
        [field]: value,
      };

      return {
        ...previous,
        contentSections: sections,
      };
    });
  };

  const updateContentParagraph = (
    sectionIndex,
    paragraphIndex,
    value
  ) => {
    setDetailPage((previous) => {
      const sections = [...previous.contentSections];
      const paragraphs = [...sections[sectionIndex].paragraphs];

      paragraphs[paragraphIndex] = value;

      sections[sectionIndex] = {
        ...sections[sectionIndex],
        paragraphs,
      };

      return {
        ...previous,
        contentSections: sections,
      };
    });
  };

  const addContentParagraph = (sectionIndex) => {
    setDetailPage((previous) => {
      const sections = [...previous.contentSections];

      sections[sectionIndex] = {
        ...sections[sectionIndex],
        paragraphs: [
          ...sections[sectionIndex].paragraphs,
          "",
        ],
      };

      return {
        ...previous,
        contentSections: sections,
      };
    });
  };

  const removeContentParagraph = (sectionIndex, paragraphIndex) => {
    setDetailPage((previous) => {
      const sections = [...previous.contentSections];

      sections[sectionIndex] = {
        ...sections[sectionIndex],
        paragraphs: sections[sectionIndex].paragraphs.filter(
          (_, i) => i !== paragraphIndex
        ),
      };

      return {
        ...previous,
        contentSections: sections,
      };
    });
  };

  const addContentSection = () => {
    setDetailPage((previous) => ({
      ...previous,
      contentSections: [
        ...previous.contentSections,
        emptyContentSection(),
      ],
    }));
  };

  const removeContentSection = (index) => {
    removeContentImage(index);

    setDetailPage((previous) => ({
      ...previous,
      contentSections: previous.contentSections.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // ------------------------------------------
  // RESET FORM
  // ------------------------------------------

  const resetForm = () => {
    removeEventImage();
    removeHeroImage();
    removeAgendaImage();

    Object.values(introductionBlockPreviews).forEach((preview) => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    });
    setIntroductionBlockImages({});
    setIntroductionBlockPreviews({});
    introductionBlockImageInputRefs.current = {};

    Object.keys(contentSectionPreviews).forEach((key) => {
      const preview = contentSectionPreviews[key];

      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    });

    setContentSectionImages({});
    setContentSectionPreviews({});

    setHeading("");
    setText("");
    setDate("");
    setCategory("Conference");
    setDetailPage(initialDetailPage());
    setErrorMsg("");
  };

  // ------------------------------------------
  // SUBMIT EVENT
  // ------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    if (!heading.trim()) {
      setErrorMsg("Event heading is required.");
      return;
    }

    if (heading.trim().length > MAX_HEADING_LEN) {
      setErrorMsg(
        `Heading cannot exceed ${MAX_HEADING_LEN} characters.`
      );
      return;
    }

    if (!text.trim()) {
      setErrorMsg("Event description is required.");
      return;
    }

    if (text.trim().length > MAX_TEXT_LEN) {
      setErrorMsg(
        `Description cannot exceed ${MAX_TEXT_LEN} characters.`
      );
      return;
    }

    if (!date.trim()) {
      setErrorMsg("Event date badge is required.");
      return;
    }

    if (!eventToEdit && !selectedFile) {
      setErrorMsg("Please upload an event card image.");
      return;
    }

    if (!detailPage.hero.title.trim()) {
      setErrorMsg("Detail page hero title is required.");
      return;
    }

    if (!eventToEdit && !heroImageFile && !detailPage.hero.imageUrl && !detailPage.hero.image) {
      setErrorMsg("Please upload a hero section image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Event card details
      formData.append("title", heading.trim());
      formData.append("heading", heading.trim());
      formData.append("description", text.trim());
      formData.append("text", text.trim());
      const eventDetailUrl = `/events/${createSlug(heading)}`;
      formData.append("eventLink", eventDetailUrl);
      formData.append("link", eventDetailUrl);
      formData.append("date", date.trim());
      formData.append("category", category);
      formData.append("isActive", "true");
      formData.append("slug", createSlug(heading));

      // Only send newly selected files. Existing Cloudinary URLs remain untouched.
      if (selectedFile) formData.append("image", selectedFile);
      if (heroImageFile) formData.append("heroImage", heroImageFile);

      // Optional agenda image
      if (agendaImageFile) {
        formData.append("agendaImage", agendaImageFile);
      }

      // Introduction block images (field names preserve block indexes)
      (detailPage.introduction.blocks || []).forEach((block, index) => {
        const file = introductionBlockImages[block._key];
        if (file) formData.append(`introductionBlockImage_${index}`, file);
      });

      // Additional content section images
      Object.entries(contentSectionImages).forEach(([index, file]) => {
        formData.append(`contentSectionImage_${index}`, file);
      });

      // Send text content separately from files.
      const detailPayload = {
        ...detailPage,

        hero: { ...detailPage.hero },
        agenda: { ...detailPage.agenda },
        introduction: {
          ...detailPage.introduction,
          blocks: (detailPage.introduction.blocks || []).map((block) => ({ ...block })),
        },
        contentSections: detailPage.contentSections.map((section) => ({ ...section })),
      };

      formData.append("detailPage", JSON.stringify(detailPayload));

      if (eventToEdit?._id) {
        await updateEvent(eventToEdit._id, formData);
        setSuccessMsg("Event and detail page updated successfully!");
      } else {
        await createEvent(formData);
        setSuccessMsg("Event and detail page published successfully!");
      }

      if (onEventAdded) onEventAdded();
      if (!eventToEdit) resetForm();
    } catch (error) {
      console.error("Create event error:", error);

      setErrorMsg(
        error.response?.data?.message ||
          error.message ||
          "Failed to create event. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------
  // CLEANUP PREVIEW URLS ON UNMOUNT
  // ------------------------------------------

  useEffect(() => {
    return () => {
      [
        previewUrl,
        heroImagePreview,
        agendaImagePreview,
        ...Object.values(introductionBlockPreviews),
        ...Object.values(contentSectionPreviews),
      ].forEach((url) => {
        if (url?.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [
    previewUrl,
    heroImagePreview,
    agendaImagePreview,
    introductionBlockPreviews,
    contentSectionPreviews,
  ]);

  // ------------------------------------------
  // REUSABLE UI
  // ------------------------------------------

  const FieldLabel = ({ children }) => (
    <label className="mb-2 block text-xs font-bold text-gray-700">
      {children}
    </label>
  );

  const SectionHeader = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-[#FFF4F0] p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E25238] text-white">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#1E293B]">{title}</h3>
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );

  const ImageUploader = ({
    preview,
    inputRef,
    onChange,
    onRemove,
    label,
  }) => (
    <div className="space-y-3">
      <FieldLabel>{label}</FieldLabel>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={onChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative overflow-hidden rounded-xl border border-gray-200">
          <img
            src={preview}
            alt={`${label} preview`}
            className="h-56 w-full object-cover"
          />

          <button
            type="button"
            onClick={onRemove}
            className="absolute right-3 top-3 flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white shadow hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-3 right-3 rounded-lg bg-white px-3 py-2 text-xs font-bold text-gray-700 shadow hover:bg-gray-100"
          >
            Replace Image
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex min-h-[170px] w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#E25238]/50 bg-orange-50/30 p-5 text-center transition hover:border-[#E25238] hover:bg-orange-50"
        >
          <UploadCloud className="h-9 w-9 text-[#E25238]" />

          <span className="text-sm font-bold text-gray-700">
            Upload Image
          </span>

          <span className="text-xs text-gray-400">
            JPG, PNG, WEBP, GIF — Maximum 5 MB
          </span>
        </button>
      )}
    </div>
  );

  // ------------------------------------------
  // UI
  // ------------------------------------------

  return (
    <div className="w-full space-y-6 text-left">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#1E293B]">
            {eventToEdit ? "Edit Event" : "Add New Event"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {eventToEdit ? "Update the event and its complete detail page." : "Create an event and manage its complete detail page."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.("all-events")}
          className="w-fit rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-bold text-gray-600 transition hover:bg-gray-50"
        >
          View All Events
        </button>
      </div>

      {/* ALERTS */}
      {successMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
      >
        {/* =====================================
            EVENT CARD
        ====================================== */}
        <section className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <SectionHeader
              icon={ImageIcon}
              title="Event Poster"
              description="Image displayed on the main events listing card."
            />

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="flex min-h-[260px] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-[#E25238]/60 p-4 text-center transition hover:border-[#E25238] hover:bg-orange-50/40"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />

              {previewUrl ? (
                <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={previewUrl}
                    alt="Event preview"
                    className="h-full w-full object-cover"
                  />

                  {date && (
                    <span className="absolute bottom-3 right-3 rounded-md bg-[#E87568] px-3 py-2 text-xs font-bold text-white">
                      {date}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeEventImage();
                    }}
                    className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white shadow hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <UploadCloud className="mx-auto h-10 w-10 text-[#E25238]" />

                  <p className="text-sm font-semibold text-gray-700">
                    Drop event image or{" "}
                    <span className="text-[#E25238] underline">browse</span>
                  </p>

                  <p className="text-xs text-gray-400">
                    JPG, PNG, WEBP, GIF — Maximum 5 MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-5 lg:col-span-7">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <FieldLabel>
                  <Type className="mr-2 inline h-4 w-4 text-[#E25238]" />
                  Event Heading
                </FieldLabel>

                <span className="text-[11px] text-gray-400">
                  {heading.length}/{MAX_HEADING_LEN}
                </span>
              </div>

              <input
                type="text"
                value={heading}
                maxLength={MAX_HEADING_LEN}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Enter event heading"
                required
                className={inputClass}
              />

              <p className="mt-1 text-xs text-gray-400">
                Page URL: /events/{createSlug(heading) || "event-name"}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <FieldLabel>
                  <AlignLeft className="mr-2 inline h-4 w-4 text-[#E25238]" />
                  Event Description
                </FieldLabel>

                <span className="text-[11px] text-gray-400">
                  {text.length}/{MAX_TEXT_LEN}
                </span>
              </div>

              <textarea
                rows={4}
                value={text}
                maxLength={MAX_TEXT_LEN}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter a short event description..."
                required
                className={`${inputClass} resize-y`}
              />
            </div>

            <div>
              <FieldLabel>
                <LinkIcon className="mr-2 inline h-4 w-4 text-[#E25238]" />
                Event Detail Page URL (Auto Generated)
              </FieldLabel>

              <div className="relative">
                <input
                  type="text"
                  value={`/events/${createSlug(heading) || "event-name"}`}
                  readOnly
                  aria-readonly="true"
                  className={`${inputClass} cursor-not-allowed bg-gray-50 pr-24 text-gray-600`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-green-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700">
                  Auto URL
                </span>
              </div>
              <p className="mt-1.5 text-xs text-gray-500">
                This URL is generated automatically from the Event Heading. It will update as you type.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>
                  <Calendar className="mr-2 inline h-4 w-4 text-[#E25238]" />
                  Date Badge
                </FieldLabel>

                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="16 Sep"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <FieldLabel>
                  <Tag className="mr-2 inline h-4 w-4 text-[#E25238]" />
                  Event Category
                </FieldLabel>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`${inputClass} bg-white`}
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================
            DETAIL PAGE CMS
        ====================================== */}
        <section className="overflow-hidden rounded-2xl border border-gray-200">
          <button
            type="button"
            onClick={() => setDetailPageOpen((previous) => !previous)}
            className="flex w-full items-center justify-between gap-4 bg-[#FFF4F0] p-5 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E25238] text-white">
                <Layers className="h-5 w-5" />
              </div>

              <div>
                <h3 className="font-bold text-[#1E293B]">
                  Event Detail Page CMS
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Manage hero, introduction, agenda and content sections.
                </p>
              </div>
            </div>

            {detailPageOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          {detailPageOpen && (
            <div className="space-y-8 p-5 sm:p-7">
              {/* HERO */}
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-[#1E293B]">
                    1. Hero Section
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Main banner content for the event detail page.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel>Hero Eyebrow</FieldLabel>
                    <input
                      className={inputClass}
                      value={detailPage.hero.eyebrow}
                      onChange={(e) =>
                        updateHero("eyebrow", e.target.value)
                      }
                      placeholder="AIA EVENT"
                    />
                  </div>

                  <div>
                    <FieldLabel>Hero Title</FieldLabel>
                    <input
                      className={inputClass}
                      value={detailPage.hero.title}
                      onChange={(e) =>
                        updateHero("title", e.target.value)
                      }
                      placeholder="Enter hero title"
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel>Hero Subtitle</FieldLabel>
                  <input
                    className={inputClass}
                    value={detailPage.hero.subtitle}
                    onChange={(e) =>
                      updateHero("subtitle", e.target.value)
                    }
                    placeholder="Enter subtitle"
                  />
                </div>

                <div>
                  <FieldLabel>Hero Description</FieldLabel>
                  <textarea
                    rows={4}
                    className={inputClass}
                    value={detailPage.hero.description}
                    onChange={(e) =>
                      updateHero("description", e.target.value)
                    }
                    placeholder="Enter hero description"
                  />
                </div>

                <div>
                  <FieldLabel>Hero Image Alt Text</FieldLabel>
                  <input
                    className={inputClass}
                    value={detailPage.hero.imageAlt}
                    onChange={(e) =>
                      updateHero("imageAlt", e.target.value)
                    }
                    placeholder="Describe the hero image"
                  />
                </div>

                <ImageUploader
                  label="Hero Image Upload"
                  preview={heroImagePreview}
                  inputRef={heroImageInputRef}
                  onChange={handleHeroImageChange}
                  onRemove={removeHeroImage}
                />
              </div>

              <div className="border-t border-gray-100" />

              {/* INTRODUCTION */}
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-[#1E293B]">
                    2. Introduction Section
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Add introductory content and image.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel>Eyebrow</FieldLabel>
                    <input
                      className={inputClass}
                      value={detailPage.introduction.eyebrow}
                      onChange={(e) =>
                        updateIntroduction("eyebrow", e.target.value)
                      }
                      placeholder="ABOUT THE EVENT"
                    />
                  </div>

                  <div>
                    <FieldLabel>Title</FieldLabel>
                    <input
                      className={inputClass}
                      value={detailPage.introduction.title}
                      onChange={(e) =>
                        updateIntroduction("title", e.target.value)
                      }
                      placeholder="Introduction title"
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel>Description</FieldLabel>
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={detailPage.introduction.description}
                    onChange={(e) =>
                      updateIntroduction("description", e.target.value)
                    }
                    placeholder="Introduction description"
                  />
                </div>

                {/* Dynamic Introduction Blocks */}
                <div className="space-y-4">
                  {(detailPage.introduction.blocks || []).map((block, index) => (
                    <div
                      key={block._key || index}
                      className="space-y-4 rounded-xl border border-gray-200 bg-white p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="text-xs font-bold uppercase text-[#E25238]">
                            {block.type === "heading" ? "Heading" : block.type === "image" ? "Image" : ["list", "bullet", "bullets"].includes(block.type) ? "Bullet Points" : "Paragraph"}
                          </span>
                          <span className="ml-2 text-xs text-gray-400">Block {index + 1}</span>
                        </div>
                        <div className="flex gap-1">
                          <button type="button" disabled={index === 0} onClick={() => moveIntroductionBlock(index, -1)} className="rounded-lg border p-2 disabled:opacity-30" aria-label="Move block up">
                            <ChevronUp className="h-4 w-4" />
                          </button>
                          <button type="button" disabled={index === detailPage.introduction.blocks.length - 1} onClick={() => moveIntroductionBlock(index, 1)} className="rounded-lg border p-2 disabled:opacity-30" aria-label="Move block down">
                            <ChevronDown className="h-4 w-4" />
                          </button>
                          <button type="button" onClick={() => removeIntroductionBlock(index)} className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50" aria-label="Remove block">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {block.type === "heading" && (
                        <div>
                          <FieldLabel>Introduction Sub-heading</FieldLabel>
                          <input className={inputClass} value={block.text || ""} onChange={(e) => updateIntroductionBlock(index, "text", e.target.value)} placeholder="Enter sub-heading" />
                        </div>
                      )}

                      {block.type === "paragraph" && (
                        <div>
                          <FieldLabel>Paragraph Content</FieldLabel>
                          <textarea rows={4} className={inputClass} value={block.text || ""} onChange={(e) => updateIntroductionBlock(index, "text", e.target.value)} placeholder="Write introduction paragraph..." />
                        </div>
                      )}

                      {["list", "bullet", "bullets"].includes(block.type) && (
                        <div className="space-y-3 rounded-xl border border-orange-200 bg-orange-50/40 p-4">
                          <div>
                            <FieldLabel>Bullet Points</FieldLabel>
                            <p className="text-xs text-gray-500">Add each point separately. These will appear as a bulleted list on the event detail page.</p>
                          </div>

                          {(block.items || [""]).map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-start gap-2">
                              <span className="mt-3.5 h-2 w-2 shrink-0 rounded-full bg-[#E25238]" />
                              <textarea
                                rows={2}
                                className={inputClass}
                                value={item || ""}
                                onChange={(e) => updateIntroductionListItem(index, itemIndex, e.target.value)}
                                placeholder={`Bullet point ${itemIndex + 1}`}
                              />
                              <button
                                type="button"
                                onClick={() => removeIntroductionListItem(index, itemIndex)}
                                className="mt-1 rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                                aria-label={`Remove bullet point ${itemIndex + 1}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => addIntroductionListItem(index)}
                            className="inline-flex items-center gap-2 rounded-lg border border-[#E25238] bg-white px-4 py-2.5 text-xs font-bold text-[#E25238] hover:bg-orange-50"
                          >
                            <Plus className="h-4 w-4" /> Add Bullet Point
                          </button>
                        </div>
                      )}

                      {block.type === "image" && (
                        <div className="space-y-4">
                          <div>
                            <FieldLabel>Introduction Image</FieldLabel>
                            <input
                              ref={(element) => { introductionBlockImageInputRefs.current[block._key || String(index)] = element; }}
                              type="file"
                              accept="image/png,image/jpeg,image/webp,image/gif"
                              onChange={(e) => handleIntroductionBlockImageChange(e, block._key || String(index))}
                              className="hidden"
                            />
                            {introductionBlockPreviews[block._key || String(index)] ? (
                              <div className="relative overflow-hidden rounded-xl border border-gray-200">
                                <img src={introductionBlockPreviews[block._key || String(index)]} alt={block.imageAlt || "Introduction preview"} className="h-56 w-full object-cover" />
                                <div className="absolute right-3 top-3 flex gap-2">
                                  <button type="button" onClick={() => introductionBlockImageInputRefs.current[block._key || String(index)]?.click()} className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-gray-700 shadow">Replace</button>
                                  <button type="button" onClick={() => removeIntroductionBlockImage(block._key || String(index))} className="rounded-lg bg-red-600 p-2 text-white shadow" aria-label="Remove image"><Trash2 className="h-4 w-4" /></button>
                                </div>
                              </div>
                            ) : (
                              <button type="button" onClick={() => introductionBlockImageInputRefs.current[block._key || String(index)]?.click()} className="flex min-h-[150px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E25238]/50 bg-orange-50/30 p-5 hover:bg-orange-50">
                                <UploadCloud className="h-8 w-8 text-[#E25238]" />
                                <span className="text-sm font-bold text-gray-700">Upload Introduction Image</span>
                                <span className="text-xs text-gray-400">JPG, PNG, WEBP, GIF — Maximum 5 MB</span>
                              </button>
                            )}
                          </div>
                          <div>
                            <FieldLabel>Image Alt Text</FieldLabel>
                            <input className={inputClass} value={block.imageAlt || ""} onChange={(e) => updateIntroductionBlock(index, "imageAlt", e.target.value)} placeholder="Describe the image" />
                          </div>
                          <div>
                            <FieldLabel>Image Caption</FieldLabel>
                            <textarea rows={2} className={inputClass} value={block.caption || ""} onChange={(e) => updateIntroductionBlock(index, "caption", e.target.value)} placeholder="Write image caption (optional)" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-dashed border-gray-300 bg-slate-50 p-4">
                  <h4 className="mb-1 text-sm font-bold text-[#1E293B]">Add Introduction Content</h4>
                  <p className="mb-4 text-xs text-gray-500">Choose the content type you want to add. You can rearrange blocks anytime.</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      ["paragraph", "Paragraph"],
                      ["list", "Bullet Points"],
                      ["image", "Image"],
                      ["heading", "Heading"],
                    ].map(([type, label]) => (
                      <button key={type} type="button" onClick={() => addIntroductionBlock(type)} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 transition hover:border-[#E25238] hover:bg-orange-50 hover:text-[#E25238]">
                        <Plus className="h-4 w-4" /> Add {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* AGENDA */}
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-[#1E293B]">
                    3. Event Agenda
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Add schedule items, timings and descriptions.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel>Agenda Eyebrow</FieldLabel>
                    <input
                      className={inputClass}
                      value={detailPage.agenda.eyebrow}
                      onChange={(e) =>
                        updateAgenda("eyebrow", e.target.value)
                      }
                      placeholder="EVENT SCHEDULE"
                    />
                  </div>

                  <div>
                    <FieldLabel>Agenda Title</FieldLabel>
                    <input
                      className={inputClass}
                      value={detailPage.agenda.title}
                      onChange={(e) =>
                        updateAgenda("title", e.target.value)
                      }
                      placeholder="Event Agenda"
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel>Agenda Description</FieldLabel>
                  <textarea
                    rows={2}
                    className={inputClass}
                    value={detailPage.agenda.description}
                    onChange={(e) =>
                      updateAgenda("description", e.target.value)
                    }
                    placeholder="Agenda introduction"
                  />
                </div>

                <div className="space-y-4">
                  <ImageUploader
                    label="Agenda Section Image"
                    preview={agendaImagePreview}
                    inputRef={agendaImageInputRef}
                    onChange={handleAgendaImageChange}
                    onRemove={removeAgendaImage}
                  />

                  <div>
                    <FieldLabel>Agenda Image Alt Text</FieldLabel>
                    <input
                      className={inputClass}
                      value={detailPage.agenda.imageAlt}
                      onChange={(e) => updateAgenda("imageAlt", e.target.value)}
                      placeholder="Describe the agenda image"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {detailPage.agenda.items.map((item, index) => (
                    <div
                      key={index}
                      className="space-y-3 rounded-xl border border-gray-200 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gray-700">
                          Agenda Item {index + 1}
                        </h4>

                        <button
                          type="button"
                          onClick={() => removeAgendaItem(index)}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <input
                          className={inputClass}
                          value={item.time}
                          onChange={(e) =>
                            updateAgendaItem(index, "time", e.target.value)
                          }
                          placeholder="10:00 AM"
                        />

                        <input
                          className={inputClass}
                          value={item.title}
                          onChange={(e) =>
                            updateAgendaItem(index, "title", e.target.value)
                          }
                          placeholder="Session title"
                        />
                      </div>

                      <textarea
                        rows={2}
                        className={inputClass}
                        value={item.description || ""}
                        onChange={(e) =>
                          updateAgendaItem(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Session description (optional)"
                      />

                      {/* Individual link for this agenda list item */}
                      <div className="space-y-2">
                        <FieldLabel>Agenda Item Link (Optional)</FieldLabel>
                        <input
                          type="text"
                          className={inputClass}
                          value={item.link || ""}
                          onChange={(e) =>
                            updateAgendaItem(index, "link", e.target.value)
                          }
                          placeholder="https://example.com or /workshop-details"
                        />
                        <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-gray-600">
                          <input
                            type="checkbox"
                            checked={Boolean(item.external)}
                            onChange={(e) =>
                              updateAgendaItem(index, "external", e.target.checked)
                            }
                            className="h-4 w-4 rounded border-gray-300 accent-[#E25238]"
                          />
                          Open this link in a new tab
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addAgendaItem}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#E25238] px-4 py-2.5 text-xs font-bold text-[#E25238] hover:bg-orange-50"
                >
                  <Plus className="h-4 w-4" />
                  Add Agenda Item
                </button>
              </div>

              <div className="border-t border-gray-100" />

              {/* ADDITIONAL CONTENT SECTIONS */}
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-[#1E293B]">
                    4. Additional Content Sections
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Every content section can have its own uploaded image.
                  </p>
                </div>

                {detailPage.contentSections.map((section, index) => (
                  <div
                    key={index}
                    className="space-y-4 rounded-xl border border-gray-200 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-gray-800">
                        Content Section {index + 1}
                      </h4>

                      <button
                        type="button"
                        onClick={() => removeContentSection(index)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <input
                        className={inputClass}
                        value={section.eyebrow}
                        onChange={(e) =>
                          updateContentSection(
                            index,
                            "eyebrow",
                            e.target.value
                          )
                        }
                        placeholder="Section eyebrow"
                      />

                      <input
                        className={inputClass}
                        value={section.title}
                        onChange={(e) =>
                          updateContentSection(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Section title"
                      />
                    </div>

                    <textarea
                      rows={3}
                      className={inputClass}
                      value={section.description}
                      onChange={(e) =>
                        updateContentSection(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Section description"
                    />

                    <div className="space-y-3">
                      <FieldLabel>Paragraphs</FieldLabel>

                      {section.paragraphs.map(
                        (paragraph, paragraphIndex) => (
                          <div
                            key={paragraphIndex}
                            className="flex gap-2"
                          >
                            <textarea
                              rows={2}
                              className={inputClass}
                              value={paragraph}
                              onChange={(e) =>
                                updateContentParagraph(
                                  index,
                                  paragraphIndex,
                                  e.target.value
                                )
                              }
                              placeholder={`Paragraph ${paragraphIndex + 1}`}
                            />

                            <button
                              type="button"
                              onClick={() =>
                                removeContentParagraph(
                                  index,
                                  paragraphIndex
                                )
                              }
                              className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )
                      )}

                      <button
                        type="button"
                        onClick={() => addContentParagraph(index)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#E25238]"
                      >
                        <Plus className="h-4 w-4" />
                        Add Paragraph
                      </button>
                    </div>

                    <ImageUploader
                      label={`Content Section ${index + 1} Image`}
                      preview={contentSectionPreviews[index] || ""}
                      inputRef={{
                        current: contentImageInputRefs.current[index],
                      }}
                      onChange={(e) =>
                        handleContentImageChange(e, index)
                      }
                      onRemove={() => removeContentImage(index)}
                    />

                    <input
                      ref={(element) => {
                        contentImageInputRefs.current[index] = element;
                      }}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={(e) =>
                        handleContentImageChange(e, index)
                      }
                      className="hidden"
                    />

                    <div>
                      <FieldLabel>Image Alt Text</FieldLabel>
                      <input
                        className={inputClass}
                        value={section.imageAlt}
                        onChange={(e) =>
                          updateContentSection(
                            index,
                            "imageAlt",
                            e.target.value
                          )
                        }
                        placeholder="Image alt text"
                      />
                    </div>

                    <div>
                      <FieldLabel>Image Position</FieldLabel>
                      <select
                        className={`${inputClass} bg-white`}
                        value={section.imagePosition}
                        onChange={(e) =>
                          updateContentSection(
                            index,
                            "imagePosition",
                            e.target.value
                          )
                        }
                      >
                        <option value="right">Right</option>
                        <option value="left">Left</option>
                      </select>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addContentSection}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#E25238] px-4 py-2.5 text-xs font-bold text-[#E25238] hover:bg-orange-50"
                >
                  <Plus className="h-4 w-4" />
                  Add Content Section
                </button>
              </div>
            </div>
          )}
        </section>

        {/* FORM ACTIONS */}
        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E25238] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#C9452E] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {eventToEdit ? "Updating..." : "Publishing..."}
              </>
            ) : (
              eventToEdit ? "Update Event" : "Publish Event"
            )}
          </button>

          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}
