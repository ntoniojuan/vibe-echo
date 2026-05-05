## Context

- **Landing** is a client page with a card: logo row shows “Project ECHO”, **`h1` is currently “Welcome back”** — branding change should make the **program name** the unmistakable hero while keeping sign-in flow intact.
- **Desktop shell** uses **`EchoAppSidebar`** (hidden on small viewports); **mobile** uses **`EchoAppBottomNav`** + **Profile** route (`EchoProfilePageClient`). There is **no** separate global header bar — About sits in the **sidebar header** next to the logo cluster.
- **Dark mode** (`.dark`) already affects sidebar tokens; new copy should use **`text-echo-sidebar-muted`** / similar for attribution.

## Goals / Non-Goals

**Goals:**

- **Hero**: Subtitle font **lighter** than main title (e.g. `font-normal` or `font-medium` vs `font-bold`).
- **Footer line**: **Small** (`text-[10px]`–`text-xs`), **muted**, does not compete with nav actions.
- **About**: **Lucide** `Info` or equivalent; **Popover** (click) + **hover** reveal on desktop if implementable without breaking a11y; minimum **click + keyboard** opens/closes layered content. Prefer **popover** over `title=""`-only for rich multi-line content.
- **Single source of truth** for long strings optional small `readEchoBrand*` or `echoBrandCopy.ts` — only if duplicated ≥ 2 places; else keep colocated until duplication hurts.

**Non-Goals:**

- i18n / CMS-driven copy.
- Changing ACE domain definitions beyond provided marketing text.

## Decisions

1. **Landing hierarchy** — **`h1` = “Project ECHO”** (or visually dominant equivalent with one `h1` per page); **“Welcome back”** becomes **`h2`** or paragraph lead to preserve accessibility (one main `h1`).
2. **About implementation** — Native **`<button type="button">`** + **absolute/fixed popover** panel with `role="dialog"` or **`role="tooltip"`** + `aria-describedby` — if using dialog pattern, use `aria-modal="true"` and focus return. Simpler: **popover** div anchored under button, **click outside** to close.
3. **Mobile About** — Sidebar hidden: **repeat Info control** in Profile near title **or** only on desktop — user asked sidebar logo; **requirement**: mobile users get About via **Profile** row (add compact “About ECHO” / info icon there).

   **Decision**: **Desktop**: info next to sidebar logo. **Mobile**: info + same popover on **Profile** page header row (alongside theme toggle) so feature is not lost.

4. **Year** — Use **2026** in footer per product request; consider `new Date().getFullYear()` in implementation tasks if product prefers rolling year (spec can stay 2026).

## Risks / Trade-offs

- **[Risk]** Popover clipped by `overflow-hidden` on sidebar — **[Mitigation]** use **portal** to `document.body` or ensure popover positions with fixed strategy.
- **[Risk]** Hover-only on touch — **[Mitigation]** click-first; hover as enhancement.

## Migration Plan

- Deploy with copy-only + UI; no data migration.

## Open Questions

- Should **marketing landing** show About **info** as well, or **app shell only**? (Default: **shell + profile**; landing optional — **out of scope** unless tasks add.)
