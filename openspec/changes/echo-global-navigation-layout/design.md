## Context

`project-echo` uses a multi-step ACE wizard with a right-hand teammate history sidebar, a mobile bottom navigation bar with text labels, a desktop sidebar for Profile/Logout, a marketing home header with placeholder chrome, and dashboard inbox cards with ACE “pill” chips and a separate action row.

## Goals / Non-Goals

**Goals:**

- Keep the teammate sidebar **visible** while users scroll long ACE pages using **sticky** positioning aligned to the top of the viewport.
- On **mobile**, show **Lucide icons** on the bottom bar (Home, Plus, BarChart, User) with proper **accessibility**.
- On **desktop**, add **icons** beside Profile and Logout in the app shell.
- **Remove** non-functional **bell** and **help** controls from the **home / marketing** header.
- **Compact** dashboard inbox cards by placing the **Open** / **Continue** control **inline** with the ACE pillar row.

**Non-Goals:**

- Implementing real notifications or in-app help content (removed placeholders only).
- Redesigning the entire design system or color tokens.
- Changing Firestore or API behavior.

## Decisions

1. **Sticky sidebar**  
   - **Decision:** Apply `position: sticky; top: 0` (Tailwind: `sticky top-0`) to the sidebar column wrapper on ACE steps, with `self-start` and an appropriate `max-h` / `overflow-y-auto` if content can exceed viewport so the sidebar itself scrolls independently when needed.  
   - **Alternatives:** `fixed` + manual offset (more brittle with varying header heights).

2. **Icons library**  
   - **Decision:** Add **`lucide-react`** and import **named icons only** (tree-shaking): e.g. `Home`, `Plus`, `BarChart3` or `BarChart` per product choice, `User`; map **BarChart** to stats/analytics route as today’s middle tab implies.  
   - **Alternatives:** Inline SVGs (more maintenance); another icon pack.

3. **Mobile touch targets**  
   - **Decision:** Keep **min 44×44px** tap areas for bottom nav items with `aria-label` matching prior intent.  
   - **Rationale:** WCAG-aligned mobile usability.

4. **Dashboard card layout**  
   - **Decision:** Use a **flex row** wrapping pills and trailing primary button (`justify-between` / `items-center` on larger widths), collapsing gracefully on narrow widths.  
   - **Alternatives:** Icon-only open button (smaller but less clear).

5. **Home header**  
   - **Decision:** **Delete** placeholder buttons entirely rather than hiding with CSS, to avoid dead focus targets.

## Risks / Trade-offs

- **[Risk]** Sticky sidebar overlaps **mobile** layout if ACE stack is single-column → **Mitigation:** Sticky applies in layouts where sidebar is already aside (`lg:flex-row`); on mobile stacked layout, optional no-op or sticky only from `lg` breakpoint.  
- **[Risk]** Icon-only mobile nav confuses first-time users → **Mitigation:** Optional `title` tooltips + `aria-label`; consider subtle labels below icons only if product requests (out of scope unless spec extended).  
- **[Bundle]** New dependency **lucide-react** → **Mitigation:** Named imports only.

## Migration Plan

1. Add `lucide-react` to `package.json` and install.  
2. Implement layout/sticky/CSS changes in wizard + shell + marketing + dashboard components.  
3. Visual QA: mobile + desktop, keyboard focus, VoiceOver/NVDA spot-check on bottom nav.  
4. **Rollback:** Revert commits; no data migration.

## Open Questions

- Exact **BarChart** icon variant (`BarChart` vs `BarChart3` / `BarChart2`) to match design taste.  
- Whether mobile nav should show **tooltips** on long-press (optional enhancement).
