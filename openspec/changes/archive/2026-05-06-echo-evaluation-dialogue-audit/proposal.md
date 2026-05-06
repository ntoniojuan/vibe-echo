## Why

Evaluators and evaluatees need a lightweight, real-time conversation tied to a single evaluation record so feedback can continue after submission, and the organization needs tamper-evident audit history for evaluation edits and deletions per IT.06.POL. Today there is no threaded dialogue on the evaluation view and no structured audit trail for mutation events.

## What Changes

- Add a **Twitter-style dialogue thread** at the bottom of the **specific evaluation detail view** (not the wizard list alone): messages stored in Firestore, **real-time UI** via **`onSnapshot`**, with **relative/absolute timestamps** and **author avatars**.
- Introduce **audit logging** for **any edit or delete** of an evaluation document: capture **user id**, **timestamp**, and a **data snapshot** into a dedicated Firestore collection (e.g. `system_logs` or namespaced path), implemented as **Firebase Cloud Functions** (triggers on document write/delete) or an equivalent **server-side hook** if the product standard prefers callable writes—preference in design: **Cloud Functions** for consistency and non-bypass.
- **Privacy**: For **peer** evaluations where **`isAnonymous` is true**, the dialogue UI must **never** show the real evaluator name; display label **`Anonymous Teammate`** only (same rule for any thread UI that would otherwise show a display name).
- Likely **schema extensions**: evaluation payload or subcollection for `threadMessages`; optional `isAnonymous` on evaluation documents for peer flows; Firebase indexes and security rules updates.

## Capabilities

### New Capabilities

- `echo-evaluation-dialogue-thread`: Real-time evaluation-scoped chat UI (bottom of evaluation detail), Firestore model, subscriptions, timestamps, avatars, anonymous display rules for peer reviews.
- `echo-evaluation-audit-log`: Server-side listeners for evaluation edit/delete; append structured log entries (user id, time, snapshot) to `system_logs` (or agreed path); operational and privacy constraints documented in design.

### Modified Capabilities

- _(None — no existing `openspec/specs` baseline in this repo.)_

## Impact

- **Frontend**: `project-echo` — new evaluation detail route or embedded panel; Firestore hooks/components; avatar and time formatting; integration with existing auth (Firebase UID for audit correlation where applicable).
- **Backend**: New or extended **Firebase Cloud Functions** project (or monorepo functions package) deployed alongside Echo; Firestore **rules** for thread + logs; **composite indexes** if querying messages by evaluation.
- **Data**: New subcollection or collection paths; `system_logs` writes **server-only**; possible migration or default for legacy evaluations without `isAnonymous`.
- **Compliance**: IT.06.POL alignment for mutation visibility; ensure anonymous peer identity is not leaked in logs or UI.
