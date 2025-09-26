import { z } from 'zod';

/* Schema providerMonthAvailability */

export const providerMonthAvailabilityParamsSchema = z.object({
  provider_id: z.string().uuid('Invalid provider ID format.'),
});

export const providerMonthAvailabilityBodySchema = z.object({
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2000),
});

export type ProviderMonthAvailabilityParams = z.infer<
  typeof providerMonthAvailabilityParamsSchema
>;
export type ProviderMonthAvailabilityBody = z.infer<
  typeof providerMonthAvailabilityBodySchema
>;


/* Schema providerDayAvailability */

export const providerDayAvailabilityParamsSchema = z.object({
  provider_id: z.string().uuid('Invalid provider ID format.'),
});

export const providerDayAvailabilityBodySchema = z.object({
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2000),
  day: z.coerce.number().int().min(1).max(31),
});

export type ProviderDayAvailabilityParams = z.infer<
  typeof providerDayAvailabilityParamsSchema
>;
export type ProviderDayAvailabilityBody = z.infer<
  typeof providerDayAvailabilityBodySchema
>;

