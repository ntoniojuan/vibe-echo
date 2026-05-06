## ADDED Requirements

### Requirement: Theme state and persistence

The application SHALL provide a **Light** theme (existing default appearance) and a **Midnight** dark theme. The user’s selected theme SHALL be **persisted in the browser** (e.g. `localStorage` via `next-themes` or equivalent) so the choice is restored on return visits without requiring a toggle each session.

#### Scenario: User selects Midnight and reloads

- **WHEN** the user chooses Midnight and reloads the application on the same browser
- **THEN** the UI SHALL render in Midnight without requiring the user to toggle again

### Requirement: Midnight semantic palette

In Midnight mode, the main workspace background SHALL use a **deep navy or charcoal** tone; **card** and elevated surfaces SHALL use a **slightly lighter** shade than the background (minimum **12px** corner radius where cards already use rounded styles). Primary body text SHALL use **warm cream or off-white** for high readability against dark surfaces; secondary/muted text SHALL remain distinguishable without harsh contrast.

#### Scenario: Card depth on dark background

- **WHEN** Midnight is active
- **THEN** primary content cards SHALL read as elevated relative to the page background (lighter surface than backdrop)

### Requirement: Brand and GAINS colors on dark

**Sage green** SHALL remain the **primary** brand color for primary actions and positive emphasis. Primary control **foreground/background combinations** SHALL meet **WCAG 2.1 AA** contrast (minimum **4.5:1** for normal text, **3:1** for large text/UI components where applicable) against Midnight surfaces. **GAINS** visualization colors (amber/green progression) SHALL be **adjusted for dark surfaces** so they remain clearly distinguishable and **not neon**.

#### Scenario: Primary button contrast

- **WHEN** Midnight is active and a primary button is shown
- **THEN** the label and fill SHALL satisfy contrast guidance appropriate to the control

### Requirement: Theme toggle placement

A **Sun/Moon** (or semantically equivalent) control SHALL toggle between Light and Midnight. On **desktop** (`md` breakpoint and above), the control SHALL appear in the **app shell header chrome** (the **sidebar header row** alongside ECHO branding). On **mobile**, the same control SHALL appear in the **Profile** screen so users without the sidebar still have access.

#### Scenario: Desktop user toggles from sidebar

- **WHEN** a user on a viewport at or above `md` uses the sidebar header control
- **THEN** they SHALL be able to switch between Light and Midnight

#### Scenario: Mobile user toggles from profile

- **WHEN** a user on a viewport below `md` opens Profile
- **THEN** they SHALL be able to switch between Light and Midnight from that page

### Requirement: Smooth theme transition

When the theme changes, relevant surfaces SHALL animate with a **smooth** transition of approximately **0.3 seconds** so the change feels like a soft fade rather than an instant flash (applied to colors/backgrounds/borders as appropriate).

#### Scenario: User toggles theme

- **WHEN** the user switches between Light and Midnight
- **THEN** the visual transition SHALL appear gradual (on the order of 0.3s), not an abrupt flash
