## ADDED Requirements

### Requirement: Desktop sidebar footer attribution

On **desktop** viewports where the **sidebar** is visible, the application SHALL show at the **bottom** of the sidebar (below profile and sign-out actions) a **small, muted** line: **© 2026 MedGrocer | Evaluation of Capabilities & Holistic Objectives.**

#### Scenario: Desktop user sees footer

- **WHEN** a user views the app with the desktop sidebar visible
- **THEN** the attribution line SHALL appear at the bottom of the sidebar

### Requirement: Mobile profile attribution

On **mobile** viewports where the sidebar is hidden, the **same attribution line** SHALL appear on the **Profile** screen so users can still see the MedGrocer / ECHO full name.

#### Scenario: Mobile user opens Profile

- **WHEN** a mobile user opens the Profile page
- **THEN** they SHALL see the muted attribution line on that page

### Requirement: About ECHO information control

Next to the **ECHO logo mark** in the **sidebar header**, the application SHALL provide a small **information** control (e.g. “i” icon). Activating the control (**click** and **keyboard**) SHALL reveal layered content (tooltip, popover, or small modal) containing **all** of the following, legibly separated:

- **ECHO:** Evaluation of Capabilities & Holistic Objectives.
- **The ACE Framework:** Aptitude (Head), Character (Heart), and Effectiveness (Hands).
- **The Goal:** To foster proactive, integrated, and holistic healthcare through professional development.

On **desktop**, **hover** MAY also reveal or supplement the same content **without** breaking keyboard or touch behavior.

#### Scenario: Keyboard user opens About

- **WHEN** the user focuses the information control and activates it with the keyboard
- **THEN** the layered content SHALL appear and SHALL be readable

#### Scenario: Screen reader name

- **WHEN** the information control is exposed
- **THEN** it SHALL have an accessible name (e.g. **About ECHO**)

### Requirement: Mobile access to About

When the sidebar is not shown, the user SHALL still be able to open the **same About content** from the **Profile** screen (e.g. matching info control or labeled control there).

#### Scenario: Mobile About available

- **WHEN** a mobile user is on the Profile page
- **THEN** they SHALL be able to open About content equivalent to the desktop sidebar control
