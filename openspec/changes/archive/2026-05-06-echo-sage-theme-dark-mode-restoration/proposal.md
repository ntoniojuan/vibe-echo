## Why

Project ECHO’s UI drifted away from the intended **Sage** accent palette toward default **blue** primaries, and theme switching no longer behaves consistently—especially after mixing Tailwind tokens and manual overrides. We need a single authoritative Sage accent story plus a strict **`html.dark` root contract** and foundational surface tokens so light stays **card-on-gray canvas** and dark stays **card-on-deep-navy** with readable Growth Analytics charts.

## What Changes

- Restore **sage green** as the sole semantic primary accent (approx. **`#889F88`** baseline); replace lingering blue primaries on buttons, active tabs, “New Evaluation,” rings/links where those routes intended Sage styling.
- Add a **higher-contrast deeper Sage** variant specifically for **“Refine with AI”** so it remains distinguishable from ordinary primaries on midnight surfaces.
- Fix theme orchestration so **Dark Mode toggling exclusively adds/removes `.dark` on `<html>`** (no fragmented document/class toggles that disagree).
- In **`globals.css`**, enforce **dark foundational globals**: `html.dark body` background **`#0B1120`**, default foreground **`#F8FAFC`**; elevate cards to **`#131B2B`** with subtle **`#1E293B`** borders where cards appear white in light mode.
- **Preserve sticky chrome**: sidebar + dashboard glass/header sticky behaviors remain as implemented today—verification-only regression passes.
- **Growth Analytics**: Radar + Line charts use **light / visible grid lines** in dark mode so ticks/grid aren’t lost against navy canvas.

## Capabilities

### New Capabilities

- `echo-sage-primary-accent`: Semantic Sage accent palette for interactive emphasis (`primary`, tabs, CTAs) plus a documented darker Sage variant for “Refine with AI.”
- `echo-theme-dark-html-root`: Theme toggle MUST synchronize `.dark` on `<html>` as the root contracts dark variants globally.
- `echo-dark-foundational-surfaces`: Spec-level guarantees for dark-mode canvas (`#0B1120`), default body text (`#F8FAFC`), elevated cards (`#131B2B`), and subtle borders (`#1E293B`) wired via `@theme` / CSS selectors—not scattered literals alone.
- `echo-layout-sticky-chrome-stable`: Regression contract that authenticated sidebar sticky/full-height behavior and dashboard sticky glass/chrome patterns remain intact after palette refactor.

### Modified Capabilities

- `echo-stats-charts-midnight`: Extend / reconcile requirement wording so **radar + trend line charts** guarantee readable grid/guide strokes against midnight dashboards (light-toned grid lines).
- `echo-main-canvas-elevated-cards`: Align wording where elevated-card borders map to **`border-[#1E293B]` (or semantic alias)** in dark mode alongside **`#131B2B`** faces—avoid conflicting drift vs foundational specs.

## Impact

- **`project-echo/src/app/globals.css`** (`@theme`, `.dark` selectors), Tailwind color aliases referencing `--color-primary*` / semantic surfaces.
- Theme machinery likely **`EchoThemeToggle`** / provider storing preference (`layout.tsx`, hooks/localStorage)—ensure **`document.documentElement.classList`** is authoritative on `<html>`.
- Components referencing **`primary`**, **`bg-blue-*`**, or leftover **`ring-blue*`**: Dashboard tabs/buttons, `EchoAppSidebar` “New Evaluation,” wizard CTAs, refinement buttons.
- **Growth analytics chart components** (`EvaluateeStatsRadarCard`, `EvaluateeStatsTrendCard`, Recharts configs): stroke/grid defaults for midnight.
