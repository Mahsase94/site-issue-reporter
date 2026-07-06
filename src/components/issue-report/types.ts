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
  photoAttached: true,
  note: "Existing wall between living room and hallway is present on site but missing from the 2023 plan. Electrical outlet visible on the wall. Need expert confirmation before continuing capture.",
  tags: ["Affects electrical", "Homeowner change", "Safety concern"],
  measurement: "3.04 m wall length",
  summary: "",
  urgency: "urgent",
};

export const problemLabels: Record<ProblemType, string> = {
  "missing-wall": "Wall missing from plan",
  "measurement-off": "Measurement off",
  "mismatch": "Floor plan mismatch",
  "other": "Other",
};
