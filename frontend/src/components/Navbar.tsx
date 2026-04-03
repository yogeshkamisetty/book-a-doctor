"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearStoredAuth, getStoredAuth } from "@/lib/authStorage";

export default function Navbar() {
  const router = useRouter();
  const auth = getStoredAuth();
  const role = auth.role;
  const isLoggedIn = !!auth.token && !!auth.userId;

  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            op
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900">BookAdoctor</div>
            <div className="text-xs text-gray-500">Find & Book Appointments</div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link className="text-sm text-gray-700 hover:text-gray-900" href="/">
            Home
          </Link>
          <Link
            className="text-sm text-gray-700 hover:text-gray-900"
            href="/find-doctors"
          >
            Find a Doctor
          </Link>
          {isLoggedIn && (
            <Link
              className="text-sm text-gray-700 hover:text-gray-900"
              href="/appointments/my"
            >
              My Appointments
            </Link>
          )}
          {isLoggedIn && (
            <Link
              className="text-sm text-gray-700 hover:text-gray-900"
              href="/reports"
            >
              Reports
            </Link>
          )}
          {isLoggedIn && role === "admin" && (
            <Link
              className="text-sm text-gray-700 hover:text-gray-900"
              href="/admin"
            >
              Admin
            </Link>
          )}
          {isLoggedIn && role === "doctor" && (
            <Link
              className="text-sm text-gray-700 hover:text-gray-900"
              href="/doctor"
            >
              Doctor
            </Link>
          )}
          {isLoggedIn && role === "user" && (
            <Link
              className="text-sm text-gray-700 hover:text-gray-900"
              href="/doctors/apply"
            >
              Apply as Doctor
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/find-doctors"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Book Appointment
              </Link>
              <button
                type="button"
                onClick={() => {
                  clearStoredAuth();
                  router.push("/login");
                }}
                className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

