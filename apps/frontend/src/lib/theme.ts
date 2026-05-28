export const designTokens = {
  typography: {
    sans: "font-sans",
    mono: "font-mono"
  },
  radius: {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    xxl: "rounded-2xl"
  },
  shadows: {
    subtle: "shadow-[0_0_0_1px_rgba(0,0,0,0.03)]"
  }
} as const;

export const themeClasses = {
  card: {
    base: "rounded-2xl border border-border/80 bg-card"
  },
  button: {
    primary: "bg-white text-black hover:bg-zinc-200",
    secondary: "bg-card border border-border text-foreground hover:bg-hover",
    danger: "bg-red-500/15 border border-red-500/50 text-red-500 hover:bg-red-500/25"
  },
  chip: {
    base: "focus-ring rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors",
    active: "border-blue-500/40 bg-blue-500/10 text-blue-500",
    inactive: "border-border bg-card text-muted hover:bg-hover hover:text-foreground"
  },
  tabs: {
    base: "focus-ring rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors",
    active: "border-blue-500/40 bg-blue-500/10 text-blue-500",
    inactive: "border-border bg-card text-muted hover:bg-hover hover:text-foreground"
  },
  pricingToggle: {
    wrapper: "inline-flex items-center rounded-xl border border-border bg-card p-1 text-xs",
    active: "bg-card-secondary text-foreground",
    inactive: "text-muted hover:text-foreground"
  },
  log: {
    wrapper: "rounded-2xl border border-border/80 bg-card",
    inner: "rounded-xl border border-border/80 bg-card-secondary/70",
    stream: "rounded-lg border border-border/70 bg-background/70",
    success: "text-emerald-500",
    error: "text-rose-500",
    warning: "text-amber-500",
    neutral: "text-muted"
  }
} as const;
