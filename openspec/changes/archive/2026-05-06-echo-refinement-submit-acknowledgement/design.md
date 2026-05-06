## Context

Project ECHO’s Gemini refinement flow updates Firestore draft documents from a server route using `applyRefinementFromMcqAnswers`. The ACE UI triggers refinement after MCQs; the summary step currently submits without a formal accuracy attestation.

## Goals / Non-Goals

**Goals:**

- **Append-only** semantics for the observation field affected by refinement: raw evaluator text stays; refined output is added after **`--- Refined Feedback ---`** (see exact formatting in tasks).
- **Prominent loading** during the async refine request (bar or overlay on/near the observation editor).
- **Checkbox gate** on summary before submit, with user-visible error if submit attempted while unchecked.

**Non-Goals:**

- Changing MCQ generation or Gemini system prompt content (unless a tiny string tweak is required for the new header).
- Persisting the accuracy checkbox to Firestore (session/UI state only unless product requests otherwise).

## Decisions

1. **Separator format**  
   - **Decision:** Use a block starting with `\n\n--- Refined Feedback ---\n` followed by optional ISO timestamp line for clarity, then the rendered markdown body (existing renderer output). Deprecate prior `--- Refined (ISO) ---` header for **new** appends only if spec requires single canonical header—in implementation, **replace** the old delimiter string in the append logic so new refinements use the new header; **do not** rewrite historical documents.  
   - **Rationale:** Matches user request; timestamp aids support without cluttering the title line.

2. **Append semantics**  
   - **Decision:** Transaction reads current field string, sets `next = existing + newBlock`. If product previously had any path that replaced notes, remove it—**verify** API and client only use append.  
   - **Rationale:** Aligns with “append, don’t overwrite.”

3. **Loading UX**  
   - **Decision:** **Spinner overlay** covering the observation card/textarea **or** a **determinate/indeterminate bar** under the “Refine with AI” button; pick one pattern for consistency across ACE steps. Disable duplicate refine clicks while pending.  
   - **Alternatives:** Global toast-only (rejected: user asked visible bar/overlay).

4. **Submit gate**  
   - **Decision:** Local React state `accuracyAcknowledged`; `submitEchoEvaluation` checks it and shows toast error **“Please confirm accuracy…”**; Submit button `disabled` when unchecked.  
   - **Alternatives:** HTML5 `required` on checkbox inside a form—acceptable if summary is already structured as a form.

## Risks / Trade-offs

- **[Risk]** Repeated refinements produce multiple `--- Refined Feedback ---` blocks → **Mitigation:** Acceptable; optional future “collapse” UI out of scope.  
- **[Risk]** Very long fields → **Mitigation:** Firestore 1MB doc limit; existing app constraint.  
- **[Risk]** Users confuse checkbox with legal advice → **Mitigation:** Fixed HR-style copy only.

## Migration Plan

1. Ship server header change + client loading + summary checkbox.  
2. No data migration; old drafts keep old `--- Refined (ISO) ---` blocks.  
3. **Rollback:** Revert commits.

## Open Questions

- Whether to strip **only** the literal old header when **re-applying** once (product decision)—default **no**, keep full history.
