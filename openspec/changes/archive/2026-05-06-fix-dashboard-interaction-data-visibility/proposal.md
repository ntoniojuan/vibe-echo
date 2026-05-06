## Why

The dashboard misleads evaluatees about “new” received feedback, hides substantive evaluation content (GAINS A1–E4 and refined observation text) behind a detail page that only surfaces reason + dialogue, and splits “outgoing” drafts away from the Sent mental model. Users need accurate unread signals, a proper read-only feedback view, and reliable resume of in-progress evaluations from the list they expect.

## What Changes

- **Received tab indicator**: Replace the tab-level dot that appears whenever any received row exists with a signal **only** when at least one received evaluation is **unread** (`isRead === false`, or equivalent field added to Firestore if missing). Card-level “New/Updated” badges may remain for freshness but must not be conflated with unread semantics unless spec’d otherwise.
- **Mark as read**: When the evaluatee opens a **submitted about them** evaluation (read-only detail), persist **`isRead: true`** (or equivalent) on that document so the tab indicator and any row-level unread affordances clear after load (or after explicit acknowledgment—see design).
- **Evaluatee detail view**: Extend `/dashboard/evaluation/[evaluationId]` (or dedicated route) so **evaluatees** viewing **completed** evaluations see **read-only** GAINS scores for **all sub-competency codes** (**A1–A4**, **C1–C4**, **E1–E4** — same as the wizard) and **refined feedback** (content currently appended under `--- Refined Feedback ---` inside ACE observation fields). Evaluator-facing or draft behavior stays unchanged.
- **Sent tab + drafts**: Today **Sent** only lists **submitted** evaluator-owned documents; **drafts** appear under **Review**. Include **draft** evaluator-owned evaluations in the **Sent** list (or document the alternative if product keeps a single home for drafts), with clear draft labeling. Clicking a **draft** row opens the multi-step ACE wizard with **Firestore + `currentStepIndex` pre-filled** (existing `echoWizardDraftStorageKey` pattern) so editing continues seamlessly.

## Capabilities

### New Capabilities

- `echo-dashboard-received-unread`: Unread semantics for the Received tab indicator; Firestore field(s) and client updates when feedback is viewed.
- `echo-evaluatee-evaluation-read-view`: Read-only presentation of GAINS sub-scores and observation text (including refined blocks) for the evaluatee on the evaluation detail route.
- `echo-dashboard-sent-draft-resume`: Sent tab lists include evaluator drafts; navigation resumes the wizard with saved step and form state.

### Modified Capabilities

- _(none — existing inbox spec lives under past changes; this change introduces new requirement files under this change’s `specs/` per schema.)_

## Impact

- **Firestore**: New boolean (or timestamp) field on `echoEvaluationDrafts` documents for evaluatee read state; security rules must allow evaluatee to update only that field (or a narrow subset) for documents where they are the evaluatee and status is `submitted`.
- **Client**: `EchoDashboardHomeClient` tab dot logic; inbox queries/list merge for Sent; evaluation detail shell / new presentational components; `readEchoEvaluationDraftPayloadFromFirestoreData` / types for `isRead`; `useEchoWizard` / `/evaluation` entry verified when switching draft IDs from dashboard.
- **QA**: Unread clears after open; evaluatee cannot edit scores; evaluator still uses wizard; no duplicate/conflicting draft UX between Review and Sent (see design).
