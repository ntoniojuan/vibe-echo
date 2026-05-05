const echoAppNavDescriptors = [
  { href: "/dashboard", label: "Home", exact: true, desktopSlot: "primary" as const },
  {
    href: "/evaluation",
    label: "Create Eval",
    sidebarLabel: "Create",
    exact: false,
    desktopSlot: "omit" as const,
  },
  {
    href: "/evaluatee/stats",
    label: "My Stats",
    sidebarLabel: "Stats",
    exact: false,
    desktopSlot: "primary" as const,
  },
  { href: "/dashboard/profile", label: "Profile", exact: false, desktopSlot: "footer" as const },
] as const;

export const readEchoAppNavDescriptors = () => echoAppNavDescriptors;
