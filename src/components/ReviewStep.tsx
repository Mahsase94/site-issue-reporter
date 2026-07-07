import { AlertCircle, AlertTriangle, Check } from "lucide-react";
import type { IssueDraft, Urgency } from "../types/issue";
import { mockExpert } from "../data/mockJob";
import { ExpertPreview } from "./ExpertPreview";

interface ChecklistItem {
  label: string;
  ok: boolean;
  required: boolean;
}

export function checklistFor(draft: IssueDraft): ChecklistItem[] {
  return [
    {
      label: "Problem type selected",
      ok: !!draft.problemType,
      required: true,
    },
    {
      label: "Location pinned on floor plan",
      ok: !!draft.location,
      required: true,
    },
    { label: "Photo attached", ok: draft.photoAttached, required: false },
    {
      label: "Note or voice memo added",
      ok: draft.note.trim().length > 0,
      required: true,
    },
    {
      label: "AI summary reviewed",
      ok: draft.summary.trim().length > 20,
      required: true,
    },
  ];
}

interface Props {
  draft: IssueDraft;
  onUrgencyChange: (u: Urgency) => void;
}

export function ReviewStep({ draft, onUrgencyChange }: Props) {
  const items = checklistFor(draft);

  return (
    <div>
      <div className="rounded-xl border-2 border-destructive/30 bg-destructive/5 p-4 flex items-start gap-3 mb-6">
        <AlertTriangle
          className="size-5 text-destructive shrink-0 mt-0.5"
          aria-hidden
        />
        <div className="text-sm text-foreground">
          <span className="font-semibold">Time-sensitive:</span> expert
          available until {mockExpert.availableUntil} {mockExpert.tz} ·
          contractor has 3 more jobs today · capture blocked until reviewed.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border-2 border-border bg-surface p-6">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Report checklist
          </div>
          <ul className="space-y-3">
            {items.map((i) => (
              <li key={i.label} className="flex items-center gap-3">
                <div
                  className={`size-7 rounded-full flex items-center justify-center ${
                    i.ok
                      ? "bg-success text-success-foreground"
                      : i.required
                        ? "bg-destructive/15 text-destructive"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i.ok ? (
                    <Check className="size-4" aria-hidden />
                  ) : (
                    <AlertCircle className="size-4" aria-hidden />
                  )}
                </div>
                <span
                  className={`text-base ${
                    i.ok
                      ? "text-foreground"
                      : i.required
                        ? "text-destructive font-medium"
                        : "text-muted-foreground"
                  }`}
                >
                  {i.label}
                  {!i.required && !i.ok && (
                    <span className="text-xs ml-2 text-muted-foreground">
                      (optional)
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border-2 border-border bg-surface p-6">
          <div
            className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3"
            id="urgency-label"
          >
            Urgency
          </div>
          <div
            className="grid grid-cols-2 gap-3"
            role="radiogroup"
            aria-labelledby="urgency-label"
          >
            {(["urgent", "normal"] as const).map((u) => (
              <button
                key={u}
                role="radio"
                aria-checked={draft.urgency === u}
                onClick={() => onUrgencyChange(u)}
                className={`rounded-xl p-4 border-2 text-left ${
                  draft.urgency === u
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className="font-semibold capitalize">{u}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {u === "urgent"
                    ? "Blocks current capture."
                    : "Can wait for later review."}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ExpertPreview draft={draft} />
      </div>
    </div>
  );
}
