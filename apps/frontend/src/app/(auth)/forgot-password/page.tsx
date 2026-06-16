"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AuthShell } from "@/shared/components/auth/auth-shell";
import { Button } from "@/shared/ui/button";
import { ApiRequestError } from "@/shared/lib/api";
import { forgotPassword } from "@/shared/lib/auth-api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await forgotPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : "Could not send reset email. Is the API running?",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <AuthShell
        title="Check your inbox"
        subtitle="If an account exists for this email, we sent reset instructions."
        backHref="/login"
        backLabel="Back to sign in"
      >
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
          <p className="mt-4 text-sm text-muted">
            If an account exists for{" "}
            <span className="font-medium text-foreground">{email}</span>, check
            your inbox for a reset link (expires in 1 hour).
          </p>
          <Link
            href="/login"
            className="focus-ring btn-secondary mt-6 inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium"
          >
            Back to sign in
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Reset password"
      subtitle="Enter your email and we'll send a reset link."
      backHref="/login"
      backLabel="Back to sign in"
      footer={
        <>
          <span className="text-muted">Remembered it? </span>
          <Link href="/login" className="text-accent hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {error ? <p className="text-sm text-error">{error}</p> : null}

        <Button type="submit" className="w-full gap-2" disabled={submitting}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {submitting ? "Sending…" : "Send reset link"}
        </Button>
      </form>
    </AuthShell>
  );
}
