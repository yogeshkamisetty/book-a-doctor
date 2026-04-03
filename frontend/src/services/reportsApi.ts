import { api } from "./api";

export type MedicalReport = {
  _id: string;
  userId?: any;
  fileUrl: string;
  originalName: string;
  mimeType: string;
  size: number;
  createdAt: string;
};

export async function uploadReport(file: File) {
  const formData = new FormData();
  formData.append("report", file);

  const res = await api.post("/api/reports/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data as { message: string; report: MedicalReport };
}

export async function getMyReports() {
  const res = await api.get("/api/reports/my");
  return res.data as MedicalReport[];
}

