"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getAppointmentsByUser, Appointment } from "@/services/appointmentsApi";
import { Doctor, getApprovedDoctors } from "@/services/doctorsApi";
import { getStoredAuth } from "@/lib/authStorage";

export default function MyAppointmentsPage() {
  const router = useRouter();
  const auth = getStoredAuth();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.userId || !auth.token) {
      router.replace("/login");
      return;
    }

    let alive = true;
    (async () => {
      try {
        const [appts, docs] = await Promise.all([
          getAppointmentsByUser(auth.userId!),
          getApprovedDoctors(),
        ]);
        if (!alive) return;
        setAppointments(appts);
        setDoctors(docs);
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [auth.token, auth.userId, router]);

  const doctorById = useMemo(() => {
    const map = new Map<string, Doctor>();
    for (const d of doctors) {
      const key = d.userId ?? d._id;
      if (key) map.set(key, d);
    }
    return map;
  }, [doctors]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        <p className="mt-2 text-sm text-gray-600">
          View your booked doctor slots.
        </p>

        {loading ? (
          <div className="mt-8 text-sm text-gray-600">Loading...</div>
        ) : appointments.length === 0 ? (
          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
            No appointments found. Book a doctor from{" "}
            <a className="font-semibold text-blue-700" href="/find-doctors">
              Find a Doctor
            </a>
            .
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {appointments
              .slice()
              .reverse()
              .map((a) => {
                const doctor = a.doctorId
                  ? doctorById.get(a.doctorId)
                  : undefined;
                return (
                  <div
                    key={a._id ?? `${a.userId}-${a.doctorId}-${a.date}`}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="text-sm font-semibold text-blue-700">
                          {doctor?.specialization ?? "Doctor"}
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          Date: <span className="font-medium">{a.date}</span>
                          {"  "}
                          Time:{" "}
                          <span className="font-medium">
                            {a.timeSlot ?? "—"}
                          </span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700">
                        Status:{" "}
                        <span className="font-semibold text-gray-900">
                          {a.status ?? "pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

