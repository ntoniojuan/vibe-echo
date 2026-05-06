## ADDED Requirements

### Requirement: Unified sticky dashboard title and tabs

On the dashboard home inbox view, the page title region and the Received / Sent / Review tab controls SHALL be implemented as one contiguous sticky header unit.

#### Scenario: Single sticky region

- **WHEN** the user scrolls the dashboard inbox content
- **THEN** the title block and tablist SHALL stick together as one chrome strip at the top of the viewport

### Requirement: Glass-like sticky appearance

The unified sticky dashboard header SHALL use backdrop blur and a semi-opaque background in Light mode (for example `backdrop-blur-md` with `bg-white/80` class semantics) and a Midnight-appropriate translucent counterpart so the header does not present as a fully opaque flat slab.

#### Scenario: Translucent chrome in Light mode

- **WHEN** the dashboard sticky header is visible in Light mode
- **THEN** content scrolling beneath SHALL be subtly visible through blurred translucency rather than an opaque workspace fill alone

#### Scenario: Midnight glass counterpart

- **WHEN** the dashboard sticky header is visible in Midnight mode
- **THEN** the strip SHALL use backdrop blur with a semi-transparent dark tint appropriate for readability

### Requirement: Sticky stacking priority

The unified sticky dashboard header SHALL use a z-index high enough to remain above scrolling inbox cards without obscuring global modals that intentionally layer higher.

#### Scenario: Tabs remain clickable while scrolling

- **WHEN** inbox cards scroll under the sticky header
- **THEN** tab controls SHALL remain visible and operable
