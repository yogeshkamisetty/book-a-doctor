"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  getAppointmentsByUser,
  type Appointment,
} from "@/services/appointmentsApi";
import { getApprovedDoctors, type Doctor } from "@/services/doctorsApi";
import { getStoredAuth } from "@/lib/authStorage";

export default function MyAppointmentsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const auth = getStoredAuth();
  const userId = auth.userId;

  const doctorById = new Map<string, Doctor>();
  for (const d of doctors) {
    const key = d.userId ?? d._id;
    if (key) doctorById.set(key, d);
  }

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        if (!userId) return;

        setLoading(true);
        setError(null);

        const [appts, docs] = await Promise.all([
          getAppointmentsByUser(userId),
          getApprovedDoctors(),
        ]);
        if (!mounted) return;

        setAppointments(appts);
        setDoctors(docs);
      } catch (err: unknown) {
        if (!mounted) return;
        const maybeAxiosError = err as {
          response?: { data?: { msg?: string } };
        };
        setError(
          maybeAxiosError.response?.data?.msg ??
            "Failed to load appointments"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [userId]);

  return (
    <ProtectedRoute allowedRoles={["user", "admin", "doctor"]}>
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        <p className="mt-2 text-sm text-gray-600">
          View your booked appointments and their current status.
        </p>

        {loading && (
          <div className="mt-6 text-sm text-gray-600">Loading...</div>
        )}

        {error && (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </div>
        )}

        {!loading && !error && appointments.length === 0 && (
          <div className="mt-6 text-sm text-gray-600">
            No appointments found.
          </div>
        )}

        <div className="mt-6 space-y-3">
          {!loading &&
            appointments.map((a) => (
              <div
                key={a._id ?? `${a.doctorId ?? ""}-${a.date}-${a.timeSlot ?? ""}`}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {a.doctorId
                        ? doctorById.get(a.doctorId)?.specialization ?? "Doctor"
                        : "Doctor"}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {a.date} at{" "}
                      <span className="font-medium">
                        {a.timeSlot ?? "—"}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      Status: {a.status ?? "pending"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}

