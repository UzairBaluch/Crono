"use client";

import { InteractivePanel } from "@/shared/components/marketing/interactive-panel";
import { CRUD_PLAYGROUND } from "@/shared/lib/marketing-content";

type CrudTab = "list" | "pause" | "delete";

interface LandingCrudSectionProps {
  activeTab: CrudTab;
  onTabChange: (tab: CrudTab) => void;
  activeStatus: string;
  onStatusChange: (id: string) => void;
}

export function LandingCrudSection({
  activeTab,
  onTabChange,
  activeStatus,
  onStatusChange,
}: LandingCrudSectionProps) {
  const playground = CRUD_PLAYGROUND[activeTab];
  const response =
    playground.responses[activeStatus as keyof typeof playground.responses] ??
    Object.values(playground.responses)[0];

  const responseTone =
    activeStatus.startsWith("4") || activeStatus.startsWith("5")
      ? "error"
      : "success";

  return (
    <section id="playground" className="interactive-section">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-medium tracking-tight md:text-[2rem]">
          Full job lifecycle in the API
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
          List, pause, and delete — switch operations and tap status codes to
          see real response shapes.
        </p>
      </div>

      <div className="mt-8">
        <InteractivePanel
          tabs={[
            { id: "list", label: "List jobs" },
            { id: "pause", label: "Pause job" },
            { id: "delete", label: "Delete job" },
          ]}
          activeTab={activeTab}
          onTabChange={(id) => {
            onTabChange(id as CrudTab);
            const first = CRUD_PLAYGROUND[id as CrudTab].statusCards[0]?.id;
            if (first) onStatusChange(first);
          }}
          endpoint={playground.endpoint}
          request={playground.request}
          response={response}
          responseTone={responseTone}
          statusCards={playground.statusCards}
          activeStatus={activeStatus}
          onStatusChange={onStatusChange}
        />
      </div>
    </section>
  );
}
