import { Check, AlertCircle } from "lucide-react";
import type { IssueDraft } from "./types";

interface Item { label: string; ok: boolean; required: boolean; }

export function checklistFor(draft: IssueDraft): Item[] {
  return [
    { label: "Problem type selected", ok: !!draft.problemType, required: true },
    { label: "Location pinned on floor plan", ok: !!draft.location, required: true },
    { label: "Photo attached", ok: draft.photoAttached, required: false },
    { label: "Note or voice memo added", ok: draft.note.trim().length > 0, required: true },
    { label: "AI summary reviewed", ok: draft.summary.trim().length > 20, required: true },
  ];
}

export function ReviewChecklist({ draft }: { draft: IssueDraft }) {
  const items = checklistFor(draft);
  return (
    <div className="rounded-2xl border-2 border-border bg-surface p-6">
      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Report checklist</div>
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i.label} className="flex items-center gap-3">
            <div className={`size-7 rounded-full flex items-center justify-center ${i.ok ? "bg-success text-success-foreground" : i.required ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"}`}>
              {i.ok ? <Check className="size-4" /> : <AlertCircle className="size-4" />}
            </div>
            <span className={`text-base ${i.ok ? "text-foreground" : i.required ? "text-destructive font-medium" : "text-muted-foreground"}`}>
              {i.label}{!i.required && !i.ok && <span className="text-xs ml-2 text-muted-foreground">(optional)</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
