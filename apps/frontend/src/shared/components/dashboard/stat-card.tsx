import { Card } from "@/shared/ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
  tone?: "default" | "success" | "error" | "accent";
}

const toneBorder = {
  default: "hover:border-border",
  success: "hover:border-success/30 hover:bg-success/5",
  error: "hover:border-error/30 hover:bg-error/5",
  accent: "hover:border-accent-muted/40 hover:bg-accent-subtle/50",
};

export function StatCard({
  label,
  value,
  tone = "default",
}: StatCardProps) {
  return (
    <Card
      className={`rounded-2xl border-border/80 bg-card p-5 transition-all duration-200 hover:scale-[1.02] ${toneBorder[tone]}`}
    >
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
    </Card>
  );
}
