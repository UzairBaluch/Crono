import { Bell, Plus, Search } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function Topbar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b border-border bg-background/90 px-4 backdrop-blur lg:px-6">
      <div>
        <p className="text-xs text-muted">Dashboard</p>
        <h1 className="text-base font-semibold">{title}</h1>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <label className="surface-secondary hidden h-9 items-center gap-2 px-3 md:flex">
          <Search className="h-4 w-4 text-muted" />
          <input
            aria-label="Search"
            placeholder="Search jobs, logs..."
            className="w-52 bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </label>
        <Button variant="secondary" className="h-9 w-9 px-0" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Button className="h-9 gap-1.5">
          <Plus className="h-4 w-4" />
          Create Job
        </Button>
      </div>
    </header>
  );
}
