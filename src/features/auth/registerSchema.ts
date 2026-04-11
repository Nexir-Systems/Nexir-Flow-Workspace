import { z } from 'zod';
import { PASSWORD_RULES_HINT, validatePasswordStrength } from '../../core/validation/password';

export const registerSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .refine((v) => validatePasswordStrength(v), PASSWORD_RULES_HINT),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
