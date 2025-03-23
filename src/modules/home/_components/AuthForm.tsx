'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, signInSchema } from '../_schemas';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useAuth } from '../_contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function AuthForm({ isSignup }: { isSignup: boolean }) {
  const { setUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(isSignup ? signUpSchema : signInSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      const res = await fetch(`${process.env.BACKEND_URL}/${isSignup ? 'sign-up' : 'sign-in'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Authentication failed');
      }

      const result = await res.json();
      setUser(result.profile);

      router.push('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3, maxWidth: 400, mx: 'auto' }}
    >
      <Typography variant="h5" gutterBottom>
        {isSignup ? 'Sign Up' : 'Login'}
      </Typography>

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
  );
}
