## ADDED Requirements

### Requirement: Visible loading during refinement

While an AI refinement request is in progress from the user’s click on the refine action, the UI SHALL display a visible loading indicator—either a progress-style bar or a spinner overlay associated with the observation/refinement area—so the user knows processing is ongoing until completion or failure.

#### Scenario: User starts refinement

- **WHEN** the user triggers refinement and the client awaits the server response
- **THEN** a non-subtle loading indicator SHALL be visible until the request settles

#### Scenario: Concurrent duplicate requests

- **WHEN** a refinement request is already in flight
- **THEN** the UI SHALL prevent duplicate submissions (e.g. disabled button or ignored clicks) until the in-flight request completes
