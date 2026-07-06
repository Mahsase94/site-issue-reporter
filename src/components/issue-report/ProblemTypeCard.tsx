import type { ProblemType } from "./types";
import { Ruler, SquareDashed, GitCompare, HelpCircle, type LucideIcon } from "lucide-react";

interface Props {
  type: ProblemType;
  selected: boolean;
  onSelect: (t: ProblemType) => void;
}

const META: Record<ProblemType, { title: string; desc: string; icon: LucideIcon }> = {
  "missing-wall": { title: "Missing wall", desc: "A wall exists on-site but not in the plan", icon: SquareDashed },
  "measurement-off": { title: "Measurement off", desc: "A dimension in the plan doesn't match reality", icon: Ruler },
  "mismatch": { title: "Floor plan mismatch", desc: "Room shape or layout is different", icon: GitCompare },
  "other": { title: "Other", desc: "Something else needs expert review", icon: HelpCircle },
};

export function ProblemTypeCard({ type, selected, onSelect }: Props) {
  const { title, desc, icon: Icon } = META[type];
  return (
    <button
      onClick={() => onSelect(type)}
      aria-pressed={selected}
      className={`text-left rounded-2xl p-6 border-2 transition-all min-h-[140px] flex flex-col gap-3 ${selected ? "border-primary bg-primary/5 shadow-md" : "border-border bg-surface hover:border-primary/40 hover:bg-muted/50"}`}
    >
      <div className={`size-12 rounded-xl flex items-center justify-center ${selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
        <Icon className="size-6" />
      </div>
      <div>
        <div className="text-lg font-semibold text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground mt-1">{desc}</div>
      </div>
    </button>
  );
}
