export type LogEntry = {
  id: string;
  timestamp: string;
  status: "success" | "failed" | "retrying";
  httpStatusCode: number;
  durationMs: number;
  message: string;
};
