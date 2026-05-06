## Why

Stakeholders and new users see “ECHO” shorthand without consistently seeing the **full program name** or **what the acronym means**. Surfacing the expanded name, a short mission line, and a discoverable **About** explanation strengthens trust and alignment with MedGrocer’s performance narrative.

## What Changes

- **Marketing landing (`(marketing)/page.tsx`)**: Under the primary **Project ECHO** branding, add a **lighter-weight subtitle**: *Evaluation of Capabilities & Holistic Objectives.* Add a **one-sentence mission** (*A performance platform designed to move beyond scores and into the Dialogue of growth.*). Adjust heading hierarchy so **Project ECHO** remains the clear hero anchor (welcome/sign-in copy may be secondary — see design).
- **Desktop sidebar (`EchoAppSidebar`)**: At the **bottom** of the nav (below Profile/Logout), add **muted legal/branding** line: *© 2026 MedGrocer | Evaluation of Capabilities & Holistic Objectives.*
- **Mobile**: Show the **same muted line** on the **Profile** screen (users without sidebar still see footer attribution).
- **About control**: Beside the **ECHO logo mark** in the **sidebar header**, add a small **info (i)** control. On **hover** (desktop) and **click/focus** (touch + keyboard), show an **accessible** tooltip, popover, or small dialog with:
  - **ECHO:** Evaluation of Capabilities & Holistic Objectives.
  - **The ACE Framework:** Aptitude (Head), Character (Heart), and Effectiveness (Hands).
  - **The Goal:** To foster proactive, integrated, and holistic healthcare through professional development.

## Capabilities

### New Capabilities

- `echo-landing-hero-branding`: Marketing hero copy — full name subtitle, mission line, heading structure.
- `echo-shell-branding-attribution-about`: Sidebar footer attribution, Profile footer (mobile), About info control next to logo.

### Modified Capabilities

- _(none)_

## Impact

- **Client components**: `project-echo/src/app/(marketing)/page.tsx`, `EchoAppSidebar.tsx`, `EchoProfilePageClient.tsx`; possible small presentational component(s) for About content (single responsibility / one export per file per MedGrocer guidelines).
- **Accessibility**: Info control must have name, keyboard operability, and `aria-expanded` / focus trap if using a modal pattern.
- **Copy**: Fixed strings (2026 year); confirm legal prefers **MedGrocer** casing.
