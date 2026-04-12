import apiClient from '@/lib/api-client';
import { User, Doctor, PaginatedResponse } from '@/types';

export const adminService = {
  // Get pending doctor applications
  getPendingDoctors: async (): Promise<{ doctors: Doctor[] }> => {
    const response = await apiClient.get('/admin/pending-doctors');
    return response.data;
  },

  // Approve doctor application
  approveDoctor: async (doctorId: string): Promise<{ message: string }> => {
    const response = await apiClient.post(`/admin/approve-doctor/${doctorId}`);
    return response.data;
  },

  // Reject doctor application
  rejectDoctor: async (doctorId: string): Promise<{ message: string }> => {
    const response = await apiClient.post(`/admin/reject-doctor/${doctorId}`);
    return response.data;
  },

  // Get all users
  getAllUsers: async (page = 1, limit = 20): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get('/admin/users', { params: { page, limit } });
    return response.data;
  },

  // Get dashboard statistics
  getDashboardStats: async (): Promise<{
    totalUsers: number;
    totalDoctors: number;
    totalAppointments: number;
    totalRevenue: number;
    appointmentsByStatus: Record<string, number>;
  }> => {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },

  // Ban/unban user
  toggleUserStatus: async (userId: string): Promise<{ message: string }> => {
    const response = await apiClient.put(`/admin/users/${userId}/status`);
    return response.data;
  },
};
