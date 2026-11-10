
import React, { useCallback, useEffect, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  X,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Building2,
  CalendarDays,
  FileText,
  Loader2,
  Filter,
  CheckCircle2,
  Clock,
  Inbox,
} from "lucide-react";
import { adminRequest } from "../services/adminAuth.js";

const FORM_TYPES = [
  { value: "contact-us", label: "Contact Us" },
  { value: "general-inquiry", label: "General Inquiry" },
  { value: "aia-membership", label: "AIA Membership" },
  { value: "system-integrator", label: "System Integrator" },
  { value: "technology-provider", label: "Technology Provider" },
];

const STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
];

const getFormLabel = (type) =>
  FORM_TYPES.find((item) => item.value === type)?.label || type || "Unknown";

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusStyle = (status) => {
  switch (status) {
    case "contacted":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "closed":
      return "bg-green-50 text-green-700 border-green-200";
    default:
      return "bg-orange-50 text-orange-700 border-orange-200";
  }
};

const formatValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "—";
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
};

const getDisplayName = (submission) => {
  const data = submission?.data || {};

  return (
    data.fullName ||
    data.name ||
    data.companyName ||
    data.email ||
    "Unnamed Submission"
  );
};

export default function FormSubmissionsCMS() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [formType, setFormType] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams({
        page: String(page),
        limit: "10",
      });

      if (search.trim()) params.set("search", search.trim());
      if (formType) params.set("formType", formType);
      if (status) params.set("status", status);

      const result = await adminRequest(
        `/form-submissions?${params.toString()}`
      );

      setSubmissions(result.data || []);
      setTotal(result.total ?? result.count ?? 0);
      setTotalPages(result.totalPages || 1);
    } catch (err) {
      setError(err.message || "Unable to load form submissions.");
    } finally {
      setLoading(false);
    }
  }, [page, search, formType, status]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const openSubmission = async (id) => {
    try {
      setDetailLoading(true);
      setSelectedSubmission(null);

      const result = await adminRequest(`/form-submissions/${id}`);

      setSelectedSubmission(result.data);

      // Refresh list because opening a submission may mark it as read.
      fetchSubmissions();
    } catch (err) {
      setError(err.message || "Unable to load submission details.");
    } finally {
      setDetailLoading(false);
    }
  };

  const updateStatus = async (id, nextStatus) => {
    try {
      setActionLoading(true);

      await adminRequest(`/form-submissions/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });

      if (selectedSubmission?._id === id) {
        setSelectedSubmission((previous) => ({
          ...previous,
          status: nextStatus,
        }));
      }

      await fetchSubmissions();
    } catch (err) {
      setError(err.message || "Unable to update submission status.");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteSubmission = async (submission) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the submission from ${getDisplayName(
        submission
      )}? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);

      await adminRequest(`/form-submissions/${submission._id}`, {
        method: "DELETE",
      });

      if (selectedSubmission?._id === submission._id) {
        setSelectedSubmission(null);
      }

      await fetchSubmissions();
    } catch (err) {
      setError(err.message || "Unable to delete submission.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1);
  };

  const data = selectedSubmission?.data || {};

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#E25238]/10 text-[#E25238] flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                Form Submissions
              </h2>
              <p className="text-sm text-slate-500">
                Manage all website inquiries in one place.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchSubmissions}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw
            className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Total count */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">Filtered Submissions</p>
          <p className="text-3xl font-black text-slate-800 mt-2">
            {total}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">Current Page</p>
          <p className="text-3xl font-black text-slate-800 mt-2">
            {page} <span className="text-base text-slate-400">/ {totalPages}</span>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-sm text-slate-500">Forms Supported</p>
          <p className="text-3xl font-black text-slate-800 mt-2">5</p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(e) => handleFilterChange(setSearch, e.target.value)}
              placeholder="Search name, email, company..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#E25238]"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

            <select
              value={formType}
              onChange={(e) =>
                handleFilterChange(setFormType, e.target.value)
              }
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#E25238] bg-white"
            >
              <option value="">All Form Types</option>
              {FORM_TYPES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <select
            value={status}
            onChange={(e) =>
              handleFilterChange(setStatus, e.target.value)
            }
            className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#E25238] bg-white"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-start justify-between gap-3">
          <span>{error}</span>
          <button type="button" onClick={() => setError("")}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Submissions table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">All Submissions</h3>
          <span className="text-xs text-slate-500">
            {total} result(s)
          </span>
        </div>

        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#E25238] mb-3" />
            <p className="text-sm">Loading submissions...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center px-4">
            <Inbox className="w-10 h-10 text-slate-300 mb-3" />
            <h3 className="font-bold text-slate-700">
              No submissions found
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Website form submissions will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-slate-50">
                  <tr className="text-[11px] uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4 font-bold">Submitted By</th>
                    <th className="px-5 py-4 font-bold">Form Type</th>
                    <th className="px-5 py-4 font-bold">Company</th>
                    <th className="px-5 py-4 font-bold">Date</th>
                    <th className="px-5 py-4 font-bold">Status</th>
                    <th className="px-5 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {submissions.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-50/70 transition"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {!item.isRead && (
                            <span
                              className="w-2 h-2 rounded-full bg-[#E25238]"
                              title="Unread"
                            />
                          )}

                          <div>
                            <p className="text-sm font-bold text-slate-800">
                              {getDisplayName(item)}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {item.data?.email || "No email"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                          {getFormLabel(item.formType)}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {item.data?.companyName || "—"}
                      </td>

                      <td className="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-semibold capitalize ${getStatusStyle(
                            item.status
                          )}`}
                        >
                          {item.status || "new"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openSubmission(item._id)}
                            title="View details"
                            className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteSubmission(item)}
                            disabled={actionLoading}
                            title="Delete submission"
                            className="w-9 h-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Page {page} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((previous) => previous - 1)}
                  className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center disabled:opacity-40 hover:bg-slate-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((previous) => previous + 1)}
                  className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center disabled:opacity-40 hover:bg-slate-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Submission details modal */}
      {(selectedSubmission || detailLoading) && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedSubmission(null);
            }
          }}
        >
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col">
            <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-800">
                  Submission Details
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Complete website form response
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {detailLoading ? (
              <div className="py-16 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#E25238]" />
              </div>
            ) : selectedSubmission ? (
              <>
                <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <span className="text-xs text-slate-500">
                        Form Category
                      </span>
                      <h4 className="text-lg font-bold text-slate-800 mt-1">
                        {getFormLabel(selectedSubmission.formType)}
                      </h4>
                    </div>

                    <span
                      className={`inline-flex w-fit px-3 py-1.5 rounded-full border text-xs font-bold capitalize ${getStatusStyle(
                        selectedSubmission.status
                      )}`}
                    >
                      {selectedSubmission.status || "new"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-slate-50">
                      <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <CalendarDays className="w-4 h-4" />
                        <span className="text-xs font-semibold">
                          Submitted On
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">
                        {formatDate(selectedSubmission.createdAt)}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50">
                      <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-xs font-semibold">
                          Source Page
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-700 break-all">
                        {selectedSubmission.sourcePage || "—"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 mb-3">
                      Submitted Information
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(data).map(([key, value]) => (
                        <div
                          key={key}
                          className="p-3.5 rounded-xl border border-slate-200 min-w-0"
                        >
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                            {key.replace(/([A-Z])/g, " $1")}
                          </p>

                          <p className="text-sm text-slate-700 font-medium break-words whitespace-pre-wrap">
                            {formatValue(value)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:px-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => deleteSubmission(selectedSubmission)}
                    disabled={actionLoading}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>

                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        disabled={
                          actionLoading ||
                          selectedSubmission.status === item.value
                        }
                        onClick={() =>
                          updateStatus(
                            selectedSubmission._id,
                            item.value
                          )
                        }
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition disabled:opacity-40 ${
                          selectedSubmission.status === item.value
                            ? "bg-slate-200 text-slate-500 border-slate-200"
                            : "bg-white text-slate-700 border-slate-200 hover:border-[#E25238] hover:text-[#E25238]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
