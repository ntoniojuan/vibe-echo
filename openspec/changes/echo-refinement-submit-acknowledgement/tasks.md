## 1. Refinement append (server)

- [x] 1.1 In `applyRefinementFromMcqAnswers` (or equivalent), change the appended block header to use `--- Refined Feedback ---` per design (optional ISO timestamp on following line); keep append semantics `existingString + newBlock` so raw notes are never deleted.
- [x] 1.2 Search for any client or server path that **replaces** observation text on refine; remove or align with append-only behavior.
- [x] 1.3 Update development mock builder output formatting if it must match the same separator for local QA.

## 2. Refinement loading UI

- [x] 2.1 In the ACE refinement UI (e.g. `EchoAceRefinementSection` or parent), set **in-flight** state when “Refine with AI” is clicked; clear on success/error.
- [x] 2.2 Show **spinner overlay** on the observation editor area **or** **indeterminate progress bar** immediately below the refine control; disable refine button while loading.

## 3. Summary accuracy checkbox

- [x] 3.1 Add checkbox + label (exact copy) to `EchoSummaryStep` (or summary container); lift state to `useEchoWizard` if needed.
- [x] 3.2 In `submitEchoEvaluation`, block submit when unchecked and `showToast` with a clear error; keep Submit **disabled** or guard both routes.

## 4. Verification

- [x] 4.1 `npm run lint` and `npm run build`; manually: refine twice and confirm raw notes remain above two refined blocks; confirm loading visible; confirm submit blocked until checkbox checked.
