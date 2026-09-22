# Research: Página de Bio Links

**Feature**: `001-bio-links` | **Date**: 2026-05-25

## R1 — Stack: React 19 + Vite + TypeScript strict

**Decision**: React 19 com Vite 6+ e `typescript` strict (`strict: true`, `noImplicitAny: true`).

**Rationale**: Alinha à constituição; Vite gera bundle estático otimizado com HMR para desenvolvimento; React 19 é estável para SPA de uma página.

**Alternatives considered**:
- **Next.js static export**: rejeitado — complexidade desnecessária sem rotas nem SSR.
- **Astro**: rejeitado — stack já definida pelo usuário e constituição.

## R2 — Estilização: Tailwind CSS v4

**Decision**: Tailwind CSS 4 (`@tailwindcss/vite` plugin) com tokens estruturais em `globals.css` e tema dinâmico via CSS variables injetadas de `config.theme`.

**Rationale**: Usuário exige Tailwind 4; v4 integra nativamente com Vite; utilitários aceleram mobile-first e estados hover/focus sem CSS-in-JS.

**Alternatives considered**:
- **CSS modules puro**: rejeitado — mais verboso; usuário especificou Tailwind.
- **Styled-components**: rejeitado — runtime CSS-in-JS aumenta bundle e viola espírito de deps mínimas.

**Constitution note**: Princípio IV lista apenas React/TS/Vite/ícones — Tailwind registrado em Complexity Tracking do `plan.md`.

## R3 — Ícones: lucide-react

**Decision**: `lucide-react` com tipo `LucideIconName` union em `types.ts` e mapa estático `iconMap` fora de componentes.

**Rationale**: Biblioteca leve, tree-shakeable, nomes estáveis; atende FR-002 e restrição de uma lib de ícones.

**Alternatives considered**:
- **Heroicons**: equivalente; lucide escolhido pelo usuário.
- **SVG inline no config**: rejeitado — fora do escopo v1 (spec: ícones por identificador documentado).

## R4 — Animações: Framer Motion

**Decision**: `framer-motion` apenas para entrada staggered e micro-interações; `useReducedMotion()` + CSS `prefers-reduced-motion` para desligar.

**Rationale**: Usuário exige Framer Motion; melhora percepção de qualidade sem estado global.

**Alternatives considered**:
- **CSS `@keyframes`**: menor bundle; rejeitado por requisito explícito do usuário.
- **React Spring**: API mais verbosa para caso simples.

**Constitution note**: Dependência extra — justificada em Complexity Tracking.

## R5 — Estado: sem global store

**Decision**: Props drilling de `SiteConfig` a partir de `App.tsx`; zero Context API, Redux ou Zustand.

**Rationale**: Página estática de uma tela; todos os dados vêm de `config.ts` em build time; estado de UI mínimo (ex.: erro de imagem) via `useState` local em componente se necessário.

**Alternatives considered**:
- **React Context para tema**: rejeitado — requisito explícito do usuário; tema aplicado via CSS variables no mount.

## R6 — Separação links principais vs. redes sociais

**Decision**: Estender `SiteConfig` com `socialLinks?: LinkItem[]` opcional; `SocialIcons` renderiza apenas esse array; `LinkList` usa `links`.

**Rationale**: Arquitetura do usuário separa componentes; interface original não listava `socialLinks` — extensão mínima documentada em `data-model.md` e `contracts/config-schema.md` sem quebrar links principais.

**Alternatives considered**:
- **Flag `kind: 'social' | 'main'` em LinkItem**: mais flexível; rejeitado para manter arrays explícitos e config legível para não-devs.

## R7 — Deploy estático e `base` do Vite

**Decision**: `vite.config.ts` com `base: process.env.BASE_PATH ?? '/'`; script `deploy` no `package.json` usando `gh-pages -d dist` (GitHub Pages) com documentação alternativa para Vercel/Netlify (root = `dist`).

**Rationale**: FR-008, constitution VIII; subpath de repositório exige `base` configurável.

**Alternatives considered**:
- **Apenas GitHub Actions**: adiado para tasks — quickstart cobre manual + opcional CI.

## R8 — SEO e metadados estáticos

**Decision**: `index.html` com placeholders substituídos no build via plugin Vite custom leve **ou** `react-helmet-async` — preferência: **injeção em `index.html` via `vite-plugin-html` ou transform no `build`** para evitar deps; fallback documentado: meta tags geradas em `App.tsx` com `useEffect` apenas se plugin indisponível (pior para crawlers — evitar).

**Rationale**: Constitution VII exige title, OG, JSON-LD no HTML de saída; build-time é mais confiável que client-only.

**Alternatives considered**:
- **SSR**: proibido pelo escopo.
- **Somente `document.title` em runtime**: insuficiente para OG em alguns crawlers.

**Implementação recomendada**: plugin `vite-plugin-html` + template com `%META_TITLE%` etc. populados de `config.ts` em build — registrado em `contracts/seo-head.md`.

## R9 — Validação de links inválidos

**Decision**: Helper `prepareLinks(links: LinkItem[])` em `src/lib/prepareLinks.ts` (fora de `components/`) filtra URLs vazias/malformadas; componentes recebem lista já sanitizada.

**Rationale**: Constitution II — regra de visibilidade fora dos componentes; edge case da spec.

## R10 — design-system.md

**Decision**: Criar `design-system.md` na raiz (este repositório) antes da implementação UI, conforme constitution e referência do usuário.

**Rationale**: Gate G6; tokens únicos para espaçamento, tipografia e comportamento de componentes.

**Alternatives considered**:
- **Tokens só no Tailwind config**: rejeitado — constituição exige arquivo dedicado como fonte absoluta.

## R11 — Performance 3G (<2s)

**Decision**: Code-splitting mínimo (página única); lazy load Framer Motion apenas se bundle > budget; otimizar avatar (WebP, dimensões fixas); `preconnect` não necessário para links externos; limitar ícones importados (named imports from lucide).

**Rationale**: SC-001; bundle pequeno prioritário sobre animações pesadas.

**Alternatives considered**:
- **Remover Framer Motion se budget falhar**: aceito como fallback na implementação com CSS.
