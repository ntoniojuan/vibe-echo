## ADDED Requirements

### Requirement: Read state clears unread chrome on Received cards

On the dashboard **Received** (submitted feedback) list, for an evaluation whose payload has **`isRead` equal to true**, the card SHALL NOT show the **unread notification dot** and SHALL NOT show a **“New”** badge (or equivalent unread freshness tag tied to the unread state).

#### Scenario: Evaluatee opened feedback

- **WHEN** the dashboard displays a received evaluation that has been marked read (`isRead === true`)  
- **THEN** neither the unread dot nor the “New” badge appears on that card

#### Scenario: Unread feedback unchanged

- **WHEN** the dashboard displays a received evaluation that is not read (`isRead !== true`)  
- **THEN** existing unread indicators (including dot and applicable freshness badge rules) continue to apply as implemented
