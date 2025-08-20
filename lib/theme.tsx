/* eslint-disable no-unused-vars */
"use client";
import { ReactNode, useEffect, useState, createContext, useContext } from "react";

type Theme = "light" | "dark";
type Setter = (_t: Theme) => void;

const ThemeContext = createContext<{ theme: Theme; setTheme: Setter } | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    (typeof window !== "undefined" && (localStorage.getItem("theme") as Theme)) || "light"
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
