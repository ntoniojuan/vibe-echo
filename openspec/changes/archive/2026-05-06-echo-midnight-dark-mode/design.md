## Context

- Theming today is **static light** in `src/app/globals.css` (`@theme inline` Tailwind v4 tokens): `echo-workspace`, `echo-card`, Material-like `surface-*`, `primary` sage, etc. Layout uses `EchoAppShell` with **dark sidebar** already (`echo-sidebar`) against a **light workspace** — Midnight will **invert the main workspace** while keeping navigation coherent.
- Stats use **Recharts** with strokes tied to CSS variables (`--color-outline-variant`, `--color-on-surface`, etc.) in `EvaluateeStatsRadarCard` and `EvaluateeStatsTrendCard`.
- There is **no** global header bar; **desktop** primary chrome is the **top of `EchoAppSidebar`**. **Mobile** relies on bottom nav; **Profile** is a dedicated page (`EchoProfilePageClient`).

## Goals / Non-Goals

**Goals:**

- **`next-themes`** (or equivalent): `attribute="class"` on `<html>`, **`storageKey`** scoped to ECHO (e.g. `echo-theme`), default **`light`**, **`enableSystem`** optional (product: prefer **explicit light/midnight only** or include system — default recommend **light + dark** with optional system in follow-up).
- **Midnight tokens** as overrides when `html.dark` (or agreed class): background **~#0f172a / #121a2e** range; cards **stepped lighter**; `on-surface` **~#f5f5f0** cream/off-white; outlines readable on dark.
- **Primary**: adjust if needed (slightly lighter sage or brighter on-primary-container) so **primary buttons** meet **≥ 4.5:1** contrast vs midnight background; document spot-check targets.
- **GAINS / heat map**: tune **amber/green** hex or opacity for dark surfaces; avoid fluorescent greens/ambers.
- **Transitions**: `transition-[background-color,color,border-color,box-shadow]` ~**0.3s** `ease` on `body` and shell surfaces.
- **Toggle**: **Desktop (`md+`)** — sidebar header row (logo/title area). **Mobile** — Profile page section (not only hidden sidebar).
- **Charts**: dedicated **`--color-chart-grid`** (or reuse `outline-variant` midnight value) — **light gray** on dark for `PolarGrid`, `CartesianGrid`, axis lines.

**Non-Goals:**

- Redesigning chart types or data.
- Server-side theme (cookies) unless later requested.
- Per-route theme (single global preference).

## Decisions

1. **`next-themes`** — standard for Next App Router; wrap in client `ThemeProvider`; child of `<body>` or wrap `html` per library docs; **suppressHydrationWarning** on `<html>`.
2. **Class strategy** — `class="dark"` on `html` to align with Tailwind v4 dark variant if enabled; else raw `.dark { … }` overrides in `globals.css`.
3. **Sidebar in Midnight** — either **keep** current dark slate sidebar with subtle border or **blend** with midnight workspace; **decision**: slightly harmonize (reduce eyebrow contrast if workspace is also dark) so sidebar does not look “orphaned.”
4. **Heat map** — `EvaluateeStatsHeatMapCard` and `readEvaluateeHeatMapPresentation` use literal hex; **decision**: introduce **CSS variables per band** or **dark-scoped overrides** in CSS to avoid duplicating TS palettes unless necessary.
5. **Marketing pages** — **decision**: apply Midnight globally for consistency; light hero may need token check in `page` layout under `(marketing)` if any.

## Risks / Trade-offs

- **[Risk]** Flash of wrong theme on load → **[Mitigation]** `next-themes` + `suppressHydrationWarning`; avoid FOUC script if still needed on slow networks.
- **[Risk]** Hard-coded colors bypass tokens → **[Mitigation]** grep `#` in components; migrate critical paths to variables.
- **[Risk]** Firestore / third-party embeds unchanged — acceptable.

## Migration Plan

1. Ship provider + tokens + toggles behind no flag (user opt-in via toggle).
2. No data migration.

## Open Questions

- Include **“system”** (follow OS) as third option or strictly **Light / Midnight** binary?
- Should **evaluation wizard** marketing header (`EchoWizard`) use the same shell or stay full-bleed light until wrapped?
