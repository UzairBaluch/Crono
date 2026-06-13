import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="mt-28 border-t border-border/70 bg-card/60 md:mt-32">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm md:grid-cols-4 md:gap-12 md:px-6">
        <div>
          <p className="font-medium tracking-tight">Crono</p>
          <p className="mt-2 max-w-52 text-muted">
            Reliable scheduled HTTP jobs for indie SaaS and backend teams.
          </p>
        </div>
        <div>
          <p className="font-medium tracking-tight">Product</p>
          <div className="mt-3 space-y-1.5 text-muted">
            <Link href="#features" className="block hover:text-foreground">
              Features
            </Link>
            <Link href="#pricing" className="block hover:text-foreground">
              Pricing
            </Link>
            <Link href="#api" className="block hover:text-foreground">
              API
            </Link>
            <Link href="#playground" className="block hover:text-foreground">
              Playground
            </Link>
            <Link href="#reliability" className="block hover:text-foreground">
              Retries
            </Link>
            <Link href="#alerts" className="block hover:text-foreground">
              Alerts
            </Link>
          </div>
        </div>
        <div>
          <p className="font-medium tracking-tight">App</p>
          <div className="mt-3 space-y-1.5 text-muted">
            <Link href="/dashboard" className="block hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/jobs" className="block hover:text-foreground">
              Jobs
            </Link>
            <Link href="/logs" className="block hover:text-foreground">
              Logs
            </Link>
          </div>
        </div>
        <div>
          <p className="font-medium tracking-tight">Resources</p>
          <div className="mt-3 space-y-1.5 text-muted">
            <Link href="#faq" className="block hover:text-foreground">
              FAQ
            </Link>
            <p>Status</p>
            <p>Support</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border/70 px-4 py-4 text-center text-xs text-muted md:px-6">
        © 2026 Crono. All rights reserved.
      </div>
    </footer>
  );
}
