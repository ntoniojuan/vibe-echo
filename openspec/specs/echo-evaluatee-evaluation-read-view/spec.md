## ADDED Requirements

### Requirement: Read-only GAINS scores for evaluatee

For a **submitted** evaluation, when the viewer is the **evaluatee**, the evaluation detail page SHALL display **read-only** GAINS competency scores for **all** sub-competency codes defined for Echo (**A1–A4, C1–C4, E1–E4** — consistent with the evaluation wizard), with no controls to edit ratings.

#### Scenario: Evaluatee views completed evaluation

- **WHEN** the current user is the evaluatee and opens a submitted evaluation detail
- **THEN** the page SHALL show all GAINS code scores present on the document in a read-only layout

### Requirement: Refined feedback visible to evaluatee

The evaluation detail for the evaluatee SHALL present **refined feedback** content that was appended to observations (including text under the `--- Refined Feedback ---` convention) so the evaluatee can read the evaluator’s refined narrative, without running refinement tools.

#### Scenario: Observations contain a refined block

- **WHEN** aptitude, character, or effectiveness observation fields include refined feedback markers
- **THEN** the read-only detail SHALL surface that content clearly (for example within the same ACE section or a dedicated read-only subsection)

### Requirement: No wizard-style editing on evaluatee detail

The evaluatee-facing detail view SHALL NOT expose ACE step editors, GAINS pickers, or submission actions for that evaluation.

#### Scenario: Evaluatee attempts no edits

- **WHEN** the evaluatee views the detail page
- **THEN** they SHALL NOT be able to change GAINS levels or observation fields through the primary evaluation form controls
