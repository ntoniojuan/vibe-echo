## ADDED Requirements

### Requirement: Radar chart grid visibility in Midnight

The **ACE balance** radar chart (`EvaluateeStatsRadarCard`) SHALL use **grid and guide** strokes that remain **clearly visible** on dark backgrounds in Midnight mode (e.g. **light gray** strokes), without relying on low-contrast mid-gray left over from the light theme.

#### Scenario: Midnight radar readability

- **WHEN** Midnight is active and the user views the Growth analytics radar chart
- **THEN** polar grid lines SHALL be visible against the chart background

### Requirement: Line chart grid and axes in Midnight

The **overall score trend** line chart (`EvaluateeStatsTrendCard`) SHALL use **Cartesian grid** and **axis** strokes that remain **clearly visible** on dark backgrounds in Midnight mode (e.g. **light gray** grid lines).

#### Scenario: Midnight trend chart readability

- **WHEN** Midnight is active and the user views the trend line chart
- **THEN** grid lines and axis lines SHALL be visible against the chart background

### Requirement: Chart tokens follow global theme

Radar and line chart components SHALL derive grid/axis/tooltip colors from **theme-aware tokens** (CSS variables or Tailwind semantic colors) so Light and Midnight both behave correctly without separate manual toggles per chart.

#### Scenario: Switching theme updates charts

- **WHEN** the user switches between Light and Midnight while viewing stats
- **THEN** chart grids and axes SHALL update to the appropriate contrast for the active theme
