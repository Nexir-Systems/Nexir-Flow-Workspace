import type { TextFieldProps } from '@mui/material';
import { loginFieldAutofillSx } from '../../ui/authLoginFieldSx';

/** Shared native input hints — same for email + password on the sign-in form. */
export const loginHtmlInputProps = {
  autoComplete: 'off' as const,
  'data-lpignore': 'true',
  'data-1p-ignore': 'true',
  'data-form-type': 'other' as const,
};

/** Every login `TextField` uses the same width, autofill styling, and autocomplete hints. */
export const loginTextFieldShared: Pick<TextFieldProps, 'fullWidth' | 'size' | 'slotProps' | 'sx'> = {
  fullWidth: true,
  size: 'medium',
  slotProps: { htmlInput: loginHtmlInputProps },
  sx: loginFieldAutofillSx,
};
