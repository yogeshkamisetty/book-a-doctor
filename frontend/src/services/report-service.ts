import apiClient from '@/lib/api-client';
import { Report, PaginatedResponse } from '@/types';

export const reportService = {
  // Upload medical report
  uploadReport: async (formData: FormData): Promise<{ report: Report; message: string }> => {
    const response = await apiClient.post('/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get user's reports
  getMyReports: async (page = 1, limit = 10): Promise<PaginatedResponse<Report>> => {
    const response = await apiClient.get('/reports', { params: { page, limit } });
    return response.data;
  },

  // Delete report
  deleteReport: async (reportId: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/reports/${reportId}`);
    return response.data;
  },

  // Share report with doctor
  shareReportWithDoctor: async (
    reportId: string,
    doctorId: string
  ): Promise<{ message: string }> => {
    const response = await apiClient.put(`/reports/${reportId}/share`, { doctorId });
    return response.data;
  },

  // Download report
  downloadReport: async (reportId: string, fileName: string): Promise<void> => {
    const response = await apiClient.get(`/reports/${reportId}/download`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link?.parentNode?.removeChild(link);
  },
};
