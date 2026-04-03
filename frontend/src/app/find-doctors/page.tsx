"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import DoctorCard from "@/components/DoctorCard";
import BookingModal from "@/components/BookingModal";
import DoctorSearchBar from "@/components/DoctorSearchBar";
import { Doctor, getApprovedDoctors } from "@/services/doctorsApi";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function todayStr() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function FindDoctorsInner() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const dateParam = params.get("date") ?? "";
  const timeSlot = params.get("timeSlot") ?? "09:00";

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookOpen, setBookOpen] = useState(false);

  const safeDate = dateParam || todayStr();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getApprovedDoctors();
        if (!alive) return;
        setDoctors(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const query = normalize(q);
    if (!query) return doctors;
    return doctors.filter((d) => {
      return (
        normalize(d.specialization).includes(query) ||
        normalize(d.userId ?? "").includes(query) ||
        normalize(d._id ?? "").includes(query)
      );
    });
  }, [doctors, q]);

  return (
    <div className="bg-white">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Find Doctors</h1>
          <p className="mt-2 text-sm text-gray-600">
            Browse approved doctors and book an available slot.
          </p>
        </div>
        <DoctorSearchBar />
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
          <div>
            <span className="font-semibold">Date:</span> {safeDate}
          </div>
          <div>
            <span className="font-semibold">Time:</span> {timeSlot}
          </div>
        </div>

        {loading ? (
          <div className="mt-8 text-sm text-gray-600">Loading doctors...</div>
        ) : filtered.length === 0 ? (
          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
            No doctors matched your search.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filtered.map((doctor) => (
              <DoctorCard
                key={doctor._id ?? doctor.specialization}
                doctor={doctor}
                onBook={() => {
                  setSelectedDoctor(doctor);
                  setBookOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <BookingModal
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        doctor={selectedDoctor}
        date={safeDate}
        timeSlot={timeSlot}
      />
    </div>
  );
}

export default function FindDoctorsPage() {
  return (
    <Suspense
      fallback={<div className="mx-auto max-w-6xl px-6 py-10 text-sm text-gray-600">Loading…</div>}
    >
      <FindDoctorsInner />
    </Suspense>
  );
}

