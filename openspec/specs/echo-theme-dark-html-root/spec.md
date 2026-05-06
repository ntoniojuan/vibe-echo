## ADDED Requirements

### Requirement: Dark mode toggles the HTML root class only

Theme switching SHALL apply Midnight styling exclusively by adding or removing the **`dark` CSS class on the `<html>` element** (`document.documentElement`). Consumers MUST NOT rely on `body.dark`, disparate nested wrappers, or split booleans that desynchronize from the root contract.

#### Scenario: Toggle activates Midnight globally

- **WHEN** the user activates Midnight via the theme control while authenticated
- **THEN** `document.documentElement` SHALL include class `dark` and descendant Midnight selectors keyed off `html.dark` SHALL activate consistently

#### Scenario: Toggle restores Light globally

- **WHEN** the user disables Midnight via the theme control
- **THEN** class `dark` SHALL be removed from `document.documentElement` so Midnight selectors deactivate uniformly

### Requirement: Initial hydration respects saved preference without contradictory roots

On cold load / hydration, the application SHALL reconcile persisted preference (e.g. `localStorage`) and **`prefers-color-scheme`** with **`document.documentElement.classList`** so the correct palette renders without contradictory residual classes elsewhere.

#### Scenario: Repeat visits preserve Midnight

- **WHEN** a returning visitor previously chose Midnight and the preference remains persisted
- **THEN** the initial paint SHOULD minimize mismatched flashes AND MUST converge such that only `<html>` governs `dark` activation once initialization completes
