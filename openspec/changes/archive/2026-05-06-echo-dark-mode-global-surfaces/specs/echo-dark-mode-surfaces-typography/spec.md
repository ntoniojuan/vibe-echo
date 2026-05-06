## ADDED Requirements

### Requirement: Dark mode surface and background hierarchy

When the document root has the **`dark` class** (dark theme active), the application SHALL present **deep navy / charcoal** main backgrounds (page shell and workspace) and **evaluation or dashboard cards** SHALL use a **slightly lighter** navy or blue-gray surface so cards are distinguishable from the workspace. Light theme appearance SHALL remain unchanged aside from intentional token alignment.

#### Scenario: Authenticated wizard and dashboard

- **WHEN** the user enables dark mode and views the evaluation wizard or dashboard  
- **THEN** the primary page background and workspace use the dark navy/charcoal token ladder and card surfaces appear as a lighter step in that ladder

#### Scenario: Marketing or auth-adjacent screens

- **WHEN** dark mode is active on routes that previously used a fixed light-only background  
- **THEN** those screens SHALL participate in dark mode using semantic background tokens (no stuck light-only page fill that ignores `.dark`)

### Requirement: Warm cream primary typography in dark mode

When **`dark` is active**, primary text (headings, default body copy using semantic `on-surface` / `foreground` utilities) SHALL render as **warm cream or off-white** with sufficient contrast against dark surfaces; muted secondary text SHALL remain legible using `on-surface`-variant tokens.

#### Scenario: Readability

- **WHEN** dark mode is on  
- **THEN** default article and form labels using primary semantic text colors are cream/off-white, not deep navy left over from light theme
