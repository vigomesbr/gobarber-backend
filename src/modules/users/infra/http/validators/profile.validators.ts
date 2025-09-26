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
      // Se 'password' foi fornecido, 'old_password' também deve ser.
      if (data.password && !data.old_password) {
        return false; // Retornar false aciona o erro de validação
      }
      return true;
    },
    {
      // Mensagem de erro customizada para esta validação específica
      message: 'Old password is required to set a new password.',
      // O erro será associado ao campo 'old_password'
      path: ['old_password'],
    },
  );

export type UpdateProfileBody = z.infer<typeof updateProfileBodySchema>;
