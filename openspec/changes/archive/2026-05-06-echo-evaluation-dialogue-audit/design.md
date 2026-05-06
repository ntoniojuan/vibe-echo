## Context

`project-echo` stores evaluations in Firestore (`echoEvaluationDrafts`). The dashboard and evaluatee flows list and open drafts, but there is no per-evaluation threaded conversation or a centralized **system_logs** stream for evaluation mutations. IT.06.POL expects auditability for edits and deletes. Peer evaluations may be anonymous; identity must not leak in UI or careless logging.

## Goals / Non-Goals

**Goals:**

- Per-evaluation **dialogue thread** with **real-time updates** (`onSnapshot`), **chronological** messages, **timestamps**, and **avatars** in a compact “social feed” layout at the **bottom of the evaluation detail view** for a **specific** evaluation id.
- **Audit trail**: on **evaluation document update** and **delete**, persist **actor user id** (Firebase Auth UID or agreed service principal), **server timestamp**, **action** (`edit` | `delete`), **evaluation document id**, and **snapshot** of evaluation fields (or full document JSON before/after as agreed) to **`system_logs`** (Firestore collection), **only via trusted server** (Cloud Functions), not writable by clients.
- **Anonymous peer rule**: when `isAnonymous === true` (peer context), thread UI SHALL render the author label as **`Anonymous Teammate`** and MUST NOT render real names or email for that evaluation’s anonymous participants.

**Non-Goals:**

- Full-featured chat (typing indicators, read receipts, threads-within-threads, file uploads) unless trivially free.
- End-user facing audit log browser in v1 (ops may use Firebase console or a separate admin tool later).
- Encrypting log payloads beyond existing Firestore project defaults (call out if compliance requires encryption-at-rest policies).

## Decisions

1. **Data model for messages**  
   - **Decision**: Subcollection `echoEvaluationDrafts/{evaluationId}/threadMessages` with documents `{ authorUid, authorDisplayName?, text, createdAt, ...(optional client message id) }`. Query: `orderBy(createdAt, 'asc')` with real-time listener on that query.  
   - **Rationale**: Keeps messages scoped and colocated with the evaluation; avoids a top-level collection without a natural partition.  
   - **Alternatives**: Top-level `evaluationThreads` with `evaluationId` field (simpler security rules patterns but more index surface).

2. **Real-time UI**  
   - **Decision**: Client `onSnapshot` on the ordered query; render list with avatar (photo URL from profile or initials fallback), body text, and timestamp (locale-aware; show date+time for older messages).  
   - **Rationale**: Matches requirement explicitly.  
   - **Alternatives**: Polling (rejected: not real-time).

3. **Audit implementation**  
   - **Decision**: **Firebase Cloud Functions** using Firestore triggers: `onDocumentUpdated` and `onDocumentDeleted` on `echoEvaluationDrafts/{evaluationId}`. Each invocation writes one doc to `system_logs` with: `eventType`, `evaluationId`, `actorUid` (from `context.auth` if using callable proxy **or** from evaluated change metadata—**note**: plain Firestore triggers do not include end-user JWT; see risk below), `timestamp` (`FieldValue.serverTimestamp()`), `snapshot` (serialized map of fields after change, or `before`/`after` for updates).  
   - **Rationale**: Central, tamper-resistant path; clients cannot spoof logs.  
   - **Alternatives**: Client writes to `system_logs` (rejected: spoofable). **Callable “save evaluation”** that writes doc + log in one transaction (good if product already routes all edits through API; **currently Echo uses direct Firestore client writes**—see Open Questions).

4. **`isAnonymous` placement**  
   - **Decision**: Add boolean `isAnonymous` on the evaluation document when the evaluation is a **peer** review that must hide identity; thread message author resolution for display uses **evaluation’s** `isAnonymous` plus relationship rules (e.g. if message `authorUid` matches evaluator and `isAnonymous`, show **Anonymous Teammate**).  
   - **Rationale**: Single source of truth for the evaluation context.  
   - **Alternatives**: Per-message anonymity flag (more flexible but redundant if evaluation-level is sufficient).

5. **Security rules**  
   - **Decision**: `threadMessages`: create/read allowed only for users who can already read the parent evaluation (reuse same access model as parent doc); update/delete restricted (e.g. author-only short window or disallowed). `system_logs`: **no client read/write** in v1 (admin SDK / functions only).  
   - **Rationale**: Minimize leak surface.

## Risks / Trade-offs

- **[Risk] Firestore background triggers do not know the human actor’s UID** for client-issued writes → **Mitigation**: Prefer routing evaluation **edits/deletes through a Callable Function or HTTPS Cloud Function** that verifies `context.auth.uid` and performs the write, then appends audit in the same transaction; or accept logging **“client write”** with snapshot only and document limitation until refactor. (Mark as **Open Question** until product chooses.)  
- **[Risk] Delete trigger loses “before” data if not captured** → **Mitigation**: In `onDocumentDeleted`, log `{ snapshot: change.data.before }` if using v2 API with `Change<DocumentSnapshot>`; confirm Firebase Functions/Firestore extension version supports `before` on delete.  
- **[Risk] Anonymous leakage via avatar or profile lookup** → **Mitigation**: When anonymous rule applies, UI uses **generic avatar** (initial “A” or neutral icon), not profile photo URL from the hidden user.  
- **[Risk] Log volume** → **Mitigation**: Log on meaningful field changes only (optional diff) in a follow-up; v1 may log full document for compliance simplicity.

## Migration Plan

1. Deploy Firestore rules/indexes (messages query index).  
2. Deploy Cloud Functions (audit + optional callable write if adopted).  
3. Ship UI thread on evaluation detail; feature-flag if needed.  
4. Backfill: none required for messages; `isAnonymous` defaults to `false` for legacy docs.  
5. **Rollback**: Disable functions; hide UI component; rules can deny new writes while preserving reads.

## Open Questions

- Should evaluation mutations be **refactored to server-mediated writes** so every audit row has a definitive `actorUid`?  
- Exact **`system_logs` document schema** (flat collection vs `system_logs/evaluations/...`) and retention/redaction policy for PII in snapshots.  
- Whether **soft delete** is preferred over hard delete for evaluations to simplify audit “delete” semantics.
