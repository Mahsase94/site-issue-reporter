import { useEffect, useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import type { IssueDraft } from "../types/issue";
import {
  SUMMARY_LABELS,
  generateIssueSummary,
  parseSummary,
  serializeSummary,
  type SummaryFields,
} from "../utils/generateSummary";

interface Props {
  draft: IssueDraft;
  onChange: (s: string) => void;
}

export function AISummaryStep({ draft, onChange }: Props) {
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState<SummaryFields>(() =>
    generateIssueSummary(draft),
  );

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const f =
        draft.summary.trim().length > 20
          ? parseSummary(draft.summary)
          : generateIssueSummary(draft);
      setFields(f);
      onChange(serializeSummary(f));
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const regen = () => {
    setLoading(true);
    setTimeout(() => {
      const f = generateIssueSummary(draft);
      setFields(f);
      onChange(serializeSummary(f));
      setLoading(false);
    }, 500);
  };

  const updateField = (key: keyof SummaryFields, value: string) => {
    const next = { ...fields, [key]: value };
    setFields(next);
    onChange(serializeSummary(next));
  };

  return (
    <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Sparkles className="size-5" aria-hidden />
          AI-drafted issue report
        </div>
        <button
          onClick={regen}
          disabled={loading}
          className="text-sm flex items-center gap-1.5 text-primary hover:underline disabled:opacity-50"
        >
          <RefreshCw
            className={`size-4 ${loading ? "animate-spin" : ""}`}
            aria-hidden
          />
          Regenerate
        </button>
      </div>
      {loading ? (
        <div className="space-y-3" aria-busy>
          {SUMMARY_LABELS.map((l) => (
            <div key={l.key}>
              <div className="h-3 w-24 bg-primary/10 rounded animate-pulse mb-2" />
              <div className="h-4 bg-primary/10 rounded animate-pulse w-11/12" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {SUMMARY_LABELS.map(({ key, label }) => (
            <div
              key={key}
              className="rounded-lg bg-surface border border-border p-3"
            >
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
                {label}
              </label>
              <textarea
                value={fields[key]}
                onChange={(e) => updateField(key, e.target.value)}
                rows={
                  key === "problem" || key === "impact" || key === "decision"
                    ? 2
                    : 1
                }
                className="w-full bg-transparent text-base leading-relaxed resize-none focus:outline-none"
              />
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-muted-foreground mt-3">
        Locally generated from your inputs — no external AI. Edit any field
        before sending; the expert sees this exact structured report.
      </p>
    </div>
  );
}
