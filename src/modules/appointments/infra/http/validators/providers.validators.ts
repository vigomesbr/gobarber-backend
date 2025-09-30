import { z } from 'zod';

/* Schema providerMonthAvailability */

export const providerMonthAvailabilityParamsSchema = z.object({
  provider_id: z.string().uuid('Invalid provider ID format.'),
});

export const providerMonthAvailabilityQuerySchema = z.object({
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2000),
});

export type ProviderMonthAvailabilityParams = z.infer<
  typeof providerMonthAvailabilityParamsSchema
>;
export type ProviderMonthAvailabilityQuery = z.infer<
  typeof providerMonthAvailabilityQuerySchema
>;


/* Schema providerDayAvailability */

export const providerDayAvailabilityParamsSchema = z.object({
  provider_id: z.string().uuid('Invalid provider ID format.'),
});

export const providerDayAvailabilityQuerySchema = z.object({
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2000),
  day: z.coerce.number().int().min(1).max(31),
});

export type ProviderDayAvailabilityParams = z.infer<
  typeof providerDayAvailabilityParamsSchema
>;
export type ProviderDayAvailabilityQuery = z.infer<
  typeof providerDayAvailabilityQuerySchema
>;

