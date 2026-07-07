import { mockExpert } from "../data/mockJob";
import {
  problemLabels,
  type IssueDraft,
  type ProblemType,
  type Urgency,
} from "../types/issue";

export interface SummaryFields {
  problem: string;
  location: string;
  evidence: string;
  impact: string;
  decision: string;
  urgency: string;
}

export const SUMMARY_LABELS: { key: keyof SummaryFields; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "location", label: "Location" },
  { key: "evidence", label: "Evidence" },
  { key: "impact", label: "Impact" },
  { key: "decision", label: "Requested decision" },
  { key: "urgency", label: "Urgency" },
];

interface Input {
  problemType: ProblemType | null;
  location: { room: string } | null;
  note: string;
  tags: string[];
  measurement: string;
  photoAttached: boolean;
  urgency: Urgency;
}

/**
 * Local, deterministic "AI" summary generator. Takes the field worker's
 * selected inputs and returns a structured report the remote expert can
 * review async. No network calls, no API keys.
 */
export function generateIssueSummary(input: Input): SummaryFields {
  const typeLabel = input.problemType
    ? problemLabels[input.problemType]
    : "Issue";
  const room = input.location?.room ?? "unspecified area";

  const evidenceParts: string[] = [];
  if (input.photoAttached) evidenceParts.push("photo attached");
  if (input.note.trim()) evidenceParts.push("field note added");
  if (input.measurement) evidenceParts.push(`measured ${input.measurement}`);
  if (input.tags.length) evidenceParts.push(`flags: ${input.tags.join(", ")}`);

  const problem =
    input.problemType === "missing-wall"
      ? "Wall exists on-site but is missing from the 2023 floor plan."
      : `${typeLabel} reported on-site.`;

  return {
    problem,
    location: `${room}, south wall near hallway opening.`,
    evidence: evidenceParts.length ? evidenceParts.join(", ") + "." : "—",
    impact:
      "Capture cannot be completed confidently until the plan is corrected.",
    decision:
      "Confirm whether to add the wall to the plan before continuing capture.",
    urgency:
      input.urgency === "urgent"
        ? `Urgent — blocks current capture. Expert available until ${mockExpert.availableUntil} ${mockExpert.tz}.`
        : `Normal — can wait for later review. Expert available until ${mockExpert.availableUntil} ${mockExpert.tz}.`,
  };
}

export function serializeSummary(f: SummaryFields): string {
  return SUMMARY_LABELS.map(({ key, label }) => `${label}: ${f[key]}`).join(
    "\n",
  );
}

export function parseSummary(s: string): SummaryFields {
  const out: SummaryFields = {
    problem: "",
    location: "",
    evidence: "",
    impact: "",
    decision: "",
    urgency: "",
  };
  for (const { key, label } of SUMMARY_LABELS) {
    const re = new RegExp(`${label}:\\s*([^\\n]*)`);
    const m = s.match(re);
    if (m) out[key] = m[1].trim();
  }
  return out;
}

export function generateIssueSummaryText(input: Input): string {
  return serializeSummary(generateIssueSummary(input));
}
