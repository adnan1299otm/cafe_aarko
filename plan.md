# plan.md — Cafe Aarko Website Project Plan

> Authored by Claude in the planner/PM role. This is the single source of truth for
> **design direction**, **site architecture**, and **tooling strategy**.
> `PROJECT_START.md` is the companion execution-sequence file — it tells the agent
> *what to build, in what order*, and holds the full structured menu data.
> Read this file fully before writing any code.

---

## 1. Project Snapshot

**Client:** Cafe Aarko (ক্যাফে আর্ক) — a fusion casual-dining restaurant in Sylhet, Bangladesh.
**Deliverable:** A premium, animation-rich marketing + digital-menu website. **Frontend only** — no backend, no CMS, no database, no working form submissions. All content is static/hardcoded from the data in this file set. Backend (reservations, live ordering, CMS) is an explicitly separate future phase.
**Location:** Sylco Tower Shopping Mall, Besides Brac Bank, Ahmed Trade Centre, Baruthkhana Rd, Sylhet 3100. Plus Code: VVWC+4R Sylhet.
**Positioning:** Casual-premium dine-in, ৳200–800 per person, wide fusion menu (Continental, Chinese, Thai, Mexican, Indian, Middle-Eastern-style kebabs, pizza, pasta). Rating 4.1★ (692 Google reviews). Services: Dine-in, Drive-through, No-contact delivery, FoodPanda delivery.
**Brand line (from physical menu):** "Expect the best and taste the myth."
**Tone target:** Confident, warm, a little theatrical — *not* sterile fine-dining minimalism (the space itself is a vibrant, mural-covered, warmly-lit hangout spot, not a quiet white-tablecloth restaurant). "Premium" here means *elevated presentation of an eclectic, energetic brand* — not corporate minimalism.
**Language:** English only, everywhere in the UI — no Bengali text anywhere on the site (not headings, not labels, not the footer). This is a firm client requirement, not a stylistic default. The Bengali name (ক্যাফে আর্ক) is used only in *this planning document* to unambiguously identify the business — it does not appear on the live site.

---

## 2. Research Findings — Premium Web Design Direction (2026)

Applied directly into Section 5 (Design System) and Section 6 (Animation Strategy) below. Key takeaways:

- **Dark-cinematic is the dominant premium register** in 2026 award galleries — not flat dark mode, but layered dark surfaces with luminous, saturated accent color and controlled contrast. This matches Cafe Aarko's actual interior (dark ceiling, warm gold pendant lighting) far better than a light/minimal theme would.
- **Motion with restraint wins over motion-for-its-own-sake.** The best-reviewed sites (Lusion, Unseen Studio) use animation that *guides attention*, not decorative noise on every element. One well-orchestrated hero sequence beats twenty scattered micro-animations — this directly informed the "one flagship 3D-style hero, lighter touches elsewhere" approach below.
- **Scrollytelling / pinned scroll sections** are the standard technique for the "3D-ish" depth Adnan asked for, achieved via layered parallax + scale, not actual WebGL 3D models (which would be overkill and slow for a restaurant site). This matches the exact 3D recipe already given in `skill-registry.md` — full-width image expand-on-scroll, layered foreground/background for fake depth, differential parallax speeds, 0.6–1.2s cinematic timing.
- **Kinetic, oversized typography** replacing plain static headlines — variable fonts, text reveals on scroll, is now mainstream at the premium tier — applied to the Hero and section headers below.
- **Bento-grid layouts with active hover states** (tile expands / reveals on hover, not just a color change) are standard for showcasing multiple items at once — useful for the Signature Dishes and Gallery sections.
- **Glassmorphism is back but restrained** — used for functional surfaces (sticky nav, floating action dock) rather than decorating everything.

---

## 3. Research Findings — Antigravity Execution & Quota Strategy

This directly shapes the phased, checkpointed build approach in `PROJECT_START.md`.

- **Editor View (synchronous chat) burns quota fast**; the **Manager / Agent view ("Mission Control")** is built for exactly this kind of large autonomous task — dispatch this whole build there, not as an interactive back-and-forth in the editor chat.
- **IDE settings to configure once, before running the prompt** (Adnan should set these in Antigravity's Agent Manager configuration):
  - Development mode → **Agent-driven ("Autopilot")**, not Review-driven — otherwise the agent will keep stopping to ask permission, which directly conflicts with the "no confirmation needed" requirement.
  - Terminal Policy → **Auto**.
- **Context tightness matters more than model size.** Keeping the workspace scoped to this one fresh project (not a monorepo) and pinning only the 5 files + `/photo` avoids the "large monorepo rate-limit trap." This is also why the full menu data lives as plain text in `PROJECT_START.md` instead of images — the agent should **never re-parse the menu photos with vision calls**; the data is already transcribed once, here, for it.
- **File-based memory survives quota resets; chat memory does not.** Antigravity's working context (plan, task list) is stored in local session files, separate from the model quota — but the safest resilience strategy is what we're already doing: put everything durable into files (this plan, the phase checklist, git commits) rather than relying on the agent "remembering" earlier chat turns. If a quota window resets mid-build, a fresh session that re-reads these same 5 files + checks current repo state can resume exactly where it left off with zero re-explanation needed from Adnan.
- **Git checkpointing is the single best insurance policy.** `git init` + an initial commit before the first prompt, then a commit at the end of every phase (see `PROJECT_START.md` Section — Build Phases). If something breaks or a session is interrupted, nothing is lost and the agent can `git diff`/`git log` to see exactly where it stopped.
- **Model selection:** for this task, favor a stronger reasoning model (Claude Sonnet 4.6 or Gemini 3 Pro) for the initial structural/design-system pass (Phase 0–2, where mistakes are expensive to unwind), and it's fine to drop to a faster/lighter model for repetitive later work (e.g., transcribing the remaining menu categories once the pattern for the first category is established). Avoid the heaviest "High" thinking tier for routine repetitive phases — save it for anything genuinely ambiguous.
- **Self-QA without spending Adnan's time:** Antigravity's Browser Subagent can click through the live preview itself. Instruct the agent (done in `PROJECT_START.md`) to use it to verify each page after building, rather than asking Adnan to manually check every breakpoint — this both saves round-trips and matches the "no confirmation needed" instruction.

---

## 4. Assets Provided & Data Gaps

### 4.1 What Adnan supplies in `/photo` — real photos, Gallery-only

Recommended file naming (removes any ambiguity for the agent about which file is which):
```
photo/
  logo.png                (or logo.svg — brand mark/wordmark)
  environment-01.jpg       (mural wall dining area — already provided)
  environment-02.jpg       (teal wall booth seating — already provided)
  environment-03.jpg       (optional — add more anytime, same naming pattern)
```
**Scope restriction (firm client requirement):** every `environment-*` photo is real interior photography and may **only** appear on the `/gallery` page and inside the homepage's Gallery-teaser section (Section 6.1, item 4) — nowhere else on the site. Specifically, do **not** use a real environment photo as the Hero background or in the Brand Story strip. Those two spots use AI-generated imagery instead (Section 4.2). `logo.*` is exempt from this restriction and is used in the Navbar/Footer as normal.

### 4.2 AI-Generated Imagery Strategy

No food photography exists for this restaurant, and the Hero must not use a real interior photo (per 4.1). Both gaps are solved the same way: **generate the images**, using Antigravity's built-in image generation.

Antigravity ships with Gemini's integrated image model (marketed as "Nano Banana") wired directly into the agent — it can generate an image on demand and drop it straight into the project without any external tool or MCP. This is the mechanism Adnan means by "generate/stitch the image in Gemini." Use it directly; don't go looking for a separate image tool.

**What needs to be generated:**
1. **2–3 Hero carousel background images** (wide/landscape, ~1920×1080 or wider) — food-forward, styled to match the site's palette. See `PROJECT_START.md` Appendix B for ready-to-use prompts.
2. **6–8 Signature Dish photos** (roughly square or 4:3) — one per item in the homepage's Signature Dishes section (Section 6.1, item 3). Same appendix.

**Consistency is the whole game here.** Randomly-generated images that don't share lighting/color/style will read as cheap AI slop, not premium. Every prompt in Appendix B is built from one shared style anchor (dark moody backdrop, warm golden rim lighting, shallow depth of field, cinematic amber/charcoal color grade, no text, no watermark, no people) — always prepend that anchor, never generate an image without it. Generate all images in the same session/batch where possible so the model's style stays consistent across the set.

Save outputs to `public/images/generated/` (e.g. `hero-01.jpg`, `dish-aarko-special-pizza.jpg`) — see the updated folder structure in Section 11.

### 4.3 Known data gaps (flagged, not silently invented)
- **Full weekly opening hours are not known** — Google only shows "Opens 11 AM." Do not invent a full hours table (e.g., don't guess closing time or weekly variation). Display "Opens daily from 11 AM" or similar honest, minimal claim; Adnan can supply exact hours later.
- **Item #147 "Aarko Special Drink"** has no listed price on the physical menu. Display it without a price (e.g., "Ask your server") rather than inventing a number.
- **Item numbering on the source menu has one duplicate** (two items both labeled "101" in the Biriyani section). This is a decision, not a bug to "fix": **the live website should not display raw menu-book item numbers at all** — they're a dine-in/waitstaff convention, not something a modern menu page needs. Show Name → Description → Price only. This sidesteps the duplicate-numbering issue entirely.
- **Two-price items where the source doesn't label the ratio** (e.g., most Soups) are shown here as the two numbers exactly as printed; label them generically as "Regular / Large" in the UI. Where the source *does* label the ratio explicitly (Rice, Chowmein, Chicken sections say "1:1/1:3"), use that framing instead.
- **"Identifies as women-owned"** is a real, publicly-shown Google Business attribute. Optional inclusion: a small, tasteful mention (e.g., in the footer) — not a hero-level badge unless Adnan asks for more prominence. Left as a light-touch optional element; easy to remove.

### 4.4 Social, Contact & Map Data (verified, use directly)

```
Facebook:   https://www.facebook.com/Cafeaarko.bd/
Instagram:  https://www.instagram.com/cafeaarko.bd
```
**Map policy — one live embed sitewide, no exceptions.** The full interactive Google Maps iframe (`PROJECT_START.md` Appendix C) appears in exactly **one** place: the `/visit` page. Every other mention of location elsewhere on the site (Footer, Home page Visit Us strip) uses a lightweight "Get Directions" button instead — this link, not another iframe:
```
https://www.google.com/maps/dir/?api=1&destination=24.8953602,91.8720444
```
This opens Google Maps directly in a new tab with no API key required and no second/third iframe render anywhere on the site.

---

## 5. Design System (MASTER)

> If the `@ui-ux-pro-max` skill/script exists in this Antigravity project, it may still be run for a second opinion — but **do not block on it**. This section *is* the authoritative design system regardless of whether that script is available. Copy this section into `design-system/MASTER.md` at the start of Phase 1.

**UI style:** *Moody Editorial × Warm Cinematic* — dark, layered surfaces; confident warm-amber brand color pulled directly from the restaurant's own pendant lighting; a cooler teal secondary pulled from the real accent wall, used sparingly for contrast. Not neubrutalism, not corporate-minimal, not a generic "AI SaaS" look.

**Layout pattern:** Hero-Centric with Story-Driven Scroll (home page), Trust-and-Authority pattern for the Menu/Visit Us pages (clarity and findability take priority over spectacle once the visitor is past the hero).

### 5.1 Color — semantic tokens (define once in `globals.css`, use everywhere, never raw hex in components)

| Token | Hex | Use |
|---|---|---|
| `--color-background` | `#120E0C` | page background — warm near-black, never pure `#000` |
| `--color-surface` | `#1C1613` | card/panel background |
| `--color-surface-raised` | `#262019` | elevated surfaces, dropdowns, tooltips |
| `--color-border` | `#3A2F27` | dividers, outlines |
| `--color-brand` | `#E3A23C` | primary CTA, brand accents (pulled from pendant lighting) |
| `--color-brand-soft` | `#F0C97D` | hover states, subtle tints |
| `--color-brand-50` … `--color-brand-900` | `#FBF3E4` → `#5C3A12` | 9-step scale, generate by interpolating toward `--color-background` |
| `--color-accent-teal` | `#2E7C6D` | secondary accent (pulled from the real accent wall) — reserved for "trust" actions (Visit Us / Directions), never mixed with brand-amber on the same element |
| `--color-text` | `#F5EFE6` | primary text — warm off-white, never pure `#FFF` |
| `--color-text-muted` | `#B8AA98` | secondary text |
| `--color-success` | `#6FBF73` | confirmation states (Sonner toasts) |
| `--color-error` | `#E2604F` | error states |
| `--color-warning` | `#D9A441` | caution states — kept visually distinct from `--color-brand` despite the similar family |

**Gradient rule:** stay within ~60° of hue (amber → warm red-orange, e.g. `#E3A23C → #C6572F`), always at **135deg**, applied to the hero scrim and the primary CTA button background only. Never on body text.

### 5.2 Typography

Distinctive pairing, no Inter/Roboto/Arial/system-ui. English-only site (Section 4), so no Bengali-script font is needed — two fonts carry the whole system.

| Role | Font | Notes |
|---|---|---|
| Display / Headings | **Fraunces** (variable, `opsz`+`wght` axes) | warm, expressive serif — hero headline, section titles, eyebrow labels |
| Body / UI | **Plus Jakarta Sans** | clean geometric-humanist sans, pairs against Fraunces' warmth |

Load via `next/font/google` (self-hosted, zero layout shift) — not a CDN `<link>` tag:
```ts
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
```

**Type scale** (fluid via `clamp()`, ceiling respects the 56px hard cap):
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

Radius: `--radius-sm: 6px`, `--radius-md: 12px`, `--radius-lg: 20px`, `--radius-full: 9999px` — confident but not bubbly.

```css
--transition-fast: 150ms ease-out;
--transition-base: 200ms ease-out;
--transition-slow: 300ms ease-out;
```

### 5.4 Key effects (reused/adapted from `ui-professional.md`'s own Premium Effects Reference — kept consistent rather than re-invented)

**Glass surface** (sticky nav on scroll, mobile floating action dock) — tinted warm instead of pure white to match the palette:
```css
background: rgba(245, 239, 230, 0.08);
backdrop-filter: blur(20px);
border: 1px solid rgba(245, 239, 230, 0.15);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
```

**Layered shadow** (menu/dish cards): reuse verbatim from `ui-professional.md`:
```css
box-shadow:
  0 1px 2px rgba(0, 0, 0, 0.04),
  0 4px 12px rgba(0, 0, 0, 0.06),
  0 12px 32px rgba(0, 0, 0, 0.08);
```

**Modal / lightbox entrance** (Gallery lightbox) — reuse verbatim from `ui-professional.md`: scale 0.94→1.0 with spring (stiffness 300, damping 30) or `cubic-bezier(0.34, 1.56, 0.64, 1)`, backdrop blur 0→12px simultaneously, content children stagger in 60ms apart, exit scale 0.96 fade ease-in 150ms.

> **Note on the spring overshoot vs. the "no bounce/elastic" anti-pattern in `AGENTS.md`:** these are not in conflict. The anti-pattern rule targets cartoonish, repeated bounce/elastic easing on ordinary UI (buttons, cards). The modal-entrance spring above produces a single, subtle overshoot-then-settle — a deliberate, scoped exception for this one premium interaction moment, not a blanket permission to use bouncy easing elsewhere.

### 5.5 Anti-patterns specific to this project

- No stock-photo "smiling friends toasting glasses" imagery — use only Adnan's real interior photos.
- No intrusive "Book a Table Now!" popup on load.
- No SaaS-style pricing-table cards for menu items — this is food, not subscription tiers; menu cards need food-appropriate hierarchy (name leads, price is secondary, not a giant "$X/mo" treatment).
- No autoplay video with sound.
- Do not present all 152 menu items as one flat undifferentiated list — strong category navigation is mandatory given the volume.
- Zero emoji anywhere — not in UI, not in code comments. Use Lordicon / Iconsax / Lucide only, per Section 6.

---

## 6. Sitemap & Page Breakdown

Four pages + shared Navbar/Footer. Rationale: the homepage carries the "wow" scroll-cinematic experience; Menu is deliberately more utilitarian (152 items need findability over spectacle); Gallery and Visit Us are lighter supporting pages.

```
/                → Home
/menu            → Full interactive menu
/gallery         → Ambience gallery
/visit           → Location, hours, contact
```

### Shared: Navbar — two-tier structure, per the reference site Adnan supplied

This is a **structural requirement**, not an optional accelerant like the libraries in Section 9: match the layout pattern of the reference screenshots exactly (info bar + main nav + carousel hero with eyebrow label), rebuilt entirely in Cafe Aarko's own palette/typography/content — never the reference's literal red/white styling or script font. Two tiers:

1. **Top utility bar** (slim, sits above the main nav): phone number + email on the left; opening-hours line + social icons (Facebook, Instagram) on the right. Small caption-size text, muted color, `--color-surface` background.
2. **Main navbar**, directly below: logo (from `/photo/logo.*`) on the left. Center or right: Home, Menu, Gallery, Visit Us. Far right: "Order on FoodPanda" button. Transparent over the hero → glass surface (Section 5.4) on scroll, driven by Lenis scroll position toggling a GSAP class.

Mobile: both tiers collapse into a single bar; nav links move into a slide-in drawer with staggered link reveal (50–80ms apart per `AGENTS.md`'s own stagger rule).

### Shared: Footer
Logo, tagline ("Expect the best and taste the myth"), address, phone (01719-389009), email (cafeaarkobd@gmail.com), Facebook + Instagram + FoodPanda links (Section 4.4), hours, a "Get Directions" link (Section 4.4 — **not** an embedded map, see the Map policy there), small optional "site by OptiFlow" credit line (Adnan's agency — nice, optional, low-key).

### 6.1 Home (`/`)
1. **Hero** — full detail in Section 7.1. Full-bleed **AI-generated** background image carousel (2–3 slides, Section 4.2), layered parallax on top of the active slide, small bordered eyebrow label ("CAFE AARKO RESTAURANT") above a Fraunces display headline that changes per slide, a horizontal-line-flanked subtext line beneath it, dual CTA ("View Menu" / "Order on FoodPanda"), pagination dots, animated scroll indicator (Lottieflow asset). Structural pattern follows the reference screenshots Adnan supplied — see the Navbar note above for how that reference is being used.
2. **Brand Story strip** — short paragraph on the fusion concept + Sylhet context, paired with one AI-generated ambience-style image (same style anchor as the hero — *not* a real environment photo, per Section 4.1), scroll-triggered clip-path reveal, small trust badges (4.1★ / 692 reviews, optionally the women-owned mention).
3. **Signature Dishes** — curated highlight of ~6–8 stand-out items (Aarko Special Pizza, Aarko Special Biryani, BBQ Pizza, Chicken Chow Mein, Seafood Pizza, Aarko Special Burger — chosen because they're either "Special" branded items or explicitly called out in the real Google reviews). Cards now use the AI-generated dish photos from Section 4.2 — dish name in Fraunces, short flavor line, price, category icon (Iconsax), photo as the card's visual anchor. Card-stack-with-rotate interaction (Skiper UI pattern, rebuilt in GSAP — see Section 8).
4. **Ambience Gallery teaser** — 2–4 images in a bento layout, hover-tilt (fake-3D), links to `/gallery`.
5. **Testimonials** — real Google reviews (see data below), card slider/marquee with star ratings.
6. **Visit Us strip** — address, hours, phone, service-type icons (dine-in/drive-through/delivery), "Get Directions" link (Section 4.4 — **not** an embedded map; the live map exists only on `/visit`), CTA row (Call / Get Directions / FoodPanda).
7. Footer.

**Testimonial source data** (Adnan's own business's public Google reviews — use directly, this is standard business-website practice):
- Shawon Ahmed (Local Guide, 25 reviews) — praised the decoration/atmosphere and the pizza variety, called it a recommended affordable pizza spot. Ratings: Food 4, Service 3, Atmosphere 4.
- M.A A Rubayeth (Local Guide, 42 reviews) — said the food is good and recommended the service and atmosphere. Ratings: Food 4, Service 5, Atmosphere 5.
- Joydip Paul (Local Guide, 50 reviews) — called out the cozy ambiance and attentive service as making it a great hangout spot even though the food was only average; recommended dish: Chicken Chow Mein. Ratings: Food 4, Service 5, Atmosphere 5.
- MD Syful Islam — praised the food quality and staff behavior in a short, recent review.

### 6.2 Menu (`/menu`)
- Sticky category tab bar (23 categories — pills/chips, horizontally scrollable on mobile) with scroll-spy active-state highlighting.
- Client-side search/filter across all items by name.
- Each category renders a card grid: Name → short description (where the source menu gives one, e.g. pizza toppings) → price (tiered prices shown as "Regular / Large" or "S / M / L" per the labeling rule in Section 4).
- Full structured data for all 152 items is in `PROJECT_START.md`, Appendix A. **Do not re-derive this from the menu photos** — transcribe directly from the appendix.

### 6.3 Gallery (`/gallery`)
Masonry grid of everything in `/photo/environment-*`, lightbox on click (uses the modal spec from Section 5.4), subtle mouse-tracking tilt on hover per card.

### 6.4 Visit Us (`/visit`)
The **only** live embedded Google Map on the entire site — the real verified iframe (Section 4.4 / `PROJECT_START.md` Appendix C, an exact pin, not a generic address search). Full contact block, "Get Directions" + "Call" + "Order on FoodPanda" CTAs. No contact form (no backend yet).

---

## 7. Animation & Motion Strategy

Each library is assigned a distinct job. **Do not let two libraries animate the same element** — this causes fighting/jank and is a common source of wasted debugging cycles (directly relevant to the quota-conservation goal in Section 3).

| Library | Job |
|---|---|
| **Lenis** | Global smooth scroll only. Root-level, synced to GSAP's ticker. |
| **GSAP + ScrollTrigger** | All scroll-linked orchestration: pinning, scrubbed parallax, the hero sequence, section reveals, `SplitText` for headline character/word stagger. |
| **Motion (React)** (`motion/react` — **not** `framer-motion`, which is the deprecated old package name) | Component-level micro-interactions: button press (scale 0.97 on active), card hover lift, page transitions between routes, the modal/lightbox spring entrance, simple `whileInView` reveals on elements that don't need full GSAP orchestration. |
| **anime.js v4** | Reserved specifically for SVG detail moments — the animated underline/divider squiggle under section headings, category icon line-draw-ins. Its SVG line-drawing/morph utilities are its distinguishing strength; don't use it for things Motion or GSAP already own. |
| **Sonner** | Lightweight non-blocking feedback only — "Copied phone number," a brief "Redirecting to FoodPanda…" toast before external navigation. Its bigger role (form submission feedback) arrives with the backend phase later; don't force extra uses onto it now. |

**Lenis + GSAP wiring** (standard, correct current pattern):
```ts
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const lenis = new Lenis({ autoRaf: false })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```
**Do not also add GSAP's ScrollSmoother** — Lenis already owns smooth-scroll; running both causes competing scroll ownership.

Always wrap heavy scroll orchestration in `@media (prefers-reduced-motion: reduce)` fallbacks — simplify to opacity-only fades, no parallax/pinning, per the existing anti-pattern rule.

### 7.1 Hero — full animation brief (the flagship "3D-ish" moment)

Two independent animation systems layered on top of each other — a **background carousel** (timed, not scroll-driven) and a **scroll-linked parallax/exit** (Section 7's usual ScrollTrigger job). No actual 3D geometry needed (WebGL would be overkill for a restaurant hero).

**Background carousel** (2–3 AI-generated slides, Section 4.2):
- Auto-advance every 6–7s, crossfade between slides (~1s fade), each new slide entering at `scale(1.08)` easing to `scale(1.0)` — same cinematic "settle" as before, just re-triggered per slide instead of once.
- Pagination dots at the bottom center reflect the active slide and are clickable to jump directly — matches the dot pattern in the reference screenshots.
- Pause auto-advance on hover/focus (accessibility + so a reader isn't fighting the carousel while reading the headline).

**Text layer** (sits above the carousel, changes content per slide but keeps the same entrance choreography each time):
- Small bordered eyebrow label ("CAFE AARKO RESTAURANT") fades in first.
- Headline reveals via `SplitText`, characters/words staggering in over ~0.8s.
- A horizontal-line-flanked subtext line (e.g., a one-word/short-phrase tag under the headline, matching the reference's divider-and-caption pattern) settles in alongside the headline.
- CTA buttons fade + rise in at +0.9s; the scroll-indicator icon (Lottieflow asset) fades in last at +1.1s.
- These re-run (shorter, ~0.4s) each time the slide changes, so the text always feels connected to its current background — but only the headline/subtext text swaps; eyebrow, CTAs, and dots stay static.

**Scroll-linked exit** (ScrollTrigger, scrubbed, applies to whichever slide is active when the user starts scrolling): background layer scales further to `~1.1` and fades; foreground text content moves at a faster differential speed than the background (classic parallax separation — background ~0.5x scroll speed, foreground ~1x). Carousel auto-advance pauses once the user has scrolled past the hero.

All timings stay within the 0.6–1.2s cinematic window per the source recipe in `skill-registry.md`.

**Note on hero text size:** `AGENTS.md` sets a hard, non-negotiable 56px ceiling for Display-role text ("never above 56px — it reads as amateur, not bold"). The reference screenshots Adnan supplied show notably larger headline text than that. This plan holds the 56px ceiling as written, and gets the same dominant, premium feeling through composition instead — generous surrounding negative space, tight line-height, full-bleed imagery, and the eyebrow/divider framing — rather than by overriding the token. If Adnan specifically wants the headline larger than 56px to match the reference more literally, that's a one-line override to this section; flagging it here rather than silently picking a side.

---

## 8. Icons & Motion-Graphics Strategy

**Zero emoji, anywhere, ever — including code comments.**

| Source | Role |
|---|---|
| **Iconsax** (`iconsax-react`, fallback `iconsax-reactjs` if the first is unavailable at install time) | Primary static/system UI icons — nav, service-type icons, category icons. 6 style variants available; use **Bulk** or **Bold** variant consistently (not mixed) for visual cohesion. |
| **Lucide** (`lucide-react`) | Fallback only, for anything Iconsax doesn't cover — already the approved fallback per `AGENTS.md`. |
| **Lordicon** | Animated Lottie-based icons for interactive delight moments — hover-triggered icons on CTA buttons, the scroll-down indicator. Load via Next.js `<Script strategy="afterInteractive">` pointing at `https://cdn.lordicon.com/lordicon.js`, then use the `<lord-icon>` custom element directly with lowercase HTML attributes (`trigger`, `colors`) — it's a native web component, not a React component, so don't pass camelCase props. |
| **Finsweet Lottieflow** | Source of specific raw Lottie JSON assets (scroll prompt, CTA arrow, loading state) — download the JSON files manually from `finsweet.com/lottieflow/explore` (this is a Webflow-oriented tool, but the JSON output works anywhere). Render them with `lottie-react` (`npm i lottie-react`, `<Lottie animationData={...} />`) since there's no Webflow player here. |

---

## 9. Reference Library Sourcing Strategy — cherry-pick, don't dump

Same philosophy Adnan already applied to the `tasteit-master` template: extract specific high-value patterns, discard the rest, never wholesale-adopt a library that would make the site feel templated.

- **Skiper UI** — strongest fit of the four resources given. Specific components worth adapting (not necessarily installing verbatim): *Scroll images reveal* → Gallery section; *3D perspective text* → a section-heading treatment; *Card stack with GSAP and rotate* → Signature Dishes carousel; *Interactive3d Hero* → reference implementation for the hero's layered-parallax technique; *Progressive Blur* → sticky nav backdrop.
- **Vengeance UI** — install via `npx shadcn@latest add @vengeanceui/[component]` if a specific piece fits (e.g., the Spotlight Navbar hover concept, Glass Dock as a mobile floating action bar) — treat as optional accelerants, not a base layer.
- **21st.dev** — general fallback marketplace (`npx shadcn@latest add "https://21st.dev/r/..."`) for any one-off micro-component gap. Supplementary only.
- **MotionSites.ai** — this is a prompt library, not a code source. Useful only if the agent gets stuck on creative direction for a specific section and wants a second reference angle; not a source of code to copy.
- **anime.js** — see Section 7 (SVG detail moments specifically).

**Rule for all of the above:** adapt the *technique*, rebuild it with Cafe Aarko's actual tokens/content — never copy a component with someone else's default styling still attached.

---

## 10. Tech Stack & Package Installation

```bash
npx create-next-app@latest cafe-aarko --typescript --tailwind --app
cd cafe-aarko

npm install motion gsap @gsap/react lenis sonner animejs lottie-react
npm install iconsax-react   # if unavailable, try iconsax-reactjs
npm install lucide-react clsx tailwind-merge

npx shadcn@latest init
npx shadcn@latest add button sheet dialog
```

- **Next.js 16** (or whatever `create-next-app@latest` installs as current stable — always take the latest, App Router, Turbopack default).
- **Tailwind v4** — comes pre-configured via `create-next-app`; tokens defined via `@theme` in `globals.css`, matching Section 5.
- **shadcn/ui** used minimally, as accessible base primitives only (button, sheet for the mobile nav drawer, dialog for the gallery lightbox) — the visual layer is fully custom per the anti-slop rule. Do not let raw shadcn default styling show through anywhere.
- Import Motion as `motion/react`, never `framer-motion`.

---

## 11. Folder Structure

`AGENTS.md` itself expects a `directives/` subfolder (it explicitly reads `directives/skill-registry.md` and `directives/ui-professional.md`). Rather than leave that mismatched against a fully flat folder, use this structure — one small subfolder, otherwise flat, and it removes all ambiguity for the agent:

```
cafe-aarko/
├── AGENTS.md
├── CLAUDE.md                 (exact copy of AGENTS.md, per its own instruction)
├── GEMINI.md                 (exact copy of AGENTS.md, per its own instruction)
├── plan.md                   (this file)
├── PROJECT_START.md
├── directives/
│   ├── skill-registry.md
│   └── ui-professional.md
├── photo/
│   ├── logo.png
│   ├── environment-01.jpg      (Gallery page only — see plan.md §4.1)
│   └── environment-02.jpg      (Gallery page only — see plan.md §4.1)
├── design-system/
│   └── MASTER.md              (copy of Section 5 above — created in Phase 1)
├── public/
│   └── images/
│       └── generated/          (AI-generated hero + dish photos — see §4.2)
└── src/                        (created by the agent from Phase 0 onward)
```

---

## 12. Assumptions Log

Everything below was decided without asking, per the established workflow. Flag any of these to override before or during the build:

1. Four-page structure (Home / Menu / Gallery / Visit Us) rather than a single long-scroll one-pager — chosen because 152 menu items need dedicated, findable space.
2. Color palette and font pairing (Fraunces / Plus Jakarta Sans) derived from the two interior photos — not confirmed with Adnan directly.
3. Signature Dishes selected editorially (branded "Special" items + reviewer call-outs) since no dish-level popularity data exists; their photos will be AI-generated (Section 4.2), not sourced from stock.
4. Raw menu-book item numbers dropped from the live UI entirely (see Section 4).
5. "Women-owned" business attribute included only as a light, optional mention — not a prominent badge.
6. No contact form anywhere — deferred entirely to the backend phase.
7. Skiper UI / Vengeance UI / 21st.dev treated as optional technique references, not mandatory installs — final call left to the agent's judgment during the build, guided by Section 9's philosophy. The Navbar/Hero *structural* pattern from Adnan's reference screenshots is treated differently — a firm requirement, not optional (Section 6).
8. Homepage "Ambience Gallery teaser" (Section 6.1, item 4) uses real environment photos even though it lives outside `/gallery` — interpreted as still within the spirit of the "gallery/environment section only" rule (Section 4.1) since it's explicitly framed as a preview of the Gallery page. Flagging this interpretation in case Adnan intended a stricter reading.
9. Hero display text held at the 56px ceiling from `AGENTS.md` rather than matched to the larger text size shown in the reference screenshots (Section 7.1) — flagged there as an easy override if Adnan wants it literally bigger.