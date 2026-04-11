import { Box, Button, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type Props = {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ icon, title, description, actionLabel, onAction }: Props) {
  return (
    <Box
      sx={{
        py: { xs: 8, sm: 10 },
        px: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2,
      }}
    >
      {icon ? (
        <Box sx={{ fontSize: 44, color: 'text.secondary', opacity: 0.75 }}>{icon}</Box>
      ) : null}
      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 440, lineHeight: 1.7 }}>
          {description}
        </Typography>
      ) : null}
      {actionLabel && onAction ? (
        <Button variant="contained" size="large" onClick={onAction} sx={{ mt: 1 }}>
          {actionLabel}
        </Button>
      ) : null}
    </Box>
  );
}
