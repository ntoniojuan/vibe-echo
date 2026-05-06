## ADDED Requirements

### Requirement: Dashboard header and utilities row

The **`/dashboard` page SHALL** display a top **Dashboard** title and a utilities area (e.g. notification placeholder, help, user avatar) consistent with the reference layout on desktop; on small screens utilities **MAY** collapse or remain icon-only.

#### Scenario: User loads dashboard

- **WHEN** an authenticated user opens `/dashboard`
- **THEN** a dashboard header with title and utility controls is visible before inbox content

### Requirement: Inbox tabs Received, Sent, Review

The dashboard **SHALL** expose exactly **three** tabs labeled **Received**, **Sent**, and **Review** mapping to existing inbox data: **Review** = evaluator drafts; **Received** = submitted evaluations where the user is evaluatee; **Sent** = submitted evaluations where the user is evaluator.

#### Scenario: User switches tabs

- **WHEN** the user selects each tab
- **THEN** the list content matches the same Firestore-backed filters as the pre-change implementation for feedback, my evals, and for-review respectively

### Requirement: Rich inbox cards

For each inbox item, the UI **SHALL** show at minimum: **title**, **relative time** from evaluation `updatedAt`, a **From** or evaluatee/summary line, preview text, an **ACE** footer row (**Head / Heart / Hands** affordance), and a primary action appropriate to the tab (e.g. continue/review/view).

#### Scenario: List has items

- **WHEN** the active tab has one or more records
- **THEN** each item renders as a card meeting the minimum content pattern above

### Requirement: Cycle Progress widget on large screens

On **lg+** viewports, the dashboard **SHALL** render a **Cycle Progress** (or equivalently named) widget showing progress for **received** evaluations vs a numeric goal and **sent/self** evaluations vs a numeric goal; counts **MUST** derive from the same loaded inbox data where possible; goals **MAY** be placeholder constants documented in code until product configuration exists.

#### Scenario: Desktop dashboard with data

- **WHEN** the viewport is `lg` or wider and inbox queries have completed
- **THEN** the widget displays both progress rows and a link to **full stats** (existing stats route)

### Requirement: Empty and error states preserve behavior

Loading, unauthenticated, Firestore error, and **empty list** states **SHALL** remain functionally equivalent to pre-change behavior (only presentation may change).

#### Scenario: Inbox load fails

- **WHEN** Firestore list read fails
- **THEN** the user sees an error state with guidance to check rules or refresh
