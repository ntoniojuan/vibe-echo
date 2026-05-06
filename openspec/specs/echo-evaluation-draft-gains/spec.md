## ADDED Requirements

### Requirement: Single draft document holds twelve ratings and notes

Every evaluation draft document in the configured Firestore collection SHALL store:

- Existing general-information fields (`evaluateeName`, `evaluateeEmail`, `relationshipType`, `evaluationReason`, etc. as currently implemented).
- `status` with value `draft` until the evaluation is submitted, then `submitted` (or equivalent existing enum).
- The three raw observation strings: `aptitudeObservations`, `characterObservations`, `effectivenessObservations`.
- **All twelve GAINS ratings** for codes A1, A2, A3, A4, C1, C2, C3, C4, E1, E2, E3, E4 as numbers **1–5** per the GAINS encoding (5 = Greatly exceeds, 1 = Severely underdelivers).

Ratings SHALL be written and read as part of the same merge/update operation as other draft fields so there is **one** logical “Draft” record per `evaluationDraftId`.

#### Scenario: Autosave includes ratings

- **WHEN** the client persists the draft after rating changes
- **THEN** Firestore contains updated `gainsRatings` (or equivalent agreed field shape) alongside notes and `updatedAt`

#### Scenario: Reload restores ratings

- **WHEN** the client loads an existing draft document that contains saved ratings
- **THEN** the wizard populates all twelve controls with the stored values

### Requirement: Schema resilience for legacy documents

Readers SHALL tolerate documents missing `gainsRatings` or individual keys by treating missing values as unset. Writers SHALL not delete unrelated fields when merging updates.

#### Scenario: Old draft without ratings

- **WHEN** a document has no gains map
- **THEN** the reader returns empty/unset ratings without error and the UI treats all twelve as unanswered

### Requirement: Submitted evaluations retain ratings

On submit, the same document (or submission flow defined by the product) SHALL retain the twelve numeric ratings and raw notes so downstream stats can query submitted evaluations.

#### Scenario: Submit persists scores

- **WHEN** the user submits a completed evaluation
- **THEN** `status` becomes submitted and all twelve ratings remain stored on that document
