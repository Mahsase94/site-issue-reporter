import type { Step } from "./types";
import { Check } from "lucide-react";

const STEPS: { id: Step; label: string }[] = [
  { id: "type", label: "Problem" },
  { id: "location", label: "Location" },
  { id: "evidence", label: "Evidence" },
  { id: "summary", label: "AI summary" },
  { id: "review", label: "Review" },
];

export function StepProgress({ current }: { current: Step }) {
  const currentIdx = STEPS.findIndex((s) => s.id === current);
  return (
    <div className="flex items-center gap-2 px-8 py-4 bg-background border-b border-border">
      {STEPS.map((s, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <div className={`flex items-center gap-2 ${active ? "text-foreground" : done ? "text-success" : "text-muted-foreground"}`}>
              <div className={`size-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${active ? "border-primary bg-primary text-primary-foreground" : done ? "border-success bg-success text-success-foreground" : "border-border bg-surface"}`}>
                {done ? <Check className="size-4" /> : i + 1}
              </div>
              <span className="text-sm font-medium">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 ${done ? "bg-success" : "bg-border"}`} />}
          </div>
        );
      })}
    </div>
  );
}
