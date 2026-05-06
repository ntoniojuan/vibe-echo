## ADDED Requirements

### Requirement: Home marketing header omits non-functional controls

The marketing / home page header SHALL NOT display the notification bell or help / question-mark controls while they have no implemented behavior.

#### Scenario: Home page header

- **WHEN** a user views the home page header
- **THEN** neither a notification bell control nor a non-functional help / question-mark placeholder control SHALL be present

### Requirement: Desktop app sidebar shows icons beside Profile and Logout

In the desktop application side panel, the **Profile** and **Logout** links SHALL display an appropriate icon adjacent to their text labels, using `lucide-react` (or the project’s chosen icon approach consistent with this change).

#### Scenario: Desktop signed-in shell

- **WHEN** the desktop sidebar is visible with Profile and Logout entries
- **THEN** each of those entries SHALL include a recognizable icon beside the label for scanning and visual consistency
