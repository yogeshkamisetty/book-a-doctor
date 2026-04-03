"use client";

export type StoredAuth = {
  token: string | null;
  role: string | null;
  userId: string | null;
};

const TOKEN_KEY = "auth_token";
const ROLE_KEY = "auth_role";
const USER_ID_KEY = "auth_userId";

export function getStoredAuth(): StoredAuth {
  if (typeof window === "undefined") return { token: null, role: null, userId: null };
  return {
    token: window.localStorage.getItem(TOKEN_KEY),
    role: window.localStorage.getItem(ROLE_KEY),
    userId: window.localStorage.getItem(USER_ID_KEY),
  };
}

export function setStoredAuth(params: { token: string; role?: string | null; userId?: string | null }) {
  window.localStorage.setItem(TOKEN_KEY, params.token);
  if (params.role) window.localStorage.setItem(ROLE_KEY, params.role);
  if (params.userId) window.localStorage.setItem(USER_ID_KEY, params.userId);
}

export function clearStoredAuth() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(ROLE_KEY);
  window.localStorage.removeItem(USER_ID_KEY);
}

