# PROJECT_START.md — Cafe Aarko Build Instructions

> This file is the execution entry point. Read it fully, alongside `AGENTS.md`,
> `directives/skill-registry.md`, `directives/ui-professional.md`, and `plan.md`,
> before writing any code. This file replaces `prd.md` referenced inside `AGENTS.md` —
> treat it as that file.
>
> **Execute autonomously. Do not stop to ask the human for confirmation, clarification,
> or permission at any point in this build.** Every decision needed has already been
> made in `plan.md` or in this file. Where something genuinely isn't covered, make the
> most reasonable decision yourself, document it in a short comment or in
> `BUILD_NOTES.md`, and continue. Stopping to ask is the failure mode here, not the
> safe default.

---

## 0. Read Order

1. `AGENTS.md` — role, architecture, hard anti-patterns, pre-delivery checklist.
2. `directives/skill-registry.md` — design-principle reference (golden ratio spacing, color theory, glass CSS, the 3D/fake-3D scroll recipe).
3. `directives/ui-professional.md` — the phase-by-phase SOP this build follows.
4. `plan.md` — design system, sitemap, animation strategy, tech stack. **This is the design authority.**
5. This file — the build sequence and the full menu data.
6. `photo/` — list this directory now. `logo.*` is the brand mark (used in Navbar/Footer). Every `environment-*` file is real interior photography, restricted to the `/gallery` page and the homepage Gallery-teaser only — see constraint list below and `plan.md` §4.1.

---

## 1. Mission

Build the **complete frontend** of the Cafe Aarko website: four pages (Home, Menu, Gallery, Visit Us) plus shared Navbar/Footer, fully responsive, animation-rich, matching the design system in `plan.md` Section 5 exactly. **Design and frontend only** — no backend, no database, no CMS, no working form submissions, no auth. Any "Order Now" or "Reserve" action either links out to the real FoodPanda URL or is a visual-only placeholder clearly marked for a future backend phase — never a fake form that submits nowhere silently.

---

## 2. Non-Negotiable Constraints

- Tech stack and exact package names/import paths are fixed — see `plan.md` Section 10. In particular: import Motion from `motion/react`, **never** `framer-motion`. Import Lenis from `lenis`, **never** `@studio-freight/lenis`.
- Zero emoji, anywhere, in any file, including code comments. Icons only via Iconsax / Lucide / Lordicon / Lottieflow per `plan.md` Section 8.
- Every rule in `AGENTS.md`'s "Hard Anti-Patterns" section applies without exception.
- Responsive at minimum: 375px, 768px, 1024px, 1440px.
- `prefers-reduced-motion: reduce` must simplify or disable all scroll-pinning/parallax — fall back to plain opacity fades.
- No hardcoded hex values in components — semantic CSS variables from `plan.md` Section 5.1 only.
- Do not fabricate content that isn't in `plan.md` or this file (no invented opening hours, no invented prices). Where data is genuinely missing, follow the handling specified in `plan.md` Section 4.
- **English only, everywhere in the UI.** No Bengali text anywhere on the site — not in headings, labels, the footer, or anywhere else. This is a firm client requirement (`plan.md` §1, "Language").
- **Real interior photos (`photo/environment-*`) may only appear on `/gallery` and the homepage Gallery-teaser section.** Never use them as the Hero background or in the Brand Story strip — those use AI-generated imagery instead (`plan.md` §4.2, Appendix B below).
- **Navbar + Hero structure is a firm requirement, not an optional pattern:** a top utility bar (phone/email left, hours + social icons right) sitting above the main nav, and a full-bleed carousel hero with a bordered eyebrow label, large headline, divider-flanked subtext, and pagination dots. Rebuild this structure entirely in Cafe Aarko's own palette/typography/content — do not copy the reference site's literal colors or script font. Full detail in `plan.md` §6 and §7.1.

---

## 3. Fallback Rules — Skills That May or May Not Be Installed

`ui-professional.md` and `AGENTS.md` reference skills (`@ui-ux-pro-max`, `@impeccable`, `@threejs-webgl`, `@gsap-scrolltrigger`, `@motion-framer`, `@emilkowalski-skill`) that may not actually be present in this Antigravity project's `.agent/skills/` folder. Check once at the start. For each:

- **If present:** use it as described in its own directive.
- **If absent:** do not block, do not ask the human, do not retry repeatedly (wastes quota). Proceed using the equivalent manual guidance already provided:
  - `@ui-ux-pro-max` missing → the design system is already fully specified in `plan.md` Section 5. Copy it into `design-system/MASTER.md` directly instead of generating it.
  - `@impeccable` missing → there is no `npx impeccable detect` to run. Perform the Pre-Delivery Checklist (`AGENTS.md`, bottom section) manually, item by item, using the Browser Subagent to visually verify each responsive breakpoint and interactive state.
  - `@threejs-webgl` missing → not needed. The "3D" requirement is fulfilled entirely through layered parallax/scale (`plan.md` Section 7.1), not real WebGL geometry.
  - `@gsap-scrolltrigger` / `@motion-framer` missing → irrelevant; these are just skill-name labels for guidance already fully covered by `plan.md` Section 7 using the plain `gsap` and `motion` npm packages directly.
  - `@emilkowalski-skill` missing → self-review animation quality against the Motion/GSAP timing rules already given in `AGENTS.md` and `plan.md` Section 5.4/7.

---

## 4. Build Phases

Commit to git at the end of every phase. This makes the build resumable from any point if a session or quota window ends mid-task — re-reading these same files plus `git log`/`git status` in a fresh session is enough to continue with zero re-explanation needed.

```
Phase 0 — Setup
  git init, initial commit.
  Scaffold via create-next-app (plan.md §10).
  Install all packages (plan.md §10).
  Configure fonts via next/font/google (plan.md §5.2).
  Set up folder structure (plan.md §11).
  → commit: "phase 0: project scaffold"

Phase 1 — Design tokens
  Copy plan.md §5 into design-system/MASTER.md.
  Write all CSS variables into globals.css / @theme block.
  → commit: "phase 1: design tokens"

Phase 2 — Core layout
  Navbar — both tiers: top utility bar + main nav (plan.md §6, "Shared: Navbar"),
  with scroll-state glass transition. Footer. Section wrapper components.
  Lenis + GSAP ticker wiring (plan.md §7, exact snippet given).
  → commit: "phase 2: layout shell"

Phase 3 — Image generation
  Using Antigravity's built-in Gemini image generation (plan.md §4.2):
  generate 2–3 Hero carousel backgrounds + 6–8 Signature Dish photos using
  the exact prompts in Appendix B below, always prepended with the shared
  style anchor. Save to public/images/generated/. Do this in one batch/
  session so the style stays consistent across every image.
  → commit: "phase 3: generated imagery"

Phase 4 — Home page
  Build sections in order: Hero carousel (full detail, plan.md §7.1, using
  the Phase 3 images) → Brand Story (using a Phase 3 image, not a real
  photo) → Signature Dishes (using the Phase 3 dish photos) → Gallery
  teaser (real photos from photo/environment-*) → Testimonials → Visit Us
  strip (using the Appendix C map embed).
  → commit after each section, or at minimum: "phase 4: home page complete"

Phase 5 — Menu page
  Build category tab navigation + scroll-spy + search/filter.
  Transcribe Appendix A (below) into a typed data file
  (e.g. src/data/menu.ts) — do NOT re-parse any images for this.
  → commit: "phase 5: menu page complete"

Phase 6 — Gallery + Visit Us pages
  Gallery: real photos from photo/environment-* only. Visit Us: the
  Appendix C map embed, verbatim.
  → commit: "phase 6: gallery and visit-us pages complete"

Phase 7 — Animation polish pass
  Review every page against plan.md §7 (library-per-job rule) and the
  Premium Effects Reference in ui-professional.md. Fix anything using two
  libraries on the same element.
  → commit: "phase 7: animation polish"

Phase 8 — Self-QA
  Use the Browser Subagent to click through all four pages at 375px, 768px,
  1024px, 1440px. Verify: no console errors, no layout overflow, all
  animations fire once and don't re-trigger janky loops, reduced-motion
  fallback works, all 152 menu items present (spot-check counts per
  category against Appendix A), zero Bengali text anywhere, hero carousel
  auto-advances and pauses correctly on hover.
  → commit: "phase 8: qa pass"

Phase 9 — Final checklist
  Run the AGENTS.md Pre-Delivery Checklist item by item (manually if
  @impeccable is absent — see §3 above). Fix anything failing.
  → commit: "phase 9: pre-delivery checklist passed"
```

---

## 5. Definition of Done

- Every item in `AGENTS.md`'s Pre-Delivery Checklist passes.
- All 152 menu items from Appendix A are present on `/menu`, correctly categorized, zero omissions.
- Zero Bengali text anywhere on the site — English only, everywhere.
- Real environment photos appear only on `/gallery` and the homepage Gallery-teaser — nowhere else.
- Hero and Signature Dishes use the AI-generated images from Phase 3 — no stock photography, no missing images.
- Map embed on `/visit` (and the footer) uses the exact Appendix C iframe — resolves to the correct pin.
- FoodPanda, Facebook, and Instagram links, phone number, and email match Section 6 exactly — no typos.
- Navbar shows both tiers (utility bar + main nav); Hero carousel auto-advances, pauses on hover, and pagination dots work.
- Zero emoji anywhere in the codebase.
- No placeholder/lorem-ipsum text remains anywhere.

---

## 6. Verified Business Data

```
Name (EN):     Cafe Aarko            ← use this everywhere in the UI
Name (BN):     ক্যাফে আর্ক             ← reference only, NEVER put this on the site (English-only rule)
Address:       Besides Brac Bank, Ahmed Trade Centre, Baruthkhana Rd, Sylhet 3100
               (located inside Sylco Tower Shopping Mall)
Plus Code:     VVWC+4R Sylhet
Phone:         01719-389009
Email:         cafeaarkobd@gmail.com
Facebook:      https://www.facebook.com/Cafeaarko.bd/
Instagram:     https://www.instagram.com/cafeaarko.bd
FoodPanda:     https://foodpanda.com.bd/restaurant/s3ch/cafe-aarko?utm_source=google&utm_medium=organic&utm_campaign=google_reserve_place_order_action
Rating:        4.1 stars, 692 Google reviews
Price range:   ৳200–400 per person (Google aggregate)
Hours:         Opens 11 AM daily (exact closing time/weekly variation unknown — do not invent)
Services:      Dine-in, Drive-through, No-contact delivery
Tagline:       "Expect the best and taste the myth."
```

Google Maps — verified working embed, use exactly as given (Appendix C has the full block):
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.0768481245054!2d91.8720444!3d24.8953602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375055a9a1b6ac19%3A0xe83e9c6f0ac4236c!2sCafe%20Aarko!5e0!3m2!1sen!2sbd!4v1782935900657!5m2!1sen!2sbd
```

---

## Appendix A — Full Menu Data

Transcribed directly from the physical menu photos so the agent never needs to re-run vision parsing on them. Prices in ৳ (Bangladeshi Taka), source menu used "/=" shorthand. Where two or three prices are listed, see the labeling rule below each table.

**Transcription notes (verify against the physical menu if exact wording matters):**
- Item 78 "Grilled Mudroom" is almost certainly "Grilled Mushroom" — corrected below.
- Item 70 "Black Piper Mushroom" is almost certainly "Black Pepper Mushroom" — corrected below.
- Item 110 "Promfet fry" is almost certainly "Pomfret fry" — corrected below.
- The Biriyani section has a genuine duplicate item number (101) on the source menu for two different items. Per `plan.md` §4, item numbers are not displayed on the website at all, so this doesn't need to be "fixed" — both items are listed below regardless.
- Item 147 "Aarko Special Drink" has no price on the source menu — display without a price.

**Portion labeling:** Pizza = Small / Medium / Large. Categories explicitly marked "(1:1/1:3)" on the source (Choumein, Rice, Beef, Fish, Chicken) = Regular / Large portion ratio. Other items showing two prices with no source label (Soup, Vegetables, Indian Curry) = Regular / Large generically.

### Appetizer
| Item | Price (৳) |
|---|---|
| B.B.Q Lollipop (6 pc) | 310 |
| Wonton (6 pc) | 240 |
| Chicken Cutlet | 340 |
| Prawn Toast (8 pc) | 340 |
| Chicken Lollipop (6 pc) | 340 |
| Fish Cake (8 pc) | 320 |
| Honey Glaze Chicken Wings (6 pc) | 350 |
| Squid Fry with French Fry | 310 |
| Grilled Squid with French Fry | 340 |
| Prawn Fry with French Fry | 340 |
| Fish Finger with French Fry (8 pc) | 310 |
| Thai Fried Chicken with French Fry (4 pc) | 390 |
| Foil Fried Chicken with French Fry (4 pc) | 410 |
| French Fry | 170 |
| Nachos | 310 |
| Chicken Quesadilla | 410 |
| Szechuan Fried Chicken | 390 |

### Burger
| Item | Price (৳) |
|---|---|
| Crispy Chicken Burger with French Fry | 230 |
| BBQ Chicken Burger with Cheese & French Fry | 250 |
| Naga Chicken Burger with Cheese & French Fry | 260 |
| American Burger | 330 |
| Aarko Special Burger | 350 |

### Soup (Regular / Large)
| Item | Regular | Large |
|---|---|---|
| Chicken Corn Soup | 130 | 300 |
| Chicken Vegetable Soup | 140 | 330 |
| Thai Soup | 150 | 360 |
| Hot and Sour Soup | 150 | 360 |
| Tom Yam Soup | 170 | 420 |
| Thai Clear Soup | 180 | 430 |
| Aarko Special Soup | 190 | 460 |

### Salad
| Item | Price (৳) |
|---|---|
| Sichuan Salad | 300 |
| Chicken Cashew Nut Salad | 320 |
| Larb Gai Salad | 330 |
| Sea Food Salad | 380 |
| Aarko Special Salad | 360 |
| Mix Salad | 150 |

### Pizza (Small / Medium / Large)
| Item | Description | S | M | L |
|---|---|---|---|---|
| Pizza Margherita | Cheese, fresh tomato slice, mushroom | 380 | 500 | 610 |
| BBQ Pizza | BBQ chicken, cheese, mushroom, onion | 510 | 620 | 740 |
| Four Season Pizza | Chicken, cheese, capsicum, sausage, black olive | 520 | 630 | 780 |
| Mexican Hot Pizza | Spicy chicken, cheese, mushroom, tomato, capsicum | 570 | 760 | 890 |
| Pizza Italiano | Chicken, cheese, mushroom, sausage | 560 | 690 | 830 |
| Beef Lovers Pizza | Beef, cheese, mushroom, onion, capsicum, sausage, black olive | 590 | 780 | 890 |
| Spicy Naga Pizza | Naga chicken, cheese, mushroom, sausage | 590 | 720 | 840 |
| Texas Pizza | Chicken cheese, chicken salami, mushroom, capsicum, black olive | 860 | — | 970 |
| Seafood Pizza | Squid, prawn, boneless fish, mushroom, black olive, capsicum | 810 | — | 910 |
| Double Standard Pizza | Double layer cheese, chicken, capsicum, tomato, sweet corn, black olive, onion | 770 | — | 890 |
| Aarko Special Pizza | Chicken, cheese, mushroom, capsicum, onion, sausage, black olive | 700 | 890 | 1020 |

### Pasta
| Item | Price (৳) |
|---|---|
| Spicy Pasta | 260 |
| White Sauce Pasta | 270 |
| Pink Prawn Pasta | 280 |
| Oven Baked Pasta | 290 |
| Beef Oven Baked Pasta | 320 |
| Pasta Basta | 340 |
| Meat Sauce Pasta | 340 |
| Aarko Special Pasta | 360 |

### Choumein (Regular / Large)
| Item | Regular | Large |
|---|---|---|
| Chicken Chowmein | 210 | 360 |
| Thai Chowmein | 230 | 480 |
| Mix Chowmein | 220 | 440 |
| American Choupsey | — (single price) | 370 |

### Chinese — Set Menu (each includes Egg Fried Rice + Chinese Veg)
| Item | Price (৳) |
|---|---|
| Crispy Chicken + Egg Fried Rice + Chinese Veg | 220 |
| Chicken Chilli + Egg Fried Rice + Chinese Veg | 230 |
| Beef Chilli Onion + Egg Fried Rice + Chinese Veg | 260 |
| Chicken Masala + Egg Fried Rice + Chinese Veg | 250 |
| Beef Masala + Egg Fried Rice + Chinese Veg | 270 |
| Tandoori Chicken + Egg Fried Rice + Chinese Veg | 290 |
| BBQ Chicken + Egg Fried Rice + Chinese Veg | 300 |

### Mexican — Set Menu
| Item | Price (৳) |
|---|---|
| Mexican Chicken + Fried Rice + Spicy Salad | 310 |
| Dry Red Chilli Chicken + Fried Rice + Spicy Salad | 320 |
| Dry Red Chilli Beef + Fried Rice + Spicy Salad | 340 |
| Szechuan Chicken + Fried Rice + Spicy Salad | 340 |
| Beef Black Pepper Mushroom + Fried Rice | 350 |

### Continental — Set Menu
| Item | Price (৳) |
|---|---|
| Spanish Chicken + Mexican Rice | 340 |
| Garlic Prawn + Fried Rice | 360 |
| Fish Grill + Mexican Rice + Mashed Potatoes | 400 |
| Parmesan Chicken + Spicy Rice + Ring Onion + Boiled Veg | 380 |
| Peri Peri Chicken + Mushroom Rice + French Fry + Peri Peri Sauce | 390 |
| Orange Chicken + Spicy Rice + Veg + Orange Slice | 380 |
| Smokey Creamy Chicken + Spicy Rice + Veg | 380 |
| B.B.Q Prawn + Green Rice + Grilled Mushroom | 400 |
| Parmesan Chicken + Spaghetti | 400 |
| Teriyaki Chicken + Fried Rice | 370 |

### Vegetables (Regular / Large where applicable)
| Item | Regular | Large |
|---|---|---|
| Chinese Vegetables | 110 | 240 |
| Grilled Vegetables | 120 | 250 |
| Thai Vegetables | 160 | 260 |
| Garlic Mushroom | — (single price) | 260 |

### Indian Curry (Regular / Large where applicable)
| Item | Regular | Large |
|---|---|---|
| Chicken Jhalfrezi | 190 | 380 |
| Chicken Dopiaza | 200 | 390 |
| Chicken Korai | 210 | 400 |
| Chicken Tikka Masala | — (single price) | 370 |
| Mutton Dopiaza | — (single price) | 480 |
| Beef Korai | — (single price) | 490 |

### Rice (Regular / Large where applicable)
| Item | Regular | Large |
|---|---|---|
| Egg Fried Rice | 160 | 290 |
| Chicken Fried Rice | 190 | 330 |
| Vegetable Rice | — (single price) | 310 |
| Masala Fried Rice | — (single price) | 320 |
| Szechuan Rice | — (single price) | 370 |
| Thai Fried Rice | — (single price) | 380 |
| Fantastic Fried Rice | — (single price) | 390 |

### Biriyani (contains Basmati Rice)
| Item | Price (৳) |
|---|---|
| Chicken Biriyani | 240 |
| BBQ Biriyani | 270 |
| Mutton Biriyani | 330 |
| Hyderabadi Biriyani | 360 |
| Persian Biriyani | 320 |
| Aarko Special Biriyani | 380 |

### Beef (Regular / Large where applicable)
| Item | Regular | Large |
|---|---|---|
| Beef Masala | 260 | 410 |
| Beef Chilli Onion | 270 | 410 |
| Beef Sizzling | — (single price) | 470 |
| Beef Chilli Dry | — (single price) | 490 |

### Fish
| Item | Regular | Large |
|---|---|---|
| Fish Masala | 240 | 420 |
| Prawn Masala | 260 | 440 |
| Prawn Sizzling | — (single price) | 470 |
| Pomfret Fry | — (single price) | 480 |
| Red Snapper Sweet and Sour | — (single price) | 700 |

### Chicken (Regular / Large where applicable)
| Item | Regular | Large |
|---|---|---|
| Chicken Masala | 200 | 350 |
| Chicken Chilli Onion | 220 | 370 |
| Chicken Sizzling | — (single price) | 410 |
| Chicken Chilli Dry | 230 | 390 |

### Steak
| Item | Description | Price (৳) |
|---|---|---|
| American Chicken Steak | Rice, boiled vegetables | 460 |
| Paprika Chicken Steak | French fry, mushroom | 500 |
| American Steak | Rice, boiled vegetables | 650 |

### Kebab (each includes Naan & Raita Salad)
| Item | Price (৳) |
|---|---|
| Chicken Tikka + Naan & Raita Salad | 280 |
| Afgani Kebab + Naan & Raita Salad | 310 |
| Tandoori Chicken + Naan & Raita Salad | 290 |
| Hariyali Kebab + Naan & Raita Salad | 310 |
| Tangri Kebab + Naan & Salad | 320 |
| Beef Hariyali Kebab + Naan & Raita Salad | 350 |

### Naan
| Item | Price (৳) |
|---|---|
| Plain Naan | 60 |
| Spicy Naan | 70 |
| Butter Naan | 80 |
| Garlic Naan | 90 |

### Shakes and Drinks
| Item | Price (৳) |
|---|---|
| Cocktail | 130 |
| Blue Shot | 140 |
| Lemonade | 120 |
| Lassi | 140 |
| Frappe | 180 |
| Lover Delight | 170 |
| KitKat Shake | 170 |
| Virgin Mojito | 130 |
| Ice Cream | 120 |
| Cold Coffee | 150 |
| Milk Shake | 160 |
| Oreo Shake | 190 |
| Faluda | 200 |

### Seasonal Juice
| Item | Price (৳) |
|---|---|
| Apple Juice | 170 |
| Mango Juice | 180 |
| Orange Juice | 190 |
| Pineapple Juice | 160 |
| Mint Lemon Juice | 150 |
| Aarko Special Drink | — (no price on source menu) |

### Coffee
| Item | Price (৳) |
|---|---|
| Black Coffee | 80 |
| Hot Coffee | 120 |
| Cappuccino | 140 |
| Hot Chocolate | 160 |
| Latte | 170 |

**Total: 23 categories, 152 items.** Spot-check this count against the built `/menu` page in Phase 8.

---

## Appendix B — AI Image Generation Prompts

Generate these in Phase 3 using Antigravity's built-in Gemini image generation (`plan.md` §4.2). **Always prepend the style anchor** to every prompt below — this is what keeps the whole set looking like one cohesive photoshoot instead of disconnected AI images. Generate them in the same batch/session where possible.

**Style anchor (prepend to every single prompt, word for word):**
```
Professional restaurant food photography, dark moody backdrop, warm golden
rim lighting with soft amber highlights, shallow depth of field, cinematic
color grade with warm amber and deep charcoal tones, subtle steam or
garnish detail where appropriate, shot on a dark wood or slate surface,
high-end editorial food-magazine style, photorealistic, no text, no
watermark, no people.
```

### B.1 — Hero carousel backgrounds (wide, ~1920×1080 or wider)

1. `hero-01.jpg` — "A wood-fired artisan pizza, fully loaded with melted cheese, fresh basil, and a charred crust, centered on a dark slate board, low-angle dramatic lighting."
2. `hero-02.jpg` — "An overhead flat-lay of a vibrant fusion feast — grilled kebabs, a small bowl of curry, fresh naan bread, and a side salad, arranged artfully on a dark wooden table."
3. `hero-03.jpg` (optional third slide) — "A close-up of a sizzling steak platter with visible steam, dark background, single dramatic overhead light source."

### B.2 — Signature Dish photos (square or 4:3)

1. `dish-aarko-special-pizza.jpg` — "Overhead shot of a specialty pizza topped with chicken, mushroom, capsicum, onion, sausage, and black olives, melted bubbling cheese, on a dark slate."
2. `dish-aarko-special-biryani.jpg` — "A generous plate of aromatic biryani rice with visible saffron strands, tender meat pieces, garnished with fried onions and coriander, dark moody background."
3. `dish-bbq-pizza.jpg` — "BBQ chicken pizza with a visible BBQ sauce swirl, melted cheese, red onion rings, on dark slate."
4. `dish-chicken-chowmein.jpg` — "A twirled portion of stir-fried chowmein noodles with vegetables and chicken pieces, glossy sauce coating, dark bowl, chopsticks resting beside it."
5. `dish-seafood-pizza.jpg` — "Seafood pizza topped with prawns, squid rings, boneless fish, and black olives, on dark slate, slight steam rising."
6. `dish-aarko-special-burger.jpg` — "A tall gourmet burger stack with visible melted cheese drip, fresh lettuce, and tomato, on a dark wood board, a side of fries slightly out of focus in the background."

These six cover the Signature Dishes selection in `plan.md` §6.1. Treat the wording above as a strong starting point, not a rigid script — refine as needed while keeping every generation anchored to the same style block.

---

## Appendix C — Google Maps Embed (verified, use verbatim)

Use this exact iframe on `/visit` and in the Footer. Do not regenerate or substitute a generic address-search embed — this one is pinned to the exact business listing.

```html
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.0768481245054!2d91.8720444!3d24.8953602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375055a9a1b6ac19%3A0xe83e9c6f0ac4236c!2sCafe%20Aarko!5e0!3m2!1sen!2sbd!4v1782935900657!5m2!1sen!2sbd"
  width="600"
  height="450"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin">
</iframe>
```

For the full `/visit` page embed, drop the fixed `width`/`height` and wrap it in a responsive container (e.g. `aspect-ratio` CSS on the wrapper, `width: 100%; height: 100%` on the iframe) rather than hardcoding pixel dimensions — the values above are the source defaults, not a layout requirement. The footer version can stay closer to the original compact size.