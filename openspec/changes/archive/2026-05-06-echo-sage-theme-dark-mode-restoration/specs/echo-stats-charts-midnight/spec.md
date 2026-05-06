## MODIFIED Requirements

### Requirement: Radar chart grid visibility in Midnight

The **ACE balance** radar chart (`EvaluateeStatsRadarCard`) SHALL use **grid and guide** strokes that remain **clearly visible** when **`html` carries class `dark`** (Midnight active), using **light-toned** strokes (for example **light gray / slate-200–400 family equivalents**) so grids never resemble leftover low-contrast mid-gray tuned solely for Light mode.

#### Scenario: Midnight radar readability

- **WHEN** `document.documentElement` includes class `dark` and the user views the Growth analytics radar chart
- **THEN** polar grid lines SHALL be clearly visible against the chart plotting surface

### Requirement: Line chart grid and axes in Midnight

The **overall score trend** line chart (`EvaluateeStatsTrendCard`) SHALL use **Cartesian grid** and **axis** strokes that remain **clearly visible** when **`html` carries class `dark`**, using **light-toned** grid/guide strokes comparable to the radar requirement.

#### Scenario: Midnight trend chart readability

- **WHEN** `document.documentElement` includes class `dark` and the user views the trend line chart
- **THEN** grid lines and axis lines SHALL be clearly visible against the chart plotting surface

### Requirement: Chart tokens follow global theme

Radar and line chart components SHALL derive grid/axis/tooltip colors from **theme-aware tokens** (CSS variables or Tailwind semantic colors) keyed to **`html.dark`** activation so Light vs Midnight updates propagate automatically without per-chart manual theme branching strings scattered across components.

#### Scenario: Switching theme updates charts

- **WHEN** the user toggles Midnight such that class `dark` is added or removed from `<html>` while viewing stats
- **THEN** chart grids and axes SHALL update to contrast-appropriate strokes for the active theme without requiring a full page navigation
