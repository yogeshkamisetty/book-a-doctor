import { api } from "./api";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  _id: string;
  name?: string;
  email?: string;
  role?: string;
  password?: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export async function register(payload: RegisterPayload) {
  const res = await api.post("/api/auth/register", payload);
  return res.data as { message: string };
}

export async function login(payload: LoginPayload) {
  const res = await api.post("/api/auth/login", payload);
  return res.data as LoginResponse;
}

