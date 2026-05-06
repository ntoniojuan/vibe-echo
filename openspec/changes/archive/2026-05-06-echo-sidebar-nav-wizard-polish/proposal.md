## Why

Desktop **sidebar** duplicates navigation to **`/evaluation`** (both **+ New Evaluation** and **Create**), **Profile/Logout** sit below the fold when the nav list grows, and the evaluation **wizard footer** spans the full viewport width so it **covers** the dark sidebar on desktop. Dashboard **inbox cards** show **“New”** for every recent **Received** item without an obvious rule, and **Head / Heart / Hands** read as live feedback flags though they were only static **ACE** labels.

## What Changes

- **Remove** the **Create** entry from the **desktop sidebar only**; keep **+ New Evaluation** and keep **Create Eval** on **mobile bottom nav** (no duplicate on desktop).
- **Sidebar layout:** **sticky chrome** — brand + CTA non-scrolling; **scrollable** middle only for **Home** and **Stats** when needed; **Profile** and **Logout** always visible at the **bottom** without scrolling the whole page.
- **Icons:** Add simple **iconography** beside **ECHO** (mark), **Home**, and **Stats** in the sidebar.
- **Wizard footer geometry:** On **`md+`**, pin **Back/Next** to the **main content column** (`left` offset = sidebar width) so the bar **does not overlap** the sidebar (**Profile/Logout** remain visible and clickable).
- **Inbox badges:** Tighten **“New”** to a shorter freshness window (e.g. **24h** from `updatedAt`) and keep **“Updated”** when `updatedAt` is meaningfully after `createdAt` — document behavior for evaluatees.
- **ACE row semantics:** Treat **Head / Heart / Hands** as **Aptitude / Character / Effectiveness**; each chip **emphasized** when the corresponding **observation** field on the evaluation payload is non-empty, with **accessible titles** explaining they reflect **written notes**, not GAINS scores alone.

## Capabilities

### New Capabilities

- `echo-sidebar-shell-polish`: Desktop sidebar nav set, layout regions, icons, duplicate-create removal.
- `echo-wizard-footer-inset`: Wizard pinned footer inset on large viewports so it does not cover the app sidebar.
- `echo-inbox-card-badge-ace-clarity`: Badge window + ACE pill emphasis tied to observation fields.

### Modified Capabilities

- *(none — baseline `openspec/specs/` empty)*

## Impact

- **project-echo:** `readEchoAppNavDescriptors.ts` (or equivalent), `EchoAppSidebar.tsx`, `EchoBottomPinnedNavigationBar.tsx`, `EchoDashboardInboxCard.tsx`, `readEchoDashboardInboxCardViewModel.ts`, optional `tasks.md` under this change.
