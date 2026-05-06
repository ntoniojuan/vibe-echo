## ADDED Requirements

### Requirement: Desktop sidebar omits Create link

The desktop sidebar **SHALL NOT** render a navigation row that links to **`/evaluation`** when **+ New Evaluation** is already present. **Create** (or **Create Eval**) **SHALL** remain available on the **mobile** bottom navigation.

#### Scenario: Desktop user views sidebar

- **WHEN** viewport is **`md`** or wider
- **THEN** the sidebar lists **Home** and **Stats** (plus branding, CTA, footer) and **does not** include a duplicate **Create** link to the wizard

### Requirement: Profile and Logout remain visible without full-page scroll

On **`md+`**, **Profile** and **Logout** **SHALL** stay within the **initial sidebar viewport** (pinned footer region) while only the **primary** nav items scroll if overflow occurs.

#### Scenario: Many primary links or short viewport

- **WHEN** the middle nav region overflows vertically
- **THEN** the user can scroll **only that region** while **Profile** and **Logout** remain visible at the bottom of the sidebar

### Requirement: Sidebar icons for brand and primary items

The sidebar **SHALL** show a small **ECHO** mark beside the brand title and **iconography** beside **Home** and **Stats** links (decorative or labeled via `aria-hidden` where link text suffices).

#### Scenario: User opens app on desktop

- **WHEN** the sidebar renders
- **THEN** **ECHO** branding includes a visible icon and **Home**/**Stats** rows include leading icons
