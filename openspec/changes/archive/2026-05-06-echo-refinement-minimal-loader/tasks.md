## 1. Dependencies

- [x] 1.1 Add **`framer-motion`** to `project-echo` with a version compatible with **React 19** / Next 15; run install and verify lockfile.

## 2. Styles

- [x] 2.1 Add scoped CSS (e.g. in `globals.css` under a dedicated class prefix or a colocated CSS module) for **two staggered ripple rings**: sage color from semantic tokens, **scale + opacity** keyframes, infinite loop while mounted.

## 3. Component

- [x] 3.1 Create **`EchoRefinementMinimalLoader`** (client): centered **ECHO** (bold, navy/high-contrast token), ripple wrapper, muted subtitle, **`aria-busy`**, status region with **`aria-live="polite"`**, `useEffect` interval to cycle the **three** mandated strings.
- [x] 3.2 Wrap content in **`AnimatePresence`** + **`motion`** (Framer Motion) for **fade in/out** tied to an `isVisible` prop.

## 4. Integration

- [x] 4.1 In **`EchoAceRefinementSection`**, show the loader when **`phase === "generating"`** (replace or augment the generic “Generating…” affordance so the new UI is the primary feedback); ensure **fade out** when transitioning to **`quiz`** on success, and **no** stuck overlay on **`idle`** after error.

## 5. Verification

- [x] 5.1 `npm run lint` && `npm run build` in `project-echo`.
- [ ] 5.2 Manual: trigger Refine with valid notes; observe ripples + message rotation + smooth fade; verify dark mode contrast; failure path returns to idle without loader.
