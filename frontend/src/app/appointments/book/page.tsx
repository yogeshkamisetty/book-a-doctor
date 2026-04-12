"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import BookingModal from "@/components/BookingModal";
import { getApprovedDoctors, type Doctor } from "@/services/doctorsApi";

const TIME_SLOTS = [
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

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function BookAppointmentInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId");

  const date = searchParams.get("date") ?? todayStr();
  const timeSlot = useMemo(() => {
    const raw = searchParams.get("timeSlot");
    return raw && TIME_SLOTS.includes(raw) ? raw : TIME_SLOTS[2];
  }, [searchParams]);

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loadingDoctor, setLoadingDoctor] = useState(false);

  useEffect(() => {
    if (!doctorId) return;
    setTimeout(() => setLoadingDoctor(true), 0);
    getApprovedDoctors()
      .then((docs) => {
        const found = docs.find((d) => d._id === doctorId) ?? null;
        setDoctor(found);
      })
      .finally(() => setLoadingDoctor(false));
  }, [doctorId]);

  const shouldOpen = !!doctor;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      {!doctorId && (
        <div className="text-sm text-gray-600">
          Missing doctorId.{" "}
          <a className="font-semibold underline" href="/find-doctors">
            Go back to doctors
          </a>
          .
        </div>
      )}
      {doctorId && loadingDoctor && (
        <div className="text-sm text-gray-600">Loading doctor...</div>
      )}
      {doctorId && !loadingDoctor && !doctor && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          Doctor not found or not approved.
        </div>
      )}

      <BookingModal
        open={shouldOpen}
        onClose={() => router.push("/find-doctors")}
        doctor={doctor}
        date={date}
        timeSlot={timeSlot}
        onBooked={() => router.push("/appointments/my")}
      />
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <ProtectedRoute allowedRoles={["user", "admin", "doctor"]}>
      <Suspense fallback={<div className="px-4 py-10 text-sm text-gray-600">Loading…</div>}>
        <BookAppointmentInner />
      </Suspense>
    </ProtectedRoute>
  );
}

