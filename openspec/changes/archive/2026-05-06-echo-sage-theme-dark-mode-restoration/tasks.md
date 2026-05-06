## 1. Theme tokens (Sage + dark anchors)

- [x] 1.1 In `project-echo/src/app/globals.css`, redefine `@theme` `--color-primary` family around Sage **`#889F88`** with readable on-primary foreground; add **`--color-primary-strong`** (or `--color-echo-refine-ai-fill`) as documented darker Sage for refinement emphasis.
- [x] 1.2 Under **`html.dark`**, enforce `body` background **`#0B1120`** and base text **`#F8FAFC`**; align semantic `--color-background`, `--color-foreground`, `--color-echo-main-canvas`, `--color-echo-elevated-card`, and dark card **`border`** tokens toward **`#1E293B`** where elevated panels replace former white cards.

## 2. Root dark-mode contract

- [x] 2.1 Update theme bootstrap (`EchoThemeToggle`, layout/scripts/hooks) so **only** `document.documentElement.classList` toggles **`dark`**—remove or mirror conflicting `body`-only patterns so Midnight selectors keyed off `html.dark` stay coherent.
- [x] 2.2 Verify persisted preference + `prefers-color-scheme` hydration applies the same root contract on first paint (minimize FOUC where feasible).

## 3. Component accent sweep (remove accidental blue)

- [x] 3.1 Sweep authenticated surfaces for **`bg-blue-*`**, **`text-blue-*`**, **`ring-blue-*`**, or stale primary mappings; redirect CTAs (dashboard tabs, sidebar **New Evaluation**, wizard primaries) to Sage **`primary`** utilities.
- [x] 3.2 Wire **Refine with AI** triggers to **`primary-strong`** / darker Sage semantic per design doc.

## 4. Growth analytics charts

- [x] 4.1 Update `EvaluateeStatsRadarCard` + `EvaluateeStatsTrendCard` grid/axis strokes to consume theme vars / light-toned strokes when **`html.dark`**, confirming grids remain visible on navy backgrounds.

## 5. Layout regression checks

- [x] 5.1 Spot-check desktop sidebar **`sticky`/`h-screen`** and dashboard sticky header/chrome after token edits.
- [x] 5.2 Confirm light mode preserves **card-on-canvas** hierarchy (slate-tint canvas vs elevated cards).

## 6. Verification

- [x] 6.1 Run **`npm run lint`** and **`npm run build`** in `project-echo`; smoke Dashboard, Evaluation wizard (ACE + refinement), Profile, Growth analytics in Light + Midnight.
