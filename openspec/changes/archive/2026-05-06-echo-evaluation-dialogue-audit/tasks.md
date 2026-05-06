## 1. Data model, indexes, and security rules

- [x] 1.1 Add `isAnonymous` (boolean, default false) and any peer metadata needed on `echoEvaluationDrafts` payload types, serializers, and wizard save paths in `project-echo`.
- [x] 1.2 Define Firestore subcollection path `echoEvaluationDrafts/{evaluationId}/threadMessages` with documented fields (`authorUid`, `text`, `createdAt`, optional display hints) and add composite index for `orderBy(createdAt)` if required.
- [x] 1.3 Update Firestore security rules: allow read/create (and tight update/delete policy) on `threadMessages` for users authorized for the parent evaluation; **deny** all client writes to `system_logs`.

## 2. Audit logging (IT.06.POL)

- [x] 2.1 Add Firebase Cloud Functions package (or monorepo location) with Firestore triggers on `echoEvaluationDrafts` for `onUpdate` and `onDocumentDeleted` (or equivalent) writing audit docs to `system_logs` with event type, evaluation id, timestamp, snapshot payload, and actor uid per adopted approach (resolve Open Question: direct-trigger vs callable-mediated writes).
- [x] 2.2 If using callable/HTTPS-mediated evaluation saves, implement shared write + audit transaction and update client to use it for edits/deletes so `actorUid` is always present.
- [x] 2.3 Document deploy steps (functions config, IAM, project id) for MedGrocer Firebase.

## 3. Dialogue thread UI (evaluation detail)

- [x] 3.1 Identify or add the **specific evaluation detail** route/view (single `evaluationId`) where the thread mounts at the **bottom**; ensure deep-link or dashboard navigation passes id.
- [x] 3.2 Implement client hook or service using `onSnapshot` on ordered `threadMessages` query; handle loading and unsubscribe on unmount.
- [x] 3.3 Build Twitter-style message list: avatar (or generic for anonymous case), body, formatted timestamps; composer to post new message with current user auth.
- [x] 3.4 Apply **Anonymous Teammate** rule when `isAnonymous` is true: mask display name and use non-identifying avatar for covered authors; verify no email leakage.

## 4. Verification

- [ ] 4.1 Manual test: two browsers see real-time messages; anonymous peer shows only `Anonymous Teammate`.
- [ ] 4.2 Manual test: edit and delete evaluation records emit expected `system_logs` documents and clients cannot write `system_logs` directly.
