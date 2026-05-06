## ADDED Requirements

### Requirement: Stats use real GAINS sub-competency data

The evaluatee stats experience (heat map, ACE pillar summaries, and overall trend inputs that depend on competency scores) SHALL derive **A1–E4** values from persisted evaluation data (numeric 1–5 per code) rather than fabricated demo data, once the data layer is connected.

Demo or static fallback MAY be used only when no authorized evaluation data exists for the current context.

#### Scenario: Heat map cells match twelve codes

- **WHEN** evaluation data includes ratings for A1–E4
- **THEN** the heat map presents twelve cells with labels matching the wizard (Internal Data-literacy through Resourcefulness as specified) and `strengthScore` equal to the numeric rating or defined aggregate when multiple evaluations apply

#### Scenario: ACE pillar averages

- **WHEN** ratings exist for all four sub-competencies in a pillar
- **THEN** the pillar average shown on the dashboard SHALL be the arithmetic mean of those four integers (presented to the evaluator audience per existing UI precision rules)

### Requirement: Consistent GAINS semantics with wizard

Stats labels and axes SHALL use the same 1–5 GAINS mapping as the wizard (G = 5 down to S = 1). Any compact tick labels (e.g. G/A/I/N/S) SHALL remain consistent with `readGainsAxisTickLabel` or its successor.

#### Scenario: Axis tick matches stored value

- **WHEN** a cell represents numeric rating 4
- **THEN** compact axis labeling reflects “Ahead” / **A** per shared utility behavior

### Requirement: Removal of placeholder competencies

If the dashboard currently displays sub-competency rows that are **not** part of the twelve official codes (e.g. placeholder X-codes), those placeholders SHALL be removed or hidden in production-oriented builds when real data is enabled, unless a follow-up change reintroduces them as required fields.

#### Scenario: No orphan X rows in live data mode

- **WHEN** stats are driven from Firestore submissions
- **THEN** only A1–E4 appear in the competency heat map unless additional codes are added by a future spec
