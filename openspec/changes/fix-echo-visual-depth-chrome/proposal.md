## Why

Recent shell updates (full-viewport backgrounds, sticky dashboard chrome, sticky sidebar) reduced perceived depth: main content and elevated surfaces read as one flat plane. The dashboard sticky band uses an opaque workspace fill, which feels like a heavy block rather than floating chrome. Users also want consistent page framing (title + divider + horizontal rhythm) across Home, Stats, Profile, and Evaluation, reliable desktop sidebar height/sticky behavior, and clearer visual treatment for **missing** evaluation metadata so strings like “Unknown evaluator” read as intentional placeholders, not errors.

## What Changes

1. **Canvas vs. cards**  
   - **Light mode**: Main authenticated workspace SHALL read as a **very light gray/off-white** canvas (product target: **`bg-slate-50`** class or semantic token equivalent).  
   - **Midnight**: Main workspace SHALL read as **deep navy** (product target **`#0B1120`**, align with existing tokens where possible).  
   - **Cards** (inbox rows, form panels, profile blocks, and similar elevated surfaces): distinct **`rounded-xl`**, **border** (`slate-200` light / `slate-800` dark), **`shadow-sm`**, **white** surface in light mode and **dark slate panel** in Midnight (product target **`#131B2B`** via token or utility).

2. **Dashboard sticky header**  
   Combine **page title + inbox tabs** into **one** sticky region (`top-0`, high z-index), using **`backdrop-blur-md`** and **semi-transparent** surface (e.g. **`bg-white/80`** light / dark equivalent) so the header feels glass-like rather than a taped-on solid block.

3. **Primary pages shell**  
   Align **horizontal padding** (`px-6` or `px-8` consistently), **H1/title** presentation, and a **thin divider** below the title region across **Home, Stats, Profile, Evaluation** (wizard included where it exposes a page-level title).

4. **Sidebar & placeholders**  
   Desktop sidebar **`h-screen`** + **`sticky top-0`** (no vertical clipping on long pages). **Lucide** (or equivalent already in tree) icons beside **Profile** and sign-out affordance (“Logout” / “Sign out”). Missing-data strings (e.g. **Unknown evaluator**, collapsed reason empty states) styled **muted + italic** so they scan as placeholders.

## Capabilities

### New Capabilities

- `echo-main-canvas-elevated-cards`: Workspace canvas vs. elevated card surfaces in light and Midnight.
- `echo-dashboard-glass-sticky-header`: Single combined sticky, blurred dashboard title + inbox tabs.
- `echo-primary-pages-divider-shell`: Shared horizontal padding, H1, and divider across primary routes.
- `echo-sidebar-desktop-full-icons`: Desktop sidebar height/sticky parity and footer icon affordances.
- `echo-placeholder-muted-italic`: Presentation rules for missing evaluation metadata in dashboard/evaluation UI.

### Modified Capabilities

- _(none — no published baseline in `openspec/specs/` for these concerns.)_

## Impact

- **Code**: `project-echo` — `globals.css` / theme tokens, `EchoAppShell`, `main` wrappers, `EchoDashboardHomeClient`, shared header components, `EchoAppSidebar`, inbox/evaluation card components, `readEchoDashboardInboxCardViewModel` / snippet helpers as needed for semantic/CSS hooks.
- **Risk**: Medium — widespread visual tokens; regression-test Midnight + mobile bottom nav + sticky stacking (`z-index`).
