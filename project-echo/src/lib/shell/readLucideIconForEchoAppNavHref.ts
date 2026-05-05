import type { LucideIcon } from "lucide-react";
import { BarChart, Home, Plus, User } from "lucide-react";

export const readLucideIconForEchoAppNavHref = (href: string): LucideIcon => {
  if (href === "/dashboard") {
    return Home;
  }
  if (href === "/evaluation") {
    return Plus;
  }
  if (href === "/evaluatee/stats") {
    return BarChart;
  }
  if (href === "/dashboard/profile") {
    return User;
  }
  return Home;
};
