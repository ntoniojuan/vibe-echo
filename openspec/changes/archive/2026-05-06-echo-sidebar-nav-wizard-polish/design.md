## Context

Follow-up to **echo-dashboard-sage-ui**: users see redundant **Create** vs **+ New Evaluation**, must scroll to reach **Logout**, wizard **footer** obscures the **sidebar** on **`/evaluation`**, and **Received** cards all show **New** within the current **48h** window with unclear meaning for **Head/Heart/Hands**.

## Goals / Non-Goals

**Goals:**

- Single desktop path to **create** via **+ New Evaluation**; **Home** + **Stats** remain in the scrollable nav cluster.
- **Profile/Logout** pinned to the **viewport bottom** of the sidebar on **`md+`**.
- **Wizard footer** horizontally scoped to **main** on **`md+`** (`left: 15rem` matching `w-60`).
- **“New”** badge only when **`updatedAt`** is within **24 hours** (config constant in view-model file); older items show **“Updated”** only when `updatedAt - createdAt > 1h`, else no badge.
- **ACE pills:** `filled` = non-empty trimmed observation string for **Aptitude / Character / Effectiveness**; tooltip/title text explains pillar.

**Non-Goals:**

- Server “seen” state or per-user read receipts for inbox.
- Replacing bottom-nav **Create Eval** on mobile.

## Decisions

1. **Nav descriptor shape** — Add `desktopSlot: "primary" | "footer" | "omit"`; **evaluation** row is **`omit`** for desktop sidebar lists; bottom nav still iterates **all** items.
2. **Sidebar height** — `md:h-screen md:overflow-hidden flex flex-col`; middle `flex-1 min-h-0 overflow-y-auto`.
3. **Wizard footer** — `md:left-60 md:right-0 md:w-auto` (Tailwind); mobile unchanged (`left-0 w-full` + bottom offset above tab bar).
4. **Badge copy** — Document in UI spec: **New** ≠ “unread”; it means **recently submitted/updated**.

## Risks / Trade-offs

- **Submitted** evaluations with **empty** observation strings show **unfilled** ACE pills (honest but may look “incomplete”) — acceptable until rich detail view exists.

## Open Questions

- Should **Stats** icon match marketing? *Using simple inline SVGs consistent with existing outline style.*
