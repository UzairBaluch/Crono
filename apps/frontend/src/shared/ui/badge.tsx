import { cn } from "@/shared/lib/utils";

interface StatusBadgeProps {
  status: "Success" | "Failed" | "Running" | "Paused";
}

const styles = {
  Success: "bg-green-500/10 text-green-400 border-green-500/30",
  Failed: "bg-red-500/10 text-red-400 border-red-500/30",
  Running: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Paused: "bg-zinc-500/10 text-zinc-300 border-zinc-500/30"
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-1 text-xs", styles[status])}>
      <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full", status === "Running" ? "animate-pulse bg-blue-400" : "bg-current")} />
      {status}
    </span>
  );
}
