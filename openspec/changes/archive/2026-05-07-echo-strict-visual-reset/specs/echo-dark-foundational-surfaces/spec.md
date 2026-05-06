## MODIFIED Requirements

### Requirement: Dark foundational canvas on body

When Midnight is active (`html.dark`), the main **`body`** background SHALL be **`#0B1120`** (deep navy), implemented with `dark:bg-[#0B1120]` semantics (or a CSS equivalent yielding that exact computed color). Primary readable body/list copy in Midnight SHALL trend **`text-slate-100`** (`dark:text-slate-100` or equivalent), enforced globally via shared globals/theme—not isolated route hacks—unless explicitly suppressed by standalone landing canvases called out differently elsewhere.

#### Scenario: Authenticated shell Midnight backdrop

- **WHEN** `html.dark` is present on authenticated dashboard/stat routes using the shared app chrome
- **THEN** the body/workspace backdrop SHALL present deep navy `#0B1120` and default primary copy SHALL use `text-slate-100` class semantics

### Requirement: Elevated midnight cards adopt layered slate tones

When Midnight is active, **elevated card faces** (white-equivalent panels in Light) SHALL use background **`#1E293B`** (slate dark), with borders/tokens that keep edges visible against the **`#0B1120`** canvas—without reverting to lighter navy faces such as `#131B2B` unless an exception is documented for a specific component.

#### Scenario: Dashboard inbox cards Midnight elevation

- **WHEN** the dashboard renders inbox cards in Midnight mode
- **THEN** elevated card backgrounds SHALL compute to `#1E293B` (or semantic alias matching that color) so cards read clearly above `#0B1120`
