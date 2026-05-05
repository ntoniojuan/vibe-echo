## 1. Model and shared constants

- [x] 1.1 Add a `GainsSubcompetencyCode` union (`A1` | `A2` | … | `E4`) and ordered lists per ACE step in `src/lib/echo/` (single source for wizard + Firestore map keys + stats labels).
- [x] 1.2 Define `GainsLevel` as `1 | 2 | 3 | 4 | 5` with exported **full labels** (Greatly exceeds → … → Severely underdelivers) and optional letter alias for charts; align with existing `readGainsAxisTickLabel`.
- [x] 1.3 Extend `EchoWizardFormState` with `gainsRatings: Partial<Record<GainsSubcompetencyCode, GainsLevel>>` (or equivalent) and update `createInitialEchoWizardFormState`.

## 2. Firestore read/write

- [x] 2.1 Extend `updateEchoEvaluationDraft` to merge `gainsRatings` (map of string keys → number) into the draft document.
- [x] 2.2 Extend `readEchoEvaluationDraft` / `mapFirestoreDataToPayload` to parse `gainsRatings`, validate numeric 1–5 and known keys, default missing keys to unset.
- [x] 2.3 Ensure `useEchoWizard` (or equivalent) includes `gainsRatings` in debounced saves, hydrate on load, and passes updates into steps.

## 3. Wizard UI (steps 2–4)

- [x] 3.1 Refactor or extend `EchoAceStep` to render four sub-competency blocks (title, description, fieldset with five radios) using shared descriptors from 1.1.
- [x] 3.2 Wire `EchoWizard` to pass `gainsRatings` slice per step and `onGainsChange` callbacks; keep observation textarea + `EchoAceRefinementSection` per pillar.
- [x] 3.3 Implement step gate in `goNext`: steps 2–4 require all four codes on that step selected; surface inline error / focus first missing group.

## 4. Summary and submit

- [x] 4.1 Update `EchoSummaryStep` to list all twelve GAINS selections with readable labels and “Edit” jumps to the correct step.
- [x] 4.2 Block final submit until general info rules pass **and** all twelve `gainsRatings` keys are set (in addition to any note requirements defined by product).

## 5. Stats dashboard (Growth analytics)

- [x] 5.1 Add Firestore reader with retry: **`readSubmittedEchoEvaluationDraftsForEvaluateeEmail`** (submitted + `evaluateeEmail` match); document rules requirement for list access
- [x] 5.2 Implement **`readGrowthAnalyticsFromEvaluationDrafts`**: completed = all twelve GAINS; radar pillar means; trend = last **4** by **`updatedAt`**, overall score = mean of 12; heat map = **latest** complete eval, **4×4** grid with twelve codes + pads
- [x] 5.3 Wire **`EvaluateeStatsPageShell`**: load on auth email; set **`EvaluateeStatsDashboard`** props or **`EvaluateeGrowthAnalyticsEmptyState`** (**signed out** / **no submissions** / **incomplete GAINS**); **no** `readDemoEvaluateeStatsDashboardProps` fallback on success
- [x] 5.4 Ensure live heat map uses **A1–E4** catalog only (no **X1–X4** rows)

## 6. Verification

- [x] 6.1 Run `npm run lint` and `npm run build` in `project-echo`.
- [x] 6.2 Manual QA: complete draft, refresh page, confirm ratings restore; submit and confirm Growth analytics charts and heat map reflect Firestore data when rules allow; confirm empty states when user has zero submissions vs incomplete GAINS only.
