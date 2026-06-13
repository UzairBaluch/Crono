export const designTokens = {
  typography: {
    sans: "font-sans",
    mono: "font-mono",
  },
  radius: {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    xxl: "rounded-2xl",
  },
} as const;

export const themeClasses = {
  card: {
    base: "rounded-2xl border border-border/80 bg-card",
  },
  button: {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger:
      "border border-error/40 bg-error/10 text-error hover:bg-error/15 transition-colors",
  },
  chip: {
    base: "focus-ring rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors",
    active: "chip-active",
    inactive: "chip-inactive",
  },
  tabs: {
    base: "focus-ring rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors",
    active: "chip-active",
    inactive: "chip-inactive",
  },
  pricingToggle: {
    wrapper:
      "inline-flex items-center rounded-xl border border-border bg-card p-1 text-xs",
    active: "bg-accent-subtle/80 text-accent rounded-lg",
    inactive: "text-muted hover:text-foreground rounded-lg",
  },
  log: {
    wrapper: "rounded-2xl border border-border/80 bg-card panel-glow",
    inner: "rounded-xl border border-border/80 bg-card-secondary/70",
    stream: "rounded-lg border border-border/70 bg-background/70",
    success: "text-success",
    error: "text-error",
    warning: "text-warning",
    neutral: "text-muted",
  },
  nav: {
    active: "nav-active",
    inactive:
      "text-muted hover:bg-hover hover:text-foreground transition-colors",
  },
} as const;
