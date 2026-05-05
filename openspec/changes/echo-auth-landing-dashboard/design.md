## Context

**project-echo** is a Next.js 15 app with Firebase (client Firestore for drafts, Admin for refinement). Today, `/` and `/evaluation` are effectively anonymous; there is **no** Firebase Authentication gate or org session policy. Product needs a **landing** entry, **Google sign-in**, and a **dashboard shell** with inbox tabs, while complying with **IT.06.POL** (60-minute session timeout, logout, **clear local cache**).

**Constraints:** MedGrocer standards favor strict client/server separation, accessible UI, and security (no sensitive tokens client-side beyond Firebase SDK norms).

## Goals / Non-Goals

**Goals:**

- **Firebase Auth** with **Google provider**; single “Login with Google” / **Get Started** path from landing.
- **IT.06.POL**: After **60 minutes without user activity** (see Decisions), automatically **sign out**, **revoke client session state**, and **clear browser caches** scoped to the app (localStorage, sessionStorage, IndexedDB if used later) for keys under project control.
- **Responsive shell**: **Sidebar** (md+) with nav items **Home**, **Create Eval**, **My Stats**, **Profile**; **bottom nav** (&lt; md) with the same four items and icons.
- **Dashboard home** presents **three tabs**: **For my review**, **My feedback**, and **My evals** with list + empty states; data loads from **Firestore** `echoEvaluationDrafts` per Decisions below (no stub lists in production).
- **Auth-aware routing**: Unauthenticated users hitting protected routes → redirect to **landing** (or `/login` alias); authenticated users hitting **landing** → redirect to **dashboard** default.

**Non-Goals:**

- Full **RBAC**, org tenancy, or **server-side session store** (Redis) in this change—Firebase Auth + client policy timer only unless later spec demands.
- Deeper **inbox** features (notifications, server aggregates, multi-tenant admin) beyond **Firestore list queries** on **`echoEvaluationDrafts`** described in Decisions.
- **Email/password** or other IdPs beyond Google (unless product expands later).

## Decisions

1. **Session timeout semantics (IT.06.POL)**  
   - **Decision:** Treat “60-minute session timeout” as **idle timeout**: track **last user activity** (pointerdown, keydown, scroll, visibility visible + tick debounced). If **≥ 60 minutes** since last activity, run **forced logout pipeline** (see below).  
   - **Rationale:** Matches common “session idle” interpretation and reduces surprise logouts during active use.  
   - **Alternatives:** Absolute 60m from sign-in only (simpler but ignores active users)—**rejected** unless compliance mandates wall-clock only; if mandated, add **absolute** cap in addition to idle.

2. **Forced logout pipeline**  
   - **Decision:** Call `signOut(auth)`; then **`localStorage.clear()`** and **`sessionStorage.clear()`** *or* a curated clear list (preferred) to avoid nuking unrelated keys: at minimum remove **known ECHO keys** (e.g. wizard draft id key) and **Firebase Auth persistence** is handled by `signOut`. Document: if curated, maintain `readEchoClientStorageKeysToClearOnLogout()` utility.  
   - **Rationale:** IT.06.POL explicitly requires clearing **local cache**; curated clear is safer for dev tools coexisting in same origin.

3. **Where timer lives**  
   - **Decision:** **Client-only** React provider (`EchoSessionPolicyProvider`) mounted under authenticated layout; uses `useEffect` + listeners + `setInterval`/`requestAnimationFrame` debounce for idle check (e.g. evaluate every 60s).  
   - **Rationale:** Policy is UX/session scoped; no new API routes required for MVP.

4. **Routing structure (App Router)**  
   - **Decision:** Use route groups:  
     - `(marketing)/page.tsx` → **Landing** at `/`  
     - `(app)/dashboard/...` for authenticated shell: `/dashboard` (home + inbox tabs), `/dashboard/create` → evaluation wizard (or reuse `/evaluation` via redirect from **Create Eval**—implementation picks one canonical URL), `/dashboard/stats` → stats, `/dashboard/profile` → profile  
   - **Rationale:** Clear separation of layouts; marketing layout has no shell; app layout injects sidebar/bottom nav.  
   - **Alternative:** Single layout with conditional chrome—**rejected** to avoid accidental flash of nav on landing.

5. **Auth state**  
   - **Decision:** `onAuthStateChanged` + React Context; `loading` gate to avoid FOUC; **`useEchoAuth()`** hook returns `{ user, loading, signInWithGoogle, signOutUser }`.  
   - **Google:** `GoogleAuthProvider` + `signInWithPopup` (or `signInWithRedirect` if mobile popup blocked—**open question** for QA).

6. **Protecting routes**  
   - **Decision:** **Client guard** in `(app)` layout: if `!user && !loading`, `redirect` to `/`. Optionally add **middleware** later for cookie-based checks—**non-goal** for MVP if Firebase only exposes client session.  
   - **Trade-off:** Brief client-only window—acceptable for internal MVP per product.

7. **Dashboard inbox data (Firestore)**  
   - **Decision:** Use collection **`echoEvaluationDrafts`**. **For my review:** `where("evaluatorEmail", "==", authEmail)` and `status === "draft"` client-side. **My feedback:** `where("evaluateeEmail", "==", authEmail)` and `status === "submitted"`. **My evals:** same evaluator query with `status === "submitted"`. Prefer **single-field** equality queries to avoid composite indexes; filter `status` in the client.  
   - **Rationale:** Matches existing draft model; evaluatee-side queries already existed for stats.  
   - **Limitation:** Documents created before **`evaluatorEmail`** was persisted have an empty field and **won’t match** evaluator queries until the draft is saved again under a signed-in session.

8. **Wizard footer vs mobile bottom nav**  
   - **Decision:** `EchoBottomPinnedNavigationBar` uses **`fixed` positioning** with **`bottom: calc(5rem + env(safe-area-inset-bottom))`** below **`md`**, and **`bottom: 0`** from **`md`** up (bottom nav is hidden at `md+`). Wizard root content gains extra **`padding-bottom`** on small screens so scrollable content clears the raised footer.  
   - **Rationale:** Prevents the wide **Next** control from overlapping the **Create Eval** tab (and other bottom-nav targets).

## Risks / Trade-offs

- **[Risk] Session-only client guard** → Mitigation: document; add middleware in a follow-up if security review requires.  
- **[Risk] `localStorage.clear()`** breaks unrelated dev extensions → Mitigation: **curated key list** preferred.  
- **[Risk] Popup blockers on mobile** → Mitigation: switch to **redirect** flow for small viewports or on failure.  
- **[Risk] OneDrive / multi-tab** draft loss on logout → Mitigation: expected under policy; show **toast** before idle logout (“Session ending soon”) at **55m** optional enhancement in tasks.

## Migration Plan

1. Land auth + shell behind feature flag **or** direct cutover: replace anonymous `/` with landing; move evaluation under **Create Eval** link.  
2. Communicate **draft key clear** on logout to users (wizard draft may reset).  
3. Rollback: revert route group and restore previous `/` + `/evaluation` links.

## Open Questions

- Does **IT.06.POL** require **idle** vs **absolute** 60m (or both)? *Assume idle until compliance confirms.*  
- Canonical **Create Eval** URL: `/evaluation` vs `/dashboard/create`—tasks pick one and add redirects for bookmarks.  
- **Inbox** Firestore collections and indexes—**`echoEvaluationDrafts`** with `evaluateeEmail` and `evaluatorEmail` list access for the signed-in user; confirm **rules** allow these reads.
