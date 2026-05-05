## ADDED Requirements

### Requirement: Sage-forward workspace surfaces

The signed-in app **SHALL** use a **sage-dominant** neutral for primary **main content** backgrounds (not yellow/cream as the default), sufficient for accessible contrast with body text.

#### Scenario: Authenticated user views any app page

- **WHEN** an authenticated user renders a page inside the app shell on a desktop viewport
- **THEN** the area beside the sidebar uses a sage-tinted workspace background token (not `#fdfcf0`-only cream as the sole surface)

### Requirement: Dark desktop sidebar

On viewports **md and wider**, the primary app navigation **SHALL** render as a **dark** vertical bar with light foreground text, **ECHO** wordmark, **MedGrocer Performance** sub-brand line, and **+ New Evaluation** CTA linking to the canonical create path.

#### Scenario: Desktop navigation visible

- **WHEN** viewport width meets the `md` breakpoint used by the shell
- **THEN** the sidebar background is dark (charcoal/navy family), shows branding and CTA, and nav links include **Home**, **Create**, **Stats**, and a bottom-aligned cluster including **Profile** and **Logout**

### Requirement: Sidebar active state

The **SHALL** indicate the current route with a visible **active** treatment (accent color and/or leading indicator) distinct from inactive links.

#### Scenario: User is on dashboard home

- **WHEN** the user’s route matches **Home** / `/dashboard`
- **THEN** the **Home** sidebar entry appears active per the design tokens

### Requirement: Mobile bottom navigation harmonization

Below **md**, **SHALL** display bottom navigation whose colors harmonize with the updated sage workspace and dark chrome story (no clashing cream-only bar without sage context).

#### Scenario: Mobile user opens app

- **WHEN** viewport is below `md`
- **THEN** bottom navigation remains usable with readable labels and backgrounds consistent with the new palette
