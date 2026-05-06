## ADDED Requirements

### Requirement: Desktop sidebar remains deep navy in Light and Midnight

On **`md+` viewports**, the authenticated desktop sidebar shell background SHALL remain **deep navy `#0B1120`** (or a semantic alias whose computed background matches that hex) **whether or not** `html` has class `dark`, so Light mode does not present a light-gray sidebar that breaks MedGrocer/Echo branding.

#### Scenario: Light mode sidebar branding

- **WHEN** an authenticated user views the app in Light mode without `html.dark` at desktop width
- **THEN** the sidebar background SHALL read as `#0B1120` and sidebar chrome SHALL not revert to default light neutral shells unless an exception is documented elsewhere

#### Scenario: Midnight sidebar consistent

- **WHEN** `html.dark` is active at desktop width
- **THEN** the sidebar SHALL remain deep navy consistent with `#0B1120` without introducing a divergent hue block relative to the main Midnight canvas

### Requirement: Sidebar labels and icons stay readable on navy

Foreground colors for sidebar navigation labels, icons, and the **New Evaluation** CTA SHALL maintain accessible contrast against the navy shell; primary filled CTAs SHALL follow the strict Sage primary stack defined in `echo-sage-primary-accent` (filled `#4A634A`, label `#FFFFFF` on fill).

#### Scenario: Sidebar text legible

- **WHEN** the user views the sidebar in Light or Midnight
- **THEN** inactive nav labels and icons SHALL remain readable against `#0B1120` without relying on default low-contrast gray tokens
