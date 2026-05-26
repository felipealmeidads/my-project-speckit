# Tasks: Página de Bio Links

**Input**: Design documents from `/specs/001-bio-links/`

**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅, design-system.md ✅

**Tests**: Not requested in spec — validation via `tsc --noEmit`, manual preview (320px, 3G), and quickstart checklist only.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story label (US1–US5) for story phases only

## Path Conventions

Single-page app at repository root: `src/`, `public/`, `dist/`, `design-system.md`, `vite.config.ts`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Scaffold Vite + React 19 + TypeScript strict + Tailwind 4 per plan.md

- [X] T001 Create source tree per plan.md (`src/`, `src/components/`, `src/lib/`, `src/styles/`, `src/assets/`, `public/`) at repository root
- [X] T002 Initialize `package.json` with React 19, TypeScript, Vite 6+, scripts `dev`, `build`, `preview`, `deploy` in `package.json`
- [X] T003 [P] Configure `tsconfig.json` with `strict: true` and `noImplicitAny: true` in `tsconfig.json`
- [X] T004 [P] Add Tailwind CSS 4 and `@tailwindcss/vite` plugin in `vite.config.ts` and `package.json`
- [X] T005 [P] Add `lucide-react` and `framer-motion` dependencies in `package.json`
- [X] T006 Create `index.html` with `<div id="root">` mount point in `index.html`
- [X] T007 Create React entry `src/main.tsx` importing `App` and `src/styles/globals.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Types, config surface, lib helpers, design tokens — MUST complete before user stories

**⚠️ CRITICAL**: No user story work until this phase is complete

- [X] T008 Map structural tokens from `design-system.md` into `:root` CSS variables in `src/styles/globals.css`
- [X] T009 [P] Define `SiteConfig`, `Profile`, `LinkItem`, `Theme`, `Meta`, `LucideIconName` union in `src/types.ts`
- [X] T010 [P] Export example `siteConfig` per `contracts/config-schema.md` in `src/config.ts`
- [X] T011 [P] Implement `prepareLinks()` URL filter in `src/lib/prepareLinks.ts`
- [X] T012 [P] Implement `LucideIconName` → component map in `src/lib/iconMap.ts`
- [X] T013 Implement `applyTheme(theme)` CSS variable injection in `src/lib/applyTheme.ts`
- [X] T014 Configure `vite.config.ts` with `base: process.env.BASE_PATH ?? '/'` and Tailwind plugin in `vite.config.ts`
- [X] T015 Add placeholder `src/assets/avatar.jpg` and `public/favicon.ico`

**Checkpoint**: Foundation ready — user story implementation can begin

---

## Phase 3: User Story 1 — Visitante descobre e acessa links (Priority: P1) 🎯 MVP

**Goal**: Visitante vê perfil (foto, nome, handle, bio) e lista de botões com ícone + título; cada link abre em nova aba.

**Independent Test**: Abrir URL publicada no smartphone; confirmar perfil visível; tocar um botão e chegar ao destino correto em nova aba sem perder a página de bio.

### Implementation for User Story 1

- [X] T016 [P] [US1] Implement `ProfileCard` (avatar, name, handle, bio) per `contracts/component-props.md` in `src/components/ProfileCard.tsx`
- [X] T017 [P] [US1] Implement `LinkButton` (`target="_blank"`, `rel="noopener noreferrer"`, icon + title) in `src/components/LinkButton.tsx`
- [X] T018 [US1] Implement `LinkList` mapping `links` to `LinkButton` with `key={link.id}` in `src/components/LinkList.tsx`
- [X] T019 [US1] Compose `App.tsx`: import `siteConfig`, `prepareLinks(config.links)`, render `ProfileCard` + `LinkList` in `src/App.tsx`
- [X] T020 [US1] Add empty-state message when no valid links remain after filter in `src/App.tsx`

**Checkpoint**: US1 independently testable — perfil + links acionáveis

---

## Phase 4: User Story 2 — Experiência mobile e performance (Priority: P1)

**Goal**: Layout mobile-first (320px+), sem scroll horizontal, alvos de toque adequados; conteúdo principal visível em &lt;2s em 3G.

**Independent Test**: DevTools 320px viewport + Slow 3G reload — perfil e primeiro botão utilizáveis em &lt;2s, sem overflow horizontal.

### Implementation for User Story 2

- [X] T021 [P] [US2] Apply mobile-first layout, `--content-max-width` centering, page padding in `src/styles/globals.css`
- [X] T022 [P] [US2] Enforce `--touch-min` height and full-width tap targets on `LinkButton` in `src/components/LinkButton.tsx`
- [X] T023 [US2] Prevent horizontal overflow and safe-area padding on main wrapper in `src/App.tsx`
- [X] T024 [US2] Use named `lucide-react` imports only in `src/lib/iconMap.ts` for tree-shaking
- [X] T025 [US2] Add Framer Motion staggered entrance with `useReducedMotion()` fallback in `src/App.tsx`
- [X] T026 [US2] Set avatar fixed dimensions, `loading="eager"`, and aspect ratio on `ProfileCard` in `src/components/ProfileCard.tsx`

**Checkpoint**: US1 + US2 — página utilizável em mobile com performance aceitável

---

## Phase 5: User Story 3 — Dono personaliza conteúdo e aparência (Priority: P2)

**Goal**: Dono altera apenas `src/config.ts` (perfil, links, ordem, ícones, tema) e vê mudanças após rebuild.

**Independent Test**: Alterar nome, bio, três links e cores em `src/config.ts`; `npm run build`; preview reflete mudanças sem editar componentes.

### Implementation for User Story 3

- [X] T027 [P] [US3] Add inline documentation comments for every `siteConfig` field in `src/config.ts`
- [X] T028 [US3] Call `applyTheme(siteConfig.theme)` on mount in `src/App.tsx`
- [X] T029 [US3] Apply `highlighted` variant styles on `LinkButton` per `design-system.md` in `src/components/LinkButton.tsx`
- [X] T030 [US3] Include optional `socialLinks` example array in `src/config.ts` per `data-model.md`

**Checkpoint**: Config-only customization verified

---

## Phase 6: User Story 4 — Dono publica gratuitamente (Priority: P2)

**Goal**: `npm run build` gera `dist/` estático; deploy em GitHub Pages, Vercel ou Netlify documentado.

**Independent Test**: `npm run build` → publicar `dist/` em um provedor → URL pública com perfil, tema e links funcionando (incl. subpath se aplicável).

### Implementation for User Story 4

- [X] T031 [P] [US4] Add `gh-pages` devDependency and `"deploy": "npm run build && gh-pages -d dist"` script in `package.json`
- [X] T032 [US4] Verify asset paths resolve with configurable `base` in `vite.config.ts`
- [X] T033 [US4] Document `BASE_PATH` subpath build for GitHub Pages in `specs/001-bio-links/quickstart.md`
- [X] T034 [US4] Document Vercel and Netlify deploy settings (output `dist`) in `specs/001-bio-links/quickstart.md`

**Checkpoint**: Artefato publicável em hospedagem estática gratuita

---

## Phase 7: User Story 5 — Descoberta e acessibilidade (Priority: P3)

**Goal**: Metadados OG/Twitter/JSON-LD no HTML de build; botões com rótulos acessíveis; contraste WCAG AA; preview de compartilhamento.

**Independent Test**: View-source `dist/index.html` para meta tags; tab + leitor de tela nos links; testar preview OG em WhatsApp ou similar.

### Implementation for User Story 5

- [X] T035 [P] [US5] Configure build-time HTML meta injection from `siteConfig.meta` per `contracts/seo-head.md` in `vite.config.ts`
- [X] T036 [P] [US5] Embed JSON-LD `ProfilePage` script at build from config in `vite.config.ts` (or build plugin)
- [X] T037 [P] [US5] Implement `SocialIcons` icon-only links with `aria-label` in `src/components/SocialIcons.tsx`
- [X] T038 [US5] Integrate `SocialIcons` with `prepareLinks(config.socialLinks ?? [])` in `src/App.tsx`
- [X] T039 [US5] Add `focus-visible` ring styles on interactive links in `src/components/LinkButton.tsx` and `src/components/SocialIcons.tsx`
- [X] T040 [US5] Implement avatar initials fallback on `img` error in `src/components/ProfileCard.tsx`
- [X] T041 [US5] Set meaningful `alt={profile.name}` on avatar image in `src/components/ProfileCard.tsx`

**Checkpoint**: SEO head + a11y básica atendem FR-010, FR-011, FR-012, SC-006

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Edge cases, typecheck, documentation validation

- [X] T042 [P] Add `line-clamp` / wrap for long bio and titles without shrinking touch targets in `src/components/ProfileCard.tsx` and `src/components/LinkButton.tsx`
- [X] T043 Add `tsc --noEmit` script and run typecheck in `package.json`
- [X] T044 [P] Add contrast warning for theme colors in `specs/001-bio-links/quickstart.md`
- [X] T045 Desktop wide-viewport polish (centered column, no over-stretched buttons) in `src/App.tsx`
- [X] T046 Run end-to-end validation per `specs/001-bio-links/quickstart.md` (dev, build, 320px, 3G, deploy checklist)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — **blocks all user stories**
- **US1 (Phase 3)**: Depends on Phase 2
- **US2 (Phase 4)**: Depends on Phase 2; best after US1 components exist (T016–T018)
- **US3 (Phase 5)**: Depends on Phase 2; integrates with `App.tsx` from US1/US2
- **US4 (Phase 6)**: Depends on Phase 1–2; can parallelize with US3 after foundation
- **US5 (Phase 7)**: Depends on Phase 2; `SocialIcons` needs `iconMap`; SEO plugin needs `config.ts`
- **Polish (Phase 8)**: Depends on desired user stories complete

### User Story Dependencies

| Story | Priority | Depends on | Blocks |
|-------|----------|------------|--------|
| US1 | P1 | Foundational | — |
| US2 | P1 | Foundational (+ US1 components recommended) | — |
| US3 | P2 | Foundational, App shell | — |
| US4 | P2 | Setup + Foundational | — |
| US5 | P3 | Foundational, US1 link components | — |

US1 and US2 are both P1: deliver **US1 first** as MVP, then US2 for mobile/perf hardening.

### Within Each User Story

- Lib/helpers before components (foundational)
- Components before `App` composition
- `App` integration before polish

### Parallel Opportunities

- Phase 1: T003, T004, T005 in parallel
- Phase 2: T009, T010, T011, T012 in parallel
- US1: T016, T017 in parallel
- US2: T021, T022 in parallel
- US5: T035, T036, T037 in parallel
- Polish: T042, T044 in parallel

---

## Parallel Example: User Story 1

```bash
# After Phase 2 completes, launch component tasks together:
# Task T016: src/components/ProfileCard.tsx
# Task T017: src/components/LinkButton.tsx
# Then sequential: T018 LinkList → T019 App wiring
```

---

## Parallel Example: User Story 5

```bash
# SEO build tasks (different concerns, same vite.config — coordinate merges):
# Task T035: meta tags injection in vite.config.ts
# Task T036: JSON-LD generation in vite.config.ts
# Task T037: src/components/SocialIcons.tsx (separate file)
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (**critical**)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Smartphone preview — perfil + links + nova aba
5. Optional: deploy demo after Phase 6

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. US1 → MVP (visitante vê e clica links) ✅
3. US2 → mobile/performance hardening
4. US3 + US4 → dono personaliza e publica
5. US5 → SEO + a11y
6. Polish → edge cases + quickstart validation

### Parallel Team Strategy

With multiple developers after Phase 2:

- **Dev A**: US1 → US2 (visitor experience)
- **Dev B**: US4 (deploy pipeline) — can start after T014
- **Dev C**: US5 SEO plugin (T035–T036) — after T010 config exists

---

## Notes

- [P] tasks = different files or no ordering dependency
- [Story] label maps to `spec.md` user stories for traceability
- Constitution: no business logic inside `src/components/` — use `src/lib/*`
- Do not add test framework in v1 unless spec changes
- Commit after each phase checkpoint
- `design-system.md` already exists — consume it, do not duplicate
