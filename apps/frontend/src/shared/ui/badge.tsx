import { cn } from "@/shared/lib/utils";

interface StatusBadgeProps {
  status: "Success" | "Failed" | "Running" | "Paused";
}

const styles = {
  Success: "bg-success/10 text-success border-success/30",
  Failed: "bg-error/10 text-error border-error/30",
  Running: "bg-accent-subtle/80 text-accent border-accent-muted/30",
  Paused: "bg-muted/10 text-muted border-border",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-1 text-xs transition-transform hover:scale-105",
        styles[status],
      )}
    >
      <span
        className={cn(
          "mr-1.5 h-1.5 w-1.5 rounded-full",
          status === "Running" ? "animate-pulse bg-accent" : "bg-current",
        )}
      />
      {status}
    </span>
  );
}
