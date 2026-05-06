## Why

Follow-up UX and reliability work on the evaluation wizard was implemented in `project-echo` but not reflected in OpenSpec. Aligning specs documents the intended behavior for ACE validation placement, observation fields, draft save semantics, and the submission success screen.

## What Changes

- **ACE GAINS validation**: Primary copy lives in the **fixed bottom bar** (not inline in the scrolling step column); optional **toast** remains for visibility.
- **Observations**: Plain **textarea** with **taller default** and **vertical resize**; **legacy HTML** in Firestore normalized to plain multiline text for edit and read-only surfaces.
- **Save draft**: **`echoEvaluationDrafts`** write is primary; **`system_logs`** audit write is **best-effort** so audit failures do not fail saves.
- **Submission success**: Content wrapped in an **elevated card** matching Echo surfaces.

## Capabilities

### Modified Capabilities

- `echo-ace-wizard-gains` (canonical under `openspec/specs/`)
- `echo-wizard-submission-success`
- `echo-evaluation-draft-gains`

## Impact

- **Code**: Already landed in `project-echo` (`EchoBottomPinnedNavigationBar`, `EchoAceStep`, `EchoWizard`, `useEchoWizard`, `save-draft` route, `updateEchoEvaluationDraft`, submitted page, `readEchoObservationForPlainDisplay`, etc.).
- **Specs**: This change updates canonical requirements only; no new capability slugs.
