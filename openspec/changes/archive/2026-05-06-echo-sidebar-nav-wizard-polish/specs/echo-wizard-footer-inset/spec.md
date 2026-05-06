## ADDED Requirements

### Requirement: Wizard footer does not cover desktop sidebar

On viewports **`md` and wider**, the evaluation wizard **Back** / **Next** (or **Submit**) footer **SHALL** be positioned **only under the main content column** (offset from the left by the desktop sidebar width) so it **does not** overlap the sidebar chrome.

#### Scenario: User is on /evaluation on desktop

- **WHEN** the wizard footer is visible at **`md+`**
- **THEN** the footer’s horizontal extent starts at the **right edge of the fixed sidebar** and the **sidebar** (including **Logout**) stays **clickable** and **not obscured** by the footer

#### Scenario: User is on /evaluation on mobile

- **WHEN** viewport is below **`md`**
- **THEN** existing mobile behavior is preserved (full-width footer with safe offset above the bottom tab bar as already implemented)
