import { api } from "./api";

export type Appointment = {
  _id?: string;
  userId?: string;
  doctorId?: string;
  date: string; // backend currently stores date as string
  timeSlot?: string; // frontend uses this, backend may ignore until added
  status?: string;
};

export type BookAppointmentPayload = {
  doctorId: string;
  date: string;
  timeSlot?: string;
};

export async function bookAppointment(payload: BookAppointmentPayload) {
  const res = await api.post("/api/appointments/book", payload);
  return res.data as { message: string; appointment?: Appointment };
}

export async function getAppointmentsByUser(userId: string) {
  const res = await api.get(
    `/api/appointments?userId=${encodeURIComponent(userId)}`
  );
  return res.data as Appointment[];
}

// Backward-compatible fallback (will likely return empty results until the backend supports a default query).
export async function getMyAppointments() {
  const res = await api.get("/api/appointments");
  return res.data as Appointment[];
}

