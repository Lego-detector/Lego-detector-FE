'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, signInSchema } from '../_schemas';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useAuth } from '../_contexts/AuthContext';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/shared/utils/axios';
import { setCredentials, setUserProfile } from '@/shared/utils/cookie';
import AlertCard from './AlertCard';
import { useState } from 'react';

interface AuthFormData {
  fname?: string;
  lname?: string;
  email: string;
  password: string;
  confirmPassword?: string
}

export default function AuthForm({ isSignup }: { isSignup: boolean }) {
  const { setUser } = useAuth();
  const router = useRouter();
  const [ openAlert, setOpenAlert ] = useState<boolean>(false);
  const [ alertMessage, setAlertMessage ] = useState<string | null>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(isSignup ? signUpSchema : signInSchema),
  });

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return;
    setOpenAlert(false);
  };

  const onSubmit = async (data: AuthFormData) => {
    try {
      const endpoint = isSignup ? 'sign-up' : 'sign-in';;
      const payload = isSignup
        ? {
            ...data,
            confirmPassword: undefined,
          }
        : data;

      const res = await axiosInstance(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${endpoint}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify(payload),
        },
      );

      if (!res.data) {
        throw new Error('Authentication failed');
      }

      const result = await res.data.data;
      result.fname = data.fname;

      setCredentials(
        result.credentials.accessToken,
        result.credentials.refreshToken,
      );
      setUserProfile(result.profile);
      setUser(result.profile);

      router.push('/');
    } catch (error) {
      const errorMessage = (error as Error).message || String(error);
      setAlertMessage(errorMessage);
      setOpenAlert(true);
      console.error('Error:', error);
    }
  };

  return (
    <>
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        maxWidth: 400,
        mx: 'auto',
      }}
      >
      <Typography variant="h5" gutterBottom>
        {isSignup ? 'Sign Up' : 'Login'}
      </Typography>

      {isSignup && (
        <>
          <TextField
            id="fname"
            {...register('fname')}
            label="First Name"
            variant="outlined"
            error={!!errors.fname}
            helperText={errors.fname?.message}
            required
            />
          <TextField
            id="lname"
            {...register('lname')}
            label="Last Name"
            variant="outlined"
            error={!!errors.lname}
            helperText={errors.lname?.message}
            required
            />
        </>
      )}

      <TextField
        id="email"
        {...register('email')}
        label="Email"
        type="email"
        variant="outlined"
        error={!!errors.email}
        helperText={errors.email?.message}
        required
        />

      <TextField
        id="password"
        {...register('password')}
        label="Password"
        type="password"
        variant="outlined"
        error={!!errors.password}
        helperText={errors.password?.message}
        required
        />

      {isSignup && (
        <TextField
        id="confirmPassword"
        {...register('confirmPassword')}
        label="Confirm Password"
        type="password"
        variant="outlined"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        required
        />
      )}

      <Button type="submit" variant="contained" color="primary">
        {isSignup ? 'Sign Up' : 'Login'}
      </Button>
    </Box>
    <AlertCard message={alertMessage} open={openAlert} handleClose={handleClose} severity={'error'}/>
    </>
  );
}
