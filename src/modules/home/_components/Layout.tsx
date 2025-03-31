"use client";

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
          © 2025 MyApp. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;