import { useQuery, useMutation } from '@tanstack/react-query';
import { appointmentService } from '@/services/appointment-service';
import { AppointmentFilterOptions } from '@/types';

export const useBookAppointment = () => {
  return useMutation({
    mutationFn: (data: {
      doctorId: string;
      date: string;
      timeSlot: string;
      reason: string;
      consultationType: 'in-person' | 'video' | 'phone';
    }) => appointmentService.bookAppointment(data),
    onSuccess: (data) => {
      console.log('Appointment booked:', data.message);
    },
    onError: (error: any) => {
      console.error('Booking failed:', error.response?.data?.message || error.message);
    },
  });
};

export const useMyAppointments = (filters?: AppointmentFilterOptions) => {
  return useQuery({
    queryKey: ['my-appointments', filters],
    queryFn: () => appointmentService.getMyAppointments(filters),
  });
};

export const useCancelAppointment = () => {
  return useMutation({
    mutationFn: (appointmentId: string) =>
      appointmentService.cancelAppointment(appointmentId),
    onSuccess: (data) => {
      console.log(data.message);
    },
    onError: (error: any) => {
      console.error('Cancellation failed:', error.response?.data?.message);
    },
  });
};

export const useUpdateAppointmentStatus = () => {
  return useMutation({
    mutationFn: ({
      appointmentId,
      data,
    }: {
      appointmentId: string;
      data: { status: 'completed' | 'cancelled'; notes?: string };
    }) => appointmentService.updateAppointmentStatus(appointmentId, data),
    onSuccess: (data) => {
      console.log(data.message);
    },
  });
};

export const useRescheduleAppointment = () => {
  return useMutation({
    mutationFn: ({
      appointmentId,
      newDate,
      newTimeSlot,
    }: {
      appointmentId: string;
      newDate: string;
      newTimeSlot: string;
    }) =>
      appointmentService.rescheduleAppointment(appointmentId, {
        newDate,
        newTimeSlot,
      }),
    onSuccess: (data) => {
      console.log(data.message);
    },
  });
};
