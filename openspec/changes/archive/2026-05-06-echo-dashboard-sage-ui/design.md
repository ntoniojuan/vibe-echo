## Context

**project-echo** (`EchoAppShell`, `EchoAppSidebar`, `EchoDashboardHomeClient`) today uses **light cream** sidebar (`#fdfcf0`-family) and simple bordered list rows. Firebase-backed inbox behavior is correct; this change is **presentation and layout** only, guided by the dashboard mockup (dark nav, sage main, rich cards, cycle widget).

## Goals / Non-Goals

**Goals:**

- Shift **workspace** surfaces toward a **sage** palette (muted green-grays) and away from **yellow/cream** dominance.
- Implement **dark left sidebar** on **md+** with branding, **+ New Evaluation**, and nav links aligned to mock hierarchy.
- Rework **dashboard** into a **two-column** layout on **lg+**: main **feed** + **Cycle Progress** aside; single column on small screens (widget below feed or collapsible — pick stacked below for simplicity).
- Rename inbox tabs to **Received**, **Sent**, **Review** with **documented mapping** to existing filters (no change to query semantics).
- Richer **cards** with **relative time**, **From** line, optional **badge**, and **ACE** footer strip.

**Non-Goals:**

- Real **notification** system, **settings** page implementation, or **help** center content (placeholders / links `#` or `/` only unless routes exist).
- Backend **cycle targets** persistence (use constants in config until product defines OKRs).
- Changing **Firestore** schema or inbox **query** logic except passing **counts** to the widget.

## Decisions

1. **Color system**  
   - **Decision:** Add or extend **CSS variables** (e.g. `--echo-surface-sage`, `--echo-sidebar`, `--echo-sidebar-foreground`, `--echo-cta`) in `project-echo` globals; map Tailwind arbitrary values or extend theme once if the project already centralizes tokens.  
   - **Sage body example direction:** soft sage **#e8ede5**–**#d8e0d4** range for main background; **cards** slightly **cooler white** (`#f7f8f6`) or subtle sage lift.  
   - **Sidebar:** **#1e293b**–**#0f172a** range (slate/navy), **text** `#f8fafc` / muted `#94a3b8`; **active** rail **primary** green from existing token if contrast passes.  
   - **Rationale:** Keeps MedGrocer-style **green** story without cream cast.

2. **Tab semantics (rename only)**  
   - **Review** → current **“For my review”** (`status === "draft"` & evaluator).  
   - **Received** → **“My feedback”** (`submitted`, evaluatee).  
   - **Sent** → **“My evals”** (`submitted`, evaluator).  
   - **Rationale:** Matches mock **Received / Sent / Review** without a fourth tab.

3. **+ New Evaluation**  
   - **Decision:** **Link** to canonical wizard **`/evaluation`** (same as **Create Eval**). Style as full-width rounded button in sidebar below brand.  
   - **Rationale:** Single source for creation; matches mock CTA.

4. **Cycle Progress widget**  
   - **Decision:** **v1** derives **received count** = submitted about user; **sent count** = submitted by user as evaluator. **Targets**: constants **`receivedGoal = 5`**, **`sentGoal = 1`** in a small `readEchoDashboardCycleProgressTargets.ts` (or inline constants file with one export) until configurable.  
   - **Rationale:** Delivers mock layout with honest counts; goals are clearly “placeholder” in code comments.

5. **Card “badges” and time**  
   - **Decision:** **Relative time** from `payload.updatedAt`. **Badge**: if `updatedAt` within **48h** and tab **Received/Sent**, show **“New”**; if draft **Review** and recently touched, **“In progress”**; else optional **“Updated”** when `updatedAt` differs from `createdAt` by **> 1h** (heuristic — document in component).  
   - **Rationale:** No new Firestore fields required.

6. **Head / Heart / Hands row**  
   - **Decision:** Show **three** compact icons or text chips on every card; for **v1** all three may appear as **static** “coverage” hints (evaluations always span ACE in product) **or** derive **draft step** from `currentStepIndex` to dim completed pillars — **prefer** static three icons for simplicity unless step index is reliable on submitted docs.  
   - **Rationale:** Visual parity with mock without schema.

7. **Logout / Profile in sidebar**  
   - **Decision:** **Profile** links to **`/dashboard/profile`**. **Logout** calls existing **`signOutUser`** from auth context (or equivalent). **Settings** → link to **`/dashboard/profile`** as alias **or** hide until route exists (tasks pick one; prefer **Profile** only if no settings route).  
   - **Rationale:** Avoid dead links.

## Risks / Trade-offs

- **[Risk] Contrast** on sage + green — Mitigation: verify **sidebar** and **CTA** with automated or manual contrast check.  
- **[Risk] Cycle targets misleading** — Mitigation: label widget **“Cycle progress (targets are placeholders)”** in helper text or tooltip until product replaces constants.  
- **[Risk] Tab rename confuses existing users** — Mitigation: short subtitle under tabs or first-run hint (optional, tasks).

## Migration Plan

1. Land tokens + sidebar + shell background.  
2. Dashboard layout + cards + widget.  
3. Remove obsolete cream classes from sidebar.  
4. Rollback: revert Tailwind classes and dashboard component (Git).

## Open Questions

- Should **MedGrocer Performance** appear **verbatim** under **ECHO** (marketing approval)?  
- Final **sage** hex values: brand team pick vs engineer proposal in Decision 1.
