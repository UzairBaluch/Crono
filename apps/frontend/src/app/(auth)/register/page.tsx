"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AuthShell } from "@/shared/components/auth/auth-shell";
import { useAuth } from "@/shared/components/auth/auth-provider";
import { ApiRequestError } from "@/shared/lib/api";
import { Button } from "@/shared/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);

    try {
      await register(email.trim(), password);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : "Could not create account. Is the API running?",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Free plan includes 3 active jobs — no credit card."
      footer={
        <>
          <span className="text-muted">Already have an account? </span>
          <Link href="/login" className="text-accent hover:underline">
            Sign in
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
            autoComplete="new-password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="focus-ring h-10 w-full rounded-xl border border-border bg-card-secondary px-3 text-foreground outline-none"
          />
        </label>

        <label className="block space-y-1.5 text-sm">
          <span className="text-muted">Confirm password</span>
          <input
            required
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat password"
            className="focus-ring h-10 w-full rounded-xl border border-border bg-card-secondary px-3 text-foreground outline-none"
          />
        </label>

        <Button type="submit" className="w-full gap-2" disabled={submitting}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {submitting ? "Creating account…" : "Create account"}
        </Button>

        <p className="text-center text-[11px] leading-relaxed text-muted">
          By signing up you get a JWT + API key for the REST API under{" "}
          <code className="text-foreground">/api/v1</code>.
        </p>
      </form>
    </AuthShell>
  );
}
