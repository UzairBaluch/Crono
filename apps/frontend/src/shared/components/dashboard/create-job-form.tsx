"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { createJob } from "@/shared/lib/jobs-api";
import { ApiRequestError } from "@/shared/lib/api";

export function CreateJobForm() {
  const router = useRouter();
  const [method, setMethod] = useState<"GET" | "POST">("GET");
  const [cronPreset, setCronPreset] = useState("*/5 * * * *");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [headersRaw, setHeadersRaw] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      let headers: Record<string, string> | undefined;
      if (headersRaw.trim()) {
        const parsed = JSON.parse(headersRaw) as unknown;
        if (
          typeof parsed !== "object" ||
          parsed === null ||
          Array.isArray(parsed)
        ) {
          throw new Error("Headers must be a JSON object");
        }
        headers = Object.fromEntries(
          Object.entries(parsed).map(([k, v]) => [k, String(v)]),
        );
      }

      const { job } = await createJob({
        name: name.trim(),
        url: url.trim(),
        schedule: cronPreset.trim(),
        method,
        headers,
        body: body.trim() || undefined,
      });

      router.push(`/dashboard/${job.id}`);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError("Headers must be valid JSON");
      } else {
        setError(
          err instanceof ApiRequestError
            ? err.message
            : err instanceof Error
              ? err.message
              : "Failed to create job",
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="rounded-2xl border-border/80 bg-card p-6">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="text-muted">Job Name</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-xl border border-border bg-card-secondary px-3 text-foreground outline-none focus:ring-2 focus:ring-blue-500/30"
              placeholder="Sync Users"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-muted">HTTP Method</span>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as "GET" | "POST")}
              className="h-10 w-full rounded-xl border border-border bg-card-secondary px-3 text-foreground outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </label>
        </div>

        <label className="block space-y-2 text-sm">
          <span className="text-muted">Endpoint URL</span>
          <input
            required
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-10 w-full rounded-xl border border-border bg-card-secondary px-3 text-foreground outline-none focus:ring-2 focus:ring-blue-500/30"
            placeholder="https://httpbin.org/get"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="text-muted">Cron Expression</span>
          <input
            required
            value={cronPreset}
            onChange={(event) => setCronPreset(event.target.value)}
            className="h-10 w-full rounded-xl border border-border bg-card-secondary px-3 font-mono text-foreground outline-none focus:ring-2 focus:ring-blue-500/30"
            placeholder="*/5 * * * *"
          />
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { label: "Every 5 min", value: "*/5 * * * *" },
              { label: "Hourly", value: "0 * * * *" },
              { label: "Daily", value: "0 0 * * *" },
            ].map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setCronPreset(preset.value)}
                className={`focus-ring rounded-lg border px-2 py-1 text-xs transition-colors ${
                  cronPreset === preset.value
                    ? "border-blue-500/40 bg-blue-500/10 text-blue-500"
                    : "border-border bg-card text-muted hover:bg-hover hover:text-foreground"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </label>

        <label className="block space-y-2 text-sm">
          <span className="text-muted">Headers (optional)</span>
          <textarea
            value={headersRaw}
            onChange={(e) => setHeadersRaw(e.target.value)}
            className="min-h-[100px] w-full rounded-xl border border-border bg-card-secondary px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-blue-500/30"
            placeholder='{"Authorization":"Bearer ..."}'
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="text-muted">Body (optional)</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="min-h-[120px] w-full rounded-xl border border-border bg-card-secondary px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-blue-500/30"
            placeholder='{"source":"dashboard"}'
          />
        </label>

        {error ? <p className="text-sm text-error">{error}</p> : null}

        <div className="flex items-center gap-3">
          <Button className="h-10 px-5" type="submit" disabled={submitting}>
            {submitting ? "Creating…" : "Create Job"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
