import { Clock, MapPin, User } from "lucide-react";

interface Props {
  expertAvailableUntil: string;
}

export function JobHeader({ expertAvailableUntil }: Props) {
  const now = new Date();
  const [hh, mm] = expertAvailableUntil.split(":").map(Number);
  const end = new Date(now);
  end.setHours(hh, mm, 0, 0);
  const minsLeft = Math.max(0, Math.round((end.getTime() - now.getTime()) / 60000));
  const urgent = minsLeft < 60;

  return (
    <header className="bg-surface border-b border-border px-8 py-5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Current job</div>
          <div className="text-lg font-semibold text-foreground">Renovation · Bauer Residence</div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" />
          <span>Prinzregentenstr. 42, Munich</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="size-4" />
          <span>Contractor: T. Weber</span>
        </div>
      </div>
      <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${urgent ? "bg-warning/20 text-warning-foreground" : "bg-success/15 text-success"}`}>
        <span className={`size-2 rounded-full ${urgent ? "bg-warning" : "bg-success"} animate-pulse`} />
        <Clock className="size-4" />
        <span>Expert available until {expertAvailableUntil} CET{minsLeft > 0 ? ` · ${minsLeft} min left` : ""}</span>
      </div>
    </header>
  );
}
