import type { SxProps, Theme } from '@mui/material';

/** Form/settings/entity cards — consistent interior rhythm. */
export const productCardPaddingSx: SxProps<Theme> = {
  p: { xs: 3.5, sm: 4.5 },
};

/** Login/register only — one step roomier than `productCardPaddingSx`. */
export const authFormCardPaddingSx: SxProps<Theme> = {
  p: { xs: 4, sm: 5.5 },
};
