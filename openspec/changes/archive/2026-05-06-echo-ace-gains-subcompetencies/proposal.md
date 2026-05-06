## Why

The ACE evaluation wizard currently captures only free-text observations per ACE pillar (Aptitude, Character, Effectiveness). Reviewers need **structured GAINS ratings per sub-competency** so scores are comparable, storable in one **draft** document, and reusable for the evaluatee **stats** experience. Without this, the stats dashboard cannot reflect real evaluation data.

## What Changes

- Add **twelve sub-competency sections** across steps 2–4 of the wizard, each with a **mandatory five-level GAINS** scale using full labels: **Greatly exceeds**, **Ahead**, **In line**, **Needs improvement**, **Severely underdelivers** (stored as a consistent numeric 1–5 or enum mapped to display labels).
- **Step 2 — Aptitude (Head):** A1 Internal Data-literacy; A2 External Comprehension; A3 Decision-making; A4 Clarity (descriptions as specified by product).
- **Step 3 — Character (Heart):** C1 Resilience; C2 Coachability; C3 Teamwork; C4 Coaching Ability.
- **Step 4 — Effectiveness (Hands):** E1 Process-focus; E2 Planning; E3 Outcomes; E4 Resourcefulness.
- Extend the existing **Firestore evaluation draft** so a single **draft** document persists **all twelve ratings** plus the three **raw observation note** fields (and existing general-info fields). Status remains draft until submit.
- Wire **evaluatee Growth analytics** (`/evaluatee/stats`): **submitted** evaluations for **`evaluateeEmail ===` signed-in user’s email**, then derive **ACE radar** (pillar averages), **overall-score trend** (last four *completed* cycles by **`updatedAt`**), and **4×4 GAINS heat map** (latest completed evaluation’s twelve ratings). **No demo stats reader** when live path succeeds—use empty states instead (see design).

## Capabilities

### New Capabilities

- `echo-ace-wizard-gains`: Multi-step ACE form UI — one GAINS radio group per sub-competency (A1–A4, C1–C4, E1–E4) with accessibility, validation before next step, and summary review.
- `echo-evaluation-draft-gains`: Firestore draft document schema and client persistence for twelve GAINS values plus raw notes and metadata (`status: draft`, timestamps, step index).
- `echo-evaluatee-stats-gains`: Stats page derives presentation data (per-sub-competency scores, ACE pillar averages) from persisted GAINS ratings per agreed aggregation rules.

### Modified Capabilities

- (None — no `openspec/specs/` baseline in repo; prior behavior is implementation-only in project-echo.)

## Impact

- **Frontend:** `EchoWizard`, `EchoAceStep`, `EchoSummaryStep`, form state hooks, GAINS label utilities (may already exist under `readGainsAxisTickLabel`).
- **Firebase:** `updateEchoEvaluationDraft`, `readEchoEvaluationDraft`, types in `echoWizardFormState` / payload mappers.
- **Stats:** `EvaluateeStatsDashboard` + **`readGrowthAnalyticsFromEvaluationDrafts`** — Firestore-backed reads only; **`EvaluateeGrowthAnalyticsEmptyState`** for **signed out**, **zero submissions**, and **submissions without a full GAINS grid**.
