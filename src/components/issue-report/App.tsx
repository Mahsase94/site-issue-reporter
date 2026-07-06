import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Send, Plus, ChevronRight } from "lucide-react";
import { JobHeader } from "./JobHeader";
import { StepProgress } from "./StepProgress";
import { ProblemTypeCard } from "./ProblemTypeCard";
import { FloorPlanMock } from "./FloorPlanMock";
import { EvidencePanel } from "./EvidencePanel";
import { AISummaryCard } from "./AISummaryCard";
import { ExpertPreview } from "./ExpertPreview";
import { ReviewChecklist, checklistFor } from "./ReviewChecklist";
import { SentConfirmation } from "./SentConfirmation";
import { PrimaryButton } from "./PrimaryButton";
import { emptyDraft, type IssueDraft, type ProblemType, type Step } from "./types";

const EXPERT_UNTIL = "15:00";

export function IssueReportApp() {
  const [step, setStep] = useState<Step>("job");
  const [draft, setDraft] = useState<IssueDraft>(emptyDraft);

  const update = (patch: Partial<IssueDraft>) => setDraft((d) => ({ ...d, ...patch }));

  const canProceed = useMemo(() => {
    switch (step) {
      case "type": return !!draft.problemType;
      case "location": return !!draft.location;
      case "evidence": return draft.note.trim().length > 0;
      case "summary": return draft.summary.trim().length > 20;
      case "review": return checklistFor(draft).filter((i) => i.required).every((i) => i.ok);
      default: return true;
    }
  }, [step, draft]);

  const goNext = () => {
    const order: Step[] = ["job", "type", "location", "evidence", "summary", "review", "sent"];
    const i = order.indexOf(step);
    setStep(order[Math.min(i + 1, order.length - 1)]);
  };
  const goBack = () => {
    const order: Step[] = ["job", "type", "location", "evidence", "summary", "review"];
    const i = order.indexOf(step);
    setStep(order[Math.max(i - 1, 0)]);
  };

  const reset = () => {
    setDraft(emptyDraft);
    setStep("job");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <JobHeader expertAvailableUntil={EXPERT_UNTIL} />
      {step !== "job" && step !== "sent" && <StepProgress current={step} />}

      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">
          {step === "job" && <JobScreen draft={draft} onStart={() => setStep("type")} />}

          {step === "type" && (
            <Section title="What kind of problem?" subtitle="Pick one. You can add more detail next.">
              <div className="grid grid-cols-2 gap-4">
                {(["missing-wall", "measurement-off", "mismatch", "other"] as ProblemType[]).map((t) => (
                  <ProblemTypeCard key={t} type={t} selected={draft.problemType === t} onSelect={(v) => update({ problemType: v })} />
                ))}
              </div>
            </Section>
          )}

          {step === "location" && (
            <Section title="Where is the issue?" subtitle="Tap the room on the plan where the problem is.">
              <FloorPlanMock pin={draft.location} onPin={(p) => update({ location: p })} />
            </Section>
          )}

          {step === "evidence" && (
            <Section title="Add evidence" subtitle="Photo and a short note help the expert understand quickly. Type as little as you want.">
              <EvidencePanel draft={draft} update={update} />
            </Section>
          )}

          {step === "summary" && (
            <Section title="Review the AI summary" subtitle="We drafted a report from your input. Edit anything that's wrong.">
              <AISummaryCard draft={draft} onChange={(s) => update({ summary: s })} />
            </Section>
          )}

          {step === "review" && (
            <Section title="Send to remote expert" subtitle="Confirm everything below. This is exactly what the expert receives.">
              <div className="grid grid-cols-2 gap-6">
                <ReviewChecklist draft={draft} />
                <div className="rounded-2xl border-2 border-border bg-surface p-6">
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Urgency</div>
                  <div className="grid grid-cols-2 gap-3">
                    {(["normal", "urgent"] as const).map((u) => (
                      <button key={u} onClick={() => update({ urgency: u })}
                        className={`rounded-xl p-4 border-2 text-left ${draft.urgency === u ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                        <div className="font-semibold capitalize">{u}</div>
                        <div className="text-xs text-muted-foreground mt-1">{u === "urgent" ? "Blocks work on-site now" : "Reply within 24h"}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <ExpertPreview draft={draft} />
              </div>
            </Section>
          )}

          {step === "sent" && <SentConfirmation onNew={reset} onBack={() => setStep("job")} />}
        </div>
      </main>

      {step !== "job" && step !== "sent" && (
        <footer className="border-t border-border bg-surface px-8 py-4 flex items-center justify-between sticky bottom-0">
          <PrimaryButton variant="ghost" onClick={goBack}>
            <ArrowLeft className="size-5" /> Back
          </PrimaryButton>
          {step === "review" ? (
            <PrimaryButton onClick={() => setStep("sent")} disabled={!canProceed}>
              <Send className="size-5" /> Send to expert
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={goNext} disabled={!canProceed}>
              Continue <ArrowRight className="size-5" />
            </PrimaryButton>
          )}
        </footer>
      )}
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      {subtitle && <p className="text-muted-foreground mt-2 text-lg">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function JobScreen({ draft: _d, onStart }: { draft: IssueDraft; onStart: () => void }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <div className="rounded-2xl border border-border bg-surface p-8">
          <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Job in progress</div>
          <h1 className="text-3xl font-bold text-foreground mt-2">Bauer Residence · full renovation capture</h1>
          <p className="text-muted-foreground mt-3">Return visit · previous capture on file from 2023. Permit approved last Tuesday. Homeowner budget ~40,000 EUR.</p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Stat label="Rooms captured" value="4 / 6" />
            <Stat label="Open issues" value="0" />
            <Stat label="Today's jobs" value="1 of 4" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent captures</h2>
          <ul className="divide-y divide-border">
            {["Living room", "Kitchen", "Bathroom", "Bedroom"].map((r) => (
              <li key={r} className="py-3 flex items-center justify-between">
                <span className="text-foreground">{r}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border-2 border-primary bg-primary/5 p-6">
          <div className="text-sm font-semibold text-primary uppercase tracking-wider">Need help?</div>
          <h3 className="text-xl font-bold text-foreground mt-2">Something wrong on-site?</h3>
          <p className="text-sm text-muted-foreground mt-2">Flag a missing wall, wrong measurement, or layout mismatch. A remote expert will review.</p>
          <div className="mt-5">
            <PrimaryButton onClick={onStart} className="w-full">
              <Plus className="size-5" /> New space issue
            </PrimaryButton>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Remote expert</div>
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold">SK</div>
            <div>
              <div className="font-semibold text-foreground">Sabine K.</div>
              <div className="text-sm text-muted-foreground">Munich · Senior plan reviewer</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="size-2 rounded-full bg-success animate-pulse" />
            <span className="text-muted-foreground">Available until 15:00 CET</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted p-4">
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-bold text-foreground mt-1">{value}</div>
    </div>
  );
}
