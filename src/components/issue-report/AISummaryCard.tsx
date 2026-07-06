import { useEffect, useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import type { IssueDraft } from "./types";
import { problemLabels } from "./types";

interface Props {
  draft: IssueDraft;
  onChange: (s: string) => void;
}

interface SummaryFields {
  problem: string;
  location: string;
  evidence: string;
  impact: string;
  decision: string;
  urgency: string;
}

const LABELS: { key: keyof SummaryFields; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "location", label: "Location" },
  { key: "evidence", label: "Evidence" },
  { key: "impact", label: "Impact" },
  { key: "decision", label: "Requested decision" },
  { key: "urgency", label: "Urgency" },
];

function generateFields(d: IssueDraft): SummaryFields {
  const type = d.problemType ? problemLabels[d.problemType] : "Issue";
  const room = d.location?.room ?? "unspecified area";
  const evidenceBits: string[] = [];
  if (d.photoAttached) evidenceBits.push("Photo attached");
  if (d.note.trim()) evidenceBits.push("field note added");
  if (d.measurement) evidenceBits.push(`measured ${d.measurement}`);
  return {
    problem: type === "Wall missing from plan"
      ? "Wall exists on-site but is missing from the 2023 floor plan."
      : `${type} reported on-site.`,
    location: `${room}, south wall near hallway opening.`,
    evidence: evidenceBits.join(", ") + ".",
    impact: "Capture cannot be completed confidently until the plan is corrected.",
    decision: "Confirm whether to add the wall to the plan before continuing.",
    urgency: "Expert available until 15:00 CET, contractor has 3 more jobs today.",
  };
}

function serialize(f: SummaryFields): string {
  return LABELS.map(({ key, label }) => `${label}: ${f[key]}`).join("\n");
}

function parse(s: string): SummaryFields {
  const out: SummaryFields = { problem: "", location: "", evidence: "", impact: "", decision: "", urgency: "" };
  for (const { key, label } of LABELS) {
    const re = new RegExp(`${label}:\\s*([^\\n]*)`);
    const m = s.match(re);
    if (m) out[key] = m[1].trim();
  }
  return out;
}

export function AISummaryCard({ draft, onChange }: Props) {
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState<SummaryFields>(() => generateFields(draft));

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const f = draft.summary.trim().length > 20 ? parse(draft.summary) : generateFields(draft);
      setFields(f);
      onChange(serialize(f));
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const regen = () => {
    setLoading(true);
    setTimeout(() => {
      const f = generateFields(draft);
      setFields(f);
      onChange(serialize(f));
      setLoading(false);
    }, 600);
  };

  const updateField = (key: keyof SummaryFields, value: string) => {
    const next = { ...fields, [key]: value };
    setFields(next);
    onChange(serialize(next));
  };

  return (
    <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Sparkles className="size-5" />
          AI-drafted issue report
        </div>
        <button onClick={regen} disabled={loading} className="text-sm flex items-center gap-1.5 text-primary hover:underline disabled:opacity-50">
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} /> Regenerate
        </button>
      </div>
      {loading ? (
        <div className="space-y-3">
          {LABELS.map((l) => (
            <div key={l.key}>
              <div className="h-3 w-24 bg-primary/10 rounded animate-pulse mb-2" />
              <div className="h-4 bg-primary/10 rounded animate-pulse w-11/12" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {LABELS.map(({ key, label }) => (
            <div key={key} className="rounded-lg bg-surface border border-border p-3">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</div>
              <textarea
                value={fields[key]}
                onChange={(e) => updateField(key, e.target.value)}
                rows={key === "problem" || key === "impact" || key === "decision" ? 2 : 1}
                className="w-full bg-transparent text-base leading-relaxed resize-none focus:outline-none"
              />
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-muted-foreground mt-3">You can edit any field before sending. The expert will see this exact structured report.</p>
    </div>
  );
}
