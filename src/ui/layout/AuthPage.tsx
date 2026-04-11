import { Box, type SxProps, type Theme } from '@mui/material';
import type { ReactNode } from 'react';
import { authShellSx } from './authLayoutSx';

type AuthPageProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

/** Centered shell for sign-in / registration — full viewport, generous margins. */
export function AuthPage({ children, sx }: AuthPageProps) {
  return (
    <Box sx={sx ? ([authShellSx, sx] as SxProps<Theme>) : authShellSx}>
      {children}
    </Box>
  );
}
