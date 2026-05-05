## ADDED Requirements

### Requirement: Refined feedback is appended below raw notes

When AI refinement is applied to an ACE observation field that contains the evaluator’s raw notes, the system SHALL preserve the existing field text and SHALL append the generated refined content after a clear separator. The separator SHALL begin with the line `--- Refined Feedback ---` so users can distinguish original notes from AI-assisted text.

#### Scenario: Apply refinement with existing notes

- **WHEN** the observation field already contains non-empty evaluator text and refinement succeeds
- **THEN** the updated field value SHALL contain the original text unchanged at the beginning (aside from normal newline adjacency) followed by an appended block that includes the line `--- Refined Feedback ---` and the refined content after it

#### Scenario: Apply refinement on empty prior content

- **WHEN** the observation field is empty or whitespace-only before apply
- **THEN** the system MAY store only the refined block with the `--- Refined Feedback ---` header or the minimum text needed; it SHALL NOT silently replace non-empty user text without appending
