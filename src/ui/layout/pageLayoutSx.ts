import type { SxProps, Theme } from '@mui/material';

/** Single source of truth for product page rhythm — calm, airy, aligned to the 8px grid. */
export const pageContainerSx: SxProps<Theme> = {
  width: '100%',
  maxWidth: 1200,
  mx: 'auto',
  boxSizing: 'border-box',
  px: { xs: 2.5, sm: 3.5, md: 4.5 },
  py: { xs: 3, sm: 4, md: 5 },
  pb: { xs: 6, sm: 7, md: 9 },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: { xs: 4, sm: 5, md: 6 },
};
