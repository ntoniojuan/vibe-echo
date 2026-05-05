## 1. Dependencies and provider

- [x] 1.1 Add `next-themes` to `project-echo`; create `EchoThemeProvider` (client) wrapping children with `attribute="class"`, `defaultTheme="light"`, storage key like `echo-theme`, and `themes={['light','dark']}` (or `midnight` mapped to `dark` if using custom name — document in code).
- [x] 1.2 Update root `layout.tsx`: `suppressHydrationWarning` on `<html>`; mount `ThemeProvider` inside `<body>` per library guidance.

## 2. Midnight tokens and transitions

- [x] 2.1 In `globals.css`, add `.dark` (or `.dark` + Tailwind `dark:` if enabled) overrides for semantic tokens: `background`, `foreground`, `echo-workspace`, `echo-card`, surfaces, outlines, `on-surface`, shadows; harmonize `echo-sidebar` if needed.
- [x] 2.2 Add global transition (~0.3s ease) on `body` and key shell surfaces for background/color/border (avoid breaking motion-reduced users — respect `prefers-reduced-motion` if adding long transitions).
- [x] 2.3 Tune **primary** sage / container colors for AA contrast on dark; spot-check primary buttons and links.
- [x] 2.4 Audit **GAINS** heat map and legend (`EvaluateeStatsHeatMapCard`, `readEvaluateeHeatMapPresentation`) for dark readability; prefer CSS variables or dark-scoped overrides over neon hues.

## 3. Toggle UI

- [x] 3.1 Add `EchoThemeToggle` control (Sun/Moon from `lucide-react` or SVG) with accessible `aria-label`.
- [x] 3.2 Place toggle in `EchoAppSidebar` header row (visible `md+` only).
- [x] 3.3 Add the same toggle to `EchoProfilePageClient` for mobile access (show on small screens; optional hide on `md+` if redundant — avoid duplicate on desktop if sidebar always visible).

## 4. Stats charts

- [x] 4.1 Introduce chart-focused CSS variables (e.g. `--color-chart-grid`, `--color-chart-axis`) with light and dark values; wire `EvaluateeStatsRadarCard` (`PolarGrid`, axes) and `EvaluateeStatsTrendCard` (`CartesianGrid`, axes, tooltip border) to those tokens.
- [x] 4.2 Verify line series and radar fill remain legible in Midnight (adjust `inverse-surface` / dot strokes if they clip on dark).

## 5. Verification

- [x] 5.1 `npm run lint` && `npm run build` in `project-echo`.
- [x] 5.2 Manual: toggle persistence after reload; dashboard, wizard, stats (radar + line + heat map), profile; contrast sanity on primary CTA.
