"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { applyDoctor } from "@/services/doctorsApi";
import { getStoredAuth } from "@/lib/authStorage";

export default function ApplyDoctorPage() {
  const router = useRouter();
  const auth = getStoredAuth();

  const [specialization, setSpecialization] = useState("");
  const [fees, setFees] = useState<number>(500);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!auth.userId) {
      router.replace("/login");
      return;
    }
    setLoading(true);
    try {
      await applyDoctor({
        userId: auth.userId,
        specialization: specialization.trim(),
        fees,
      });
      router.replace("/");
    } catch (err: any) {
      setError(err?.response?.data?.msg ?? "Could not apply.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-xl px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900">Apply as a Doctor</h1>
        <p className="mt-2 text-sm text-gray-600">
          Submit your specialization and fees. Admin approval is required.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Specialization
            </label>
            <input
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-blue-500"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
              placeholder="e.g. Cardiology"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Consultation Fees
            </label>
            <input
              className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-blue-500"
              type="number"
              value={fees}
              onChange={(e) => setFees(Number(e.target.value))}
              required
              min={0}
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          ) : null}

          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

