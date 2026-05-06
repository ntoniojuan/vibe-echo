## ADDED Requirements

### Requirement: MCQ generation from ACE notes

The system SHALL expose `generateRefinementMCQs` (or equivalent service entry point) that accepts `rawNotes` (string) and `aceCategory` (one of Aptitude, Character, Effectiveness—normalized to `aptitude` | `character` | `effectiveness`). The implementation SHALL call OpenAI model **GPT-4o** (or the model configured by server environment) and SHALL return **exactly five** multiple-choice items. Each item SHALL be `{ question: string, options: string[] }` where `options` contains at least two distinct strings. Questions SHALL be written to help a supervisor clarify feedback implied by `rawNotes` (e.g., consistency vs. one-off event), scoped to the given ACE category. The OpenAI API key SHALL only be used on the server.

#### Scenario: Successful MCQ generation

- **WHEN** a trusted caller invokes MCQ generation with non-empty `rawNotes` and a valid `aceCategory`
- **THEN** the system returns a JSON array of five `{ question, options }` objects and does not expose API keys in the response

#### Scenario: Invalid category rejected

- **WHEN** `aceCategory` is not one of the three ACE categories after normalization
- **THEN** the system rejects the request with a client-error response and does not call OpenAI

### Requirement: Refined paragraph from MCQ answers and Firestore append

The system SHALL expose a second operation (e.g. `applyRefinementFromMcqAnswers`) that accepts: draft document id, `rawNotes`, `aceCategory`, the generated MCQs, and the user’s answers (mapping each question to the chosen option). The implementation SHALL call OpenAI to rewrite content into **one professional, actionable evaluation paragraph** grounded in `rawNotes` and the answers. The implementation SHALL then **append** that paragraph to the Firestore field corresponding to `aceCategory` on document `echoEvaluationDrafts/{draftId}` (`aptitudeObservations`, `characterObservations`, or `effectivenessObservations`). Appends SHALL use a read-modify-write transaction (or equivalent) so concurrent updates do not silently overwrite prior text.

#### Scenario: Successful append after refinement

- **WHEN** a trusted caller submits valid MCQs, answers for all five items, a valid `draftId`, and `aceCategory`
- **THEN** the system persists the refined paragraph by appending to the correct observation field and returns confirmation including the appended text (or a success flag per API contract)

#### Scenario: Mismatched answers rejected

- **WHEN** the number or ordering of answers does not match the five MCQs
- **THEN** the system rejects the request without modifying Firestore

### Requirement: Reliability and observability

All OpenAI and Firestore calls from this feature SHALL use retry logic for transient failures (at least one retry with backoff where appropriate). Errors SHALL be logged with sufficient detail for debugging and SHALL NOT include raw API keys or unredacted secrets.

#### Scenario: OpenAI timeout or rate limit

- **WHEN** the OpenAI request fails with a retryable error
- **THEN** the system retries according to policy and returns a controlled error if still failing, without partial Firestore updates for the refinement step
