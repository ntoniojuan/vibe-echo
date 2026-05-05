## 1. Marketing landing hero

- [x] 1.1 Update `(marketing)/page.tsx`: set **`h1`** to **Project ECHO**; add subtitle *Evaluation of Capabilities & Holistic Objectives.* with lighter weight; add mission sentence *A performance platform designed to move beyond scores and into the Dialogue of growth.*; demote **Welcome back** to `h2` or supporting text without duplicate `h1`.

## 2. Sidebar footer (desktop)

- [x] 2.1 Add muted footer line to `EchoAppSidebar` below Profile/Logout: *© 2026 MedGrocer | Evaluation of Capabilities & Holistic Objectives.*

## 3. Profile (mobile attribution + About)

- [x] 3.1 Add the same footer attribution to `EchoProfilePageClient` (appropriate placement, muted, does not push primary actions).
- [x] 3.2 Add **About** info control on Profile (e.g. next to header actions) reusing the same content as desktop — ensure small screens can open/close popover.

## 4. About popover (desktop sidebar)

- [x] 4.1 Implement `EchoAboutEchoPopover` (or equivalent) with ACE + Goal copy; **accessible** button, keyboard, focus/click outside to dismiss; position so sidebar `overflow` does not clip (portal if needed).
- [x] 4.2 Place **Info** icon next to sidebar logo cluster; wire to popover.

## 5. Verification

- [x] 5.1 `npm run lint` && `npm run build` in `project-echo`.
- [x] 5.2 Manual: landing hierarchy; desktop sidebar footer + About hover/click; mobile Profile footer + About; keyboard + screen reader spot-check.
