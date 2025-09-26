import { z } from 'zod';

export const resetPasswordBodySchema = z.object({
  token: z.string().uuid('Token must be a valid UUID.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

export type ResetPasswordBody = z.infer<typeof resetPasswordBodySchema>;


export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format.'),
});

export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>;