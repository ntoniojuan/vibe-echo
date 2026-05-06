## Context

`project-echo` uses Tailwind v4-style tokens, shared layout shell (sidebar, sticky dashboard header), and a Midnight theme keyed off **`html.dark`**. Recent UI drift introduced low-contrast “ghost” primaries, mismatched Sage hex values versus branding, and header/sidebar surfaces that conflict with the intended navy + sage system. This change is frontend-only and consolidates on **explicit hex** targets supplied by product.

## Goals / Non-Goals

**Goals:**

- Centralize MedGrocer Sage as **`#4A634A`** (primary fill/active), **`#D1DCD1`** (secondary/hover band), and **`#FFFFFF`** on filled sage surfaces—including **OPEN**, active inbox tabs, and other primary CTAs.
- Fix Midnight so the main canvas uses **`#0B1120`**, elevated cards **`#1E293B`**, and body/list primary copy **`text-slate-100`** under `html.dark`.
- Ensure the theme switch **only** toggles `document.documentElement.classList` (`dark` on `<html>`), with hydration reading the same source of truth.
- Make the sticky dashboard header **glass**: transparent/semi-transparent with **backdrop blur**, not opaque beige or green slabs.
- Keep the **desktop sidebar deep navy in Light mode** as well as Midnight for consistent branding.

**Non-Goals:**

- Redesigning information architecture, copy, or component structure beyond tokens/chrome needed for the reset.
- Changing marketing/landing pages unless they incorrectly reuse authenticated shell tokens.
- Introducing a new design system package or third-party theme runtime.

## Decisions

| Decision | Rationale | Alternatives considered |
|----------|-----------|-------------------------|
| Prefer Tailwind arbitrary values (`bg-[#4A634A]`, `dark:bg-[#0B1120]`, `dark:bg-[#1E293B]`, `dark:text-slate-100`) co-located with shared layout | Matches the user’s strict hex contract and avoids ambiguous `DEFAULT` palette drift | CSS variables in `:root` / `html.dark`—good later refactor, but broader churn now |
| Theme state → `<html class="dark">` only | Matches existing `echo-theme-dark-html-root` and fixes split wrappers | `classList` on `body`—rejected (breaks `dark:` variant expectations) |
| Sidebar navy in Light mode via explicit `bg-[#0B1120]` (or shared token) on the sidebar shell, not `dark:` alone | Requirement is **light-mode** branding, not Midnight-only | Light gray sidebar—rejected per branding |
| Header glass via `backdrop-blur-*` + transparent/`bg-*` with opacity (Light and Midnight variants) | Satisfies sticky readability without opaque tint blocks | Fully transparent without blur—rejected (hurts legibility) |

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Hard-coded hex duplicates across files | Introduce a minimal shared constants module or single `@theme` / CSS layer in a follow-up if duplication exceeds 2–3 call sites |
| `#D1DCD1` hover on filled buttons may need dark label color | Validate contrast; if hover swaps to light surface, use `text-slate-900` (or similar) only on hover state for that variant |
| Third-party components with internal `primary` color | Audit shadcn/Radix wrappers; override with explicit classes where needed |

## Migration Plan

1. Land token updates behind normal PR; no data migration.
2. Manual QA: Light + Midnight, dashboard scroll under sticky header, sidebar + mobile nav, inbox OPEN + tabs, wizard primary buttons.
3. Rollback: revert PR; no feature flags required.

## Open Questions

- None blocking implementation; confirm with design if any **secondary** buttons should also adopt `#4A634A` outline vs fill (default: outline may stay neutral as long as **primary** CTAs match the strict sage stack).
