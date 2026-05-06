## ADDED Requirements

### Requirement: Theme control mutates the HTML root exclusively

The application’s Midnight/Light theme control SHALL add or remove the `dark` class **only** on **`document.documentElement`** (`<html>`). After each toggle, consumers SHALL NOT depend on `body.dark`, duplicated `dark` markers on nested layout wrappers, or split boolean state that can desynchronize from the root `dark` contract described in existing requirements.

#### Scenario: Toggle updates html class list

- **WHEN** the user activates or deactivates Midnight using the in-app theme switch
- **THEN** the implementation SHALL apply `classList` changes on `<html>` and SHALL avoid leaving stale `dark` classes on `body` or primary layout wrappers that would diverge from `html.dark`
