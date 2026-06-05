import { cn } from "@/lib/utils";

type Tone =
  | "brand"
  | "gold"
  | "green"
  | "blue"
  | "slate"
  | "amber"
  | "purple"
  | "teal";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  gold: "bg-amber-50 text-amber-700 ring-amber-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  purple: "bg-purple-50 text-purple-700 ring-purple-200",
  teal: "bg-teal-50 text-teal-700 ring-teal-200",
};

export function Pill({
  children,
  tone = "slate",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
