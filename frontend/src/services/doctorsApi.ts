import { api } from "./api";

export type Doctor = {
  _id?: string;
  userId?: any;
  specialization: string;
  fees: number;
  isApproved?: boolean;
  availability?: string[];
};

export async function getApprovedDoctors(params?: { q?: string; timeSlot?: string }) {
  const res = await api.get("/api/doctors", {
    params: {
      q: params?.q || undefined,
      timeSlot: params?.timeSlot || undefined
    }
  });
  return res.data as Doctor[];
}

export type ApplyDoctorPayload = {
  specialization: string;
  fees: number;
};

export async function applyDoctor(payload: ApplyDoctorPayload) {
  const res = await api.post("/api/doctors/apply", payload);
  return res.data;
}

export async function getMyDoctorAppointments() {
  const res = await api.get("/api/doctors/me/appointments");
  return res.data as any[];
}

export async function getMyAvailability() {
  const res = await api.get("/api/doctors/me/availability");
  return res.data as { availability: string[] };
}

export async function updateMyAvailability(availability: string[]) {
  const res = await api.put("/api/doctors/me/availability", { availability });
  return res.data as { message: string; availability: string[] };
}

