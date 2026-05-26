# Data Model: Página de Bio Links

**Feature**: `001-bio-links` | **Date**: 2026-05-25

## Overview

Fonte única de verdade: `src/config.ts` exporta `siteConfig: SiteConfig`. Tipos em `src/types.ts`. Transformações (filtro de URLs, resolução de ícones) em `src/lib/*`, nunca em `components/`.

## Entities

### SiteConfig (raiz)

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `profile` | `Profile` | sim | Identidade no topo da página |
| `links` | `LinkItem[]` | sim | Botões principais (ordem = ordem de exibição) |
| `socialLinks` | `LinkItem[]` | não | Ícones sociais (extensão do plano; ver research R6) |
| `theme` | `Theme` | sim | Paleta visual |
| `meta` | `Meta` | sim | SEO e compartilhamento |

### Profile

| Campo | Tipo | Obrigatório | Validação / regras |
|-------|------|-------------|-------------------|
| `name` | `string` | sim | Não vazio; exibido como título principal |
| `handle` | `string` | sim | Ex.: `@usuario`; truncar visualmente se > 32 chars |
| `bio` | `string` | sim | Texto curto; quebra de linha permitida; max recomendado 160 chars |
| `avatarUrl` | `string` | sim | URL absoluta ou caminho relativo a `src/assets/`; fallback se load falhar |

**Relacionamentos**: 1 Profile por SiteConfig; usado por `ProfileCard`.

### LinkItem

| Campo | Tipo | Obrigatório | Validação / regras |
|-------|------|-------------|-------------------|
| `id` | `string` | sim | Único na lista; estável para keys React |
| `title` | `string` | sim | Rótulo visível e `aria-label` base |
| `url` | `string` | sim | Deve ser URL válida (`http://` ou `https://`); inválidos filtrados em `prepareLinks` |
| `icon` | `LucideIconName` | sim | Nome do ícone no mapa lucide |
| `highlighted` | `boolean` | não | Estilo destacado (borda/sombra) |

**Relacionamentos**: N links por SiteConfig; N sociais opcionais em `socialLinks`.

**State transitions**: N/A (dados estáticos). Em runtime: link omitido se URL inválida após filtro.

### Theme

| Campo | Tipo | Obrigatório | Validação / regras |
|-------|------|-------------|-------------------|
| `primary` | `string` | sim | Cor CSS (#hex ou rgb) |
| `background` | `string` | sim | Fundo da página |
| `buttonBackground` | `string` | sim | Fundo dos botões |
| `buttonText` | `string` | sim | Texto dos botões |

**Aplicação**: `App` ou helper `applyTheme(theme)` define CSS variables no `document.documentElement` conforme `design-system.md`.

**Derivados** (não no config, calculados ou fixos em CSS):
- `--color-text`, `--color-muted` — derivar com `color-mix` ou valores fixos documentados no quickstart se contraste do tema for insuficiente.

### Meta

| Campo | Tipo | Obrigatório | Validação / regras |
|-------|------|-------------|-------------------|
| `title` | `string` | sim | `<title>` e og:title |
| `description` | `string` | sim | meta description, og:description |
| `ogImage` | `string` | não | URL absoluta da imagem de preview |
| `lang` | `string` | não | BCP 47, default `pt-BR` — atributo `lang` em `<html>` |
| `canonicalUrl` | `string` | não | URL canônica da página publicada |

### LucideIconName

Union type string literal dos ícones permitidos no `iconMap` (ex.: `"Link"`, `"Github"`, `"Instagram"`, `"Youtube"`, `"Mail"`, `"MessageCircle"`, …). Lista fechada documentada em `contracts/config-schema.md`.

## Empty / edge states

| Condição | Comportamento |
|----------|---------------|
| `links` vazio após filtro | Exibir perfil + mensagem “Nenhum link disponível” |
| `socialLinks` ausente ou vazio | Não renderizar `SocialIcons` |
| `avatarUrl` inválido | Fallback iniciais do `name` |
| Bio/título longos | `line-clamp` ou wrap sem sobrepor botões |
| Cores baixo contraste | Publicar; quickstart alerta dono |

## TypeScript definitions (reference)

```typescript
// src/types.ts (canonical)
export type LucideIconName = /* union documented in contracts */;

export interface Profile {
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: LucideIconName;
  highlighted?: boolean;
}

export interface Theme {
  primary: string;
  background: string;
  buttonBackground: string;
  buttonText: string;
}

export interface Meta {
  title: string;
  description: string;
  ogImage?: string;
  lang?: string;
  canonicalUrl?: string;
}

export interface SiteConfig {
  profile: Profile;
  links: LinkItem[];
  socialLinks?: LinkItem[];
  theme: Theme;
  meta: Meta;
}
```

## Component prop mapping

| Componente | Props (de types.ts) | Origem dos dados |
|------------|---------------------|------------------|
| `ProfileCard` | `profile: Profile` | `config.profile` |
| `LinkList` | `links: LinkItem[]` | `prepareLinks(config.links)` |
| `LinkButton` | `link: LinkItem` | filho de LinkList |
| `SocialIcons` | `links: LinkItem[]` | `prepareLinks(config.socialLinks ?? [])` |
| `App` | `config: SiteConfig` | import `siteConfig` |
