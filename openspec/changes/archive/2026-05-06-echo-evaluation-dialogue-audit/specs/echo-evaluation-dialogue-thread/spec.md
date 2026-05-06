## ADDED Requirements

### Requirement: Evaluation-scoped dialogue thread

The system SHALL provide a dialogue thread attached to a single evaluation document such that users viewing that evaluation see all thread messages in chronological order.

#### Scenario: Open evaluation detail

- **WHEN** a user opens the specific evaluation detail view for evaluation id `E`
- **THEN** the UI SHALL display a thread panel at the bottom of that view scoped to `E`

### Requirement: Real-time message updates

The system SHALL load and update thread messages using Firestore real-time listeners (`onSnapshot`) so new messages appear without a full page reload.

#### Scenario: Peer posts new message

- **WHEN** another authorized user appends a message to the thread for evaluation `E`
- **THEN** the listening client SHALL receive the update and the new message SHALL appear in the thread in order

### Requirement: Message presentation (avatar and time)

Each message in the thread UI SHALL show an author avatar (or approved fallback), message body, and a visible timestamp.

#### Scenario: Message rendered

- **WHEN** a message document exists in the thread for evaluation `E`
- **THEN** the UI SHALL render avatar, text content, and timestamp for that message according to platform formatting rules

### Requirement: Anonymous peer display name

For peer evaluations where the evaluation document has `isAnonymous` true, the thread UI MUST NOT display the real name or email of the anonymous party; it SHALL display the label `Anonymous Teammate` for that case (including avatars that would otherwise reveal identity, which MUST use a neutral or generic treatment).

#### Scenario: Anonymous peer author

- **WHEN** the evaluation has `isAnonymous` true and a message author is subject to anonymity
- **THEN** the UI SHALL show `Anonymous Teammate` (and SHALL NOT show the user’s actual display name or email)

#### Scenario: Non-anonymous evaluation

- **WHEN** the evaluation has `isAnonymous` false or the field is absent
- **THEN** the UI MAY show normal display names and profile avatars per existing product rules
