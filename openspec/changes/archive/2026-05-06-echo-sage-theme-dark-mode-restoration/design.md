## Context

ECHO historically shipped a **Sage-forward** accent (muted green) and a **Midnight** layer cake (deep navy canvas, `#131B2B` cards). Recent churn (Tailwind v4 `@theme`, token drift, ad hoc blues, inconsistent placement of `.dark`) caused defaults to revert toward **blue** primaries and **split theme roots**, breaking parity across portals surfaces & charts.

## Goals / Non-Goals

**Goals:**

- Restore **semantic Sage primary** tokens (**baseline `#889F88`**) driving Tailwind `primary*` usages consumers rely on (buttons, active tabs, new-eval CTA, links/rings where Sage intended).
- Introduce **`primary-strong`** / **`echo-refine-ai`** (name TBD) ≈ **darker Sage** for **Refine with AI** emphasis vs ordinary fills.
- Enforce `.dark` on **`document.documentElement` (`<html>`)** exclusively—persist preference safely **without** second conflicting mechanisms (`body` class hacks unless mirrored).
- Codify **global dark anchors**: body canvas **`#0B1120`**, foreground **`#F8FAFC`**, elevated cards **`#131B2B`**, card borders **`#1E293B`** via `@theme` + selector layering (`html.dark body`).
- Verify sticky sidebar / sticky dashboard chrome survives refactor (**visual QA**, snapshots optional later).
- Ensure Growth Analytics Radar/Trend grids readable (ties into stats chart spec tweaks).

**Non-Goals:**

- Redesign component architecture beyond token + toggle plumbing (no nav IA changes).
- Rebuild chart libraries beyond stroke/grid/color bindings.

## Decisions

1. **Token layering:** Prefer `@theme` custom props `--color-primary`, `--color-primary-foreground`, new **`--color-primary-strong`** (darker Sage) consumed through Tailwind utilities (`bg-primary`, `bg-primary-strong`). Keep Hex literals centralized once—avoid scattering `#889F88` across JSX unless unavoidable pending refactor sweep.

2. **Why `#889F88` baseline:** Matches stakeholder-provided Sage anchor while preserving WCAG-ish contrast on white/off-white text-on-primary pairs using computed `--color-primary-foreground` (likely near-white).

3. **Refine CTA contrast:** Map `EchoAceRefinementSection` / related buttons to **`bg-primary-strong`** with white/near-white label; fallback outline variant only if loader states demand.

4. **HTML root contract:** Theme bootstrap on load reads `localStorage` / `prefers-color-scheme`, applies **`classList.toggle('dark', prefersDark)`** on **`document.documentElement`**. Remove alternate `.dark` application on `<body>` if present (normalize).

5. **Surface enforcement:** besides tokens, use explicit `html.dark body { background-color: …; color: … }` guardrails so marketing vs app shells cannot diverge silently.

6. **Charts:** Recharts props pull from CSS vars e.g. `--color-echo-chart-grid` resolved light vs dark, fed into `stroke` attributes—avoid hard-coded `#ccc` tuned only for light mode.

## Risks / Trade-offs

- **[Risk] Tailwind arbitrary blues linger in JSX** → Mitigation: `rg "blue-" project-echo/src` sweep + CI grep optional later.
- **[Risk] Flash of wrong theme on SSR** → Mitigation: inline head script pattern already common—audit `layout.tsx` ordering.
- **[Risk] Strong Sage button fails contrast on tinted surfaces** → Mitigation: pair with forced `text-on-primary` token.

## Migration Plan

1. Land CSS tokens + html.dark script alignment.
2. Sweep components for `primary` consumers + explicit blues.
3. Chart stroke tokens + smoke Growth analytics dark.
4. `npm run lint` + `npm run build`.

## Open Questions

- Exact **dark Sage** hex for Refine CTA (proposal suggests ~12–18% darken vs baseline)—pick during implementation using design eyeball / contrast tool.
