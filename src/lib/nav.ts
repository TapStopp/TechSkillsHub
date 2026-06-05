// Central navigation config used by the authenticated AppShell.
export interface NavItem {
  label: string;
  href: string;
  icon: string; // simple key resolved by the Icon component
  group: "Overview" | "Engage" | "Grow" | "Career" | "Account";
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "home", group: "Overview" },
  { label: "Events", href: "/events", icon: "calendar", group: "Engage" },
  { label: "Clubs", href: "/clubs", icon: "users", group: "Engage" },
  { label: "Leaderboard", href: "/leaderboard", icon: "trophy", group: "Engage" },
  { label: "Pathways", href: "/pathways", icon: "route", group: "Grow" },
  { label: "Badges", href: "/badges", icon: "award", group: "Grow" },
  { label: "Competencies", href: "/competencies", icon: "target", group: "Grow" },
  { label: "Credentials", href: "/credentials", icon: "badge-check", group: "Career" },
  { label: "Mentorship", href: "/mentorship", icon: "handshake", group: "Career" },
  { label: "Interviews", href: "/interviews", icon: "mic", group: "Career" },
  { label: "Transcript", href: "/transcript", icon: "file-text", group: "Career" },
  { label: "Portfolio", href: "/portfolio", icon: "folder", group: "Career" },
  { label: "Org Admin", href: "/organization-admin", icon: "megaphone", group: "Account" },
  { label: "Settings", href: "/settings", icon: "settings", group: "Account" },
];

export const navGroups: NavItem["group"][] = [
  "Overview",
  "Engage",
  "Grow",
  "Career",
  "Account",
];
