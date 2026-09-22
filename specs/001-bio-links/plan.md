# Implementation Plan: Página de Bio Links

**Branch**: `001-bio-links` | **Date**: 2026-05-25 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-bio-links/spec.md` + stack/arquitetura fornecidos pelo usuário no `/speckit-plan`.

## Summary

Construir uma SPA estática de bio links (alternativa ao Linktree) onde o dono personaliza **apenas** `src/config.ts` e publica o output do Vite em GitHub Pages, Vercel ou Netlify. Stack: React 19, TypeScript strict, Vite, Tailwind CSS 4, lucide-react, Framer Motion; sem estado global. UI mobile-first (320px+), WCAG AA, SEO/OG/JSON-LD no HTML de build. Design visual governado por `design-system.md` na raiz do repositório.

## Technical Context

**Language/Version**: React 19 + TypeScript 5.x (`strict: true`) + Vite 6+

**Primary Dependencies**: `react`, `react-dom`, `vite`, `typescript`, `tailwindcss@4`, `@tailwindcss/vite`, `lucide-react`, `framer-motion`

**Storage**: N/A — conteúdo estático em `src/config.ts`; assets em `src/assets/` e `public/`

**Testing**: `tsc --noEmit`; preview manual 320px; Lighthouse opcional; sem framework de testes na v1

**Target Platform**: GitHub Pages (primário), Vercel, Netlify — artefato `dist/` estático

**Project Type**: Single-page web app (bio links)

**Performance Goals**: Conteúdo principal visível &lt; 2s em 3G (SC-001); bundle JS mínimo; tree-shake lucide

**Constraints**: Config-only customization; sem backend; sem Redux/Zustand/Context; WCAG AA; `design-system.md` obrigatório

**Scale/Scope**: Uma página por deploy; v1 sem analytics/CMS/auth

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Reference: `.specify/memory/constitution.md` (principles I–VIII).

| Gate | Requirement | Status (pre) | Status (post-design) |
|------|-------------|--------------|----------------------|
| G1 | `tsconfig` strict; no implicit `any`; function components only | ⬜ implement | ✅ planned |
| G2 | Props in named interfaces in `src/types.ts` | ⬜ implement | ✅ `contracts/component-props.md` |
| G3 | No business logic inside `src/components/` | ⬜ implement | ✅ `src/lib/prepareLinks.ts`, `iconMap.ts` |
| G4 | User-facing customization only via `src/config.ts` | ⬜ implement | ✅ |
| G5 | Deps limited to React, TS, Vite, one icon lib | ⚠️ see Complexity | ⚠️ Tailwind + Framer justified |
| G6 | `design-system.md` exists; UI uses its tokens | ⬜ | ✅ `design-system.md` created |
| G7 | 320px layout; aria; alt; WCAG AA | ⬜ implement | ✅ specified in design-system |
| G8 | SEO metadata + structured data in static build | ⬜ implement | ✅ `contracts/seo-head.md` |
| G9 | `vite build` → `dist/` for GitHub Pages | ⬜ implement | ✅ research R7 |

Mark ✅ only when verified at implementation; design phase satisfies G6, G2, G3, G4, G8 by contract.

## Project Structure

### Documentation (this feature)

```text
specs/001-bio-links/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/
│   ├── config-schema.md
│   ├── component-props.md
│   └── seo-head.md
└── tasks.md             # Phase 2 (/speckit-tasks — not created here)
```

### Source Code (repository root)

```text
design-system.md              # Tokens visuais (constitution V)
index.html
package.json                  # scripts: dev, build, deploy
public/
│   └── favicon.ico
vite.config.ts                # base path, Tailwind plugin, HTML meta injection
tsconfig.json                 # strict
src/
├── config.ts                 # ÚNICO arquivo editável pelo dono
├── types.ts                  # SiteConfig, Profile, LinkItem, Theme, Meta, LucideIconName
├── App.tsx                   # Monta página; aplica tema; empty states
├── main.tsx
├── assets/
│   └── avatar.jpg
├── lib/
│   ├── prepareLinks.ts       # Filtra URLs inválidas
│   ├── iconMap.ts            # LucideIconName → component
│   └── applyTheme.ts         # Injeta CSS variables do Theme
├── components/
│   ├── ProfileCard.tsx
│   ├── LinkButton.tsx
│   ├── LinkList.tsx
│   └── SocialIcons.tsx
└── styles/
    └── globals.css           # @import tailwind; design tokens; reset
dist/                         # vite build → GitHub Pages
```

**Structure Decision**: Monorepo de página única na raiz; camada `lib/` para regras fora de componentes (constitution II). `socialLinks` opcional em config para `SocialIcons` separado dos links principais (research R6).

## Phase 0 & 1 Artifacts

| Artifact | Path | Status |
|----------|------|--------|
| Research | [research.md](./research.md) | ✅ Complete |
| Data model | [data-model.md](./data-model.md) | ✅ Complete |
| Config contract | [contracts/config-schema.md](./contracts/config-schema.md) | ✅ Complete |
| Component contract | [contracts/component-props.md](./contracts/component-props.md) | ✅ Complete |
| SEO contract | [contracts/seo-head.md](./contracts/seo-head.md) | ✅ Complete |
| Quickstart | [quickstart.md](./quickstart.md) | ✅ Complete |
| Design system | [../../design-system.md](../../design-system.md) | ✅ Complete |

## Implementation Notes (for `/speckit-tasks`)

1. **Scaffold**: `npm create vite@latest` pattern — React + TS; add Tailwind 4 via `@tailwindcss/vite`.
2. **Tailwind**: `@import "tailwindcss"` em `globals.css`; mapear tokens do design-system como `@theme` ou variables.
3. **Framer Motion**: wrapper em `App.tsx` only; `useReducedMotion`.
4. **SEO**: `vite-plugin-html` ou transform build lendo `siteConfig.meta` (see `contracts/seo-head.md`).
5. **Deploy script**: `"deploy": "npm run build && gh-pages -d dist"` (+ devDependency `gh-pages`).
6. **Constitution G5**: manter apenas lucide como icon lib; Tailwind + Motion tracked below.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Tailwind CSS 4 (beyond constitution IV list) | Requisito explícito do usuário; velocidade mobile-first e utilitários de estado | CSS puro — mais lento de iterar; desalinhado com stack pedida |
| framer-motion (beyond constitution IV list) | Requisito explícito; entrada staggered profissional | CSS only — aceito como fallback se bundle exceder budget (research R11) |
| `socialLinks` field not in original user interface | Componente `SocialIcons` separado na arquitetura | Flag em cada link — menos legível para dono não-dev |

## Post-Design Constitution Re-evaluation

- **G6**: satisfeito — `design-system.md` criado na raiz.
- **G5**: exceção documentada; ícone único permanece `lucide-react` apenas.
- **G1–G4, G7–G9**: implementação seguirá contratos; gates marcados ✅ após `npm run build` e checklist manual.

**Next command**: `/speckit-tasks` para gerar `tasks.md`.
