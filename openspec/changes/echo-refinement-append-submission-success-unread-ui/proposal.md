## Why

AI refinement can leave evaluators with **lost raw observation text** when the persisted Firestore field lags behind the in-editor text or when append logic does not treat the request’s `rawNotes` as the authoritative “original” segment. Separately, evaluators get **no clear completion moment** after submit because the wizard resets immediately. Received evaluations also show **“New” and unread chrome** even after the evaluatee marks them read, which is confusing.

## What Changes

- **Refinement append**: When refinement is applied for an ACE observation field, the stored value SHALL be **`originalText + "\n\n--- Refined Feedback ---\n" + aiText`** (with `originalText` taken from the same source the user sees before apply—aligned with request `rawNotes` and/or server rules documented in design), never replacing the prior user-written body with only AI output.
- **Submission success**: After a successful evaluation submit, navigate to a **minimal success screen** (“Evaluation Submitted!”) with a primary control **Return to Dashboard** instead of immediately resetting to a blank wizard.
- **Inbox read state**: On **Received** evaluation cards, when **`isRead` is true**, remove both the **unread dot** and the **“New”** freshness badge (and any equivalent “unread” chrome tied to that state).

## Capabilities

### New Capabilities

- `echo-refinement-observation-append`: Correct append semantics for structured refinement into ACE observation fields; delimiter and ordering requirements.
- `echo-wizard-submission-success`: Post-submit success route or screen; navigation from wizard; return to dashboard.
- `echo-dashboard-inbox-read-state`: Received-tab card presentation when `isRead` is true (no unread dot, no “New” badge).

### Modified Capabilities

- _(None — requirements are captured in the new capability specs above.)_

## Impact

- **Backend**: `project-echo` Next.js API / `applyRefinementFromMcqAnswers` (or equivalent) for observation merge rules.
- **Frontend**: Evaluation wizard (`useEchoWizard`, submit flow), new route or page under `(app)/evaluation`, dashboard inbox view model / card props (`readEchoDashboardInboxCardViewModel`, `EchoDashboardInboxCard`, `EchoDashboardHomeClient`).
