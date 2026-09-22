# Contract: Static HTML Head & Structured Data

**Feature**: `001-bio-links` | **Build output**: `dist/index.html`

## Source

All values from `siteConfig.meta` and `siteConfig.profile` at build time.

## Required tags

| Tag | Source |
|-----|--------|
| `<html lang="...">` | `meta.lang` ?? `pt-BR` |
| `<title>` | `meta.title` |
| `<meta name="description" content="...">` | `meta.description` |
| `<link rel="canonical" href="...">` | `meta.canonicalUrl` if set |
| `<meta property="og:title" content="...">` | `meta.title` |
| `<meta property="og:description" content="...">` | `meta.description` |
| `<meta property="og:type" content="profile">` | constant |
| `<meta property="og:image" content="...">` | `meta.ogImage` if set |
| `<meta name="twitter:card" content="summary_large_image">` | constant |

## JSON-LD (embedded script)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@type": "Person",
    "name": "<profile.name>",
    "description": "<profile.bio>",
    "image": "<profile.avatarUrl absolute>",
    "sameAs": ["<urls from links + socialLinks>"]
  }
}
```

## Favicon

Static file in `public/favicon.ico` (not config-driven in v1).

## Verification

- [ ] View source of `dist/index.html` contains all required tags
- [ ] Open Graph debugger / WhatsApp preview shows title + description
- [ ] JSON-LD validates in Google Rich Results Test (optional)
