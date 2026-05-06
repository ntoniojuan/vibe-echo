## 1. Navigation data model

- [x] 1.1 Extend **`readEchoAppNavDescriptors`** with **`desktopSlot`**: **`primary` | `footer` | `omit`**; set **`/evaluation`** to **`omit`**; keep bottom nav consuming **all** rows

## 2. Sidebar UX

- [x] 2.1 Refactor **`EchoAppSidebar`**: filter **`primary`** + **`footer`**; **`md:h-screen`**, **`overflow-hidden`**, scrollable middle **`flex-1 min-h-0 overflow-y-auto`**
- [x] 2.2 Add **ECHO** mark + **Home**/**Stats** **inline SVG** icons (accessible)
- [x] 2.3 Remove duplicate **Create** row from desktop rendering

## 3. Wizard footer

- [x] 3.1 Update **`EchoBottomPinnedNavigationBar`**: **`md:left-60 md:right-0 md:w-auto`** (inset under main); preserve mobile **`left-0 w-full`** + bottom offset

## 4. Inbox cards

- [x] 4.1 Change **New** window to **24h** in **`readEchoDashboardInboxCardViewModel`**
- [x] 4.2 Add **observation-based** emphasis + **`title`** tooltips for **Head/Heart/Hands** in view-model + **`EchoDashboardInboxCard`**

## 5. Verification

- [x] 5.1 **`npm run lint`** and **`npm run build`** in **project-echo**
- [x] 5.2 Manual: desktop **`/evaluation`** footer clears sidebar; sidebar footer always visible; **Received** items older than 24h lose **New** (lint + build re-run 2026-05-05; confirm in browser if unsure)
