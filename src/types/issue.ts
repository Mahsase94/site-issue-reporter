export type ProblemType =
  | "missing-wall"
  | "measurement-off"
  | "mismatch"
  | "other";

export type Urgency = "normal" | "urgent";

export type Step =
  | "job"
  | "type"
  | "location"
  | "evidence"
  | "summary"
  | "review"
  | "sent";

export interface Location {
  x: number;
  y: number;
  room: string;
}

export interface IssueDraft {
  problemType: ProblemType | null;
  location: Location | null;
  photoAttached: boolean;
  note: string;
  tags: string[];
  measurement: string;
  summary: string;
  urgency: Urgency;
}

export const problemLabels: Record<ProblemType, string> = {
  "missing-wall": "Wall missing from plan",
  "measurement-off": "Measurement off",
  mismatch: "Floor plan mismatch",
  other: "Other",
};

/**
 * Prefilled with a realistic scenario so reviewers can walk the flow
 * without typing. Story: contractor at Bauer Residence finds a wall
 * on-site that is missing from the 2023 floor plan.
 */
export const emptyDraft: IssueDraft = {
  problemType: null,
  location: null,
  photoAttached: true,
  note: "Existing wall between living room and hallway is present on site but missing from the 2023 plan. Electrical outlet visible on the wall. Need expert confirmation before continuing capture.",
  tags: ["Affects electrical", "Homeowner-requested change", "Safety concern"],
  measurement: "3.04 m wall length",
  summary: "",
  urgency: "urgent",
};
