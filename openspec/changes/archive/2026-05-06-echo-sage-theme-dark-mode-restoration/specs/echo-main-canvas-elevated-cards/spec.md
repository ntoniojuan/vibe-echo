## MODIFIED Requirements

### Requirement: Elevated card surfaces for interactive blocks

Evaluation inbox entries, primary form sections, and profile summary panels SHALL be rendered as visually distinct cards: rounded corners (`rounded-xl`), subtle border, soft shadow, and a raised surface color—white in Light mode and dark slate in Midnight mode consistent with **`#131B2B`** (or semantic equivalent). When Midnight is active (**`html.dark`**), card borders SHALL align **`#1E293B`** (or semantic equivalent) so edges remain visible against **`#0B1120`** canvases.

#### Scenario: Card reads above canvas

- **WHEN** an evaluation appears in the dashboard inbox or an equivalent list uses card presentation
- **THEN** each item SHALL visibly separate from the workspace canvas using border, shadow, and elevated background tokens

#### Scenario: Profile panel elevation

- **WHEN** the user opens the Profile page primary account summary block
- **THEN** that block SHALL match the elevated card treatment including Midnight border contrast against deep navy canvas when `html.dark` is active
