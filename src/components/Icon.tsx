import { cn } from "@/lib/utils";

// Lightweight inline icon set (stroke-based, lucide-inspired) so we avoid an
// external icon dependency. Add new keys as needed.
const paths: Record<string, React.ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />,
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 5.2a3 3 0 0 1 0 5.6M20.5 20a5 5 0 0 0-4-4.9" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 20h6M10 16v4M14 16v4" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h2" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m8.5 13-1.5 7 5-3 5 3-1.5-7" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  "badge-check": (
    <>
      <path d="m9 12 2 2 4-4" />
      <path d="M12 2.5 14.5 5l3.5-.4.7 3.5L21.5 10l-1.8 3 1.8 3-2.8 1.4-.7 3.5L14.5 19 12 21.5 9.5 19 6 19.4l-.7-3.5L2.5 14l1.8-3-1.8-3 2.8-1.9.7-3.5L9.5 5Z" />
    </>
  ),
  handshake: <path d="m11 17 2 2 4-4M3 12l4-4 3 3 3-3 3 3 5 0M3 12v3a2 2 0 0 0 2 2h2" />,
  mic: (
    <>
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
    </>
  ),
  "file-text": (
    <>
      <path d="M14 3v5h5" />
      <path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8Z" />
      <path d="M8.5 13h7M8.5 16.5h7M8.5 9.5h2" />
    </>
  ),
  folder: <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2.5h8.5A1.5 1.5 0 0 1 21 10v7.5A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5Z" />,
  megaphone: <path d="m3 11 14-6v14l-14-6Zm0 0H2.5a1.5 1.5 0 0 0 0 3H3m4 1v3a1.5 1.5 0 0 0 3 0v-2" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </>
  ),
  bell: <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 0 0 4 0" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </>
  ),
  logout: <path d="M15 4h3.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H15M10 12h9M16 8l3 4-3 4" />,
  "map-pin": (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  zap: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  heart: <path d="M12 20s-7-4.3-9.3-8.3A5 5 0 0 1 12 6a5 5 0 0 1 9.3 5.7C19 15.7 12 20 12 20Z" />,
  footprints: <path d="M7 18c0-2 .5-4 .5-5.5S6.5 9 6.5 7a2.5 2.5 0 0 1 5 0c0 2-1 4-1 5.5S11 16 11 18a2 2 0 0 1-4 0Z" />,
  "pen": <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />,
  check: <path d="m5 12 5 5 9-9" />,
  plus: <path d="M12 5v14M5 12h14" />,
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  star: <path d="m12 3 2.6 5.6L21 9.3l-4.5 4.3L17.6 21 12 17.7 6.4 21l1.1-7.4L3 9.3l6.4-.7Z" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18" />
    </>
  ),
  graduation: <path d="m12 4 10 5-10 5L2 9l10-5Zm6 7v4.5c0 1.4-2.7 2.5-6 2.5s-6-1.1-6-2.5V11" />,
  link: <path d="M9 15 15 9M10.5 6.5 12 5a4 4 0 0 1 6 6l-1.5 1.5M13.5 17.5 12 19a4 4 0 0 1-6-6l1.5-1.5" />,
  shield: <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6Z" />,
  sparkles: <path d="M12 3v6M9 6h6M6 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1Zm11 1 .7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z" />,
};

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5 shrink-0", className)}
      aria-hidden="true"
    >
      {paths[name] ?? paths.star}
    </svg>
  );
}
