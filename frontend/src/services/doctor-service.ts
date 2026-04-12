import apiClient from '@/lib/api-client';
import { Doctor, PaginatedResponse, DoctorFilterOptions, Appointment } from '@/types';

export const doctorService = {
  // Get all doctors with filters
  getDoctors: async (
    filters?: DoctorFilterOptions
  ): Promise<PaginatedResponse<Doctor>> => {
    const response = await apiClient.get('/doctors', { params: filters });
    return response.data;
  },

  // Get single doctor details
  getDoctorById: async (id: string): Promise<{ doctor: Doctor }> => {
    const response = await apiClient.get(`/doctors/${id}`);
    return response.data;
  },

  // Apply as doctor
  applyAsDoctor: async (data: {
    specialization: string;
    experience: number;
    consultationFee: number;
    qualifications: string[];
  }): Promise<{ doctor: Doctor; message: string }> => {
    const response = await apiClient.post('/doctors/apply', data);
    return response.data;
  },

  // Update doctor availability
  updateAvailability: async (data: {
    day: string;
    startTime: string;
    endTime: string;
  }): Promise<{ message: string }> => {
    const response = await apiClient.put('/doctors/availability', data);
    return response.data;
  },

  // Get doctor's appointments
  getDoctorAppointments: async (): Promise<{ appointments: Appointment[] }> => {
    const response = await apiClient.get('/doctors/my-appointments');
    return response.data;
  },

  // Search doctors by name or specialization
  searchDoctors: async (query: string): Promise<PaginatedResponse<Doctor>> => {
    return doctorService.getDoctors({ search: query });
  },
};
