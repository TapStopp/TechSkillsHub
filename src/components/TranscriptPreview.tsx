import { Icon } from "@/components/Icon";
import { formatDate } from "@/lib/utils";
import type { TranscriptEntry } from "@/lib/types";

const categoryIcon: Record<TranscriptEntry["category"], string> = {
  EVENT: "calendar",
  LEADERSHIP: "megaphone",
  SERVICE: "heart",
  CREDENTIAL: "badge-check",
  BADGE: "award",
};

export function TranscriptPreview({ entries }: { entries: TranscriptEntry[] }) {
  return (
    <ol className="relative space-y-5 border-l border-slate-200 pl-6">
      {entries.map((entry) => (
        <li key={entry.id} className="relative">
          <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-4 ring-white">
            <Icon name={categoryIcon[entry.category]} className="h-3.5 w-3.5" />
          </span>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-slate-900">{entry.title}</p>
              <p className="text-sm text-slate-500">{entry.detail}</p>
            </div>
            <span className="whitespace-nowrap text-xs text-slate-400">
              {formatDate(entry.occurredAt)}
            </span>
          </div>
          {entry.hours > 0 && (
            <p className="mt-1 text-xs font-medium text-slate-500">{entry.hours} hours</p>
          )}
        </li>
      ))}
    </ol>
  );
}
