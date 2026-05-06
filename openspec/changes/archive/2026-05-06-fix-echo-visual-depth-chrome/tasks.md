## 1. Theme tokens (canvas + elevated cards)

- [x] 1.1 In `globals.css` (`@theme` + `.dark`), add semantic tokens for **main canvas** (Light ≈ slate-50) and **elevated card** (Midnight ≈ `#131B2B`), and align dark **workspace/background** navy with `#0B1120` where drift exists.
- [x] 1.2 Apply canvas token to `EchoAppShell` `main` column (or single inner wrapper); remove conflicting redundant backgrounds that flatten depth.

## 2. Card rollout

- [x] 2.1 Update `EchoDashboardInboxCard` / inbox list containers so each evaluation row matches **rounded-xl**, **border** (`slate-200` / `dark:border-slate-800`), **`shadow-sm`**, **white** / **elevated dark** surfaces.
- [x] 2.2 Apply the same elevated pattern to Profile primary panel and high-level Evaluation wizard form sections (general info + ACE summaries as feasible without oversized diff).

## 3. Dashboard glass sticky header

- [x] 3.1 Refactor `EchoDashboardHomeClient` so title + tabs share **one** sticky wrapper: **`sticky top-0 z-40`**, **`backdrop-blur-md`**, translucent bg Light (`bg-white/80` class semantics) + Midnight tint; drop opaque **`bg-echo-workspace`** tape aesthetic from this strip.
- [x] 3.2 Verify tab keyboard/focus and unread dot remain visible on blurred backgrounds.

## 4. Primary pages shell (divider + padding)

- [x] 4.1 Extend `EchoAppPageHeader` (or thin wrapper) with optional **bottom divider** + standardized outer horizontal padding (`px-6` or `px-8`) consumed by Dashboard (non-sticky inner spacing may defer to sticky outer—avoid double padding).
- [x] 4.2 Align Stats (`EvaluateeStatsDashboard` / shell parent), Profile (`EchoProfilePageClient`), and Evaluation wizard intros to the same padding + divider pattern.

## 5. Sidebar

- [x] 5.1 Re-verify `EchoAppSidebar` **`md:h-screen md:sticky md:top-0`** + internal scroll; adjust if regression from canvas changes.
- [x] 5.2 Ensure Profile + Logout (and Profile page **Sign out** if separate) show Lucide icons with minimalist sizing.

## 6. Placeholder copy styling

- [x] 6.1 Apply muted italic presentation to “Unknown evaluator” / anonymous flows in `readEchoDashboardInboxCardViewModel` consumers or card typography for `fromLine` / snippets as appropriate.
- [x] 6.2 Style empty reason snippet fallback (`readCollapsedEvaluationReasonSnippet` usage) with muted italic.

## 7. Verification

- [x] 7.1 Smoke Dashboard, Stats, Profile, Evaluation in **Light** and **Midnight**; confirm depth, glass header, sticky sidebar, mobile bottom nav unobstructed.
