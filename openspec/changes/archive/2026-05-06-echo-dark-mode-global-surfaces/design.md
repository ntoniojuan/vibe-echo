## Context

- **Theme**: `EchoThemeProvider` wraps `ToastProvider` → `EchoAuthProvider` → `children` inside `<body>` in `app/layout.tsx`. **`next-themes`** with **`attribute="class"`** toggles the **`class` list on `document.documentElement` (`<html>`)**, not on `<body>`. `suppressHydrationWarning` on `<html>` is correct.
- **Tokens**: Semantic colors live in `globals.css` under `@theme inline` with a **`.dark`** override block. Components use utilities like `bg-echo-workspace`, `bg-echo-card`, `text-on-surface`, `bg-surface-container-*`.
- **Gaps**: Some routes use **hardcoded** light backgrounds (e.g. marketing). **`body`** uses `var(--color-background)` but nested shells can override inconsistently. **Native form controls** often rely on per-component Tailwind without a global dark baseline.

## Goals / Non-Goals

**Goals:**

- **Backgrounds**: With `.dark` on `<html>`, **main app background** reads as **deep navy/charcoal** (`body`, workspace).
- **Cards**: Evaluation/dashboard cards use a **slightly elevated** navy/gray vs workspace (clear step in the ramp).
- **Typography**: **Primary** labels and body copy use **warm cream / off-white** (`on-surface` / `foreground` family); muted text stays lower-contrast but readable.
- **Forms**: **Textareas and inputs** use **dark field surfaces**, **light text**, and visible **borders/focus** rings in dark mode.
- **Verify** provider + root targeting; document in code comment or short README note if helpful.

**Non-Goals:**

- Redesigning the sage accent system or sidebar brand.
- Third theme (system) auto — still `enableSystem={false}` unless product changes.
- Pixel-perfect match to external brand PDFs.

## Decisions

1. **Token ladder (dark)**  
   - **Decision**: Use **`--color-background`** / **`--color-echo-workspace`** as the darkest shell; **`--color-echo-card`** and **`--color-surface-container-lowest`** one step **lighter** (charcoal → blue-gray lift ~Δ8–12% luminance) so cards “float.” Align **`--color-foreground`** and **`--color-on-surface`** to the same **warm cream** family (e.g. `#f5f5f0` / `#faf8f3` — pick one canonical primary text token).  
   - **Alternatives**: Flat single navy (rejected: cards won’t separate).

2. **Tailwind “config”**  
   - **Decision**: Extend **`@theme inline`** and **`.dark`** in **`globals.css`** only; do not add `tailwind.config.ts` unless a plugin requires it.  
   - **Alternatives**: New config file (deferred).

3. **Form controls**  
   - **Decision**: Add **`@layer base`** rules for `.dark textarea, .dark input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]), .dark select` setting `background-color`, `color`, `border-color`, and `::placeholder` using existing CSS variables (`surface-container-*`, `on-surface`, `outline-variant`). Respect **`prefers-reduced-motion`** where transitions exist.  
   - **Alternatives**: Per-component only (rejected: easy to miss).

4. **Hardcoded marketing**  
   - **Decision**: Replace fixed cream hex with **`bg-background`** or **`bg-echo-workspace`** + token text so the landing participates in dark mode (gradient may stay subtle using `color-mix` or tokenized stops).

## Risks / Trade-offs

- **[Risk]** Global input styles fight component-specific classes — **Mitigation**: keep base styles minimal; use low specificity.  
- **[Risk]** Contrast regression on sage-on-cream — **Mitigation**: verify WCAG-ish spot check on primary buttons.

## Migration Plan

1. Ship CSS + layout fixes.  
2. Visual QA light/dark toggle across dashboard, wizard, marketing, profile.

## Open Questions

- Should **login marketing gradient** remain sage-tinted in dark mode or flatten to navy-only?
