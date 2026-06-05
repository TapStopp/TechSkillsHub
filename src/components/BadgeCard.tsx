import { Icon } from "@/components/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import type { Badge } from "@/lib/types";

const tierStyles: Record<Badge["tier"], { ring: string; bg: string; text: string }> = {
  bronze: { ring: "ring-amber-200", bg: "bg-amber-100", text: "text-amber-700" },
  silver: { ring: "ring-slate-200", bg: "bg-slate-100", text: "text-slate-600" },
  gold: { ring: "ring-yellow-200", bg: "bg-yellow-100", text: "text-yellow-700" },
  platinum: { ring: "ring-purple-200", bg: "bg-purple-100", text: "text-purple-700" },
};

export function BadgeCard({
  badge,
  earned,
  progress = 0,
}: {
  badge: Badge;
  earned: boolean;
  progress?: number;
}) {
  const t = tierStyles[badge.tier];
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white p-5 shadow-card transition hover:shadow-card-hover",
        earned ? "border-slate-200" : "border-dashed border-slate-200 opacity-90",
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-inset",
            t.bg,
            t.ring,
            t.text,
            !earned && "grayscale",
          )}
        >
          <Icon name={badge.icon} className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-slate-900">{badge.name}</h3>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ring-1 ring-inset",
                t.bg,
                t.ring,
                t.text,
              )}
            >
              {badge.tier}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-slate-500">{badge.description}</p>
        </div>
      </div>
      <div className="mt-4">
        {earned ? (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
            <Icon name="check" className="h-4 w-4" /> Earned · +{badge.xpValue} XP
          </span>
        ) : (
          <div>
            <ProgressBar value={progress} tone="gold" showLabel />
            <p className="mt-1 text-xs text-slate-400">In progress</p>
          </div>
        )}
      </div>
    </div>
  );
}
