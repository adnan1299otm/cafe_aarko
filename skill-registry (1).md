# directives/skill-registry.md
> This file tells you exactly what every available skill contains and when to use each one.
> Read this before starting any task that involves installing or using a skill.
> Never load all skills at once. Identify the task first, then activate only what is needed.

---

## How to Use This File

1. Read the task from prd.md or the user's request
2. Find the matching section below
3. Check if the skill is already installed in `.agent/skills/`
4. If not installed, run the install command from the repo's README
5. Use the skill only for the task it is meant for
6. When the task is complete, do not carry that skill context into a different type of task

---

## SKILL 1 — UI UX Pro Max
**Source:** `github.com/nextlevelbuilder/ui-ux-pro-max-skill`
**Use for:** Generating the complete design system at the start of any UI project

### What is inside this skill
This skill contains a design intelligence engine with:
- **67 named UI styles** — including Glassmorphism, Soft UI Evolution, Neubrutalism, Claymorphism, Corporate Minimal, Editorial Brutalism, AI-Native UI, Bento Grid, and more. Each style has specific rules for color, typography, border radius, shadow depth, and layout.
- **161 industry-specific reasoning rules** — the skill knows that a fintech app needs trust signals and high contrast, that a creative agency site can use bold typography and motion, that a SaaS dashboard needs information density over decoration, and so on. It reasons about your specific industry before generating anything.
- **Design system generator** — outputs a full design system including: recommended UI style, color palette with semantic naming, font pairing with Google Fonts URLs, layout pattern (Hero-Centric, Feature-Rich Showcase, Trust and Authority, Minimal Conversion, etc.), key effects to use, and anti-patterns to avoid for that specific project type.
- **Persist mode** — can save the generated design system directly to `design-system/MASTER.md` so it becomes the source of truth for all subsequent work.

### What this skill does NOT do
It does not write any code. It generates the design blueprint. Code is written using `@frontend-design` after the design system exists.

### Install
```bash
# Check the README at github.com/nextlevelbuilder/ui-ux-pro-max-skill for the current install command.
# The skill folder should end up inside .agent/skills/ui-ux-pro-max/
```

### How to use it
```bash
# Generate design system and print output
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "[describe the project]" --design-system -p "[Project Name]"

# Generate and save directly to design-system/MASTER.md
python3 .agent/skills/ui-ux-pro-max/scripts/search.py "[describe the project]" --design-system --persist -p "[Project Name]"
```

### Trigger
Any task that includes: build, design, create a website, landing page, dashboard, component, page, or UI.
Always run this first. Never write code before this skill has generated the design system.

---

## SKILL 2 — Impeccable
**Source:** `github.com/pbakaus/impeccable`
**Use for:** Auditing, polishing, and steering the UI after it is built

### What is inside this skill
Impeccable is a design quality enforcement tool. It contains:
- **18 steering commands** — slash commands you run directly in the agent to fix or improve specific aspects of the UI
- **24 anti-pattern detectors** — the CLI scanner automatically flags issues like AI slop patterns (side-tab borders, purple glows, bounce easing), cramped padding, small touch targets, poor color contrast, missing cursor styles, and overused visual conventions
- **Per-section analysis** — commands target a specific section or component, not the whole page at once, so fixes are precise

### The 18 commands and what each does

```
/audit [section]        → scans for technical errors, accessibility issues, broken states
/critique [section]     → UX design review — is the hierarchy clear, does the layout work
/polish [section]       → final pass: tighten spacing, refine type, smooth interactions
/animate [component]    → adds purposeful motion with correct easing and timing
/bolder [component]     → amplifies a design that feels too safe or generic
/typeset [section]      → fixes font hierarchy, sizes, weights, and line heights
/layout [section]       → fixes spacing rhythm, alignment, and visual flow
/overdrive [component]  → adds technically extraordinary effects for showcase moments
/normalize [section]    → aligns the section back to the design system tokens in MASTER.md
/contrast [section]     → checks and fixes color contrast ratios
/responsive [section]   → reviews and fixes responsive behavior across breakpoints
/states [component]     → generates all missing interactive states
/motion [component]     → reviews all animations for correctness and feel
/accessibility [section]→ full accessibility review (ARIA, focus, screen reader)
/density [section]      → adjusts information density up or down
/simplify [section]     → removes noise and unnecessary visual elements
/hierarchy [section]    → fixes visual hierarchy — what draws the eye first
/dark [section]         → generates or fixes a dark mode version
```

### CLI scanner (run before every delivery)
```bash
npx impeccable detect src/
```
This runs all 24 anti-pattern detectors across your source files and reports issues with file locations.

### Install
```bash
# Download the ZIP from impeccable.style
# Extract and copy the skill files:
cp -r impeccable-dist/gemini/.gemini/skills/* .agent/skills/
```

### Trigger
Use this alongside `@ui-ux-pro-max` and `@frontend-design` on every UI task.
Correct order: build with `@frontend-design` → `/audit` → fix issues → `/polish` → CLI scan → deliver.

---

## SKILL 3 — Frontend Design (Anthropic Official)
**Source:** `github.com/anthropics/skills` — the `frontend-design` skill
**Use for:** Writing production-grade frontend code that avoids generic AI aesthetics

### What is inside this skill
This is Anthropic's official frontend code quality skill. It contains:
- **Design token patterns** — correct ways to define and consume CSS variables for color, type, spacing, and radius
- **Typography guidelines** — font pairing strategies, scale application, line height and letter spacing rules
- **Color system patterns** — semantic variable naming, shade scale construction, contrast rules
- **Layout patterns** — grid systems, flexbox usage, responsive container strategies
- **Motion patterns** — correct easing functions, duration ranges, stagger techniques, reduced-motion handling
- **Component patterns** — button variants, card structures, form elements, navigation, modals — all with full state coverage
- **Anti-pattern library** — a list of what AI tends to generate by default and explicit instructions to avoid it
- **Code style** — prefers CSS custom properties over utility class sprawl, keeps components readable

### What this skill does NOT do
It does not generate a design system. That is `@ui-ux-pro-max`'s job.
This skill takes the tokens from `design-system/MASTER.md` and writes correct, high-quality code using them.

### Install
```bash
# Via Antigravity Awesome Skills (includes this skill among 1,239+ others):
npx antigravity-awesome-skills --antigravity

# Or install directly from the anthropics/skills repo README
```

### Trigger
Any component or page build, always alongside `@ui-ux-pro-max` and `@impeccable`.

---

## SKILL 4 — Antigravity Awesome Skills (1,239+ Skills)
**Source:** `github.com/sickn33/antigravity-awesome-skills`
**Use for:** Installing a large library of general-purpose agentic skills

### What is inside this skill collection
This is a community-built collection of over 1,239 skills that work across Claude Code, Gemini CLI, Codex CLI, Antigravity, Cursor, and GitHub Copilot. The collection covers:
- **Frontend development** — React, Next.js, Vue, Svelte, HTML, CSS, Tailwind
- **Backend development** — Node.js, Python, Go, Rust, APIs, GraphQL
- **Databases** — PostgreSQL, MongoDB, Redis, Prisma, Drizzle
- **DevOps** — Docker, Kubernetes, CI/CD, GitHub Actions, cloud platforms
- **Testing** — Jest, Vitest, Playwright, Cypress
- **Architecture** — system design, microservices, monorepos
- **Code quality** — review, refactoring, documentation
- **And hundreds more categories**

### Important rule
Do not activate all 1,239 skills. This causes context bloat and confused output. The collection is a library — install it globally, then activate only the specific skills a task requires.

### Install
```bash
# Install globally for all projects
npx antigravity-awesome-skills --antigravity

# Install to a specific project workspace
npx antigravity-awesome-skills --path .agent/skills
```

### Trigger
Use this as the base layer. Install once globally. Then activate individual skills from it by name as tasks require.

---

## SKILL 5 — Emil Kowalski Animation Skill
**Source:** `emilkowal.ski/skill`
**Use for:** Reviewing and improving animation quality and micro-interactions

### What is inside this skill
Emil Kowalski is a design engineer known for high-quality UI animation work. This skill contains:
- **Animation principles** — timing, easing, overshoot, spring physics — explained with the reasoning behind each rule, not just the rules themselves
- **Micro-interaction patterns** — how buttons, toggles, sliders, and other interactive elements should respond to user input to feel alive rather than static
- **Common animation mistakes** — bounce easing misuse, duration too long or too short, animating the wrong properties (width instead of transform), layout thrashing
- **Performance guidance** — which CSS properties are safe to animate (transform, opacity) and which cause repaints (width, height, top, left, background)
- **Code examples** — CSS keyframes, Framer Motion variants, GSAP tweens for the patterns it describes

### Important note from the source
The skill recommends using it on a case-by-case basis — specifically for reviewing animations — rather than having it always active.

### Install
```bash
npx skills add emilkowalski/skill
```

### Trigger
- "Review these animations"
- "The motion feels wrong"
- "Add micro-interactions to this component"
- "The animation feels too slow / too fast / mechanical"

---

## SKILL 6 — Graphify
**Source:** `github.com/safishamsi/graphify`
**Use for:** Understanding a large or unfamiliar codebase by mapping it into a queryable knowledge graph

### What is inside this skill
Graphify extracts structure from your project and builds a connected knowledge graph. It can process:
- **Source code** — functions, classes, imports, exports, and how they connect across files
- **Documentation** — Markdown files, READMEs, comments
- **PDFs and images** — if included in the project
- **Configuration files** — package.json, tsconfig, environment files

Once built, the graph is queryable. You can ask questions like "what files use the auth module", "where is the payment logic", or "what depends on this utility function" — and get accurate answers instead of guessing.

### Commands
```bash
/graphify .           → build knowledge graph for the current project folder
/graphify . --update  → re-process only files that changed since last build
graphify query "your question about the codebase"
```

### Install
```bash
pip install graphifyy
graphify antigravity install
```

### Trigger
- Starting work on an unfamiliar codebase
- "How does X connect to Y"
- "Where is the logic for Z"
- "Map the dependencies"
- Any project with more than ~20 files where the structure is not obvious

---

## SKILL 7 — Claude Design Skills (3D and Animation)
**Source:** `github.com/freshtechbro/claudedesignskills`
**Use for:** Adding 3D scenes, WebGL effects, and advanced animations

### What is inside this skill collection
A set of skills specifically for visual and interactive engineering:

**@threejs-webgl**
- Three.js scene setup: renderer, camera, lighting, controls
- PBR (Physically Based Rendering) materials — how to make surfaces look like real metal, glass, fabric
- 3D model loading (GLTF, GLB files)
- Post-processing effects: bloom, depth of field, ambient occlusion
- Performance optimization: LOD, frustum culling, instancing

**@gsap-scrolltrigger**
- GSAP ScrollTrigger setup and configuration
- Pinning sections during scroll
- Parallax effects on elements and backgrounds
- Scrubbing animations to scroll position
- Stagger reveals as sections enter the viewport
- Horizontal scroll sections

**@react-three-fiber**
- R3F component patterns: Canvas, mesh, group
- Drei helpers: OrbitControls, Environment, Text, Html
- Animation loop with useFrame
- Integration with React state and routing

**@motion-framer**
- Framer Motion: motion components, variants, AnimatePresence
- Layout animations with layoutId for shared element transitions
- Gesture animations: drag, hover, tap
- Page transition patterns for Next.js App Router

**@babylonjs-engine**
- Babylon.js scene, engine, and mesh setup
- Physics engine integration (Havok)
- Game-style interactions and collision detection

**@animejs**
- Lightweight animation library for simple sequenced animations
- Timeline control, keyframes, easing library

**@lottie-animations**
- Playing Lottie JSON animation files in React and HTML
- Controlling playback: play, pause, loop, speed, seek

### Install
```bash
# Check github.com/freshtechbro/claudedesignskills README for current Antigravity install command
# Skills install to .agent/skills/[skill-name]/
```

### Trigger
- "Add a 3D element" → `@threejs-webgl` or `@react-three-fiber`
- "Animate on scroll" → `@gsap-scrolltrigger`
- "Page transitions in React" → `@motion-framer`
- "Play a Lottie file" → `@lottie-animations`

Do not load `@threejs-webgl` and `@babylonjs-engine` at the same time — they serve the same purpose.

---

## SKILL 8 — ClaudeKit Skills
**Source:** `github.com/mrgoonie/claudekit-skills`
**Use for:** Backend development, code quality, debugging, and infrastructure

### What is inside this skill collection

**@code-review**
- Pre-completion checklist: does the code solve the actual problem, are edge cases handled, is it readable
- Common issues by language: TypeScript type safety, React hook rules, async error handling
- Output format: structured list of issues with severity and suggested fixes

**@debugging/systematic-debugging**
- Four-phase root cause investigation: reproduce → isolate → identify → fix
- Prevents the common mistake of guessing and patching symptoms
- Forces reading actual error messages instead of assuming

**@debugging/verification-before-completion**
- Requires running verification commands before claiming any task is done
- For frontend: does it render, are console errors clean, do interactions work
- For backend: do the endpoints return correct responses, do edge cases pass
- Prevents "done" claims that are not actually verified

**@debugging/defense-in-depth**
- Validates data at every layer it passes through
- Input validation at the API boundary, type checks in business logic, error handling at the database layer
- Prevents silent data corruption bugs

**@backend-development**
- REST API design: route naming, HTTP methods, status codes, error response format
- GraphQL: schema design, resolver patterns, N+1 problem prevention
- Node.js patterns: middleware, error handling, async patterns
- Python patterns: FastAPI, async handlers, Pydantic models

**@databases**
- PostgreSQL: schema design, indexing strategy, query optimization, migrations
- MongoDB: document modeling, aggregation pipelines, indexing
- Redis: caching patterns, TTL strategy, pub/sub
- ORM usage: Prisma, Drizzle — correct patterns and common mistakes

**@devops**
- Docker: Dockerfile best practices, multi-stage builds, compose files
- Cloudflare: Pages, Workers, R2, DNS configuration
- GCP: Cloud Run, Storage, IAM
- CI/CD: GitHub Actions workflow patterns

**@better-auth**
- OAuth 2.0 integration (Google, GitHub, Discord)
- Session management, JWT patterns
- Two-factor authentication (TOTP)
- Role-based access control

**@web-frameworks**
- Next.js App Router: server components, client components, layouts, route handlers, middleware
- Turborepo: monorepo structure, package sharing, build pipeline
- Vite: config, plugins, environment variables

**@mermaidjs-v11**
- Flowcharts, sequence diagrams, entity relationship diagrams, state machines
- Correct Mermaid v11 syntax (v11 has breaking changes from v10)

**@context-engineering**
- Structuring AI agent context to be accurate and not bloated
- Useful when building multi-agent systems or long-running agentic workflows

**@sequential-thinking**
- Breaking complex problems into a chain of smaller, verifiable steps
- Useful for architecture decisions or debugging problems with multiple potential causes

### Install
```bash
git clone https://github.com/mrgoonie/claudekit-skills /tmp/claudekit-skills
cp -r /tmp/claudekit-skills/.claude/skills/* .agent/skills/
```

### Triggers by skill
| Skill | Use when |
|-------|----------|
| `@code-review` | Before delivering any code |
| `@debugging/systematic-debugging` | Stuck on a bug for more than one attempt |
| `@debugging/verification-before-completion` | Always, before saying done |
| `@debugging/defense-in-depth` | Building data pipelines or forms with user input |
| `@backend-development` | Any API or server work |
| `@databases` | Schema design, queries, migrations |
| `@devops` | Deployment, containers, CI/CD |
| `@better-auth` | Any authentication feature |
| `@web-frameworks` | Next.js App Router patterns |
| `@mermaidjs-v11` | Creating architecture or flow diagrams |

---

## SKILL 9 — Anthropic Official Document Skills
**Source:** `github.com/anthropics/skills`
**Use for:** Creating or processing Word documents, PDFs, presentations, and spreadsheets

### What is inside this skill collection

**@docx**
- Creates .docx files from scratch using python-docx
- Handles: headings, paragraphs, tables, images, headers, footers, page numbers, table of contents
- Fills existing Word templates with dynamic content
- Extracts and restructures content from uploaded .docx files
- Correct approach for professional documents that need to be emailed or printed

**@pdf**
- Extracts text and tables from PDF files
- Creates new PDFs using ReportLab or WeasyPrint
- Merges multiple PDFs into one, splits PDFs into pages
- Fills PDF form fields
- Adds watermarks, rotates pages
- Note: use the pdf skill specifically — do not use pypdf directly

**@pptx**
- Creates PowerPoint presentations from scratch using python-pptx
- Builds slides with layouts, text, images, charts, tables
- Reads and extracts content from existing .pptx files
- Applies themes and consistent slide formatting

**@xlsx**
- Creates Excel spreadsheets with python-openpyxl or xlsxwriter
- Handles formulas, named ranges, charts, conditional formatting
- Cleans and restructures messy CSV or tabular data
- Builds financial models, data tables, dashboards

### Install
```bash
# Check github.com/anthropics/skills for current Antigravity install instructions
```

### Trigger
- "Create a Word document" → `@docx`
- "Make a PDF" → `@pdf`
- "Build a presentation" → `@pptx`
- "Create a spreadsheet" → `@xlsx`
- Any file with extension .docx, .pdf, .pptx, .xlsx in the user's request

---

## Skill Conflict Rules

Never activate these combinations at the same time:

```
❌ @threejs-webgl + @babylonjs-engine   → same purpose, pick one
❌ @gsap-scrolltrigger + @locomotive-scroll → scroll library conflict
❌ All skills simultaneously → severe context bloat, confused output
```

The correct approach:
- Read this registry
- Identify the task
- Activate 2–4 skills maximum
- Complete the task
- Move to the next task with only the skills that task needs

---

## Master Install Command (Run Once at Project Start)

```bash
# 1. Antigravity Awesome Skills — 1,239+ general skills
npx antigravity-awesome-skills --antigravity

# 2. Emil Kowalski animation skill
npx skills add emilkowalski/skill

# 3. Graphify — codebase knowledge graph
pip install graphifyy
graphify antigravity install

# 4. ClaudeKit Skills — backend, debugging, code review
git clone https://github.com/mrgoonie/claudekit-skills /tmp/claudekit-skills
cp -r /tmp/claudekit-skills/.claude/skills/* .agent/skills/

# 5. UI UX Pro Max — see github.com/nextlevelbuilder/ui-ux-pro-max-skill README for install command

# 6. Impeccable — see impeccable.style for download and install instructions

# 7. Claude Design Skills (3D/animation) — see github.com/freshtechbro/claudedesignskills README

# 8. Anthropic official skills (docx, pdf, pptx, xlsx, frontend-design)
#    See github.com/anthropics/skills README for current install command
```

After installing, verify skills are present in `.agent/skills/` before starting any task.

---

## Quick Reference

```
UI build (any website, page, component):
  → @ui-ux-pro-max + @impeccable + @frontend-design

3D or WebGL:
  → @threejs-webgl (or @react-three-fiber for React)

Scroll animation:
  → @gsap-scrolltrigger

React animation:
  → @motion-framer

Animation review:
  → @emilkowalski-skill

Codebase mapping:
  → @graphify

Before delivering any code:
  → @code-review + @debugging/verification-before-completion
  → npx impeccable detect src/

Documents:
  → @docx / @pdf / @pptx / @xlsx

Backend or API:
  → @backend-development + @databases

Deployment:
  → @devops

Auth:
  → @better-auth
```
