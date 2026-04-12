import { useQuery, useMutation } from '@tanstack/react-query';
import { reportService } from '@/services/report-service';
import type { AxiosError } from 'axios';

export const useUploadReport = () => {
  return useMutation({
    mutationFn: (formData: FormData) => reportService.uploadReport(formData),
    onSuccess: (data) => {
      console.log('Report uploaded:', data.message);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      console.error('Upload failed:', error.response?.data?.message || error.message);
    },
  });
};

export const useMyReports = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['my-reports', page, limit],
    queryFn: () => reportService.getMyReports(page, limit),
  });
};

export const useDeleteReport = () => {
  return useMutation({
    mutationFn: (reportId: string) => reportService.deleteReport(reportId),
    onSuccess: (data) => {
      console.log(data.message);
    },
  });
};

export const useShareReport = () => {
  return useMutation({
    mutationFn: ({
      reportId,
      doctorId,
    }: {
      reportId: string;
      doctorId: string;
    }) => reportService.shareReportWithDoctor(reportId, doctorId),
    onSuccess: (data) => {
      console.log(data.message);
    },
  });
};

export const useDownloadReport = () => {
  return useMutation({
    mutationFn: ({
      reportId,
      fileName,
    }: {
      reportId: string;
      fileName: string;
    }) => reportService.downloadReport(reportId, fileName),
  });
};
