## 1. Refinement append (server)

- [x] 1.1 Update `applyRefinementFromMcqAnswers` to build the saved observation as **`trimmedRequestRawNotes + "\n\n--- Refined Feedback ---\n" + markdownBody`** (remove the intermediate ISO timestamp line unless product restores it elsewhere).
- [x] 1.2 Add a **idempotent** guard: if the observation already ends with the same refinement body (same `markdownBody`), avoid appending twice on retries (optional but recommended in design).
- [x] 1.3 `npm run lint` && `npm run build` for `project-echo`; spot-check apply API returns `fullObservationValue` consistent with stored text.

## 2. Submission success (wizard)

- [x] 2.1 Add route **`/evaluation/submitted`** (or agreed path) with minimalist layout: **Evaluation Submitted!** and primary **Return to Dashboard** → `/dashboard`.
- [x] 2.2 On successful submit in `useEchoWizard` (or evaluation page), **replace in-place reset** with **`router.replace("/evaluation/submitted")`** after persisting new draft id to `localStorage` (next visit to `/evaluation` still starts a blank draft per design).
- [x] 2.3 Verify unauthenticated users cannot view success page (reuse existing `(app)` guards).

## 3. Dashboard Received read chrome

- [x] 3.1 In `readEchoDashboardInboxCardViewModel`, when **`variant === "feedback"`** and **`payload.isRead === true`**, set **`badgeLabel` / `badgeClassName` to null** so **“New”** (and other freshness chips for that path) do not show.
- [x] 3.2 Confirm **`showUnreadIndicator`** in `EchoDashboardHomeClient` stays false when `isRead === true` (dot removed).

## 4. Verification

- [ ] 4.1 Manual: refine with text only in textarea (no prior save); confirm Firestore retains original + delimiter + AI block.
- [ ] 4.2 Manual: submit evaluation → success screen → dashboard; start new evaluation from `/evaluation` shows fresh wizard.
- [ ] 4.3 Manual: mark received eval read → **Received** card loses dot and **New** tag.
