## ADDED Requirements

### Requirement: Missing evaluation metadata uses muted italic styling

When evaluation UI surfaces placeholder copy for absent metadata (including but not limited to unknown evaluator attribution or missing evaluation reason snippets), that copy SHALL render in a muted foreground color and italic typeface so users interpret it as an intentional empty state rather than a defect.

#### Scenario: Unknown evaluator line

- **WHEN** inbox or evaluation UI displays copy equivalent to “Unknown evaluator” or the product’s canonical unknown-evaluator string
- **THEN** the placeholder SHALL use italic styling and a subdued text color token

#### Scenario: Missing reason snippet

- **WHEN** no evaluation reason text is available for display in a collapsed preview
- **THEN** the fallback string SHALL use italic styling and a subdued text color token
