"use client";

const INTERACTIVE_LINKS = [
  { href: "#api", label: "Create job" },
  { href: "#playground", label: "CRUD" },
  { href: "#plan-demo", label: "Plan limits" },
  { href: "#reliability", label: "Retries" },
  { href: "#alerts", label: "Alerts" },
];

export function LandingInteractiveNav() {
  return (
    <nav
      aria-label="Interactive demos"
      className="interactive-section-first -mx-1 flex gap-2 overflow-x-auto pb-1 scrollbar-none"
    >
      <span className="mr-1 shrink-0 self-center text-xs font-medium text-muted">
        Try it ↓
      </span>
      {INTERACTIVE_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="focus-ring shrink-0 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-medium text-muted transition-all hover:border-accent-muted/40 hover:bg-accent-subtle/50 hover:text-accent"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
