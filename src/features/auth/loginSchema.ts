import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(4, 'At least 4 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
