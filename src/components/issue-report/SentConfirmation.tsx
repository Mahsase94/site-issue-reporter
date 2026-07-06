import { CheckCircle2, Clock } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";

export function SentConfirmation({ onNew, onBack }: { onNew: () => void; onBack: () => void }) {
  return (
    <div className="max-w-xl mx-auto text-center py-16">
      <div className="mx-auto size-20 rounded-full bg-success/15 text-success flex items-center justify-center mb-6">
        <CheckCircle2 className="size-12" />
      </div>
      <h2 className="text-3xl font-bold text-foreground">Sent to remote expert</h2>
      <p className="text-muted-foreground mt-3 text-lg">Issue #A-2418 delivered to Sabine K. in Munich.</p>
      <div className="mt-6 inline-flex items-center gap-2 bg-muted rounded-full px-4 py-2 text-sm">
        <Clock className="size-4 text-muted-foreground" />
        <span>Expected response within 20 minutes</span>
      </div>
      <div className="mt-10 flex justify-center gap-3">
        <PrimaryButton variant="secondary" onClick={onBack}>Back to job</PrimaryButton>
        <PrimaryButton onClick={onNew}>Report another issue</PrimaryButton>
      </div>
    </div>
  );
}
