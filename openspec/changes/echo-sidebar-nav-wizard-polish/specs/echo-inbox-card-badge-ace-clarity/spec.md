## ADDED Requirements

### Requirement: “New” badge freshness window

For **Received** and **Sent** inbox cards, the **“New”** badge **SHALL** appear **only** when **`updatedAt`** is within the **last 24 hours** (wall clock). Outside that window, **“New”** **MUST NOT** be shown solely based on recency.

#### Scenario: Older submission

- **WHEN** a submitted evaluation’s **`updatedAt`** is older than **24 hours**
- **THEN** the card **does not** display the **“New”** badge unless another rule (e.g. **Updated**) applies

### Requirement: ACE pill emphasis from observation text

Each inbox card **SHALL** show **Head**, **Heart**, and **Hands** labels mapping to **Aptitude**, **Character**, and **Effectiveness**. Each pill **SHALL** use **stronger** visual emphasis when the corresponding **observation** field on the evaluation payload is **non-empty** after trim; otherwise **muted** emphasis. Each pill **SHALL** expose an accessible **description** (e.g. `title`) stating it reflects **written observations** for that pillar.

#### Scenario: Submitted evaluation with only Aptitude notes

- **WHEN** `aptitudeObservations` is non-empty and `characterObservations` and `effectivenessObservations` are empty
- **THEN** **Head** is emphasized and **Heart**/**Hands** are muted

#### Scenario: All observation fields empty

- **WHEN** all three observation strings are empty or whitespace
- **THEN** all three pills are **muted** but still labeled for consistency
