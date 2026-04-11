import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

export function InfoPanel({ title, children }: Props) {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
      <InfoOutlinedIcon
        sx={{
          mt: 0.35,
          fontSize: 22,
          color: 'text.secondary',
          opacity: 0.9,
        }}
      />
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.75 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
