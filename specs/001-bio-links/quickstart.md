# Quickstart: Bio Links

**Feature**: `001-bio-links` | **Branch**: `001-bio-links`

## Prerequisites

- Node.js 20+
- npm 10+

## 1. Install dependencies

```bash
npm install
```

Stack: React 19, TypeScript, Vite, Tailwind CSS 4, lucide-react, framer-motion.

## 2. Customize your page

Edit **only** `src/config.ts`:

1. Update `profile` (name, handle, bio, `avatarUrl`).
2. Add/remove/reorder entries in `links`.
3. Optional: add `socialLinks` for the icon row.
4. Set `theme` colors (check contrast — see below).
5. Set `meta` for SEO and link previews.

Replace `src/assets/avatar.jpg` with your photo or point `avatarUrl` to a public URL (import the asset in `config.ts` for bundled images).

See `contracts/config-schema.md` for allowed icon names and full example.

### Contrast warning

Theme colors in `theme` MUST keep readable text on the page background. Validate with DevTools or a contrast checker:

- **Normal text** (bio, name): at least **4.5:1** against `background`.
- **Large UI** (buttons): at least **3:1** for `buttonText` on `buttonBackground`.

If `buttonText` on `background` is too low contrast for bio text, lighten `buttonText` or darken `background`. The app derives `--color-text` and `--color-muted` from your theme — poor choices still fail WCAG.

## 3. Local preview

```bash
npm run dev
```

Open the URL shown (default `http://localhost:5173`). Test at 320px width (DevTools device toolbar).

## 4. Build

```bash
npm run build
```

Output: `dist/` — static files ready for any CDN.

Typecheck only:

```bash
npm run typecheck
```

### GitHub Pages (subpath)

If deploying to `https://<user>.github.io/<repo>/`, use the project build script (base path matches repository name `my-project-speckit`):

```bash
npm run build:pages
```

Equivalent manual override (any OS):

```bash
# Windows PowerShell
$env:BASE_PATH="/my-project-speckit/"; npm run build
```

```bash
# macOS / Linux
BASE_PATH=/my-project-speckit/ npm run build
```

`vite.config.ts` reads `process.env.BASE_PATH` (defaults to `/`). `build:pages` passes `--base /my-project-speckit/` to Vite. Asset paths in `dist/` will include the subpath prefix.

## 5. Deploy

### GitHub Pages (gh-pages branch)

Project site at `https://<user>.github.io/<repo>/` (recommended):

```bash
npm run deploy:pages
```

Runs `build:pages` then publishes `dist/` to the `gh-pages` branch.

User/org site at root (`https://<user>.github.io/`):

```bash
npm run deploy
```

Enable GitHub Pages from the `gh-pages` branch in repository settings.

### Vercel

1. Import the repository.
2. Framework preset: **Vite**.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Root directory: repository root (default)

No environment variables required for runtime (static export).

### Netlify

1. Connect the repository.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. No plugins or server-side redirects required for this SPA (single `index.html`).

## 6. Accessibility checklist

- [ ] Tab through all links — focus ring visible
- [ ] Screen reader announces each link title
- [ ] Avatar has meaningful `alt`
- [ ] Contrast ≥ 4.5:1 for bio text on background

## 7. Performance check

- DevTools → Network → Slow 3G → reload: profile + first button visible < 2s

## 8. End-to-end validation

- [ ] `npm run dev` — page loads with profile and links
- [ ] `npm run typecheck` — no TypeScript errors
- [ ] `npm run build` — succeeds; `dist/index.html` has OG meta and JSON-LD
- [ ] Viewport 320px — no horizontal scroll; buttons are tappable
- [ ] Slow 3G — profile + first link usable quickly
- [ ] Optional: `npm run deploy` or upload `dist/` to Vercel/Netlify

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Broken images on GitHub Pages | Set `BASE_PATH` to repo subpath; use imported assets in `config.ts` |
| Link missing | Check URL starts with `https://` |
| Icon not showing | Use name from `contracts/config-schema.md` |
| OG preview wrong | Rebuild after changing `meta`; clear cache in social apps |
