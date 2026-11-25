import {
  Bell,
  BookOpen,
  Compass,
  FileText,
  Gem,
  GraduationCap,
  House,
  LineChart,
  MessagesSquare,
  Network,
  Settings,
  Star,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export type NavKey = "overview" | "explore" | "markets" | "graph" | "research" | "copilot" | "academy" | "strategies" | "community" | "watchlist" | "portfolio" | "alerts" | "researchClub" | "privateProgram" | "settings";

export interface NavItem {
  /** Key of the label in the `nav.items` dictionary. */
  key: NavKey;
  href: string;
  icon: LucideIcon;
  /** Feature not available yet, shown with a "Soon" badge and a roadmap page. */
  soon?: boolean;
  phase?: string;
}

export interface NavGroup {
  id: "discover" | "understand" | "manage";
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "discover",
    items: [
      { key: "overview", href: "/overview", icon: House },
      { key: "explore", href: "/explore", icon: Compass },
      { key: "markets", href: "/markets", icon: LineChart },
      { key: "graph", href: "/graph", icon: Network },
    ],
  },
  {
    id: "understand",
    items: [
      { key: "research", href: "/research", icon: FileText },
      { key: "copilot", href: "/copilot", icon: MessagesSquare },
      { key: "academy", href: "/academy", icon: GraduationCap },
      { key: "strategies", href: "/strategies", icon: TrendingUp },
      { key: "community", href: "/community", icon: Users, soon: true, phase: "Phase 4" },
    ],
  },
  {
    id: "manage",
    items: [
      { key: "watchlist", href: "/watchlist", icon: Star },
      { key: "portfolio", href: "/portfolio", icon: Wallet },
      { key: "alerts", href: "/alerts", icon: Bell },
    ],
  },
];

export const NAV_SECONDARY: NavItem[] = [
  { key: "researchClub", href: "/research-club", icon: BookOpen, soon: true, phase: "Phase 4" },
  { key: "privateProgram", href: "/private-program", icon: Gem, soon: true, phase: "Later" },
  { key: "settings", href: "/settings", icon: Settings },
];

export function isActive(pathname: string, href: string) {
  if (href === "/overview") return pathname === "/overview";
  if (href === "/explore") return pathname.startsWith("/explore") || pathname.startsWith("/projects") || pathname.startsWith("/compare");
  return pathname === href || pathname.startsWith(`${href}/`);
}
