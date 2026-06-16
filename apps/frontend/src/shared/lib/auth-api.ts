import { apiFetch } from "@/shared/lib/api";

export type AuthUser = {
  id: string;
  email: string;
  plan: string;
  api_key: string;
  created_at: string;
  stripe_customer_id?: string | null;
  stripe_subscription_id?: string | null;
};

type AuthPayload = {
  token: string;
  user: AuthUser;
};

export function registerUser(input: { email: string; password: string }) {
  return apiFetch<AuthPayload>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function loginUser(input: { email: string; password: string }) {
  return apiFetch<AuthPayload>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function fetchMe() {
  return apiFetch<{ user: AuthUser }>("/auth/me", { auth: true });
}

export function forgotPassword(email: string) {
  return apiFetch<{ message: string }>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(token: string, password: string) {
  return apiFetch<{ message: string }>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, password }),
  });
}
