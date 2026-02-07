"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({
  variant = "ghost",
  size = "icon",
  className,
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const icons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  const labels = {
    light: "Light",
    dark: "Dark",
    system: "System",
  };

  const CurrentIcon = icons[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            className
          )}
          aria-label="Toggle theme"
        >
          <div className="relative w-5 h-5">
            <CurrentIcon
              className={cn(
                "absolute inset-0 w-5 h-5 transition-all duration-300",
                "rotate-0 scale-100"
              )}
            />
          </div>
          {showLabel && (
            <span className="ml-2 text-sm font-medium">{labels[theme]}</span>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center gap-2 cursor-pointer",
            theme === "light" && "bg-accent/10 text-accent"
          )}
        >
          <Sun className="w-4 h-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center gap-2 cursor-pointer",
            theme === "dark" && "bg-accent/10 text-accent"
          )}
        >
          <Moon className="w-4 h-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "flex items-center gap-2 cursor-pointer",
            theme === "system" && "bg-accent/10 text-accent"
          )}
        >
          <Monitor className="w-4 h-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Simple toggle button that cycles through themes
export function ThemeToggleSimple({
  variant = "ghost",
  size = "icon",
  className,
}: Omit<ThemeToggleProps, "showLabel">) {
  const { theme, toggleTheme, resolvedTheme } = useTheme();

  const Icon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:bg-accent/10",
        className
      )}
      aria-label={`Current theme: ${theme}. Click to toggle.`}
    >
      <Icon className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
