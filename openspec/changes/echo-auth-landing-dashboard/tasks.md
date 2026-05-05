## 1. Auth foundation

- [x] 1.1 Add `EchoAuthProvider` (client) with Firebase `onAuthStateChanged`, `GoogleAuthProvider`, `signInWithPopup` / fallback `signInWithRedirect` on failure
- [x] 1.2 Export `useEchoAuth()` from `src/contexts/echoAuthContext.tsx` (or single provider file per one-export rule)
- [x] 1.3 Wire provider in `src/app/layout.tsx` (or marketing vs app split once route groups exist)

## 2. IT.06.POL idle session (60 minutes)

- [x] 2.1 Implement `EchoSessionPolicyProvider` (or hook) tracking last activity via debounced listeners (`pointerdown`, `keydown`, `scroll`, `visibilitychange`)
- [x] 2.2 On idle ≥ 60 minutes: call `signOut`, run `readEchoClientStorageKeysToClearOnLogout()` (curated) or documented clear strategy; redirect to `/`
- [x] 2.3 (Optional) Warn at ~55 minutes with toast (“Session expires soon”) if product approves

## 3. Routing & layouts

- [x] 3.1 Create route group `(marketing)` with `/` landing: warm cream background, sage primary **Get Started** → sign-in
- [x] 3.2 Create route group `(app)` with authenticated layout: redirect unauthenticated users to `/`
- [x] 3.3 Redirect authenticated users from `/` to `/dashboard` (or default app home)

## 4. Responsive shell

- [x] 4.1 Build `EchoAppSidebar` (md+) with icons + labels: Home, Create Eval, My Stats, Profile
- [x] 4.2 Build `EchoAppBottomNav` (< md) with same four items; safe-area padding
- [x] 4.3 Apply shell in `(app)/layout.tsx`; highlight active segment

## 5. Dashboard pages & inbox

- [x] 5.1 Add `/dashboard` home with **three** tabbed sections — **For my review**, **My feedback**, **My evals** (client tab state)
- [x] 5.2 Load inbox lists from **Firestore** `echoEvaluationDrafts` with **`readEchoEvaluationDraftRecordsWhereEvaluatorEmail`** / **`readEchoEvaluationDraftRecordsWhereEvaluateeEmail`** (retry + client `status` filters); card copy via **`readEchoDashboardInboxCardFromRecord`**; empty/loading/error states
- [x] 5.3 Persist **`evaluatorEmail`** on draft merge (**`updateEchoEvaluationDraft`**) from **`useEchoWizard`** on save/submit; map field on read for inbox queries
- [x] 5.4 **Continue in editor:** set **`echo-evaluation-draft-id`** in `localStorage` and navigate to **`/evaluation`** for review-tab drafts
- [x] 5.5 Point **Create Eval** to canonical wizard URL (`/evaluation` or `/dashboard/create`) and add redirect if keeping legacy path
- [x] 5.6 Point **My Stats** to existing `/evaluatee/stats` (or move under `/dashboard/stats`)
- [x] 5.7 Add **Profile** page with user display name/email and **Sign out**
- [x] 5.8 **Mobile:** Offset wizard **`EchoBottomPinnedNavigationBar`** above **`EchoAppBottomNav`** (`bottom` calc + safe area; `md:bottom-0`) and increase wizard **`padding-bottom`** so content is not obscured

## 6. Cleanup & QA

- [x] 6.1 Update `project-echo` home: remove/replace old anonymous links so marketing landing is sole entry
- [x] 6.2 Document new env vars if any (e.g. auth domain) in `.env.local.example` only if missing
- [x] 6.3 Run `npm run lint` and `npm run build`; manual test: login, idle policy (temporarily lower timeout in dev), mobile nav, **all three** inbox tabs, **Create Eval** tap target clear of wizard footer on phone
