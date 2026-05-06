## ADDED Requirements

### Requirement: Audit log on evaluation edit

The system SHALL record an audit entry when an evaluation document is updated (edit).

#### Scenario: Evaluation fields change

- **WHEN** an evaluation document in the monitored evaluations collection is successfully updated
- **THEN** the system SHALL write a document to the `system_logs` collection (or agreed equivalent path) containing the actor identity as specified in design, a server timestamp, an event classification indicating edit, the evaluation document id, and a snapshot of the evaluation data sufficient for compliance review

### Requirement: Audit log on evaluation delete

The system SHALL record an audit entry when an evaluation document is deleted.

#### Scenario: Evaluation removed

- **WHEN** an evaluation document in the monitored evaluations collection is deleted
- **THEN** the system SHALL write a document to `system_logs` containing the actor identity as specified in design, a server timestamp, an event classification indicating delete, the evaluation document id, and a snapshot or last-known payload of the evaluation data

### Requirement: Client cannot forge audit entries

Clients MUST NOT be able to create or modify `system_logs` entries for evaluation audit events; only trusted server components (e.g. Cloud Functions / Admin SDK) SHALL write these records.

#### Scenario: Direct client write denied

- **WHEN** an unprivileged client attempts to create or update a document in `system_logs` for evaluation audit purposes
- **THEN** Firestore security rules (or equivalent) SHALL deny the operation
