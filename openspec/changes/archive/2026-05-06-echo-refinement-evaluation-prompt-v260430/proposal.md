## Why

AI **refinement** (post-MCQ) currently emits a **single paragraph**, which does not match the **Evaluation Prompt v260430** structure MedGrocer uses for HR performance notes: **Observations**, **Evaluatee to start working on or continue** (surfaced as **Areas to improve** in the product UI), **Timing or Trigger**, and **Support**, plus the **mandatory footer** line. Aligning the model output keeps **ECHO** consistent with the PDF standard and makes pasted text scannable for supervisors.

## What Changes

- Replace the **apply** (Gemini) JSON contract from `{"paragraph":...}` to **four string fields**: **observations**, **areasToImprove**, **timingOrTrigger**, **support** (normalized keys in JSON; rendered with user-facing headings **Observations**, **Areas to improve**, **Timing or trigger**, **Support**).
- Rewrite the **refinement system prompt** to incorporate **Evaluation Prompt v260430** rules (role, ACE domain, tone, anonymization to **Evaluatee**, observation-only, sharpening, 1–3 bullets per section where data supports it, missing-data honesty).
- Optionally tune the **MCQ system prompt** so generated questions better elicit clarifications needed for those **four** sections.
- Update **development / quota-fallback** mock text to use the **same markdown shape** for manual testing.
- Preserve existing API shapes (`mcqs` + `answers` length 5), Firestore **append** behavior, and **refined timestamp** delimiter.

## Capabilities

### New Capabilities

- `echo-refinement-structured-apply`: Structured refinement output mapped to **v260430**-style sections and mandatory footer in `project-echo`.

### Modified Capabilities

- *(none — no `openspec/specs/` baseline in repo)*

## Impact

- **project-echo:** `refinementMcqZod.ts`, `applyRefinementFromMcqAnswers.ts`, `generateRefinementMCQs.ts`, `buildDevelopmentMockRefinedParagraph.ts`, new small formatter module under `src/lib/refinement/`.
