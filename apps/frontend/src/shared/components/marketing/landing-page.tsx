"use client";

import { useEffect, useState } from "react";
import { LandingAlertsSection } from "@/shared/components/marketing/landing-alerts-section";
import { LandingApiSection } from "@/shared/components/marketing/landing-api-section";
import { LandingCrudSection } from "@/shared/components/marketing/landing-crud-section";
import { LandingFaq } from "@/shared/components/marketing/landing-faq";
import { LandingFeatures } from "@/shared/components/marketing/landing-features";
import { LandingFooter } from "@/shared/components/marketing/landing-footer";
import { LandingHeader } from "@/shared/components/marketing/landing-header";
import { LandingHero } from "@/shared/components/marketing/landing-hero";
import { LandingInteractiveNav } from "@/shared/components/marketing/landing-interactive-nav";
import { LandingPlanDemo } from "@/shared/components/marketing/landing-plan-demo";
import { LandingPricing } from "@/shared/components/marketing/landing-pricing";
import { LandingRetrySection } from "@/shared/components/marketing/landing-retry-section";
import { API_RESPONSES } from "@/shared/lib/marketing-content";
import type { FeatureCategory } from "@/shared/lib/marketing-content";

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePreset, setActivePreset] = useState(0);
  const [activeFeatureFilter, setActiveFeatureFilter] =
    useState<FeatureCategory>("all");
  const [isYearly, setIsYearly] = useState(false);
  const [featureTransitionKey, setFeatureTransitionKey] = useState(0);

  const [apiTab, setApiTab] = useState<"jwt" | "apiKey">("jwt");
  const [apiResponse, setApiResponse] =
    useState<keyof typeof API_RESPONSES>("201");

  const [crudTab, setCrudTab] = useState<"list" | "pause" | "delete">("list");
  const [crudStatus, setCrudStatus] = useState("200");

  const [retryStep, setRetryStep] = useState("attempt1");

  const [alertChannel, setAlertChannel] = useState<
    "email" | "slack" | "discord"
  >("email");

  const [jobCount, setJobCount] = useState(0);
  const [planResponse, setPlanResponse] = useState<string | null>(null);

  useEffect(() => {
    setFeatureTransitionKey((current) => current + 1);
  }, [activeFeatureFilter]);

  function handleCreateJobDemo() {
    const next = jobCount + 1;
    setJobCount(next);
    if (next > 3) {
      setPlanResponse(API_RESPONSES["403"]);
    } else {
      setPlanResponse(`{
  "success": true,
  "data": {
    "job": {
      "id": "job-${next}",
      "name": "Job ${next}",
      "status": "active"
    }
  }
}`);
    }
  }

  function handleResetPlanDemo() {
    setJobCount(0);
    setPlanResponse(null);
  }

  return (
    <main className="min-h-screen bg-background">
      <LandingHeader
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <LandingHero
          activePreset={activePreset}
          onPresetChange={setActivePreset}
        />

        <LandingInteractiveNav />

        {/* Interactive demos first — users play here before scrolling to features */}
        <LandingApiSection
          activeTab={apiTab}
          onTabChange={setApiTab}
          activeResponse={apiResponse}
          onResponseChange={setApiResponse}
        />

        <LandingCrudSection
          activeTab={crudTab}
          onTabChange={setCrudTab}
          activeStatus={crudStatus}
          onStatusChange={setCrudStatus}
        />

        <LandingPlanDemo
          jobCount={jobCount}
          lastResponse={planResponse}
          onCreateJob={handleCreateJobDemo}
          onReset={handleResetPlanDemo}
        />

        <LandingRetrySection
          activeStep={retryStep}
          onStepChange={setRetryStep}
        />

        <LandingAlertsSection
          activeChannel={alertChannel}
          onChannelChange={setAlertChannel}
        />

        <LandingFeatures
          activeFilter={activeFeatureFilter}
          onFilterChange={setActiveFeatureFilter}
          transitionKey={featureTransitionKey}
        />

        <LandingPricing isYearly={isYearly} onToggleYearly={setIsYearly} />

        <LandingFaq />
      </div>

      <LandingFooter />
    </main>
  );
}
