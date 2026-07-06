export type ProblemType = "missing-wall" | "measurement-off" | "mismatch" | "other";

export type Step = "job" | "type" | "location" | "evidence" | "summary" | "review" | "sent";

export interface IssueDraft {
  problemType: ProblemType | null;
  location: { x: number; y: number; room: string } | null;
  photoAttached: boolean;
  note: string;
  tags: string[];
  measurement: string;
  summary: string;
  urgency: "normal" | "urgent";
}

export const emptyDraft: IssueDraft = {
  problemType: null,
  location: null,
  photoAttached: false,
  note: "",
  tags: [],
  measurement: "",
  summary: "",
  urgency: "normal",
};

export const problemLabels: Record<ProblemType, string> = {
  "missing-wall": "Missing wall",
  "measurement-off": "Measurement off",
  "mismatch": "Floor plan mismatch",
  "other": "Other",
};
