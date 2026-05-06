## ADDED Requirements

### Requirement: Hero shows full program name and mission

The **marketing landing** page SHALL present **Project ECHO** as the primary heading (`h1`) for the hero. Directly beneath it, the page SHALL show the subtitle **Evaluation of Capabilities & Holistic Objectives.** in a **lighter font weight** than the main title. Below the subtitle, the page SHALL show this **mission sentence**: **A performance platform designed to move beyond scores and into the Dialogue of growth.**

#### Scenario: Signed-out visitor reads the hero

- **WHEN** an unauthenticated user opens the marketing landing page
- **THEN** they SHALL see “Project ECHO” as the main heading followed by the subtitle and mission sentence before the primary sign-in action

### Requirement: Welcome copy remains secondary

Existing welcome / sign-in explanatory text SHALL remain available but SHALL **not** replace the program name as the sole `h1` (welcome copy MAY be a subheading or supporting paragraph).

#### Scenario: Heading order remains accessible

- **WHEN** the page is rendered
- **THEN** there SHALL be exactly **one** logical main page title appropriate for screen readers (`h1` carrying “Project ECHO”)
