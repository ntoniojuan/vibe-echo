## ADDED Requirements

### Requirement: Desktop sidebar navigation

On **viewports at or above the design breakpoint** (desktop), the system SHALL show a **persistent sidebar** with navigation to **Home**, **Create Eval**, **My Stats**, and **Profile**, each with an icon and accessible label.

#### Scenario: Desktop user sees sidebar

- **WHEN** an authenticated user views the application at desktop width
- **THEN** the system SHALL display a sidebar containing exactly those four destinations (additional items are out of scope unless specified)

### Requirement: Mobile bottom navigation

On **viewports below the desktop breakpoint**, the system SHALL show a **bottom navigation bar** with the same four destinations as icons (and text or labels per accessibility guidelines).

#### Scenario: Mobile user sees bottom nav

- **WHEN** an authenticated user views the application at mobile width
- **THEN** the system SHALL display a bottom navigation bar with **Home**, **Create Eval**, **My Stats**, and **Profile**

### Requirement: Navigation targets are reachable

Each shell navigation item SHALL route to a stable in-app path documented in implementation tasks (no dead links for MVP).

#### Scenario: User navigates from shell

- **WHEN** the user selects any of the four shell destinations
- **THEN** the system SHALL navigate to the corresponding route and SHALL preserve authentication state
