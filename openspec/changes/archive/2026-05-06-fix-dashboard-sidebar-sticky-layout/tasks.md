## 1. Desktop sidebar (shell)

- [x] 1.1 In `EchoAppShell.tsx`, ensure the flex row uses stretch-friendly layout (`items-stretch` or equivalent) and the main column uses `min-w-0` so sticky siblings behave predictably.
- [x] 1.2 In `EchoAppSidebar.tsx` (`md+` visible `nav`), add **`sticky top-0`**, **`self-start`**, **`min-h-screen`**, and **`h-full`** / **`h-screen`** per design; keep internal **`overflow-y-auto`** on the scrollable nav segment so overflowing links remain reachable.

## 2. Dashboard sticky inbox chrome

- [x] 2.1 In `EchoDashboardHomeClient.tsx`, wrap **`EchoAppPageHeader`** and the inbox **`role="tablist"`** block in a single **`sticky top-0 z-*`** container with **`bg-echo-workspace`** (or equivalent workspace token) and bottom separation (**`border-b`** / subtle **`shadow-sm`** if needed).
- [x] 2.2 Adjust vertical spacing (`margin`/`padding`) so the sticky strip does not double-gap against the scrolling feed; confirm **`EchoAppPageHeader`** `mb-8` interacts cleanly or collapse redundant margins inside the sticky wrapper.

## 3. Verification

- [x] 3.1 Desktop QA `/dashboard` with a tall inbox: sidebar stays pinned and full-height; header + tabs remain visible while scrolling.
- [x] 3.2 Spot-check `/evaluatee/stats` and `/dashboard/profile` for sidebar regressions; mobile layout unchanged.
