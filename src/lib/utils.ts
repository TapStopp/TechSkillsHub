import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names with conditional support. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a date in a friendly, US-academic style. */
export function formatDate(date: Date | string, opts?: Intl.DateTimeFormatOptions) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...opts,
  });
}

/** Format a time range like "3:00–4:30 PM". */
export function formatTimeRange(start: Date | string, end: Date | string) {
  const s = typeof start === "string" ? new Date(start) : start;
  const e = typeof end === "string" ? new Date(end) : end;
  const fmt: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit" };
  return `${s.toLocaleTimeString("en-US", fmt)}–${e.toLocaleTimeString("en-US", fmt)}`;
}

/** XP required to reach a given level (simple curve). */
export function xpForLevel(level: number) {
  return level * 500;
}

/** Derive level + progress from total XP. */
export function levelFromXp(totalXp: number) {
  let level = 1;
  let remaining = totalXp;
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level);
    level += 1;
  }
  const needed = xpForLevel(level);
  return { level, current: remaining, needed, percent: Math.round((remaining / needed) * 100) };
}

/** Relative "x days ago" helper. */
export function timeAgo(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}
