## MODIFIED Requirements

### Requirement: Main workspace canvas differs from elevated cards

In authenticated app views, the primary scrolling workspace behind lists and forms SHALL use a dedicated canvas surface lighter than elevated cards in Light mode and darker-deeper than card panels in Midnight mode, so content does not read as a single flat sheet.

#### Scenario: Light mode canvas tint

- **WHEN** the user views an authenticated page in Light mode
- **THEN** the main workspace area SHALL present an off-white / very light gray canvas consistent with `slate-50` (or semantic equivalent)

#### Scenario: Midnight workspace depth

- **WHEN** the user views an authenticated page in Midnight mode
- **THEN** the main workspace canvas SHALL present `dark:bg-[#0B1120]` (or semantic equivalent aligned to that exact target)

### Requirement: Elevated card surfaces for interactive blocks

Evaluation inbox entries, primary form sections, and profile summary panels SHALL be rendered as visually distinct cards: rounded corners (`rounded-xl`), subtle border, soft shadow, and a raised surface color—white in Light mode and **`#1E293B`** in Midnight mode (`dark:bg-[#1E293B]` or semantic equivalent). When Midnight is active (**`html.dark`**), card borders SHALL remain visible against **`#0B1120`** canvases using tokens consistent with **`#1E293B`** family contrast. Primary text inside these cards in Midnight SHALL use **`dark:text-slate-100`** (or equivalent) unless a more specific semantic (muted secondary text) applies.

#### Scenario: Card reads above canvas

- **WHEN** an evaluation appears in the dashboard inbox or an equivalent list uses card presentation
- **THEN** each item SHALL visibly separate from the workspace canvas using border, shadow, and elevated background tokens

#### Scenario: Profile panel elevation

- **WHEN** the user opens the Profile page primary account summary block
- **THEN** that block SHALL match the elevated card treatment including Midnight `#1E293B` faces with readable `text-slate-100` primary copy when `html.dark` is active

#### Scenario: Card typography in Midnight

- **WHEN** `html.dark` is active on a view that renders elevated interactive cards
- **THEN** primary textual content in those cards SHALL use `dark:text-slate-100` semantics by default
