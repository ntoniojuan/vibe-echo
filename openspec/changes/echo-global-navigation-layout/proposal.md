## Why

Project ECHO’s evaluation and dashboard layouts feel heavy on small screens, the ACE teammate sidebar does not stay visible during long scrolling, and several navigation surfaces show placeholder controls or text-heavy mobile tabs. Tightening global navigation and layout improves orientation, speeds common actions, and reduces visual noise.

## What Changes

- **ACE form (Head / Heart / Hands steps):** Make the teammate history **sidebar sticky** (`top-0` / equivalent) so it remains visible while the user scrolls the long observation and ratings column.
- **Mobile bottom navigation:** Replace large text labels on the bottom-pinned bar with **`lucide-react`** icons: **Home**, **Plus**, **BarChart**, **User** (with accessible labels / `aria-label`).
- **Desktop app side panel:** Add **icons** beside **Profile** and **Logout** links for quicker scanning.
- **Marketing home header:** Remove the **notification bell** and **question mark** placeholder buttons (non-functional today).
- **Dashboard inbox cards:** Place the **Open** (or **Continue**) action on the **same row as the Head / Heart / Hands** pills to reduce vertical bulk.

## Capabilities

### New Capabilities

- `echo-ace-sidebar-sticky-layout`: Sticky positioning for the ACE evaluation teammate sidebar alongside scrollable main content.
- `echo-mobile-bottom-nav-icons`: Mobile bottom bar uses Lucide icons instead of prominent text labels; add `lucide-react` dependency.
- `echo-shell-header-sidebar-icons`: Home marketing header omits non-functional bell/help; desktop shell sidebar shows icons next to Profile and Logout.
- `echo-dashboard-inbox-card-actions`: Inbox card primary action aligns with ACE pillar row for a tighter layout.

### Modified Capabilities

- _(None — no baseline specs in `openspec/specs/`.)_

## Impact

- **Frontend:** `project-echo` — Echo wizard / ACE step layout, bottom nav component, app shell / sidebar, marketing home header, dashboard inbox card component.
- **Dependencies:** New **`lucide-react`** (tree-shakeable icon imports).
- **Accessibility:** Icons must retain screen-reader names and touch targets on mobile.
