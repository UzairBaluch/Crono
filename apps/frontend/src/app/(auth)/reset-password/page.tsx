"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AuthShell } from "@/shared/components/auth/auth-shell";
import { Button } from "@/shared/ui/button";
import { ApiRequestError } from "@/shared/lib/api";
import { resetPassword } from "@/shared/lib/auth-api";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Missing reset token. Use the link from your email.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      await resetPassword(token, password);
      setDone(true);
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : "Could not reset password. The link may have expired.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) {
    return (
      <AuthShell
        title="Invalid reset link"
        subtitle="Open the link from your email or request a new one."
        backHref="/forgot-password"
        backLabel="Request new link"
      >
        <p className="text-sm text-muted">
          This page needs a <code className="text-foreground">token</code> query
          parameter from your reset email.
        </p>
      </AuthShell>
    );
  }

  if (done) {
    return (
      <AuthShell
        title="Password updated"
        subtitle="You can sign in with your new password."
        backHref="/login"
        backLabel="Sign in"
      >
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
          <Button
            className="mt-6 w-full"
            onClick={() => router.push("/login")}
          >
            Go to sign in
          </Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Must be at least 8 characters."
      backHref="/login"
      backLabel="Back to sign in"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block space-y-1.5 text-sm">
          <span className="text-muted">New password</span>
          <input
            required
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            className="focus-ring h-10 w-full rounded-xl border border-border bg-card-secondary px-3 text-foreground outline-none"
          />
        </label>

        {error ? <p className="text-sm text-error">{error}</p> : null}

        <Button type="submit" className="w-full gap-2" disabled={submitting}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {submitting ? "Saving…" : "Update password"}
        </Button>
      </form>
    </AuthShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
