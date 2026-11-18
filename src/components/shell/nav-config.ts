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
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Feature not available yet, shown with a "Soon" badge and a roadmap page. */
  soon?: boolean;
  phase?: string;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "discover",
    label: "Discover",
    items: [
      { label: "Overview", href: "/overview", icon: House },
      { label: "Explore Projects", href: "/explore", icon: Compass },
      { label: "Markets", href: "/markets", icon: LineChart },
      { label: "Knowledge Graph", href: "/graph", icon: Network },
    ],
  },
  {
    id: "understand",
    label: "Understand",
    items: [
      { label: "Research", href: "/research", icon: FileText },
      { label: "Research Copilot", href: "/copilot", icon: MessagesSquare },
      { label: "Academy", href: "/academy", icon: GraduationCap },
      { label: "Community", href: "/community", icon: Users, soon: true, phase: "Phase 4" },
    ],
  },
  {
    id: "manage",
    label: "Manage",
    items: [
      { label: "Watchlist", href: "/watchlist", icon: Star },
      { label: "Portfolio", href: "/portfolio", icon: Wallet },
      { label: "Alerts", href: "/alerts", icon: Bell },
    ],
  },
];

export const NAV_SECONDARY: NavItem[] = [
  { label: "Research Club", href: "/research-club", icon: BookOpen, soon: true, phase: "Phase 4" },
  { label: "Private Program", href: "/private-program", icon: Gem, soon: true, phase: "Later" },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function isActive(pathname: string, href: string) {
  if (href === "/overview") return pathname === "/overview";
  if (href === "/explore") return pathname.startsWith("/explore") || pathname.startsWith("/projects") || pathname.startsWith("/compare");
  return pathname === href || pathname.startsWith(`${href}/`);
}
