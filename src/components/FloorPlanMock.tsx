import { useState, type MouseEvent } from "react";
import type { Location } from "../types/issue";

interface Props {
  pin: Location | null;
  onPin: (p: Location) => void;
  readonly?: boolean;
}

const ROOMS = [
  { name: "Living room", x: 40, y: 40, w: 260, h: 200 },
  { name: "Kitchen", x: 300, y: 40, w: 180, h: 140 },
  { name: "Bathroom", x: 300, y: 180, w: 180, h: 100 },
  { name: "Bedroom", x: 40, y: 240, w: 180, h: 200 },
  { name: "Hallway", x: 220, y: 280, w: 260, h: 160 },
];

export function FloorPlanMock({ pin, onPin, readonly }: Props) {
  const [hover, setHover] = useState<string | null>(null);

  const handleClick = (e: MouseEvent<SVGSVGElement>) => {
    if (readonly) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 520;
    const y = ((e.clientY - rect.top) / rect.height) * 480;
    const room = ROOMS.find(
      (r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h,
    );
    if (!room) return;
    onPin({ x, y, room: room.name });
  };

  return (
    <div className="rounded-2xl border-2 border-border bg-surface p-4">
      <svg
        viewBox="0 0 520 480"
        className={`w-full h-auto ${readonly ? "" : "cursor-crosshair"}`}
        onClick={handleClick}
        role="img"
        aria-label="Bauer Residence 2023 floor plan"
      >
        <rect
          width="520"
          height="480"
          fill="var(--color-muted)"
          rx="8"
        />
        {ROOMS.map((r) => (
          <g
            key={r.name}
            onMouseEnter={() => setHover(r.name)}
            onMouseLeave={() => setHover(null)}
          >
            <rect
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              fill={
                hover === r.name && !readonly
                  ? "var(--color-accent)"
                  : "var(--color-surface)"
              }
              stroke="var(--color-foreground)"
              strokeWidth="3"
            />
            <text
              x={r.x + r.w / 2}
              y={r.y + r.h / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--color-muted-foreground)"
              style={{ fontSize: 14 }}
            >
              {r.name}
            </text>
          </g>
        ))}
        <text
          x="170"
          y="30"
          textAnchor="middle"
          fill="var(--color-muted-foreground)"
          style={{ fontSize: 11 }}
        >
          6.20 m
        </text>
        <text
          x="30"
          y="140"
          textAnchor="middle"
          fill="var(--color-muted-foreground)"
          style={{ fontSize: 11 }}
          transform="rotate(-90 30 140)"
        >
          4.80 m
        </text>

        {pin && (
          <g transform={`translate(${pin.x - 14}, ${pin.y - 28})`}>
            <circle
              cx="14"
              cy="14"
              r="20"
              fill="var(--color-destructive)"
              opacity="0.25"
            >
              <animate
                attributeName="r"
                from="14"
                to="26"
                dur="1.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.4"
                to="0"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
            <path
              d="M14 0 C6 0 0 6 0 14 C0 22 14 30 14 30 C14 30 28 22 28 14 C28 6 22 0 14 0 Z"
              fill="var(--color-destructive)"
            />
            <circle cx="14" cy="14" r="5" fill="white" />
          </g>
        )}
      </svg>
      {!readonly && (
        <p className="text-sm text-muted-foreground mt-3 text-center">
          {pin
            ? `Pinned in ${pin.room} · tap again to move`
            : "Tap on the floor plan to mark the issue location"}
        </p>
      )}
    </div>
  );
}
