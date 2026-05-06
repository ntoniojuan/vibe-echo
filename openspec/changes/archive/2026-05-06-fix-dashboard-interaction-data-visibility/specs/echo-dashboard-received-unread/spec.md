## ADDED Requirements

### Requirement: Received tab unread indicator

The **Received** tab notification dot SHALL appear only when at least one evaluation in the received list is **unread** for the current user.

#### Scenario: All received evaluations have been read

- **WHEN** every received evaluation document has evaluatee read state indicating **read** (see `isRead` requirement)
- **THEN** the Received tab SHALL NOT show the notification dot

#### Scenario: At least one unread received evaluation

- **WHEN** at least one received evaluation is **not** marked read for the evaluatee
- **THEN** the Received tab SHALL show the notification dot

### Requirement: Evaluatee read state on documents

Each **submitted** evaluation document SHALL store evaluatee read state in Firestore using a boolean field **`isRead`**. Documents where the field is missing SHALL be treated as **unread** by clients.

#### Scenario: New submitted evaluation defaults to unread

- **WHEN** an evaluation is submitted for an evaluatee
- **THEN** the document SHALL be readable as **unread** (`isRead` false or absent) until the evaluatee completes the mark-read flow

### Requirement: Mark evaluation read when evaluatee views detail

When an authenticated **evaluatee** opens the read-only evaluation detail for a **submitted** evaluation about them, the system SHALL persist **`isRead: true`** on that document so unread indicators clear on subsequent loads.

#### Scenario: Evaluatee opens detail

- **WHEN** the signed-in user’s email matches the document’s evaluatee identity and the evaluation `status` is **submitted**
- **THEN** the client SHALL write `isRead: true` to Firestore (idempotent) after the detail view loads successfully

#### Scenario: Evaluator opens own submitted evaluation

- **WHEN** the signed-in user is the evaluator viewing an evaluation they authored
- **THEN** the system SHALL NOT require evaluatee `isRead` semantics for the tab dot (indicator is Received-only), and SHALL NOT incorrectly flip read state as if the viewer were the evaluatee
