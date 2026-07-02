# directives/ui-professional.md
> SOP: Professional UI Website Build
> Follow this process for every website, landing page, dashboard, or web component.
> Never skip phases. Design system comes before code. Audit comes before delivery.

---

## Required Before Starting

Confirm all of these from `prd.md` before doing anything:

- Project type (SaaS landing page, portfolio, dashboard, e-commerce, agency site, etc.)
- Target audience
- Tech stack — if not specified, default to: Next.js 15 + Tailwind CSS + TypeScript + shadcn/ui
- Design feel — if not specified, ask: "premium and minimal", "bold and editorial", "dark and technical", "warm and approachable"?

If any of these is missing and prd.md does not answer it, ask the user before proceeding.

---

## Skills to Have Active for This Task

Read `directives/skill-registry.md` and confirm these are installed:

```
Required for every UI build:
  @ui-ux-pro-max      → generates the design system (never skip this)
  @impeccable         → audit and polish commands
  @frontend-design    → production-grade component code

Add only if the project needs them:
  @threejs-webgl      → 3D scenes
  @gsap-scrolltrigger → scroll-based animations
  @motion-framer      → React component animations
  @emilkowalski-skill → animation quality review
```

---

## Phase 1 — Generate the Design System

This phase must complete before any code is written.

Run the design system generator using `@ui-ux-pro-max`:

```bash
# Generate and save directly to design-system/MASTER.md
python3 .agent/skills/ui-ux-pro-max/scripts/search.py \
  "[describe the project in detail]" \
  --design-system --persist -p "[Project Name]"
```

The generated `design-system/MASTER.md` will contain:

- **UI style** — the recommended visual language (e.g. Soft UI Evolution, Neubrutalism, Corporate Minimal, Editorial Brutalism)
- **Color palette** — primary, secondary, CTA, background, surface, text — with hex values and semantic names
- **Typography pairing** — two Google Fonts with URLs, assigned roles (display/heading vs body)
- **Layout pattern** — the recommended page structure (Hero-Centric, Feature-Rich Showcase, Trust and Authority, Minimal Conversion, etc.)
- **Key effects** — which effects fit this project (glass, gradient, grain, shadow depth, etc.)
- **Anti-patterns for this industry** — what specifically to avoid for this project type

Before moving to Phase 2, verify:
```
✓ Font is not Inter, Roboto, Arial, or system-ui
✓ Colors will be defined as semantic CSS variables, not raw hex
✓ Anti-patterns list is noted
```

---

## Phase 2 — Define Design Tokens

Create the CSS variable foundation before building any component.

Structure:
```css
:root {
  /* Color — use values from design-system/MASTER.md */
  --color-background: ;
  --color-surface: ;
  --color-surface-raised: ;
  --color-brand: ;
  --color-brand-soft: ;
  --color-success: ;
  --color-error: ;
  --color-warning: ;
  --color-text: ;
  --color-text-muted: ;
  --color-border: ;

  /* Typography — use fonts from design-system/MASTER.md */
  --font-display: ;
  --font-body: ;

  /* Border radius */
  --radius-sm: ;
  --radius-md: ;
  --radius-lg: ;
  --radius-full: 9999px;

  /* Transition */
  --transition-fast: 150ms ease-out;
  --transition-base: 200ms ease-out;
  --transition-slow: 300ms ease-out;
}
```

Every value must come from `design-system/MASTER.md`. No hardcoded hex values anywhere else.

---

## Phase 3 — Build Components

Build in this exact order. Do not skip ahead to page content before base components exist.

```
1. Design tokens (Phase 2 — already done)
2. Base components: Button (all variants), Input, Textarea, Select, Checkbox, Badge, Tag
3. Compound components: Card, Alert, Modal, Tooltip, Dropdown
4. Layout: Navigation (desktop + mobile), Footer, Section containers, Grid system
5. Page sections: Hero, Features, Pricing, Testimonials, CTA, FAQ
6. Animations and micro-interactions
7. Responsive adjustments: 375px → 768px → 1024px → 1440px
```

### Standards for every component

**States — build all of them, every time:**
```
Default → Hover → Active → Focus → Disabled → Loading → Error (where applicable)
```

**Spacing — 4px scale only:**
```
Use values from this set: 4, 8, 12, 16, 24, 32, 48, 64, 80px
No other values. If something needs 10px, use 8px or 12px.
```

**Typography — from MASTER.md:**
```
Display:  48–56px — hero only
Heading:  32–36px — section titles
Sub:      20–24px — card titles
Body:     15–16px — all text (16px preferred)
Small:    13–14px — supporting text
Caption:  11–12px — meta, timestamps
```

**Icons:**
SVG only. Use Heroicons or Lucide. Never use emojis as icons.

**Interactions:**
- Every clickable element: `cursor-pointer`
- Hover transitions: use `--transition-fast` (150ms) or `--transition-base` (200ms)
- Button press: slight scale down (0.97) on active
- Input focus: visible ring using the brand color at low opacity

**Motion:**
- Ease-out for elements entering the viewport
- Ease-in for elements leaving
- Stagger page load reveals: 50–80ms delay between children
- Always add `@media (prefers-reduced-motion: reduce)` with simplified or no animation

---

## Phase 4 — Audit and Polish

After the build is complete, run these commands using `@impeccable`. Do not skip any step.

```
Step 1: /audit [page name]
        → finds technical issues, broken states, accessibility problems
        → fix everything flagged as critical before continuing

Step 2: /critique [page name]
        → UX design review — hierarchy, layout, readability, flow
        → address the main issues raised

Step 3: /typeset [page name]
        → verifies font sizes, weights, line heights, letter spacing
        → fix any type hierarchy issues

Step 4: /layout [page name]
        → checks spacing rhythm, alignment, visual flow
        → fix any spacing inconsistencies

Step 5: /states [interactive component]
        → verifies all interactive states exist and are correct
        → run on every button, input, card, and link

Step 6: /accessibility [page name]
        → checks ARIA labels, focus order, screen reader compatibility
        → fix any critical accessibility issues

Step 7: /animate [component]
        → only if animations have not been added yet
        → adds purposeful motion with correct easing

Step 8: /polish [page name]
        → final pass: tightens everything, smooths rough edges
        → run this last, after all other commands
```

If the design feels too generic or safe after polishing, run:
```
/bolder [section]     → amplifies the design character
/overdrive [component]→ adds technically extraordinary effects to showcase moments
```

---

## Phase 5 — Pre-Delivery Verification

Run the CLI scanner first:
```bash
npx impeccable detect src/
```
Fix every critical issue it reports before proceeding.

Then verify every item in this checklist manually:

```
□ No emoji icons anywhere — SVG only (Heroicons or Lucide)
□ cursor-pointer on every clickable element
□ Hover transitions present and smooth (150–300ms)
□ Text contrast: minimum 4.5:1 in light mode
□ Focus styles visible and usable for keyboard navigation
□ prefers-reduced-motion respected — animations simplified or disabled
□ Tested at 375px (mobile): no overflow, no broken layouts
□ Tested at 768px (tablet): layout adapts correctly
□ Tested at 1024px (desktop): correct layout
□ Tested at 1440px (wide): no excessive stretching, max-width applied
□ All component states: default, hover, active, focus, disabled, loading
□ Error states exist for all forms and interactive elements
□ Empty states exist for all lists and data views
□ No hardcoded hex values — CSS variables used everywhere
□ No spacing values outside the 4px scale
□ No generic AI aesthetics — no purple gradients, no Inter font, no nested cards
□ npx impeccable detect src/ — zero critical issues
```

Do not deliver until every box is checked. If something cannot pass, explain why to the user before delivering.

---

## Premium Effects Reference

### Glass card
```css
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.15);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
```

### Layered shadow (depth without heaviness)
```css
box-shadow:
  0 1px 2px rgba(0, 0, 0, 0.04),
  0 4px 12px rgba(0, 0, 0, 0.06),
  0 12px 32px rgba(0, 0, 0, 0.08);
```

### Premium gradient
```css
background: linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-soft) 100%);
```

### Modal entrance
```
Initial:  scale 0.94, opacity 0, backdrop blur 0
Final:    scale 1.0, opacity 1, backdrop blur 12px
Easing:   spring (stiffness 300, damping 30) or cubic-bezier(0.34, 1.56, 0.64, 1)
Stagger:  modal content children enter 60ms apart
Exit:     scale 0.96, opacity 0, ease-in, 150ms
```

---

## Edge Cases

**No design feel specified:** Ask before generating. The design system depends on it.

**No tech stack specified:** Default to Next.js 15 + Tailwind CSS + TypeScript + shadcn/ui. State this assumption explicitly.

**Project needs 3D or advanced animation:** Load `@threejs-webgl` or `@gsap-scrolltrigger` from skill-registry before Phase 3. Install first.

**Page-specific design override:** If `design-system/pages/[page-name].md` exists, its rules override `MASTER.md` for that page only.

**Error during build:** Self-anneal — fix it, test, update this file with what you learned.

**Design output feels generic after polishing:** Run `/bolder` and try a completely different font pairing from Google Fonts.

**New session mid-project:** Read AGENTS.md and design-system/MASTER.md before continuing. Do not rely on memory from a previous session.

---

## Learnings

Update this section whenever you discover a better approach, an API constraint, a timing issue, or an edge case:

```
[date] → [what you learned and what changes as a result]
```
