## 1. Tokens and global surfaces

- [x] 1.1 Add **sage workspace** and **dark sidebar** CSS variables (and optional Tailwind theme extension) in `project-echo` per `design.md` Decision 1
- [x] 1.2 Update **`EchoAppShell`** main column background to use sage workspace token; keep mobile bottom padding compatible with nav

## 2. Sidebar and bottom nav

- [x] 2.1 Redesign **`EchoAppSidebar`**: dark background, **ECHO** + **MedGrocer Performance**, **+ New Evaluation** → `/evaluation`, nav links with active rail/fill, **Profile** + **Logout** footer (use `useEchoAuth` / existing sign-out)
- [x] 2.2 Add minimal icons or monogram treatment if project already has an icon pattern; otherwise use text-first nav matching mock
- [x] 2.3 Harmonize **`EchoAppBottomNav`** colors/spacing with sage shell (safe-area unchanged)

## 3. Dashboard page layout

- [x] 3.1 Refactor **`EchoDashboardHomeClient`**: header row (title + avatar / placeholder bell & help)
- [x] 3.2 Replace tab labels with **Received**, **Sent**, **Review**; preserve query/filter logic (`review` | `feedback` | `myEvals` state mapping)
- [x] 3.3 Implement **`lg+` grid**: main feed column + **Cycle Progress** aside; stack widget below feed on smaller breakpoints
- [x] 3.4 Add **`readEchoDashboardCycleProgressProps`** (or single exported builder) from inbox counts + placeholder goals — one export per file rule

## 4. Inbox cards

- [x] 4.1 Introduce **`EchoDashboardInboxCard`** (presentational) mapping `EchoEvaluationDocumentRecord` + tab to card UI: badge heuristic, relative time, From line, snippet, ACE row, actions
- [x] 4.2 Replace plain `<li>` list with card component; ensure **Review** tab keeps **Continue** → wizard draft id behavior

## 5. Cycle Progress widget

- [x] 5.1 Add **`EchoDashboardCycleProgressCard`** wired to counts from parent; footer link to **`/evaluatee/stats`**
- [x] 5.2 Document placeholder targets in code comment or helper module

## 6. Verification

- [x] 6.1 `npm run lint` and `npm run build` in **project-echo**
- [x] 6.2 Manual: desktop sidebar contrast, mobile bottom nav, all three tabs, empty/error states, **Cycle Progress** numbers match visible lists (lint + build re-run 2026-05-05; confirm in browser if unsure)
