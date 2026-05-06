## Context

Project ECHO already has a five-step wizard (`EchoWizard`): general info, three ACE note steps using `EchoAceStep` (observations + AI refinement), and a summary. Drafts persist to Firestore via `updateEchoEvaluationDraft` / `readEchoEvaluationDraft` with `status` draft or submitted. The evaluatee stats page (`EvaluateeStatsDashboard`) is fed by **`readGrowthAnalyticsFromEvaluationDrafts`** over **submitted** evaluation payloads for the signed-in evaluatee; axis labels use `readGainsAxisTickLabel` (1→S … 5→G).

## Goals / Non-Goals

**Goals:**

- Persist **twelve GAINS scores** (one per sub-competency) on the **same** draft document as existing fields, with the three **raw observation** strings unchanged.
- Present **one five-option radio group per sub-competency** with the full textual labels: Greatly exceeds, Ahead, In line, Needs improvement, Severely underdelivers (abbreviations G/A/I/N/S may appear secondarily for compact charts).
- Block advancing past steps 2–4 until every sub-competency on that step has a selected rating (unless product later relaxes — start strict).
- Stats views SHALL consume numeric 1–5 scores per code (A1…E4) to populate heat map cells and **ACE pillar averages** (mean of the four codes in each pillar).

**Non-Goals:**

- Changing GAINS semantics org-wide outside ECHO.
- New evaluatee identity model or full multi-evaluator analytics pipeline (unless already present); initial stats wiring may remain **read path** scoped to current user’s data with clear follow-up for cross-eval aggregation.
- Backend Cloud Functions for aggregation (optional later); client-side read + aggregate acceptable for first slice if rules allow.

## Decisions

1. **Numeric encoding**  
   Store each rating as integer **1–5** where **5 = Greatly exceeds (G)**, **4 = Ahead (A)**, **3 = In line (I)**, **2 = Needs improvement (N)**, **1 = Severely underdelivers (S)** — matches existing `readGainsAxisTickLabel` and demo heat map expectations.

2. **Firestore field layout**  
   Prefer a single map field `gainsRatings` with keys `A1`…`E4` and number values, **or** twelve explicit fields (e.g. `gainsA1`…`gainsE4`). **Decision:** use **`gainsRatings` map** for readability and loop-friendly UI; validate keys on read. Missing keys on legacy drafts = “unset” in UI.

3. **Draft vs submitted**  
   Same document shape for draft and submitted; `status` distinguishes. Saving on “Next” / debounced autosave MUST include current `gainsRatings` and note fields.

4. **Stats aggregation (v1 — Growth analytics)**  
   - **Query:** Submitted evaluations where **`evaluateeEmail`** matches the signed-in user’s email (`readSubmittedEchoEvaluationDraftsForEvaluateeEmail`; retry-wrapped list read on **`echoEvaluationDrafts`**).  
   - **Completed evaluation (for charts):** all twelve **`gainsRatings`** keys set; incomplete submissions do not produce dashboard props until at least one full snapshot exists.  
   - **ACE radar (three axes):** For each pillar, average each sub-competency code across **all completed** evaluations, then average the four pillar codes → **Aptitude (A1–A4)**, **Character (C1–C4)**, **Effectiveness (E1–E4)** means shown on the radar.  
   - **Growth trend (line):** Among completed evaluations, take the **four most recent** by **`updatedAt`** (tie-break implicit in sort); **overall score** per point = mean of the twelve GAINS levels; series ordered **oldest → newest** for the chart.  
   - **Heat map (4×4):** Fixed catalog order **A1–E4** (twelve cells) plus **four padded** placeholder slots; scores come from the **latest** completed evaluation only (not averaged across cycles).  
   - **Demo / X rows:** No **X1–X4** placeholders in the live heat map; demo-only reader removed from the stats route when Firestore path is used.  
   - **Empty / edge states (`EvaluateeGrowthAnalyticsEmptyState`):** **Signed out** — sign-in pitch + links; **zero submitted** docs — welcome + **“Start your first ECHO”** → `/evaluation`; **submitted but no completed GAINS grid** — explain + **“Go to dashboard”** → `/dashboard`.  
   - **Fetch errors:** Surface a rules/console hint and avoid pretending data loaded.

5. **Accessibility**  
   Each GAINS group: `<fieldset>` + `<legend>` with sub-competency title; radios named per code; labels are full sentences per option (not only letters).

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Larger payloads / merge writes | `gainsRatings` map is small; reuse existing debounced save. |
| Legacy drafts without ratings | Reader defaults to empty; wizard forces selection before continuing. |
| Security rules block stats reads | Document required Firestore rules; stats page shows an error panel + empty state until list access on **`evaluateeEmail`** is allowed. |
| Double source of truth (notes vs scores) | Notes remain qualitative; scores are canonical for stats. |

## Migration Plan

- **Reads:** Treat missing `gainsRatings` as no scores; do not crash summary or stats.  
- **Writes:** New fields merge into existing documents.  
- **UI:** Growth analytics uses the Firestore read path in **`EvaluateeStatsPageShell`**; there is **no** demo props fallback on successful auth + fetch.

## Open Questions

- Required vs optional ratings on **submit** vs **save draft** — proposal assumes **all twelve required before final submit**; drafts MAY allow partial if product wants (currently specify strict at submit in spec).

**Resolved (v1):** Evaluatees see **only their own** submitted evaluations (**`evaluateeEmail`** query). Cross-evaluator rollups remain out of scope until a later spec.
