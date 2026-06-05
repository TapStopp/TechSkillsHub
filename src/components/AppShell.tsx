"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { BrandMark } from "@/components/PublicHeader";
import { navGroups, navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";
import type { User } from "@/lib/types";

export function AppShell({
  user,
  level,
  totalXp,
  children,
}: {
  user: User;
  level: number;
  totalXp: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const SidebarNav = (
    <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-3 py-4">
      {navGroups.map((group) => (
        <div key={group}>
          <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {group}
          </p>
          <ul className="space-y-0.5">
            {navItems
              .filter((i) => i.group === group)
              .map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                        active
                          ? "bg-brand-50 text-brand-700"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                      )}
                    >
                      <Icon name={item.icon} className="h-[18px] w-[18px]" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-slate-200 px-5">
          <Link href="/dashboard">
            <BrandMark />
          </Link>
        </div>
        {SidebarNav}
        <div className="border-t border-slate-200 p-3">
          <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
            <p className="text-xs font-medium opacity-80">Level {level}</p>
            <p className="text-lg font-bold">{totalXp.toLocaleString()} XP</p>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-white">
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
              <BrandMark />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <Icon name="plus" className="h-5 w-5 rotate-45 text-slate-500" />
              </button>
            </div>
            {SidebarNav}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur">
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="megaphone" className="hidden" />
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-slate-600" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="relative hidden max-w-md flex-1 md:block">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              placeholder="Search events, badges, mentors…"
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="ml-auto flex items-center gap-1">
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Icon name="bell" className="h-5 w-5" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-600 ring-2 ring-white" />
            </button>

            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-100"
              >
                <Avatar name={user.name} color={user.avatarColor} size={34} />
                <span className="hidden text-left sm:block">
                  <span className="block text-sm font-medium leading-tight text-slate-900">
                    {user.name}
                  </span>
                  <span className="block text-xs text-slate-500">{user.role}</span>
                </span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-1 shadow-card-hover">
                  <div className="border-b border-slate-100 px-3 py-2">
                    <p className="text-sm font-medium text-slate-900">{user.name}</p>
                    <p className="truncate text-xs text-slate-500">{user.email}</p>
                  </div>
                  <Link
                    href="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Icon name="settings" className="h-4 w-4" /> Settings
                  </Link>
                  <Link
                    href="/portfolio"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Icon name="folder" className="h-4 w-4" /> My Portfolio
                  </Link>
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Icon name="logout" className="h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
