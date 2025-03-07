import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password == data.confirmPassword, {
  message: "password does not match",
  path: ["confirmPassword"]
});

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export type SignInSchemaType = z.infer<typeof signInSchema>;