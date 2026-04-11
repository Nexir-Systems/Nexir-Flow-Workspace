export const PASSWORD_RULES_HINT =
  'At least 8 characters, one uppercase letter, and one digit.';

const STRONG = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export function validatePasswordStrength(password: string): boolean {
  return STRONG.test(password);
}

export function validatePasswordStrengthOrThrow(password: string): void {
  if (!validatePasswordStrength(password)) {
    throw new Error(PASSWORD_RULES_HINT);
  }
}
