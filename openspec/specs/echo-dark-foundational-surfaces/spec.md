## ADDED Requirements

### Requirement: Dark foundational canvas on body

When Midnight is active (`html.dark`), the main **`body`** background SHALL be **`#0B1120`** (deep navy) and default readable foreground SHALL trend **`#F8FAFC`**, enforced globally via shared globals/theme—not isolated route hacks—unless explicitly suppressed by standalone landing canvases called out differently elsewhere.

#### Scenario: Authenticated shell Midnight backdrop

- **WHEN** `html.dark` is present on authenticated dashboard/stat routes using the shared app chrome
- **THEN** the body/workspace backdrop SHALL present deep navy `#0B1120` with readable pale foreground anchors `#F8FAFC`

### Requirement: Elevated midnight cards adopt layered slate tones

When Midnight is active, **elevated white-equivalent cards** SHALL adopt backgrounds aligning **`#131B2B`** and borders aligning **`#1E293B`**, preserving separation from the canvas `#0B1120`.

#### Scenario: Dashboard inbox cards Midnight elevation

- **WHEN** the dashboard renders inbox cards in Midnight mode
- **THEN** elevated surfaces SHALL match `#131B2B` faces with `#1E293B` borders (or semantic equivalents referencing identical computed colors)

### Requirement: Light mode retains card-on-canvas hierarchy

Light mode SHALL preserve elevated cards on an **off-white / slate-tinted canvas** (semantic slate-50 family), contrasting subtly versus `#FFFFFF` or semantic elevated white panels—matching established sage-era layering expectations.

#### Scenario: Authenticated light layering intact

- **WHEN** the user views an authenticated page in Light mode without `html.dark`
- **THEN** elevated interactive panels SHALL remain visibly brighter/differentiated vs the softer workspace canvas behind them
