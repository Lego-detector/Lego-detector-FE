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

  const theme = useMemo(() => createTheme({
    palette: {
      mode: themeMode || "light",
      primary: {
        main: "#0A2033",
      },
    },
  }), [themeMode]);

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
