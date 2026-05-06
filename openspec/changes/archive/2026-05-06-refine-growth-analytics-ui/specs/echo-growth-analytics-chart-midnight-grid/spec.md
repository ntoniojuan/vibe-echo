## ADDED Requirements

### Requirement: Midnight chart grids remain visible

When Midnight (`dark`) theme is active, the Growth Analytics radar chart polar grid and the Growth Trend line chart Cartesian grid (including axis guide strokes that rely on chart grid tokens) SHALL remain visually distinguishable from the chart background at typical viewport sizes.

#### Scenario: Radar grid contrast

- **WHEN** the user views the ACE balance radar chart in Midnight mode
- **THEN** polar grid lines SHALL use stroke colors or opacities sufficient to read against the dark card background

#### Scenario: Line chart grid contrast

- **WHEN** the user views the Growth Trend line chart in Midnight mode
- **THEN** Cartesian grid lines and axis lines SHALL use stroke colors or opacities sufficient to read against the dark card background
