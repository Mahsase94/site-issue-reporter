import { useEffect, useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import type { IssueDraft } from "./types";
import { problemLabels } from "./types";

interface Props {
  draft: IssueDraft;
  onChange: (s: string) => void;
}

function generateSummary(d: IssueDraft): string {
  const type = d.problemType ? problemLabels[d.problemType] : "Issue";
  const room = d.location?.room ?? "unspecified area";
  const noteClean = d.note.trim();
  const parts: string[] = [];
  parts.push(`${type} reported in ${room}.`);
  if (noteClean) parts.push(`Contractor's observation: ${noteClean.charAt(0).toUpperCase() + noteClean.slice(1)}${/[.!?]$/.test(noteClean) ? "" : "."}`);
  if (d.measurement) parts.push(`On-site measurement: ${d.measurement}.`);
  if (d.tags.length) parts.push(`Flags: ${d.tags.join(", ")}.`);
  parts.push(`Requesting expert review to confirm ${d.problemType === "missing-wall" ? "wall addition to plan" : d.problemType === "measurement-off" ? "corrected dimensions" : "next steps"} before continuing capture.`);
  return parts.join(" ");
}

export function AISummaryCard({ draft, onChange }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      onChange(generateSummary(draft));
      setLoading(false);
    }, 900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const regen = () => {
    setLoading(true);
    setTimeout(() => {
      onChange(generateSummary(draft));
      setLoading(false);
    }, 700);
  };

  return (
    <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Sparkles className="size-5" />
          AI-drafted issue summary
        </div>
        <button onClick={regen} disabled={loading} className="text-sm flex items-center gap-1.5 text-primary hover:underline disabled:opacity-50">
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} /> Regenerate
        </button>
      </div>
      {loading ? (
        <div className="space-y-2">
          <div className="h-4 bg-primary/10 rounded animate-pulse" />
          <div className="h-4 bg-primary/10 rounded animate-pulse w-11/12" />
          <div className="h-4 bg-primary/10 rounded animate-pulse w-4/5" />
        </div>
      ) : (
        <textarea
          value={draft.summary}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full rounded-lg border border-input bg-surface p-4 text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring"
        />
      )}
      <p className="text-xs text-muted-foreground mt-3">You can edit this before sending. The expert will see this exact text.</p>
    </div>
  );
}
