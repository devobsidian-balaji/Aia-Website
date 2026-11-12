
import React, { useEffect, useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { createMember, updateMember } from "../services/api";

const emptyService = () => ({
  title: "",
  description: "",
  image: {},
  imageFile: null,
});

const initialForm = {
  name: "",
  shortName: "",
  slug: "",
  category: "",
  about: "",
  services: [],
  mission: "",
  vision: "",
  qualityPolicy: "",
  qualityObjectives: "",
  commitment: "",
  familyMember: {
    name: "",
    designation: "",
    organization: "",
    email: "",
    phone: "",
  },
  website: "",
  displayOrder: 0,
  isActive: true,
};

export default function AddMember({ editingMember, onNavigate }) {
  const [form, setForm] = useState(initialForm);
  const [cardLogo, setCardLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingMember) {
      setForm({
        ...initialForm,
        ...editingMember,
        familyMember: {
          name: editingMember.familyMember?.name || "",
          designation: editingMember.familyMember?.designation || "",
          organization: editingMember.familyMember?.organization || "",
          email: editingMember.familyMember?.email || "",
          phone: editingMember.familyMember?.phone || "",
        },
        qualityObjectives: Array.isArray(editingMember.qualityObjectives)
          ? editingMember.qualityObjectives.join("\n")
          : editingMember.qualityObjectives || "",
        services: (editingMember.services || []).map((service) => ({
          ...service,
          imageFile: null,
        })),
      });

      setLogoPreview(editingMember.logo?.url || "");
    } else {
      setForm({
        ...initialForm,
        familyMember: { ...initialForm.familyMember },
        services: [],
      });
      setCardLogo(null);
      setLogoPreview("");
    }

    setMessage("");
  }, [editingMember]);

  const updateField = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateFamilyField = (name, value) => {
    setForm((prev) => ({
      ...prev,
      familyMember: {
        ...prev.familyMember,
        [name]: value,
      },
    }));
  };

  const generateSlug = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleNameChange = (value) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: editingMember ? prev.slug : generateSlug(value),
    }));
  };

  const handleLogoChange = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size must be below 5 MB.");
      return;
    }

    setCardLogo(file);
    setLogoPreview(URL.createObjectURL(file));
    setMessage("");
  };

  const addService = () => {
    updateField("services", [...form.services, emptyService()]);
  };

  const updateService = (index, key, value) => {
    const updated = [...form.services];
    updated[index] = {
      ...updated[index],
      [key]: value,
    };
    updateField("services", updated);
  };

  const removeService = (index) => {
    updateField(
      "services",
      form.services.filter((_, i) => i !== index)
    );
  };

  const resetForm = () => {
    setForm({
      ...initialForm,
      familyMember: { ...initialForm.familyMember },
      services: [],
    });
    setCardLogo(null);
    setLogoPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.name.trim() || !form.slug.trim()) {
      setMessage("Company name and slug are required.");
      return;
    }

    if (!editingMember && !cardLogo) {
      setMessage("Please upload a Company Logo.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      const payload = {
        ...form,
        familyMember: {
          name: form.familyMember.name,
          designation: form.familyMember.designation,
          organization: form.familyMember.organization,
          email: form.familyMember.email,
          phone: form.familyMember.phone,
        },
        displayOrder: Number(form.displayOrder) || 0,
        qualityObjectives: form.qualityObjectives
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        services: form.services.map((service) => ({
          title: service.title || "",
          description: service.description || "",
          image: service.image || {},
        })),
      };

      formData.append("payload", JSON.stringify(payload));

      if (cardLogo) {
        formData.append("cardLogo", cardLogo);
      }

      const serviceImageIndexes = [];

      form.services.forEach((service, index) => {
        if (service.imageFile) {
          formData.append("serviceImages", service.imageFile);
          serviceImageIndexes.push(index);
        }
      });

      formData.append(
        "serviceImageIndexes",
        JSON.stringify(serviceImageIndexes)
      );

      if (editingMember) {
        await updateMember(editingMember._id, formData);
        setMessage("Member updated successfully.");
        onNavigate?.("all-members");
      } else {
        await createMember(formData);
        setMessage("Member created successfully.");
        resetForm();
      }
    } catch (error) {
      console.error("Member Save Error:", error);

      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E87565] focus:ring-2 focus:ring-[#E87565]/10";

  const labelClass =
    "block text-sm font-semibold text-gray-700 mb-2";

  const sectionClass =
    "bg-white border border-gray-200 rounded-xl p-5 md:p-7 space-y-5";

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-7 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#202A3A]">
          {editingMember ? "Edit Member" : "Add New Member"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage member directory card and profile details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: MEMBER CARD DETAILS */}
        <section className={sectionClass}>
          <div>
            <h2 className="text-lg font-bold text-[#202A3A]">
              01. Member Card Details
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Information displayed on the member directory.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Company Name *</label>
              <input
                required
                className={inputClass}
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Company name"
              />
            </div>

            <div>
              <label className={labelClass}>Short Name</label>
              <input
                className={inputClass}
                value={form.shortName}
                onChange={(e) => updateField("shortName", e.target.value)}
                placeholder="Short name"
              />
            </div>

            <div>
              <label className={labelClass}>Slug *</label>
              <input
                required
                className={inputClass}
                value={form.slug}
                onChange={(e) =>
                  updateField("slug", generateSlug(e.target.value))
                }
              />
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <input
                className={inputClass}
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                placeholder="Engineering Solutions"
              />
            </div>

            <div>
              <label className={labelClass}>Display Order</label>
              <input
                type="number"
                className={inputClass}
                value={form.displayOrder}
                onChange={(e) =>
                  updateField("displayOrder", e.target.value)
                }
              />
            </div>

            <div>
              <label className={labelClass}>Status</label>
              <select
                className={inputClass}
                value={String(form.isActive)}
                onChange={(e) =>
                  updateField("isActive", e.target.value === "true")
                }
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          {/* ONE COMPANY LOGO ONLY */}
          <div>
            <label className={labelClass}>Company Logo *</label>

            <label className="border-2 border-dashed border-gray-300 rounded-xl min-h-44 flex flex-col items-center justify-center cursor-pointer hover:border-[#E87565] p-4">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Company Logo"
                  className="max-h-32 max-w-full object-contain"
                />
              ) : (
                <>
                  <Upload className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    Upload Company Logo
                  </span>
                </>
              )}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => handleLogoChange(e.target.files?.[0])}
              />
            </label>

            <p className="mt-2 text-xs text-gray-500">
              This same logo will appear on the directory card and member
              details page.
            </p>
          </div>
        </section>

        {/* SECTION 2: MEMBER DETAILS */}
        <section className={sectionClass}>
          <div>
            <h2 className="text-lg font-bold text-[#202A3A]">
              02. Member Details Page
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Information displayed on the individual profile.
            </p>
          </div>

          <div>
            <label className={labelClass}>About</label>
            <textarea
              rows={5}
              className={inputClass}
              value={form.about}
              onChange={(e) => updateField("about", e.target.value)}
              placeholder="About company..."
            />
          </div>

          {/* SERVICES */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Services</h3>
              <button
                type="button"
                onClick={addService}
                className="flex items-center gap-2 bg-[#20466C] text-white px-4 py-2 rounded-lg text-sm"
              >
                <Plus size={16} />
                Add Service
              </button>
            </div>

            {form.services.map((service, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 space-y-4"
              >
                <div className="flex justify-between">
                  <h4 className="font-semibold">Service {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <input
                  className={inputClass}
                  placeholder="Service title"
                  value={service.title}
                  onChange={(e) =>
                    updateService(index, "title", e.target.value)
                  }
                />

                <textarea
                  rows={3}
                  className={inputClass}
                  placeholder="Service description"
                  value={service.description}
                  onChange={(e) =>
                    updateService(index, "description", e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          <div>
            <label className={labelClass}>Mission</label>
            <textarea
              rows={3}
              className={inputClass}
              value={form.mission}
              onChange={(e) => updateField("mission", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Vision</label>
            <textarea
              rows={3}
              className={inputClass}
              value={form.vision}
              onChange={(e) => updateField("vision", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Quality Policy</label>
            <textarea
              rows={4}
              className={inputClass}
              value={form.qualityPolicy}
              onChange={(e) => updateField("qualityPolicy", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Quality Objectives</label>
            <textarea
              rows={5}
              className={inputClass}
              placeholder="One objective per line"
              value={form.qualityObjectives}
              onChange={(e) =>
                updateField("qualityObjectives", e.target.value)
              }
            />
          </div>

          <div>
            <label className={labelClass}>Our Commitment</label>
            <textarea
              rows={5}
              className={inputClass}
              value={form.commitment}
              onChange={(e) => updateField("commitment", e.target.value)}
            />
          </div>
        </section>

        {/* SECTION 3: AIA FAMILY MEMBER */}
        <section className={sectionClass}>
          <div>
            <h2 className="text-lg font-bold text-[#202A3A]">
              03. AIA Family Member
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Add AIA Family Member details.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>AIA Family Member Name</label>
              <input
                className={inputClass}
                value={form.familyMember.name}
                onChange={(e) =>
                  updateFamilyField("name", e.target.value)
                }
                placeholder="Enter name"
              />
            </div>

            <div>
              <label className={labelClass}>Designation</label>
              <input
                className={inputClass}
                value={form.familyMember.designation}
                onChange={(e) =>
                  updateFamilyField("designation", e.target.value)
                }
                placeholder="Enter designation"
              />
            </div>

            <div>
              <label className={labelClass}>
                College / Institute / Organization
              </label>
              <input
                className={inputClass}
                value={form.familyMember.organization}
                onChange={(e) =>
                  updateFamilyField("organization", e.target.value)
                }
                placeholder="Enter organization"
              />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                className={inputClass}
                value={form.familyMember.email}
                onChange={(e) =>
                  updateFamilyField("email", e.target.value)
                }
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className={labelClass}>Phone</label>
              <input
                className={inputClass}
                value={form.familyMember.phone}
                onChange={(e) =>
                  updateFamilyField("phone", e.target.value)
                }
                placeholder="Enter phone"
              />
            </div>

            <div>
              <label className={labelClass}>Company Website</label>
              <input
                className={inputClass}
                value={form.website}
                onChange={(e) => updateField("website", e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>
        </section>

        {/* MESSAGE */}
        {message && (
          <div
            className={`p-4 rounded-lg text-sm ${
              message.toLowerCase().includes("successfully")
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-3">
          <button
            disabled={loading}
            type="submit"
            className="bg-[#E87565] text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Saving..."
              : editingMember
                ? "Update Member"
                : "Save Member"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => onNavigate?.("all-members")}
            className="border border-gray-300 px-8 py-3 rounded-lg disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
