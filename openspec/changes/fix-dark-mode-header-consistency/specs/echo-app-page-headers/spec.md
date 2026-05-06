## ADDED Requirements

### Requirement: Shared primary page header layout

The Home dashboard, Evaluatee Stats (growth analytics), Profile, and Evaluation wizard pages SHALL render their primary page title region using one shared header pattern with identical horizontal spacing rules, title typography scale, subtitle typography scale, vertical rhythm, and flex alignment between title block and optional trailing actions.

#### Scenario: Title and subtitle alignment

- **WHEN** a page includes a subtitle or supporting line under the main title
- **THEN** the subtitle SHALL use the same font size, weight, and color token classes as every other page using the shared header pattern
- **AND** the main title SHALL use the same font size at each breakpoint across those pages

#### Scenario: Optional eyebrow label

- **WHEN** a page needs a small uppercase or contextual label above the title (e.g. step indicator or section label)
- **THEN** that label SHALL be rendered via the shared header’s optional eyebrow slot using consistent typography and spacing relative to the title

#### Scenario: Trailing actions

- **WHEN** a page provides trailing controls (e.g. theme toggle, about popover, avatar)
- **THEN** those controls SHALL occupy a single trailing region aligned to the top of the header row on wide layouts
- **AND** on narrow layouts the header SHALL wrap in a consistent order without breaking padding conventions defined by the shared pattern

### Requirement: Evaluation wizard header scope

The Evaluation wizard SHALL use the shared header pattern for each wizard step that presents a full-width step introduction header today (title + description block at the top of the step), so step titles and descriptions match other app pages’ header typography and spacing.

#### Scenario: Wizard step introduction matches app headers

- **WHEN** the user is on a wizard step that shows a top-of-page step title and description
- **THEN** that block SHALL match the shared header pattern’s typography, padding, and alignment rules used on Home, Stats, and Profile
