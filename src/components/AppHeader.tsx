import { Clock, MapPin, User } from "lucide-react";
import { mockJob, mockExpert } from "../data/mockJob";

export function AppHeader() {
  return (
    <header className="bg-surface border-b border-border px-6 md:px-8 py-4 md:py-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 min-w-0">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Current job
          </div>
          <div className="text-lg font-semibold text-foreground truncate">
            Renovation · {mockJob.name}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" aria-hidden />
          <span>{mockJob.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="size-4 shrink-0" aria-hidden />
          <span>Contractor: {mockJob.contractor}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-success/15 text-success">
        <span className="size-2 rounded-full bg-success animate-pulse" />
        <Clock className="size-4" aria-hidden />
        <span>
          Expert available until {mockExpert.availableUntil} {mockExpert.tz}
        </span>
      </div>
    </header>
  );
}
