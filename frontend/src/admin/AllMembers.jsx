
import React, { useCallback, useEffect, useMemo, useState } from "react";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Building2,
  RefreshCw,
  X,
  Users,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

import {
  getAdminMembers,
  deleteMember,
  updateMemberStatus,
} from "../services/api";

// ==========================================
// ALL MEMBERS CMS
// ==========================================

export default function AllMembers({ onNavigate }) {
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // ==========================================
  // FETCH MEMBERS
  // ==========================================

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminMembers();

      setMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch members error:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch members"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // ==========================================
  // SEARCH AND FILTER
  // ==========================================

  const filteredMembers = useMemo(() => {
    let result = [...members];

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((member) => {
        const name = member.name || "";
        const shortName = member.shortName || "";
        const category = member.category || "";

        // NEW: Email from familyMember object
        // OLD: Fallback for existing records
        const email =
          member.familyMember?.email ||
          member.email ||
          "";

        const slug = member.slug || "";

        return (
          name.toLowerCase().includes(query) ||
          shortName.toLowerCase().includes(query) ||
          category.toLowerCase().includes(query) ||
          email.toLowerCase().includes(query) ||
          slug.toLowerCase().includes(query)
        );
      });
    }

    if (filter === "active") {
      result = result.filter(
        (member) => member.isActive === true
      );
    }

    if (filter === "inactive") {
      result = result.filter(
        (member) => member.isActive === false
      );
    }

    return result;
  }, [members, search, filter]);

  // ==========================================
  // COUNTS
  // ==========================================

  const totalMembers = members.length;

  const activeMembers = members.filter(
    (member) => member.isActive === true
  ).length;

  const inactiveMembers = members.filter(
    (member) => member.isActive === false
  ).length;

  // ==========================================
  // IMAGE HELPER
  // ==========================================

  const getLogo = (member) => {
    if (typeof member.logo === "string") {
      return member.logo;
    }

    return (
      member.logo?.url ||
      member.logoUrl ||
      ""
    );
  };

  // ==========================================
  // EDIT MEMBER
  // ==========================================

  const handleEdit = (member) => {
    if (onNavigate) {
      onNavigate("add-member", member);
    }
  };

  // ==========================================
  // ADD MEMBER
  // ==========================================

  const handleAdd = () => {
    if (onNavigate) {
      onNavigate("add-member", null);
    }
  };

  // ==========================================
  // DELETE MEMBER
  // ==========================================

  const handleDelete = async (member) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${member.name}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(member._id);
      setError("");

      await deleteMember(member._id);

      setMembers((prev) =>
        prev.filter((item) => item._id !== member._id)
      );

    } catch (err) {
      console.error("Delete member error:", err);

      setError(
        err.response?.data?.message ||
        "Failed to delete member"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // TOGGLE STATUS
  // ==========================================

  const handleStatusChange = async (member) => {
    try {
      setUpdatingId(member._id);
      setError("");

      const newStatus = !member.isActive;

      await updateMemberStatus(
        member._id,
        newStatus
      );

      setMembers((prev) =>
        prev.map((item) =>
          item._id === member._id
            ? { ...item, isActive: newStatus }
            : item
        )
      );

    } catch (err) {
      console.error("Status update error:", err);

      setError(
        err.response?.data?.message ||
        "Failed to update member status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="w-full min-h-screen bg-[#F7F9FC] px-5 py-8 sm:px-8 lg:px-10">

      {/* PAGE HEADER */}

      <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202A3A] sm:text-3xl">
            All Members
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your member directory.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F27668] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#E76557]"
        >
          <Plus size={19} />
          Add New Member
        </button>

      </div>

      {/* STATISTICS */}

      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* TOTAL */}

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Members
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#202A3A]">
                {totalMembers}
              </h2>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Users size={23} />
            </div>
          </div>
        </div>

        {/* ACTIVE */}

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Active Members
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {activeMembers}
              </h2>
            </div>

            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <Eye size={23} />
            </div>
          </div>
        </div>

        {/* INACTIVE */}

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Inactive Members
              </p>

              <h2 className="mt-2 text-3xl font-bold text-orange-500">
                {inactiveMembers}
              </h2>
            </div>

            <div className="rounded-xl bg-orange-50 p-3 text-orange-500">
              <EyeOff size={23} />
            </div>
          </div>
        </div>

      </div>

      {/* SEARCH AND FILTER */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* SEARCH */}

        <div className="relative w-full lg:max-w-[450px]">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company name, category..."
            className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-10 text-sm outline-none transition focus:border-[#F27668] focus:ring-2 focus:ring-[#F27668]/10"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              <X size={17} />
            </button>
          )}

        </div>

        {/* FILTER */}

        <div className="flex flex-wrap items-center gap-2">

          {[
            { value: "all", label: "All Members" },
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ].map((item) => (

            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={`rounded-lg border px-4 py-2.5 text-xs font-semibold transition ${
                filter === item.value
                  ? "border-[#F27668] bg-[#F27668] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#F27668]"
              }`}
            >
              {item.label}
            </button>

          ))}

          <button
            type="button"
            onClick={fetchMembers}
            disabled={loading}
            title="Refresh members"
            className="rounded-lg border border-gray-200 bg-white p-2.5 text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
          </button>

        </div>

      </div>

      {/* ERROR MESSAGE */}

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">

          <AlertCircle size={19} className="mt-0.5 shrink-0" />

          <div className="flex-1">
            <p className="font-semibold">
              Something went wrong
            </p>

            <p className="mt-1">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setError("")}
            className="text-red-400 hover:text-red-700"
          >
            <X size={17} />
          </button>

        </div>
      )}

      {/* MEMBERS TABLE */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        {/* TABLE HEADER */}

        <div className="flex flex-col justify-between gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center">

          <div>
            <h3 className="font-bold text-[#202A3A]">
              Member Directory
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Showing {filteredMembers.length} of {totalMembers} members
            </p>
          </div>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="flex min-h-[250px] flex-col items-center justify-center gap-3">

            <RefreshCw
              size={28}
              className="animate-spin text-[#F27668]"
            />

            <p className="text-sm text-gray-500">
              Loading members...
            </p>

          </div>

        ) : filteredMembers.length === 0 ? (

          /* EMPTY STATE */

          <div className="flex min-h-[250px] flex-col items-center justify-center px-5 text-center">

            <div className="mb-4 rounded-full bg-gray-100 p-5">
              <Building2
                size={32}
                className="text-gray-400"
              />
            </div>

            <h3 className="text-base font-bold text-[#202A3A]">
              {search || filter !== "all"
                ? "No Matching Members"
                : "No Members Found"}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {search || filter !== "all"
                ? "Try changing your search or filter."
                : "Add your first member to get started."}
            </p>

            {!search && filter === "all" && (
              <button
                type="button"
                onClick={handleAdd}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#F27668] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E76557]"
              >
                <Plus size={17} />
                Add First Member
              </button>
            )}

          </div>

        ) : (

          /* MEMBERS TABLE */

          <div className="w-full overflow-x-auto">

            <table className="w-full min-w-[850px] text-left">

              <thead className="bg-gray-50">
                <tr className="border-b border-gray-100">

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Company
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Category
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Email
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredMembers.map((member) => {

                  const logo = getLogo(member);

                  // NEW FAMILY MEMBER EMAIL + OLD EMAIL FALLBACK
                  const memberEmail =
                    member.familyMember?.email ||
                    member.email ||
                    "";

                  return (
                    <tr
                      key={member._id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* COMPANY */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white p-1">

                            {logo ? (
                              <img
                                src={logo}
                                alt={member.name || "Member"}
                                className="h-full w-full object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <Building2
                                size={22}
                                className="text-gray-400"
                              />
                            )}

                          </div>

                          <div className="min-w-0">

                            <p className="max-w-[220px] truncate text-sm font-bold text-[#202A3A]">
                              {member.name || "Unnamed Company"}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {member.shortName || member.slug || "—"}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-600">
                          {member.category || "—"}
                        </span>
                      </td>

                      {/* EMAIL */}

                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-600">
                          {memberEmail || "—"}
                        </span>
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <button
                          type="button"
                          disabled={updatingId === member._id}
                          onClick={() => handleStatusChange(member)}
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:cursor-wait disabled:opacity-50 ${
                            member.isActive
                              ? "bg-green-50 text-green-700 hover:bg-green-100"
                              : "bg-red-50 text-red-600 hover:bg-red-100"
                          }`}
                        >

                          <span
                            className={`h-2 w-2 rounded-full ${
                              member.isActive
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />

                          {updatingId === member._id
                            ? "Updating..."
                            : member.isActive
                            ? "Active"
                            : "Inactive"}

                        </button>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">

                        <div className="flex items-center justify-center gap-2">

                          {/* EDIT */}

                          <button
                            type="button"
                            onClick={() => handleEdit(member)}
                            title="Edit Member"
                            className="rounded-lg border border-gray-200 p-2 text-blue-600 transition hover:border-blue-200 hover:bg-blue-50"
                          >
                            <Pencil size={16} />
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            disabled={deletingId === member._id}
                            onClick={() => handleDelete(member)}
                            title="Delete Member"
                            className="rounded-lg border border-gray-200 p-2 text-red-500 transition hover:border-red-200 hover:bg-red-50 disabled:opacity-50"
                          >
                            {deletingId === member._id ? (
                              <RefreshCw
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        )}

        {/* FOOTER */}

        {!loading && members.length > 0 && (
          <div className="flex flex-col justify-between gap-2 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center">

            <p className="text-xs text-gray-500">
              Total members: {totalMembers}
            </p>

            <p className="text-xs text-gray-400">
              Active: {activeMembers} | Inactive: {inactiveMembers}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}
