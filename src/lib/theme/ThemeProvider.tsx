"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);

    // Get saved theme from localStorage
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
    setThemeState(savedTheme);

    // Determine if dark mode should be active
    const shouldBeDark =
      savedTheme === "dark" ||
      (savedTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
  }, []);

  // Listen for system theme preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        const shouldBeDark = mediaQuery.matches;
        setIsDark(shouldBeDark);
        applyTheme(shouldBeDark);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const applyTheme = (dark: boolean) => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);

    const shouldBeDark =
      newTheme === "dark" ||
      (newTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
  };

  const value = {
    theme,
    setTheme,
    isDark,
  };

  // Don't render children until client-side hydration is complete
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
