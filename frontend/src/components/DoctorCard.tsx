import { Doctor } from "@/services/doctorsApi";

export default function DoctorCard({
  doctor,
  onBook,
}: {
  doctor: Doctor;
  onBook: () => void;
}) {
  const doctorName = doctor.userId ? `#${doctor.userId.slice(-6)}` : null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-blue-700">
            {doctor.specialization}
          </div>
          <div className="mt-1 text-lg font-bold text-gray-900">
            Dr. {doctorName ?? "Doctor"}
          </div>
        </div>
        <div className="rounded-lg bg-blue-50 px-3 py-2 text-right">
          <div className="text-xs text-gray-600">Fees</div>
          <div className="text-sm font-bold text-gray-900">₹{doctor.fees}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Available</div>
        <button
          type="button"
          onClick={onBook}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          Book
        </button>
      </div>
    </div>
  );
}

