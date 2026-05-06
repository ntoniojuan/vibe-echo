## ADDED Requirements

### Requirement: Document root uses themed canvas color

The application SHALL apply the active theme’s semantic background color to both `<html>` and `<body>` so the full viewport—not only nested surfaces—reflects light or Midnight (dark) mode.

#### Scenario: Midnight mode fills the viewport

- **WHEN** the user enables Midnight mode such that the document root has the `dark` class
- **THEN** `<html>` and `<body>` SHALL use the same semantic dark canvas color as defined by theme CSS variables (deep navy / charcoal family aligned with workspace tokens)
- **AND** no default light browser canvas SHALL show through on overscroll or before inner layouts paint

#### Scenario: Light mode unchanged for document canvas

- **WHEN** the user is in light mode (`dark` class absent)
- **THEN** `<html>` and `<body>` SHALL use the light theme semantic background from the same token source as the rest of the app
