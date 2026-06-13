"use client";

const INTERACTIVE_LINKS = [
  { href: "#api", label: "Create" },
  { href: "#playground", label: "CRUD" },
  { href: "#cron", label: "Cron" },
  { href: "#auth-demo", label: "Auth" },
  { href: "#logs-demo", label: "Logs" },
  { href: "#health", label: "Health" },
  { href: "#plan-demo", label: "Limits" },
  { href: "#reliability", label: "Retries" },
  { href: "#alerts", label: "Alerts" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

export function LandingInteractiveNav() {
  return (
    <nav
      aria-label="Interactive demos"
      className="interactive-section-first -mx-1 flex gap-2 overflow-x-auto pb-2 scrollbar-none"
    >
      <span className="mr-1 shrink-0 self-center text-xs font-medium text-accent">
        Explore ↓
      </span>
      {INTERACTIVE_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="focus-ring shrink-0 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-medium text-muted transition-all hover:border-accent-muted/40 hover:bg-accent-subtle/50 hover:text-accent hover:scale-105 active:scale-95"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
