"use client";

import { useMemo, useState } from "react";
import { EventCard, categoryLabels } from "@/components/EventCard";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import type { EventCategory, EventItem } from "@/lib/types";

export interface BrowserEvent {
  event: EventItem;
  rsvped: boolean;
  orgName?: string;
}

export function EventsBrowser({ items }: { items: BrowserEvent[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<EventCategory | "ALL">("ALL");

  const categories = useMemo(() => {
    const set = new Set<EventCategory>();
    items.forEach((i) => set.add(i.event.category));
    return Array.from(set);
  }, [items]);

  const filtered = items.filter((i) => {
    const matchCat = category === "ALL" || i.event.category === category;
    const matchQuery =
      !query ||
      i.event.title.toLowerCase().includes(query.toLowerCase()) ||
      i.event.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events…"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <FilterChip active={category === "ALL"} onClick={() => setCategory("ALL")}>
          All
        </FilterChip>
        {categories.map((c) => (
          <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
            {categoryLabels[c]}
          </FilterChip>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(({ event, rsvped, orgName }) => (
          <EventCard key={event.id} event={event} rsvped={rsvped} orgName={orgName} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-slate-400">
          No events match your filters.
        </p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm font-medium transition",
        active
          ? "bg-brand-600 text-white"
          : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50",
      )}
    >
      {children}
    </button>
  );
}
