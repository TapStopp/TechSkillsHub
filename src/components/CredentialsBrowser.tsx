"use client";

import { useMemo, useState } from "react";
import { CredentialCard } from "@/components/CredentialCard";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import type { Credential, CredentialStatus } from "@/lib/types";

export interface CredentialItem {
  credential: Credential;
  status?: CredentialStatus;
}

export function CredentialsBrowser({ items }: { items: CredentialItem[] }) {
  const [track, setTrack] = useState<string>("ALL");
  const [query, setQuery] = useState("");

  const tracks = useMemo(() => {
    const set = new Set(items.map((i) => i.credential.careerTrack));
    return Array.from(set);
  }, [items]);

  const filtered = items.filter((i) => {
    const matchTrack = track === "ALL" || i.credential.careerTrack === track;
    const matchQuery =
      !query ||
      i.credential.name.toLowerCase().includes(query.toLowerCase()) ||
      i.credential.provider.toLowerCase().includes(query.toLowerCase());
    return matchTrack && matchQuery;
  });

  return (
    <div>
      <div className="relative mb-4">
        <Icon
          name="search"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search credentials…"
          className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Chip active={track === "ALL"} onClick={() => setTrack("ALL")}>
          All tracks
        </Chip>
        {tracks.map((t) => (
          <Chip key={t} active={track === t} onClick={() => setTrack(t)}>
            {t}
          </Chip>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(({ credential, status }) => (
          <CredentialCard key={credential.id} credential={credential} initialStatus={status} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-slate-400">No credentials found.</p>
      )}
    </div>
  );
}

function Chip({
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
