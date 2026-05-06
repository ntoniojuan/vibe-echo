## Context

ECHO uses Tailwind v4 with semantic CSS variables (`--color-background`, `--color-echo-workspace`, `--color-echo-card`, etc.) and `EchoAppShell` wrapping authenticated routes. Sticky dashboard chrome currently relies on opaque **`bg-echo-workspace`**. Cards mix `bg-echo-card`, `surface-container-*`, and bespoke borders. Sidebar already uses Lucide on Profile/Logout in desktop footer; shell previously tuned **`sticky`** / **`min-h-screen`**.

## Goals / Non-Goals

**Goals:**

- Restore **clear foreground/background separation**: tinted canvas + elevated cards with border + **`shadow-sm`**.
- Replace opaque sticky dashboard strip with **glass** (**`backdrop-blur-md`** + translucent bg + sensible dark-mode counterpart).
- **One** implementation path for primary page top spacing: title, divider, **`px-6`/`px-8`** alignment across Dashboard, Stats, Profile, Evaluation wizard intros.
- Desktop sidebar **`h-screen`** **`sticky top-0`** without clipping; footer icons remain minimal.
- Missing-data copy uses **italic** + **muted** tone.

**Non-Goals:**

- Redesigning marketing landing (`/`).
- Changing Firestore schemas or evaluation scoring.
- Replacing bottom navigation on mobile.

## Decisions

1. **Token-first for hex targets**  
   **Choice**: Add or map **`--color-echo-main-canvas`** (light: slate-50 family) and **`--color-echo-elevated-card`** (Midnight: `#131B2B`) in `globals.css` `@theme` / `.dark`, then expose Tailwind utilities (`bg-echo-main-canvas`, `bg-echo-elevated-card`) rather than scattering **`bg-[#…]`** in dozens of components. Deep navy **`#0B1120`** aligns with existing dark **`--color-background`** where already equal.  
   **Alternatives**: Only arbitrary utilities — rejected (drift + harder theming).

2. **Where canvas applies**  
   **Choice**: Paint **`EchoAppShell`** `main` (or inner column) with canvas token; cards override with elevated token. Marketing routes unaffected.

3. **Glass sticky header**  
   **Choice**: Single wrapper component or consolidated JSX combining **`EchoAppPageHeader`** + tabs; classes like **`sticky top-0 z-40 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 bg-white/75 dark:bg-[#0B1120]/70`** (exact mix tuned in implementation). Avoid stacking duplicate **`bg-echo-workspace`** underneath that fights blur.

4. **Divider + H1**  
   **Choice**: Extend **`EchoAppPageHeader`** (or wrap it) with optional **`showDivider`** and standardized outer **`px-8`** on app pages via shell/layout—not per-page drift.

5. **Placeholder styling**  
   **Choice**: Prefer wrapping absent-value spans with **`text-on-surface-variant italic`** (or dedicated **`echo-placeholder-muted`** class) at presentation boundaries (`EchoDashboardInboxCard`, snippet helpers), not changing core copy strings unless needed for accessibility.

## Risks / Trade-offs

- **[Risk]** Glass header reduces contrast → **Mitigation**: Keep **`border-b`** + blur modest; verify WCAG-ish contrast on title/tab text.  
- **[Risk]** Double backgrounds (`main` + page wrappers) → **Mitigation**: Remove redundant **`bg-*`** on scroll containers after canvas migration.

## Migration Plan

1. Tokens + shell `main` canvas.  
2. Card utility/class rollout on inbox + profile + key wizard sections.  
3. Dashboard glass sticky refactor.  
4. **`EchoAppPageHeader`** divider + padding cascade to Stats/Profile/Wizard.  
5. Sidebar pass + placeholder CSS.

## Open Questions

- Whether Stats/Profile already match **`max-w`** constraints — keep existing content widths but align **horizontal gutter** only unless product asks full-bleed changes.
