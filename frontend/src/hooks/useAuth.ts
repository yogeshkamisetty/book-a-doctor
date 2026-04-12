import { useQuery, useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth-service';
import { useAuthStore } from '@/store';
import { LoginResponse, RegisterResponse } from '@/types';

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      authService.login(credentials),
    onSuccess: (data: LoginResponse) => {
      setToken(data.token);
      setUser(data.user);
    },
    onError: (error: any) => {
      console.error('Login failed:', error.response?.data?.message || error.message);
    },
  });
};

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      password: string;
      phone: string;
    }) => authService.register(data),
    onSuccess: (data: RegisterResponse) => {
      setToken(data.token);
      setUser(data.user);
    },
    onError: (error: any) => {
      console.error('Registration failed:', error.response?.data?.message || error.message);
    },
  });
};

export const useProfile = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ['profile'],
    queryFn: () => authService.getProfile(),
    enabled: !!token,
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);

  return () => {
    authService.logout();
    logout();
  };
};
