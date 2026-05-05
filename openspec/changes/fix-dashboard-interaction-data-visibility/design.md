## Context

- **Dashboard** (`EchoDashboardHomeClient`) loads evaluator- and evaluatee-scoped documents from `echoEvaluationDrafts`. The **Received** tab dot today renders when `feedbackRecords.length > 0`, not unread state (`readEvaluateeHeatMapPresentation` / inbox VM unrelated).
- **Evaluation detail** (`EchoEvaluationDetailShell`) shows metadata, evaluation reason, and dialogue thread — not GAINS codes or structured read-only observation content.
- **Wizard** (`useEchoWizard`) initializes from `echoWizardDraftStorageKey` + `readEchoEvaluationDraft`, merging `currentStepIndex` and form fields; dashboard already calls `openDraftInWizard(documentId)` from the **Review** tab.
- **Payload types** (`EchoEvaluationDraftFirestorePayload`) do not yet expose `isRead`; refinement content lives inside ACE observation strings with a `--- Refined Feedback ---` delimiter.

## Goals / Non-Goals

**Goals:**

- Accurate **unread** indicator on **Received** tied to evaluatee read state persisted in Firestore.
- **Evaluatee** can open a **submitted** evaluation and read **A1–E4** scores and full observation text including **Refined Feedback** blocks, without editing.
- **Sent** lists **draft** outgoing evaluations and resumes the wizard with saved step and fields.

**Non-Goals:**

- Redesigning thread/chat UX, changing refinement generation, or exposing raw MCQ payloads to evaluatees.
- Rewriting GAINS taxonomy (twelve codes A1–A4, C1–C4, E1–E4 as today).
- Automatic email/push notifications.

## Decisions

1. **Unread field**  
   - **Choice**: Add boolean `isRead` on the evaluation document, default **`false`** for new submissions; clients treat **missing** `isRead` as **`false`** (unread) for backward compatibility.  
   - **Alternative**: `evaluateeLastReadAt` timestamp — richer for analytics but unnecessary for tab dot; boolean is simpler.

2. **When to mark read**  
   - **Choice**: Set `isRead: true` when the **evaluatee** (authenticated email matches `evaluateeEmail`, case-normalized per existing conventions) successfully loads the **read-only detail** view for a **`submitted`** document, using an idempotent `updateDoc`/helper with retry.  
   - **Alternative**: Mark on tab switch — weaker (user might never open detail).

3. **Authorization**  
   - **Choice**: Firestore rules allow the evaluatee to update **only** `isRead` (and optionally `updatedAt` if the app maintains it) on documents where `status == submitted` and their email matches `evaluateeEmail`. Evaluators must not flip evaluatee read state arbitrarily.

4. **Tab dot**  
   - **Choice**: Show the Received tab dot iff **≥ 1** feedback record has `isRead !== true` (treating undefined as unread). Hide when all read. Optional follow-up: row-level dot — out of scope unless spec adds it.

5. **Evaluatee detail content**  
   - **Choice**: Reuse existing labels/codes from shared GAINS metadata (same source as wizard/summary) to render a read-only grid or list for **A1–A4, C1–C4, E1–E4**. Render ACE observations as read-only prose; **surface refined sections** by parsing or by displaying full field content (refinement already embedded with delimiter).  
   - **Alternative**: Separate Firestore field for refined blob — rejected; data already in observations.

6. **Sent + drafts**  
   - **Choice**: Build `myEvalsRecords` from evaluator-owned docs with `status === "draft" | "submitted"`, sorted by `updatedAt` desc. Primary action: **draft** → `openDraftInWizard`, **submitted** → `openEvaluationDetail`. Card copy distinguishes draft vs submitted via existing VM or extended variant.  
   - **Note**: **Review** tab may still list drafts (`forReviewRecords`); duplicate rows under **Sent** are acceptable for this iteration; deduplication can be an open question.

## Risks / Trade-offs

- **[Risk]** Rules too loose on `isRead` updates → **[Mitigation]** Field-level rule constraints; integration test with emulators if available.
- **[Risk]** Wizard `useEffect([])` misses draft id if storage written after mount → **[Mitigation]** Verify navigation always mounts fresh `/evaluation` page; if not, add storage listener or key remount on draft id (tasks).
- **[Risk]** Mark-read fails silently → **[Mitigation]** Log errors; UI can still show content; unread may linger — retry.

## Migration Plan

1. Deploy rule + client together; existing docs without `isRead` behave as unread.
2. No bulk backfill required; dot may appear until users open each item.
3. Rollback: revert client to ignore `isRead` and show dot on count (previous behavior).

## Open Questions

- Should **Review** and **Sent** both list the same drafts long-term, or should product consolidate to one tab?
- Should evaluatee detail **hide** the dialogue composer entirely vs read-only view + optional reply?
