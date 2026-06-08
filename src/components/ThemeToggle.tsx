"use client";

import { useTheme } from "@/lib/theme/ThemeProvider";
import { Icon } from "@/components/Icon";

export function ThemeToggle() {
  const { isDark, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Icon name="sun" className="h-5 w-5" />
      ) : (
        <Icon name="moon" className="h-5 w-5" />
      )}
    </button>
  );
}
