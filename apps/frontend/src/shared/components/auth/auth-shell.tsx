import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CronoLogo } from "@/shared/components/crono-logo";
import { ThemeToggle } from "@/shared/components/theme-toggle";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  backHref = "/",
  backLabel = "Back to home",
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="hero-glow pointer-events-none absolute inset-0" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-6 md:px-6">
        <Link
          href="/"
          className="focus-ring inline-flex items-center gap-2.5 rounded-xl py-1 transition-transform hover:scale-[1.02]"
        >
          <CronoLogo size={30} showWordmark />
        </Link>
        <ThemeToggle />
      </header>

      <main className="relative z-10 mx-auto flex max-w-md flex-col px-4 pb-16 pt-4 md:px-6">
        <Link
          href={backHref}
          className="focus-ring mb-4 inline-flex w-fit items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-muted transition-colors hover:bg-hover hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <div className="rounded-2xl border border-border/80 bg-card/70 p-6 shadow-[0_0_80px_-30px_rgb(var(--accent-strong)/0.25)] backdrop-blur md:p-8">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
        {footer ? <div className="mt-6 text-center text-sm">{footer}</div> : null}
      </main>
    </div>
  );
}
