import Link from "next/link";

export default function DoctorsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
      <p className="mt-2 text-sm text-gray-600">
        Browse approved doctors and book available appointment slots.
      </p>
      <div className="mt-6">
        <Link
          href="/find-doctors"
          className="inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Go to doctor search
        </Link>
      </div>
    </div>
  );
}

