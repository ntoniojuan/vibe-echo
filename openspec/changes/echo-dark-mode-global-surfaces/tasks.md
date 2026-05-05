## 1. Theme provider verification

- [x] 1.1 Confirm **`EchoThemeProvider`** uses **`attribute="class"`** and documents that **`next-themes`** toggles **`html`**. Add a **short code comment** on `EchoThemeProvider` or `layout.tsx` if needed (no new markdown doc unless team requires it).

## 2. Global tokens (`globals.css`)

- [x] 2.1 Refine **`.dark`** **`@theme` / variable overrides**: **body/background/workspace** = deep navy/charcoal; **echo-card** and key **surface-container-lowest** values = **slightly lighter** navy/gray than workspace.
- [x] 2.2 Set **primary text** tokens (**`--color-on-surface`**, **`--color-foreground`**) to **warm cream / off-white** in `.dark`; tune **`--color-on-surface-variant`** for readable secondary text.
- [x] 2.3 Ensure **`body`** (and shell utilities **`bg-background`**, **`bg-echo-workspace`**, **`text-on-background`**) resolve to the dark ramp when `.dark` is present.

## 3. Form controls

- [x] 3.1 Add **`@layer base`** (or equivalent) rules under **`.dark`** for **`textarea`**, text **`input`**, and **`select`**: dark fill, light text, border from tokens, placeholder contrast.

## 4. Hardcoded light surfaces

- [x] 4.1 Replace or tokenize **fixed light-only** backgrounds (e.g. marketing layout) so dark mode applies consistently.

## 5. Verification

- [ ] 5.1 Manual: toggle dark on **dashboard**, **wizard**, **profile**, **marketing** — backgrounds, cards, and type match spec; inputs legible.
- [x] 5.2 `npm run lint` && `npm run build` in `project-echo`.
