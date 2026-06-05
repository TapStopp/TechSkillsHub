import { cn } from "@/lib/utils";

export function Avatar({
  name,
  color = "#a4123f",
  size = 40,
  className,
}: {
  name: string;
  color?: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold text-white",
        className,
      )}
      style={{ backgroundColor: color, width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
