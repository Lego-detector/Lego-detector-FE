"use client";

import Link from 'next/link'
import { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { ThemeContext } from './ThemeProvider';
import { Brightness4, Brightness7 } from "@mui/icons-material";

const navList = ["Home", "Signup", "Login", "Profile", "History", "Result/1"];

export function Navbar() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    console.warn("no theme cont");
    return null;
  }
  const { themeMode, toggleTheme } = themeContext;

  return (
    <AppBar position="static" className="bg-blue-600 dark:bg-gray-800">
      <Toolbar className="flex justify-between items-center gap-4">
        <Typography variant="h6" className="font-bold">
          MyApp
        </Typography>

        <div className="flex flex-row items-center gap-4">
          {navList.map((item, index) => (
            <Link key={index.toString()} href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="text-white hover:underline h-fit">
              {item}
            </Link>
          ))}

          <IconButton onClick={toggleTheme} color="inherit">
            {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}