## Context

- **Refinement apply** runs in the Next.js API (`applyRefinementFromMcqAnswers`), merging structured Gemini output into Firestore ACE observation fields. The client always sends **`rawNotes`** matching the current textarea. A common failure mode is using **only the document snapshot** as the “original” segment when the textarea has newer text that has not been flushed to Firestore, which yields **`original` appear wiped** after apply.
- **Wizard submit** (`useEchoWizard.submitEchoEvaluation`) currently resets local state and draft id immediately after a successful `updateEchoEvaluationDraft`, with only a toast.
- **Dashboard Received** tab uses `readEchoDashboardInboxCardViewModel` for freshness badges (including **“New”** within 24h) and `showUnreadIndicator` when `isRead !== true`.

## Goals / Non-Goals

**Goals:**

- Persist refinement as **concatenation** of the user’s pre-apply observation text and a **single** standard delimiter block followed by AI text (`\n\n--- Refined Feedback ---\n` + AI body), per product wording.
- Show a **dedicated success screen** after submit with **Evaluation Submitted!** and **Return to Dashboard** (navigate to `/dashboard`).
- For **Received** submissions with **`isRead === true`**, suppress **unread dot** and **“New”** badge (freshness chip).

**Non-Goals:**

- Changing Firestore rules, callable audit plumbing, or thread messaging.
- Altering “Updated” / “In progress” badges except where they overlap **“New”** + read state (see Decisions).
- Internationalizing success copy in v1.

## Decisions

1. **Refinement base text**  
   - **Decision**: In `applyRefinementFromMcqAnswers`, compute the stored observation as **`trimmedRequestRawNotes + "\n\n--- Refined Feedback ---\n" + markdownBody`**, with optional dedupe if the field already ends with an identical refinement block (same `markdownBody`) to avoid double-append on retries.  
   - **Rationale**: Matches explicit product formula and eliminates dependence on a stale Firestore snapshot for the “original” portion.  
   - **Alternatives**: Always use Firestore `existingString` only (rejected: causes wipe when snapshot lags textarea); merge longest-of snapshot vs request (rejected: ambiguous).

2. **Timestamp line**  
   - **Decision**: Omit the separate ISO **timestamp line** between the delimiter and `markdownBody` unless an existing spec elsewhere requires it; product formula is delimiter + AI text only.  
   - **Alternatives**: Keep timestamp for auditability inside the paragraph (deferred).

3. **Submission success**  
   - **Decision**: Add route **`/evaluation/submitted`** under the authenticated evaluation layout (or wizard shell) rendering a minimalist full-page message; **`useEchoWizard`** (or the submit handler in the page) uses **`router.replace("/evaluation/submitted")`** on successful submit instead of resetting wizard in place. Success page offers **Return to Dashboard** → `router.push("/dashboard")`. New blank draft id is still written to `localStorage` on success **before** navigation so the next visit to `/evaluation` starts fresh.  
   - **Alternatives**: Query flag `?success=1` on `/evaluation` (rejected: easier to lose on refresh); modal only (rejected: user asked for screen).

4. **Read + “New” badge**  
   - **Decision**: In `readEchoDashboardInboxCardViewModel`, when **`variant === "feedback"`** and **`payload.isRead === true`**, force **`badge` to `null`** (suppress “New”, “Updated”, etc. for read-received items—simplest match to “remove New tag when read”). Unread dot remains controlled by existing `isRead` check in the list renderer.  
   - **Rationale**: Users associate “New” with unread; once read, drop freshness badge entirely for that card.  
   - **Alternatives**: Only suppress label “New” but keep “Updated” (possible follow-up if product complains).

## Risks / Trade-offs

- **[Risk]** Using request `rawNotes` as base may diverge from Firestore if another device edited the draft—**Mitigation**: acceptable for v1; autosave reduces drift.  
- **[Risk]** Removing all freshness badges when `isRead` on feedback tab hides “Updated” after read—**Mitigation**: document in Open Questions if product wants narrower behavior.

## Migration Plan

1. Ship API + client changes together.  
2. No data migration; existing documents unchanged until next refinement.  
3. Rollback: revert merge formula and navigation.

## Open Questions

- Should **“Updated”** still show on read received cards if `updatedAt` changes later (unlikely for evaluatee read-only path)?
