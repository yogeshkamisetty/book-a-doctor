import apiClient from '@/lib/api-client';
import { LoginResponse, RegisterResponse, User } from '@/types';

export const authService = {
  // Register new user
  register: async (data: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }): Promise<RegisterResponse> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  // Login user
  login: async (data: {
    email: string;
    password: string;
  }): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  // Get current user profile
  getProfile: async (): Promise<{ user: User }> => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  // Logout (frontend only - token cleared from store)
  logout: (): void => {
    // Backend doesn't need logout call - just clear local storage
    localStorage.removeItem('auth-storage');
  },
};
