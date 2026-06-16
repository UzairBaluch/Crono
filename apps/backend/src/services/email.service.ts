import { Resend } from "resend";
import { env } from "../config/env.js";

const FROM = "Crono <onboarding@resend.dev>";

function getClient(): Resend | null {
  if (!env.RESEND_API_KEY) return null;
  return new Resend(env.RESEND_API_KEY);
}

type FailureAlertInput = {
  to: string;
  jobName: string;
  jobId: string;
  error: string;
};

type PasswordResetInput = {
  to: string;
  resetUrl: string;
};

export const emailService = {
  async sendFailureAlert(input: FailureAlertInput): Promise<void> {
    const client = getClient();
    if (!client) {
      console.warn("[email] RESEND_API_KEY not set — skipping failure alert");
      return;
    }

    try {
      const { data, error } = await client.emails.send({
        from: FROM,
        to: input.to,
        subject: `Job failed: ${input.jobName}`,
        html: `
          <p>Your scheduled job <strong>${input.jobName}</strong> failed.</p>
          <p><strong>Error:</strong> ${input.error}</p>
          <p><strong>Job ID:</strong> ${input.jobId}</p>
          <p><a href="${env.APP_URL}/dashboard/${input.jobId}">View job in dashboard</a></p>
        `,
      });
      if (error) {
        console.error("[email] Resend rejected failure alert", error);
        return;
      }
      console.log("[email] Failure alert sent", data?.id);
    } catch (err) {
      console.error("[email] Failed to send failure alert", err);
    }
  },

  async sendPasswordReset(input: PasswordResetInput): Promise<void> {
    const client = getClient();
    if (!client) {
      console.warn("[email] RESEND_API_KEY not set — skipping password reset");
      return;
    }

    try {
      const { data, error } = await client.emails.send({
        from: FROM,
        to: input.to,
        subject: "Reset your Crono password",
        html: `
          <p>Click the link below to reset your password. This link expires in 1 hour.</p>
          <p><a href="${input.resetUrl}">Reset password</a></p>
        `,
      });
      if (error) {
        console.error("[email] Resend rejected password reset", error);
        return;
      }
      console.log("[email] Password reset sent", data?.id);
    } catch (err) {
      console.error("[email] Failed to send password reset email", err);
    }
  },
};
