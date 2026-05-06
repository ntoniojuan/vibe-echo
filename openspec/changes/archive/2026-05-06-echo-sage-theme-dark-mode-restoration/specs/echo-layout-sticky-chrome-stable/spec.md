## ADDED Requirements

### Requirement: Desktop sidebar sticky behavior survives palette refactor

After Sage restoration token updates, the desktop authenticated sidebar SHALL retain **`sticky`**, **`top-0`**, and **`min-height`/viewport filling semantics** consistent with current Echo desktop chrome—avoid regressions where sidebar stops pinning during vertical scroll.

#### Scenario: Dashboard vertical scroll preserves pinned sidebar

- **WHEN** the user scrolls long inbox feeds on desktop widths showing the sidebar
- **THEN** the sidebar SHALL remain pinned/sticky per established Echo desktop navigation expectations without collapsing behind content unexpectedly due to theme refactors alone

### Requirement: Dashboard sticky glass/header chrome persists

Dashboard header regions implemented as sticky translucent chrome SHALL remain **`sticky`** with meaningful z-index stacking versus inbox feeds beneath—palette swaps MUST NOT strip positioning primitives (`sticky`, `top`, offsets aligning gutters).

#### Scenario: Scroll beneath sticky dashboard chrome

- **WHEN** the user scrolls the dashboard feed beneath header/tab chrome implemented sticky today
- **THEN** the sticky chrome SHALL remain affixed without positional regressions attributable strictly to theme class swaps
