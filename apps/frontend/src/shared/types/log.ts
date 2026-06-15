export type ApiLog = {
  id: string;
  job_id: string;
  user_id: string;
  status: string;
  http_status: number | null;
  duration_ms: number | null;
  response_body: string | null;
  error_message: string | null;
  attempt: number;
  fired_at: string;
};

export type LogEntry = {
  id: string;
  timestamp: string;
  status: "success" | "failed" | "retrying";
  httpStatusCode: number;
  durationMs: number;
  message: string;
};

export function toLogEntry(log: ApiLog): LogEntry {
  const status =
    log.status === "success"
      ? "success"
      : log.status === "failed"
        ? "failed"
        : "retrying";

  return {
    id: log.id,
    timestamp: new Date(log.fired_at).toLocaleString(),
    status,
    httpStatusCode: log.http_status ?? 0,
    durationMs: log.duration_ms ?? 0,
    message:
      log.error_message ??
      (log.response_body
        ? log.response_body.slice(0, 120)
        : "No response body"),
  };
}
