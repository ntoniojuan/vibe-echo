## 1. Theme root (`html.dark`)

- [x] 1.1 Audit `project-echo` theme initialization: ensure persisted preference and live toggle mutate **`document.documentElement.classList`** for `dark` only (no stale `dark` on `body` or layout wrappers).
- [x] 1.2 Remove or refactor any code paths that gate Midnight on non-`html` selectors so `dark:bg-*` / `dark:text-*` utilities activate consistently.

## 2. MedGrocer Sage tokens (primary CTAs)

- [x] 2.1 Replace primary filled surfaces with **`#4A634A`** and on-fill labels with **`#FFFFFF`** for wizard primaries, sidebar **New Evaluation**, and shared button variants (no default Tailwind blue primaries).
- [x] 2.2 Apply **`#D1DCD1`** to secondary/hover treatments per variant rules; verify hover/focus label contrast on light Sage surfaces.
- [x] 2.3 Restyle **active inbox tabs** and comparable selected chrome to **`#4A634A`** emphasis with **`#FFFFFF`** on filled regions—eliminate pale “ghost” selected states.

## 3. Inbox row actions

- [x] 3.1 Update evaluation inbox **OPEN** (and equivalent primary row buttons) to filled **`#4A634A`** with **`#FFFFFF`** text in Light and Midnight.

## 4. Midnight canvas, cards, and type

- [x] 4.1 Apply **`dark:bg-[#0B1120]`** (or equivalent) to authenticated main workspace / body backdrop so the canvas matches the deep navy contract.
- [x] 4.2 Apply **`dark:bg-[#1E293B]`** to elevated cards (inbox entries, profile panels, form sections) and adjust borders so edges remain visible against **`#0B1120`**.
- [x] 4.3 Apply **`dark:text-slate-100`** to default primary copy on Midnight surfaces; keep muted/secondary tiers distinct where specs call for hierarchy.

## 5. Sticky dashboard header (glass)

- [x] 5.1 Replace opaque beige/green/solid sticky header fills with **transparent or semi-transparent** backgrounds plus **`backdrop-blur-*`** for Light and Midnight dashboard title + tab strip.
- [x] 5.2 Re-test scroll behavior and tab click targets under the sticky region (z-index, no accidental overlays).

## 6. Desktop sidebar (navy in Light)

- [x] 6.1 Set sidebar shell background to **`#0B1120`** in **Light** and **Midnight** (`md+`); tune nav/icon/label colors for contrast on navy (without light-gray sidebar body).

## 7. Verification

- [x] 7.1 Visual pass: Light + Midnight on dashboard (tabs, OPEN, cards, header blur, sidebar), wizard primary steps, profile card, mobile bottom nav active state.
- [x] 7.2 Confirm no regressions to `prefers-color-scheme` first paint beyond acceptable minimal flash (hydration should converge to `<html>` class only).
