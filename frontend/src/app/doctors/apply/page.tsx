"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { applyDoctor } from "@/services/doctorsApi";

export default function ApplyDoctorPage() {
  const router = useRouter();
  const [specialization, setSpecialization] = useState("");
  const [fees, setFees] = useState<number>(500);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!specialization.trim() || Number.isNaN(fees)) {
      setError("Specialization and fees are required");
      return;
    }
    setLoading(true);
    try {
      await applyDoctor({
        specialization,
        fees
      });
      setSuccess("Application submitted. Admin will approve your profile.");
      setTimeout(() => router.push("/home"), 800);
    } catch (err: unknown) {
      const maybeAxiosError = err as {
        response?: { data?: { msg?: string } };
      };
      setError(
        maybeAxiosError.response?.data?.msg ?? "Failed to submit application"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <div className="mx-auto w-full max-w-md px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900">Apply as Doctor</h1>
        <p className="mt-2 text-sm text-gray-600">
          Fill in your specialization and fees. Admin approval is required.
        </p>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800">
              Specialization
            </label>
            <input
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800">Fees</label>
            <input
              value={fees}
              onChange={(e) => {
                const v = e.target.value;
                setFees(Number(v));
              }}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
              type="number"
              min={0}
              step={1}
              required
            />
          </div>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              {success}
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}

