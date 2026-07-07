# Space Issue Report Prototype

A browser-based iPad prototype for magicplan field workers. A contractor
on-site can flag a space issue — for example, a wall that exists in the room
but is missing from the 2023 floor plan — and send a structured, async report
to a remote expert without needing a live call.

Built as a take-home design challenge for the Product Designer role at
magicplan.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- lucide-react (icons)
- Local component state only

No backend, no authentication, no database, no external AI. Everything runs
in the browser.

## How to run locally

```bash
npm install
npm run dev
```

Then open the printed URL (default `http://localhost:8080`) in a
desktop browser. The layout is optimised for iPad-sized viewports (portrait
and landscape) but scales down cleanly.

Build a production bundle with:

```bash
npm run build
npm run preview
```

## What the prototype demonstrates

The full end-to-end flow of an async issue report:

1. **Job overview** — the contractor is mid-capture at Bauer Residence in
   Munich. A card offers "New space issue".
2. **Problem type** — pick one: _Wall missing from plan_, _Measurement off_,
   _Floor plan mismatch_, _Other_.
3. **Location** — tap a room on an SVG 2023 floor plan to drop a pin.
4. **Evidence** — attach a photo, note or voice memo, quick tags, and an
   optional measurement. The draft is pre-filled with a realistic scenario
   so the flow can be walked without typing.
5. **AI summary** — a locally generated structured report (Problem,
   Location, Evidence, Impact, Requested decision, Urgency). Every field is
   editable and can be regenerated.
6. **Review** — validation checklist, urgency selector, and a preview of
   exactly what Sabine K. in Munich will see.
7. **Sent** — confirmation with clear "what happens next" steps.

## Notes about scope

- No backend, no authentication, no database.
- No environment variables required.
- The "AI" summary is a deterministic local function in
  `src/utils/generateSummary.ts` that turns the worker's inputs into a
  structured report — no external AI API is called.
- All state is local React state (`useState`) in `src/App.tsx`.
- Optimised for iPad browser use in the field.
- The prototype focuses on async communication between the field worker
  and the remote expert — reducing ambiguity, minimising typing, and
  preventing incomplete reports.

## Project structure

```
src/
  App.tsx                 // step state machine + layout
  main.tsx                // React entry point
  index.css               // Tailwind v4 theme tokens
  components/
    AppHeader.tsx
    StepProgress.tsx
    JobOverview.tsx
    ProblemTypeStep.tsx
    LocationStep.tsx
    EvidenceStep.tsx
    AISummaryStep.tsx
    ReviewStep.tsx
    SentConfirmation.tsx
    PrimaryButton.tsx
    FloorPlanMock.tsx
    ExpertPreview.tsx
  data/
    mockJob.ts            // Bauer Residence + Sabine K.
  types/
    issue.ts              // IssueDraft, ProblemType, Urgency, Step
  utils/
    generateSummary.ts    // local "AI" summary generator
```
