## Context

- **Refinement** lives in `EchoAceRefinementSection`: phases `idle` → **`generating`** (POST `/api/echo/refinement/mcqs`) → `quiz` → `applying`. User story targets **`generating` → `quiz`** visibility transition.
- **Branding**: Navy + sage already exist as tokens (`--color-on-surface`, `--color-primary` / `--color-primary-container`). **Dark mode** must remain legible: navy literal may read as low-contrast on dark — use **semantic token** for “ECHO” text with a **light-theme navy skew** and **dark-theme** override (e.g. off-white or high-contrast surface text).
- **Ripple**: Prefer **two** concentric ring elements (or pseudo-elements) with **`animation-delay`** stagger; infinite loop while visible; **GPU-friendly** `transform` + `opacity`.

## Goals / Non-Goals

**Goals:**

- **Framer Motion**: `AnimatePresence` + `motion.div` (or `motion.section`) with **`opacity`** (and optional **`y`**) **fade in/out**; duration ~**0.25–0.4s**, **`easeOut`** / standard product curve.
- **Status rotation**: **Cycle** the three strings in order, **loop** while `generating`; interval ~**2.0–2.75s** per message (implementation choice); **no** rapid flicker.
- **Accessibility**: Loader region **`aria-busy="true"`** while active; **`aria-live="polite"`** on status line so screen readers hear updates (throttle if too noisy — **polite** + interval is acceptable).
- **Layout**: Centered block; does **not** block entire wizard viewport unless product prefers overlay — **default**: **inline** centered panel within refinement card (same card boundaries) to avoid obscuring legal/consent context; **design allows** semi-opaque **backdrop** only if it does not trap focus incorrectly.

**Non-Goals:**

- Replacing button disabled states elsewhere.
- Server-side streaming progress.
- Custom Lottie / video assets.

## Decisions

1. **Scope** — Loader shows for **`phase === "generating"`** only unless PM extends to **`applying`** (same component, different prop or shared `isVisible`).
2. **Framer tree** — **`AnimatePresence mode="wait"`** optional; simplest: single child keyed by `generating`.
3. **Ripple implementation** — **`@layer` CSS** in `globals.css` under class **`.echo-refinement-loader-ripple`** or **CSS module** colocated with component—prefer **scoped class** to minimize global keyframe collision.
4. **Sage rings** — Stroke / border color from **`var(--color-primary)`** or **`var(--color-primary-container)`** at ~**40–60%** opacity rising then fading with scale.

## Risks / Trade-offs

- **`framer-motion` + React 19** — verify compatible version in tasks; pin semver.
- **aria-live spam** — rotation every 2s may be verbose; optional **`aria-atomic`** and single polite region.

## Migration Plan

1. Add dependency, ship component, enable for `generating` only.
2. Rollback: remove motion wrapper and dependency if blocked.

## Open Questions

- Should **`applying`** phase reuse the **same** loader (Gemini **apply** route)? Default **out of scope** for v1.
