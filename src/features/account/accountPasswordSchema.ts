import { z } from 'zod';
import { validatePasswordStrength, PASSWORD_RULES_HINT } from '../../core/validation/password';

export const accountPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(1, 'New password is required')
      .refine((v) => validatePasswordStrength(v), PASSWORD_RULES_HINT),
    confirmPassword: z.string().min(1, 'Confirm your new password'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type AccountPasswordValues = z.infer<typeof accountPasswordSchema>;
