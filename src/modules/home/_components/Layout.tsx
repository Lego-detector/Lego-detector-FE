"use client";

import React, { useContext } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { ThemeContext } from './ThemeProvider';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { toggleTheme, themeMode } = themeContext;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Navbar />
      <Container component="main" sx={{ flex: 1, padding: 2 }}>
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          textAlign: 'center',
          paddingY: 2,
          bgcolor: 'background.paper',
          color: 'text.secondary',
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </Typography>
        <Button onClick={toggleTheme} sx={{ marginTop: 2 }} variant="contained">
          Toggle Dark Mode
        </Button>
      </Box>
    </Box>
  );
};

export default Layout;
