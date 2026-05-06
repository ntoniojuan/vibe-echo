## 1. Document surface (Midnight canvas)

- [x] 1.1 In `project-echo/src/app/globals.css`, confirm dark-mode semantic tokens for `--color-background` / `--color-echo-workspace` match the intended deep navy / charcoal (adjust to `#0B1120` or equivalent in **one** central place if product wants that exact hex).
- [x] 1.2 Apply theme-aware background classes or CSS to `<html>` and `<body>` in `project-echo/src/app/layout.tsx` (via `className` and/or `globals.css` rules for `html`/`body`) so the full viewport uses semantic canvas color in light and dark.
- [x] 1.3 Verify `EchoAppShell` and wizard full-width backgrounds do not create a second conflicting strip; simplify shell wrappers only if redundant after body/html paint.

## 2. Shared page header component

- [x] 2.1 Add a dedicated presentational component (e.g. `EchoAppPageHeader`) in `project-echo/src/components/shell/` with props for optional eyebrow, title, optional description, and optional trailing slot; centralize title and subtitle typography classes per `design.md`.
- [x] 2.2 Replace the ad hoc header block in `EchoDashboardHomeClient.tsx` with the shared header; pass the avatar cluster as `trailing` where appropriate.
- [x] 2.3 Replace the stats page title block in `EvaluateeStatsDashboard.tsx` with the shared header; map “Growth analytics” to the eyebrow slot and preserve evaluatee copy in description.
- [x] 2.4 Replace the profile title row in `EchoProfilePageClient.tsx` with the shared header; pass About + theme controls as `trailing`.
- [x] 2.5 Update `EchoWizard.tsx` step introduction headers (steps that render the top title + description) to use the shared header pattern while preserving ACE step layouts.

## 3. Sidebar footer icons

- [x] 3.1 In `EchoAppSidebar.tsx`, verify Profile and Logout rows render leading Lucide icons with the same dimensions, stroke, and `gap-3` layout as primary items; adjust classes or extract small icon row helper if primary links migrate to Lucide later.
- [x] 3.2 Manually verify desktop sidebar at active and inactive states for Profile and Logout contrast in Midnight mode.

## 4. Verification

- [x] 4.1 Smoke-test light and Midnight: `/dashboard`, `/evaluatee/stats`, `/dashboard/profile`, `/evaluation` (wizard steps with headers), marketing `/` for regressions, and auth loading/redirect screens for wrong canvas color.
