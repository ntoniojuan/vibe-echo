## ADDED Requirements

### Requirement: Growth Trend explanation is visible

The Growth Trend chart section SHALL display explanatory copy that states the line reflects the evaluatee’s average ACE scores across the last four completed evaluation cycles; the implementation SHALL preserve that meaning in visible subtitle or caption text.

#### Scenario: Caption beside chart heading

- **WHEN** the user opens Growth Analytics and views the Growth Trend card
- **THEN** a caption or subtitle visible without hovering SHALL communicate that the graph plots average ACE scores over the last four evaluation cycles

### Requirement: Reinforcing tooltip or accessible description

The Growth Trend chart SHALL provide a tooltip or programmatic description (for example via chart tooltip content or `aria-describedby`) that reinforces the same interpretation of the plotted series.

#### Scenario: Tooltip reinforces cycles

- **WHEN** the user focuses or hovers the Growth Trend chart area
- **THEN** contextual help text SHALL be available that references average ACE scores over the last four evaluation cycles
