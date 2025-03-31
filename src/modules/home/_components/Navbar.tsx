'use client';

import Link from 'next/link';
import { useState, useEffect, MouseEvent } from 'react';
import {
  AppBar,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Adb as AdbIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../_contexts/AuthContext';
import axiosInstance from '@/shared/utils/axios';
import { useRouter } from 'next/navigation';
import { useQuota } from '../_contexts/QuotaContext';

const pages = ['Quota', 'Profile', 'History', 'Logout'];
const adminOptions = ['ManageUser'];
const guestOptions = ['Sign-up', 'Sign-in'];
const appName = 'LEGO DETECTOR';

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { quota, setQuota } = useQuota();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  async function getUserQuota() {
    try {
      const axiosRes = await axiosInstance(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/quota`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      setQuota(axiosRes.data.data ? axiosRes.data.data : 'infinity');
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserQuota();
  }, [quota]);

  return (
    <AppBar position="static" className="AppBar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/inference"
            sx={{
              mr: 2,
              display: { xs: 'none', sm: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {appName}
          </Typography>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            {user?.role == 'ADMIN' &&
              adminOptions.map((page) => (
                <Link key={page} href={page.toLowerCase()}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                      transition: '0.3s',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
          </Box>
          {user &&
            pages.map((page) => (
              <MenuItem
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  if (page === 'Logout') {
                    logout();
                  } else if (page !== 'Profile' && page !== 'Quota') {
                    router.push('/' + page.toLowerCase());
                  }
                }}
                sx={{
                  borderRadius: 1,
                  pointerEvents:
                    page === 'Profile' || page === 'Quota' ? 'none' : 'auto',
                  backgroundColor:
                    page === 'Profile' || page === 'Quota'
                      ? 'transparent'
                      : 'inherit',
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor:
                      page === 'Profile' || page === 'Quota'
                        ? 'transparent'
                        : 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>
                  {page === 'Profile' ? (
                    <>
                      User:{' '}
                      <span style={{ color: 'orange' }}>{user.fname}</span>
                    </>
                  ) : page === 'Quota' ? (
                    <>
                      Quota:{' '}
                      <span style={{ color: 'orange' }}>
                        {user.role === 'ADMIN' ? 'Infinity' : quota}
                      </span>
                    </>
                  ) : (
                    page
                  )}
                </Typography>
              </MenuItem>
            ))}
          {!user &&
            guestOptions.map((option) => (
              <Link key={option} href={option.toLowerCase()}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    mx: 1,
                    color: 'white',
                    display: 'block',
                    transition: '0.3s',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  {option}
                </Button>
              </Link>
            ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
