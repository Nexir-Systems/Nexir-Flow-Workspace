import { Box, Button, Stack } from '@mui/material';
import type { ReactNode } from 'react';

type Props = {
  cancelLabel?: string;
  onCancel: () => void;
  secondaryActions?: ReactNode;
  primaryLabel: string;
  /** Shown while primary action is pending (e.g. Saving…). */
  primaryLoadingLabel?: string;
  onPrimary: () => void;
  primaryDisabled?: boolean;
  primaryLoading?: boolean;
};

/**
 * Consistent form footers: Cancel (left, outlined) · optional secondary actions · primary CTA (right, contained).
 */
export function FormActionsFooter({
  cancelLabel = 'Cancel',
  onCancel,
  secondaryActions,
  primaryLabel,
  primaryLoadingLabel = 'Saving…',
  onPrimary,
  primaryDisabled,
  primaryLoading,
}: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        flexWrap: 'wrap',
        alignItems: { xs: 'stretch', sm: 'center' },
        justifyContent: 'space-between',
        gap: 2,
        width: '100%',
      }}
    >
      <Button variant="outlined" size="large" onClick={onCancel} sx={{ alignSelf: { sm: 'flex-start' }, width: { xs: '100%', sm: 'auto' } }}>
        {cancelLabel}
      </Button>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          width: { xs: '100%', sm: 'auto' },
          ml: { xs: 0, sm: 'auto' },
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'flex-end',
        }}
      >
        {secondaryActions}
        <Button variant="contained" size="large" disabled={primaryDisabled || primaryLoading} onClick={onPrimary}>
          {primaryLoading ? primaryLoadingLabel : primaryLabel}
        </Button>
      </Stack>
    </Box>
  );
}
