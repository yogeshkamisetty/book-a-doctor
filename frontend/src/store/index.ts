import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'doctor' | 'admin';
  phone?: string;
  profilePicture?: string;
  isApproved?: boolean;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

interface UIStore {
  darkMode: boolean;
  sidebarOpen: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  darkMode: false,
  sidebarOpen: true,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

interface FilterStore {
  specialization: string;
  minRating: number;
  priceRange: [number, number];
  availability: string;
  searchQuery: string;
  setSpecialization: (spec: string) => void;
  setMinRating: (rating: number) => void;
  setPriceRange: (range: [number, number]) => void;
  setAvailability: (avail: string) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  specialization: '',
  minRating: 0,
  priceRange: [0, 5000],
  availability: '',
  searchQuery: '',
  setSpecialization: (spec) => set({ specialization: spec }),
  setMinRating: (rating) => set({ minRating: rating }),
  setPriceRange: (range) => set({ priceRange: range }),
  setAvailability: (avail) => set({ availability: avail }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetFilters: () =>
    set({
      specialization: '',
      minRating: 0,
      priceRange: [0, 5000],
      availability: '',
      searchQuery: '',
    }),
}));
