## Why

The Growth Analytics (“My Stats”) page implies twelve GAINS sub-competencies across three ACE pillars, but the heat map is laid out as a 4×4 grid padded to sixteen slots—creating an empty fourth category row that does not exist in the ACE model and reads like broken UI. The Growth Trend chart title alone does not clearly state what is plotted; Midnight mode also weakens chart scaffolding because radar and line grid strokes rely on tokens that can blend into dark surfaces.

## What Changes

- **Heat map**: Render the competency matrix as a **3×4 grid** (three ACE rows × four sub-competencies each). Remove placeholder padding cells and any fourth-row affordance that implies an extra ACE category.
- **Growth Trend**: Add explicit supporting copy—**caption near the chart title** and/or **tooltip/help pattern**—stating that the line shows **average ACE scores over the last four completed evaluation cycles** (aligned with product wording).
- **Chart contrast (Midnight)**: Tune **radar** (`PolarGrid` / axes) and **line chart** (`CartesianGrid` / axis lines) so grid strokes remain clearly visible on dark backgrounds without overpowering data ink—prefer **semantic CSS variables** (`--color-chart-grid` and related) over one-off hex in components.

## Capabilities

### New Capabilities

- `echo-growth-analytics-heatmap-grid`: Heat map layout matches ACE structure (three categories, four columns); no empty fourth category row.
- `echo-growth-analytics-trend-explainer`: Growth Trend chart carries user-visible explanation (caption and/or tooltip) for what the series represents.
- `echo-growth-analytics-chart-midnight-grid`: Radar and line charts use sufficiently visible grid and axis guide lines when `.dark` is active.

### Modified Capabilities

- _(none — `openspec/specs/` has no published baseline specs.)_

## Impact

- **Code**: `project-echo` — `EvaluateeStatsHeatMapCard.tsx`, `EvaluateeStatsTrendCard.tsx`, `EvaluateeStatsRadarCard.tsx`, possibly `globals.css` (`--color-chart-grid` / chart-related tokens in `.dark`).
- **Data**: No API or Firestore changes; cell ordering should remain consistent with `echoGainsSubcompetencyCatalog` (twelve rows).
- **Risk**: Low — UI and theme tokens only.
