"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiRequestError } from "@/shared/lib/api";
import { fetchJobs } from "@/shared/lib/jobs-api";
import { type JobRow, toJobRow } from "@/shared/types/job";

export function useJobs() {
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { jobs: rows } = await fetchJobs();
      setJobs(rows.map(toJobRow));
    } catch (err) {
      setError(
        err instanceof ApiRequestError
          ? err.message
          : "Failed to load jobs",
      );
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { jobs, loading, error, reload };
}
