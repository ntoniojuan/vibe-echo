## Why

Evaluators need confidence that **original raw notes are never discarded** when AI refinement runs, that they see **clear feedback** while Gemini is working, and that **submission** reflects explicit acknowledgment of accuracy. Today refinement mostly appends with a timestamped header, but the product wants a clearer **“Refined Feedback”** separator and stronger UX around **loading** and **legal-style attestation** on the summary step.

## What Changes

- **Refinement apply (`applyRefinementFromMcqAnswers` / API):** When saving AI output into the ACE observation field that holds **raw notes**, **append** the generated professional feedback **below** the existing text using a visible separator line **`--- Refined Feedback ---`** (and optional timestamp sub-line if useful for audit). The evaluator’s original notes SHALL **not** be removed or replaced by the model output alone.
- **Refinement UI:** When **“Refine with AI”** (or equivalent) is activated, show a **visible loading state**—**progress bar or full-field spinner overlay**—until the apply call completes or fails.
- **Summary / Submit:** Add a **required** checkbox: *“I agree that everything I added here is true and accurate to the best of my knowledge.”* **Submit** MUST be disabled or blocked with an **error toast/message** until checked.

## Capabilities

### New Capabilities

- `echo-refinement-append-refined-feedback`: Server-side refinement apply SHALL append refined markdown under `--- Refined Feedback ---` without overwriting prior observation text.
- `echo-refinement-apply-loading-ui`: Client UI SHALL show an obvious loading indicator (bar or overlay) during refinement requests.
- `echo-wizard-summary-accuracy-acknowledgement`: Summary step SHALL include a mandatory accuracy checkbox gating submission.

### Modified Capabilities

- _(None — no `openspec/specs/` baseline in repo.)_

## Impact

- **Backend:** `applyRefinementFromMcqAnswers` transaction and possibly response shape; refinement API route unchanged externally unless payload tweaks needed.
- **Frontend:** ACE refinement control component(s), summary step + `useEchoWizard` submit validation.
- **Copy / compliance:** Attestation string fixed as specified.
