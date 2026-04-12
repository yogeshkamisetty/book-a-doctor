// Types for User
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'doctor' | 'admin';
  profilePicture?: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

// Types for Doctor
export interface Doctor {
  id: string;
  userId: string;
  specialization: string;
  experience: number;
  consultationFee: number;
  qualifications: string[];
  availability: TimeSlot[];
  averageRating: number;
  totalReviews: number;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

// Types for Appointment
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  consultationType: 'in-person' | 'video' | 'phone';
  patient?: User;
  doctor?: Doctor;
  createdAt: string;
  updatedAt: string;
}

// Types for Report
export interface Report {
  id: string;
  patientId: string;
  appointmentId?: string;
  doctorId?: string;
  reportType: 'prescription' | 'test_result' | 'diagnosis' | 'other';
  fileName: string;
  fileUrl: string;
  description?: string;
  isPublic: boolean;
  uploadedAt: string;
}

// Types for Time Slot
export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// Auth Response Types
export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  token: string;
  user: User;
}

// Appointment Response
export interface AppointmentResponse {
  appointment: Appointment;
  message: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Filter Options
export interface DoctorFilterOptions {
  specialization?: string;
  minRating?: number;
  maxPrice?: number;
  minPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}

// Appointment Filter
export interface AppointmentFilterOptions {
  status?: string;
  page?: number;
  limit?: number;
}
