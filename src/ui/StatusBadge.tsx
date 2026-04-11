import { Chip } from '@mui/material';
import type { EntityStatus } from '../api/types/entities';

const tone: Record<EntityStatus, 'default' | 'success' | 'warning'> = {
  draft: 'default',
  active: 'success',
  archived: 'warning',
};

function statusLabel(status: EntityStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function StatusBadge({ status }: { status: EntityStatus }) {
  return (
    <Chip
      size="small"
      label={statusLabel(status)}
      color={tone[status]}
      variant={status === 'draft' ? 'outlined' : 'filled'}
      sx={{
        fontWeight: 600,
        letterSpacing: '0.02em',
      }}
    />
  );
}
