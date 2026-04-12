"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getMyReports, uploadReport, type MedicalReport } from "@/services/reportsApi";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ReportsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reports, setReports] = useState<MedicalReport[]>([]);

  async function loadReports() {
    try {
      const res = await getMyReports();
      setReports(res);
    } catch (err: any) {
      setError(err?.response?.data?.msg ?? "Failed to load reports");
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  async function onUpload(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!file) {
      setError("Please choose a file first");
      return;
    }

    setLoading(true);
    try {
      await uploadReport(file);
      setFile(null);
      await loadReports();
    } catch (err: any) {
      setError(err?.response?.data?.msg ?? "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute allowedRoles={["user", "doctor", "admin"]}>
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900">Medical Reports</h1>
        <p className="mt-2 text-sm text-gray-600">
          Upload and access your lab reports or prescription files (PDF/JPG/PNG).
        </p>

        <form onSubmit={onUpload} className="mt-6 rounded-xl border bg-white p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="text-sm"
            />
            <button
              disabled={loading}
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Upload Report"}
            </button>
          </div>
          {error && (
            <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </div>
          )}
        </form>

        <div className="mt-8 space-y-3">
          {reports.length === 0 ? (
            <div className="text-sm text-gray-600">No reports uploaded yet.</div>
          ) : (
            reports.map((r) => (
              <div key={r._id} className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{r.originalName}</div>
                    <div className="text-xs text-gray-600">
                      {r.mimeType} • {formatSize(r.size)}
                    </div>
                  </div>
                  <a
                    href={`${API_BASE_URL}${r.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    View
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

