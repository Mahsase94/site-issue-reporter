import {
  GitCompare,
  HelpCircle,
  Ruler,
  SquareDashed,
  type LucideIcon,
} from "lucide-react";
import { problemLabels, type ProblemType } from "../types/issue";

interface Props {
  value: ProblemType | null;
  onChange: (t: ProblemType) => void;
}

const META: Record<ProblemType, { desc: string; icon: LucideIcon }> = {
  "missing-wall": {
    desc: "A wall exists on-site but not in the plan",
    icon: SquareDashed,
  },
  "measurement-off": {
    desc: "A dimension in the plan doesn't match reality",
    icon: Ruler,
  },
  mismatch: { desc: "Room shape or layout is different", icon: GitCompare },
  other: { desc: "Something else needs expert review", icon: HelpCircle },
};

const TYPES: ProblemType[] = [
  "missing-wall",
  "measurement-off",
  "mismatch",
  "other",
];

export function ProblemTypeStep({ value, onChange }: Props) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      role="radiogroup"
      aria-label="Problem type"
    >
      {TYPES.map((t) => {
        const selected = value === t;
        const { desc, icon: Icon } = META[t];
        return (
          <button
            key={t}
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(t)}
            className={`text-left rounded-2xl p-6 border-2 transition-all min-h-[140px] flex flex-col gap-3 ${
              selected
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-surface hover:border-primary/40 hover:bg-muted/50"
            }`}
          >
            <div
              className={`size-12 rounded-xl flex items-center justify-center ${
                selected
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              <Icon className="size-6" aria-hidden />
            </div>
            <div>
              <div className="text-lg font-semibold text-foreground">
                {problemLabels[t]}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{desc}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
