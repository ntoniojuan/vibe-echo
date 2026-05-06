## ADDED Requirements

### Requirement: Desktop sidebar stays viewport-aligned while scrolling

On viewports where the desktop sidebar is visible (`md` breakpoint and above), the sidebar navigation container SHALL span at least the full viewport height and SHALL remain pinned to the top edge of the viewport while the user scrolls the main document.

#### Scenario: Sidebar visible during long inbox scroll

- **WHEN** the user views any authenticated page with the desktop sidebar visible and scrolls the main content vertically beyond one viewport height
- **THEN** the sidebar SHALL remain visible adjacent to the content without disappearing behind the fold solely due to main-pane scroll
- **AND** the sidebar SHALL occupy at least full viewport height (`min-h-screen` semantics)

### Requirement: Sidebar column fills shell height

The desktop sidebar column SHALL stretch to fill the available shell column height (`h-full` / stretch-equivalent) so its background and footer affordances do not appear vertically truncated relative to the main column when content is short.

#### Scenario: Short main content

- **WHEN** main content height is shorter than the viewport
- **THEN** the sidebar chrome SHALL still present as full-height column styling consistent with the shell
