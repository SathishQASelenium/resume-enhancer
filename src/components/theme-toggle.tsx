"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useHasMounted } from "@/hooks/use-has-mounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-[30px] w-[74px] items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5"
      />
    );
  }

  const isNight = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isNight}
      aria-label={isNight ? "Switch to Day Mode" : "Switch to Night Mode"}
      onClick={() => setTheme(isNight ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {isNight ? (
        <>
          <Moon className="size-4 text-primary" aria-hidden="true" />
          Night
        </>
      ) : (
        <>
          <Sun className="size-4 text-primary" aria-hidden="true" />
          Day
        </>
      )}
    </button>
  );
}
