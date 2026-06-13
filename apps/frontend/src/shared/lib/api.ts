import { getToken } from "@/shared/lib/auth-storage";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export class ApiRequestError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
  }
}

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {},
): Promise<T> {
  const { auth = false, headers, ...rest } = options;
  const token = auth ? getToken() : null;

  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const body = (await res.json().catch(() => ({}))) as ApiEnvelope<T>;

  if (!res.ok) {
    throw new ApiRequestError(
      body.message ?? `Request failed (${res.status})`,
      res.status,
    );
  }

  if (body.data === undefined) {
    throw new ApiRequestError("Invalid API response", res.status);
  }

  return body.data;
}
