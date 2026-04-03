"use client";

import { useMemo, useState } from "react";
import { Doctor } from "@/services/doctorsApi";
import { bookAppointment } from "@/services/appointmentsApi";
import { getStoredAuth } from "@/lib/authStorage";
import Link from "next/link";

export default function BookingModal({
  open,
  onClose,
  doctor,
  date,
  timeSlot,
  onBooked,
}: {
  open: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  date: string;
  timeSlot: string;
  onBooked?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const auth = getStoredAuth();

  const summary = useMemo(() => {
    if (!doctor) return null;
    return {
      specialization: doctor.specialization,
      fees: doctor.fees,
    };
  }, [doctor]);

  async function confirm() {
    if (!doctor) return;
    if (!auth.token) return;
    setLoading(true);
    try {
      await bookAppointment({
        doctorId: doctor.userId || doctor._id || "",
        date,
        timeSlot,
      });
      onBooked?.();
      onClose();
    } catch {
      // Backend errors will be shown as a simple fallback.
      alert("Could not book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Book Appointment
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Confirm your slot and submit booking.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        {!doctor ? (
          <p className="mt-4 text-sm text-gray-600">No doctor selected.</p>
        ) : (
          <>
            <div className="mt-5 rounded-lg bg-gray-50 p-4">
              <div className="text-sm font-semibold text-gray-900">
                {summary?.specialization}
              </div>
              <div className="mt-1 text-sm text-gray-600">
                Date: <span className="font-medium text-gray-900">{date}</span>
              </div>
              <div className="text-sm text-gray-600">
                Time:{" "}
                <span className="font-medium text-gray-900">{timeSlot}</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Fees:{" "}
                <span className="font-medium text-gray-900">
                  ₹{doctor.fees}
                </span>
              </div>
            </div>

            {!auth.token || !auth.userId ? (
              <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
                Please{" "}
                <Link className="font-semibold underline" href="/login">
                  login
                </Link>{" "}
                to book.
              </div>
            ) : (
              <div className="mt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirm}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

