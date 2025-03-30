"use client";

import { createContext, useState, useEffect, ReactNode, useMemo } from "react";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

interface ThemeContextProps {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [themeMode, setThemeMode] = useState<"light" | "dark">(
    () => (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) 
      ? "dark" 
      : "light"
  );

  useEffect(() => {
    setThemeMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    );
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          ...(themeMode === 'dark'
            ? {
                primary: { main: '#1e3a8a' },
                background: { default: '#0f172a', paper: '#1e293b' },
                text: { primary: '#e0e7ff', secondary: '#a5b4fc' },
              }
            : {
                primary: { main: '#1976d2' },
              }),
        },
      }),
    [themeMode],
  );

  if (!mounted) return <div className="bg-gray-50 dark:bg-gray-900 min-h-screen" />;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MUIThemeProvider theme={theme} >
        <CssBaseline />
        <div className={themeMode === "dark" ? "dark" : ""}>{children}</div>
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
