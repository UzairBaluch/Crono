import { Resend } from "resend";

const FROM = "Crono <onboarding@resend.dev>";

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[worker email] RESEND_API_KEY not set");
    return null;
  }
  return new Resend(key);
}

export type FailureAlertInput = {
  to: string;
  jobName: string;
  jobId: string;
  error: string;
};

export const workerEmail = {
  async sendFailureAlert(input: FailureAlertInput): Promise<void> {
    const client = getClient();
    if (!client) return;

    const appUrl = process.env.APP_URL ?? "http://localhost:3000";

    try {
      const { data, error } = await client.emails.send({
        from: FROM,
        to: input.to,
        subject: `Job failed: ${input.jobName}`,
        html: `
          <p>Your scheduled job <strong>${input.jobName}</strong> failed.</p>
          <p><strong>Error:</strong> ${input.error}</p>
          <p><strong>Job ID:</strong> ${input.jobId}</p>
          <p><a href="${appUrl}/dashboard/${input.jobId}">View job in dashboard</a></p>
        `,
      });

      if (error) {
        console.error("[worker email] Resend rejected failure alert", error);
        return;
      }

      console.log("[worker email] Failure alert sent", data?.id);
    } catch (err) {
      console.error("[worker email] Failed to send failure alert", err);
    }
  },
};
