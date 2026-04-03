import { api } from "./api";
import type { Doctor } from "./doctorsApi";
import type { Appointment } from "./appointmentsApi";

export type User = {
  _id?: string;
  name: string;
  email: string;
  role: string;
};

export async function getPendingDoctors() {
  const res = await api.get("/api/admin/doctors/pending");
  return res.data as Doctor[];
}

export async function approveDoctor(id: string) {
  const res = await api.put(`/api/admin/approve/${encodeURIComponent(id)}`);
  return res.data as { message: string; doctor?: Doctor };
}

export async function rejectDoctor(id: string) {
  const res = await api.put(`/api/admin/reject/${encodeURIComponent(id)}`);
  return res.data as { message: string; doctor?: Doctor };
}

export async function getAllUsers() {
  const res = await api.get("/api/admin/users");
  return res.data as User[];
}

export async function getAllAppointments() {
  const res = await api.get("/api/admin/appointments");
  return res.data as Appointment[];
}

export async function updateUserRole(userId: string, role: string) {
  const res = await api.put(`/api/admin/users/${encodeURIComponent(userId)}/role`, {
    role
  });
  return res.data as { message: string; user: User };
}

export async function getSystemStats() {
  const res = await api.get("/api/admin/stats");
  return res.data as {
    users: number;
    doctors: number;
    approvedDoctors: number;
    appointments: number;
  };
}

