## 1. Dependencies

- [x] 1.1 Add `lucide-react` to `project-echo` and install (named imports only in code).

## 2. ACE teammate sidebar (sticky)

- [x] 2.1 In `EchoWizard` ACE step layout (`lg:flex-row`), make the teammate history column wrapper `sticky top-0 self-start` with sensible `max-h` / `overflow-y-auto` on the sidebar inner panel if content can exceed the viewport.

## 3. Mobile bottom navigation

- [x] 3.1 Update `EchoBottomPinnedNavigationBar` (or equivalent) to replace large text labels with Lucide icons: Home, Plus, BarChart (or agreed variant), User; keep `aria-label` / touch targets ≥ 44px.

## 4. Desktop shell sidebar and marketing header

- [x] 4.1 Add Lucide icons beside Profile and Logout in the desktop app side panel.
- [x] 4.2 Remove notification bell and question-mark placeholder buttons from the marketing home header component.

## 5. Dashboard inbox card

- [x] 5.1 Reflow `EchoDashboardInboxCard` so the primary action (Open / Continue) sits on the same row as the Head / Heart / Hands pills (wrap on narrow widths); remove the bulky separate full-width button row where applicable.

## 6. Verification

- [x] 6.1 Run `npm run lint` and `npm run build`; spot-check mobile + desktop layout and keyboard focus on bottom nav.
