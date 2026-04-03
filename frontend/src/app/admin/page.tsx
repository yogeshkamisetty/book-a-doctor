"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  approveDoctor,
  getAllUsers,
  getPendingDoctors,
  getSystemStats,
  rejectDoctor,
  updateUserRole,
  type User
} from "@/services/adminApi";
import type { Doctor } from "@/services/doctorsApi";

export default function AdminDashboardPage() {
  const [pending, setPending] = useState<Doctor[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<{
    users: number;
    doctors: number;
    approvedDoctors: number;
    appointments: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [pendingDoctors, usersRes, statsRes] = await Promise.all([
        getPendingDoctors(),
        getAllUsers(),
        getSystemStats()
      ]);
      setPending(pendingDoctors);
      setUsers(usersRes);
      setStats(statsRes);
    } catch (err: unknown) {
      const maybeAxiosError = err as {
        response?: { data?: { msg?: string } };
      };
      setError(
        maybeAxiosError.response?.data?.msg ??
          "Failed to load pending doctors"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onApprove(id: string) {
    setApprovingId(id);
    try {
      await approveDoctor(id);
      await load();
    } catch (err: unknown) {
      const maybeAxiosError = err as {
        response?: { data?: { msg?: string } };
      };
      setError(
        maybeAxiosError.response?.data?.msg ?? "Failed to approve doctor"
      );
    } finally {
      setApprovingId(null);
    }
  }

  async function onReject(id: string) {
    setRejectingId(id);
    try {
      await rejectDoctor(id);
      await load();
    } catch (err: unknown) {
      const maybeAxiosError = err as {
        response?: { data?: { msg?: string } };
      };
      setError(
        maybeAxiosError.response?.data?.msg ?? "Failed to reject doctor"
      );
    } finally {
      setRejectingId(null);
    }
  }

  async function onChangeUserRole(id: string, role: string) {
    setUpdatingUserId(id);
    try {
      await updateUserRole(id, role);
      await load();
    } catch (err: unknown) {
      const maybeAxiosError = err as {
        response?: { data?: { msg?: string } };
      };
      setError(
        maybeAxiosError.response?.data?.msg ?? "Failed to update user role"
      );
    } finally {
      setUpdatingUserId(null);
    }
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Approve/reject doctors, manage users, and monitor system.
        </p>
        {stats && (
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <div className="rounded-lg border bg-white p-3 text-sm">
              <div className="text-gray-500">Users</div>
              <div className="text-xl font-bold text-gray-900">{stats.users}</div>
            </div>
            <div className="rounded-lg border bg-white p-3 text-sm">
              <div className="text-gray-500">Doctors</div>
              <div className="text-xl font-bold text-gray-900">{stats.doctors}</div>
            </div>
            <div className="rounded-lg border bg-white p-3 text-sm">
              <div className="text-gray-500">Approved Doctors</div>
              <div className="text-xl font-bold text-gray-900">{stats.approvedDoctors}</div>
            </div>
            <div className="rounded-lg border bg-white p-3 text-sm">
              <div className="text-gray-500">Appointments</div>
              <div className="text-xl font-bold text-gray-900">{stats.appointments}</div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Pending Doctor Approvals
          </h2>

          {loading && <div className="mt-3 text-sm text-gray-600">Loading...</div>}

          {!loading && pending.length === 0 && (
            <div className="mt-3 text-sm text-gray-600">
              No pending doctors right now.
            </div>
          )}

          <div className="mt-4 space-y-3">
            {pending.map((d) => (
              <div key={d._id} className="rounded-xl border bg-white p-5">
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-semibold text-gray-900">
                    {d.userId ?? "Doctor"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {d.userId ? `User: ${d.userId}` : ""}
                  </div>
                  <div className="text-sm text-gray-600">
                    Specialization: <span className="font-medium">{d.specialization}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Fees: <span className="font-medium">₹{d.fees}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={!d._id || approvingId === d._id}
                      onClick={() => d._id && onApprove(d._id)}
                      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                      {approvingId === d._id ? "Approving..." : "Approve"}
                    </button>
                    <button
                      type="button"
                      disabled={!d._id || rejectingId === d._id}
                      onClick={() => d._id && onReject(d._id)}
                      className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-60"
                    >
                      {rejectingId === d._id ? "Rejecting..." : "Reject"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">Manage Users</h2>
          <div className="mt-4 space-y-3">
            {users.map((u) => (
              <div key={u._id} className="rounded-xl border bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{u.name}</div>
                    <div className="text-sm text-gray-600">{u.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={u.role}
                      onChange={(e) =>
                        u._id && onChangeUserRole(u._id, e.target.value)
                      }
                      disabled={!u._id || updatingUserId === u._id}
                      className="rounded-md border border-gray-200 px-2 py-1 text-sm"
                    >
                      <option value="user">user</option>
                      <option value="doctor">doctor</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

