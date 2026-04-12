import apiClient from '@/lib/api-client';
import { Appointment, PaginatedResponse, AppointmentFilterOptions } from '@/types';

export const appointmentService = {
  // Book new appointment
  bookAppointment: async (data: {
    doctorId: string;
    date: string;
    timeSlot: string;
    reason: string;
    consultationType: 'in-person' | 'video' | 'phone';
  }): Promise<{ appointment: Appointment; message: string }> => {
    const response = await apiClient.post('/appointments', data);
    return response.data;
  },

  // Get user's appointments
  getMyAppointments: async (
    filters?: AppointmentFilterOptions
  ): Promise<PaginatedResponse<Appointment>> => {
    const response = await apiClient.get('/appointments', { params: filters });
    return response.data;
  },

  // Cancel appointment
  cancelAppointment: async (appointmentId: string): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/appointments/${appointmentId}`);
    return response.data;
  },

  // Update appointment status (doctor only)
  updateAppointmentStatus: async (
    appointmentId: string,
    data: {
      status: 'completed' | 'cancelled';
      notes?: string;
    }
  ): Promise<{ message: string }> => {
    const response = await apiClient.put(`/appointments/${appointmentId}`, data);
    return response.data;
  },

  // Reschedule appointment
  rescheduleAppointment: async (
    appointmentId: string,
    data: {
      newDate: string;
      newTimeSlot: string;
    }
  ): Promise<{ message: string }> => {
    const response = await apiClient.put(`/appointments/${appointmentId}/reschedule`, data);
    return response.data;
  },
};
