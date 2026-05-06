## Why

On desktop, the app shell scrolls as one column beside the sidebar: long inbox lists make the **main content** scroll while the **left sidebar** is tied to the flex row height (`md:h-screen` / `max-h-screen`) and does not stay pinned, so it can feel “cut off” or lost relative to the scroll position. On the dashboard, **Received / Sent / Review** tabs scroll away with the list, so users lose tab context while reading many evaluations.

## What Changes

- **Sidebar (desktop, `md+`)**: Treat the sidebar column as **at least full viewport height** (`min-h-screen`) and **fill the column** (`h-full` / aligned stretch), and make it **`position: sticky; top: 0`** so it remains visible while the main pane scrolls. Preserve internal overflow for long nav/footer content when needed.
- **Dashboard inbox**: Add a **sticky top chrome** that keeps the **inbox tab row** (Received, Sent, Review) visible during vertical scroll; **include the dashboard page header** (title + description + trailing avatar) in the same sticky block so users always see which page and tab they are on.

## Capabilities

### New Capabilities

- `echo-desktop-sidebar-sticky`: Desktop sidebar column height and sticky behavior in the authenticated shell.
- `echo-dashboard-sticky-inbox-tabs`: Sticky dashboard header + inbox tablist while scrolling the evaluation list.

### Modified Capabilities

- _(none — `openspec/specs/` has no baseline specs.)_

## Impact

- **Code**: `project-echo` — `EchoAppShell.tsx`, `EchoAppSidebar.tsx`, `EchoDashboardHomeClient.tsx`; possibly shared workspace background classes (`bg-echo-workspace` / tokens) on sticky dashboard stripe for contrast.
- **Mobile**: Bottom navigation unchanged; sticky sidebar applies **desktop breakpoint only** (`md:flex` sidebar).
- **Risk**: Low; CSS/layout only — verify z-index vs cards/modals and avoid double scroll traps inside sidebar.
