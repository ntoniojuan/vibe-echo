## Why

Project ECHO’s UI is tuned for a light “sage + warm cream” workspace. Evaluators and evaluatees who prefer low-light environments need a cohesive **Midnight** theme that preserves brand sage green, keeps GAINS semantics legible, and avoids harsh flashes when switching modes.

## What Changes

- Introduce a **theme system** (e.g. **`next-themes`**) with **light** (current default) and **Midnight** (dark) modes, persisting the user’s choice in **local storage** so it survives sessions and logins on the same browser.
- Add a **Midnight palette** mapped to existing semantic CSS variables (`globals.css` / Tailwind theme): deep navy/charcoal **background**, slightly elevated **card/surface** tones (12px+ radii unchanged), **warm cream / off-white** primary text, muted secondary text. **Sage green** remains the **primary** brand color with **WCAG contrast** on dark surfaces; **GAINS** amber/green bands are **retuned** for dark surfaces (clear but not neon).
- Add a **Sun/Moon** (or equivalent) **theme toggle**: visible in **desktop chrome** (sidebar header row next to ECHO branding — the primary persistent “header” in the app shell) and again on the **Profile** page for **mobile** users who lack the sidebar.
- Apply a **~0.3s** smooth **transition** on `color`, `background-color`, `border-color`, and related properties where practical so theme changes feel like a soft fade.
- **Growth analytics**: **Radar** (`EvaluateeStatsRadarCard`) and **line** (`EvaluateeStatsTrendCard`) **grids and axes** use **light gray** strokes in Midnight so grid lines remain visible; tooltips and series colors remain readable.

## Capabilities

### New Capabilities

- `echo-midnight-theme`: Theme provider, persistence, Midnight/light tokens, sage + GAINS contrast, transitions, and toggle placement (desktop sidebar header + Profile on mobile).
- `echo-stats-charts-midnight`: Recharts-based stats dashboard visuals (radar + line chart) follow Midnight grid/axis rules.

### Modified Capabilities

- _(none — no archived root specs in `openspec/specs/` for this repo layout.)_

## Impact

- **Dependencies**: Add `next-themes` (or agreed alternative) to `project-echo`.
- **Files**: `src/app/layout.tsx` (`<html suppressHydrationWarning>`, `ThemeProvider`); `src/app/globals.css` (`.dark` or `class="dark"` token overrides); shell (`EchoAppSidebar`, `EchoProfilePageClient`); evaluatee stats chart components; optionally heat map card / hard-coded legend swatches for dark harmony.
- **Marketing / landing** routes: confirm whether Midnight applies globally or only `(app)` shell — default **global** unless product excludes marketing.
