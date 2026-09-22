# Design System — Bio Links

Fonte absoluta de tokens visuais (constitution V). Componentes MUST consumir estes valores via CSS custom properties em `src/styles/globals.css` e utilitários Tailwind mapeados a essas variáveis — não valores mágicos ad hoc em JSX.

## Princípios

- **Mobile-first**: base 320px; escala para cima.
- **Uma coluna centralizada**: largura máxima de conteúdo confortável em desktop.
- **Contraste WCAG 2.1 AA** para texto normal e controles.
- **Tema via config**: cores semânticas do `Theme` em `config.ts` sobrescrevem tokens de marca; tokens estruturais (espaçamento, raio, tipografia) permanecem fixos.

## CSS Custom Properties (estruturais)

Definir em `src/styles/globals.css` no `:root`:

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-sans` | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | Corpo e UI |
| `--font-size-xs` | `0.75rem` (12px) | Handle, metadados auxiliares |
| `--font-size-sm` | `0.875rem` (14px) | Bio |
| `--font-size-base` | `1rem` (16px) | Botões, corpo |
| `--font-size-lg` | `1.25rem` (20px) | Nome do perfil |
| `--font-size-xl` | `1.5rem` (24px) | Título hero (opcional) |
| `--line-height-tight` | `1.25` | Nome |
| `--line-height-normal` | `1.5` | Bio, botões |
| `--space-1` | `0.25rem` (4px) | Micro |
| `--space-2` | `0.5rem` (8px) | Entre ícone e texto |
| `--space-3` | `0.75rem` (12px) | Padding interno compacto |
| `--space-4` | `1rem` (16px) | Padding padrão |
| `--space-5` | `1.25rem` (20px) | Entre seções pequenas |
| `--space-6` | `1.5rem` (24px) | Entre blocos |
| `--space-8` | `2rem` (32px) | Margem vertical de seção |
| `--radius-sm` | `0.5rem` (8px) | Ícones sociais |
| `--radius-md` | `0.75rem` (12px) | Botões de link |
| `--radius-full` | `9999px` | Avatar |
| `--shadow-sm` | `0 1px 2px rgb(0 0 0 / 0.05)` | Botão em repouso |
| `--shadow-md` | `0 4px 12px rgb(0 0 0 / 0.08)` | Botão destacado / hover |
| `--content-max-width` | `24rem` (384px) | Coluna principal |
| `--avatar-size` | `5rem` (80px) | Foto de perfil |
| `--touch-min` | `2.75rem` (44px) | Altura mínima de alvo de toque |
| `--icon-size-sm` | `1.25rem` (20px) | Ícone em botão |
| `--icon-size-md` | `1.5rem` (24px) | Ícone social |
| `--transition-fast` | `150ms ease` | Hover/focus |
| `--transition-base` | `250ms ease` | Entrada Framer Motion |

## Cores semânticas (dinâmicas via Theme)

Mapear de `config.ts` → variáveis no `:root` ou wrapper:

| Token config | CSS variable | Uso |
|--------------|--------------|-----|
| `theme.primary` | `--color-primary` | Acento, links sociais ativos |
| `theme.background` | `--color-bg` | Fundo da página |
| `theme.buttonBackground` | `--color-button-bg` | Fundo dos botões |
| `theme.buttonText` | `--color-button-text` | Texto dos botões |
| (derivado) | `--color-text` | Nome e bio — contraste ≥4.5:1 com `--color-bg` |
| (derivado) | `--color-muted` | Handle — contraste ≥4.5:1 com `--color-bg` |
| (fixo fallback) | `--color-focus-ring` | `color-mix(in srgb, var(--color-primary) 60%, white)` |

**Regra de contraste**: ao aplicar cores do tema, validar manualmente ou documentar no quickstart; se contraste insuficiente, documentação MUST alertar o dono.

## Tipografia

| Elemento | Tamanho | Peso | Cor |
|----------|---------|------|-----|
| Nome (`ProfileCard`) | `--font-size-lg` | 600 (semibold) | `--color-text` |
| Handle | `--font-size-xs` | 400 | `--color-muted` |
| Bio | `--font-size-sm` | 400 | `--color-text` |
| Botão de link | `--font-size-base` | 500 (medium) | `--color-button-text` |

## Layout

```
┌─────────────────────────────────────┐
│           (viewport full)          │
│    ┌─────────────────────────┐     │
│    │      ProfileCard        │     │
│    │   avatar + name + bio   │     │
│    ├─────────────────────────┤     │
│    │      LinkList           │     │
│    │   [ LinkButton ] × n    │     │
│    ├─────────────────────────┤     │
│    │     SocialIcons         │     │
│    │   icon row (optional)   │     │
│    └─────────────────────────┘     │
│         max-width: 384px           │
│         padding: space-4 sides     │
└─────────────────────────────────────┘
```

- Padding horizontal da página: `--space-4` (16px); em ≥640px manter centralizado.
- Gap entre botões: `--space-3`.
- Gap entre avatar e nome: `--space-4`.
- Social icons: flex row, gap `--space-4`, justify center.

## Componentes

### Avatar

- Tamanho: `--avatar-size`; `border-radius: var(--radius-full)`.
- `object-fit: cover`; fallback: iniciais em círculo com fundo `--color-primary` e texto branco.

### LinkButton

- Largura: 100% da coluna; min-height: `--touch-min`.
- Padding: `--space-4` vertical, `--space-4` horizontal.
- Border-radius: `--radius-md`.
- Fundo: `--color-button-bg`; texto: `--color-button-text`.
- Ícone à esquerda (`--icon-size-sm`), gap `--space-2`.
- Variante `highlighted`: borda 2px `--color-primary` ou sombra `--shadow-md`.
- Estados: `:hover` escurecer 5%; `:focus-visible` outline 2px `--color-focus-ring` offset 2px.
- `target="_blank"` + `rel="noopener noreferrer"`.

### SocialIcons

- Apenas ícone (sem título visível); `aria-label` = nome da rede.
- Tamanho do alvo: mínimo `--touch-min` (padding incluso).
- Cor: `--color-primary` ou `--color-muted` em repouso; hover `--color-text`.

### Animações (Framer Motion)

- Entrada da página: stagger children 0.05s, `opacity` 0→1, `y` 8→0, duration 0.35s, `easeOut`.
- Respeitar `prefers-reduced-motion: reduce` — desabilitar animações.

## Breakpoints (referência Tailwind)

| Nome | Min-width | Notas |
|------|-----------|-------|
| (base) | 0 | 320px+ validado |
| `sm` | 640px | Mais respiro lateral |
| `md` | 768px | Opcional; coluna ainda `--content-max-width` |

## Acessibilidade

- Foco visível em todos os interativos.
- Ordem de tab: perfil (se link) → links na ordem da lista → sociais.
- `alt` no avatar = nome ou valor configurado.
- Contraste mínimo 4.5:1 texto normal; 3:1 para UI grande.

## SEO / meta (não visual)

- Ver `contracts/seo-head.md` — tokens visuais não aplicam; metadados vêm de `config.meta`.
