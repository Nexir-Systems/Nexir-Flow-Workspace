import type { SxProps, Theme } from '@mui/material';

export const authShellSx: SxProps<Theme> = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: { xs: 2, sm: 3 },
  py: { xs: 6, sm: 8 },
  boxSizing: 'border-box',
};
