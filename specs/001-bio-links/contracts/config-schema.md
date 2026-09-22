# Contract: Configuration Schema (`src/config.ts`)

**Version**: 1.0.0 | **Feature**: `001-bio-links`

## Purpose

Único arquivo editável pelo dono da página para personalizar conteúdo e aparência (FR-005, constitution III).

## Export

```typescript
import type { SiteConfig } from './types';

export const siteConfig: SiteConfig = { /* ... */ };
```

## Required shape

Ver `data-model.md` para campos completos.

## Allowed `LucideIconName` values (v1)

Ícones MUST existir em `src/lib/iconMap.ts`:

| Name | Uso típico |
|------|------------|
| `Link` | Link genérico |
| `Globe` | Website |
| `Github` | GitHub |
| `Gitlab` | GitLab |
| `Linkedin` | LinkedIn |
| `Twitter` | X / Twitter |
| `Instagram` | Instagram |
| `Youtube` | YouTube |
| `Twitch` | Twitch |
| `Mail` | E-mail |
| `MessageCircle` | WhatsApp / chat |
| `BookOpen` | Curso / blog |
| `ShoppingBag` | Loja |
| `Calendar` | Agendamento |
| `FileText` | Portfolio / PDF |

Adicionar novo ícone: atualizar union em `types.ts` + entrada em `iconMap.ts` (código, não config).

## Example (minimal valid config)

```typescript
export const siteConfig: SiteConfig = {
  profile: {
    name: 'Alex Silva',
    handle: '@alexsilva',
    bio: 'Desenvolvedor e criador de conteúdo.',
    avatarUrl: '/src/assets/avatar.jpg',
  },
  links: [
    {
      id: 'portfolio',
      title: 'Portfólio',
      url: 'https://example.com',
      icon: 'Globe',
      highlighted: true,
    },
  ],
  socialLinks: [
    {
      id: 'github',
      title: 'GitHub',
      url: 'https://github.com/example',
      icon: 'Github',
    },
  ],
  theme: {
    primary: '#6366f1',
    background: '#0f172a',
    buttonBackground: '#1e293b',
    buttonText: '#f8fafc',
  },
  meta: {
    title: 'Alex Silva — Links',
    description: 'Todos os meus links em um só lugar.',
    ogImage: 'https://example.com/og.png',
    lang: 'pt-BR',
  },
};
```

## Validation rules (build / runtime)

| Rule | Enforcement |
|------|-------------|
| URLs must start with `http://` or `https://` | `prepareLinks` drops invalid |
| `id` unique within each array | Developer responsibility; duplicate keys warn in dev |
| Icon name in union | TypeScript compile error |
| Theme colors valid CSS | Runtime: invalid colors ignored by browser; document in quickstart |

## Breaking changes

- v1.x: adding optional fields is non-breaking.
- v2.0: renaming fields requires migration note in CHANGELOG.
