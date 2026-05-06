## Why

In Midnight (dark) mode, the main viewport can still read as a light “page” because the document root (`html` / `body`) does not carry the same deep workspace surface as inner shells and cards, so only elevated surfaces appear to change. Page titles and hero headers also differ in typography, spacing, and layout between Home, Stats, Profile, and Evaluation, which breaks visual rhythm across the authenticated app.

## What Changes

- Apply a **document-level workspace background** when `.dark` is active so the full viewport matches the intended deep navy / charcoal canvas (aligned with design tokens such as `#0B1120` or existing `--color-background` / `--color-echo-workspace` in dark mode), not only cards and inner wrappers.
- Introduce or reuse a **single header pattern** (shared component or strict layout contract) for **Home** (`EchoDashboardHomeClient`), **Stats** (`EvaluateeStatsDashboard`), **Profile** (`EchoProfilePageClient`), and **Evaluation** (`EchoWizard` step headers): consistent horizontal padding, title size, subtitle treatment, and alignment rules (including how optional trailing actions like theme toggle align).
- **Sidebar footer**: Ensure **Profile** and **Logout** rows include **leading icons** with the same visual language as primary sidebar links (size, stroke, spacing); audit mobile/chrome so cues are not desktop-only if gaps exist.

## Capabilities

### New Capabilities

- `echo-midnight-document-surface`: Defines how `html` / `body` (and any global min-height fill) adopt the dark workspace background when the `dark` class is present so there are no unstretched light seams.
- `echo-app-page-headers`: Defines the shared header structure, typography scale, spacing, and optional action slot for Home, Stats, Profile, and Evaluation pages.
- `echo-sidebar-profile-logout-icons`: Defines sidebar footer affordances for Profile and Logout with icons consistent with primary navigation rows.

### Modified Capabilities

- _(none — `openspec/specs/` has no baseline specs to delta.)_

## Impact

- **Code**: `project-echo` — `src/app/layout.tsx`, `src/app/globals.css` (and/or Tailwind theme tokens), `EchoAppShell.tsx`, dashboard/stats/profile/evaluation header markup, `EchoAppSidebar.tsx` (footer rows).
- **Dependencies**: None beyond existing theme (`EchoThemeProvider` / `next-themes`) and UI stack.
- **Risk**: Low — visual/layout only; verify marketing routes and loading states still look correct in both themes.
