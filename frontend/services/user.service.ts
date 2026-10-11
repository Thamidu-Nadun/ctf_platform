import { apiFetch } from "@/lib/auth";

export type UserRole = "admin" | "user";
export type User = { id: string; name: string; email: string; role: UserRole };
export type RegisterInput = { name: string; email: string; password: string };
export type LoginInput = { email: string; password: string };
export type LoginResponse = { token: string };

export const getUsers = () => apiFetch<User[]>("/user");

export const register = (user: RegisterInput) =>
  apiFetch<User[]>("/user", {
    method: "POST",
    body: JSON.stringify(user),
  });

export const login = (credentials: LoginInput) =>
  apiFetch<LoginResponse>("/user/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
