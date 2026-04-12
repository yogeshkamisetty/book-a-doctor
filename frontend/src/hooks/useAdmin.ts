import { useQuery, useMutation } from '@tanstack/react-query';
import { adminService } from '@/services/admin-service';

export const usePendingDoctors = () => {
  return useQuery({
    queryKey: ['pending-doctors'],
    queryFn: () => adminService.getPendingDoctors(),
  });
};

export const useApproveDoctor = () => {
  return useMutation({
    mutationFn: (doctorId: string) => adminService.approveDoctor(doctorId),
    onSuccess: (data) => {
      console.log(data.message);
    },
  });
};

export const useRejectDoctor = () => {
  return useMutation({
    mutationFn: (doctorId: string) => adminService.rejectDoctor(doctorId),
    onSuccess: (data) => {
      console.log(data.message);
    },
  });
};

export const useAllUsers = (page = 1, limit = 20) => {
  return useQuery({
    queryKey: ['all-users', page, limit],
    queryFn: () => adminService.getAllUsers(page, limit),
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => adminService.getDashboardStats(),
  });
};

export const useToggleUserStatus = () => {
  return useMutation({
    mutationFn: (userId: string) => adminService.toggleUserStatus(userId),
    onSuccess: (data) => {
      console.log(data.message);
    },
  });
};
