## Context

Project ECHO (`project-echo`) uses `next-themes` via `EchoThemeProvider` with `attribute="class"` so Midnight mode applies `class="dark"` on `<html>`. Semantic colors are driven by CSS variables in `globals.css` (`.dark` overrides `--color-background`, `--color-echo-workspace`, etc.). The authenticated shell (`EchoAppShell`) paints `bg-echo-workspace` on an inner flex wrapper, but **`layout.tsx` does not set a background on `<html>` or `<body>`**, so any unscrolled margin, overscroll, or non-shell views can expose the browser default canvas and make dark mode feel “card-only.” Headers today are implemented independently: Dashboard uses `text-2xl sm:text-3xl` with an avatar column; Stats uses a larger title (`text-3xl md:text-4xl`) and an eyebrow; Profile mirrors Dashboard-ish scale with trailing controls; Evaluation wizard uses bordered headers on selected steps. Desktop sidebar footer already imports Lucide `User` and `LogOut`; the design still needs a **normative pattern** so regressions do not drop icons or mismatch strokes relative to primary links.

## Goals / Non-Goals

**Goals:**

- Document root and body always reflect the active theme’s workspace/background tokens (including Midnight deep navy / charcoal).
- One reusable header contract for Home, Stats, Profile, and Evaluation title regions: padding, alignment, title scale, optional eyebrow and subtitle, optional trailing actions.
- Sidebar Profile and Logout rows visually match primary nav rows (icon + label + spacing).

**Non-Goals:**

- Redesigning marketing landing aesthetics beyond ensuring root background does not flash the wrong canvas.
- Changing evaluation wizard step flow, ACE layout, or bottom pinned navigation behavior.
- Adding Logout to mobile bottom navigation (not requested).

## Decisions

1. **Document surface via tokens, not hard-coded hex in JSX**  
   **Choice**: Set `background-color` on `html` and `body` using existing CSS variables (`--color-background` or `--color-echo-workspace`) so light/dark stay in sync with `globals.css`. Optionally align `.dark` token values with the target deep navy (e.g. `#0B1120`) **in one place** (`globals.css` `@theme` / `.dark` block) rather than scattering `bg-[#0B1120]` in components.  
   **Alternatives**: Tailwind arbitrary `bg-[#0B1120]` on `<body>` only — rejected because it duplicates tokens and drifts from `--color-echo-workspace`.  
   **Rationale**: Single source of truth; matches MedGrocer guideline to keep theme on design tokens.

2. **`EchoAppShell` inner background**  
   **Choice**: Keep `bg-echo-workspace` on the shell or rely on body once body matches — prefer **body + html** carry `bg-background` (semantic page canvas) and shell can remain consistent or become redundant for the main column; avoid double-stacking conflicting colors.  
   **Alternatives**: Remove shell background entirely — rejected if sidebars/wizards rely on explicit workspace striping; prefer verifying visually then simplifying if redundant.

3. **Header consistency via shared component**  
   **Choice**: Add a small client or server-neutral presentational component (e.g. `EchoAppPageHeader`) with props: optional `eyebrow`, required `title`, optional `description`, optional `trailing` ReactNode. Fixed typography classes inside the component (one title size for app pages, one subtitle size). Consumers pass page-specific trailing actions (Dashboard avatar row, Profile theme/about toggles). Evaluation wizard maps step label into `eyebrow` / `title` / `description` for steps that currently render the bordered header.  
   **Alternatives**: Document-only “copy these classes” — rejected; too easy to drift.  
   **Rationale**: Enforces one export per file project rule if placed in its own file; helpers stay out of consumer components.

4. **Sidebar icons**  
   **Choice**: Standardize on Lucide icons with `h-5 w-5`, `strokeWidth={1.75}`, `gap-3`, same inactive/active classes as primary links. If code already matches, tighten typings/layout only; add regression coverage via visual QA checklist in tasks.  
   **Alternatives**: Inline SVGs like Home/Stats — rejected to avoid three icon styles; migrate primary icons to Lucide later if desired (non-goal for this change).

## Risks / Trade-offs

- **[Risk] Marketing `/` layout relies on its own gradients** → **Mitigation**: Scoped backgrounds on marketing wrappers remain; document-level bg should be a neutral token that does not fight full-bleed gradients (verify hero still covers viewport).
- **[Risk] Double padding** if both page wrappers and header component apply `px-4` → **Mitigation**: Either header is width-full inside existing padded shell only, or header owns horizontal padding and parents drop duplicate padding — pick one in implementation.
- **[Risk] Wizard ACE steps omit top header by design** → **Mitigation**: Spec scopes header consistency to wizard steps that already render the step header (steps 1 and 5 per current code), not ACE middle steps unless product asks.

## Migration Plan

1. Ship CSS/token + layout body/html updates first (visual smoke in light/dark).
2. Introduce `EchoAppPageHeader` and migrate four surfaces incrementally (Dashboard, Stats, Profile, Wizard).
3. Sidebar footer pass for icon/class parity.
4. Manual QA: scroll bounce, `/dashboard`, `/evaluatee/stats`, `/dashboard/profile`, `/evaluation`, auth loading states.

**Rollback**: Revert commits in reverse order; low coupling.

## Open Questions

- Whether Dashboard’s right-side avatar belongs in the shared header `trailing` slot permanently or only until a global user menu exists (default: keep as trailing slot content).
