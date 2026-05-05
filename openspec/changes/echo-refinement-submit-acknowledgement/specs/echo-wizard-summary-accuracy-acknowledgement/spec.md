## ADDED Requirements

### Requirement: Accuracy acknowledgement before submit

On the evaluation summary step, the system SHALL require the evaluator to confirm accuracy via a checkbox with the exact label: `I agree that everything I added here is true and accurate to the best of my knowledge.` The submit action SHALL NOT complete until this box is checked.

#### Scenario: Submit with checkbox unchecked

- **WHEN** the user attempts to submit the evaluation while the accuracy checkbox is unchecked
- **THEN** submission SHALL NOT proceed and the user SHALL see an explicit error message or validation prompt directing them to check the box

#### Scenario: Submit with checkbox checked

- **WHEN** the user checks the accuracy acknowledgement and all other submit preconditions pass
- **THEN** submission SHALL be allowed to proceed as implemented today
