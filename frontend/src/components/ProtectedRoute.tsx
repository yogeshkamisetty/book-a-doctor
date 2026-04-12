'use client';

import { ReactNode } from 'react';
import { useAuthStore } from '@/store';
import { redirect } from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: ('user' | 'doctor' | 'admin')[];
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    redirect('/login');
  }

  if (requiredRole && user && !requiredRole.includes(user.role)) {
    redirect('/unauthorized');
  }

  return <>{children}</>;
}
