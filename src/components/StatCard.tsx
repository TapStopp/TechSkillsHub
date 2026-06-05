import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon,
  tone = "brand",
  hint,
}: {
  label: string;
  value: React.ReactNode;
  icon: string;
  tone?: "brand" | "gold" | "green" | "blue" | "purple";
  hint?: string;
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand-50 text-brand-600",
    gold: "bg-amber-50 text-amber-600",
    green: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg", tones[tone])}>
          <Icon name={icon} className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-3 text-2xl font-bold text-slate-900">{value}</div>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
