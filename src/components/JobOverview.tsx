import { ChevronRight, Plus } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { mockJob, mockExpert } from "../data/mockJob";

export function JobOverview({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <section className="rounded-2xl border border-border bg-surface p-6 md:p-8">
          <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
            Job in progress
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
            {mockJob.name} · {mockJob.type.toLowerCase()}
          </h1>
          <p className="text-muted-foreground mt-3">
            Return visit · previous capture on file from 2023. Permit approved
            last Tuesday. Homeowner budget {mockJob.budget}.
          </p>
          <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6">
            <Stat label="Rooms captured" value={mockJob.roomsCaptured} />
            <Stat label="Open issues" value={String(mockJob.openIssues)} />
            <Stat label="Today's jobs" value={mockJob.todaysJobs} />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6 md:p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Recent captures
          </h2>
          <ul className="divide-y divide-border">
            {mockJob.recentCaptures.map((r) => (
              <li key={r} className="py-3 flex items-center justify-between">
                <span className="text-foreground">{r}</span>
                <ChevronRight
                  className="size-4 text-muted-foreground"
                  aria-hidden
                />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <aside className="space-y-6">
        <div className="rounded-2xl border-2 border-primary bg-primary/5 p-6">
          <div className="text-sm font-semibold text-primary uppercase tracking-wider">
            Need help?
          </div>
          <h3 className="text-xl font-bold text-foreground mt-2">
            Something wrong on-site?
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Flag a missing wall, wrong measurement, or layout mismatch. A remote
            expert will review async — no live call needed.
          </p>
          <div className="mt-5">
            <PrimaryButton onClick={onStart} className="w-full">
              <Plus className="size-5" /> New space issue
            </PrimaryButton>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Remote expert
          </div>
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold">
              {mockExpert.initials}
            </div>
            <div>
              <div className="font-semibold text-foreground">
                {mockExpert.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {mockExpert.city} · {mockExpert.role}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="size-2 rounded-full bg-success animate-pulse" />
            <span className="text-muted-foreground">
              Available until {mockExpert.availableUntil} {mockExpert.tz}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted p-3 md:p-4">
      <div className="text-xs text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
      <div className="text-xl md:text-2xl font-bold text-foreground mt-1">
        {value}
      </div>
    </div>
  );
}
