import { z } from 'zod';
import User from '../../typeorm/entities/User';

// ===================================================================
// Schema de ENTRADA (Validação de Requisições)
// ===================================================================


export const createUserBodySchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email('Invalid email format.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

export type CreateUserBody = z.infer<typeof createUserBodySchema>;


// ===================================================================
// Schema de SAÍDA (Transformação de Respostas)
// ===================================================================

export const userResponseSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    avatar: z.string().nullable().optional(),
  })
  .transform(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
    avatar_url: user.avatar
      ? `${process.env.APP_API_URL}/files/${user.avatar}`
      : null,
  }));

export const usersListResponseSchema = z.array(userResponseSchema);

export type UserResponse = z.infer<typeof userResponseSchema>;
export type UsersListResponse = z.infer<typeof usersListResponseSchema>;
