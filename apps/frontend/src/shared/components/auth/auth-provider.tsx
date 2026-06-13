"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  fetchMe,
  loginUser,
  registerUser,
  type AuthUser,
} from "@/shared/lib/auth-api";
import { ApiRequestError } from "@/shared/lib/api";
import { clearToken, getToken, setToken } from "@/shared/lib/auth-storage";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const { user: me } = await fetchMe();
      setUser(me);
    } catch (err) {
      if (err instanceof ApiRequestError && err.status === 401) {
        clearToken();
      }
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  const login = useCallback(async (email: string, password: string) => {
    const { token, user: loggedIn } = await loginUser({ email, password });
    setToken(token);
    setUser(loggedIn);
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const { token, user: registered } = await registerUser({ email, password });
    setToken(token);
    setUser(registered);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    router.push("/login");
  }, [router]);

  const value = useMemo(
    () => ({ user, loading, login, register, logout, refreshUser }),
    [user, loading, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
