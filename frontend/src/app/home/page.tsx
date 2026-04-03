import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function HomePage() {
  return (
    <ProtectedRoute allowedRoles={["user", "doctor", "admin"]}>
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <div className="rounded-xl border bg-white p-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Book appointments with approved doctors, manage your bookings, and
            (for admins) approve new doctors.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link
              href="/find-doctors"
              className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Find doctors & book
            </Link>
            <Link
              href="/appointments/my"
              className="rounded-lg border px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              My appointments
            </Link>
            <Link
              href="/doctors/apply"
              className="rounded-lg border px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              Apply as a doctor
            </Link>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            Slot-based double-booking is enforced on the backend.
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

