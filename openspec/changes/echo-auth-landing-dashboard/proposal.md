## Why

Project ECHO needs a clear entry experience and a signed-in workspace: visitors should see a branded **landing page**, and authenticated users should use a **responsive dashboard** with predictable navigation and evaluation workflows. **Firebase Auth (Google)** aligns with existing Firebase usage, and **IT.06.POL** requires a **60-minute session timeout** with logout and **local cache cleared** so sessions do not linger beyond policy.

## What Changes

- Add **Firebase Auth** with **“Login with Google”** on the landing experience; persist session per Firebase rules.
- Enforce **IT.06.POL**: **60-minute session timeout** (idle and/or absolute wall-clock as specified in design); on timeout or explicit sign-out, **log out** and **clear client-side cache** relevant to the user session (localStorage/sessionStorage and any app-held auth or draft keys as defined in design).
- **Landing page** (unauthenticated): **warm cream** background, **sage green** primary **“Get Started”** (or equivalent) leading to sign-in; authenticated users **do not** see this as home—they are **redirected to the dashboard**.
- **Dashboard layout**: **Desktop** — **sidebar** with icons/labels for **Home**, **Create Eval**, **My Stats**, **Profile**. **Mobile** — **bottom navigation** with the same four destinations.
- **Inbox-style content**: **three tabs** on dashboard home — **“For my review”** (draft evaluations where the current user is the **evaluator** and must finish writing), **“My feedback”** (**submitted** evaluations where the user is the **evaluatee**), and **“My evals”** (**submitted** evaluations the user authored as evaluator). Lists load **live from Firestore** (`echoEvaluationDrafts`) using **`evaluatorEmail`** and **`evaluateeEmail`** queries (see design). Legacy documents missing **`evaluatorEmail`** will not appear under evaluator-scoped tabs until saved again while signed in.
- **Evaluator identity on drafts**: Each autosave/submit from the wizard persists **`evaluatorEmail`** (trimmed Firebase Auth email) on the draft document so **For my review** / **My evals** queries can resolve without guessing from document IDs.
- **Mobile evaluation UX**: The wizard **Back / Next** footer sits **above** the bottom tab bar on small viewports (offset matches shell bottom padding + safe area) so **Create Eval** and other nav items remain tappable and do not sit under the wizard controls.
- **Routing guard**: If **no user** is logged in, show landing (and sign-in); if **logged in**, default route is **dashboard** (not landing).

## Capabilities

### New Capabilities

- `echo-google-auth-session`: Firebase **Google** sign-in/out; **IT.06.POL 60-minute** session termination; on logout/timeout **clear local client cache** as defined; integration with Next.js app routing for protected vs public routes.
- `echo-marketing-landing`: Unauthenticated **landing** UI—**warm cream** surface, **sage** CTA, **Get Started** → auth; redirect authenticated users to dashboard.
- `echo-app-shell`: **Responsive** app chrome—**sidebar** (desktop) and **bottom nav** (mobile) for **Home**, **Create Eval**, **My Stats**, **Profile**; accessible labels and consistent with Project ECHO visual language.
- `echo-evaluation-inbox`: Dashboard **tabbed** inbox—**For my review**, **My feedback**, and **My evals**; list/empty/error states; **Firestore-backed** reads on `echoEvaluationDrafts` with evaluator/evaluatee email filters; **Continue in editor** resumes a draft via `localStorage` draft id + `/evaluation`.

### Modified Capabilities

- *(none)* — existing `echo-ai-refinement` API behavior is unchanged; only entry routes and shell wrapping may shift.

## Impact

- **project-echo**: New/updated pages and layouts (`app/` routes), Auth provider/context, session timer hook, Firebase Auth client config (reuse `NEXT_PUBLIC_FIREBASE_*`), possible middleware or client guards, styling (Tailwind / tokens). May relocate current **home** vs **evaluation** under dashboard **Create Eval**. Draft writes include **`evaluatorEmail`** for inbox/query consistency.
- **Dependencies**: `firebase` auth APIs already present; no new package required unless design adds helper.
- **Compliance**: **IT.06.POL** must be traceable in design/spec (60 min, logout, cache clear).
- **Breaking (UX):** Default post-login URL and root `/` behavior change from anonymous-first to **auth-aware routing**.
