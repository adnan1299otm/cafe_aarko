## 5. Design System (MASTER)

**UI style:** *Moody Editorial × Warm Cinematic* — dark, layered surfaces; confident warm-amber brand color pulled directly from the restaurant's own pendant lighting; a cooler teal secondary pulled from the real accent wall, used sparingly for contrast.

**Layout pattern:** Hero-Centric with Story-Driven Scroll (home page), Trust-and-Authority pattern for the Menu/Visit Us pages.

### 5.1 Color — semantic tokens

| Token | Hex | Use |
|---|---|---|
| `--color-background` | `#120E0C` | page background — warm near-black |
| `--color-surface` | `#1C1613` | card/panel background |
| `--color-surface-raised` | `#262019` | elevated surfaces, dropdowns, tooltips |
| `--color-border` | `#3A2F27` | dividers, outlines |
| `--color-brand` | `#E3A23C` | primary CTA, brand accents |
| `--color-brand-soft` | `#F0C97D` | hover states, subtle tints |
| `--color-brand-50` … `--color-brand-900` | `#FBF3E4` → `#5C3A12` | 9-step scale |
| `--color-accent-teal` | `#2E7C6D` | secondary accent |
| `--color-text` | `#F5EFE6` | primary text — warm off-white |
| `--color-text-muted` | `#B8AA98` | secondary text |
| `--color-success` | `#6FBF73` | confirmation states |
| `--color-error` | `#E2604F` | error states |
| `--color-warning` | `#D9A441` | caution states |

### 5.2 Typography

| Role | Font | Notes |
|---|---|---|
| Display / Headings | **Fraunces** | warm, expressive serif |
| Body / UI | **Plus Jakarta Sans** | clean geometric-humanist sans |

**Type scale**:
| Role | Size | Notes |
|---|---|---|
| Display | `clamp(2.25rem, 5vw, 3.5rem)` (≤56px) | hero only |
| Heading | `clamp(1.75rem, 3.5vw, 2.25rem)` (36px) | section titles |
| Sub | 24px | card titles |
| Body | 16px | all readable text |
| Small | 14px | supporting text |
| Caption | 12px | meta, prices-as-labels, timestamps |

Line height: body 1.5–1.6, headings 1.1–1.25, display 1.05. Headings tighten letter-spacing −0.01 to −0.02em.

### 5.3 Spacing, radius, motion tokens

Spacing: strict 4px scale — `4, 8, 12, 16, 24, 32, 48, 64, 80` px. No other values anywhere.
Radius: `--radius-sm: 6px`, `--radius-md: 12px`, `--radius-lg: 20px`, `--radius-full: 9999px`.

```css
--transition-fast: 150ms ease-out;
--transition-base: 200ms ease-out;
--transition-slow: 300ms ease-out;
```

### 5.4 Key effects

**Glass surface**:
```css
background: rgba(245, 239, 230, 0.08);
backdrop-filter: blur(20px);
border: 1px solid rgba(245, 239, 230, 0.15);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
```

**Layered shadow**:
```css
box-shadow:
  0 1px 2px rgba(0, 0, 0, 0.04),
  0 4px 12px rgba(0, 0, 0, 0.06),
  0 12px 32px rgba(0, 0, 0, 0.08);
```

**Modal entrance**: scale 0.94→1.0 with spring, backdrop blur 0→12px.

### 5.5 Anti-patterns specific to this project
- No stock-photo "smiling friends toasting glasses" imagery
- No intrusive "Book a Table Now!" popup on load.
- No SaaS-style pricing-table cards for menu items.
- No autoplay video with sound.
- Zero emoji anywhere.
