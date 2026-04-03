"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredAuth } from "@/lib/authStorage";

export default function ProtectedRoute({
  allowedRoles,
  children,
}: {
  allowedRoles?: string[];
  children: ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const auth = getStoredAuth();
    const isLoggedIn = !!auth.token && !!auth.userId;
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }
    if (allowedRoles && allowedRoles.length > 0) {
      const role = auth.role;
      if (!role || !allowedRoles.includes(role)) {
        router.replace("/");
        return;
      }
    }
    // Avoid triggering cascading renders by setting state synchronously.
    setTimeout(() => setReady(true), 0);
  }, [allowedRoles, router]);

  if (!ready) return null;
  return <>{children}</>;
}

