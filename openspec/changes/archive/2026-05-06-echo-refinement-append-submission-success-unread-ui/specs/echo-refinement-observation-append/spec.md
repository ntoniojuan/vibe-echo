## ADDED Requirements

### Requirement: Preserve raw observations when applying AI refinement

When AI refinement is applied to an ACE **observation** field, the system SHALL persist **`originalText + "\n\n--- Refined Feedback ---\n" + aiText`**, where **`originalText`** is the trimmed raw notes from the **same apply request** used to generate **`aiText`**, and the system SHALL NOT replace the entire field with only AI output or drop user-written text that was present in that request.

#### Scenario: Apply refinement with observations only in the client

- **WHEN** the evaluator has typed observations in the wizard textarea but the Firestore field is empty or older than the textarea, and refinement apply succeeds  
- **THEN** the saved observation field SHALL contain the full textarea content as **`originalText`** followed by the delimiter and structured AI output

#### Scenario: Delimiter format

- **WHEN** refinement apply succeeds  
- **THEN** the inserted separator between user text and AI output SHALL be exactly a blank line, the line `--- Refined Feedback ---`, and one blank line before **`aiText`** (equivalently `"\n\n--- Refined Feedback ---\n" + aiText` after `originalText`)
