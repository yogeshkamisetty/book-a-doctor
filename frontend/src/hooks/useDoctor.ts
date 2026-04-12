import { useQuery, useMutation } from '@tanstack/react-query';
import { doctorService } from '@/services/doctor-service';
import { DoctorFilterOptions } from '@/types';
import type { AxiosError } from 'axios';

export const useDoctors = (filters?: DoctorFilterOptions) => {
  return useQuery({
    queryKey: ['doctors', filters],
    queryFn: () => doctorService.getDoctors(filters),
  });
};

export const useDoctorById = (id: string) => {
  return useQuery({
    queryKey: ['doctor', id],
    queryFn: () => doctorService.getDoctorById(id),
    enabled: !!id,
  });
};

export const useApplyAsDoctor = () => {
  return useMutation({
    mutationFn: (data: {
      specialization: string;
      experience: number;
      consultationFee: number;
      qualifications: string[];
    }) => doctorService.applyAsDoctor(data),
    onSuccess: (data) => {
      console.log('Doctor application submitted:', data.message);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error('Failed to apply:', error.response?.data?.message || error.message);
    },
  });
};

export const useUpdateAvailability = () => {
  return useMutation({
    mutationFn: (data: {
      day: string;
      startTime: string;
      endTime: string;
    }) => doctorService.updateAvailability(data),
    onSuccess: (data) => {
      console.log(data.message);
    },
  });
};

export const useDoctorAppointments = () => {
  return useQuery({
    queryKey: ['doctor-appointments'],
    queryFn: () => doctorService.getDoctorAppointments(),
  });
};

export const useSearchDoctors = (query: string) => {
  return useQuery({
    queryKey: ['search-doctors', query],
    queryFn: () => doctorService.searchDoctors(query),
    enabled: query.length > 0,
  });
};
