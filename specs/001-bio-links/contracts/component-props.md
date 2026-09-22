# Contract: React Component Props

**Feature**: `001-bio-links` | **Presentation-only** (constitution II)

## ProfileCard

```typescript
interface ProfileCardProps {
  profile: Profile;
}
```

**Behavior**:
- Render avatar (`img` com `alt={profile.name}`), name, handle, bio.
- On image error: show initials avatar fallback.
- No URL fetching logic; no config import inside component.

## LinkButton

```typescript
interface LinkButtonProps {
  link: LinkItem;
}
```

**Behavior**:
- Render `<a href={link.url} target="_blank" rel="noopener noreferrer">`.
- Visible: icon + `link.title`.
- `aria-label`: `link.title` (sufficient if title visible).
- Apply `highlighted` variant classes per `design-system.md`.
- No URL validation inside component.

## LinkList

```typescript
interface LinkListProps {
  links: LinkItem[];
}
```

**Behavior**:
- Map `links` to `LinkButton` with `key={link.id}`.
- If empty: render null or let parent show empty state (parent `App` owns empty message).

## SocialIcons

```typescript
interface SocialIconsProps {
  links: LinkItem[];
}
```

**Behavior**:
- If `links.length === 0`, return `null`.
- Each item: icon-only button link; `aria-label={link.title}`.
- Same `target`/`rel` as LinkButton.

## App

```typescript
// No props — imports siteConfig and applies theme
```

**Behavior**:
- Import `siteConfig` from `config.ts`.
- Call `prepareLinks` for main and social arrays.
- Apply theme CSS variables once on mount.
- Compose: ProfileCard → LinkList → SocialIcons (optional).
- Empty links: show friendly message below profile.

## Framer Motion wrapper (optional internal)

`MotionSection` in `App` or thin wrapper — not exported; respects `prefers-reduced-motion`.
