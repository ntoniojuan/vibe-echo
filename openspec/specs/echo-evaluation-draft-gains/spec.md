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

### Requirement: Save-draft primary write and audit best-effort

The Next.js **`POST /api/save-draft`** handler (or equivalent) SHALL persist the evaluator’s draft by writing the **`echoEvaluationDrafts/{evaluationDraftId}`** document as the **primary** operation. When an audit entry in **`system_logs`** is written for the same user action, that write SHALL occur **after** the draft write and SHALL be **non-blocking for client success**: if the audit write fails but the draft write succeeded, the server SHALL still respond with success and the client SHALL treat the save as OK.

#### Scenario: Audit log fails after draft saves

- **WHEN** the draft `set`/`merge` succeeds and the subsequent `system_logs` write throws
- **THEN** the API returns a successful response (for example HTTP 200 with `ok: true`) and the draft in Firestore reflects the saved fields

### Requirement: Save error diagnostics in development

On an irrecoverable failure writing the **draft document** itself, the server SHOULD log details server-side. In **development** environments, error responses MAY include a **debug message** or Firestore-oriented code in the JSON body to speed up local diagnosis without exposing internals in production defaults.
