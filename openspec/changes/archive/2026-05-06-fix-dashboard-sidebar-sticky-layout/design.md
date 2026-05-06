## Context

Authenticated layout uses `EchoAppShell`: flex row with `EchoAppSidebar` (`hidden md:flex`, `md:h-screen md:max-h-screen md:overflow-hidden`) and a `main` column whose content grows with the dashboard inbox. Window scrolling moves the entire viewport; the sidebar column does not use **`sticky`**, so when users perceive “sidebar cut off,” they are usually scrolling past content while the sidebar remains viewport-clamped rather than tracking readability—or flex/stretch interacts oddly with `max-h-screen`. Dashboard inbox tabs live inline above `renderFeed()` with no sticky positioning.

## Goals / Non-Goals

**Goals:**

- Desktop sidebar fills viewport height semantics (**`min-h-screen`** / column **`h-full`**) and stays **`sticky top-0`** during main-document scroll.
- Dashboard inbox: **`sticky`** chrome covering **`EchoAppPageHeader`** + **Received / Sent / Review** tablist with opaque workspace/card-backed strip so lists scroll underneath without unreadable overlap.

**Non-Goals:**

- Changing mobile bottom navigation layout or evaluation wizard chrome.
- Virtualizing inbox lists or pagination.

## Decisions

1. **Where sticky applies**  
   **Choice**: Wrapper around **`EchoAppSidebar`** root **`nav`** (desktop): `sticky top-0 self-start min-h-screen h-screen` (or equivalent) plus retained **`flex-col`** and **`overflow-y-auto`** on the scrollable middle section so long menus still scroll inside the sidebar.  
   **Alternatives**: Sticky on outer shell flex item — similar; ensure **`self-start`** so sticky element height does not stretch incorrectly.

2. **Shell flex alignment**  
   **Choice**: Shell outer flex defaults **`items-stretch`**; sidebar gets **`min-h-screen`** + **`sticky`**. Main column stays **`flex-1 min-w-0`**.  
   **Alternatives**: `items-start` everywhere — can shrink sidebar below viewport; rejected.

3. **Dashboard sticky band background**  
   **Choice**: Sticky wrapper uses **`bg-echo-workspace`** (matches main workspace) + **`z-sticky`** (e.g. `z-20`) + optional **`border-b`** / **`shadow-sm`** on tab separator edge so inbox cards do not show through garishly.  
   **Alternatives**: `backdrop-blur` — optional polish later.

## Risks / Trade-offs

- **[Risk]** Double scrollbars (viewport + sidebar) confuse users → **Mitigation**: Sidebar interior scroll only when nav overflows; default catalogs fit today.
- **[Risk]** Sticky strip overlaps fixed bottom nav on mobile → **Mitigation**: Dashboard sticky only needs mobile sanity check; sidebar sticky is **`md+`** only.

## Migration Plan

1. Implement shell/sidebar CSS classes.
2. Implement dashboard sticky wrapper + spacing tweaks (**`pb`** on sticky block ends before feed).
3. Manual QA: long inbox list on **`md`/`lg`**, Profile and Stats routes for regressions.

**Rollback**: Revert layout commits only.

## Open Questions

- None.
