## ADDED Requirements

### Requirement: Sent tab lists draft outgoing evaluations

The **Sent** tab SHALL list evaluation documents **authored by** the current user with `status` **draft** in addition to **submitted**, ordered by recency (for example `updatedAt` descending) unless a different stable order is documented.

#### Scenario: User has an in-progress draft

- **WHEN** the user has saved an evaluator-owned draft
- **THEN** the draft SHALL appear in the Sent list with labeling that distinguishes it from submitted items

### Requirement: Draft row opens wizard with saved progress

- **WHEN** the user activates the primary action on a **draft** row in the Sent tab
- **THEN** the app SHALL navigate to the multi-step evaluation experience with that document id selected and SHALL load **prior form data** and **saved step index** from Firestore so the user can continue editing

#### Scenario: Draft resumes correct step

- **WHEN** the stored `currentStepIndex` corresponds to a later ACE step
- **THEN** the wizard SHALL open on that step with fields populated from the draft document
