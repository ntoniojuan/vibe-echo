## Why

Dark mode is only partially visible today: charts and shadows respond while **page chrome, cards, primary copy, and form controls** often stay visually “light” because some surfaces use **hardcoded fills** or **inputs** lack dark-scoped styles. Users expect a coherent **deep navy / charcoal** shell with **warm cream** type and **legible controls** when `.dark` is active.

## What Changes

- **Global tokens** (`globals.css` `@theme` + `.dark`): tighten a **navy/charcoal ramp** for **body**, **workspace**, and **evaluation/card** surfaces; set **primary text** to **warm cream / off-white** and keep muted lines on semantic variants.
- **Form controls**: default **`textarea`**, **`input`** (text-like), and **`select`** (where used) get **dark surface + light foreground + border** under `.dark` without breaking light mode.
- **Audit hardcoded backgrounds**: replace or tokenize layouts that force light-only colors (e.g. marketing wrapper) so toggling theme affects the full app.
- **Theme wiring check**: confirm **`EchoThemeProvider`** (`next-themes`, `attribute="class"`) wraps the app in `layout.tsx` and toggles the **`html`** element (document root) — adjust docs or code only if a gap is found.

## Capabilities

### New Capabilities

- `echo-dark-mode-surfaces-typography`: Body, workspace, card/surface container tokens and primary type colors when `.dark` is present; removal of light-only hardcodes where they block dark mode.
- `echo-dark-mode-form-controls`: Accessible input/textarea/select styling in dark mode aligned to the same token system.

### Modified Capabilities

- _(None.)_

## Impact

- **Files**: `project-echo/src/app/globals.css`; selective TSX layouts/components with hardcoded light `bg-*`; possibly `layout.tsx` / `EchoThemeProvider.tsx` if the HTML `class` contract needs clarification.
- **Tailwind**: Project uses **Tailwind v4** with **`@theme inline`** in `globals.css` (no `tailwind.config` today); token work happens there unless the team adds a config layer later.
