## ADDED Requirements

### Requirement: ACE teammate sidebar stays visible while scrolling

On viewports where the ACE step shows the teammate history **beside** the main form column, the sidebar column SHALL use sticky positioning at the top of the scroll container (e.g. `top-0`) so it remains visible as the user scrolls long observation and ratings content.

#### Scenario: Desktop tall ACE page

- **WHEN** the user scrolls the main ACE observation column on a layout with side-by-side columns
- **THEN** the teammate history sidebar SHALL remain pinned within the viewport according to the sticky rules (and MAY scroll independently if its own content exceeds viewport height)

### Requirement: Mobile bottom navigation uses Lucide icons

On mobile, the bottom-pinned application navigation SHALL show **Home**, **Plus**, **BarChart**, and **User** using `lucide-react` icons instead of large text labels as the primary affordance, while preserving accessible names for each control.

#### Scenario: Mobile user focuses a tab

- **WHEN** assistive technology reports a bottom navigation item
- **THEN** each item SHALL expose a clear accessible name (e.g. `aria-label`) consistent with its destination (home, create evaluation, stats, profile)

#### Scenario: Visual presentation on small screens

- **WHEN** the user views the app on a typical mobile breakpoint where the bottom bar is shown
- **THEN** the bar SHALL display the four Lucide icons as specified without requiring the previous large text labels as the primary label
