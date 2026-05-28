import { Card } from "@/shared/ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Card className="rounded-2xl border-border/80 bg-card p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
    </Card>
  );
}
