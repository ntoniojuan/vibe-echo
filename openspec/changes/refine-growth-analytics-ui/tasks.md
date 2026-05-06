## 1. Competency heat map (3×4)

- [x] 1.1 In `EvaluateeStatsHeatMapCard.tsx`, replace the `grid-rows-4` / sixteen-slot padding logic with a **3×4** grid (`grid-cols-4 grid-rows-3`) and remove dashed placeholder cells.
- [x] 1.2 Assert render order matches `echoGainsSubcompetencyCatalog` (A1–A4, C1–C4, E1–E4) so each row is one ACE pillar; add a dev-only comment if helpful.

## 2. Growth Trend labeling

- [x] 2.1 In `EvaluateeStatsTrendCard.tsx`, set visible subtitle/caption text to clarify: average ACE scores over the **last four completed evaluation cycles** (align with user-facing wording from `design.md`).
- [x] 2.2 Add or extend Recharts `Tooltip` (and/or `aria-describedby` on the card/chart wrapper) so hover/focus reinforces the same interpretation without conflicting with the subtitle.

## 3. Midnight chart grid contrast

- [x] 3.1 In `globals.css` `.dark`, increase visibility of `--color-chart-grid` (and any chart-axis tokens if separated) so radar `PolarGrid` and line `CartesianGrid` strokes read clearly on dark surfaces.
- [x] 3.2 If token tweaks alone are insufficient, slightly adjust `CartesianGrid` / `PolarGrid` opacity in the respective cards—prefer staying on semantic variables.

## 4. Verification

- [x] 4.1 Smoke `/evaluatee/stats` in **light** and **Midnight**: heat map has twelve cells only; trend copy reads correctly; radar and line grids visible.
