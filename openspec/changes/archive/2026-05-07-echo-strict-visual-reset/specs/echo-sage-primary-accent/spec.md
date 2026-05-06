## MODIFIED Requirements

### Requirement: Sage baseline primary accent

The application SHALL define semantic **primary** filled surfaces that resolve to **`#4A634A`** (MedGrocer deep Sage) in Light and Midnight modes. **Secondary** surfaces and **hover** treatments tied to primary actions SHALL resolve to **`#D1DCD1`** (light Sage). **Labels on `#4A634A` fills** SHALL be **`#FFFFFF`**. Core CTAs SHALL NOT use default Tailwind/browser **blue** primaries nor pale unreadable “ghost” fills where a primary action is intended.

#### Scenario: Primary buttons use deep Sage

- **WHEN** a user views standard filled primary buttons (including wizard progression where styled as primary)
- **THEN** their backgrounds SHALL compute to `#4A634A` and their primary label on the fill SHALL be `#FFFFFF`, not default primary blue or washed-out tints

#### Scenario: Primary hover uses light Sage band

- **WHEN** a user hovers a primary control that adopts the light Sage hover token
- **THEN** the hover surface SHALL align to `#D1DCD1` (or semantic equivalent) while preserving readable label contrast per the implemented variant rules

### Requirement: Active navigation emphasis matches Sage

Active dashboard inbox tabs, bottom navigation active affordances (where styled as primary), and comparable **active state indicators** SHALL emphasize with **`#4A634A`** (fill, pill, or clearly visible indicator per layout), with **`#FFFFFF`** on any filled `#4A634A` region unless a distinct destructive/info semantic applies.

#### Scenario: Dashboard tab selection

- **WHEN** the user selects an inbox tab in the authenticated dashboard
- **THEN** the selected tab treatment SHALL use `#4A634A` for its primary emphasis and SHALL NOT present as a pale unreadable ghost selection

### Requirement: New Evaluation CTA uses Sage primary fill

The desktop sidebar **New Evaluation** call-to-action SHALL present as a filled surface at **`#4A634A`** with label **`#FFFFFF`**, consistent with other hero primary CTAs.

#### Scenario: Sidebar create evaluation visible on Midnight

- **WHEN** `html` carries class `dark` and the desktop sidebar is shown
- **THEN** the New Evaluation button SHALL remain `#4A634A` with white label rather than reverting to a blue accent palette or low-contrast outline-only treatment

### Requirement: Refine with AI uses higher-contrast deeper Sage

The **Refine with AI** affordance SHALL use a **`primary-strong`** (or equivalent) token that is **at least as dark and saturated** as `#4A634A` within the same green hue family, distinct from ordinary primary fills only when needed for layering, and SHALL NOT adopt unrelated hues or default blues.

#### Scenario: ACE refinement entry visible

- **WHEN** the user views an ACE refinement trigger adjacent to ordinary observation controls in Midnight mode
- **THEN** the Refine control SHALL render using the documented stronger sage semantic and SHALL remain legible against `#1E293B` / `#0B1120` surfaces

## ADDED Requirements

### Requirement: Inbox OPEN and equivalent row CTAs use deep Sage primary

Evaluation inbox **OPEN** actions (and other equivalent **primary** row buttons in the inbox list) SHALL render as filled **`#4A634A`** with **`#FFFFFF`** labels, not pale outline-only or default low-contrast buttons.

#### Scenario: OPEN is high contrast in Light and Midnight

- **WHEN** the user views inbox cards showing **OPEN** in Light mode or when `html.dark` is active
- **THEN** **OPEN** SHALL present as the deep Sage primary fill with a white label
