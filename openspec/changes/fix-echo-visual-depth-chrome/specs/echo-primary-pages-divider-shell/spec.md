## ADDED Requirements

### Requirement: Consistent primary page horizontal rhythm

The Dashboard home, Evaluatee Stats (Growth analytics), Profile, and Evaluation wizard pages that expose a primary page title SHALL share the same horizontal padding convention (`px-6` or `px-8`) chosen once for the app shell or shared layout wrapper.

#### Scenario: Gutter parity across routes

- **WHEN** the user navigates among Dashboard, Stats, Profile, and Evaluation without resizing the viewport
- **THEN** primary content SHALL align to the same left and right gutters at each breakpoint tier

### Requirement: Primary heading and divider

Each of those primary routes SHALL begin with a single dominant page title (`h1` semantics) followed by a thin horizontal divider beneath the title region before the main scrolling body content (wizard steps that intentionally omit a global header remain governed by existing wizard specs unless they expose the shared page shell).

#### Scenario: Stats page title presentation

- **WHEN** the user opens Growth analytics
- **THEN** the page SHALL present one primary title with divider and matching padding rules consistent with Dashboard

#### Scenario: Profile page title presentation

- **WHEN** the user opens Profile
- **THEN** the page SHALL present one primary title with divider and matching padding rules consistent with Dashboard

### Requirement: Header alignment parity

Title typography, optional subtitle spacing, and trailing action alignment (where present) SHALL match the shared header component contract already used on Dashboard unless a route proves technically incompatible (document exception in implementation notes if unavoidable).

#### Scenario: Evaluation wizard intro alignment

- **WHEN** the Evaluation wizard displays a step introduction header that uses the shared header component
- **THEN** padding and divider behavior SHALL match other primary routes using that shell
