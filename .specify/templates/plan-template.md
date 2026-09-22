# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: React 19 + TypeScript (strict) + Vite

**Primary Dependencies**: React, Vite, one icon library only (see constitution)

**Storage**: N/A — static site; all content in `src/config.ts`

**Testing**: Manual / visual at 320px; optional lint (`tsc --noEmit`) — no test framework required unless spec requests

**Target Platform**: Static CDN; GitHub Pages (primary deploy target)

**Project Type**: Single-page static web app (bio links)

**Performance Goals**: Fast first paint; minimal JS bundle; no runtime server

**Constraints**: 320px mobile-first; WCAG AA; SEO in static HTML; config-only customization

**Scale/Scope**: Single profile page; no backend, auth, or CMS in v1

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Reference: `.specify/memory/constitution.md` (principles I–VIII).

| Gate | Requirement | Status |
|------|-------------|--------|
| G1 | `tsconfig` strict; no implicit `any`; function components only | ⬜ |
| G2 | Props in named interfaces in `src/types.ts` | ⬜ |
| G3 | No business logic inside `src/components/` | ⬜ |
| G4 | User-facing customization only via `src/config.ts` | ⬜ |
| G5 | Deps limited to React, TS, Vite, one icon lib | ⬜ |
| G6 | `design-system.md` exists; UI uses its tokens | ⬜ |
| G7 | 320px layout; links `aria-label`; images `alt`; WCAG AA contrast | ⬜ |
| G8 | SEO metadata + structured data in static build output | ⬜ |
| G9 | `vite build` → static `dist/` deployable to GitHub Pages without server config | ⬜ |

Mark ✅ only when verified; document any ⬜ failure in Complexity Tracking below.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
design-system.md          # Tokens: color, type, spacing (constitution V)
index.html
public/
src/
├── config.ts             # Sole customization surface (constitution III)
├── types.ts              # Named prop/data interfaces (constitution I)
├── components/           # Presentational UI only (constitution II)
├── App.tsx
└── main.tsx
dist/                     # vite build output → GitHub Pages
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
