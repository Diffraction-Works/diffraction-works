"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "diffraction-works-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "system";
  
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored && ["light", "dark", "system"].includes(stored)) {
    return stored;
  }
  
  return "system";
}

function getResolvedTheme(theme: Theme): "light" | "dark" {
  if (theme !== "system") return theme;
  
  if (typeof window === "undefined") return "dark";
  
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from storage
  useEffect(() => {
    const initial = getInitialTheme();
    setThemeState(initial);
    setResolvedTheme(getResolvedTheme(initial));
    setMounted(true);
  }, []);

  // Update resolved theme when theme changes
  useEffect(() => {
    if (!mounted) return;
    setResolvedTheme(getResolvedTheme(theme));
  }, [theme, mounted]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    if (disableTransitionOnChange) {
      root.classList.add("disable-transitions");
    }

    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);

    if (disableTransitionOnChange) {
      // Force reflow
      void window.getComputedStyle(root).getPropertyValue("color");
      root.classList.remove("disable-transitions");
    }
  }, [resolvedTheme, mounted, disableTransitionOnChange]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || !enableSystem) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (theme === "system") {
        setResolvedTheme(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted, enableSystem]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  };

  const toggleTheme = () => {
    const themes: Theme[] = enableSystem 
      ? ["light", "dark", "system"] 
      : ["light", "dark"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  // Provide default context value during initial mount to prevent errors
  const contextValue: ThemeContextType = mounted
    ? {
        theme,
        setTheme,
        resolvedTheme,
        toggleTheme,
      }
    : {
        theme: defaultTheme,
        setTheme: () => {},
        resolvedTheme: "dark",
        toggleTheme: () => {},
      };

  return (
    <ThemeContext.Provider value={contextValue}>
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );

}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
