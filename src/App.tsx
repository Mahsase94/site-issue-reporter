import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { AppHeader } from "./components/AppHeader";
import { StepProgress } from "./components/StepProgress";
import { JobOverview } from "./components/JobOverview";
import { ProblemTypeStep } from "./components/ProblemTypeStep";
import { LocationStep } from "./components/LocationStep";
import { EvidenceStep } from "./components/EvidenceStep";
import { AISummaryStep } from "./components/AISummaryStep";
import { ReviewStep, checklistFor } from "./components/ReviewStep";
import { SentConfirmation } from "./components/SentConfirmation";
import { PrimaryButton } from "./components/PrimaryButton";
import { emptyDraft, type IssueDraft, type Step } from "./types/issue";

const STEP_ORDER: Step[] = [
  "job",
  "type",
  "location",
  "evidence",
  "summary",
  "review",
  "sent",
];

export default function App() {
  const [step, setStep] = useState<Step>("job");
  const [draft, setDraft] = useState<IssueDraft>(emptyDraft);

  const update = (patch: Partial<IssueDraft>) =>
    setDraft((d) => ({ ...d, ...patch }));

  const canProceed = useMemo(() => {
    switch (step) {
      case "type":
        return !!draft.problemType;
      case "location":
        return !!draft.location;
      case "evidence":
        return draft.note.trim().length > 0;
      case "summary":
        return draft.summary.trim().length > 20;
      case "review":
        return checklistFor(draft)
          .filter((i) => i.required)
          .every((i) => i.ok);
      default:
        return true;
    }
  }, [step, draft]);

  const goTo = (offset: number) => {
    const i = STEP_ORDER.indexOf(step);
    const next = Math.min(
      Math.max(i + offset, 0),
      STEP_ORDER.length - 1,
    );
    setStep(STEP_ORDER[next]);
  };

  const reset = () => {
    setDraft(emptyDraft);
    setStep("job");
  };

  const showChrome = step !== "job" && step !== "sent";

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <AppHeader />
      {showChrome && <StepProgress current={step} />}

      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {step === "job" && <JobOverview onStart={() => setStep("type")} />}

          {step === "type" && (
            <Section
              title="What kind of problem?"
              subtitle="Pick one. You can add more detail next."
            >
              <ProblemTypeStep
                value={draft.problemType}
                onChange={(t) => update({ problemType: t })}
              />
            </Section>
          )}

          {step === "location" && (
            <Section
              title="Where is the issue?"
              subtitle="Tap the room on the 2023 plan where the problem is. Help someone unfamiliar with the space find it fast."
            >
              <LocationStep
                location={draft.location}
                onChange={(l) => update({ location: l })}
              />
            </Section>
          )}

          {step === "evidence" && (
            <Section
              title="Add evidence"
              subtitle="Photo, note, tags and measurement. Keep it fast — minimal typing."
            >
              <EvidenceStep draft={draft} update={update} />
            </Section>
          )}

          {step === "summary" && (
            <Section
              title="Review the AI report"
              subtitle="We structured your input into the fields the expert needs. Edit anything that's wrong."
            >
              <AISummaryStep
                draft={draft}
                onChange={(s) => update({ summary: s })}
              />
            </Section>
          )}

          {step === "review" && (
            <Section
              title="Send to remote expert"
              subtitle="Confirm everything below. This is exactly what the expert receives."
            >
              <ReviewStep
                draft={draft}
                onUrgencyChange={(u) => update({ urgency: u })}
              />
            </Section>
          )}

          {step === "sent" && (
            <SentConfirmation onNew={reset} onBack={() => setStep("job")} />
          )}
        </div>
      </main>

      {showChrome && (
        <footer className="border-t border-border bg-surface px-4 md:px-8 py-4 flex items-center justify-between gap-3 sticky bottom-0">
          <PrimaryButton variant="ghost" onClick={() => goTo(-1)}>
            <ArrowLeft className="size-5" aria-hidden /> Back
          </PrimaryButton>
          {step === "review" ? (
            <PrimaryButton
              onClick={() => setStep("sent")}
              disabled={!canProceed}
            >
              <Send className="size-5" aria-hidden /> Send to expert
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={() => goTo(1)} disabled={!canProceed}>
              Continue <ArrowRight className="size-5" aria-hidden />
            </PrimaryButton>
          )}
        </footer>
      )}
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted-foreground mt-2 text-base md:text-lg">
          {subtitle}
        </p>
      )}
      <div className="mt-6 md:mt-8">{children}</div>
    </div>
  );
}
