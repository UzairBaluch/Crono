"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AuthShell } from "@/shared/components/auth/auth-shell";
import { useAuth } from "@/shared/components/auth/auth-provider";
import { ApiRequestError } from "@/shared/lib/api";
import { Button } from "@/shared/ui/button";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = searchParams.get("redirect") ?? "/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(email.trim(), password);
      router.push(redirectTo.startsWith("/") ? redirectTo : "/dashboard");
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : "Could not sign in. Is the API running?",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your scheduled HTTP jobs."
      footer={
        <>
          <span className="text-muted">No account? </span>
          <Link href="/register" className="text-accent hover:underline">
            Create one free
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error ? (
          <p className="rounded-xl border border-error/30 bg-error/10 px-3 py-2 text-sm text-error">
            {error}
          </p>
        ) : null}

        <label className="block space-y-1.5 text-sm">
          <span className="text-muted">Email</span>
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="focus-ring h-10 w-full rounded-xl border border-border bg-card-secondary px-3 text-foreground outline-none"
          />
        </label>

        <label className="block space-y-1.5 text-sm">
          <span className="text-muted">Password</span>
          <input
            required
            type="password"
            autoComplete="current-password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="focus-ring h-10 w-full rounded-xl border border-border bg-card-secondary px-3 text-foreground outline-none"
          />
        </label>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-accent hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full gap-2" disabled={submitting}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
