"use client";

import { InteractivePanel } from "@/shared/components/marketing/interactive-panel";
import {
  API_EXAMPLES,
  API_RESPONSES,
} from "@/shared/lib/marketing-content";

type AuthTab = "jwt" | "apiKey";
type ResponseId = keyof typeof API_RESPONSES;

interface LandingApiSectionProps {
  activeTab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
  activeResponse: ResponseId;
  onResponseChange: (id: ResponseId) => void;
}

const STATUS_CARDS = [
  { id: "201" as const, code: "201", label: "Job created", tone: "success" as const },
  { id: "403" as const, code: "403", label: "Plan limit reached", tone: "error" as const },
  { id: "400" as const, code: "400", label: "Invalid cron schedule", tone: "warning" as const },
];

export function LandingApiSection({
  activeTab,
  onTabChange,
  activeResponse,
  onResponseChange,
}: LandingApiSectionProps) {
  const responseTone =
    activeResponse === "201"
      ? "success"
      : activeResponse === "403"
        ? "error"
        : "warning";

  return (
    <section id="api" className="interactive-section">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
          One API call to schedule a job
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
          Full CRUD at{" "}
          <code className="rounded-md bg-card-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
            /api/v1/jobs
          </code>
          . Click a response code below to preview the JSON.
        </p>
      </div>

      <div className="mt-8">
        <InteractivePanel
          tabs={[
            { id: "jwt", label: "Bearer JWT" },
            { id: "apiKey", label: "API Key" },
          ]}
          activeTab={activeTab}
          onTabChange={(id) => onTabChange(id as AuthTab)}
          endpoint="POST /api/v1/jobs → 201"
          request={activeTab === "jwt" ? API_EXAMPLES.jwt : API_EXAMPLES.apiKey}
          response={API_RESPONSES[activeResponse]}
          responseTone={responseTone}
          statusCards={STATUS_CARDS}
          activeStatus={activeResponse}
          onStatusChange={(id) => onResponseChange(id as ResponseId)}
        />
      </div>
    </section>
  );
}
