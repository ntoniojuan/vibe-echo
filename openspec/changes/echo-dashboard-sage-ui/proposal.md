## Why

The signed-in **dashboard** and **app chrome** should match the high-fidelity ECHO reference: a **dark primary navigation** column, a **sage-tinted** (not yellow/cream) workspace, and a **structured inbox** with clear **Received / Sent / Review** cues. Today `project-echo` uses a light cream sidebar and minimal list cards; aligning visuals improves perceived quality and matches product mockups.

## What Changes

- Introduce a **sage-forward** surface palette for the **main content area** and shared app shell backgrounds (replace dominant **cream / `#fdfcf0`** feeling with muted sage greens and neutrals).
- Redesign **desktop sidebar**: **dark charcoal/navy** background, **ECHO** branding + **MedGrocer Performance** sub-label, **prominent “+ New Evaluation”** (or equivalent) CTA in **forest/sage green**, nav items (**Home**, **Create**, **Stats**) with **active** state (accent bar + icon treatment per design), and **footer cluster** (**Profile**, **Settings** if routed, **Logout**).
- Redesign **`/dashboard`**: top **page header** (“Dashboard”) with optional **utility cluster** (notifications placeholder, help, avatar); **tabs** labeled to match the mock — **Received** (evaluations others submitted about the user), **Sent** (evaluations the user submitted as evaluator), **Review** (drafts the user must complete) — replacing the current **For my review / My feedback / My evals** labels while preserving the same data wiring.
- **Inbox cards**: elevated **card** pattern — badges (e.g. New/Updated when derivable), title + relative time + “From:” line, preview snippet, **Head / Heart / Hands** footer affordances (icons or labels), and primary/secondary actions (**Review** / **Continue** / **View**).
- **Right column “Cycle Progress”** widget on large viewports: progress for **received** vs a target and **self evals sent** vs target; **v1** may use real counts from existing Firestore lists with **documented placeholder targets** until product defines goals.
- **Mobile**: preserve **bottom navigation**; ensure new colors meet contrast on dark sidebar text and sage body (WCAG-minded).

## Capabilities

### New Capabilities

- `echo-dashboard-chrome`: **Visual language** and **responsive shell** — sage workspace, dark sidebar, CTA styling, bottom nav harmonization, optional header utilities on dashboard.
- `echo-dashboard-inbox-ui`: **Dashboard home** layout — tab naming (**Received / Sent / Review**), **feed cards**, **Cycle Progress** widget, responsive grid (feed + widget).

### Modified Capabilities

- *(none — no baseline `openspec/specs/` in repo)*

## Impact

- **project-echo**: `EchoAppShell`, `EchoAppSidebar`, `EchoAppBottomNav`, global CSS variables / Tailwind theme (`globals.css` or token file), `EchoDashboardHomeClient` (+ possible small presentational components under `components/dashboard/`), optional shared `CycleProgress` widget; Firestore read hooks unchanged but consumers may pass **counts** into the widget.
- **Dependencies**: none beyond existing stack; icon set may use inline SVG or existing icon approach in repo.
- **Breaking (UX):** Inbox tab **labels** change; no API **BREAKING** for data.
