import { z } from 'zod';

export const createAppointmentBodySchema = z.object({
  provider_id: z.string().uuid({ message: 'Invalid provider ID format.' }),

  date: z.string().transform((dateString, ctx) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid date format. Please use a valid date string.',
      });
      return z.NEVER;
    }
    return date;
  }),
});

export type CreateAppointmentBody = z.infer<typeof createAppointmentBodySchema>;

export const listProviderAppointmentsQuerySchema = z.object({
  day: z.coerce.number().int().min(1).max(31),
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2000),
});

export type ListProviderAppointmentsQuery = z.infer<
  typeof listProviderAppointmentsQuerySchema
>;