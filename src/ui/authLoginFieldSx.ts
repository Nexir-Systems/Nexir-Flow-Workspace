import { alpha } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material';

/**
 * When the browser still applies autofill, match our outlined field surfaces instead of the default yellow.
 */
export const loginFieldAutofillSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    '& input:-webkit-autofill': {
      WebkitBoxShadow: (t) => `0 0 0 1000px ${t.palette.background.paper} inset`,
      WebkitTextFillColor: (t) => t.palette.text.primary,
      transition: 'background-color 99999s ease-out',
    },
    '& input:-webkit-autofill:hover': {
      WebkitBoxShadow: (t) => `0 0 0 1000px ${alpha(t.palette.text.primary, 0.04)} inset`,
    },
    '& input:-webkit-autofill:focus': {
      WebkitBoxShadow: (t) =>
        `0 0 0 1000px ${t.palette.background.paper} inset, 0 0 0 1px ${alpha(t.palette.primary.main, 0.45)}`,
    },
  },
};
