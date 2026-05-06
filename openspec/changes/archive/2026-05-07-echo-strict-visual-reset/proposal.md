## Why

Project Echo’s authenticated UI regressed: light “ghost” CTAs and tabs, inconsistent Sage values, and dark mode surfaces that no longer match the intended Midnight stack. A strict token reset restores readable contrast, predictable `html.dark` behavior, and brand-consistent chrome (navy sidebar, glass header) without relying on Tailwind default palette colors.

## What Changes

- Enforce the **MedGrocer Sage** stack with explicit hex only: primary / active actions **`#4A634A`**, secondary / hover **`#D1DCD1`**, label on sage fills **`#FFFFFF`**—no default theme blues or pale unreadable fills for primary actions (including **OPEN** and inbox tabs).
- **Dark mode**: Theme toggle applies **`dark`** only to **`<html>`**; Midnight canvas uses **`dark:bg-[#0B1120]`** (deep navy), elevated cards **`dark:bg-[#1E293B]`** (slate dark), primary copy **`dark:text-slate-100`**—no ambiguous “slate” defaults where spec calls for these targets.
- **Header**: Sticky chrome is **transparent / translucent** with **backdrop blur**—remove opaque beige or green-tinted header blocks.
- **Sidebar**: Desktop sidebar stays **deep navy** in **Light** and **Midnight** so branding matches reference layouts.

## Capabilities

### New Capabilities

- `echo-sidebar-persistent-navy`: Desktop app sidebar shell stays deep navy in Light and Midnight for consistent MedGrocer/Echo branding (not a light-gray strip in Light mode).

### Modified Capabilities

- `echo-sage-primary-accent`: Replace the documented baseline Sage **`#889F88`** with the strict high-contrast primary **`#4A634A`**, add secondary/hover **`#D1DCD1`**, and require **`#FFFFFF`** on sage primary fills; primary CTAs and active tabs (including **OPEN**) SHALL NOT use pale or default-primary colors.
- `echo-dark-foundational-surfaces`: Align Midnight canvas to **`#0B1120`** and card faces to **`#1E293B`** per the strict reset; align default Midnight foreground emphasis with **`text-slate-100`** semantics where primary body copy is specified.
- `echo-main-canvas-elevated-cards`: Match elevated Midnight card surfaces to **`#1E293B`** and ensure listing/form cards respect **`dark:text-slate-100`** for primary text where applicable.
- `echo-dashboard-glass-sticky-header`: Require sticky dashboard title/tabs chrome to remain glass-like (**transparent/semi-transparent + backdrop blur**) and **forbid** opaque beige, green, or off-brand solid slabs in Light or Midnight.
- `echo-theme-dark-html-root`: Add explicit acceptance that the in-app theme control mutates **`document.documentElement.classList`** for `dark` only, without contradictory `dark` markers on `body` or inner wrappers after toggling.

## Impact

- **Code**: `project-echo` layout/shell (header, sidebar, theme provider), shared Tailwind classes or CSS variables, dashboard inbox (tabs, OPEN actions), and any components still using old sage or default `primary` tokens.
- **Dependencies**: None expected beyond existing Tailwind/React stack; verify no conflicting `body`-scoped dark flags.
- **Systems**: Visual/regression check on Light + Midnight, desktop sidebar + mobile nav, dashboard sticky header scroll behavior.
