import Link from "next/link";
import { Plus } from "lucide-react";

interface HeaderProps {
  title: string;
  description: string;
  showCreateButton?: boolean;
}

export function Header({ title, description, showCreateButton = false }: HeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      {showCreateButton ? (
        <Link
          href="/dashboard/new"
          className="focus-ring inline-flex h-10 items-center gap-1.5 rounded-xl bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
        >
            <Plus className="h-4 w-4" />
            Create Job
        </Link>
      ) : null}
    </div>
  );
}
