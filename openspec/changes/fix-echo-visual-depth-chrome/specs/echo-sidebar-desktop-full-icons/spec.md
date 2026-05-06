## ADDED Requirements

### Requirement: Desktop sidebar full viewport height

On `md` breakpoints and wider, the sidebar navigation column SHALL span the full viewport height (`h-screen` semantics) and SHALL remain `sticky` at `top-0` while the document scrolls.

#### Scenario: Long inbox scroll does not clip sidebar

- **WHEN** main content exceeds one viewport height on desktop
- **THEN** the sidebar SHALL remain pinned and fully visible without appearing truncated relative to the viewport

### Requirement: Profile and sign-out icon affordances

The Profile navigation entry and the sign-out control (labeled Logout or Sign out in UI copy) SHALL each display a minimalist icon beside the text using the project icon set (Lucide or equivalent).

#### Scenario: Icons visible on desktop footer

- **WHEN** the desktop sidebar footer renders
- **THEN** both Profile and sign-out rows SHALL show leading icons consistent with primary navigation icon sizing
