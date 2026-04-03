"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  getMyAvailability,
  getMyDoctorAppointments,
  updateMyAvailability
} from "@/services/doctorsApi";

const SLOT_OPTIONS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30"
];

export default function DoctorDashboardPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setError(null);
    try {
      const [apptRes, availRes] = await Promise.all([
        getMyDoctorAppointments(),
        getMyAvailability()
      ]);
      setAppointments(apptRes);
      setAvailability(availRes.availability || []);
    } catch (err: any) {
      setError(err?.response?.data?.msg ?? "Failed to load doctor data");
    }
  }

  useEffect(() => {
    load();
  }, []);

  function toggleSlot(slot: string) {
    setAvailability((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  }

  async function saveAvailability() {
    setSaving(true);
    setError(null);
    try {
      await updateMyAvailability(availability);
    } catch (err: any) {
      setError(err?.response?.data?.msg ?? "Failed to save availability");
    } finally {
      setSaving(false);
    }
  }

  return (
    <ProtectedRoute allowedRoles={["doctor"]}>
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          View assigned appointments and manage available time slots.
        </p>

        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="mt-8 rounded-xl border bg-white p-5">
          <h2 className="text-lg font-semibold text-gray-900">Manage Availability</h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">
            {SLOT_OPTIONS.map((slot) => {
              const active = availability.includes(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleSlot(slot)}
                  className={`rounded-md px-2 py-1.5 text-sm font-medium ${
                    active
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={saveAvailability}
            disabled={saving}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Availability"}
          </button>
        </div>

        <div className="mt-8 rounded-xl border bg-white p-5">
          <h2 className="text-lg font-semibold text-gray-900">Assigned Appointments</h2>
          <div className="mt-4 space-y-3">
            {appointments.length === 0 ? (
              <div className="text-sm text-gray-600">No assigned appointments yet.</div>
            ) : (
              appointments.map((a) => (
                <div key={a._id} className="rounded-lg border p-3">
                  <div className="text-sm font-semibold text-gray-900">
                    {a.userId?.name ?? "Patient"} ({a.userId?.email ?? "n/a"})
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {a.date} at {a.timeSlot} • Status: {a.status}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

