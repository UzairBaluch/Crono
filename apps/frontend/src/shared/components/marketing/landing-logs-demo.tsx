"use client";

import { Card } from "@/shared/ui/card";
import { LOGS_DEMO_ENTRIES } from "@/shared/lib/marketing-content";
import { themeClasses } from "@/shared/lib/theme";

type LogFilter = "all" | "success" | "failed" | "retrying";

interface LandingLogsDemoProps {
  activeFilter: LogFilter;
  onFilterChange: (filter: LogFilter) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const FILTERS: { id: LogFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "success", label: "Success" },
  { id: "failed", label: "Failed" },
  { id: "retrying", label: "Retrying" },
];

const statusStyle = {
  success: "text-success bg-success/10 border-success/30",
  failed: "text-error bg-error/10 border-error/30",
  retrying: "text-warning bg-warning/10 border-warning/30",
};

export function LandingLogsDemo({
  activeFilter,
  onFilterChange,
  selectedId,
  onSelect,
}: LandingLogsDemoProps) {
  const filtered =
    activeFilter === "all"
      ? LOGS_DEMO_ENTRIES
      : LOGS_DEMO_ENTRIES.filter((e) => e.status === activeFilter);

  const selected = LOGS_DEMO_ENTRIES.find((e) => e.id === selectedId) ?? filtered[0];

  return (
    <section id="logs-demo" className="interactive-section">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
          Every run, logged
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
          Click a run to inspect status, HTTP code, and duration. Filter by
          outcome — the same view you&apos;ll get in the dashboard.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onFilterChange(f.id)}
            className={`${themeClasses.tabs.base} ${
              activeFilter === f.id
                ? themeClasses.tabs.active
                : themeClasses.tabs.inactive
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="panel-glow overflow-hidden p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border/80 bg-card-secondary/50">
              <tr className="text-muted">
                <th className="px-4 py-3 font-medium">Job</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">HTTP</th>
                <th className="px-4 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <tr
                  key={entry.id}
                  onClick={() => onSelect(entry.id)}
                  className={`cursor-pointer border-b border-border/50 transition-colors hover:bg-accent-subtle/30 ${
                    selected?.id === entry.id ? "bg-accent-subtle/40" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium">{entry.job}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-xs capitalize ${statusStyle[entry.status]}`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{entry.code}</td>
                  <td className="px-4 py-3 text-muted">{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {selected ? (
          <Card className="panel-glow p-5 animate-fade-tab" key={selected.id}>
            <p className="text-xs font-medium text-accent">Run detail</p>
            <p className="mt-2 text-lg font-medium">{selected.job}</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Status</dt>
                <dd className="capitalize">{selected.status}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">HTTP code</dt>
                <dd className="font-mono">{selected.code}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Duration</dt>
                <dd>{selected.ms}ms</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Fired</dt>
                <dd>{selected.time}</dd>
              </div>
            </dl>
            <pre className="mt-4 overflow-x-auto rounded-lg border border-border/70 bg-background/70 p-3 font-mono text-[11px] text-muted">
              {`response: ${selected.status === "success" ? '{"ok":true}' : selected.code === 504 ? "timeout" : "502 bad gateway"}\nattempt: ${selected.status === "retrying" ? "2/3" : "1/1"}`}
            </pre>
          </Card>
        ) : null}
      </div>
    </section>
  );
}
