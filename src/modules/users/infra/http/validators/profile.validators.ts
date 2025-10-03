import { z } from 'zod';

export const updateProfileBodySchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.string().email('Invalid email format.'),
    old_password: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long.').optional(),
  })
  .refine(
    data => {
      if (data.password && !data.old_password) {
        return false; 
      }
      return true;
    },
    {
      message: 'Old password is required to set a new password.',
      path: ['old_password'],
    },
  );

export type UpdateProfileBody = z.infer<typeof updateProfileBodySchema>;
