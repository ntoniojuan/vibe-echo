import { readEchoAppNavDescriptors } from "@/lib/echo/readEchoAppNavDescriptors";

type NavItem = ReturnType<typeof readEchoAppNavDescriptors>[number];

export const readEchoAppNavItemIsActive = (pathname: string, item: NavItem): boolean => {
  if (item.exact) {
    return pathname === item.href || pathname === `${item.href}/`;
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
};
