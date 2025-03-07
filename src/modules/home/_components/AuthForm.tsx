'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, signInSchema } from '../_schemas';
import { Button, FormControl, FormHelperText, Grid2, TextField, Typography } from '@mui/material';

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function AuthForm({ isSignup }: { isSignup: boolean }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(isSignup ? signUpSchema: signInSchema),
  });

  const onSubmit = (data: AuthFormData) => {
    console.log("Form data :", data);
    // submit process
  };

  return (
    <Grid2
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      padding="normal"
    >
      <Typography variant="h5" gutterBottom>
        {isSignup ? 'Sign Up' : 'Login'}
      </Typography>
      <FormControl onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          id="email"
          aria-describedby='email-text'
          {...register('email')}
          label="Email"
          type="email"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
          required
        />
        <FormHelperText id="email-text">{errors.email?.message}</FormHelperText>

        <TextField
          margin="normal"
          id="password"
          aria-describedby="password-text"
          {...register('password')}
          label="Password"
          type="password"
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message}
          required
        />
        <FormHelperText id="password-text">{errors.password?.message}</FormHelperText>

        {isSignup && (
          <TextField
            margin="normal"
            id="confirmPassword"
            aria-describedby="confirmPassword-text"
            {...register('confirmPassword')}
            label="Confirm password"
            type="password"
            variant="outlined"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            required
          />
        )}

        <Button type="submit" variant="outlined">
          {isSignup ? 'Sign Up' : 'Login'}
        </Button>
      </FormControl>
    </Grid2>
  );
}