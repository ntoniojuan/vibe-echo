## ADDED Requirements

### Requirement: Dashboard inbox tabs

The **dashboard home** (or designated inbox surface) SHALL present **two tabs**: **For My Review** and **My Feedback**.

#### Scenario: User sees both tabs

- **WHEN** an authenticated user opens the dashboard inbox view
- **THEN** the system SHALL display both tabs and SHALL allow switching between them

### Requirement: For My Review tab

The **For My Review** tab SHALL list evaluations **the current user must write or complete** (or show an appropriate empty state when there are none).

#### Scenario: No pending reviews

- **WHEN** there are no evaluations awaiting the user’s completion
- **THEN** the system SHALL show an empty state that explains there is nothing to review yet

### Requirement: My Feedback tab

The **My Feedback** tab SHALL list evaluations **written about the current user by others** (or show an appropriate empty state when there are none).

#### Scenario: No feedback received

- **WHEN** there is no feedback about the user
- **THEN** the system SHALL show an empty state that explains no feedback is available yet
