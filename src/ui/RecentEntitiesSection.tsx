import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { readRecentEntityIds } from '../core/recent/recentEntities';
import { useEntitiesQuery } from '../queries/entities';
import { SectionCard } from './SectionCard';
import { EntityListItem } from './EntityListItem';

type Props = {
  title?: string;
  description?: string;
};

export function RecentEntitiesSection({
  title = 'Recent records',
  description = 'Most recently opened entities (newest first). Open a detail view to refresh this list.',
}: Props) {
  const navigate = useNavigate();
  const q = useEntitiesQuery();
  const recentIds = readRecentEntityIds();

  const rowsById = useMemo(() => {
    const map = new Map<string, { name: string; updatedAt: string }>();
    for (const e of q.data ?? []) {
      map.set(e.id, { name: e.name, updatedAt: e.updatedAt });
    }
    return map;
  }, [q.data]);

  return (
    <SectionCard title={title}>
      {recentIds.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {description}
        </Typography>
      ) : (
        <Stack spacing={0}>
          {recentIds.map((id) => {
            const row = rowsById.get(id);
            return (
              <EntityListItem
                key={id}
                primary={row?.name ?? id}
                secondary={row ? new Date(row.updatedAt).toLocaleString() : 'Not found in catalog'}
                onClick={() => navigate(`/app/entities/${id}`)}
              />
            );
          })}
        </Stack>
      )}
    </SectionCard>
  );
}
