# Space Issue Report Prototype

## Overview

This is a browser-based iPad prototype created for magicplan’s Vibe Code Challenge.

The prototype helps a field worker report a space problem to a remote expert without needing a live call. It focuses on async communication between someone on-site and an expert who is unfamiliar with the space.

## Scenario

A contractor is on-site at Bauer Residence for a renovation capture. They discover that a wall exists in the real space but is missing from the 2023 floor plan.

The contractor is in a dusty room, holding tools, and has three more jobs today. The remote expert, Sabine K. in Munich, is available until 15:00 CET. The contractor needs to send enough context for Sabine to understand the issue and advise what to do next asynchronously.

## Problem

When field workers find an issue on-site, they often need help from a remote expert. A live call is not always possible, and an open message or chat may not give the expert enough context.

The key challenge is to help the field worker quickly communicate:

- What is wrong
- Where it is
- What evidence exists
- What decision is needed
- Why it is urgent

## Solution

The prototype guides the field worker through a structured async issue report.

The flow includes:

1. Review current job context
2. Select the problem type
3. Mark the issue location on a simple floor plan
4. Add evidence such as photo, note, tags, and measurement
5. Generate and review an AI-assisted summary
6. Preview what the remote expert will receive
7. Send the issue report
8. See confirmation and next steps

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Local state only

The brief did not specify a required framework, so I chose React + TypeScript + Vite. My goal was to keep the setup lightweight, easy to run locally, and suitable for a browser-based iPad prototype.

## How to run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app in a browser at the URL shown in the terminal (usually `http://localhost:5173` or `http://localhost:8080`).

## Available scripts

| Script | Command | Description |
|--------|---------|-------------|
| dev | `npm run dev` | Start local development server |
| build | `npm run build` | Build for production |
| preview | `npm run preview` | Preview the production build |
| lint | `npm run lint` | Run ESLint |
| format | `npm run format` | Format files with Prettier |

## Project structure

```
├── src/
│   ├── components/issue-report/   # Prototype UI components
│   ├── routes/                    # TanStack Start routes
│   ├── styles.css                 # Tailwind CSS entry point
│   └── ...
├── public/                        # Static assets
├── package.json
├── README.md
└── vite.config.ts
```

## Design decisions

- **Reduced typing:** The problem type, location, and evidence tags are selectable. Notes and measurements are pre-filled with realistic defaults so the worker can send a complete report with minimal edits.
- **Clear location:** The issue is marked on a simple SVG floor plan so the remote expert can see exactly where the wall is missing.
- **Structured summary:** The AI summary breaks the report into clear sections: Problem, Location, Evidence, Impact, Requested decision, and Urgency.
- **Review before sending:** A final review checklist prevents incomplete reports and shows the worker exactly what the expert will receive.
- **No backend required:** The prototype uses local state only, so it runs entirely in the browser without API keys or authentication.

## Notes for reviewers

- This is a prototype focused on interaction flow and product thinking, not a production implementation.
- The AI summary is generated locally for demonstration purposes.
- The floor plan is a simplified SVG representation of the job site.
- The app is optimized for iPad-sized viewports in landscape or portrait orientation.
