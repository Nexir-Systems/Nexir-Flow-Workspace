import { z } from 'zod';

export const entityFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'At least 2 characters')
    .max(160, 'Too long'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(4000, 'Too long'),
  status: z.enum(['draft', 'active', 'archived']),
  category: z.enum(['general', 'billing', 'operations', 'security']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  owner: z.string().min(1, 'Owner is required').max(120, 'Too long'),
});

export type EntityFormValues = z.infer<typeof entityFormSchema>;
