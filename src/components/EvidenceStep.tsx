import { Camera, Check, Info, Mic, Ruler } from "lucide-react";
import type { IssueDraft } from "../types/issue";

interface Props {
  draft: IssueDraft;
  update: (patch: Partial<IssueDraft>) => void;
}

const TAG_OPTIONS = [
  "Load-bearing?",
  "Blocks door",
  "Affects plumbing",
  "Affects electrical",
  "Homeowner-requested change",
  "Safety concern",
];

export function EvidenceStep({ draft, update }: Props) {
  const toggleTag = (t: string) => {
    update({
      tags: draft.tags.includes(t)
        ? draft.tags.filter((x) => x !== t)
        : [...draft.tags, t],
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-xl bg-accent/40 border border-accent p-4 text-sm text-accent-foreground">
        <Info className="size-4 mt-0.5 shrink-0" aria-hidden />
        <span>
          Photo, note, tags and measurement together let Sabine resolve this
          without a live call. Keep it short — tap what applies.
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border-2 border-border bg-surface p-6">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Photo
          </div>
          {draft.photoAttached ? (
            <div className="relative rounded-xl overflow-hidden bg-muted h-48 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-gradient-to-br from-stone-300 to-stone-500"
                aria-hidden
              />
              <div className="relative bg-black/40 text-white px-4 py-2 rounded-lg text-sm">
                IMG_2043.jpg · Living room wall
              </div>
              <button
                onClick={() => update({ photoAttached: false })}
                className="absolute top-2 right-2 bg-surface text-foreground text-xs px-3 py-1.5 rounded-md font-medium hover:bg-muted"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              onClick={() => update({ photoAttached: true })}
              className="w-full h-48 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary transition"
            >
              <Camera className="size-8" aria-hidden />
              <span className="text-sm font-medium">Take photo</span>
            </button>
          )}
        </div>

        <div className="rounded-2xl border-2 border-border bg-surface p-6">
          <label
            htmlFor="issue-note"
            className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center justify-between"
          >
            <span>Voice memo or note</span>
            <span className="text-xs bg-muted rounded-full px-3 py-1 flex items-center gap-1 text-foreground font-medium">
              <Mic className="size-3" aria-hidden /> Record
            </span>
          </label>
          <textarea
            id="issue-note"
            value={draft.note}
            onChange={(e) => update({ note: e.target.value })}
            placeholder="Describe what you see. A short voice memo works too."
            rows={5}
            className="w-full rounded-lg border border-input bg-background p-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="rounded-2xl border-2 border-border bg-surface p-6 md:col-span-2">
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Quick tags
          </div>
          <div className="flex flex-wrap gap-2">
            {TAG_OPTIONS.map((t) => {
              const on = draft.tags.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  aria-pressed={on}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium border-2 transition min-h-[44px] flex items-center gap-2 ${
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface text-foreground hover:border-primary/40"
                  }`}
                >
                  {on && <Check className="size-4" aria-hidden />}
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border-2 border-border bg-surface p-6 md:col-span-2">
          <label
            htmlFor="issue-measurement"
            className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2"
          >
            <Ruler className="size-4" aria-hidden /> Optional measurement
          </label>
          <input
            id="issue-measurement"
            value={draft.measurement}
            onChange={(e) => update({ measurement: e.target.value })}
            placeholder="e.g. 3.04 m wall length"
            className="w-full rounded-lg border border-input bg-background p-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </div>
  );
}
