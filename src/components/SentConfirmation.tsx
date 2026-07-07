import { Bell, Building2, CheckCircle2, Clock, Eye } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { mockExpert, mockJob } from "../data/mockJob";

interface Props {
  onNew: () => void;
  onBack: () => void;
}

export function SentConfirmation({ onNew, onBack }: Props) {
  const steps = [
    {
      icon: Eye,
      text: `${mockExpert.name} reviews the pinned location, evidence and summary.`,
    },
    {
      icon: Building2,
      text: "You can continue capturing other rooms while waiting.",
    },
    {
      icon: Bell,
      text: "You'll get a notification when the expert confirms the correction.",
    },
  ];
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center">
        <div className="mx-auto size-20 rounded-full bg-success/15 text-success flex items-center justify-center mb-6">
          <CheckCircle2 className="size-12" aria-hidden />
        </div>
        <h2 className="text-3xl font-bold text-foreground break-words">
          Sent to remote expert
        </h2>
        <p className="text-muted-foreground mt-3 text-lg">
          Issue #{mockJob.id} delivered to {mockExpert.name} in{" "}
          {mockExpert.city}.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 bg-muted rounded-full px-4 py-2 text-sm">
          <Clock className="size-4 text-muted-foreground" aria-hidden />
          <span>
            Expected response within 20 minutes · expert available until{" "}
            {mockExpert.availableUntil} {mockExpert.tz}
          </span>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          What happens next
        </div>
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-semibold text-sm">
                {i + 1}
              </div>
              <div className="flex items-start gap-2 pt-1.5">
                <s.icon
                  className="size-4 text-muted-foreground shrink-0 mt-0.5"
                  aria-hidden
                />
                <span className="text-foreground leading-relaxed">
                  {s.text}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <PrimaryButton variant="secondary" onClick={onBack}>
          Back to job
        </PrimaryButton>
        <PrimaryButton onClick={onNew}>Report another issue</PrimaryButton>
      </div>
    </div>
  );
}
