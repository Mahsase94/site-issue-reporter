# Space Issue Report Prototype

A browser-based iPad prototype for magicplan field workers. A contractor on-site can flag a space issue, for example a wall that exists in the room but is missing from the 2023 floor plan, and send a structured async report to a remote expert without needing a live call.

Built as a take-home design challenge for the Product Designer role at magicplan.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- lucide-react
- Local component state only
- No backend, authentication, database, or external AI

Verify that this matches package.json before saving the README.

## How to run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the URL printed in the terminal.

The layout is optimized for iPad-sized viewports in portrait and landscape, but also works in a desktop browser.

Build and preview a production bundle with:

```bash
npm run build
npm run preview
```

Verify that these commands match the actual scripts in package.json.

## What the prototype demonstrates

The complete prototype flow of a structured async issue report:

- Job overview: the contractor is mid-capture at Bauer Residence. A card offers “New space issue” and shows the remote expert’s availability.

- Problem type: select one: Wall missing from plan, Measurement off, Floor plan mismatch, or Other.

- Location: tap a room on a simplified SVG version of the 2023 floor plan to place an issue pin.

- Evidence: add simulated photo, note or voice memo evidence, quick tags, and an optional measurement. The draft is pre-filled with a realistic scenario so the flow can be reviewed without extensive typing.

- Structured summary: a deterministic local function generates a simulated AI-assisted report covering Problem, Location, Evidence, Impact, Requested decision, and Urgency. Every field can be reviewed and edited.

- Review: check that the required context is complete, choose urgency, and preview exactly what the remote expert will receive.

- Sent: a simulated confirmation with clear “what happens next” steps.

## Key design decisions

I designed one reusable async issue-reporting pattern for different space problems. The field worker selects the issue type, marks the location on a simplified floor plan, adds evidence, and reviews a structured summary before sending.

I chose a structured async report instead of an open chat because the remote expert is unfamiliar with the space and needs reliable context without depending on follow-up questions or a live call.

The interaction is designed for field conditions through large touch targets, limited typing, quick tags, optional measurements, and pre-filled sample content.

## Alternative considered

I considered a photo-first flow where the field worker takes a picture and taps the issue directly on the image.

This direction would be faster and easier for one-handed use. I chose the structured report because it provides stronger spatial context, supports issues that are not fully visible in a photo, and gives the expert a clear requested decision.

A future iteration could combine both approaches by starting with a photo and adding only the minimum structured context before sending.

## Fidelity choice

I built a working front-end prototype with local React state, simulated evidence capture, a deterministic locally generated summary, an expert preview, and a simulated send confirmation.

I intentionally did not build a backend, authentication, database, file storage, or external AI integration. Those elements would add technical complexity without helping answer the main product question:

Can a field worker communicate a space problem clearly enough for a remote expert to understand and respond asynchronously?

A coded prototype was the right fidelity because it allowed the complete interaction flow and the quality of the handoff to be tested while keeping the scope focused.

## Notes about scope

- No backend, authentication, or database
- No environment variables required
- No external AI API
- The “AI” summary is a deterministic local function in src/utils/generateSummary.ts
- All state is local React state in src/App.tsx
- Photo attachment, voice memo, AI summary, expert delivery, and confirmation are simulated prototype interactions
- Optimized for iPad browser use in the field
- The prototype focuses on reducing ambiguity, minimizing typing, and preventing incomplete reports

## Project structure

```
src/
  App.tsx
  main.tsx
  index.css
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
    mockJob.ts
  types/
    issue.ts
  utils/
    generateSummary.ts
```
