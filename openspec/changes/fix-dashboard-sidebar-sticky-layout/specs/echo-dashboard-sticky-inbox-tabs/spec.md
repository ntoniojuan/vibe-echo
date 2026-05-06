## ADDED Requirements

### Requirement: Sticky dashboard inbox tabs

On the dashboard home inbox view, the Received, Sent, and Review tab controls SHALL use sticky positioning so they remain visible at the top of the viewport while the user scrolls the evaluation list.

#### Scenario: Tabs persist while scrolling list

- **WHEN** the dashboard inbox lists enough evaluations to require vertical scrolling
- **THEN** the tablist SHALL remain visible at the top of the scrolling region (sticky header behavior)
- **AND** the active tab indication SHALL remain discernible while sticky

### Requirement: Sticky dashboard header with tabs

The dashboard page header (title, supporting description, and trailing avatar region) SHALL be included in the same sticky top band as the inbox tabs so users retain page and tab context together while scrolling.

#### Scenario: Header and tabs stick together

- **WHEN** the user scrolls the dashboard inbox content
- **THEN** both the dashboard header block and the inbox tablist SHALL scroll only until they reach the top of the viewport, after which they SHALL remain fixed together as one sticky chrome strip above the scrolling list

### Requirement: Sticky chrome readability

The sticky dashboard chrome SHALL use an opaque or sufficiently solid background matching the workspace surface so inbox content scrolling underneath does not reduce readability of header text or tabs.

#### Scenario: No illegible overlap

- **WHEN** inbox cards scroll under the sticky chrome
- **THEN** header and tab labels SHALL remain readable without reliance on transparent overlap alone
