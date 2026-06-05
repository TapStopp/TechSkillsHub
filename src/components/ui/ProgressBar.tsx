import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  tone?: "brand" | "gold" | "green" | "blue";
  showLabel?: boolean;
}

const tones = {
  brand: "bg-brand-600",
  gold: "bg-amber-500",
  green: "bg-emerald-500",
  blue: "bg-blue-600",
};

export function ProgressBar({
  value,
  className,
  tone = "brand",
  showLabel = false,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full transition-all", tones[tone])}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="w-9 text-right text-xs font-medium text-slate-500">{pct}%</span>
      )}
    </div>
  );
}
