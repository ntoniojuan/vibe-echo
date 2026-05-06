## ADDED Requirements

### Requirement: Submission success screen

After a successful evaluation submission, the application SHALL navigate the evaluator to a **Submission Success** screen that displays a celebratory minimalist message **Evaluation Submitted!** and a primary control labeled **Return to Dashboard** that navigates to the app dashboard.

#### Scenario: Successful submit

- **WHEN** the evaluator completes submission and the server accepts the submitted evaluation  
- **THEN** the UI SHALL show the Submission Success screen (not an immediate reset to step 1 in the same view) and SHALL provide **Return to Dashboard**

#### Scenario: Return to dashboard

- **WHEN** the evaluator activates **Return to Dashboard** from the Submission Success screen  
- **THEN** the application SHALL navigate to the dashboard route

### Requirement: Success screen elevated card

The checkmark, title, supporting sentence, and **Return to Dashboard** control SHALL be grouped inside a single **elevated card** (rounded container, border, padding, and shadow consistent with other Echo form or summary cards) centered on the workspace canvas so the success state is visually distinct from the raw page background in Light and Midnight.
