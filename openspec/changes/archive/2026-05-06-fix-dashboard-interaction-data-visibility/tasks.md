## 1. Data model and Firestore rules

- [x] 1.1 Add optional boolean `isRead` to evaluation draft payload types and `readEchoEvaluationDraftPayloadFromFirestoreData`; treat missing as unread (`false`).
- [x] 1.2 Implement `updateEchoEvaluationEvaluateeRead` (or equivalent) using `updateDoc` with retry; only set `isRead: true`, idempotent.
- [x] 1.3 Update `firestore.rules` so evaluatees may update `isRead` only on submitted docs where their email matches `evaluateeEmail` (narrow allowlist).

## 2. Received tab unread UX

- [x] 2.1 Change `EchoDashboardHomeClient` Received tab dot to depend on `feedbackRecords.some((r) => r.payload.isRead !== true)` (or equivalent), not list length.
- [x] 2.2 Optionally add row-level unread affordance on inbox cards for received items (if desired); keep consistent with specs.

## 3. Evaluatee detail — read-only content

- [x] 3.1 In `EchoEvaluationDetailShell` (or child), branch when viewer is evaluatee + status submitted: render read-only GAINS for **A1–A4, C1–C4, E1–E4** using shared code/label helpers.
- [x] 3.2 Render ACE observation fields read-only, preserving refined blocks (`--- Refined Feedback ---`); avoid showing refinement MCQ UI.
- [x] 3.3 On successful load of evaluatee read-only detail, call mark-read helper (1.2); handle errors with logging.

## 4. Sent tab — drafts and wizard resume

- [x] 4.1 Extend dashboard query grouping so **Sent** (`myEvalsRecords`) includes evaluator-owned **draft** and **submitted** docs, sorted by `updatedAt` desc.
- [x] 4.2 For each row, choose primary action: draft → `openDraftInWizard`, submitted → `openEvaluationDetail`; pass correct `EchoDashboardInboxTabId` or extend view model for copy/badge.
- [x] 4.3 Verify `/evaluation` wizard loads the selected draft id from `echoWizardDraftStorageKey` and merges `currentStepIndex` + form state; fix mount/storage race if reproduce.

## 5. Verification

- [x] 5.1 `npm run lint` && `npm run build` in `project-echo`.
- [x] 5.2 Manual: unread dot → open detail → dot clears after refresh; evaluatee sees scores + refined text; Sent draft opens wizard on saved step.
