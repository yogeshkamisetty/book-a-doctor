"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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
  "15:30",
];

export default function DoctorSearchBar() {
  const router = useRouter();
  const [date, setDate] = useState<string>(() => {
    // Default to today (YYYY-MM-DD)
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  });
  const [timeSlot, setTimeSlot] = useState<string>(TIME_SLOTS[2]);
  const [query, setQuery] = useState<string>("");

  const placeholder = useMemo(
    () => "Search doctors, name, specialist",
    []
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (timeSlot) params.set("timeSlot", timeSlot);
    if (query.trim()) params.set("q", query.trim());
    router.push(`/find-doctors?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-6xl -translate-y-8 px-6"
    >
      <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-md md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-2 md:min-w-[220px]">
          <label className="text-xs font-semibold text-gray-700">Select Date & Time</label>
          <div className="flex gap-3">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
              aria-label="Date"
            />
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
              aria-label="Time slot"
            >
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 md:min-w-[320px]">
          <label className="text-xs font-semibold text-gray-700">Search</label>
          <div className="flex gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 md:mt-6 md:w-[120px]"
        >
          Search
        </button>
      </div>
    </form>
  );
}

