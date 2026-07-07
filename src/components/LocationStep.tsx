import { MapPin } from "lucide-react";
import { FloorPlanMock } from "./FloorPlanMock";
import type { Location } from "../types/issue";

interface Props {
  location: Location | null;
  onChange: (l: Location) => void;
}

export function LocationStep({ location, onChange }: Props) {
  return (
    <>
      <FloorPlanMock pin={location} onPin={onChange} />
      {location && (
        <div className="mt-4 rounded-xl border-2 border-primary/30 bg-primary/5 p-4 flex items-start gap-3">
          <MapPin
            className="size-5 text-primary shrink-0 mt-0.5"
            aria-hidden
          />
          <div className="text-sm">
            <div className="font-semibold text-foreground">
              Pinned in {location.room}
            </div>
            <div className="text-muted-foreground mt-0.5">
              South wall near hallway opening · compared against 2023 capture.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
