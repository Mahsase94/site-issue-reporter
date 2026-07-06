import { Monitor, MapPin, Camera, Ruler, Tag } from "lucide-react";
import type { IssueDraft } from "./types";
import { problemLabels } from "./types";
import { FloorPlanMock } from "./FloorPlanMock";

export function ExpertPreview({ draft }: { draft: IssueDraft }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-background p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
        <Monitor className="size-4" />
        Expert view · what Munich will see
      </div>
      <div className="bg-surface rounded-xl border border-border p-5 shadow-sm">
        <div className="flex items-start justify-between mb-4 pb-4 border-b border-border">
          <div>
            <div className="text-xs text-muted-foreground">Issue #A-2418 · Bauer Residence</div>
            <div className="text-xl font-bold text-foreground mt-1">
              {draft.problemType ? problemLabels[draft.problemType] : "—"}
            </div>
          </div>
          <span className="text-xs bg-warning/20 text-warning-foreground px-3 py-1 rounded-full font-medium">Awaiting expert</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><MapPin className="size-3" /> LOCATION</div>
            <div className="scale-90 origin-top-left -mb-8">
              <FloorPlanMock pin={draft.location} onPin={() => {}} readonly />
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground mb-1">SUMMARY</div>
              <p className="text-sm text-foreground leading-relaxed">{draft.summary || "—"}</p>
            </div>
            {draft.measurement && (
              <div>
                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Ruler className="size-3" /> MEASUREMENT</div>
                <div className="text-sm font-medium text-foreground">{draft.measurement}</div>
              </div>
            )}
            {draft.tags.length > 0 && (
              <div>
                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Tag className="size-3" /> FLAGS</div>
                <div className="flex flex-wrap gap-1.5">
                  {draft.tags.map((t) => <span key={t} className="text-xs bg-muted rounded-md px-2 py-1">{t}</span>)}
                </div>
              </div>
            )}
            {draft.photoAttached && (
              <div>
                <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Camera className="size-3" /> PHOTO</div>
                <div className="h-16 rounded-md bg-gradient-to-br from-stone-300 to-stone-500 flex items-center justify-center text-xs text-white/90">IMG_2043.jpg</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
